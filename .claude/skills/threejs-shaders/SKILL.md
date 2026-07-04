---
name: threejs-shaders
description: Exact patterns for custom GLSL materials via drei shaderMaterial, PBR/physical materials, and driving uniforms from transient Zustand state in R3F v9.
---

# Custom Shaders & PBR (copy these patterns)

## drei shaderMaterial + extend

```tsx
"use client";
import * as THREE from "three";
import { extend, useFrame, type ThreeElement } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useRef } from "react";

const DataStreamMaterial = shaderMaterial(
  { uTime: 0, uIntensity: 1, uColor: new THREE.Color("#5eead4") },
  /* glsl vertex */ `
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vUv = uv;
      vec3 p = position + normal * 0.02 * sin(uTime * 3.0 + position.y * 8.0);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }`,
  /* glsl fragment */ `
    varying vec2 vUv;
    uniform float uTime; uniform float uIntensity; uniform vec3 uColor;
    void main() {
      float pulse = smoothstep(0.0, 1.0, fract(vUv.y * 6.0 - uTime * 0.8));
      gl_FragColor = vec4(uColor * pulse * uIntensity, pulse * 0.9);
    }`
);
extend({ DataStreamMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    dataStreamMaterial: ThreeElement<typeof DataStreamMaterial>;
  }
}
```

## Uniforms from transient Zustand state (zero re-renders)

```tsx
function StreamRibbon() {
  const mat = useRef<THREE.ShaderMaterial>(null!);
  useFrame((state) => {
    mat.current.uniforms.uTime.value = state.clock.elapsedTime;
    // transient read — component never re-renders on telemetry change:
    mat.current.uniforms.uIntensity.value = useTelemetry.getState().signalStrength;
  });
  return (
    <mesh geometry={ribbonGeo}>
      <dataStreamMaterial ref={mat} transparent depthWrite={false} />
    </mesh>
  );
}
```

## PBR / physical materials for cinematic realism

```tsx
<meshPhysicalMaterial
  color="#0b1220" metalness={0.9} roughness={0.25}
  clearcoat={1} clearcoatRoughness={0.15}
  transmission={0.6} thickness={0.4} ior={1.4}   // glass/refraction = "data speed"
  emissive="#134e4a" emissiveIntensity={0.4}     // feeds selective bloom
/>
```

## Rules

- Register each shaderMaterial `extend` + module augmentation once, at module scope.
- Additive/translucent effects: `transparent` + `depthWrite={false}`, and set
  `blending={THREE.AdditiveBlending}` for light streaks.
- Uniform mutation happens only in `useFrame`; never via React state.
