import { create } from "zustand";

export type HeroPhase = "corridor" | "tighten" | "branch" | "deploy";

interface HeroState {
  scroll: number;
  pointer: { x: number; y: number };
  phase: HeroPhase;
  activeSection: number;
  setScroll: (v: number) => void;
  setPointer: (x: number, y: number) => void;
}

function derivePhase(scroll: number): HeroPhase {
  if (scroll < 0.25) return "corridor";
  if (scroll < 0.5) return "tighten";
  if (scroll < 0.75) return "branch";
  return "deploy";
}

function deriveSection(scroll: number): number {
  if (scroll < 0.2) return 0;
  if (scroll < 0.4) return 1;
  if (scroll < 0.6) return 2;
  if (scroll < 0.8) return 3;
  return 4;
}

export const useHeroStore = create<HeroState>((set, get) => ({
  scroll: 0,
  pointer: { x: 0, y: 0 },
  phase: "corridor",
  activeSection: 0,
  setScroll: (v) => {
    const clamped = Math.max(0, Math.min(1, v));
    const phase = derivePhase(clamped);
    const section = deriveSection(clamped);
    const prev = get();
    if (section !== prev.activeSection) {
      set({ scroll: clamped, phase, activeSection: section });
    } else if (phase !== prev.phase) {
      set({ scroll: clamped, phase });
    } else {
      set({ scroll: clamped });
    }
  },
  setPointer: (x, y) => set({ pointer: { x, y } }),
}));
