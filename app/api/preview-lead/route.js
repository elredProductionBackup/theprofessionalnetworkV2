import { previewVideoUrl } from "@/lib/previewVideo";

/* Free preview sign-up: name + email + phone → Google Sheet, then the video link.
 *
 * Called by components/preview/PreviewGate.jsx. The row is written by a
 * Google Apps Script web app (scripts/google-sheets-preview-leads.gs).
 *
 * Env (Vercel, server-side — not NEXT_PUBLIC):
 *   GOOGLE_SHEET_WEBHOOK_URL  the Apps Script web app URL (…/exec)
 *   GOOGLE_SHEET_SECRET       same value as SECRET in the Apps Script
 *   PREVIEW_VIDEO_URL         optional, overrides lib/previewVideo.js
 *
 * If the sheet is down or not set up, the visitor still gets the video;
 * the failure is logged (Vercel → Logs).
 */

export const dynamic = "force-dynamic";

const SHEET_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL;
const SHEET_SECRET = process.env.GOOGLE_SHEET_SECRET || "";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

const clean = (v, max = 200) =>
  String(v ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

const fail = (error, status = 400) => Response.json({ ok: false, error }, { status });

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return fail("Something went wrong. Please try again.");
  }

  const name = clean(body?.name, 100);
  const email = clean(body?.email, 200).toLowerCase();
  const phone = String(body?.phone || "").replace(/\D/g, "").slice(-10);
  if (name.length < 2) return fail("Enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return fail("Enter a valid email address.");
  if (!/^[6-9]\d{9}$/.test(phone)) return fail("Enter a 10-digit mobile number.");

  const video = previewVideoUrl();

  // Honeypot: a hidden field people never fill in. Bots get the normal
  // response, but nothing is written to the sheet.
  if (clean(body?.website)) return Response.json({ ok: true, video });

  let saved = false;
  if (!SHEET_URL) {
    console.warn("[preview-lead] GOOGLE_SHEET_WEBHOOK_URL is not set; lead not saved.");
  } else {
    const row = {
      secret: SHEET_SECRET,
      name,
      email,
      phone: `+91 ${phone}`,
      page: clean(body?.page, 500),
      referrer: clean(body?.referrer, 500),
      userAgent: clean(request.headers.get("user-agent"), 300),
    };
    UTM_KEYS.forEach((key) => (row[key] = clean(body?.utm?.[key], 200)));

    try {
      // Apps Script answers with a redirect to the result; fetch follows it.
      const res = await fetch(SHEET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(row),
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      });
      const out = await res.json().catch(() => null);
      saved = !!out?.ok;
      if (!saved) console.error("[preview-lead] Sheet did not save the row:", res.status, out);
    } catch (err) {
      console.error("[preview-lead] Sheet request failed:", err?.message || err);
    }
  }

  return Response.json({ ok: true, saved, video });
}
