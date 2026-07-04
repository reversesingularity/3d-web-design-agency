"use client";

import { Suspense, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useHeroStore } from "@/stores/heroStore";
import { Starfield } from "./Starfield";
import { SlotField } from "./SlotField";
import "./materials/CorridorFresnelMaterial";
import "./materials/StagingBloomMaterial";
import {
  createBurstGeometry,
  triggerBurst,
} from "./materials/StagingBloomMaterial";

function buildSpline(branch: boolean) {
  const points = [
    new THREE.Vector3(-6, -2, 0),
    new THREE.Vector3(-2, 0, 2),
    new THREE.Vector3(0, 1.5, 4),
    new THREE.Vector3(2, 3, 6),
    new THREE.Vector3(4, 4, 8),
  ];
  if (branch) {
    points.push(new THREE.Vector3(6, 5, 10));
  }
  return new THREE.CatmullRomCurve3(points);
}

function ScrollCameraRig({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const desired = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    const scroll = useHeroStore.getState().scroll;
    curve.getPointAt(Math.min(scroll * 0.95 + 0.02, 1), target);
    curve.getPointAt(Math.min(scroll * 0.95 + 0.08, 1), look);
    desired.set(target.x - 2, target.y + 1.5, target.z + 6);
    camera.position.lerp(desired, 1 - Math.exp(-delta * 4));
    camera.lookAt(look);
  });

  return null;
}

function GravityWellGrid() {
  const geo = useMemo(() => {
    const size = 24;
    const divisions = 32;
    const grid = new THREE.BufferGeometry();
    const verts: number[] = [];
    for (let i = 0; i <= divisions; i++) {
      const t = (i / divisions) * size - size / 2;
      for (let j = 0; j <= divisions; j++) {
        const s = (j / divisions) * size - size / 2;
        const bow = -((t * t + s * s) / size) * 0.8;
        if (j < divisions) {
          const t2 = ((j + 1) / divisions) * size - size / 2;
          const bow2 = -((t * t + t2 * t2) / size) * 0.8;
          verts.push(t, bow, s, t, bow2, t2);
        }
        if (i < divisions) {
          const t2 = ((i + 1) / divisions) * size - size / 2;
          const bow2 = -((t2 * t2 + s * s) / size) * 0.8;
          verts.push(t, bow, s, t2, bow2, s);
        }
      }
    }
    grid.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return grid;
  }, []);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color="#134e4a" transparent opacity={0.25} />
    </lineSegments>
  );
}

function TrajectoryTube({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const geo = useMemo(
    () => new THREE.TubeGeometry(curve, 128, 0.06, 8, false),
    [curve]
  );
  return (
    <mesh geometry={geo}>
      <meshBasicMaterial color="#5eead4" toneMapped={false} />
    </mesh>
  );
}

function CorridorCone() {
  const mat = useRef<THREE.ShaderMaterial & { uTime: number; uTighten: number }>(
    null!
  );
  const lastPhase = useRef("");

  useFrame((state) => {
    const { scroll, phase } = useHeroStore.getState();
    const tighten = Math.max(0, Math.min(1, (scroll - 0.2) / 0.35));
    mat.current.uTime = state.clock.elapsedTime;
    mat.current.uTighten = tighten;
    if (phase !== lastPhase.current && (phase === "tighten" || phase === "deploy")) {
      lastPhase.current = phase;
    }
  });

  return (
    <mesh position={[1, 2.5, 5]} rotation={[0, 0.3, 0]}>
      <coneGeometry args={[1.8, 5, 32, 1, true]} />
      <corridorFresnelMaterial
        ref={mat}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

function BranchTubes({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const forks = useMemo(() => {
    const end = curve.getPoint(1);
    return Array.from({ length: 4 }, (_, b) => {
      const angle = (b / 4) * Math.PI * 2;
      const forkCurve = new THREE.CatmullRomCurve3([
        end.clone(),
        end
          .clone()
          .add(new THREE.Vector3(Math.cos(angle) * 2, 1, Math.sin(angle) * 2)),
        end
          .clone()
          .add(new THREE.Vector3(Math.cos(angle) * 4, 2, Math.sin(angle) * 4)),
      ]);
      return new THREE.TubeGeometry(forkCurve, 32, 0.04, 6, false);
    });
  }, [curve]);

  return (
    <group>
      {forks.map((geo, i) => (
        <mesh key={i} geometry={geo}>
          <meshBasicMaterial
            color="#5eead4"
            transparent
            opacity={0.7}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function StagingBurst() {
  const geo = useMemo(() => createBurstGeometry(512), []);
  const mat = useRef<
    THREE.ShaderMaterial & { uTime: number; uBurstTime: number }
  >(null!);
  const lastPhase = useRef("");

  useFrame((state) => {
    const { phase } = useHeroStore.getState();
    mat.current.uTime = state.clock.elapsedTime;
    if (phase !== lastPhase.current) {
      if (phase === "tighten" || phase === "deploy") {
        triggerBurst(geo, state.clock.elapsedTime, new THREE.Vector3(2, 3, 6));
        mat.current.uBurstTime = state.clock.elapsedTime;
      }
      lastPhase.current = phase;
    }
  });

  return (
    <points geometry={geo}>
      <stagingBloomMaterial
        ref={mat}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

export function CorridorScene() {
  const curve = useMemo(() => buildSpline(true), []);
  const branchCurve = useMemo(() => buildSpline(true), []);

  return (
    <>
      <directionalLight position={[4, 6, 2]} intensity={0.6} color="#5eead4" />
      <Suspense fallback={null}>
        <ScrollCameraRig curve={curve} />
        <GravityWellGrid />
        <Starfield />
        <SlotField />
        <TrajectoryTube curve={curve} />
        <CorridorCone />
        <BranchTubes curve={branchCurve} />
        <StagingBurst />
      </Suspense>
    </>
  );
}
