# Technical Architecture & Constraints

## Stack (fixed)

Next.js 15 (App Router) · React 19 · TypeScript strict · React Three Fiber v9 ·
@react-three/drei · @react-three/postprocessing · Zustand v5 · three.js

## State Management

- NEVER use React `useState` or Context API for high-frequency 3D state
  (camera position, animation progress, cursor tracking, per-frame telemetry).
- MUST use Zustand for all global and transient state.
- High-frequency consumers read the store **transiently** inside R3F `useFrame` via
  `useStore.getState()` / `store.subscribe()` — never via the reactive hook selector —
  so per-frame updates trigger **zero React re-renders**.
- Low-frequency UI (HUD text, stat readouts) may subscribe reactively but must be
  throttled to ≤ 4 Hz.

## React Three Fiber Performance

- NEVER instantiate multiple `<mesh>` components for repeated geometry (stars, debris,
  data nodes). MUST use `InstancedMesh` — thousands of copies, one draw call.
- NEVER create geometries, materials, or vectors inside `useFrame` or render. Allocate
  once (`useMemo` / module scope) and mutate in place.
- ALWAYS dispose: geometries, materials, and textures leak GPU memory on unmount unless
  `.dispose()` is called (R3F auto-disposes declaratively-mounted objects; anything
  created imperatively must be disposed in the effect cleanup).
- NEVER block the main thread with synchronous asset loading. Use `<Suspense>` +
  `useLoader`/drei hooks.
- Cap `dpr` at `[1, 2]` on the Canvas; high-DPI displays must not quadruple fill cost.

## Verification & Definition of Done

A task is NOT complete until, in the feature worktree:

1. `npm run typecheck` reports **zero errors**.
2. `npm run lint` reports **zero warnings**.
3. `npm run build` succeeds.
4. `npm run verify-3d` passes: **draw calls < 100 per frame**, **zero page console
   errors**, **≤ 2 React re-renders of the scene while animating**, and **sustained
   60 FPS** — average frame interval ≤ 17.4 ms (rAF is vsync-locked, so a healthy
   60 FPS scene averages ~16.7 ms; never gate on a raw 16.6 cutoff) with < 5% of
   frames slower than 25 ms. When the headless renderer falls back to SwiftShader
   software rendering the FPS gate is advisory and draw calls + console errors are
   binding — record the renderer string in the report.

Only the Verifier role authorizes a merge to `main`.
