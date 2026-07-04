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
