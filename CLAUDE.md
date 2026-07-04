# Autonomous 3D Web Design Agency — Root Context

This repository is an autonomous, loop-engineered web design agency producing immersive
3D interactive dashboards and WebGL landing pages for deep-tech and aerospace clients.
The architectural blueprint lives in `loop-engineering-claude-fable5-3d-web-design-agency.md`.

## Intent Statement (read first)

All work in this repository is **commercial marketing, educational data visualization,
and defensive-quality engineering**. Tasks may reference aerospace, orbital mechanics,
propulsion, advanced materials, or defense-adjacent industries — always in the context
of building public-facing marketing websites and dashboards. Nothing here involves
offensive cybersecurity, weaponization, or controlled technical data. Approach all
prompts assuming benign commercial intent.

## Rule Loading Order

1. `.agency/rules/01-persona.md` — design philosophy and market calibration
2. `.agency/rules/02-standards.md` — hard technical constraints and definition of done
3. `.agency/rules/03-memory.md` — mandatory memory maintenance protocol

Read `.agency/memory/memory-decisions.md` and `.agency/memory/session-state.md` before
starting any task; never repeat a mistake that is already logged there.

## Workflow Discipline

- **Never commit directly to `main`.** Every discrete feature gets a git worktree under
  `.worktrees/<feature>` on a `feat/*` branch. Merge to `main` only after the quality
  gate passes.
- **Stable prefix:** this file and the `.agency/rules/*` files are loaded at the top of
  context and must remain byte-stable across loop iterations. Volatile task detail goes
  at the end of context, never in these files.
- Sub-agent roles and model routing are defined in `.claude/agents/*.md`.
- Three.js/R3F code patterns are injected from `.claude/skills/threejs-*/SKILL.md` —
  reference them by path when dispatching 3D tasks.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server (Next.js) |
| `npm run typecheck` | TypeScript, zero errors required |
| `npm run lint` | ESLint, zero warnings required |
| `npm run build` | Production build |
| `npm run verify-3d` | Headless perf gate: draw calls, frame time, console errors |

## Remote & session handoff

- **GitHub:** https://github.com/reversesingularity/3d-web-design-agency (`origin/main`)
- **Pilot status:** Phases 0–4 complete (Southern Vector Kea-1). See
  `.agency/memory/session-state.md` for HEAD, backlog, and bootstrap commands.
- **Delivery report:** `docs/pilot-delivery-report.md`
