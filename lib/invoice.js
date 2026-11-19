"use client";

import axios from "axios";

const PAYMENT_BASE_URL = process.env.NEXT_PUBLIC_PAYMENT_BASE_URL;

/* ------------------------------------------------------------------ *
 *  Invoice API
 *    POST /tpnEvent/invoice/request   → generate the invoice with billing details
 *    GET  /tpnEvent/invoice/download  → the PDF (?registrationCode=&token=)
 *
 *  registrationCode and the invoice token come from getStatus
 *  (result.registrationCode, result.invoice.token).
 * ------------------------------------------------------------------ */

// The request body shared by the backend has no company / GSTIN keys.
// For Enterprise we still send them as `companyName` and `gstin`; if the
// backend rejects unknown keys, set this to false.
export const SEND_COMPANY_FIELDS = true;

const apiMessage = (err, fallback) =>
  err?.response?.data?.message || err?.message || fallback;

export async function requestInvoice({ registrationCode, token, address, city, state, pincode, country = "India", placeId, companyName, gstin }) {
  const body = {
    registrationCode,
    token,
    address,
    city,
    state,
    pincode,
    country,
    placeId: placeId || "",
    ...(SEND_COMPANY_FIELDS && (companyName || gstin) ? { companyName: companyName || "", gstin: gstin || "" } : {}),
  };
  try {
    const res = await axios.post(`${PAYMENT_BASE_URL}/tpnEvent/invoice/request`, body);
    if (!res.data?.success) throw new Error(res.data?.message || "We couldn't generate your invoice.");
    return res.data?.result?.[0] || null;
  } catch (err) {
    throw new Error(apiMessage(err, "We couldn't generate your invoice. Please try again."));
  }
}

const filenameFrom = (disposition, fallback) => {
  const match = /filename\*?=(?:UTF-8'')?"?([^";]+)"?/i.exec(disposition || "");
  return match ? decodeURIComponent(match[1]) : fallback;
};

/* Fetches the invoice PDF as a Blob (no page navigation). */
export async function fetchInvoicePdf({ registrationCode, token, invoiceNumber }) {
  const url = `${PAYMENT_BASE_URL}/tpnEvent/invoice/download?registrationCode=${encodeURIComponent(registrationCode)}&token=${encodeURIComponent(token)}`;
  const fallbackName = `TPN-Invoice-${String(invoiceNumber || registrationCode).replace(/[^\w-]+/g, "-")}.pdf`;

  const res = await fetch(url, { cache: "no-store" });
  const type = res.headers.get("content-type") || "";

  // Errors (and a possible "here's the file URL" reply) come back as JSON.
  if (type.includes("application/json")) {
    const data = await res.json().catch(() => null);
    const fileUrl = data?.result?.[0]?.url || data?.result?.[0]?.downloadUrl || data?.result?.[0]?.invoiceUrl;
    if (res.ok && data?.success && fileUrl) {
      const fileRes = await fetch(fileUrl);
      if (!fileRes.ok) throw new Error("We couldn't download your invoice. Please try again.");
      return { blob: await fileRes.blob(), filename: fallbackName };
    }
    throw new Error(data?.message || "Your invoice isn't ready yet. Please try again in a minute.");
  }
  if (!res.ok) throw new Error("Your invoice isn't ready yet. Please try again in a minute.");

  const blob = await res.blob();
  const pdf = blob.type === "application/pdf" ? blob : new Blob([blob], { type: "application/pdf" });
  return { blob: pdf, filename: filenameFrom(res.headers.get("content-disposition"), fallbackName) };
}

/* Saves a Blob as a file, staying on the page. */
export function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
