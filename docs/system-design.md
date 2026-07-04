# System Design — "The Corridor" (Kea-1)

R3F Architect deliverable. Consumed by two `webgl-developer` agents building in parallel
worktrees. Controlling metaphor and beats: `docs/visual-strategy.md`. Hard constraints and
the merge gate: `.agency/rules/02-standards.md`. Patterns: `.claude/skills/threejs-*`.

## 0. Ownership map (zero file collisions)

Developer A = landing. Developer B = dashboard. Each `three/` scene lives in its own
namespaced subfolder, so no two owned files overlap. Both **depend on** the shared files
below but **neither modifies** them.

| Path | Owner | Notes |
|---|---|---|
| `app/page.tsx` | A | replaces scaffold |
| `src/stores/heroStore.ts` | A | landing clock/scroll/pointer |
| `src/components/landing/**` | A | DOM: LandingPage, ScrollDriver, CopyDeck |
| `src/components/three/landing/**` | A | Canvas + hero scene graph |
| `app/dashboard/page.tsx` | B | replaces scaffold |
| `src/stores/telemetryStore.ts` | B | simulator + telemetry (A never imports) |
| `src/components/dashboard/**` | B | DOM: DashboardPage, HUD |
| `src/components/three/dashboard/**` | B | Canvas + instrument scene graph |
| `src/components/three/PerfProbe.tsx` | shared, read-only | mount as last Canvas child |
| `app/globals.css` tokens · `app/layout.tsx` | shared, read-only | add new tokens once, see §note |

New palette tokens (`--accent-deep #0f766e`, `--accent-faint #134e4a`, `--alert #f43f5e`,
`--ember #fdba74`) are appended to `:root` in `globals.css` **once, by A**, before parallel
work starts (single pre-commit), then treated as frozen. Each developer implements its own
copy of shared primitives (Starfield, SlotField, burst pool) inside its namespaced folder —
intentional duplication to keep worktrees collision-free; de-dupe is a post-merge refactor.

## 1. Zustand store design

Rule (`02-standards`): per-frame state read transiently via `getState()` in `useFrame`
(zero React renders); low-frequency UI subscribes reactively, throttled ≤ 4 Hz.

### heroStore — `src/stores/heroStore.ts` (Dev A)
```ts
type HeroPhase = "corridor" | "tighten" | "branch" | "deploy"; // scroll-derived beat
interface HeroState {
  // TRANSIENT — read only via getState() in useFrame; nothing subscribes reactively
  scroll: number;                 // 0..1 whole-page scroll progress
  pointer: { x: number; y: number }; // -1..1 normalized, starfield/camera parallax
  phase: HeroPhase;               // drives shader/burst branching in useFrame
  // REACTIVE — DOM copy only; changes at most once per section crossing
  activeSection: number;          // 0..4, highlights nav + fades in copy blocks
  // actions (mutations)
  setScroll: (v: number) => void; // sets scroll + derives phase; sets activeSection on threshold cross only
  setPointer: (x: number, y: number) => void;
}
```
Mutation source: a `ScrollDriver` component (`landing/ScrollDriver.tsx`, returns `null`,
subscribes to nothing) attaches one `scroll` + one throttled `pointermove` listener in
`useEffect`, calling `getState().setScroll/setPointer`. `scroll`/`pointer`/`phase` have **no
reactive subscribers**, so 60 Hz writes cause zero renders. `activeSection` is written only
when `scroll` crosses a section boundary → CopyDeck re-renders a handful of times total.

