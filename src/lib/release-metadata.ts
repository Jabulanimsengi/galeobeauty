import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import packageJson from "../../package.json";
import { STATIC_BUILD_SCOPE } from "@/lib/build-config";

type ReleaseMetadataFile = {
    buildScope?: string;
    deployedAt?: string;
    deployTarget?: string;
    gitSha?: string;
    releaseId?: string;
    slot?: string;
};

function firstNonEmpty(...values: Array<string | null | undefined>) {
    for (const value of values) {
        if (typeof value === "string" && value.trim().length > 0) {
            return value.trim();
        }
    }

    return undefined;
}

function readReleaseMetadataFile(): ReleaseMetadataFile {
    const metadataPath = path.join(process.cwd(), "release-metadata.json");

    if (!existsSync(metadataPath)) {
        return {};
    }

    try {
        return JSON.parse(readFileSync(metadataPath, "utf8")) as ReleaseMetadataFile;
    } catch {
        return {};
    }
}

function resolveGitSha() {
    const fileMetadata = readReleaseMetadataFile();

    return (
        firstNonEmpty(
            process.env.GALEO_GIT_SHA,
            process.env.GIT_SHA,
            process.env.VERCEL_GIT_COMMIT_SHA,
            process.env.GITHUB_SHA,
            fileMetadata.gitSha,
        ) ||
        "unknown"
    );
}

function shortenGitSha(gitSha: string) {
    return gitSha === "unknown" ? gitSha : gitSha.slice(0, 8);
}

function resolveDeployTarget() {
    const fileMetadata = readReleaseMetadataFile();
    const explicitTarget = firstNonEmpty(
        process.env.GALEO_DEPLOY_TARGET,
        fileMetadata.deployTarget,
    );

    if (explicitTarget) {
        return explicitTarget;
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
    const fileMetadata = readReleaseMetadataFile();
    const gitSha = resolveGitSha();
    const releaseId =
        firstNonEmpty(process.env.GALEO_RELEASE_ID, fileMetadata.releaseId) ||
        (gitSha !== "unknown" ? shortenGitSha(gitSha) : packageJson.version);

    return {
        service: packageJson.name,
        version: packageJson.version,
        releaseId,
        gitSha,
        slot:
            firstNonEmpty(
                process.env.GALEO_RELEASE_SLOT,
                process.env.APP_SLOT,
                fileMetadata.slot,
            ) || "unknown",
        buildScope:
            firstNonEmpty(process.env.GALEO_BUILD_SCOPE, fileMetadata.buildScope) ||
            STATIC_BUILD_SCOPE,
        deployTarget: resolveDeployTarget(),
        deployedAt:
            firstNonEmpty(process.env.GALEO_DEPLOYED_AT, process.env.BUILD_TIME, fileMetadata.deployedAt) ||
            null,
        port: firstNonEmpty(process.env.PORT) || null,
        nodeEnv: firstNonEmpty(process.env.NODE_ENV) || "development",
    };
}
