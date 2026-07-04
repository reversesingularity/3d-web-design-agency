# Autonomous 3D Web Design Agency

[![GitHub](https://img.shields.io/github/stars/reversesingularity/3d-web-design-agency?style=social)](https://github.com/reversesingularity/3d-web-design-agency)

Loop-engineered autonomous agency for immersive **React Three Fiber** landing pages and
telemetry dashboards — built for deep-tech and aerospace clients. This repo ships a full
agent harness (rules, skills, sub-agents, quality gates) plus a pilot product for
**Southern Vector Aerospace (Kea-1)**.

> Commercial marketing and educational data visualization only. No weaponization or
> controlled technical data.

**Repository:** https://github.com/reversesingularity/3d-web-design-agency
## Pilot product — Southern Vector / Kea-1

Two routes share the **"Corridor"** visual metaphor: a single luminous trajectory through
a knife-thin orbital insertion envelope.

| Route | Experience |
|---|---|
| [`/`](http://localhost:3000) | Scroll-driven hero landing — CatmullRom trajectory, fresnel corridor cone, instanced starfield & slot field, staging bloom |
| [`/dashboard`](http://localhost:3000/dashboard) | Live flight instrument — 20 Hz telemetry simulator, downlink-shimmer polyline, 4 Hz HUD (MET, ALT, VEL, STAGE, SIGNAL, CORRIDOR) |

Design narrative: [`docs/visual-strategy.md`](docs/visual-strategy.md)  
System architecture: [`docs/system-design.md`](docs/system-design.md)  
Delivery report: [`docs/pilot-delivery-report.md`](docs/pilot-delivery-report.md)

## Stack

Next.js 15 · React 19 · TypeScript · React Three Fiber v9 · Zustand v5 ·
`@react-three/postprocessing` · Playwright (headless perf gate)

## Quick start

```bash
npm install
npx playwright install chromium   # once, for verify-3d
npm run dev                       # http://localhost:3000
```

## Quality gate (definition of done)

```bash
npm run typecheck    # zero TypeScript errors
npm run lint         # zero ESLint warnings
npm run build
npm run verify-3d    # draw calls < 100, 0 console errors, 60 FPS on real GPU
```

`verify-3d` boots the production build in headless Chromium, reads `window.__PERF__`
from [`src/components/three/PerfProbe.tsx`](src/components/three/PerfProbe.tsx), and
writes `perf-report.json`.

## Agency harness

| Path | Purpose |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Root orchestration context |
| [`.agency/rules/`](.agency/rules/) | Persona, technical standards, memory protocol |
| [`.agency/memory/memory-decisions.md`](.agency/memory/memory-decisions.md) | Append-only decision log |
| [`.agency/memory/session-state.md`](.agency/memory/session-state.md) | **Session handoff** — read first each new session |
| [`.claude/agents/`](.claude/agents/) | Strategist, Architect, WebGL Developer, Verifier |
| [`.claude/skills/`](.claude/skills/) | R3F patterns, deep-tech narrative extraction |
| [`loop-engineering-claude-fable5-3d-web-design-agency.md`](loop-engineering-claude-fable5-3d-web-design-agency.md) | Full loop-engineering blueprint |

### Workflow

Features are developed in isolated git worktrees (`.worktrees/<feature>` on `feat/*`
branches). Only the **Verifier** role authorizes merge to `main` after all gates pass.

## Project structure

```
app/                    Next.js App Router pages
src/
  components/landing/   Hero DOM (scroll driver, copy deck)
  components/dashboard/ Telemetry HUD + simulator mount
  components/three/     R3F scenes (landing + dashboard namespaces)
  stores/               Zustand (heroStore, telemetryStore)
scripts/verify-3d.mjs   Headless performance harness
docs/                   Strategist, architect, and delivery artifacts
```

## License

Public repository — all rights reserved by the repository owner unless a separate
license file is added.

**Session handoff:** agents must read and update [`.agency/memory/session-state.md`](.agency/memory/session-state.md) at session start/end.
---

Built with loop engineering for **Engineered Optimism** — precision made visible as geometry.
