"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export interface PerfSample {
  drawCalls: number;
  triangles: number;
  geometries: number;
  textures: number;
  avgFrameMs: number;
  samples: number;
  /** frames slower than 25 ms since mount — dropped-frame detector */
  longFrames: number;
  /** total frames observed since mount */
  totalFrames: number;
  renderer: string;
}

declare global {
  interface Window {
    __PERF__?: PerfSample;
    __SCENE_RENDERS__?: number;
  }
}

/**
 * Counts React render commits of the component that calls it. The verify-3d
 * harness asserts this stays flat while frames advance (zero re-renders per
 * frame). Call from the top-level scene component:
 *
 *   useEffect(markSceneRender);
 */
export function markSceneRender() {
  window.__SCENE_RENDERS__ = (window.__SCENE_RENDERS__ ?? 0) + 1;
}

const MAX_SAMPLES = 240;
const LONG_FRAME_MS = 25;

/**
 * Mandatory perf monitor (see .agency/rules/02-standards.md). Publishes draw
 * calls, triangle count, and a rolling frame-time average from gl.info onto
 * window.__PERF__ every frame. The Verifier's headless harness reads it; the
 * merge gate is draw calls < 100, avg frame interval ≤ 17.4 ms, and < 5% dropped
 * frames (> 25 ms) on real GPUs.
 */
export function PerfProbe() {
  const gl = useThree((state) => state.gl);
  const frames = useRef<number[]>([]);
  const last = useRef(0);
  const longFrames = useRef(0);
  const totalFrames = useRef(0);
  const rendererName = useRef("");

  useEffect(() => {
    const ctx = gl.getContext();
    const dbg = ctx.getExtension("WEBGL_debug_renderer_info");
    rendererName.current = dbg
      ? String(ctx.getParameter(dbg.UNMASKED_RENDERER_WEBGL))
      : "unknown";
    // autoReset zeroes gl.info on EVERY render() call, so with a multi-pass
    // EffectComposer the stats only ever describe the final fullscreen pass
    // (1 call / 1 triangle). Accumulate across all passes of a frame instead
    // and reset manually once per frame in useFrame below.
    gl.info.autoReset = false;
    return () => {
      gl.info.autoReset = true;
    };
  }, [gl]);

  useFrame(() => {
    const now = performance.now();
    if (last.current > 0) {
      const dt = now - last.current;
      frames.current.push(dt);
      if (frames.current.length > MAX_SAMPLES) frames.current.shift();
      totalFrames.current += 1;
      if (dt > LONG_FRAME_MS) longFrames.current += 1;
    }
    last.current = now;

    // useFrame runs before this frame renders, so gl.info currently holds the
    // full accumulated totals of the PREVIOUS frame (every composer pass).
    const f = frames.current;
    if (f.length > 0) {
      window.__PERF__ = {
        drawCalls: gl.info.render.calls,
        triangles: gl.info.render.triangles,
        geometries: gl.info.memory.geometries,
        textures: gl.info.memory.textures,
        avgFrameMs: f.reduce((a, b) => a + b, 0) / f.length,
        samples: f.length,
        longFrames: longFrames.current,
        totalFrames: totalFrames.current,
        renderer: rendererName.current,
      };
    }
    gl.info.reset();
  });

  return null;
}
