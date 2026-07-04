---
name: threejs-fundamentals
description: Exact R3F v9 patterns for renderer/Canvas setup, Object3D hierarchy, frame loops, and the mandatory PerfProbe. Inject into any sub-agent doing 3D work.
---

# Three.js / R3F Fundamentals (copy these patterns)

## Canvas setup (Next.js App Router)

Every R3F component tree lives under `"use client"`. Cap `dpr`, disable default
antialiasing when postprocessing is present, and set a black clear color for dark mode.

```tsx
"use client";
import { Canvas } from "@react-three/fiber";

export function Scene() {
  return (
    <Canvas
      dpr={[1, 2]}                       // never let high-DPI quadruple fill cost
      camera={{ position: [0, 2, 8], fov: 42, near: 0.1, far: 200 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor("#05070d")}
    >
      {/* scene children */}
    </Canvas>
  );
}
```

## Object3D hierarchy

Group transforms compose parent→child. Rotate the group, not each mesh:

```tsx
<group rotation={[0, orbitTilt, 0]} position={[0, 0.5, 0]}>
  <mesh geometry={coreGeo} material={coreMat} />
  <group position={[3, 0, 0]}>{/* satellite subtree */}</group>
</group>
```

## Frame loop — delta-based, allocation-free

Never allocate in `useFrame`; never `useState` per frame. Mutate refs; scale by delta.

```tsx
const ref = useRef<THREE.Group>(null!);
useFrame((state, delta) => {
  ref.current.rotation.y += delta * 0.15;          // frame-rate independent
  const t = useTelemetry.getState().missionTime;   // transient Zustand read
  ref.current.position.y = Math.sin(t * 0.5) * 0.2;
});
```

## PerfProbe (mandatory in every Canvas)

The Verifier reads `window.__PERF__`. Mount `<PerfProbe />` as the last Canvas child.
It reads `gl.info.render` (draw calls, triangles) and a rolling frame-time average —
see `src/components/three/PerfProbe.tsx`; do not fork your own copy.

## Disposal

R3F disposes declaratively-mounted objects on unmount. Anything created imperatively
(`new THREE.*` in effects/module scope that changes per mount) must be disposed:

```tsx
useEffect(() => {
  const geo = new THREE.IcosahedronGeometry(1, 4);
  return () => geo.dispose();
}, []);
```
