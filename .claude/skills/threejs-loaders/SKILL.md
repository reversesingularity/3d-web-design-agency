---
name: threejs-loaders
description: Exact patterns for asynchronous GLTF/GLB loading with Draco/KTX2 compression and Suspense boundaries in R3F v9.
---

# Asset Loading (copy these patterns)

## GLTF via drei — always inside Suspense

```tsx
"use client";
import { Suspense } from "react";
import { useGLTF } from "@react-three/drei";

function Vehicle() {
  const { scene } = useGLTF("/models/vehicle.glb");
  return <primitive object={scene} />;
}

export function VehicleSlot() {
  return (
    <Suspense fallback={null}>   {/* never block the main thread */}
      <Vehicle />
    </Suspense>
  );
}

useGLTF.preload("/models/vehicle.glb");  // start fetch before mount
```

## Draco-compressed GLB

`useGLTF` wires a DracoLoader automatically when given a decoder path:

```tsx
const { scene } = useGLTF("/models/vehicle-draco.glb", "/draco/");
// ship decoder files in public/draco/ (copy from three/examples/jsm/libs/draco/gltf)
```

## Raw useLoader (when drei is not enough)

```tsx
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const gltf = useLoader(GLTFLoader, "/models/part.glb", (loader) => {
  const draco = new DRACOLoader();
  draco.setDecoderPath("/draco/");
  loader.setDRACOLoader(draco);
});
```

## KTX2 GPU-compressed textures

```tsx
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
const tex = useLoader(KTX2Loader, "/textures/panel.ktx2", (loader) => {
  loader.setTranscoderPath("/basis/").detectSupport(gl); // gl from useThree()
});
```

## Rules

- Every loader hook throws to the nearest `<Suspense>` — one boundary per async
  subtree, `fallback={null}` inside Canvas (HTML fallbacks don't render in WebGL).
- Textures for dark scenes: set `colorSpace = THREE.SRGBColorSpace` on color maps only.
- If the pilot needs no external models, prefer procedural geometry — zero network,
  zero decode stalls. Do not add GLB assets just to use this skill.
