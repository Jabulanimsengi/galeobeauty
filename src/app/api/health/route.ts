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
            release,
        },
        {
            headers: {
                "Cache-Control": "no-store, max-age=0",
                "X-Galeo-Release": release.releaseId,
                "X-Galeo-Slot": release.slot,
                "X-Galeo-Build-Scope": release.buildScope,
            },
        },
    );
}
