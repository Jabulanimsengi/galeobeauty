"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

interface AttachmentSummary {
  name: string;
  size: number;
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024)).toLocaleString("en-ZA")} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function getTextPayload(formData: FormData) {
  return {
    subject: formData.get("subject"),
    previewText: formData.get("previewText"),
    offerTitle: formData.get("offerTitle"),
    offerBody: formData.get("offerBody"),
    ctaLabel: formData.get("ctaLabel"),
    ctaUrl: formData.get("ctaUrl"),
  };
}

export function EmailCampaignClient({ activeSubscriberCount }: { activeSubscriberCount: number }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<AttachmentSummary[]>([]);

  function clearPreview() {
    setPreviewHtml(null);
    if (status !== "sending") {
      setStatus("idle");
      setMessage(null);
    }
  }

  function handleAttachmentChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.currentTarget.files ?? []).map((file) => ({
      name: file.name,
      size: file.size,
    }));

    setSelectedFiles(files);
    clearPreview();
  }

  async function handlePreview() {
    const form = formRef.current;
    if (!form || !form.reportValidity()) {
      return;
    }

    setIsPreviewing(true);
    setStatus("idle");
    setMessage(null);

    const response = await fetch("/api/admin/email-campaigns/preview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getTextPayload(new FormData(form))),
    });

    const result = (await response.json().catch(() => null)) as {
      error?: string;
      html?: string;
    } | null;

    setIsPreviewing(false);

    if (!response.ok || !result?.html) {
      setStatus("error");
      setMessage(result?.error ?? "The email preview could not be created.");
      return;
    }

    setPreviewHtml(result.html);
    setMessage("Preview ready. Check the wording and attachments before sending.");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!previewHtml) {
      setStatus("error");
      setMessage("Preview the email before sending it to subscribers.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    setStatus("sending");
    setMessage(null);

    const response = await fetch("/api/admin/email-campaigns", {
      method: "POST",
      body: formData,
    });

    const result = (await response.json().catch(() => null)) as {
      error?: string;
      recipientCount?: number;
      sentCount?: number;
      failedCount?: number;
      attachmentCount?: number;
    } | null;

    if (!response.ok) {
      setStatus("error");
      setMessage(result?.error ?? "The email offer could not be sent.");
      return;
    }

    setStatus("success");
    setMessage(
      `Email sent to ${result?.sentCount ?? 0} of ${result?.recipientCount ?? 0} subscribers. Failed: ${
        result?.failedCount ?? 0
      }. Attachments: ${result?.attachmentCount ?? 0}.`
    );
    event.currentTarget.reset();
    setSelectedFiles([]);
    setPreviewHtml(null);
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onInput={clearPreview}
      className="mt-6 grid gap-6 rounded-none border border-black/5 bg-[#fffaf3] p-6 shadow-md shadow-black/[0.02] xl:grid-cols-[minmax(0,1fr)_minmax(380px,0.8fr)] animate-fadeIn"
    >
      <div className="grid gap-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
              Email Subject
            </label>
            <input
              name="subject"
              required
              className="w-full rounded-none border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-gold focus:bg-white placeholder:text-foreground/30 font-medium text-foreground"
              placeholder="This week's Galeo Beauty member offer"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
              Inbox Preview Text
            </label>
            <input
              name="previewText"
              className="w-full rounded-none border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-gold focus:bg-white placeholder:text-foreground/30 font-medium text-foreground"
              placeholder="A considered offer for Beauty Circle members"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
            Offer Title
          </label>
          <input
            name="offerTitle"
            required
            className="w-full rounded-none border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-gold focus:bg-white placeholder:text-foreground/30 font-medium text-foreground"
            placeholder="Member-only facial glow special"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
            Offer Details
          </label>
          <textarea
            name="offerBody"
            required
            rows={5}
            className="w-full resize-y rounded-none border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-gold focus:bg-white placeholder:text-foreground/30 font-medium text-foreground"
            placeholder="Write the offer, dates, and how clients can claim it."
          />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
              CTA Button Text
            </label>
            <input
              name="ctaLabel"
              className="w-full rounded-none border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-gold focus:bg-white placeholder:text-foreground/30 font-medium text-foreground"
              placeholder="Book this offer"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
              CTA Button Link
            </label>
            <input
              name="ctaUrl"
              type="url"
              className="w-full rounded-none border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-gold focus:bg-white placeholder:text-foreground/30 font-medium text-foreground"
              placeholder="https://www.galeobeauty.com/specials"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
            Attach Images or Documents
          </label>
          <input
            name="attachments"
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt"
            onChange={handleAttachmentChange}
            className="w-full rounded-none border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-gold file:mr-4 file:rounded-none file:border-0 file:bg-[#17120f] file:px-3 file:py-1.5 file:text-[10px] file:font-bold file:uppercase file:tracking-[0.1em] file:text-white hover:file:bg-gold hover:file:text-[#17120f] file:transition-all cursor-pointer font-medium text-foreground/75"
          />
          <p className="mt-2 text-xs text-foreground/40 font-medium">
            Use up to 5 files. Total size must be 10MB or less.
          </p>
          {selectedFiles.length > 0 && (
            <ul className="mt-3 grid gap-2 rounded-none border border-black/5 bg-white p-4 text-xs text-foreground/70 shadow-sm">
              {selectedFiles.map((file) => (
                <li key={`${file.name}-${file.size}`} className="flex items-center justify-between gap-3 border-b border-black/5 pb-1.5 last:border-b-0 last:pb-0">
                  <span className="truncate font-medium">{file.name}</span>
                  <span className="shrink-0 text-foreground/45 font-semibold font-mono">{formatFileSize(file.size)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/5 pt-5">
          <p className="max-w-md text-xs leading-relaxed text-foreground/45 font-medium">
            This email will go to <span className="font-bold text-gold-dark">{activeSubscriberCount.toLocaleString("en-ZA")}</span> active subscribers. Preview it first, then send when it looks right.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handlePreview}
              disabled={isPreviewing || status === "sending"}
              className="rounded-none border border-[#17120f] bg-transparent px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#17120f] transition-all hover:border-gold hover:bg-gold hover:text-[#17120f] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPreviewing ? "Building preview..." : "Preview email"}
            </button>
            <button
              type="submit"
              disabled={status === "sending" || activeSubscriberCount === 0 || !previewHtml}
              className="rounded-none bg-[#17120f] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all hover:bg-gold hover:text-[#17120f] hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 shadow-md shadow-[#17120f]/10"
            >
              {status === "sending" ? "Sending..." : "Send to subscribers"}
            </button>
          </div>
        </div>

        {message && (
          <div className={`mt-4 rounded-none border p-4 text-xs font-semibold uppercase tracking-wider ${
            status === "error"
              ? "border-rose-200 bg-rose-50 text-rose-800"
              : status === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-gold/25 bg-[#fffcf7] text-[#17120f]/80"
          }`}>
            {message}
          </div>
        )}
      </div>

      <section className="rounded-none border border-black/5 bg-white shadow-lg overflow-hidden flex flex-col h-full min-h-[480px]">
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4 bg-[#fffaf3]">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">Email Preview</h3>
          <span className={`inline-flex items-center rounded-none px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
            previewHtml
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-[#fffaf3] text-gold-dark border border-gold/20"
          }`}>{previewHtml ? "Ready" : "Drafting"}</span>
        </div>
        {previewHtml ? (
          <iframe title="Email preview" srcDoc={previewHtml} sandbox="" className="flex-1 w-full bg-white border-0" />
        ) : (
          <div className="flex-1 grid place-items-center p-6 text-center text-xs leading-relaxed text-foreground/45 font-medium max-w-sm mx-auto">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gold/60 mx-auto mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              Fill in the offer title, details, and click "Preview email" to preview how this campaign will look in subscriber inboxes.
            </div>
          </div>
        )}
      </section>
    </form>
  );
}
