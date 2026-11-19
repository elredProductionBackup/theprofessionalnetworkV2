/* ------------------------------------------------------------------ *
 *  Conversion tracking — one place for every ad / CRM event.
 *
 *  Event map (see TRACKING.md for the full setup):
 *
 *    Checkout form opens      → Meta InitiateCheckout, LinkedIn "checkout", GA4 begin_checkout
 *    Checkout form submitted  → Meta AddPaymentInfo, HubSpot "checkout" form, GA4 add_payment_info
 *    Payment confirmed        → Meta Purchase, LinkedIn "purchase", HubSpot "purchase" form, GA4 purchase
 *    Free preview sign-up     → Meta Lead, LinkedIn "lead", HubSpot "preview" form, GA4 generate_lead
 *                               (name + email + phone saved to Google Sheets by /api/preview-lead)
 *    Free preview played      → Meta PreviewStarted (custom), GA4 preview_start
 *    Free preview finished    → Meta PreviewCompleted (custom), GA4 preview_complete
 *    Details after payment    → HubSpot "profile" form
 *
 *  Every id comes from an env variable (.env.example). Anything left
 *  blank is skipped silently, so the site works before setup is done.
 * ------------------------------------------------------------------ */

import { courses } from "@/data/courses";
import { getAttribution, getFirstTouch, UTM_KEYS } from "./attribution";
import { getCachedEvent, findTicket } from "./eventDetails";

export const TRACKING = {
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "1350131159900260",
  linkedinPartnerId: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || "10536265",
  linkedinConversions: {
    checkout: process.env.NEXT_PUBLIC_LINKEDIN_CONVERSION_CHECKOUT || "",
    purchase: process.env.NEXT_PUBLIC_LINKEDIN_CONVERSION_PURCHASE || "",
    lead: process.env.NEXT_PUBLIC_LINKEDIN_CONVERSION_LEAD || "",
  },
  hubspotPortalId: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || "",
  // "na1" for most accounts; "eu1" if the HubSpot account is hosted in the EU.
  hubspotRegion: process.env.NEXT_PUBLIC_HUBSPOT_REGION || "na1",
  hubspotForms: {
    checkout: process.env.NEXT_PUBLIC_HUBSPOT_FORM_CHECKOUT || "",
    purchase: process.env.NEXT_PUBLIC_HUBSPOT_FORM_PURCHASE || "",
    preview: process.env.NEXT_PUBLIC_HUBSPOT_FORM_PREVIEW || "",
    profile: process.env.NEXT_PUBLIC_HUBSPOT_FORM_PROFILE || "",
  },
};

const isBrowser = () => typeof window !== "undefined";

/* The Meta pixel only runs on the live site. On localhost, vercel.app
 * previews and staging it never loads, so test visits and test checkouts
 * stay out of the live pixel (Meta also blocks other domains on its side). */
export const PIXEL_HOSTS = ["theprofessionals.network", "www.theprofessionals.network"];

export const isPixelHost = (hostname) =>
  PIXEL_HOSTS.includes(String(hostname ?? (isBrowser() ? window.location.hostname : "")).toLowerCase());

/* Run fn once a tag's global exists (scripts load after hydration). */
function whenReady(globalName, fn, tries = 40) {
  if (!isBrowser()) return;
  if (typeof window[globalName] === "function") return fn(window[globalName]);
  if (tries > 0) setTimeout(() => whenReady(globalName, fn, tries - 1), 250);
}

const meta = (...args) => whenReady("fbq", (fbq) => fbq(...args));
const gtagEvent = (name, params) => whenReady("gtag", (gtag) => gtag("event", name, params));
const linkedin = (key) => {
  const id = TRACKING.linkedinConversions[key];
  if (id) whenReady("lintrk", (lintrk) => lintrk("track", { conversion_id: Number(id) }));
};

/* ----------------------------- Plans ------------------------------ */

const toNumber = (price) => Number(String(price || "").replace(/[^\d.]/g, "")) || 0;

/* Course + tier for a checkout, with the price as a number.
 * Uses the live amount from getEventDetails when it has loaded. */
export function planFor(eventCode, ticketCode) {
  const course = courses.find((c) => c.eventCode === eventCode) || courses[0];
  const tier = course?.tiers.find((t) => t.ticketCode === ticketCode);
  const live = getCachedEvent();
  const ticket = findTicket(live, ticketCode);
  return {
    eventCode: live?.eventCode || eventCode || course?.eventCode,
    ticketCode: ticketCode || "",
    name: course ? `${course.shortTitle}${tier ? ` (${tier.label})` : ""}` : ticketCode,
    value: ticket ? Number(ticket.totalAmount) || 0 : toNumber(tier?.price),
  };
}

