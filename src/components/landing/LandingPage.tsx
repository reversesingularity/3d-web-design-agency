"use client";

import dynamic from "next/dynamic";
import { BlueprintArchive } from "./BlueprintArchive";
import { CopyDeck } from "./CopyDeck";
import { ScrollDriver } from "./ScrollDriver";

const CorridorCanvas = dynamic(
  () =>
    import("@/components/three/landing/CorridorCanvas").then(
      (m) => m.CorridorCanvas
    ),
  { ssr: false }
);

export function LandingPage() {
  return (
    <>
      <ScrollDriver />
      <CorridorCanvas />
      <main style={{ position: "relative" }}>
        {/* ScrollDriver measures this container, not the document, so content
            appended below never compresses the corridor choreography. */}
        <div id="corridor-narrative" style={{ position: "relative", minHeight: "500vh" }}>
          <CopyDeck />
        </div>
        <BlueprintArchive />
      </main>
    </>
  );
}
