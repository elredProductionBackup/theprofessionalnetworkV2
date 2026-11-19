"use client";

import { useState } from "react";
import { Download, Eye, FileText, Loader2, X } from "lucide-react";
import FormField from "./ui/FormField";
import AddressField from "./ui/AddressField";
import { INDIAN_STATES, GST_STATE_CODES, matchIndianState } from "@/data/indianStates";
import { submitProfile } from "@/lib/tracking";
import { requestInvoice, fetchInvoicePdf, saveBlob } from "@/lib/invoice";
import InvoicePreview from "./InvoicePreview";

/* ------------------------------------------------------------------ *
 *  Invoice on the payment-success page, driven by getStatus:
 *    result.registrationCode, result.invoice { status, invoiceNumber, token, requestBy }
 *
 *  • Invoice issued      → invoice number + Preview + Download.
 *                          If no billing details were added yet (requestBy
 *                          is null), a link to add them and regenerate.
 *  • Not issued, token   → "Need a GST invoice?" → Generate invoice → form.
 *  • No token            → nothing to show.
 *
 *  Form → POST /tpnEvent/invoice/request, then getStatus is re-read and the
 *  PDF is fetched from /tpnEvent/invoice/download: shown in the page as an
 *  image (components/InvoicePreview.jsx) and saved as a file. The visitor
 *  never leaves the page.
 * ------------------------------------------------------------------ */

const PDF_RETRIES = 4; // the PDF can take a moment after a request
const PDF_RETRY_MS = 2500;

