import "server-only";

import { Resend, type Attachment } from "resend";
import { businessInfo } from "@/lib/constants";
import type { SelectedTreatment } from "@/lib/booking-types";
import {
  getBookingFeeAmount,
  getBookingFeePercentage,
  getSalonAddressLine,
  getSiteUrl,
  getUnsubscribeUrl,
} from "@/lib/server/email-config";

interface SendEmailResult {
  status: "sent" | "failed" | "skipped";
  providerMessageId: string | null;
  errorMessage: string | null;
}

interface BookingConfirmationInput {
  bookingId: string;
  clientName: string;
  email: string | null;
  bookingType: "treatment" | "consultation";
  consultationContext: string | null;
  preferredDate: string;
  preferredTimeSlot: string;
  treatments: SelectedTreatment[];
  totalValue: number | null;
  bookingReference: string | null;
}

interface WelcomeEmailInput {
  email: string;
  name: string | null;
  unsubscribeToken: string;
}

interface MemberOfferEmailInput {
  email: string;
  name: string | null;
  unsubscribeToken: string;
  subject: string;
  previewText?: string | null;
  offerTitle: string;
  offerBody: string;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  attachments?: Attachment[];
}

interface ChatbotLeadEmailInput {
  leadId: string;
  conversationId: string;
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  location?: string | null;
  serviceNeeded?: string | null;
  notes?: string | null;
}

function getResend() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  return apiKey ? new Resend(apiKey) : null;
}

function getFromEmail() {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() ||
    `Galeo Beauty <${businessInfo.email}>`
  );
}

function getReplyToEmail() {
  return process.env.RESEND_REPLY_TO_EMAIL?.trim() || businessInfo.email;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMoney(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return "To be confirmed";
  }

  return `R ${value.toLocaleString("en-ZA")}`;
}

function formatDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-ZA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTimeSlot(value: string) {
  const labels: Record<string, string> = {
    morning: "Morning (9:00 AM - 12:00 PM)",
    afternoon: "Afternoon (12:00 PM - 3:00 PM)",
    "late-afternoon": "Late Afternoon (3:00 PM - 6:00 PM)",
  };

  return labels[value] ?? value;
}

