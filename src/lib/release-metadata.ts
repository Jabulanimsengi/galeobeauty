import packageJson from "../../package.json";
import { STATIC_BUILD_SCOPE } from "@/lib/build-config";

function resolveGitSha() {
    return (
        process.env.GALEO_GIT_SHA ||
        process.env.GIT_SHA ||
        process.env.VERCEL_GIT_COMMIT_SHA ||
        process.env.GITHUB_SHA ||
        "unknown"
    );
}

function shortenGitSha(gitSha: string) {
    return gitSha === "unknown" ? gitSha : gitSha.slice(0, 8);
}

function resolveDeployTarget() {
    if (process.env.GALEO_DEPLOY_TARGET) {
        return process.env.GALEO_DEPLOY_TARGET;
    }

    if (process.env.HETZNER === "1" || process.env.HETZNER === "true") {
        return "hetzner";
    }

    if (process.env.VERCEL === "1") {
        return "vercel";
    }

    if (process.env.GITHUB_ACTIONS === "true") {
        return "github-actions";
    }

    if (process.env.CI === "true") {
        return "ci";
    }

    return "local";
}

export function getReleaseMetadata() {
    const gitSha = resolveGitSha();
    const releaseId =
        process.env.GALEO_RELEASE_ID ||
        (gitSha !== "unknown" ? shortenGitSha(gitSha) : packageJson.version);

    return {
        service: packageJson.name,
        version: packageJson.version,
        releaseId,
        gitSha,
        slot: process.env.GALEO_RELEASE_SLOT || process.env.APP_SLOT || "unknown",
        buildScope: STATIC_BUILD_SCOPE,
        deployTarget: resolveDeployTarget(),
        deployedAt: process.env.GALEO_DEPLOYED_AT || process.env.BUILD_TIME || null,
        port: process.env.PORT || null,
        nodeEnv: process.env.NODE_ENV || "development",
    };
}