const EMPTY_FORM = { companyName: "", gstin: "", address: "", city: "", state: "", pincode: "", placeId: "" };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export default function InvoiceSection({ payment, onRefresh, onSkip }) {
  const registrationCode = payment?.registrationCode;
  const isEnterprise = payment?.ticketDetails?.audienceType === "enterprise";
  const email = payment?.attendee?.email;

  // Invoice as last known: getStatus, updated by our own request.
  const [override, setOverride] = useState(null);
  const invoice = { ...(payment?.invoice || {}), ...(override || {}) };
  const token = invoice.token;
  const issued = String(invoice.status || "").toLowerCase() === "issued" || !!invoice.invoiceNumber;
  const hasBillingDetails = !!invoice.requestBy || !!override?.requested;

  const [view, setView] = useState("summary"); // summary | form
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [pdf, setPdf] = useState(null); // { blob, filename, url }
  const [pdfBusy, setPdfBusy] = useState(""); // "" | "download" | "preview"
  const [pdfError, setPdfError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  if (!registrationCode || (!issued && !token)) return null;

  /* ---------- PDF ---------- */

  const loadPdf = async () => {
    if (pdf) return pdf;
    const { blob, filename } = await fetchInvoicePdf({ registrationCode, token, invoiceNumber: invoice.invoiceNumber });
    const next = { blob, filename };
    setPdf(next);
    return next;
  };

  const download = async () => {
    setPdfBusy("download");
    setPdfError("");
    try {
      const file = await loadPdf();
      saveBlob(file.blob, file.filename);
    } catch (err) {
      setPdfError(err.message);
    } finally {
      setPdfBusy("");
    }
  };

  const preview = async () => {
    if (showPreview) return setShowPreview(false);
    setPdfBusy("preview");
    setPdfError("");
    try {
      await loadPdf();
      setShowPreview(true);
    } catch (err) {
      setPdfError(err.message);
    } finally {
      setPdfBusy("");
    }
  };

  /* ---------- Form ---------- */

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const onGstin = (value) => {
    const gstin = (value || "").replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 15);
    setForm((f) => ({ ...f, gstin, state: f.state || (gstin.length >= 2 && GST_STATE_CODES[gstin.slice(0, 2)]) || "" }));
  };

  const onPlace = ({ state, city, pincode, placeId }) =>
    setForm((f) => ({
      ...f,
      state: matchIndianState(state) || f.state,
      city: city || f.city,
      pincode: pincode || f.pincode,
      placeId: placeId || "",
    }));

  const generate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");
    const details = {
      address: form.address.trim(),
      city: form.city.trim(),
      state: form.state,
      pincode: form.pincode.trim(),
      country: "India",
      placeId: form.placeId,
      ...(isEnterprise ? { companyName: form.companyName.trim(), gstin: form.gstin } : {}),
    };
    try {
      const result = await requestInvoice({ registrationCode, token, ...details });
      submitProfile({ email, txnid: payment?.txnid, ...details }).catch(() => {}); // HubSpot copy

      // Re-read getStatus for the new invoice number / token.
      const fresh = await onRefresh?.();
      const next = { ...(result?.invoice || result || {}), ...(fresh?.invoice || {}) };
      const nextToken = next.token || token;
      setOverride({
        status: next.status || "issued",
        invoiceNumber: next.invoiceNumber || invoice.invoiceNumber,
        token: nextToken,
        requested: true,
      });

      // Drop any copy of the old PDF, then fetch, show and save the new one.
      setPdf(null);
      setView("summary");
      setSubmitting(false);
      setPdfBusy("download");
      try {
        const { blob, filename } = await fetchWithRetry(registrationCode, nextToken, next.invoiceNumber);
        setPdf({ blob, filename });
        saveBlob(blob, filename);
        setShowPreview(true);
      } catch (err) {
        setPdfError(err.message);
      } finally {
        setPdfBusy("");
      }
    } catch (err) {
      setFormError(err.message);
      setSubmitting(false);
    }
  };

  /* ---------- Views ---------- */

  if (view === "form") {
    return (
      <form onSubmit={generate} className="text-left">
        <button type="button" onClick={() => setView("summary")} disabled={submitting} className="mb-3 cursor-pointer text-[14px] text-ink-3 hover:text-ink">
          ← Back
        </button>
        <h2 className="heading text-[22px] text-ink">Invoice details</h2>
        <p className="mt-1.5 text-[14px] leading-relaxed text-ink-2">
          {isEnterprise ? "The invoice will be raised in your company’s name." : "This address will appear on your invoice."}
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {isEnterprise && (
            <>
              <div className="sm:col-span-2">
                <FormField label="Company name*" autoComplete="organization" minLength={2} value={form.companyName} onChange={set("companyName")} />
              </div>
              <div className="sm:col-span-2">
                <FormField
                  label="GSTIN*"
                  placeholder="27AAPFU0939F1ZV"
                  autoComplete="off"
                  spellCheck={false}
                  pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}"
                  title="Enter a valid 15-character GSTIN"
                  value={form.gstin}
                  onChange={onGstin}
                />
              </div>
            </>
          )}
          <div className="sm:col-span-2">
            <AddressField
              label={isEnterprise ? "Company address*" : "Billing address*"}
              minLength={5}
              value={form.address}
              onChange={set("address")}
              onPlace={onPlace}
              hint={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? "Pick a suggestion and we’ll fill in the rest. Add your flat or floor if it’s missing." : undefined}
            />
          </div>
          <FormField label="City*" autoComplete="address-level2" minLength={2} value={form.city} onChange={set("city")} />
          <FormField
            label="Pincode*"
            inputMode="numeric"
            autoComplete="postal-code"
            pattern="[1-9][0-9]{5}"
            title="Enter a 6-digit pincode"
            value={form.pincode}
            onChange={(v) => set("pincode")((v || "").replace(/\D/g, "").slice(0, 6))}
          />
          <div className="sm:col-span-2">
            <FormField label="State*" isSelect options={INDIAN_STATES} value={form.state} onChange={set("state")} />
          </div>
        </div>

        {formError && (
          <p role="alert" className="mt-4 text-[14px] text-red">
            {formError}
          </p>
        )}

        <button type="submit" disabled={submitting} className="btn btn-ink mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60">
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Generating…
            </>
          ) : (
            "Generate invoice"
          )}
        </button>
      </form>
    );
  }

  // Not issued yet: offer to generate one.
  if (!issued) {
    return (
      <div className="text-left">
        <h2 className="heading text-[22px] text-ink">Need a GST invoice?</h2>
        <p className="mt-1.5 text-[14px] leading-relaxed text-ink-2">
          {isEnterprise ? "Generate an invoice in your company’s name with your GSTIN." : "Generate an invoice for your purchase with your billing address."}
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <button type="button" onClick={() => setView("form")} className="btn btn-ink w-full">
            Generate invoice
          </button>
          <button type="button" onClick={() => onSkip?.()} className="btn btn-ghost w-full">
            No thanks
          </button>
        </div>
      </div>
    );
  }

  // Issued: show it.
  return (
    <div className="text-left">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-paper text-ink">
          <FileText className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-[13px] text-ink-3">Your invoice</p>
          <p className="truncate text-[16px] font-semibold text-ink">{invoice.invoiceNumber || "Ready to download"}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" onClick={preview} disabled={!!pdfBusy} className="btn btn-ghost w-full disabled:cursor-not-allowed disabled:opacity-60">
          {pdfBusy === "preview" ? <Loader2 className="h-4 w-4 animate-spin" /> : showPreview ? <X className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showPreview ? "Hide" : "Preview"}
        </button>
        <button type="button" onClick={download} disabled={!!pdfBusy} className="btn btn-ink w-full disabled:cursor-not-allowed disabled:opacity-60">
          {pdfBusy === "download" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          {pdfBusy === "download" ? "Preparing…" : "Download"}
        </button>
      </div>

      {pdfError && (
        <p role="alert" className="mt-3 text-[14px] text-red">
          {pdfError}
        </p>
      )}

      {showPreview && pdf?.blob && (
        <div className="mt-4">
          <InvoicePreview blob={pdf.blob} title={`Invoice ${invoice.invoiceNumber || ""}`.trim()} />
        </div>
      )}

      {!hasBillingDetails && token && (
        <p className="mt-4 text-[14px] text-ink-2">
          Need {isEnterprise ? "your company name, GSTIN and address" : "your billing address"} on it?{" "}
          <button type="button" onClick={() => setView("form")} className="cursor-pointer font-medium text-ink underline underline-offset-2 hover:text-red">
            Add billing details
          </button>
        </p>
      )}
    </div>
  );
}

async function fetchWithRetry(registrationCode, token, invoiceNumber) {
  let lastError;
  for (let attempt = 0; attempt <= PDF_RETRIES; attempt++) {
    try {
      return await fetchInvoicePdf({ registrationCode, token, invoiceNumber });
    } catch (err) {
      lastError = err;
      if (attempt < PDF_RETRIES) await wait(PDF_RETRY_MS);
    }
  }
  throw lastError;
}
