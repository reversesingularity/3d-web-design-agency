"use client";

import dynamic from "next/dynamic";
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
      <main style={{ position: "relative", minHeight: "500vh" }}>
        <CopyDeck />
      </main>
    </>
  );
}