### telemetryStore — `src/stores/telemetryStore.ts` (Dev B)
```ts
type FlightStage = "PRELAUNCH" | "LIFTOFF" | "S1_BURN" | "STAGE_SEP"
                 | "S2_BURN" | "MOA_DEPLOY" | "ORBIT";
type SignalState = "AOS" | "LOS";
type PayloadState = "STOWED" | "ARMED" | "DEPLOYED";
interface TelemetryState {
  // TRANSIENT — 20 Hz simulator writes; read via getState() in useFrame / shader uniforms
  missionTime: number;            // seconds, T-relative (negative pre-launch)
  altitude: number;               // km
  velocity: number;               // m/s
  corridorDeviation: number;      // metres from centreline (drives polyline offset + Δ)
  signalStrength: number;         // 0..1, drives DownlinkShimmer uSignal
  samples: Float32Array;          // ring buffer of polyline points, mutated in place
  sampleHead: number;
  // REACTIVE — mutate only on discrete transitions; HUD subscribes (still ≤ event freq)
  stage: FlightStage;
  signalState: SignalState;       // "LOS" → alert color
  payloads: PayloadState[];       // 4 entries (Moa multi-drop), one flips per drop
  // simulator API — setInterval OUTSIDE React
  start: () => void;              // begins 20 Hz keyframed flight profile
  stop: () => void;               // clears interval; idempotent
}
```
Mutation source: `start()` opens a `setInterval(50ms)` (20 Hz) living outside React that
integrates a scripted MET→(alt,vel,deviation,stage,signal) profile and mutates the store.
Numeric HUD readouts (MET/ALT/VEL/Δ) must **not** subscribe to the 20 Hz fields; they read
through a `useHudSnapshot()` hook — a local `setInterval(250ms)` (4 Hz) that copies
`getState()` into local React state. Reactive slices (`stage`, `payloads`, `signalState`)
change only on events, so HUD may subscribe to them directly. `TelemetrySimulatorMount`
(returns `null`) calls `start()` on mount, `stop()` on cleanup.

## 2. Component hierarchy per route

Shared Canvas config (both): `dpr={[1,2]}`, `gl={{ antialias:false, powerPreference:"high-performance" }}`,
`onCreated` → `gl.setClearColor("#05070d")`, `<PerfProbe/>` as **last** child. The Canvas
host component calls `useEffect(markSceneRender)` and subscribes to **no** reactive store
slice, so `window.__SCENE_RENDERS__` stays flat while frames advance.

### Landing — `app/page.tsx` (A) → `dynamic(import, { ssr:false })`
```
LandingPage (landing/LandingPage.tsx)              tall scroll container (~500vh)
├─ ScrollDriver (landing/ScrollDriver.tsx)         null; window listeners → heroStore
├─ CorridorCanvas (three/landing/CorridorCanvas.tsx)  sticky/fixed; markSceneRender here
│  └─ <Canvas camera={{position:[0,2,8],fov:42,near:0.1,far:200}}>
│     ├─ key light (#5eead4) + event point flash (#f97316); no shadow maps, no ambient
│     ├─ <Suspense fallback={null}>                (procedural — no async; boundary only)
│     │  ├─ CorridorScene (three/landing/CorridorScene.tsx)
│     │  │  ├─ ScrollCameraRig      useFrame: getState().scroll → spline.getPointAt (exp-damped)
│     │  │  ├─ GravityWellGrid      1 wireframe LineSegments
│     │  │  ├─ Starfield            InstancedMesh 8k
│     │  │  ├─ SlotField            InstancedMesh 1.5k
│     │  │  ├─ TrajectoryTube       TubeGeometry(CatmullRom)
│     │  │  ├─ CorridorCone         CorridorFresnelMaterial
│     │  │  ├─ BranchTubes          merged geometry, 3–5 forks → 1 draw
│     │  │  ├─ SlotNodes            InstancedMesh ~20 branch terminals (ignite)
│     │  │  └─ StagingBurst         InstancedMesh 512, StagingBloomMaterial
│     │  └─ LandingEffects          EffectComposer(Bloom thr1, Vignette, Noise)
│     └─ <PerfProbe/>
└─ CopyDeck (landing/CopyDeck.tsx)                  DOM sections; subscribes activeSection only
```

### Dashboard — `app/dashboard/page.tsx` (B) → `dynamic(import, { ssr:false })`
```
DashboardPage (dashboard/DashboardPage.tsx)
├─ TelemetrySimulatorMount                          null; start()/stop()
├─ InstrumentCanvas (three/dashboard/InstrumentCanvas.tsx)  markSceneRender here
│  └─ <Canvas camera={{position:[0,1.5,9],fov:24,near:0.1,far:200}}>  fixed, ortho-leaning
│     ├─ <Suspense fallback={null}>
│     │  ├─ InstrumentScene (three/dashboard/InstrumentScene.tsx)
│     │  │  ├─ Starfield            InstancedMesh 8k (dimmed, continuity)
│     │  │  ├─ SlotField            InstancedMesh 1.5k (dimmed)
│     │  │  ├─ CorridorEnvelope     translucent nominal tube, CorridorFresnelMaterial
│     │  │  ├─ TelemetryPolyline    THREE.Line, DownlinkShimmerMaterial; useFrame lerps head
│     │  │  └─ StageBurst           InstancedMesh 512, StagingBloomMaterial
│     │  └─ DashboardEffects        EffectComposer(Bloom thr1, Vignette)
│     └─ <PerfProbe/>
└─ HUD (dashboard/HUD.tsx)                           DOM; useHudSnapshot() 4 Hz + event slices
```

