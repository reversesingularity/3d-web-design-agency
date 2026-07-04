"use client";

import { useEffect, useState } from "react";
import { useTelemetryStore } from "@/stores/telemetryStore";

export interface HudSnapshot {
  missionTime: number;
  altitude: number;
  velocity: number;
  corridorDeviation: number;
}

export function useHudSnapshot(): HudSnapshot {
  const [snap, setSnap] = useState<HudSnapshot>(() => {
    const s = useTelemetryStore.getState();
    return {
      missionTime: s.missionTime,
      altitude: s.altitude,
      velocity: s.velocity,
      corridorDeviation: s.corridorDeviation,
    };
  });

  useEffect(() => {
    const id = setInterval(() => {
      const s = useTelemetryStore.getState();
      setSnap({
        missionTime: s.missionTime,
        altitude: s.altitude,
        velocity: s.velocity,
        corridorDeviation: s.corridorDeviation,
      });
    }, 250);
    return () => clearInterval(id);
  }, []);

  return snap;
}

export function formatMet(seconds: number) {
  const sign = seconds < 0 ? "T−" : "T+";
  const abs = Math.abs(seconds);
  const m = Math.floor(abs / 60);
  const s = Math.floor(abs % 60);
  return `${sign} ${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
