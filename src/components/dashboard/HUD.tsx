"use client";

import { formatMet, useHudSnapshot } from "@/hooks/useHudSnapshot";
import { useTelemetryStore } from "@/stores/telemetryStore";

function HudRow({
  label,
  value,
  alert,
}: {
  label: string;
  value: string;
  alert?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 24,
        padding: "8px 0",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <span
        className="mono"
        style={{
          fontSize: 10,
          letterSpacing: "0.12em",
          color: "var(--ink-dim)",
        }}
      >
        {label}
      </span>
      <span
        className="mono"
        style={{
          fontSize: 13,
          color: alert ? "var(--alert)" : "var(--accent)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export function HUD() {
  const snap = useHudSnapshot();
  const stage = useTelemetryStore((s) => s.stage);
  const signalState = useTelemetryStore((s) => s.signalState);
  const payloads = useTelemetryStore((s) => s.payloads);

  const deployed = payloads.filter((p) => p === "DEPLOYED").length;
  const stageLabel =
    stage === "MOA_DEPLOY"
      ? `MOA DEPLOY ${deployed}/4`
      : stage.replaceAll("_", " ");

  return (
    <aside
      style={{
        position: "relative",
        zIndex: 2,
        width: "min(360px, 92vw)",
        margin: "24px",
        padding: "20px 24px",
        background: "color-mix(in srgb, var(--bg-raised) 92%, transparent)",
        border: "1px solid var(--line)",
        backdropFilter: "blur(8px)",
      }}
    >
      <p
        className="mono"
        style={{
          fontSize: 10,
          letterSpacing: "0.12em",
          color: "var(--ink-dim)",
          marginBottom: 16,
        }}
      >
        KEA-1 · FLIGHT ONE · TELEMETRY
      </p>
      <HudRow label="MET" value={formatMet(snap.missionTime)} />
      <HudRow label="ALT" value={`${snap.altitude.toFixed(1)} KM`} />
      <HudRow
        label="VEL"
        value={`${Math.round(snap.velocity).toLocaleString("en-US").replace(/,/g, " ")} M/S`}
      />
      <HudRow label="STAGE" value={stageLabel} />
      <HudRow
        label="SIGNAL"
        value={signalState === "LOS" ? "LOS" : "AOS · NOMINAL"}
        alert={signalState === "LOS"}
      />
      <HudRow
        label="CORRIDOR"
        value={`Δ ${Math.round(snap.corridorDeviation)} M · NOMINAL`}
      />
    </aside>
  );
}
