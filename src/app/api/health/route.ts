import { NextResponse } from "next/server";
import { getReleaseMetadata } from "@/lib/release-metadata";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

function isLoopbackHost(hostname: string) {
    return hostname === "127.0.0.1" || hostname === "localhost" || hostname === "::1";
}

export function GET(request: Request) {
    const release = getReleaseMetadata();
    const url = new URL(request.url);
    const forwardedHost = request.headers.get("x-forwarded-host");
    const hostHeader = request.headers.get("host");
    const hostCandidate = forwardedHost || hostHeader || url.host;
    const hostname = hostCandidate.split(":")[0].trim().toLowerCase();
    const internalHealthToken = process.env.GALEO_HEALTH_TOKEN?.trim();
    const providedHealthToken = request.headers.get("x-health-token")?.trim();
    const isInternalRequest =
        isLoopbackHost(url.hostname.toLowerCase()) ||
        isLoopbackHost(hostname) ||
        (!!internalHealthToken && providedHealthToken === internalHealthToken);

    const payload = isInternalRequest
        ? {
            ok: true,
            timestamp: new Date().toISOString(),
            release: {
                service: release.service,
                version: release.version,
                releaseId: release.releaseId,
                gitSha: release.gitSha,
                slot: release.slot,
                buildScope: release.buildScope,
                deployTarget: release.deployTarget,
                deployedAt: release.deployedAt,
            },
        }
        : {
            ok: true,
            timestamp: new Date().toISOString(),
            liveSlot: release.slot,
        };

    return NextResponse.json(
        payload,
        {
            headers: {
                "Cache-Control": "no-store, max-age=0",
                "X-Robots-Tag": "noindex, nofollow, noarchive",
            },
        },
    );
}
