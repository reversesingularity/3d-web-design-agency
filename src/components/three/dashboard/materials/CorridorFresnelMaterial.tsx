"use client";

import * as THREE from "three";
import { extend, type ThreeElement } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

export const CorridorFresnelMaterialImpl = shaderMaterial(
  {
    uTime: 0,
    uTighten: 0,
    uColorRim: new THREE.Color("#5eead4"),
    uColorFill: new THREE.Color("#0f766e"),
    uOpacity: 0.28,
  },
  /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vNormal = normalize(normalMatrix * normal);
      vView = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv;
    }`,
  /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vView;
    uniform float uTime;
    uniform float uTighten;
    uniform vec3 uColorRim;
    uniform vec3 uColorFill;
    uniform float uOpacity;
    void main() {
      float edgePower = mix(1.5, 6.0, uTighten);
      float fresnel = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), edgePower);
      float breathe = 0.95 + 0.05 * sin(uTime * 0.8);
      vec3 col = mix(uColorFill, uColorRim, fresnel);
      gl_FragColor = vec4(col * breathe, fresnel * uOpacity);
    }`
);

extend({ CorridorFresnelMaterial: CorridorFresnelMaterialImpl });

declare module "@react-three/fiber" {
  interface ThreeElements {
    corridorFresnelMaterial: ThreeElement<typeof CorridorFresnelMaterialImpl>;
  }
}
