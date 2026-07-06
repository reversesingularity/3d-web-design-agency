# Session State (volatile — overwrite each session)

**Last updated:** 2026-07-06 (pipeline audit + brand imagery session)  
**Updated by:** Orchestrator — perf-gate integrity fix + blueprint archive shipped  
**Read this file first** after `memory-decisions.md` when starting a new session.

---

## Repository & remote

| Field | Value |
|---|---|
| **GitHub** | https://github.com/reversesingularity/3d-web-design-agency |
| **Remote** | `origin` → `https://github.com/reversesingularity/3d-web-design-agency.git` |
| **Default branch** | `main` |
| **HEAD** | tip of `feat/brand-imagery` merge — run `git log --oneline -3` for hashes (do NOT hand-copy hashes into this file; the last two pilot commits existed only to chase this field) |
| **Push state** | NOT pushed this session — `origin/main` is behind local `main` |
| **Visibility** | Public |

---

## Status: pilot COMPLETE + post-pilot hardening shipped

Pilot (Phases 0–4, Southern Vector Kea-1) closed on 2026-07-04. This session (2026-07-06):

1. **Full-gate audit on `main`** — typecheck / lint / build / verify-3d all PASS.
2. **`fix: PerfProbe accumulates gl.info across all composer passes`** — the draw-call
   gate had been reading only the composer's final fullscreen pass (1 call / 1 tri).
   True numbers now: landing 22 calls / 212k tris, dashboard 21 / 212k. Both under
   the <100 budget at 60.0–60.2 FPS, 0 errors, 0 scene re-renders.
3. **`feat: blueprint technical archive on landing page`** — 8 client-uploaded Kea-1
   engineering plates (in `public/blueprints/`, kebab-case) rendered in a new
   `BlueprintArchive` section below the Corridor narrative; `ScrollDriver` now anchors
   scroll progress to `#corridor-narrative` so appended sections never compress the
   scene choreography. Visual check: 8/8 plates load, zero failed requests.

Original uploads remain untracked at repo-root `images/` (user's files — not deleted).

---

## Live product (on `main`)

| Route | Entry | Key files |
|---|---|---|
| Hero landing | `app/page.tsx` | `src/components/landing/*` (incl. `BlueprintArchive.tsx` + module.css), `src/components/three/landing/*`, `src/stores/heroStore.ts` |
| Telemetry dashboard | `app/dashboard/page.tsx` | `src/components/dashboard/*`, `src/components/three/dashboard/*`, `src/stores/telemetryStore.ts`, `src/hooks/useHudSnapshot.ts` |
| Shared perf probe | — | `src/components/three/PerfProbe.tsx` (autoReset=false + manual per-frame reset) |
| Blueprint plates | `/blueprints/*.jpg` | `public/blueprints/` — 8 plates, 1168×784 |

**Controlling docs (do not contradict without Strategist/Architect re-run):**
`docs/visual-strategy.md`, `docs/system-design.md`.

---

## Environment bootstrap (every fresh clone / CI)

```bash
npm install
npx playwright install chromium   # required once for verify-3d
npm run typecheck && npm run lint && npm run build && npm run verify-3d
npm run dev                       # http://localhost:3000
```

**Local GPU:** RTX 3080 via ANGLE/D3D11 — FPS gate is binding.

---

## Worktrees

Merged and safe to prune (`git worktree remove .worktrees/<name>`):
`bootstrap`, `scaffold`, `hero`, `dashboard`, `perfprobe`, `imagery`.

For new features: `git worktree add .worktrees/<feature> -b feat/<feature>`, then
`npm ci` inside it. Run `npx playwright install chromium` once per machine.

---

## Priority backlog (next session)

1. **Push to origin** — local `main` has the perf fix + blueprint archive; user
   confirmation expected before push.
2. **De-dupe shared 3D primitives** — Starfield/SlotField/materials into
   `src/components/three/shared/`; update `system-design.md` ownership map.
3. **Regenerate blueprint plates (optional)** — current AI-generated renders contain
   typo text ("VECICLE", "DISPEPPER", "ARPUITECTURE"); fine at display size, flagged
   to user 2026-07-06.
4. **Real telemetry feed** — WebSocket/REST poller behind the existing 20 Hz transient /
   4 Hz HUD pattern.
5. **CI workflow** — GitHub Actions full gate; SwiftShader frame-time advisory applies.
6. **`next lint` deprecation** — migrate to ESLint CLI before Next 16 (config must stay
   in `package.json#eslintConfig`; standalone ESLint config files are hook-blocked).

---

## Agent routing (this harness)

| Role | Agent file | When to invoke |
|---|---|---|
| Deep-Tech Strategist | `.claude/agents/deep-tech-strategist.md` | New client / new narrative |
| R3F Architect | `.claude/agents/r3f-architect.md` | After strategy, before code |
| WebGL Developer | `.claude/agents/webgl-developer.md` | Implementation |
| Verifier | `.claude/agents/verifier.md` | Pre-merge quality gate |

Model routing (see `memory-decisions.md`): Opus = shader/math architecture; Sonnet =
UI + WebGL dev; Haiku = verification tickets.

---

## Session handoff protocol

When ending a session, the active agent **must**:

1. Append new workarounds to `.agency/memory/memory-decisions.md` (append-only).
2. **Overwrite** this file with current status, backlog, and blockers — reference
   branches and dates, not commit hashes.
3. Update `docs/pilot-delivery-report.md` only if a milestone shipped.
4. Push to `origin/main` only with user confirmation.

When starting a session, read in order: `CLAUDE.md` → `.agency/rules/01..03` →
`memory-decisions.md` → this file.
