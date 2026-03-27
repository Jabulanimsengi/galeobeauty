import { NextResponse } from "next/server";
import { getReleaseMetadata } from "@/lib/release-metadata";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function GET() {
    const release = getReleaseMetadata();

    return NextResponse.json(
        {
            ok: true,
            timestamp: new Date().toISOString(),
            release: {
                releaseId: release.releaseId,
                slot: release.slot,
                buildScope: release.buildScope,
            },
        },
        {
            headers: {
                "Cache-Control": "no-store, max-age=0",
            },
        },
    );
}
