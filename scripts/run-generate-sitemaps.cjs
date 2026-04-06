const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const repoRoot = path.resolve(__dirname, "..");
const tempDir = path.join(repoRoot, ".codex-tmp-sitemaps");
const compileOnly = process.argv.includes("--check");
const onlyIfProduction = process.argv.includes("--if-production");

function shouldGenerateSitemapsForCurrentBuild() {
  const explicitBuildScope = (process.env.GALEO_BUILD_SCOPE || "").trim().toLowerCase();
  const deployTarget = (process.env.GALEO_DEPLOY_TARGET || "").trim().toLowerCase();
  const isHetznerDeploy =
    deployTarget === "hetzner" ||
    process.env.HETZNER === "1" ||
    process.env.HETZNER === "true";

  if (["production", "prod", "server", "deploy", "hetzner", "full", "full-seo", "complete", "all"].includes(explicitBuildScope)) {
    return true;
  }

  return (
    isHetznerDeploy ||
    process.env.VERCEL === "1" ||
    process.env.CI === "true" ||
    process.env.GITHUB_ACTIONS === "true"
  );
}

function runNode(args, extraEnv = {}) {
  return spawnSync(process.execPath, args, {
    cwd: repoRoot,
    stdio: "inherit",
    env: {
      ...process.env,
      ...extraEnv,
    },
  });
}

function cleanup() {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

if (!compileOnly && onlyIfProduction && !shouldGenerateSitemapsForCurrentBuild()) {
  console.log("Skipping sitemap generation for local build.");
  process.exit(0);
}

cleanup();

const tscCliPath = require.resolve("typescript/bin/tsc");
const compileResult = runNode([
  tscCliPath,
  "--pretty",
  "false",
  "--module",
  "NodeNext",
  "--moduleResolution",
  "NodeNext",
  "--target",
  "ES2022",
  "--outDir",
  tempDir,
  "scripts/generate-sitemaps.ts",
]);

if (compileResult.error) {
  cleanup();
  throw compileResult.error;
}

if ((compileResult.status ?? 0) !== 0) {
  cleanup();
  process.exit(compileResult.status ?? 1);
}

const generatedScriptPath = path.join(tempDir, "scripts", "generate-sitemaps.js");
const runResult = runNode(
  [generatedScriptPath],
  compileOnly ? { GALEO_SITEMAP_COMPILE_ONLY: "1" } : {}
);

cleanup();

if (runResult.error) {
  throw runResult.error;
}

process.exit(runResult.status ?? 0);
