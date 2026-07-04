"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  SAMPLE_COUNT,
  TARGET_ALT,
  useTelemetryStore,
} from "@/stores/telemetryStore";
import { Starfield } from "./Starfield";
import { SlotField } from "./SlotField";
import "./materials/CorridorFresnelMaterial";
import {
  DownlinkShimmerMaterialImpl,
} from "./materials/DownlinkShimmerMaterial";
import "./materials/StagingBloomMaterial";
import {
  createBurstGeometry,
  triggerBurst,
} from "./materials/StagingBloomMaterial";

function buildNominalCurve() {
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(-4, 0, 0),
    new THREE.Vector3(-1, 1, 1),
    new THREE.Vector3(1, 2.5, 2),
    new THREE.Vector3(3, 3.5, 3),
    new THREE.Vector3(4, 4, 4),
  ]);
}

function CorridorEnvelope({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const geo = useMemo(
    () => new THREE.TubeGeometry(curve, 96, 0.35, 12, false),
    [curve]
  );
  const mat = useRef<THREE.ShaderMaterial & { uTime: number; uTighten: number }>(
    null!
  );

  useFrame((state) => {
    const { altitude } = useTelemetryStore.getState();
    mat.current.uTime = state.clock.elapsedTime;
    mat.current.uTighten = Math.min(1, altitude / TARGET_ALT);
  });

  return (
    <mesh geometry={geo}>
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

function TelemetryPolyline() {
  const mat = useRef<
    THREE.ShaderMaterial & {
      uTime: number;
      uSignal: number;
      uReduced: number;
    }
  >(null!);

  const geo = useMemo(() => {
    const positions = new Float32Array(SAMPLE_COUNT * 3);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  const line = useMemo(() => {
    const material = new DownlinkShimmerMaterialImpl();
    mat.current = material as typeof mat.current;
    return new THREE.Line(geo, material);
  }, [geo]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mat.current.uReduced = mq.matches ? 1 : 0;
    const onChange = () => {
      mat.current.uReduced = mq.matches ? 1 : 0;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useFrame((state) => {
    const { samples, sampleHead, signalStrength, signalState } =
      useTelemetryStore.getState();
    const pos = geo.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < SAMPLE_COUNT; i++) {
      const src = ((sampleHead - i + SAMPLE_COUNT) % SAMPLE_COUNT) * 3;
      pos.setXYZ(i, samples[src], samples[src + 1], samples[src + 2]);
    }
    pos.needsUpdate = true;
    geo.computeBoundingSphere();

    mat.current.uTime = state.clock.elapsedTime;
    mat.current.uSignal = signalState === "LOS" ? 0.2 : signalStrength;
  });

  return <primitive object={line} />;
}

function StageBurst() {
  const geo = useMemo(() => createBurstGeometry(512), []);
  const mat = useRef<THREE.ShaderMaterial & { uTime: number }>(null!);
  const lastStage = useRef<string>("");

  useFrame((state) => {
    const { stage } = useTelemetryStore.getState();
    mat.current.uTime = state.clock.elapsedTime;
    if (stage !== lastStage.current) {
      if (stage === "STAGE_SEP" || stage === "MOA_DEPLOY") {
        triggerBurst(geo, state.clock.elapsedTime);
      }
      lastStage.current = stage;
    }
  });

  return (
    <points geometry={geo} position={[3, 3.5, 3]}>
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

export function InstrumentScene() {
  const curve = useMemo(() => buildNominalCurve(), []);

  return (
    <>
      <directionalLight position={[3, 5, 4]} intensity={0.5} color="#5eead4" />
      <Suspense fallback={null}>
        <Starfield />
        <SlotField />
        <CorridorEnvelope curve={curve} />
        <TelemetryPolyline />
        <StageBurst />
      </Suspense>
    </>
  );
}
