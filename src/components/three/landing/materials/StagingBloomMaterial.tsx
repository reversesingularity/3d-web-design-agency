"use client";

import * as THREE from "three";
import { extend, type ThreeElement } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

export const StagingBloomMaterialImpl = shaderMaterial(
  {
    uTime: 0,
    uBurstTime: -999,
    uHotColor: new THREE.Color("#f97316"),
    uEmberColor: new THREE.Color("#fdba74"),
    uTraceColor: new THREE.Color("#5eead4"),
    uSize: 0.04,
  },
  /* glsl */ `
    attribute vec3 aVelocity;
    attribute float aBirth;
    attribute float aSeed;
    uniform float uTime;
    uniform float uSize;
    varying float vAge;
    void main() {
      vAge = uTime - aBirth;
      if (vAge < 0.0 || vAge > 2.5) {
        gl_Position = vec4(0.0);
        gl_PointSize = 0.0;
        return;
      }
      vec3 pos = position + aVelocity * vAge;
      vec4 mv = modelViewMatrix * vec4(pos, 1.0);
      float scale = uSize * (1.0 + sin(aSeed * 6.28) * 0.2) * (1.0 - vAge * 0.35);
      gl_PointSize = scale * (300.0 / -mv.z);
      gl_Position = projectionMatrix * mv;
    }`,
  /* glsl */ `
    varying float vAge;
    uniform vec3 uHotColor;
    uniform vec3 uEmberColor;
    uniform vec3 uTraceColor;
    void main() {
      if (vAge < 0.0 || vAge > 2.5) discard;
      vec2 c = gl_PointCoord - 0.5;
      float d = length(c);
      if (d > 0.5) discard;
      float alpha = smoothstep(0.5, 0.0, d) * (1.0 - vAge / 2.5);
      vec3 col = uHotColor;
      if (vAge > 0.15) col = mix(uHotColor, uEmberColor, smoothstep(0.15, 0.6, vAge));
      if (vAge > 0.5) col = mix(col, uTraceColor, smoothstep(0.5, 1.2, vAge));
      gl_FragColor = vec4(col * 2.0, alpha);
    }`
);

extend({ StagingBloomMaterial: StagingBloomMaterialImpl });

declare module "@react-three/fiber" {
  interface ThreeElements {
    stagingBloomMaterial: ThreeElement<typeof StagingBloomMaterialImpl>;
  }
}

export function createBurstGeometry(count: number) {
  const geo = new THREE.InstancedBufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array([0, 0, 0]), 3));
  const velocities = new Float32Array(count * 3);
  const births = new Float32Array(count);
  const seeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const speed = 0.8 + Math.random() * 2.5;
    velocities[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
    velocities[i * 3 + 1] = Math.cos(phi) * speed;
    velocities[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * speed;
    births[i] = -999;
    seeds[i] = Math.random();
  }
  geo.setAttribute("aVelocity", new THREE.InstancedBufferAttribute(velocities, 3));
  geo.setAttribute("aBirth", new THREE.InstancedBufferAttribute(births, 1));
  geo.setAttribute("aSeed", new THREE.InstancedBufferAttribute(seeds, 1));
  return geo;
}

export function triggerBurst(
  geo: THREE.InstancedBufferGeometry,
  time: number,
  origin: THREE.Vector3
) {
  const births = geo.getAttribute("aBirth") as THREE.InstancedBufferAttribute;
  for (let i = 0; i < births.count; i++) {
    births.setX(i, time);
  }
  births.needsUpdate = true;
  geo.boundingSphere = new THREE.Sphere(origin, 4);
}
