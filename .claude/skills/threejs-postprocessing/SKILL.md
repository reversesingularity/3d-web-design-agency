---
name: threejs-postprocessing
description: Exact patterns for @react-three/postprocessing — bloom, depth of field, vignette, selective emissive bloom — with per-pass performance cost notes.
---

# Postprocessing (copy these patterns)

## Standard cinematic stack

```tsx
"use client";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";

export function Effects() {
  return (
    <EffectComposer multisampling={0}>
      {/* luminanceThreshold=1: only HDR/emissive colors bloom */}
      <Bloom luminanceThreshold={1} mipmapBlur intensity={0.9} />
      <Vignette eskil={false} offset={0.15} darkness={0.85} />
      {/* film grain kills gradient banding in dark scenes */}
      <Noise premultiply opacity={0.04} />
    </EffectComposer>
  );
}
```

## Selective bloom without extra passes

With `luminanceThreshold={1}`, only colors pushed above 1.0 bloom. Drive it from
material emissive intensity — no Selection/layers machinery needed:

```tsx
<meshStandardMaterial emissive="#5eead4" emissiveIntensity={2.5} toneMapped={false} />
```

## Depth of field (use sparingly)

```tsx
import { DepthOfField } from "@react-three/postprocessing";
<DepthOfField focusDistance={0.012} focalLength={0.05} bokehScale={3} />
```

## Performance cost notes (budget before adding)

| Pass | Cost | Note |
|---|---|---|
| Bloom (mipmapBlur) | ~1–2 ms | Cheapest quality/impact ratio; always first choice |
| Vignette / Noise | ~0.1 ms | Effectively free; merged into one shader pass |
| DepthOfField | ~2–4 ms | Expensive; skip on dashboard views, hero only |
| SSAO / SSR | 4 ms+ | Forbidden in the pilot — blows the 16.6 ms budget |

- One `<EffectComposer>` per Canvas, mounted once — passes allocate render targets;
  re-mounting leaks GPU memory.
- Postprocessing adds fullscreen draws: expect `drawCalls` in `window.__PERF__` to rise
  by the number of enabled passes; keep total < 100.
- `multisampling={0}` + Bloom hides most aliasing in dark scenes for free; Canvas must
  set `gl={{ antialias: false }}` to avoid paying for MSAA twice.
