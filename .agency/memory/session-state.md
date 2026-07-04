# Session State (volatile — overwrite each session)

**Last updated:** 2026-07-04 (session handoff commit)  
**Updated by:** Session closure — governance alignment + GitHub sync  
**Read this file first** after `memory-decisions.md` when starting a new session.

---

## Repository & remote

| Field | Value |
|---|---|
| **GitHub** | https://github.com/reversesingularity/3d-web-design-agency |
| **Remote** | `origin` → `https://github.com/reversesingularity/3d-web-design-agency.git` |
| **Default branch** | `main` (synced with `origin/main`) |
| **HEAD** | `36a7a0a` — chore: point session-state at current HEAD |
| **Visibility** | Public |

### Recent commit history

```
5ad55a0 chore: session handoff governance and agent alignment
82b487e docs: add project README for GitHub
763e6e6 docs: Phase 4 pilot closure — memory log and delivery report
47de3ce merge: feat/telemetry-dashboard
da0ec20 feat: flight telemetry dashboard with instrument scene and HUD
18adb66 feat: Kea-1 corridor hero landing with scroll-driven R3F scene
de5420c docs: visual strategy and system design for Southern Vector pilot
bcd0925 feat: Next.js 15 + R3F pilot scaffold with verify-3d quality gate
caea785 feat: agency infrastructure
eba7739 docs: add loop-engineering agency blueprint
```

---

## Pilot status: COMPLETE (Phases 0–4)

The Southern Vector Aerospace (Kea-1) pilot loop is **closed**. All phases merged to
`main` and published to GitHub. The agency harness is operational for the **next client
engagement** or **post-pilot refinements**.

| Phase | Status |
|---|---|
| 0 Git bootstrap | Done |
| 1 Agency infra | Done |
| 2 R3F scaffold + verify-3d | Done |
| 3a Strategist + Architect docs | Done |
| 3b Parallel hero + dashboard | Done |
| 3c Verifier + merge | Done |
| 4 Memory + delivery report | Done |

**Delivery report:** `docs/pilot-delivery-report.md`

---

## Live product (on `main`)

| Route | Entry | Key files |
|---|---|---|
| Hero landing | `app/page.tsx` | `src/components/landing/*`, `src/components/three/landing/*`, `src/stores/heroStore.ts` |
| Telemetry dashboard | `app/dashboard/page.tsx` | `src/components/dashboard/*`, `src/components/three/dashboard/*`, `src/stores/telemetryStore.ts`, `src/hooks/useHudSnapshot.ts` |
| Shared perf probe | — | `src/components/three/PerfProbe.tsx` |

**Controlling docs (do not contradict without Strategist/Architect re-run):**

- `docs/visual-strategy.md` — narrative, tokens, copy deck
- `docs/system-design.md` — stores, scene graph, shader spec, ownership map

---

## Environment bootstrap (every fresh clone / CI)

```bash
npm install
npx playwright install chromium   # required once for verify-3d
npm run typecheck && npm run lint && npm run build && npm run verify-3d
npm run dev                       # http://localhost:3000
```

**Local GPU:** RTX 3080 via ANGLE/D3D11 — FPS gate is binding.  
**Regenerate perf evidence:** `npm run verify-3d` → `perf-report.json` (gitignored).

---

## Stale worktrees (safe to prune)

These worktrees predate the final merge and can be removed when no longer needed:

```
.worktrees/bootstrap   → feat/agency-bootstrap  (caea785)
.worktrees/scaffold    → feat/pilot-scaffold    (de5420c)
.worktrees/hero        → feat/hero-landing      (18adb66) — merged
.worktrees/dashboard   → feat/telemetry-dashboard (da0ec20) — merged
```

```bash
git worktree remove .worktrees/hero
git worktree remove .worktrees/dashboard
# repeat for bootstrap/scaffold if desired
```

For **new features**, create a fresh worktree:

```bash
git worktree add .worktrees/<feature> -b feat/<feature>
cd .worktrees/<feature> && npm install && npx playwright install chromium
```

Run quality gates from **repo root** (`npm install` at root) if lint fails inside a
worktree due to multi-lockfile inference (see `memory-decisions.md`).

---

## Priority backlog (next session)

Ordered by impact; pick based on user intent:

1. **De-dupe shared 3D primitives** — extract Starfield, SlotField,
   CorridorFresnelMaterial, StagingBloomMaterial from `three/landing/` and
   `three/dashboard/` into `src/components/three/shared/`. Update `system-design.md`
   ownership map. Single worktree; Verifier gate before merge.

2. **Real telemetry feed** — replace `telemetryStore` scripted interval with WebSocket or
   REST poller; keep 20 Hz transient / 4 Hz HUD throttle pattern.

3. **Visual polish pass** — scroll section sync, branch-tube visibility tied to
   `heroStore.phase`, Moa deploy burst on each payload flip, `prefers-reduced-motion`
   static fallback on landing (dashboard already partial).

4. **CI workflow** — GitHub Actions: `npm ci`, `playwright install chromium`, full gate
   on push/PR. Note SwiftShader advisory for frame time in headless runners.

5. **Next client engagement** — run Deep-Tech Strategist → R3F Architect for new client;
   replace or extend routes per new `visual-strategy.md` / `system-design.md`.

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
2. **Overwrite** this file (`.agency/memory/session-state.md`) with current HEAD,
   backlog, and blockers.
3. Update `docs/pilot-delivery-report.md` only if a milestone shipped.
4. Push to `origin/main` if the user expects remote persistence.

When starting a session, read in order:

1. `CLAUDE.md`
2. `.agency/rules/01-persona.md` → `02-standards.md` → `03-memory.md`
3. `.agency/memory/memory-decisions.md`
4. **This file** (`session-state.md`)
