"use client";

import { useEffect } from "react";
import { useTelemetryStore } from "@/stores/telemetryStore";

export function TelemetrySimulatorMount() {
  useEffect(() => {
    useTelemetryStore.getState().start();
    return () => useTelemetryStore.getState().stop();
  }, []);
  return null;
}
