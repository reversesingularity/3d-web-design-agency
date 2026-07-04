"use client";

import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";

export function DashboardEffects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom luminanceThreshold={1} intensity={0.75} mipmapBlur />
      <Vignette eskil offset={0.15} darkness={0.65} />
    </EffectComposer>
  );
}
