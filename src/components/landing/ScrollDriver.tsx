"use client";

import { useEffect } from "react";
import { useHeroStore } from "@/stores/heroStore";

/** Attaches scroll + throttled pointer listeners; returns null (no DOM). */
export function ScrollDriver() {
  useEffect(() => {
    const store = useHeroStore;
    let raf = 0;
    let lastPointer = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Anchor progress to the narrative container so sections appended
        // below it (e.g. the blueprint archive) don't stretch the timeline.
        // setScroll clamps to [0,1], so scrolling past the narrative simply
        // holds the final "deploy" phase.
        const narrative = document.getElementById("corridor-narrative");
        const max = narrative
          ? narrative.offsetHeight - window.innerHeight
          : document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        store.getState().setScroll(progress);
      });
    };

    const onPointer = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastPointer < 32) return;
      lastPointer = now;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      store.getState().setPointer(x, y);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return null;
}
