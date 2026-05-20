import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import type { Attachment } from "resend";
import { sendMemberOfferEmail } from "@/lib/server/email";
import { getPostgresPool } from "@/lib/server/postgres";
import {
  listActiveSubscribersForCampaign,
  markSubscriberEmailSent,
  recordEmailEvent,
} from "@/lib/server/subscribers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface CampaignAttachmentMeta {
  filename: string;
  contentType: string | null;
  size: number;
}

const MAX_ATTACHMENT_COUNT = 5;
const MAX_TOTAL_ATTACHMENT_SIZE = 10 * 1024 * 1024;
const ALLOWED_ATTACHMENT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
  "text/plain",
]);
const ALLOWED_ATTACHMENT_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "gif", "pdf", "doc", "docx", "xls", "xlsx", "csv", "txt"]);

function cleanValue(value?: string | null) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? cleanValue(value) : null;
}

function isUploadFile(value: FormDataEntryValue): value is File {
  return typeof value === "object" && value !== null && "arrayBuffer" in value && "name" in value && "size" in value;
}

function sanitizeFilename(filename: string) {
  return filename.replace(/[^\w.\- ()]/g, "_").slice(0, 120) || "attachment";
}

function hasAllowedAttachmentType(file: File) {
  const contentType = file.type.toLowerCase();
  const extension = file.name.split(".").pop()?.toLowerCase();
  return ALLOWED_ATTACHMENT_TYPES.has(contentType) || Boolean(extension && ALLOWED_ATTACHMENT_EXTENSIONS.has(extension));
}

async function parseAttachments(formData: FormData) {
  const uploadedFiles = formData
    .getAll("attachments")
    .filter(isUploadFile)
    .filter((file) => file.size > 0);

  if (uploadedFiles.length > MAX_ATTACHMENT_COUNT) {
    return {
      error: `Attach up to ${MAX_ATTACHMENT_COUNT} files only.`,
      attachments: [] as Attachment[],
      metadata: [] as CampaignAttachmentMeta[],
    };
  }

  const totalSize = uploadedFiles.reduce((total, file) => total + file.size, 0);
  if (totalSize > MAX_TOTAL_ATTACHMENT_SIZE) {
    return {
      error: "Attachments must be 10MB or less in total.",
      attachments: [] as Attachment[],
      metadata: [] as CampaignAttachmentMeta[],
    };
  }

  const invalidFile = uploadedFiles.find((file) => !hasAllowedAttachmentType(file));
  if (invalidFile) {
    return {
      error: `${invalidFile.name} is not an allowed file type. Use images, PDFs, Word, Excel, CSV, or text files.`,
      attachments: [] as Attachment[],
      metadata: [] as CampaignAttachmentMeta[],
    };
  }

  const attachments = await Promise.all(
    uploadedFiles.map(async (file) => ({
      filename: sanitizeFilename(file.name),
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type || undefined,
    }))
  );

  const metadata = uploadedFiles.map((file) => ({
    filename: sanitizeFilename(file.name),
    contentType: file.type || null,
    size: file.size,
  }));

  return { error: null, attachments, metadata };
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData();
  const subject = getFormString(formData, "subject");
  const previewText = getFormString(formData, "previewText");
  const offerTitle = getFormString(formData, "offerTitle");
  const offerBody = getFormString(formData, "offerBody");
  const ctaLabel = getFormString(formData, "ctaLabel");
  const ctaUrl = getFormString(formData, "ctaUrl");

  if (!subject || !offerTitle || !offerBody) {
    return NextResponse.json(
      {
        ok: false,
        error: "Subject, offer title, and offer body are required.",
      },
      { status: 400 }
    );
  }

  const attachmentResult = await parseAttachments(formData);
  if (attachmentResult.error) {
    return NextResponse.json(
      {
        ok: false,
        error: attachmentResult.error,
      },
      { status: 400 }
    );
  }

  const subscribers = await listActiveSubscribersForCampaign();
  if (subscribers.length === 0) {
    return NextResponse.json(
      {
        ok: false,
        error: "There are no active subscribers to email.",
      },
      { status: 400 }
    );
  }

  const pool = getPostgresPool();
  const campaignResult = await pool.query<{ id: string }>(
    `insert into email_campaigns (
       subject,
       preview_text,
       offer_title,
       offer_body,
       cta_label,
       cta_url,
       attachment_count,
       attachments_json,
       recipient_count,
       status
     ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'sending')
     returning id`,
    [
      subject,
      previewText,
      offerTitle,
      offerBody,
      ctaLabel,
      ctaUrl,
      attachmentResult.metadata.length,
      JSON.stringify(attachmentResult.metadata),
      subscribers.length,
    ]
  );

  const campaignId = campaignResult.rows[0].id;
  let sentCount = 0;
  let failedCount = 0;

  for (const subscriber of subscribers) {
    const emailResult = await sendMemberOfferEmail({
      email: subscriber.email,
      name: subscriber.name,
      unsubscribeToken: subscriber.unsubscribeToken,
      subject,
      previewText,
      offerTitle,
      offerBody,
      ctaLabel,
      ctaUrl,
      attachments: attachmentResult.attachments,
    });

    if (emailResult.status === "sent") {
      sentCount += 1;
      await markSubscriberEmailSent(subscriber.id);
    } else {
      failedCount += 1;
    }

    await recordEmailEvent({
      subscriberId: subscriber.id,
      eventType: "member_offer",
      providerMessageId: emailResult.providerMessageId,
      status: emailResult.status,
      errorMessage: emailResult.errorMessage,
      metadata: {
        campaignId,
        subject,
        attachments: attachmentResult.metadata,
      },
    });
  }

  await pool.query(
    `update email_campaigns
     set sent_count = $2,
         failed_count = $3,
         status = $4
     where id = $1`,
    [campaignId, sentCount, failedCount, failedCount > 0 && sentCount === 0 ? "failed" : "sent"]
  );

  return NextResponse.json({
    ok: true,
    campaignId,
    recipientCount: subscribers.length,
    sentCount,
    failedCount,
    attachmentCount: attachmentResult.metadata.length,
  });
}