function renderShell({ preview, body }: { preview: string; body: string }) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(preview)}</title>
  </head>
  <body style="margin:0;background:#f6efe6;font-family:Arial,Helvetica,sans-serif;color:#17120f;">
    <div style="display:none;max-height:0;overflow:hidden;">${escapeHtml(preview)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6efe6;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#fffaf3;border:1px solid #eadfce;">
            <tr>
              <td align="center" style="background:#17120f;color:#fffaf3;padding:34px 26px;">
                <p style="margin:0 0 10px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9a55c;">Galeo Beauty</p>
                <h1 style="margin:0;font-family:Georgia,serif;font-size:30px;line-height:1.15;font-weight:400;">${escapeHtml(preview)}</h1>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:30px 26px;">
                ${body}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderDetailRow(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #eadfce;color:#7b6f62;font-size:13px;text-align:left;">${escapeHtml(label)}</td>
    <td style="padding:10px 0;border-bottom:1px solid #eadfce;color:#17120f;font-size:13px;font-weight:700;text-align:right;">${escapeHtml(value)}</td>
  </tr>`;
}

export function renderBookingConfirmationEmail(input: BookingConfirmationInput) {
  const isTreatment = input.bookingType === "treatment";
  const bookingFee = getBookingFeeAmount(input.totalValue);
  const treatmentsHtml = input.treatments.length
    ? input.treatments
        .map(
          (treatment) =>
            `<li style="margin:0 0 10px;text-align:left;">
              <strong>${escapeHtml(treatment.item.name)}</strong>
              ${treatment.item.duration ? `<br><span style="color:#7b6f62;">${escapeHtml(treatment.item.duration)}</span>` : ""}
              <br><span style="color:#c9a55c;font-weight:700;">${escapeHtml(treatment.item.price)}</span>
            </li>`
        )
        .join("")
    : `<li style="margin:0 0 10px;text-align:left;">${escapeHtml(input.consultationContext ?? "Free consultation")}</li>`;

  const bankingRows =
    isTreatment && businessInfo.banking
      ? `<h2 style="margin:28px 0 12px;font-size:18px;font-weight:700;text-align:center;">Payment details</h2>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          ${renderDetailRow("Account", businessInfo.banking.companyName)}
          ${renderDetailRow("Bank", businessInfo.banking.bank)}
          ${renderDetailRow("Account no.", businessInfo.banking.accountNumber)}
          ${renderDetailRow("Branch", `${businessInfo.banking.branch} (${businessInfo.banking.branchCode})`)}
          ${renderDetailRow("Reference", input.bookingReference ?? input.clientName)}
        </table>`
      : "";

  return renderShell({
    preview: isTreatment ? "Your booking request is in" : "Your consultation request is in",
    body: `
      <p style="margin:0 auto 18px;max-width:500px;font-size:16px;line-height:1.7;text-align:center;">
        Dear ${escapeHtml(input.clientName)}, thank you for choosing Galeo Beauty. We have received your ${
          isTreatment ? "booking request" : "consultation request"
        } and our team will make sure every detail is handled with care.
      </p>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:22px 0;">
        ${renderDetailRow("Preferred date", formatDate(input.preferredDate))}
        ${renderDetailRow("Preferred time", formatTimeSlot(input.preferredTimeSlot))}
        ${renderDetailRow("Booking reference", input.bookingReference ?? input.clientName)}
        ${isTreatment ? renderDetailRow("Treatment total", formatMoney(input.totalValue)) : ""}
        ${
          isTreatment
            ? renderDetailRow(`${getBookingFeePercentage()}% booking fee`, formatMoney(bookingFee))
            : renderDetailRow("Consultation fee", "Free")
        }
      </table>

      <h2 style="margin:26px 0 12px;font-size:18px;font-weight:700;text-align:center;">Selected service${input.treatments.length === 1 ? "" : "s"}</h2>
      <ul style="display:inline-block;margin:0 auto 4px;padding-left:20px;font-size:14px;line-height:1.5;text-align:left;">
        ${treatmentsHtml}
      </ul>

      ${
        isTreatment
          ? `<p style="margin:20px auto 0;max-width:500px;font-size:14px;line-height:1.7;text-align:center;color:#7b6f62;">
              Your appointment is secured once the ${getBookingFeePercentage()}% booking fee is received and confirmed.
            </p>`
          : ""
      }

      ${bankingRows}

      <h2 style="margin:28px 0 12px;font-size:18px;font-weight:700;text-align:center;">Visit Galeo</h2>
      <p style="margin:0 auto 8px;max-width:500px;font-size:14px;line-height:1.7;text-align:center;">
        ${escapeHtml(getSalonAddressLine())}<br>
        WhatsApp: ${escapeHtml(businessInfo.cell ?? businessInfo.socials.whatsapp)}<br>
        Telephone: ${escapeHtml(businessInfo.phone ?? businessInfo.email)}
      </p>
      <p style="margin:18px 0 0;text-align:center;">
        <a href="${escapeHtml(businessInfo.socials.google ?? getSiteUrl())}" style="display:inline-block;background:#17120f;color:#fffaf3;padding:13px 18px;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Get directions</a>
      </p>
    `,
  });
}

export function renderSubscriberWelcomeEmail(input: WelcomeEmailInput) {
  const unsubscribeUrl = getUnsubscribeUrl(input.unsubscribeToken);

  return renderShell({
    preview: "Welcome to the Galeo Beauty Circle",
    body: `
      <p style="margin:0 auto 18px;max-width:500px;font-size:16px;line-height:1.7;text-align:center;">
        ${input.name ? `Dear ${escapeHtml(input.name)}, ` : ""}you are now part of the Galeo Beauty Circle.
      </p>
      <p style="margin:0 auto 22px;max-width:500px;font-size:14px;line-height:1.8;text-align:center;color:#7b6f62;">
        We will send you refined weekly offers, selected treatment specials, beauty updates, and early access to member-only salon moments.
      </p>
      <p style="margin:0 0 22px;text-align:center;">
        <a href="${escapeHtml(`${getSiteUrl()}/members`)}" style="display:inline-block;background:#17120f;color:#fffaf3;padding:13px 18px;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">View member page</a>
      </p>
      <p style="margin:22px auto 0;max-width:500px;font-size:12px;line-height:1.7;text-align:center;color:#7b6f62;">
        You can unsubscribe at any time:
        <a href="${escapeHtml(unsubscribeUrl)}" style="color:#17120f;">unsubscribe</a>.
      </p>
    `,
  });
}

export function renderMemberOfferEmail(input: MemberOfferEmailInput) {
  const unsubscribeUrl = getUnsubscribeUrl(input.unsubscribeToken);
  const ctaUrl = input.ctaUrl?.trim();
  const ctaLabel = input.ctaLabel?.trim() || "View offer";

  return renderShell({
    preview: input.previewText?.trim() || input.subject,
    body: `
      <p style="margin:0 auto 16px;max-width:500px;font-size:15px;line-height:1.7;text-align:center;color:#7b6f62;">
        ${input.name ? `Dear ${escapeHtml(input.name)},` : "Dear Galeo Beauty Circle member,"}
      </p>
      <h2 style="margin:0 auto 16px;max-width:500px;font-family:Georgia,serif;font-size:26px;line-height:1.2;font-weight:400;text-align:center;">
        ${escapeHtml(input.offerTitle)}
      </h2>
      <p style="margin:0 auto 22px;max-width:520px;font-size:15px;line-height:1.8;text-align:center;color:#51473f;">
        ${escapeHtml(input.offerBody).replace(/\n/g, "<br>")}
      </p>
      ${
        ctaUrl
          ? `<p style="margin:0 0 22px;text-align:center;">
              <a href="${escapeHtml(ctaUrl)}" style="display:inline-block;background:#17120f;color:#fffaf3;padding:13px 18px;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">${escapeHtml(ctaLabel)}</a>
            </p>`
          : ""
      }
      <p style="margin:26px auto 0;max-width:500px;font-size:12px;line-height:1.7;text-align:center;color:#7b6f62;">
        You are receiving this because you joined the Galeo Beauty Circle.
        <a href="${escapeHtml(unsubscribeUrl)}" style="color:#17120f;">Unsubscribe</a>.
      </p>
    `,
  });
}

export function renderChatbotLeadEmail(input: ChatbotLeadEmailInput) {
  return renderShell({
    preview: "New website chat enquiry",
    body: `
      <p style="margin:0 auto 18px;max-width:500px;font-size:15px;line-height:1.7;text-align:center;color:#51473f;">
        The Galeo website assistant captured a service enquiry. Review the details below and follow up through the client's preferred contact method.
      </p>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:22px 0;">
        ${renderDetailRow("Name", input.name || "Not provided")}
        ${renderDetailRow("Phone", input.phone || "Not provided")}
        ${renderDetailRow("Email", input.email || "Not provided")}
        ${renderDetailRow("Location", input.location || "Not provided")}
        ${renderDetailRow("Service needed", input.serviceNeeded || "Not provided")}
        ${renderDetailRow("Lead ID", input.leadId)}
      </table>

      ${
        input.notes
          ? `<p style="margin:18px auto 0;max-width:500px;font-size:14px;line-height:1.7;text-align:left;color:#51473f;">
              <strong>Notes:</strong><br>${escapeHtml(input.notes)}
            </p>`
          : ""
      }
    `,
  });
}

export async function sendEmail({
  to,
  subject,
  html,
  attachments,
}: {
  to: string;
  subject: string;
  html: string;
  attachments?: Attachment[];
}): Promise<SendEmailResult> {
  const resend = getResend();
  if (!resend) {
    return {
      status: "skipped",
      providerMessageId: null,
      errorMessage: "RESEND_API_KEY is not configured.",
    };
  }

  try {
    const result = await resend.emails.send({
      from: getFromEmail(),
      to,
      subject,
      html,
      replyTo: getReplyToEmail(),
      attachments,
    });

    if (result.error) {
      return {
        status: "failed",
        providerMessageId: null,
        errorMessage: result.error.message,
      };
    }

    return {
      status: "sent",
      providerMessageId: result.data?.id ?? null,
      errorMessage: null,
    };
  } catch (error) {
    return {
      status: "failed",
      providerMessageId: null,
      errorMessage: error instanceof Error ? error.message : "Resend email failed.",
    };
  }
}

export async function sendBookingConfirmationEmail(input: BookingConfirmationInput) {
  if (!input.email) {
    return {
      status: "skipped" as const,
      providerMessageId: null,
      errorMessage: "Client email was not provided.",
    };
  }

  return sendEmail({
    to: input.email,
    subject: input.bookingType === "treatment"
      ? "Galeo Beauty booking request received"
      : "Galeo Beauty consultation request received",
    html: renderBookingConfirmationEmail(input),
  });
}

export async function sendSubscriberWelcomeEmail(input: WelcomeEmailInput) {
  return sendEmail({
    to: input.email,
    subject: "Welcome to the Galeo Beauty Circle",
    html: renderSubscriberWelcomeEmail(input),
  });
}

export async function sendMemberOfferEmail(input: MemberOfferEmailInput) {
  return sendEmail({
    to: input.email,
    subject: input.subject,
    html: renderMemberOfferEmail(input),
    attachments: input.attachments,
  });
}

export async function sendChatbotLeadEmail(input: ChatbotLeadEmailInput) {
  const to = process.env.CHATBOT_LEADS_TO_EMAIL?.trim() || businessInfo.email;

  return sendEmail({
    to,
    subject: `New Galeo chat enquiry: ${input.serviceNeeded || "service enquiry"}`,
    html: renderChatbotLeadEmail(input),
  });
}
