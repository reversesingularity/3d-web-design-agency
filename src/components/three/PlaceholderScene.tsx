"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { PerfProbe, markSceneRender } from "./PerfProbe";

function Spinner() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.4;
    ref.current.rotation.y += delta * 0.6;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial
        color="#0b1220"
        metalness={0.8}
        roughness={0.3}
        emissive="#134e4a"
        emissiveIntensity={0.6}
        wireframe
      />
    </mesh>
  );
}

/**
 * Temporary scaffold scene proving the Canvas + PerfProbe + verify-3d pipeline
 * end-to-end. Replaced by the real hero/dashboard scenes in Phase 3.
 */
export function PlaceholderScene({ label }: { label: string }) {
  useEffect(markSceneRender);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 42, near: 0.1, far: 100 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor("#05070d")}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 3]} intensity={1.2} />
        <Spinner />
        <PerfProbe />
      </Canvas>
      <span
        className="mono"
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          fontSize: 12,
          letterSpacing: "0.12em",
          color: "var(--ink-dim)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