const contentFor = (plan) => ({
  content_ids: [`${plan.eventCode}:${plan.ticketCode}`],
  content_name: plan.name,
  content_type: "product",
  currency: "INR",
  value: plan.value,
});

const gaItems = (plan) => [{ item_id: `${plan.eventCode}:${plan.ticketCode}`, item_name: plan.name, price: plan.value, quantity: 1 }];

/* ------------------------- Advanced matching ------------------------ *
 *  Hashed email / phone / name, read by components/MetaPixel.jsx when
 *  the pixel starts, so the Purchase on the payment-return page (a
 *  fresh page load) can be matched to the person who saw the ad.
 *  Only SHA-256 hashes are stored, never the raw values.
 * ------------------------------------------------------------------ */

async function sha256(value) {
  const data = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

const normalizePhone = (phone) => {
  const digits = String(phone || "").replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) return `91${digits.slice(1)}`;
  return digits;
};

export async function rememberUser({ email, phone, firstname, lastname }) {
  if (!isBrowser() || !crypto?.subtle) return;
  try {
    const fields = {
      em: email?.trim().toLowerCase(),
      ph: normalizePhone(phone),
      fn: firstname?.trim().toLowerCase(),
      ln: lastname?.trim().toLowerCase(),
    };
    const hashed = { country: await sha256("in") };
    for (const [key, value] of Object.entries(fields)) if (value) hashed[key] = await sha256(value);
    localStorage.setItem("tpn_um", JSON.stringify(hashed));
  } catch {
    /* hashing or storage unavailable — events still fire, just less well matched */
  }
}

/* ----------------------------- HubSpot ----------------------------- *
 *  Uses HubSpot's Forms API (no key needed). Each form must contain
 *  every field we send — see TRACKING.md for the exact field list.
 * ------------------------------------------------------------------ */

const hubspotCookie = () => {
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return match ? match[1] : undefined;
};

const utmFields = () => {
  const a = getAttribution();
  return UTM_KEYS.map((key) => ({ name: key, value: a[key] || "" }));
};