## 3. Instancing plan & draw-call budget

Every repeated element is one `InstancedMesh` (one draw regardless of count). Per-instance
data via `InstancedBufferAttribute`, written once at init, mutated in place in `useFrame`.

| Instanced mesh | Count | Per-instance attributes |
|---|---|---|
| Starfield | 8 000 | `instanceMatrix` (shell position), `aScale`, `aTwinkle` (phase) |
| SlotField | 1 500 | `instanceMatrix` (orbital-shell placement), `aPhase`, `aState` (0 idle/1 armed/2 lit) |
| SlotNodes (landing) | ~20 | `instanceMatrix`, `aIgnite` (0..1, phase-driven) |
| StagingBurst / StageBurst | 512 | `aVelocity` (vec3), `aBirth` (float), `aSeed` — expanded in vertex shader from `uTime` |

**Landing draw-call budget**

| Item | Draws |
|---|---|
| GravityWellGrid, TrajectoryTube, CorridorCone, BranchTubes(merged) | 4 |
| Starfield, SlotField, SlotNodes, StagingBurst (instanced) | 4 |
| EffectComposer: input copy + Bloom mip chain + Vignette/Noise (merged) | ~13 |
| **Total** | **~21** |

**Dashboard draw-call budget**

| Item | Draws |
|---|---|
| CorridorEnvelope, TelemetryPolyline (Line) | 2 |
| Starfield, SlotField, StageBurst (instanced) | 3 |
| EffectComposer: input copy + Bloom mip chain + Vignette | ~11 |
| **Total** | **~16** |

Both scenes land under the ≤ 40 target and far under the 100 gate. Lights add zero draws
(no shadow maps). PerfProbe reads `gl.info.render.calls` for the binding assertion.

## 4. Shader spec (3 signature materials)

Each is a drei `shaderMaterial`, `extend`-ed + module-augmented **once at module scope**.
Uniform mutation happens only in `useFrame`; `transparent`, `depthWrite={false}`;
`toneMapped={false}` where color must exceed 1.0 to trip threshold-1 bloom.

**CorridorFresnelMaterial** — *Corridor Fresnel Tighten* (landing cone + dashboard envelope)
- Uniforms: `uTime:float`, `uTighten:float(0..1)`, `uColorRim:vec3(#5eead4)`,
  `uColorFill:vec3(#0f766e)`, `uOpacity:float`.
- Vertex: pass view-space normal and view direction. Fragment: `fresnel = pow(1 - dot(N,V), edgePower)`
  with `edgePower = mix(1.5, 6.0, uTighten)` — as `uTighten→1` the falloff sharpens so a wide
  teal haze contracts to a knife-edge rim; alpha = `fresnel * uOpacity`. NormalBlending
  preserves the volume read; `uTime` adds a faint breathing shimmer.
- Driven by: **Landing** `heroStore.scroll` remapped to the section-2 window → `uTighten`.
  **Dashboard** normalized ascent `(altitude / targetAltitude)` from `telemetryStore` → `uTighten`.

**StagingBloomMaterial** — *Staging Bloom* (burst InstancedMesh, additive)
- Uniforms: `uTime:float`, `uBurstTime:float`, `uHotColor:vec3(#f97316)`,
  `uEmberColor:vec3(#fdba74)`, `uTraceColor:vec3(#5eead4)`, `uSize:float`.
- Vertex: `age = uTime - aBirth`; particle position = origin + `aVelocity*age`; scale eases
  out then decays. Fragment: color = hot→ember→teal-trace by `age`, pushed above 1.0 so the
  threshold-1 Bloom (and only it) blooms events; `AdditiveBlending`, alpha decays to 0.
