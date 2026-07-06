# Autonomous 3D Web Design Agency

> **Loop-engineered, multi-agent WebGL production system built on Claude Fable 5**  
> Pilot deliverable: *Southern Vector Aerospace — Kea-1 landing page + telemetry dashboard*

```
                     ╔═══════════════════════════════════════╗
                     ║   Your orbit. To the metre.           ║
                     ║                               ·       ║
                     ║         ·    ·    ·    ●──────┤       ║
                     ║   ·  ·                 │      ┤  ◎    ║
                     ║ ══════════════ Corridor │      ┤  ◎   ║
                     ║   ·  ·         ─────────┘      ┤  ◎  ║
                     ║         ·    ·    ·    ·        ┘     ║
                     ║                               ·       ║
                     ╚═══════════════════════════════════════╝
                                Kea-1 · sub-100 m insertion
```

[![GitHub](https://img.shields.io/github/stars/reversesingularity/3d-web-design-agency?style=social)](https://github.com/reversesingularity/3d-web-design-agency)

> All work in this repository is commercial marketing and educational data visualization.
> No weaponization or controlled technical data.

---

## What is this?

This repository is two things simultaneously:

**1. A production-grade agency harness** — a fully autonomous, loop-engineered agent pipeline that takes a client brief through narrative strategy → 3D system architecture → parallel WebGL implementation → headless quality gate → merge, with no human intervention between phases.

**2. A shipped WebGL product** — the pilot deliverable for deep-tech client *Southern Vector Aerospace*: a cinematic landing page and a live flight-telemetry dashboard, both passing a binding headless performance gate at sustained 60 FPS on real GPU hardware.

The agency runs on **Claude Fable 5** with model-routed sub-agents (Opus for shader math, Sonnet for UI/WebGL, Haiku for verification), coordinated by a loop-engineering control protocol adapted from [`loop-engineering-claude-fable5-3d-web-design-agency.md`](loop-engineering-claude-fable5-3d-web-design-agency.md).

---

## Design Philosophy: Engineered Optimism

Deep-tech ventures sell a *probability*, not a shipped consumer product. The standard vocabulary — purple gradients, floating UI mockups, generic rocket renders — signals vaporware.

This agency bridges the **Credibility Gap**:

```
  Science as validated engine  ──▶  Commercial as scalable vehicle
  ─────────────────────────────────────────────────────────────────
  Test artifacts, telemetry,         Priced guarantees, delivery
  static-fire records, dates         timelines, revenue logic

  Never render hardware CAD.         Never promise the future.
  Render the physics it achieves.    Sell the consequence it delivers.
```

Visual mandate: **metaphorical physics** — orbital trajectories, corridor geometries, particle mechanics — rendered with Swiss/mono typography in a deep dark palette at the quality standard of Psychoactive Studios, Lusion, and Noomo Agency.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 · App Router · React 19 |
| 3D engine | Three.js 0.172 via React Three Fiber v9 |
| Postprocessing | `@react-three/postprocessing` v3 + `postprocessing` |
| State | Zustand v5 (transient reads in `useFrame` — zero re-renders at 60 Hz) |
| Helpers | `@react-three/drei` v10 |
| Language | TypeScript (strict, zero-error gate) |
| Testing | Playwright headless perf harness (`scripts/verify-3d.mjs`) |
| Agents | Claude Fable 5 (Opus · Sonnet · Haiku) via Claude Code agent SDK |

---

## Agent Pipeline

The agency runs a **Perceive → Reason → Plan → Act → Observe** loop across four specialist agents:

```
  ┌─────────────────────────────────────────────────────────────────────┐
  │                         AGENCY PIPELINE                             │
  │                                                                     │
  │   Client brief / technical material                                 │
  │          │                                                          │
  │          ▼                                                          │
  │   ┌──────────────────┐   model: sonnet                             │
  │   │ Deep-Tech         │   Tools: Read · Grep · WebFetch · Write     │
  │   │ Strategist        │──▶ docs/visual-strategy.md                  │
  │   │                   │   narrative · metaphor · copy deck          │
  │   └──────────────────┘   palette · motion principles               │
  │          │                                                          │
  │          ▼                                                          │
  │   ┌──────────────────┐   model: opus  (highest reasoning)          │
  │   │ R3F Architect     │   Tools: Read · Grep · Glob · Write         │
  │   │                   │──▶ docs/system-design.md                    │
  │   └──────────────────┘   store shape · component tree              │
  │          │                shader spec · draw-call budget            │
  │          │                                                          │
  │          ▼  parallel git worktrees                                  │
  │   ┌──────────┐ ┌──────────┐   model: sonnet                        │
  │   │ WebGL    │ │ WebGL    │   Tools: Read · Write · Edit · Bash     │
  │   │ Dev A    │ │ Dev B    │   Self-healing loop:                    │
  │   │ landing  │ │ dashboard│   dev server → capture errors           │
  │   └────┬─────┘ └────┬─────┘   → fix → repeat until clean           │
  │        └──────┬──────┘                                             │
  │               ▼                                                     │
  │   ┌──────────────────┐   model: haiku  (verification only)         │
  │   │ Verifier          │   Tools: Read · Bash · Grep · Glob          │
  │   │                   │──▶ typecheck · lint · build · verify-3d     │
  │   └──────────────────┘   PASS → merge to main                      │
  │               │           FAIL → exact evidence back to Dev         │
  │               ▼                                                     │
  │         main (gated)                                                │
  └─────────────────────────────────────────────────────────────────────┘
```

### Agent Definitions

| Agent | Model | Role | Output |
|---|---|---|---|
| [`deep-tech-strategist`](.claude/agents/deep-tech-strategist.md) | Sonnet | Narrative extraction, visual metaphor, copy deck | `docs/visual-strategy.md` |
| [`r3f-architect`](.claude/agents/r3f-architect.md) | Opus | Store design, component hierarchy, shader spec, instancing plan | `docs/system-design.md` |
| [`webgl-developer`](.claude/agents/webgl-developer.md) | Sonnet | R3F scene implementation, self-healing code loop | Scene files |
| [`verifier`](.claude/agents/verifier.md) | Haiku | Headless gate — sole merge authority | `perf-report.json` verdict |

### Git Worktree Isolation

Every feature is developed in an isolated git worktree on a `feat/*` branch. `main` only receives Verifier-gated merges.

```
  repo root (main)
  └── .worktrees/
      ├── bootstrap/      feat/agency-bootstrap    ──▶ merged
      ├── scaffold/       feat/pilot-scaffold      ──▶ merged
      ├── hero/           feat/hero-landing        ──▶ merged
      ├── dashboard/      feat/telemetry-dashboard ──▶ merged
      ├── perfprobe/      feat/perfprobe-accuracy  ──▶ merged
      └── imagery/        feat/brand-imagery       ──▶ merged
```

---

## Repository Structure

```
3d-web-design-agency/
│
├── app/                                    Next.js App Router
│   ├── page.tsx                            / (hero landing, SSR disabled)
│   ├── dashboard/page.tsx                  /dashboard (telemetry, SSR disabled)
│   ├── globals.css                         Design tokens (CSS custom properties)
│   └── layout.tsx                          Space Grotesk + IBM Plex Mono
│
├── src/
│   ├── stores/
│   │   ├── heroStore.ts                    Zustand: scroll/pointer/phase (transient)
│   │   └── telemetryStore.ts               Zustand: 20 Hz flight profile + ring buffer
│   ├── hooks/
│   │   └── useHudSnapshot.ts               4 Hz throttled HUD snapshot
│   └── components/
│       ├── landing/                        DOM layer — landing page
│       │   ├── LandingPage.tsx
│       │   ├── ScrollDriver.tsx            null; window listeners → heroStore
│       │   ├── CopyDeck.tsx                5 scroll sections, reduced-motion aware
│       │   └── BlueprintArchive.tsx        8 engineering plate gallery (next/image)
│       ├── dashboard/                      DOM layer — telemetry dashboard
│       │   ├── DashboardPage.tsx
│       │   ├── HUD.tsx                     MET/ALT/VEL/STAGE/SIGNAL/CORRIDOR readouts
│       │   └── TelemetrySimulatorMount.tsx null; start()/stop() 20 Hz simulator
│       └── three/
│           ├── PerfProbe.tsx               Shared: publishes window.__PERF__ for gate
│           ├── landing/                    Hero scene graph (Dev A namespace)
│           │   ├── CorridorCanvas.tsx
│           │   ├── CorridorScene.tsx
│           │   ├── LandingEffects.tsx
│           │   ├── Starfield.tsx           InstancedMesh 8k points
│           │   ├── SlotField.tsx           InstancedMesh 1.5k orbital slots
│           │   └── materials/
│           │       ├── CorridorFresnelMaterial.tsx
│           │       └── StagingBloomMaterial.tsx
│           └── dashboard/                  Instrument scene graph (Dev B namespace)
│               ├── InstrumentCanvas.tsx
│               ├── InstrumentScene.tsx
│               ├── DashboardEffects.tsx
│               ├── Starfield.tsx
│               ├── SlotField.tsx
│               └── materials/
│                   ├── CorridorFresnelMaterial.tsx
│                   ├── StagingBloomMaterial.tsx
│                   └── DownlinkShimmerMaterial.tsx
│
├── public/blueprints/                      8 × Kea-1 engineering plates (1168×784 JPG)
│
├── docs/
│   ├── visual-strategy.md                  Strategist deliverable
│   ├── system-design.md                    Architect deliverable
│   └── pilot-delivery-report.md            Phase ledger + verifier evidence
│
├── .agency/
│   ├── rules/01-persona.md                 Design philosophy + market calibration
│   ├── rules/02-standards.md               Hard constraints + definition of done
│   ├── rules/03-memory.md                  Memory maintenance protocol
│   ├── memory/memory-decisions.md          Append-only workaround log
│   └── memory/session-state.md             Volatile session handoff (overwrite each session)
│
├── .claude/
│   ├── agents/                             Sub-agent definitions with model frontmatter
│   └── skills/                             Injected Three.js code patterns
│       ├── threejs-fundamentals/
│       ├── threejs-loaders/
│       ├── threejs-shaders/
│       ├── threejs-postprocessing/
│       └── deep-tech-narrative/
│
└── scripts/
    └── verify-3d.mjs                       Headless Playwright perf gate
```

---

## Pilot: Southern Vector Aerospace — Kea-1

### The Visual Metaphor: "The Corridor"

> *One luminous trajectory threading a knife-thin insertion corridor through a vast field of target orbital slots. Precision made visible as geometry.*

The same metaphor governs both routes. On the landing page, scroll is the timeline. On the dashboard, live telemetry is the timeline.

```
  SCROLL PROGRESS → SCENE PHASE (landing)
  ────────────────────────────────────────────────────────────────────
  0.00 ──── 0.25  corridor   Starfield parallax, trajectory spline rises
  0.25 ──── 0.50  tighten    Fresnel cone contracts to knife-edge (sub-100 m claim)
  0.50 ──── 0.75  branch     Spline forks 3–5× — Moa multi-drop payload logic
  0.75 ──── 1.00  deploy     SlotNodes ignite, StagingBloom fires, CTA appears
  ────────────────────────────────────────────────────────────────────
  All transitions driven by heroStore.scroll via getState() in useFrame.
  Zero React re-renders during scroll — phase is transient state only.
```

### `/` — Hero Landing Scene Graph

```
  LandingPage
  ├── ScrollDriver              null; attaches window scroll + pointermove listeners
  ├── CorridorCanvas            fixed/sticky; R3F scene
  │   └── Canvas  fov=42  dpr=[1,2]  antialias=false  clearColor=#05070d
  │       ├── CorridorScene
  │       │   ├── ScrollCameraRig      exp-damped spline camera (useFrame)
  │       │   ├── GravityWellGrid      1× wireframe LineSegments (gravity well)
  │       │   ├── Starfield            InstancedMesh  8 000 pts  (parallax)
  │       │   ├── SlotField            InstancedMesh  1 500 pts  (orbital shells)
  │       │   ├── TrajectoryTube       TubeGeometry on CatmullRom spline
  │       │   ├── CorridorCone         CorridorFresnelMaterial (tighten shader)
  │       │   ├── BranchTubes          merged geometry — 3–5 forks, 1 draw call
  │       │   ├── SlotNodes            InstancedMesh ~20 (ignition events)
  │       │   └── StagingBurst         InstancedMesh 512  (additive burst pool)
  │       ├── LandingEffects    EffectComposer: Bloom(threshold=1) + Vignette + Noise
  │       └── PerfProbe         publishes window.__PERF__
  └── main
      ├── #corridor-narrative (500vh)  ← ScrollDriver anchors here, not document
      │   └── CopyDeck  (5 sections: headline, stats, Moa, Tui, CTA)
      └── BlueprintArchive  (8 plates via next/image — zero GPU cost)
```

### `/dashboard` — Telemetry Instrument Scene Graph

```
  DashboardPage
  ├── TelemetrySimulatorMount    null; 20 Hz setInterval outside React
  ├── InstrumentCanvas           fixed; ortho-leaning scene  fov=24
  │   └── Canvas  dpr=[1,2]  antialias=false
  │       ├── InstrumentScene
  │       │   ├── Starfield              InstancedMesh 8 000  (dimmed — visual continuity)
  │       │   ├── SlotField              InstancedMesh 1 500  (dimmed)
  │       │   ├── CorridorEnvelope       translucent nominal tube, Fresnel tighten
  │       │   ├── TelemetryPolyline      THREE.Line; head lerped in useFrame
  │       │   └── StageBurst             InstancedMesh 512  (stage sep / Moa deploy)
  │       ├── DashboardEffects    EffectComposer: Bloom(threshold=1) + Vignette
  │       └── PerfProbe
  └── HUD  (DOM — IBM Plex Mono, tabular-nums)
      ├── MET       T+ 00:04:12        mission elapsed time
      ├── ALT       142.7 KM
      ├── VEL       5 214 M/S
      ├── STAGE     S2 BURN / MOA DEPLOY 2/4
      ├── SIGNAL    AOS · NOMINAL  /  LOS  (alert color)
      └── CORRIDOR  Δ 38 M · NOMINAL
```

**HUD update architecture:**

```
  telemetryStore (20 Hz write)  ──▶  useHudSnapshot() 4 Hz poll  ──▶  React render
  reactive slices (stage / payloads / signalState)  ──▶  subscribe directly (event freq)
```

---

## State Architecture

```
  ┌───────────────────────────────────────────────────────────────────┐
  │                       STATE FLOW                                  │
  │                                                                   │
  │  TRANSIENT  (60 Hz writes — zero React re-renders)                │
  │  ┌──────────────────────────────────────────────────────────┐     │
  │  │  heroStore         scroll · pointer · phase              │     │
  │  │  telemetryStore    missionTime · altitude · velocity     │     │
  │  │                    corridorDeviation · signalStrength     │     │
  │  │                    samples (ring buffer) · sampleHead    │     │
  │  └─────────────────────────┬────────────────────────────────┘     │
  │                            │  getState() in useFrame              │
  │                            ▼                                      │
  │        WebGL uniforms / camera / instance matrices (GPU)          │
  │                                                                   │
  │  REACTIVE  (event-frequency writes — minimal renders)             │
  │  ┌──────────────────────────────────────────────────────────┐     │
  │  │  heroStore         activeSection  (0–4, on threshold)    │     │
  │  │  telemetryStore    stage · signalState · payloads[]      │     │
  │  └─────────────────────────┬────────────────────────────────┘     │
  │                            │                                      │
  │               ┌────────────┴────────────┐                         │
  │               ▼                         ▼                         │
  │         CopyDeck                  HUD (via useHudSnapshot)        │
  │         subscribes activeSection  4 Hz numeric snapshot +         │
  │         (handful of renders)      direct event slice subs         │
  └───────────────────────────────────────────────────────────────────┘
```

---

## Shader Signatures

Three custom GLSL materials define the visual identity of the product.

### 1. CorridorFresnelMaterial — *The Corridor Fresnel Tighten*

Used on the corridor cone (landing) and nominal envelope (dashboard).

```glsl
// Fragment core
float fresnel = pow(1.0 - dot(N, V), edgePower);
//
// edgePower = mix(1.5, 6.0, uTighten)
//
// uTighten → 0.0  :  wide teal haze   (vehicle is far from target slot)
// uTighten → 1.0  :  knife-edge rim   (sub-100 m insertion achieved)
//
// The visual narrowing IS the accuracy claim — precision as geometry.
```

| Uniform | Source | Meaning |
|---|---|---|
| `uTighten` | landing: `heroStore.scroll` (section 2 window) | scroll-driven tighten |
| `uTighten` | dashboard: `altitude / targetAltitude` | ascent-driven tighten |
| `uTime` | `useFrame` delta | breathing shimmer |

### 2. StagingBloomMaterial — *Staging Bloom*

Used on the 512-particle additive burst pool on both routes.

```glsl
// Vertex: particle kinematics from per-instance birth data
float age = uTime - aBirth;
vec3 pos = origin + aVelocity * age;

// Fragment: hot → ember → teal-trace color progression
// Color pushed > 1.0 so ONLY threshold-1 Bloom fires on events.
// AdditiveBlending: particles compound with underlying starfield.
```

| Uniform | Source |
|---|---|
| `uBurstTime` | landing: `heroStore.phase` transitions (`tighten` / `deploy`) |
| `uBurstTime` | dashboard: `telemetryStore.stage` = `STAGE_SEP` / `MOA_DEPLOY` |

### 3. DownlinkShimmerMaterial — *Downlink Shimmer* (dashboard only)

Used on `TelemetryPolyline`. Reads as live data-in-motion, not decoration.

```glsl
// Fragment: travelling scanline along arc-length UV of the polyline
float scanline = fract(uv.x * freq - uTime * uFlow);
// Per-channel UV offset → chromatic fringe
// uSignal scales brightness: weak signal = dim + alert color mix
// uReduced=1 freezes scanline for prefers-reduced-motion
```

| Uniform | Source |
|---|---|
| `uSignal` | `telemetryStore.signalStrength` |
| `uFlow` | `telemetryStore.signalState` (`LOS` → alert color `#f43f5e`) |
| `uReduced` | `matchMedia("(prefers-reduced-motion)")` |

---

## Draw-Call Budget

Every repeated element is one `InstancedMesh` (one draw call regardless of count).

**Landing page (`/`) — measured: 22 draw calls**

| Source | Calls |
|---|---|
| GravityWellGrid, TrajectoryTube, CorridorCone, BranchTubes (merged) | 4 |
| Starfield, SlotField, SlotNodes, StagingBurst (all instanced) | 4 |
| EffectComposer: input copy + Bloom mip chain + Vignette + Noise | ~14 |
| **Total** | **22** |

**Dashboard (`/dashboard`) — measured: 21 draw calls**

| Source | Calls |
|---|---|
| CorridorEnvelope, TelemetryPolyline | 2 |
| Starfield, SlotField, StageBurst (all instanced) | 3 |
| EffectComposer: input copy + Bloom mip chain + Vignette | ~16 |
| **Total** | **21** |

Gate limit: **< 100**. Both scenes operate at ~22% of the budget.

---

## Performance Gate

`scripts/verify-3d.mjs` is the binding quality gate. Every feature branch must pass before merging to `main`.

```
  npm run verify-3d
  │
  ├── boot next start (production build)
  ├── navigate /  →  wait for window.__PERF__.samples ≥ 120 frames
  │   ├── drawCalls < 100              instancing budget
  │   ├── avgFrameMs ≤ 17.4 ms         vsync-locked 60 Hz = 16.67 ms; gate at +0.73 ms margin
  │   ├── droppedFramePct < 5%         frames > 25 ms threshold
  │   ├── sceneRendersDelta ≤ 2        Zustand transient state correctness
  │   └── consoleErrors = 0            WebGL context, hydration, type errors
  └── navigate /dashboard  →  same gates
  │
  └── writes perf-report.json  →  PASS / FAIL
```

**Verified results on `main` (2026-07-06 · NVIDIA RTX 3080 · ANGLE/D3D11):**

| Route | drawCalls | triangles | avgFrameMs | fps | dropped | errors | sceneRenders+ |
|---|---|---|---|---|---|---|---|
| `/` | 22 | 212,065 | 16.61 | 60.2 | 0.4% | 0 | 0 |
| `/dashboard` | 21 | 212,321 | 16.67 | 60.0 | 0.4% | 0 | 0 |

> **PerfProbe accuracy note:** Three.js `gl.info.autoReset = true` (default) resets render stats on
> every `renderer.render()` call. With a multi-pass EffectComposer, the probe only captured the
> final fullscreen pass (1 call / 1 triangle). Fixed in [`src/components/three/PerfProbe.tsx`](src/components/three/PerfProbe.tsx)
> by disabling autoReset and calling `gl.info.reset()` manually once per frame. Readings before
> 2026-07-06 are under-counted.

---

## Design Tokens

```css
:root {
  /* Space — black is a material */
  --bg:           #05070d;   /* dominant surface */
  --bg-raised:    #0a0f1a;   /* panels, HUD cards */

  /* Copy */
  --ink:          #e6edf3;   /* primary text */
  --ink-dim:      #8b98a9;   /* labels, secondary */

  /* Teal = precision / nominal */
  --accent:       #5eead4;   /* corridor rim, telemetry, links */
  --accent-deep:  #0f766e;   /* corridor volume fill, slot particles */
  --accent-faint: #134e4a;   /* gravity-well grid, dimmed shells */

  /* Orange = energy / event  (rationed — < 5% of any frame) */
  --accent-hot:   #f97316;   /* burns, staging events, CTAs */
  --ember:        #fdba74;   /* bloom core: hot → ember decay */

  /* System */
  --alert:        #f43f5e;   /* dashboard LOS / off-nominal only */
  --line:         #1b2333;   /* hairlines, grid strokes */
}
```

**Typography rule:** Space Grotesk for display; IBM Plex Mono for every number a customer might quote. Any stat on the site is mono with `font-variant-numeric: tabular-nums`.

---

## Quick Start

```bash
# Clone and install
git clone https://github.com/reversesingularity/3d-web-design-agency.git
cd 3d-web-design-agency
npm install

# Playwright browser — required once per machine for verify-3d
npx playwright install chromium

# Full definition-of-done gate
npm run typecheck   # zero TypeScript errors
npm run lint        # zero ESLint warnings
npm run build       # production build succeeds
npm run verify-3d   # headless perf gate — writes perf-report.json

# Development server
npm run dev         # http://localhost:3000  +  http://localhost:3000/dashboard
```

---

## Agency Loop Control

The autonomous loop is governed by three rules files and two memory files that every session and sub-agent must read before acting:

```
  Session start read order:
  ┌──────────────────────────────────────────────────────────┐
  │  1. CLAUDE.md                          stable prefix     │
  │  2. .agency/rules/01-persona.md                          │
  │  3. .agency/rules/02-standards.md                        │
  │  4. .agency/rules/03-memory.md                           │
  │  5. .agency/memory/memory-decisions.md   append-only     │
  │  6. .agency/memory/session-state.md      overwrite       │
  └──────────────────────────────────────────────────────────┘
```

`memory-decisions.md` is the doom-loop preventer: every non-obvious workaround is appended so the next agent never makes the same mistake twice.

`session-state.md` is the handoff document: current HEAD, push state, live backlog, and bootstrap commands — overwritten at the end of every session.

---

## Pilot Phase Ledger

| Phase | Deliverable | Status |
|---|---|---|
| 0 | Git init, bootstrap worktree | ✓ Complete |
| 1 | Agency infra (rules, agents, skills, memory) | ✓ Complete |
| 2 | Next.js 15 + R3F scaffold + headless perf gate | ✓ Complete |
| 3a | Deep-Tech Strategist + R3F Architect docs | ✓ Complete |
| 3b | Parallel hero landing + telemetry dashboard builds | ✓ Complete |
| 3c | Verifier gate + merge to `main` | ✓ Complete |
| 4 | Memory update, cleanup, delivery report | ✓ Complete |
| — | PerfProbe autoReset accuracy fix | ✓ Complete |
| — | Blueprint archive (8 engineering plates) | ✓ Complete |

---

## Known Backlog

| Priority | Item |
|---|---|
| 1 | De-dupe shared 3D primitives (Starfield, SlotField, materials) → `src/components/three/shared/` |
| 2 | Real telemetry feed — WebSocket/REST behind the existing 20 Hz / 4 Hz pattern |
| 3 | CI workflow — GitHub Actions: `npm ci`, Playwright install, full gate on push/PR |
| 4 | `next lint` deprecation migration (Next 16) — ESLint CLI; config must stay in `package.json#eslintConfig` |
| 5 | Regenerate blueprint plates with corrected render text (AI-generated; typos visible at macro zoom) |

---

*One line through the dark, arriving exactly where it said it would.*
