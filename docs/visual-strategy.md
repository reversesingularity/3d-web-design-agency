# Visual Strategy — Southern Vector Aerospace ("Kea-1")

Deliverable of the Deep-Tech Strategist. Consumed by `r3f-architect` and
`webgl-developer`. Constraints: `.agency/rules/01-persona.md` (Engineered Optimism),
`.agency/rules/02-standards.md` (perf gates), `app/globals.css` (token anchors).

---

## 1. Core Breakthrough

Southern Vector has collapsed the most expensive hidden line-item in constellation
economics: the gap between "reached orbit" and "reached *your* orbit." Kea-1's
additively-manufactured, regeneratively-cooled Tui engines feed a guidance and
autonomous range-safety stack that delivers **sub-100 m insertion accuracy** at
350 kg to 500 km SSO — and the Moa kick stage extends that precision into
**multi-drop orbital logistics**: one launch, several payloads, each placed in its own
slot. The claim a venture partner respects is not "we built a rocket"; it is
"we deleted months of orbit-raising, propellant margin, and commissioning delay from
every customer's balance sheet." Precision is the product; the vehicle is merely how
it ships.

## 2. Paradigm-Shift Narrative

**Why now.** Constellation operators have moved from *access* scarcity to *placement*
scarcity: rideshare is cheap but dumps payloads into approximate orbits, burning
3–9 months and onboard propellant before revenue service. Small EO/agri-climate
constellations — Southern Vector's anchor market — feel this worst: their satellites
carry minimal propulsion. Simultaneously, additive manufacturing has made a
regeneratively-cooled engine (Tui) buildable at Series-B scale, and the NZ regulatory
corridor (Kiwi Space Activator co-funding, proven Canterbury launch geography) makes
sun-synchronous inclinations a home-field advantage.

**Credibility-gap bridge.** The *validated engine*: two successful suborbital flights,
a complete full-duration second-stage static-fire campaign, a co-funded government
demonstration mission — evidence, dates, telemetry. The *scalable vehicle*: precision
insertion **as a service** — a repeatable, priced, contractual accuracy guarantee that
compounds with Moa multi-drop into a logistics network, not a launch stunt. Every page
must pair one hard test artifact with one commercial consequence. Never render
vaporware futures; never read as a university project.

## 3. Controlling 3D Visual Metaphor — **"The Corridor"**

One metaphor governs both pages: **a single luminous trajectory threading a
knife-thin insertion corridor through a vast field of target orbital slots.**
Precision made visible as geometry: the emptiness is huge, the corridor is thin, the
line never misses. The Moa story is the same line **branching** — one thread
delivering nodes into several distinct rings. Metaphorical physics only: splines,
corridors, particle fields, gravity-well curvature. **No rocket CAD, no literal
vehicle model, no photoreal Earth.**

### 3a. Landing page — cinematic scene concept
- R3F scene: a dark curvature field (subtly bowed wireframe grid — the gravity well —
  fading into `--bg`) with a single trajectory: a `TubeGeometry` on a CatmullRom
  spline rising from lower-left into the slot field. Scroll scrubs the camera along
  the spline (Zustand transient state, per standards). Section 2 of the scroll: the
  tube pierces a translucent **insertion corridor** cone that tightens around it.
  Section 3 (Moa): the spline forks into 3–5 branches, each terminating in a ring of
  orbital slots where a node ignites into place.
- Particle systems: one `InstancedMesh` starfield (~8k points, static, parallax only);
  one instanced **slot field** (~1.5k faint teal diamonds arranged on orbital shells);
  one GPU particle burst pool for staging/deploy events. All instanced — draw calls
  stay well under the <100 gate.
- Lighting: no ambient wash. Single cool key (`#5eead4` at low intensity) tracking the
  trajectory head, rim/fresnel self-illumination on the corridor, hot point flash
  (`#f97316`) only during burn events. Black is a material: let `--bg` dominate.

### 3b. Dashboard — instrument scene concept
- The same corridor, re-read as an instrument: locked orthographic-leaning camera on
  the corridor tube rendered as a translucent nominal envelope; the **live telemetry
  polyline** (fed 1 Hz webcast data, interpolated in `useFrame`) draws itself inside
  it. Deviation from centreline is the entire drama of a launch webcast.
- Slot-field particles persist dimmed in the background for continuity with the
  landing page. Stage events fire the same burst pool. HUD (Section 5) is DOM,
  reactively subscribed at ≤ 4 Hz per standards.

