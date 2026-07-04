# Pilot Delivery Report — Southern Vector Aerospace (Kea-1)

**Agency:** Autonomous 3D Web Design Agency (Loop-Engineered Claude Fable 5)  
**Client narrative:** Southern Vector Aerospace — precision small-launch & Moa multi-drop logistics  
**Delivery date:** 2026-07-04  
**Status:** Phase 0–4 complete · merged to `main` · Verifier PASS

---

## Executive summary

The pilot loop produced a full agency harness and a dual-route WebGL product for the
**"Corridor"** visual metaphor: a scroll-driven hero landing and a live telemetry
dashboard. Both routes pass the binding quality gate (typecheck, lint, build,
`verify-3d`) on `main` with sustained 60 FPS on real GPU hardware.

---

## Phase completion ledger

| Phase | Deliverable | Commit(s) | Status |
|---|---|---|---|
| 0 | Git init, bootstrap worktree | `eba7739` | Done |
| 1 | Agency infra (rules, agents, skills) | `caea785` | Done |
| 2 | Next.js 15 + R3F scaffold, verify-3d harness | `bcd0925` | Done |
| 3a | Strategist + Architect docs | `de5420c` | Done |
| 3b | Parallel hero + dashboard builds | `18adb66`, `da0ec20` | Done |
| 3c | Verifier gates + merge to `main` | `47de3ce` | Done |
| 4 | Memory update, cleanup, this report | (this commit) | Done |

---

## Product routes

### `/` — Hero landing ("The Corridor")

- **Metaphor:** Single luminous trajectory through a knife-thin insertion corridor.
- **Interaction:** Scroll scrubs camera along a CatmullRom spline; pointer parallax on
  8k instanced starfield.
- **Signature shaders:** Corridor Fresnel Tighten, Staging Bloom (additive burst pool).
- **Copy:** Kea-1 proof points from `docs/visual-strategy.md` (sub-100 m accuracy,
  350 kg → 500 km SSO, static-fire record).
- **State:** `heroStore` — transient scroll/pointer/phase via `getState()` in `useFrame`;
  reactive `activeSection` only for DOM copy deck.

### `/dashboard` — Flight telemetry instrument

- **Metaphor:** Same corridor read as a flight instrument — nominal envelope + live polyline.
- **Data:** 20 Hz scripted flight profile (T− pre-launch through Moa deploy); HUD throttled
  to 4 Hz via `useHudSnapshot()`.
- **Signature shaders:** Corridor Fresnel (ascent-driven tighten), Downlink Shimmer on
  telemetry polyline, Staging Bloom on stage sep / deploy.
- **HUD:** MET, ALT, VEL, STAGE, SIGNAL, CORRIDOR (IBM Plex Mono, tabular nums).
- **State:** `telemetryStore` — ring-buffer polyline mutated in place; discrete stage/payload
  transitions drive reactive HUD slices.

---

## Architecture decisions (frozen)

| Decision | Rationale |
|---|---|
| Namespaced `three/landing/**` vs `three/dashboard/**` | Zero file collisions in parallel worktrees |
| Intentional primitive duplication | Merge-safe; shared extraction deferred |
| `PerfProbe` on `window.__PERF__` | Deterministic headless gate without visual HUD |
| Zustand transient reads in `useFrame` | Zero React re-renders per frame (gate: ≤2 scene renders while animating) |
| `dynamic(..., { ssr: false })` for Canvas | No WebGL on server; no hydration errors |
| CSS tokens in `:root` once on hero branch | Single pre-parallel commit; dashboard merge clean |

Full structural spec: `docs/system-design.md`  
Narrative + tokens + copy deck: `docs/visual-strategy.md`

---

## Verifier evidence (`main`, 2026-07-04)

```
VERDICT: PASS
typecheck: 0 errors  lint: 0 warnings  build: success  verify-3d: PASS
```

| Route | drawCalls | avgFrameMs | fps | dropped | consoleErrors | sceneRenders+ |
|---|---|---|---|---|---|---|
| `/` | 1 | 16.67 | 60.0 | 0.4% | 0 | 0 |
| `/dashboard` | 1 | 16.59 | 60.3 | 0.4% | 0 | 0 |

**Renderer:** ANGLE (NVIDIA GeForce RTX 3080, D3D11) — FPS gate binding.

Artifact: `perf-report.json` (gitignored; regenerate via `npm run verify-3d`).

---

## Repository map (post-merge)

```
app/
  page.tsx              → LandingPage (hero)
  dashboard/page.tsx    → DashboardPage (telemetry)
  globals.css           → design tokens + dark base
src/
  stores/heroStore.ts
  stores/telemetryStore.ts
  hooks/useHudSnapshot.ts
  components/landing/
  components/dashboard/
  components/three/
    PerfProbe.tsx       → shared perf gate probe
    landing/            → hero scene graph
    dashboard/          → instrument scene graph
docs/
  visual-strategy.md    → Strategist deliverable
  system-design.md      → Architect deliverable
  pilot-delivery-report.md  → this file
.agency/                → rules + memory
.claude/                → agents + skills
scripts/verify-3d.mjs   → headless Playwright gate
```

---

## Commands (definition of done)

```bash
npm install
npm run typecheck    # zero errors
npm run lint         # zero warnings
npm run build
npm run verify-3d    # draw calls < 100, 0 console errors, 60 FPS on real GPU
npm run dev          # local preview at http://localhost:3000
```

---

## Known follow-ups (out of scope for pilot)

1. **De-dupe shared 3D primitives** — Starfield, SlotField, CorridorFresnelMaterial,
   StagingBloomMaterial exist in both namespaces; extract to `src/components/three/shared/`.
2. **Worktree lint hardening** — set `outputFileTracingRoot` in `next.config.ts` to stop
   multi-lockfile workspace inference when linting inside `.worktrees/*`.
3. **Prune stale worktrees** — `.worktrees/{bootstrap,scaffold,hero,dashboard}` can be
   removed via `git worktree remove` now that features are on `main`.
4. **Real telemetry feed** — replace scripted simulator with WebSocket/API when a live
   webcast source is available.

---

## Loop closure

All phases of the Claude Fable 5 loop-engineering blueprint for this pilot are complete.
The agency harness, quality gate, and Southern Vector Kea-1 dual-route product are on
`main` and ready for client preview or iteration on the next engagement.

*One line through the dark, arriving exactly where it said it would.*
