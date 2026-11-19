import { createHash } from "crypto";
import { TRACKING, PIXEL_HOSTS } from "@/lib/tracking";

/* Server-side Purchase for the Meta Conversions API.
 *
 * Called by the payment success page with { txnid }. The transaction is
 * re-checked with the payment backend before anything is sent, so only real,
 * successful payments reach Meta. event_id = purchase_<txnid> matches the
 * browser pixel Purchase (lib/tracking.js), so Meta counts each sale once.
 *
 * Needs META_CAPI_TOKEN in Vercel (Production). Without it this does nothing.
 * Optional: META_GRAPH_API_VERSION (default v26.0).
 */

const GRAPH_VERSION = process.env.META_GRAPH_API_VERSION || "v26.0";
const PAYMENT_BASE_URL = process.env.NEXT_PUBLIC_PAYMENT_BASE_URL;

const sha256 = (v) => createHash("sha256").update(String(v).trim().toLowerCase()).digest("hex");

// Indian numbers: digits only, with country code (10 digits -> 91XXXXXXXXXX).
function normalisePhone(raw) {
  const digits = String(raw || "").replace(/\D/g, "").replace(/^0+/, "");
  if (!digits) return null;
  return digits.length === 10 ? `91${digits}` : digits;
}

const skip = (reason, status = 200) => Response.json({ sent: false, reason }, { status });

export async function POST(request) {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) return skip("not configured");

  // Live site only: previews, staging and localhost never send.
  const host = (request.headers.get("x-forwarded-host") || request.headers.get("host") || "").split(":")[0].toLowerCase();
  if (!PIXEL_HOSTS.includes(host)) return skip("not the live site");

  let txnid;
  try {
    ({ txnid } = await request.json());
  } catch {
    return skip("bad request", 400);
  }
  if (typeof txnid !== "string" || !txnid || txnid.length > 100) return skip("bad request", 400);

  // Verify the payment with the backend.
  let payment;
  try {
    const res = await fetch(`${PAYMENT_BASE_URL}/tpnEvent/payment/getStatus?txnid=${encodeURIComponent(txnid)}`, { cache: "no-store" });
    const data = await res.json();
    payment = data?.result?.[0];
  } catch (err) {
    console.error("CAPI: payment lookup failed", err);
    return skip("payment lookup failed", 502);
  }
  if (String(payment?.status || "").toLowerCase() !== "success") return skip("payment not successful", 409);

  const attendee = payment.attendee || {};
  const eventCode = payment.eventDetails?.eventCode || payment.eventCode;
  const ticketCode = payment.ticketDetails?.ticketCode || payment.ticketCode;
  const contentId = eventCode && ticketCode ? `${eventCode}:${ticketCode}` : null;
  const phone = normalisePhone(attendee.contact || attendee.phone || attendee.mobile);
  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim();

  const user_data = {
    ...(attendee.email && { em: [sha256(attendee.email)] }),
    ...(phone && { ph: [sha256(phone)] }),
    ...(attendee.firstname && { fn: [sha256(attendee.firstname)] }),
    ...(attendee.lastname && { ln: [sha256(attendee.lastname)] }),
    ...(ip && { client_ip_address: ip }),
    ...(request.headers.get("user-agent") && { client_user_agent: request.headers.get("user-agent") }),
    ...(request.cookies.get("_fbp")?.value && { fbp: request.cookies.get("_fbp").value }),
    ...(request.cookies.get("_fbc")?.value && { fbc: request.cookies.get("_fbc").value }),
  };

  const event = {
    event_name: "Purchase",
    event_time: Math.floor(Date.now() / 1000),
    event_id: `purchase_${txnid}`,
    action_source: "website",
    event_source_url: request.headers.get("referer") || `https://${host}/payment/success`,
    user_data,
    custom_data: {
      value: Number(payment.amount) || 0,
      currency: payment.currency || "INR",
      order_id: txnid,
      content_type: "product",
      ...(contentId && { content_ids: [contentId] }),
    },
  };

  const body = { data: [event] };
  if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE;

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${TRACKING.metaPixelId}/events?access_token=${encodeURIComponent(token)}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
    );
    const out = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("CAPI: Meta rejected the event", out);
      return skip("meta error", 502);
    }
    return Response.json({ sent: true, events_received: out.events_received });
  } catch (err) {
    console.error("CAPI: request failed", err);
    return skip("meta request failed", 502);
  }
}
