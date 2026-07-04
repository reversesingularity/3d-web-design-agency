import { create } from "zustand";

export type FlightStage =
  | "PRELAUNCH"
  | "LIFTOFF"
  | "S1_BURN"
  | "STAGE_SEP"
  | "S2_BURN"
  | "MOA_DEPLOY"
  | "ORBIT";

export type SignalState = "AOS" | "LOS";
export type PayloadState = "STOWED" | "ARMED" | "DEPLOYED";

const SAMPLE_COUNT = 256;
const TARGET_ALT = 500;

interface TelemetryState {
  missionTime: number;
  altitude: number;
  velocity: number;
  corridorDeviation: number;
  signalStrength: number;
  samples: Float32Array;
  sampleHead: number;
  stage: FlightStage;
  signalState: SignalState;
  payloads: PayloadState[];
  start: () => void;
  stop: () => void;
}

let intervalId: ReturnType<typeof setInterval> | null = null;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function profileAt(t: number) {
  if (t < 0) {
    return {
      alt: 0,
      vel: 0,
      dev: 0,
      stage: "PRELAUNCH" as FlightStage,
      signal: 1,
    };
  }
  if (t < 30) {
    const p = t / 30;
    return {
      alt: lerp(0, 45, p),
      vel: lerp(0, 1200, p),
      dev: lerp(80, 55, p),
      stage: "LIFTOFF" as FlightStage,
      signal: 0.95,
    };
  }
  if (t < 120) {
    const p = (t - 30) / 90;
    return {
      alt: lerp(45, 120, p),
      vel: lerp(1200, 3200, p),
      dev: lerp(55, 42, p),
      stage: "S1_BURN" as FlightStage,
      signal: 0.92,
    };
  }
  if (t < 130) {
    return {
      alt: 125,
      vel: 3400,
      dev: 40,
      stage: "STAGE_SEP" as FlightStage,
      signal: 0.88,
    };
  }
  if (t < 280) {
    const p = (t - 130) / 150;
    return {
      alt: lerp(125, 480, p),
      vel: lerp(3400, 7600, p),
      dev: lerp(40, 38, p),
      stage: "S2_BURN" as FlightStage,
      signal: 0.9,
    };
  }
  if (t < 340) {
    const p = (t - 280) / 60;
    return {
      alt: lerp(480, TARGET_ALT, p),
      vel: lerp(7600, 5214, p),
      dev: lerp(38, 38, p),
      stage: "MOA_DEPLOY" as FlightStage,
      signal: 0.85,
    };
  }
  return {
    alt: TARGET_ALT,
    vel: 5214,
    dev: 38,
    stage: "ORBIT" as FlightStage,
    signal: 0.98,
  };
}

export const useTelemetryStore = create<TelemetryState>((set, get) => ({
  missionTime: -120,
  altitude: 0,
  velocity: 0,
  corridorDeviation: 0,
  signalStrength: 1,
  samples: new Float32Array(SAMPLE_COUNT * 3),
  sampleHead: 0,
  stage: "PRELAUNCH",
  signalState: "AOS",
  payloads: ["STOWED", "STOWED", "STOWED", "STOWED"],
  start: () => {
    if (intervalId) return;
    let t = -120;
    intervalId = setInterval(() => {
      t += 0.05;
      const p = profileAt(t);
      const state = get();
      const samples = state.samples;
      const head = (state.sampleHead + 1) % SAMPLE_COUNT;
      const idx = head * 3;
      const x = (t / 400) * 8 - 4;
      const y = (p.alt / TARGET_ALT) * 4;
      const z = Math.sin(t * 0.05) * 0.3 + (p.dev / 100) * 0.5;
      samples[idx] = x;
      samples[idx + 1] = y;
      samples[idx + 2] = z;

      const signalState: SignalState = p.signal < 0.5 ? "LOS" : "AOS";
      const stage = p.stage;
      let payloads = state.payloads;

      if (t >= 280) {
        const dropIndex = Math.min(3, Math.floor((t - 280) / 15));
        payloads = (["STOWED", "STOWED", "STOWED", "STOWED"] as PayloadState[]).map(
          (_, i) => (i <= dropIndex ? "DEPLOYED" : "STOWED")
        );
      } else if (stage === "MOA_DEPLOY") {
        payloads = ["ARMED", "ARMED", "ARMED", "ARMED"];
      }

      set({
        missionTime: t,
        altitude: p.alt,
        velocity: p.vel,
        corridorDeviation: p.dev,
        signalStrength: p.signal,
        samples,
        sampleHead: head,
        stage,
        signalState,
        payloads,
      });
    }, 50);
  },
  stop: () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  },
}));

export { TARGET_ALT, SAMPLE_COUNT };
