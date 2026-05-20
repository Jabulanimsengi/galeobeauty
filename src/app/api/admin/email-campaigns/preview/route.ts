import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { renderMemberOfferEmail } from "@/lib/server/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PreviewRequest {
  subject?: string;
  previewText?: string;
  offerTitle?: string;
  offerBody?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

function cleanValue(value?: string | null) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json()) as PreviewRequest;
  const subject = cleanValue(body.subject);
  const offerTitle = cleanValue(body.offerTitle);
  const offerBody = cleanValue(body.offerBody);

  if (!subject || !offerTitle || !offerBody) {
    return NextResponse.json(
      {
        ok: false,
        error: "Subject, offer title, and offer details are required before previewing.",
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    html: renderMemberOfferEmail({
      email: "preview@galeobeauty.com",
      name: "Galeo Beauty member",
      unsubscribeToken: "preview",
      subject,
      previewText: cleanValue(body.previewText),
      offerTitle,
      offerBody,
      ctaLabel: cleanValue(body.ctaLabel),
      ctaUrl: cleanValue(body.ctaUrl),
    }),
  });
}