- Driven by: **Landing** `heroStore.phase` transitions (`tighten`/`deploy`) set `uBurstTime`.
  **Dashboard** `telemetryStore.stage` = `STAGE_SEP`/`MOA_DEPLOY` and each `payloads[i]→DEPLOYED`
  set `uBurstTime`.

**DownlinkShimmerMaterial** — *Downlink Shimmer* (dashboard polyline only)
- Uniforms: `uTime:float`, `uFlow:float`, `uSignal:float(0..1)`, `uColor:vec3(#5eead4)`,
  `uAlert:vec3(#f43f5e)`, `uReduced:float(0|1)`.
- Vertex: pass arc-length uv along the line. Fragment: travelling scanline
  `fract(uv.x*freq - uTime*uFlow)` reads as data flowing head-ward; a small per-channel uv
  offset gives chromatic fringe; brightness scales with `uSignal`; when signal low the color
  mixes toward `uAlert` (LOS). Implemented on the line material (not a fullscreen pass) to
  localize cost. `uReduced=1` freezes the scanline (static line) under `prefers-reduced-motion`.
- Driven by: `telemetryStore.signalStrength`→`uSignal`; `signalState==="LOS"`→alert mix;
  `uReduced` from a `matchMedia("(prefers-reduced-motion)")` read.

## 5. Disposal & loading plan

Everything is **procedural** — no GLB, no textures, so no `useLoader`/drei loaders; `<Suspense
fallback={null}>` is a structural boundary only. R3F auto-disposes JSX-mounted geometry and
materials on unmount. Imperative allocations that need explicit teardown:

- **Geometry built in `useMemo`** (`TubeGeometry`, `CatmullRomCurve3`-derived tubes, merged
  BranchTubes, `InstancedBufferGeometry`, grid `BufferGeometry`): dispose in the effect
  cleanup that owns them, or attach so R3F disposes on removal — pick one and be explicit.
- **Simulator interval** (Dev B): `stop()` in `TelemetrySimulatorMount` cleanup — a leaked
  20 Hz interval keeps mutating a dead store.
- **Throttle intervals**: `useHudSnapshot()` 4 Hz interval and the `ScrollDriver` /
  `pointermove` listeners cleared/removed on cleanup.
- **EffectComposer**: exactly one per Canvas, mounted once; it owns render targets. Never
  remount it (leaks GPU memory) — no keys that force re-creation.
- `shaderMaterial` classes are declared at module scope (not per render); their instances are
  JSX-mounted and auto-disposed. `Float32Array` telemetry ring buffer is plain JS (GC'd).

## 6. Acceptance mapping (verify-3d gate → guaranteeing decision)

| Gate (`02-standards` §Verification 4) | Design decision that guarantees it |
|---|---|
| **drawCalls < 100** | §3: all repeats are `InstancedMesh` (1 draw each); BranchTubes merged; one `EffectComposer`/Canvas; budgets ~21 (landing) / ~16 (dashboard) — verified via `gl.info.render.calls` in PerfProbe. |
| **0 console errors** | `ssr:false` dynamic import (no `window` on server); `shaderMaterial` extend + module augmentation once at module scope; typed uniforms; no async loaders under Suspense; allocation-free `useFrame`. |
| **≤ 2 scene re-renders while animating** | §1–2: all per-frame state via `getState()` in `useFrame`; Canvas host subscribes to no reactive slice and carries `markSceneRender`; DOM CopyDeck/HUD are Canvas siblings; reactive slices mutate only on discrete transitions; HUD numerics throttled to 4 Hz via `useHudSnapshot()`. |
| **sustained 60 FPS (avg ≤ 17.4 ms, < 5% frames > 25 ms)** | `dpr={[1,2]}`; `antialias:false`; no shadow maps, no ambient wash, no SSAO/SSR/DoF; Bloom `mipmapBlur` only (~1–2 ms); mutate-in-place instances and uniforms — never allocate per frame; low-triangle procedural geometry; exp-damped camera avoids spikes. SwiftShader fallback: FPS advisory, draw-calls + console errors remain binding (renderer string recorded by PerfProbe). |

---
*One line through the dark, arriving exactly where it said it would — and never re-rendering.*
