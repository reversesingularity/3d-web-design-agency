"use client";

import dynamic from "next/dynamic";
import { HUD } from "./HUD";
import { TelemetrySimulatorMount } from "./TelemetrySimulatorMount";

const InstrumentCanvas = dynamic(
  () =>
    import("@/components/three/dashboard/InstrumentCanvas").then(
      (m) => m.InstrumentCanvas
    ),
  { ssr: false }
);

export function DashboardPage() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100dvh" }}>
      <TelemetrySimulatorMount />
      <InstrumentCanvas />
      <HUD />
    </div>
  );
}
