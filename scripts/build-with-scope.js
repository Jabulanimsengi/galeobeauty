const { spawnSync } = require("node:child_process");

const scope = process.argv[2];

if (!scope) {
    console.error("Usage: node scripts/build-with-scope.js <local|production|full-seo>");
    process.exit(1);
}

const result = spawnSync(
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

if (result.error) {
    throw result.error;
}

process.exit(result.status ?? 0);
