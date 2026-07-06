# Memory: Decisions & Workarounds (append-only)

- 2026-07-04 — Worktrees live at `.worktrees/<feature>` inside the repo (gitignored),
  not as sibling directories, to stay inside the harness sandbox.
- 2026-07-04 — `r3f-webgpu-perf` exists on npm (v0.1.4, early release). Merge gating
  uses a custom `PerfProbe` reading `gl.info.render` exposed on `window.__PERF__`
  (deterministic in headless Chromium); the visual monitor is optional behind `?hud=1`.
- 2026-07-04 — Headless Chromium may fall back to SwiftShader software rendering, which
  makes absolute frame-time gates unreliable in CI. Binding gates: draw calls + console
  errors; frame time is binding only on real GPU (check UNMASKED_RENDERER_WEBGL).
- 2026-07-04 — Model routing (this harness has Claude models only): Opus = 3D
  math/shader architecture; Sonnet = UI + primary WebGL development; Haiku =
  strictly-scoped verification/fix tickets.
- 2026-07-04 — A config-protection hook in this harness blocks writing any ESLint
  config file (`eslint.config.mjs`, `.eslintrc.json`) even on first creation. ESLint
  rules therefore live in the `eslintConfig` key of `package.json`. Do not attempt to
  create standalone ESLint config files.
- 2026-07-04 — rAF frame intervals are vsync-locked: a perfectly healthy 60 FPS scene
  measures ~16.67 ms, which FAILS a naive `<= 16.6 ms` gate. Gate on avg ≤ 17.4 ms
  plus dropped-frame % (>25 ms frames < 5%) instead. Headless Chromium on this machine
  uses the real RTX 3080 via ANGLE/D3D11 (no SwiftShader fallback), so FPS gates are
  binding locally.
- 2026-07-04 — Parallel Phase 3b builds used namespaced folders (`three/landing/**` vs
  `three/dashboard/**`) with intentional duplication of Starfield, SlotField, and shader
  materials per `docs/system-design.md` §0. De-dupe into shared primitives is a
  post-merge refactor, not a merge blocker.
- 2026-07-04 — Shared CSS tokens (`--accent-deep`, `--accent-faint`, `--alert`, `--ember`)
  were appended once on `feat/hero-landing` before the dashboard worktree started; the
  dashboard branch carried identical `:root` lines and merged to `main` without conflict.
- 2026-07-04 — `npm run lint` inside `.worktrees/*` fails when the repo root lacks
  `node_modules`: Next.js multi-lockfile detection resolves ESLint config from the parent
  `package.json`. Binding fix: `npm install` at repo root before lint/verify; optional
  hardening: set `outputFileTracingRoot` in `next.config.ts` to silence workspace warnings.
- 2026-07-04 — Fresh worktrees need `npx playwright install chromium` once before
  `npm run verify-3d` (Playwright browsers are not bundled in `npm install`).
- 2026-07-04 — Dashboard telemetry polyline: use imperative `THREE.Line` with
  `DownlinkShimmerMaterialImpl` via `<primitive object={line} />`; declarative R3F
  `<line>` clashes with React 19 SVG intrinsic types in strict TypeScript.
- 2026-07-04 — Published to GitHub: `reversesingularity/3d-web-design-agency` (public,
  `origin/main`). Session handoff lives in `.agency/memory/session-state.md` (volatile,
  overwrite each session); `memory-decisions.md` stays append-only.
- 2026-07-04 — `outputFileTracingRoot` set in `next.config.ts` to the repo root so
  worktrees with their own `node_modules` resolve lint/build to the correct package.json.
- 2026-07-06 — `gl.info.autoReset` resets stats on EVERY `renderer.render()` call, so
  with a multi-pass EffectComposer the probe only ever saw the final fullscreen pass
  (1 call / 1 triangle) and the draw-call gate was trivially green. Fix in PerfProbe:
  `gl.info.autoReset = false` + manual `gl.info.reset()` once per frame in `useFrame`
  (pre-render), which publishes the previous frame's accumulated totals across all
  passes. Expect historical perf-report drawCalls/triangles readings before this date
  to be under-counted.
