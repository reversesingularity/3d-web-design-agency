"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useHeroStore } from "@/stores/heroStore";

const COUNT = 1500;

export function SlotField() {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useLayoutEffect(() => {
    const m = mesh.current;
    if (!m) return;
    for (let i = 0; i < COUNT; i++) {
      const shell = 8 + (i % 5) * 3;
      const angle = (i / COUNT) * Math.PI * 12 + shell * 0.3;
      dummy.position.set(
        Math.cos(angle) * shell,
        (Math.sin(angle * 0.7) * shell) / 3 + 2,
        Math.sin(angle) * shell
      );
      dummy.rotation.set(0, angle, Math.PI / 4);
      dummy.scale.set(0.08, 0.08, 0.02);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  }, [dummy]);

  useFrame(() => {
    const scroll = useHeroStore.getState().scroll;
    const mat = mesh.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.25 + scroll * 0.35;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
      <boxGeometry args={[1, 1, 0.2]} />
      <meshBasicMaterial
        color="#5eead4"
        transparent
        opacity={0.3}
        toneMapped={false}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
