const { spawnSync } = require("node:child_process");

const scope = process.argv[2];

if (!scope) {
    console.error("Usage: node scripts/build-with-scope.js <local|production|full-seo>");
    process.exit(1);
}

const result = spawnSync(
    process.execPath,
    ["scripts/run-generate-sitemaps.cjs", "--if-production"],
    {
        stdio: "inherit",
        env: {
            ...process.env,
            GALEO_BUILD_SCOPE: scope,
        },
    },
);

if (result.error) {
    throw result.error;
}

if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
}

const buildResult = spawnSync(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["next", "build"],
    {
        stdio: "inherit",
        env: {
            ...process.env,
            GALEO_BUILD_SCOPE: scope,
        },
    },
);

if (buildResult.error) {
    throw buildResult.error;
}

process.exit(buildResult.status ?? 0);
