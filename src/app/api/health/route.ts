import { NextResponse } from "next/server";
import { getReleaseMetadata } from "@/lib/release-metadata";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export function GET() {
    const release = getReleaseMetadata();

    return NextResponse.json(
        {
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
        },
        {
            headers: {
                "Cache-Control": "no-store, max-age=0",
            },
        },
    );
}