export async function submitToHubSpot(formKey, fields, { timeoutMs = 2500 } = {}) {
  const { hubspotPortalId: portal, hubspotRegion, hubspotForms } = TRACKING;
  const formGuid = hubspotForms[formKey];
  if (!isBrowser() || !portal || !formGuid) return { skipped: true };

  const host = hubspotRegion === "eu1" ? "api-eu1.hsforms.com" : "api.hsforms.com";
  const body = {
    submittedAt: Date.now(),
    fields: fields.filter((f) => f.value !== undefined && f.value !== null && String(f.value) !== ""),
    context: { hutk: hubspotCookie(), pageUri: window.location.href, pageName: document.title },
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`https://${host}/submissions/v3/integration/submit/${portal}/${formGuid}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true, // lets the request finish even when the page is replaced by the payment gateway
      signal: controller.signal,
    });
    if (!res.ok) console.warn(`HubSpot "${formKey}" form rejected the submission:`, await res.text());
    return { ok: res.ok };
  } catch (err) {
    console.warn(`HubSpot "${formKey}" submission failed:`, err);
    return { ok: false };
  } finally {
    clearTimeout(timer);
  }
}

/* ------------------------------ Events ----------------------------- */

/* Course page viewed. */
export function trackViewContent({ eventCode, ticketCode }) {
  meta("track", "ViewContent", contentFor(planFor(eventCode, ticketCode)));
}

export function trackCheckoutOpened({ eventCode, ticketCode }) {
  const plan = planFor(eventCode, ticketCode);
  meta("track", "InitiateCheckout", { ...contentFor(plan), num_items: 1 });
  linkedin("checkout");
  gtagEvent("begin_checkout", { currency: "INR", value: plan.value, items: gaItems(plan) });
}

/* Checkout form submitted, just before the visitor goes to the payment gateway. */
export async function trackCheckoutSubmitted(form) {
  const plan = planFor(form.eventCode, form.ticketCode);
  meta("track", "AddPaymentInfo", contentFor(plan));
  gtagEvent("add_payment_info", { currency: "INR", value: plan.value, items: gaItems(plan) });

  const first = getFirstTouch();
  await Promise.all([
    rememberUser(form),
    submitToHubSpot("checkout", [
      { name: "firstname", value: form.firstname },
      { name: "lastname", value: form.lastname },
      { name: "email", value: form.email },
      { name: "phone", value: form.contact },
      { name: "company", value: form.companyName },
      { name: "tpn_course", value: plan.eventCode },
      { name: "tpn_plan", value: plan.ticketCode },
      { name: "tpn_stage", value: "Checkout started" },
      { name: "tpn_first_utm_source", value: first.utm_source },
      { name: "tpn_first_utm_campaign", value: first.utm_campaign },
      ...utmFields(),
    ]),
  ]);
}

/* Payment confirmed. Fires once per transaction id, however often the page is reloaded. */
export function trackPurchase({ txnid, amount, currency = "INR", email, eventCode, ticketCode }) {
  if (!isBrowser() || !txnid) return;
  const KEY = "tpn_tracked_txns";
  let done = [];
  try {
    done = JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {}
  if (done.includes(txnid)) return;

  const plan = planFor(eventCode, ticketCode);
  const value = Number(amount) || plan.value;

  // eventID lets Meta de-duplicate this against a server-side (Conversions API) Purchase later.
  meta("track", "Purchase", { ...contentFor(plan), value, currency, num_items: 1 }, { eventID: `purchase_${txnid}` });
  // Same Purchase server-side (Meta Conversions API, app/api/meta/purchase/route.js).
  // The server re-checks the payment and uses the same event id, so Meta counts it once.
  if (isPixelHost()) {
    fetch("/api/meta/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ txnid }),
      keepalive: true,
    }).catch(() => {});
  }
  linkedin("purchase");
  gtagEvent("purchase", { transaction_id: txnid, currency, value, items: gaItems(plan) });
  submitToHubSpot("purchase", [
    { name: "email", value: email },
    { name: "tpn_course", value: plan.eventCode },
    { name: "tpn_plan", value: plan.ticketCode },
    { name: "tpn_stage", value: "Paid" },
    { name: "tpn_txnid", value: txnid },
    { name: "tpn_amount", value: value },
  ]);

  try {
    localStorage.setItem(KEY, JSON.stringify([...done, txnid].slice(-20)));
  } catch {}
}

/* Free preview sign-up (name + email + phone). The lead is saved to Google
 * Sheets by /api/preview-lead; this fires the ad events, sends the HubSpot
 * "preview" form (same fields as before, so the form needs no change) and
 * remembers hashed email + phone + name for better Meta matching. */
export async function trackPreviewSignup({ name, email, phone, eventCode }) {
  const [firstname, ...rest] = String(name || "").trim().split(/\s+/);
  const lastname = rest.join(" ");
  meta("track", "Lead", { content_name: "Course preview: chapter 1", currency: "INR", value: 0 });
  linkedin("lead");
  gtagEvent("generate_lead", { lead_source: "course_preview" });

  await Promise.all([
    rememberUser({ email, phone, firstname, lastname }),
    submitToHubSpot("preview", [
      { name: "firstname", value: firstname },
      { name: "lastname", value: lastname },
      { name: "email", value: email },
      { name: "tpn_course", value: eventCode },
      { name: "tpn_stage", value: "Preview sign-up" },
      ...utmFields(),
    ]),
  ]);
}

/* Pressed play on the free preview (once per visit to the page). */
export function trackPreviewStarted() {
  meta("trackCustom", "PreviewStarted", { content_name: "Course preview: chapter 1" });
  gtagEvent("preview_start", {});
}

/* Watched the preview to the end — a custom event for retargeting audiences. */
export function trackPreviewCompleted() {
  meta("trackCustom", "PreviewCompleted", { content_name: "Course preview: chapter 1" });
  gtagEvent("preview_complete", {});
}

/* Details collected after payment (address etc.). */
export function submitProfile({ email, txnid, ...p }) {
  return submitToHubSpot("profile", [
    { name: "email", value: email },
    { name: "address", value: p.address },
    { name: "city", value: p.city },
    { name: "state", value: p.state },
    { name: "zip", value: p.pincode },
    { name: "company", value: p.companyName },
    { name: "jobtitle", value: p.userTitle },
    { name: "tpn_experience", value: p.exp },
    { name: "tpn_linkedin", value: p.linkedIn },
    { name: "tpn_txnid", value: txnid },
  ]);
}

/* HubSpot page views for client-side navigation (the first one is automatic). */
export function trackHubSpotPageView(path) {
  if (!isBrowser() || !TRACKING.hubspotPortalId) return;
  const hsq = (window._hsq = window._hsq || []);
  hsq.push(["setPath", path]);
  hsq.push(["trackPageView"]);
}

/* ----------------------- Pending checkout -------------------------- *
 *  Saved just before the visitor leaves for the payment gateway, read
 *  back on the payment-return page (plan, value, whether we still need
 *  their address). Expires after 1 day.
 * ------------------------------------------------------------------ */

const PENDING_KEY = "tpn_pending_checkout";

export function savePendingCheckout(data) {
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify({ ...data, ts: Date.now() }));
  } catch {}
}

export function readPendingCheckout() {
  if (!isBrowser()) return null;
  try {
    const p = JSON.parse(localStorage.getItem(PENDING_KEY) || "null");
    return p && Date.now() - p.ts < 24 * 60 * 60 * 1000 ? p : null;
  } catch {
    return null;
  }
}

export function clearPendingCheckout() {
  try {
    localStorage.removeItem(PENDING_KEY);
  } catch {}
}
