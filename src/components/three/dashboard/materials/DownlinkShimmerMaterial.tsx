"use client";

import * as THREE from "three";
import { extend, type ThreeElement } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

export const DownlinkShimmerMaterialImpl = shaderMaterial(
  {
    uTime: 0,
    uFlow: 1.2,
    uSignal: 1,
    uColor: new THREE.Color("#5eead4"),
    uAlert: new THREE.Color("#f43f5e"),
    uReduced: 0,
  },
  /* glsl */ `
    varying float vDist;
    void main() {
      vDist = position.x + position.y * 2.0;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  /* glsl */ `
    varying float vDist;
    uniform float uTime;
    uniform float uFlow;
    uniform float uSignal;
    uniform vec3 uColor;
    uniform vec3 uAlert;
    uniform float uReduced;
    void main() {
      float scan = uReduced > 0.5 ? 0.5 : fract(vDist * 0.15 - uTime * uFlow);
      float pulse = smoothstep(0.35, 0.0, abs(scan - 0.5));
      vec3 col = mix(uAlert, uColor, uSignal);
      col *= 0.6 + pulse * 0.8;
      gl_FragColor = vec4(col, 0.85);
    }`
);

extend({ DownlinkShimmerMaterial: DownlinkShimmerMaterialImpl });

declare module "@react-three/fiber" {
  interface ThreeElements {
    downlinkShimmerMaterial: ThreeElement<typeof DownlinkShimmerMaterialImpl>;
  }
}