### 3c. Shader moments (the 2–3 signature beats)
1. **Corridor Fresnel Tighten** — custom fresnel shader on the corridor cone: wide
   teal haze that contracts to a knife-edge rim as scroll (landing) or ascent
   (dashboard) progresses. The narrowing *is* the sub-100 m claim.
2. **Staging Bloom** — additive point-shader burst at stage separation and each Moa
   drop: an `--accent-hot` flare that decays through orange into persistent teal
   trace particles. Paired with postprocessing bloom, threshold high so only events
   bloom.
3. **Downlink Shimmer** — a scanline + slight chromatic-offset pass that ripples along
   the telemetry polyline in the direction of data flow, reading as live signal, not
   decoration. Dashboard-only; disabled under `prefers-reduced-motion`.

## 4. Design Tokens

### Palette (extends `app/globals.css` — do not redefine existing vars)
| Token | Hex | Role |
|---|---|---|
| `--bg` (existing) | `#05070d` | Space. Dominant surface |
| `--bg-raised` (existing) | `#0a0f1a` | Panels, HUD cards |
| `--ink` / `--ink-dim` (existing) | `#e6edf3` / `#8b98a9` | Copy / secondary copy |
| `--accent` (existing) | `#5eead4` | Nominal: corridor rim, live telemetry, links |
| `--accent-hot` (existing) | `#f97316` | Events only: burns, staging, CTAs |
| `--line` (existing) | `#1b2333` | Hairlines, grid strokes |
| `--accent-deep` (new) | `#0f766e` | Corridor volume fill, slot-field particles |
| `--accent-faint` (new) | `#134e4a` | Gravity-well grid, dimmed slot shells |
| `--alert` (new) | `#f43f5e` | Dashboard off-nominal / LOS states only |
| `--ember` (new) | `#fdba74` | Bloom core of staging flare (hot → ember decay) |

Rule: teal = precision/nominal; orange = energy/event. Orange is rationed — if a
frame is >5% orange, something is exploding or it's wrong.

### Type roles
- **Space Grotesk** (display): hero headline 500/700, clamp(2.5rem, 7vw, 6rem),
  tracking −0.02em; section headings 500; never used for numbers.
- **IBM Plex Mono** (data): all stats, HUD labels, timestamps, axis ticks.
  `font-variant-numeric: tabular-nums`; micro-labels uppercase, 0.12em tracking,
  `--ink-dim`. Any number a customer might quote is mono, always.

### Motion principles
- Physics-derived easing: exponential ease-out (gravity-turn feel) for camera and
  trajectory; no springs/bounce on orbital elements. UI fades: 200 ms, ease-out.
- Scroll is the timeline on the landing page; telemetry is the timeline on the
  dashboard. Nothing autoplays except the starfield's ≤0.02 rad/s parallax drift.
- Per standards: transient Zustand reads in `useFrame`, HUD ≤ 4 Hz, dpr [1,2],
  instancing mandatory, full `prefers-reduced-motion` static fallback (corridor as
  still frame, stats intact).

## 5. Copy Deck

### Landing page
- **Hero headline:** `Your orbit. To the metre.`
- **Subheadline:** `Kea-1 delivers 350 kg to sun-synchronous orbit with sub-100 m
  insertion accuracy — so your constellation earns revenue in days, not months.`
- **Proof-point stats (mono):**
  - `<100 m` — insertion accuracy, guidance + autonomous range safety
  - `350 kg → 500 km SSO` — Kea-1 payload to sun-synchronous orbit
  - `2/2 flights · 100% static-fire` — suborbital record and full-duration
    second-stage campaign complete
- **Section headings:**
  1. `The Corridor` — precision insertion as a service
  2. `One launch. Every slot.` — Moa multi-drop orbital logistics
  3. `Proven in fire.` — Tui engines: printed, regeneratively cooled, flown
  4. `Flight One.` — first orbital attempt · Kiwi Space Activator demonstration
  5. `Fly with us.` — manifest inquiry CTA

### Dashboard HUD labels (IBM Plex Mono, uppercase)
| Element | Label | Value format |
|---|---|---|
| Mission clock | `MET` | `T+ 00:04:12` (T− pre-launch) |
| Altitude | `ALT` | `142.7 KM` |
| Velocity | `VEL` | `5 214 M/S` |
| Stage | `STAGE` | `S2 BURN` / `MOA DEPLOY 2/4` |
| Signal | `SIGNAL` | `AOS · NOMINAL` / `LOS` (alert color) |
| Corridor status (bonus) | `CORRIDOR` | `Δ 38 M · NOMINAL` |

---
*One line through the dark, arriving exactly where it said it would.*
