"use client";

import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PerfProbe, markSceneRender } from "@/components/three/PerfProbe";
import { InstrumentScene } from "./InstrumentScene";
import { DashboardEffects } from "./DashboardEffects";

export function InstrumentCanvas() {
  useEffect(markSceneRender);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 1.5, 9], fov: 24, near: 0.1, far: 200 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor("#05070d")}
      >
        <InstrumentScene />
        <DashboardEffects />
        <PerfProbe />
      </Canvas>
    </div>
  );
}
