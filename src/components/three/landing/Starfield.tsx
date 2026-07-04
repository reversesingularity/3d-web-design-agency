"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useHeroStore } from "@/stores/heroStore";

const COUNT = 8000;

export function Starfield() {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useLayoutEffect(() => {
    const m = mesh.current;
    if (!m) return;
    for (let i = 0; i < COUNT; i++) {
      const r = 40 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      dummy.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.4,
        r * Math.cos(phi)
      );
      dummy.scale.setScalar(0.015 + Math.random() * 0.035);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  }, [dummy]);

  useFrame((state) => {
    const { pointer } = useHeroStore.getState();
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02 + pointer.x * 0.08;
    mesh.current.rotation.x = pointer.y * 0.04;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#8b98a9" toneMapped={false} />
    </instancedMesh>
  );
}
