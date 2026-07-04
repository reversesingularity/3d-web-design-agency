"use client";

import { useEffect, useState } from "react";
import { useHeroStore } from "@/stores/heroStore";

const SECTIONS = [
  {
    kicker: "The Corridor",
    title: "Your orbit. To the metre.",
    body: "Kea-1 delivers 350 kg to sun-synchronous orbit with sub-100 m insertion accuracy — so your constellation earns revenue in days, not months.",
    stats: [
      { label: "INSERTION", value: "<100 m" },
      { label: "PAYLOAD", value: "350 kg → 500 km SSO" },
      { label: "PROVEN", value: "2/2 flights · 100% static-fire" },
    ],
  },
  {
    kicker: "Precision insertion as a service",
    title: "The Corridor",
    body: "A knife-thin insertion envelope through a vast field of orbital slots. Precision made visible as geometry.",
  },
  {
    kicker: "Moa multi-drop orbital logistics",
    title: "One launch. Every slot.",
    body: "One trajectory branches into several distinct rings — each payload placed in its own slot without months of orbit-raising.",
  },
  {
    kicker: "Tui engines",
    title: "Proven in fire.",
    body: "Additively manufactured, regeneratively cooled engines — printed, tested, and flown on suborbital campaigns.",
  },
  {
    kicker: "Kiwi Space Activator",
    title: "Flight One.",
    body: "First orbital attempt · government co-funded demonstration mission. Manifest inquiry open.",
    cta: true,
  },
] as const;

export function CopyDeck() {
  const active = useHeroStore((s) => s.activeSection);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        pointerEvents: "none",
        padding: "0 clamp(1.5rem, 5vw, 4rem)",
      }}
    >
      {SECTIONS.map((sec, i) => (
        <section
          key={sec.title}
          aria-hidden={active !== i}
          style={{
            minHeight: reduced ? "auto" : "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: active === i ? 1 : 0,
            transform: active === i ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 200ms ease-out, transform 200ms ease-out",
            maxWidth: 640,
          }}
        >
          <p
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 12,
            }}
          >
            {sec.kicker}
          </p>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              marginBottom: 16,
            }}
          >
            {sec.title}
          </h1>
          <p style={{ color: "var(--ink-dim)", lineHeight: 1.6, marginBottom: 24 }}>
            {sec.body}
          </p>
          {"stats" in sec && sec.stats && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
              {sec.stats.map((st) => (
                <div key={st.label}>
                  <div
                    className="mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      color: "var(--ink-dim)",
                      marginBottom: 4,
                    }}
                  >
                    {st.label}
                  </div>
                  <div className="mono" style={{ fontSize: 18, color: "var(--accent)" }}>
                    {st.value}
                  </div>
                </div>
              ))}
            </div>
          )}
          {"cta" in sec && sec.cta && (
            <a
              href="mailto:manifest@southernvector.nz"
              className="mono"
              style={{
                pointerEvents: "auto",
                display: "inline-block",
                marginTop: 8,
                padding: "12px 20px",
                background: "var(--accent-hot)",
                color: "var(--bg)",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Fly with us
            </a>
          )}
        </section>
      ))}
    </div>
  );
}
