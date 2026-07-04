"use client";

import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";

export function LandingEffects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom luminanceThreshold={1} intensity={0.8} mipmapBlur />
      <Vignette eskil offset={0.2} darkness={0.7} />
      <Noise opacity={0.04} />
    </EffectComposer>
  );
}
