import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin workspace root so worktrees don't inherit the parent lockfile for lint/build.
  outputFileTracingRoot: root,
};

export default nextConfig;
