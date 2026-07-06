import Image from "next/image";
import styles from "./BlueprintArchive.module.css";

const PLATES = [
  {
    src: "/blueprints/kea-1.jpg",
    title: "Kea-1 — side elevation",
    alt: "Engineering blueprint of the Kea-1 two-stage launch vehicle in side elevation, annotating the payload fairing, second stage, interstage, Tui regeneratively cooled engines, and control surfaces",
  },
  {
    src: "/blueprints/kea-1-cutaway.jpg",
    title: "Kea-1 cutaway — internal systems",
    alt: "Cutaway blueprint of Kea-1 internal systems showing propellant tanks, avionics bay, guidance and autonomous range-safety computer, payload adapter, separation systems, and the integrated Moa kick stage",
  },
  {
    src: "/blueprints/tui-engine.jpg",
    title: "Tui engine — technical specification",
    alt: "Technical specification sheet for the additively manufactured, regeneratively cooled Tui engine, with nozzle bell, injector plate, turbopump assembly, and gimbal mount views",
  },
  {
    src: "/blueprints/moa-kick-stage.jpg",
    title: "Moa kick stage — dispenser sequence",
    alt: "Exploded-view blueprint of the Moa multi-drop kick stage dispenser sequence, showing cold-gas or electric propulsion, avionics, and payload separation — one launch, every slot",
  },
  {
    src: "/blueprints/kea-1-guidance-systems.jpg",
    title: "Guidance & range safety",
    alt: "Blueprint of the Kea-1 precision guidance stack and autonomous range-safety systems",
  },
  {
    src: "/blueprints/kea-1-payload-integration.jpg",
    title: "Payload integration",
    alt: "Blueprint of the Kea-1 payload integration flow, with fairing encapsulation and payload adapter details",
  },
  {
    src: "/blueprints/kea-1-launch-trajectory.jpg",
    title: "Launch trajectory — insertion corridor",
    alt: "Diagram of the Kea-1 launch trajectory and precision insertion corridor to sun-synchronous orbit",
  },
  {
    src: "/blueprints/kea-1-launch-vehicle.jpg",
    title: "Kea-1 — precision insertion architecture",
    alt: "Blueprint of the Kea-1 launch vehicle precision insertion architecture in side elevation",
  },
] as const;

/**
 * Static engineering-plate gallery rendered below the scrolling Corridor
 * narrative. Plain DOM (no R3F): sits above the fixed canvas on a solid
 * background, so it adds zero draw calls to the scene budget.
 */
export function BlueprintArchive() {
  return (
    <section className={styles.archive} aria-labelledby="blueprint-archive-title">
      <header>
        <p className={`mono ${styles.kicker}`}>Technical archive</p>
        <h2 id="blueprint-archive-title" className={styles.title}>
          Engineering, documented.
        </h2>
        <p className={styles.lede}>
          The Corridor is a promise backed by hardware. The Kea-1 engineering
          plates — vehicle, engines, guidance, and the Moa multi-drop stage —
          document the machine that flies it.
        </p>
      </header>
      <div className={styles.grid}>
        {PLATES.map((plate, i) => (
          <figure key={plate.src} className={styles.plate}>
            <Image
              src={plate.src}
              alt={plate.alt}
              width={1168}
              height={784}
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.image}
            />
            <figcaption className={`mono ${styles.caption}`}>
              Plate {String(i + 1).padStart(2, "0")} — {plate.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
