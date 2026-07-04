/**
 * verify-3d — headless performance gate for the R3F scenes.
 *
 * Boots the production server (`next start`) against the existing `.next`
 * build, drives each route in headless Chromium, reads window.__PERF__
 * (published by src/components/three/PerfProbe.tsx), captures console
 * errors and screenshots, and writes perf-report.json.
 *
 * Gates (from .agency/rules/02-standards.md):
 *   - drawCalls  < 100                      (binding)
 *   - console errors === 0                  (binding)
 *   - scene re-renders while animating <= 2 (binding)
 *   - sustained 60 FPS                      (binding on real GPU; advisory
 *     (avg interval <= 17.4 ms — vsync       when renderer is software)
 *     cadence is ~16.7 ms — and < 5%
 *     dropped frames > 25 ms)
 *
 * Env: VERIFY_PORT (default 3100), VERIFY_BASE_URL (skip server spawn).
 * Exit code 0 = PASS, 1 = FAIL.
 */
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.env.VERIFY_PORT ?? 3100);
const BASE = process.env.VERIFY_BASE_URL ?? `http://localhost:${PORT}`;
const ROUTES = ["/", "/dashboard"];
const DRAW_CALL_BUDGET = 100;
// rAF is vsync-locked: a healthy 60 FPS scene averages ~16.7 ms intervals.
// Budget = 60 Hz cadence + jitter tolerance; sustained-ness comes from the
// dropped-frame percentage, not the average alone.
const FRAME_BUDGET_MS = 17.4;
const DROPPED_FRAME_PCT_BUDGET = 5;
const RENDER_DELTA_BUDGET = 2;
const SOFTWARE_RENDERERS = /swiftshader|llvmpipe|software/i;
const ARTIFACT_DIR = join(root, "verify-artifacts");

function log(msg) {
  process.stdout.write(`${msg}\n`);
}

async function waitForServer(url, timeoutMs = 45_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* server not up yet */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`server at ${url} not ready within ${timeoutMs}ms`);
}

function startServer() {
  if (process.env.VERIFY_BASE_URL) return null;
  if (!existsSync(join(root, ".next"))) {
    throw new Error("no .next build found — run `npm run build` first");
  }
  const nextBin = join(root, "node_modules", "next", "dist", "bin", "next");
  const child = spawn(
    process.execPath,
    [nextBin, "start", "-p", String(PORT)],
    { cwd: root, stdio: ["ignore", "pipe", "pipe"] }
  );
  child.stderr.on("data", (d) => process.stderr.write(d));
  return child;
}

async function auditRoute(browser, route) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const consoleErrors = [];
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  page.on("pageerror", (e) => consoleErrors.push(String(e)));

  await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(
    () => (window.__PERF__?.samples ?? 0) >= 120,
    undefined,
    { timeout: 45_000 }
  );

  const rendersBefore = await page.evaluate(() => window.__SCENE_RENDERS__ ?? 0);
  await page.waitForTimeout(2_000);
  const perf = await page.evaluate(() => window.__PERF__);
  const rendersAfter = await page.evaluate(() => window.__SCENE_RENDERS__ ?? 0);

  const slug = route === "/" ? "home" : route.replaceAll("/", "");
  await page.screenshot({ path: join(ARTIFACT_DIR, `${slug}.png`) });
  await page.close();

  const softwareGpu = SOFTWARE_RENDERERS.test(perf.renderer);
  const sceneRendersDelta = rendersAfter - rendersBefore;
  const droppedFramePct =
    perf.totalFrames > 0 ? (perf.longFrames / perf.totalFrames) * 100 : 0;
  const frameOk =
    perf.avgFrameMs <= FRAME_BUDGET_MS &&
    droppedFramePct < DROPPED_FRAME_PCT_BUDGET;
  const gates = {
    drawCalls: perf.drawCalls < DRAW_CALL_BUDGET,
    consoleErrors: consoleErrors.length === 0,
    sceneRenders: sceneRendersDelta <= RENDER_DELTA_BUDGET,
    frameTime: frameOk || softwareGpu,
    frameTimeAdvisoryOnly: softwareGpu,
  };
  return {
    ...perf,
    fps: 1000 / perf.avgFrameMs,
    droppedFramePct,
    consoleErrors,
    sceneRendersDelta,
    gates,
    pass: gates.drawCalls && gates.consoleErrors && gates.sceneRenders && gates.frameTime,
  };
}

async function main() {
  mkdirSync(ARTIFACT_DIR, { recursive: true });
  const server = startServer();
  let browser;
  try {
    if (server) await waitForServer(BASE);
    browser = await chromium.launch({
      headless: true,
      args: ["--use-angle=default", "--enable-unsafe-swiftshader"],
    });

    const routes = {};
    for (const route of ROUTES) {
      log(`auditing ${route} ...`);
      routes[route] = await auditRoute(browser, route);
      const r = routes[route];
      log(
        `  drawCalls=${r.drawCalls} triangles=${r.triangles} ` +
          `fps=${r.fps.toFixed(1)} dropped=${r.droppedFramePct.toFixed(1)}% ` +
          `renders+=${r.sceneRendersDelta} errors=${r.consoleErrors.length} ` +
          `renderer="${r.renderer}" => ${r.pass ? "PASS" : "FAIL"}`
      );
    }

    const pass = Object.values(routes).every((r) => r.pass);
    const report = { generatedAt: new Date().toISOString(), pass, routes };
    writeFileSync(join(root, "perf-report.json"), JSON.stringify(report, null, 2));
    log(`perf-report.json written — overall ${pass ? "PASS" : "FAIL"}`);
    process.exitCode = pass ? 0 : 1;
  } finally {
    await browser?.close();
    server?.kill();
  }
}

main().catch((err) => {
  console.error(`verify-3d fatal: ${err?.message ?? err}`);
  process.exitCode = 1;
});
