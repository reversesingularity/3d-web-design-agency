"use client";

import dynamic from "next/dynamic";

const PlaceholderScene = dynamic(
  () =>
    import("@/components/three/PlaceholderScene").then(
      (m) => m.PlaceholderScene
    ),
  { ssr: false }
);

export default function Home() {
  return (
    <main style={{ height: "100dvh" }}>
      <PlaceholderScene label="SVA-00 / HERO SCAFFOLD" />
    </main>
  );
}
