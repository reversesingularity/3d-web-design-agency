"use client";

import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PerfProbe, markSceneRender } from "@/components/three/PerfProbe";
import { CorridorScene } from "./CorridorScene";
import { LandingEffects } from "./LandingEffects";

export function CorridorCanvas() {
  useEffect(markSceneRender);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 2, 8], fov: 42, near: 0.1, far: 200 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor("#05070d")}
      >
        <CorridorScene />
        <LandingEffects />
        <PerfProbe />
      </Canvas>
    </div>
  );
}
