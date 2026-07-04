"use client";

import dynamic from "next/dynamic";

const PlaceholderScene = dynamic(
  () =>
    import("@/components/three/PlaceholderScene").then(
      (m) => m.PlaceholderScene
    ),
  { ssr: false }
);

export default function Dashboard() {
  return (
    <main style={{ height: "100dvh" }}>
      <PlaceholderScene label="SVA-00 / TELEMETRY SCAFFOLD" />
    </main>
  );
}
