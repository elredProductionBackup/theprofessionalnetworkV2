"use client";

import { useState } from "react";
import FormField from "./ui/FormField";
import AddressField from "./ui/AddressField";
import { INDIAN_STATES, GST_STATE_CODES, matchIndianState } from "@/data/indianStates";
import { submitProfile } from "@/lib/tracking";

// Optional: an endpoint on the TPN backend that saves these details against
// the registration. POST JSON:
//   { txnid, registrationCode, email, ticketCode, address, city, state, pincode, companyName, gstin }
// Until the backend adds one, the details go to HubSpot only.
const PROFILE_URL = process.env.NEXT_PUBLIC_PROFILE_UPDATE_URL;

/* Shown on the payment-success page: "Generate invoice" → invoice details.
 *   Single user → address, state
 *   Enterprise  → company name, GSTIN, address, state
 * City and pincode are filled in quietly from the Google Maps address. */
export default function CompleteProfile({ email, txnid, registrationCode, ticketCode, isEnterprise, onDone }) {
  const [form, setForm] = useState({
    companyName: "",
    gstin: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
  });
  const [open, setOpen] = useState(false); // false = just the "Generate invoice" prompt
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const onGstin = (value) => {
    const gstin = (value || "").replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 15);
    setForm((f) => {
      const fromGst = gstin.length >= 2 ? GST_STATE_CODES[gstin.slice(0, 2)] : "";
      return { ...f, gstin, state: f.state || fromGst || "" };
    });
  };

  const onPlace = ({ state, city, pincode }) =>
    setForm((f) => ({
      ...f,
      state: matchIndianState(state) || f.state,
      city: city || f.city,
      pincode: pincode || f.pincode,
    }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const details = {
      address: form.address.trim(),
      city: form.city,
      state: form.state,
      pincode: form.pincode,
      ...(isEnterprise ? { companyName: form.companyName.trim(), gstin: form.gstin } : {}),
    };
    try {
      const requests = [submitProfile({ email, txnid, ...details })];
      if (PROFILE_URL) {
        requests.push(
          fetch(PROFILE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ txnid, registrationCode, email, ticketCode, ...details }),
          }).then((res) => {
            if (!res.ok) throw new Error(`Profile save failed (${res.status})`);
          })
        );
      }
      await Promise.all(requests);
      onDone?.();
    } catch (err) {
      console.error(err);
      setError("Your details weren’t saved. Check your connection and select Generate invoice again.");
    } finally {
      setSaving(false);
    }
  };

  if (!open) {
    return (
      <div className="mt-1 text-left">
        <h2 className="heading text-[22px] text-ink">Need a GST invoice?</h2>
        <p className="mt-1.5 text-[14px] leading-relaxed text-ink-2">
          {isEnterprise
            ? "Generate an invoice in your company’s name with your GSTIN."
            : "Generate an invoice for your purchase with your billing address."}
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <button type="button" onClick={() => setOpen(true)} className="btn btn-ink w-full">
            Generate invoice
          </button>
          <button type="button" onClick={() => onDone?.({ skipped: true })} className="btn btn-ghost w-full">
            No thanks
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={save} className="mt-1 text-left">
      <button type="button" onClick={() => setOpen(false)} disabled={saving} className="mb-3 cursor-pointer text-[14px] text-ink-3 hover:text-ink">
        ← Back
      </button>
      <h2 className="heading text-[22px] text-ink">Invoice details</h2>
      <p className="mt-1.5 text-[14px] leading-relaxed text-ink-2">
        {isEnterprise
          ? "The invoice will be raised in your company’s name."
          : "This address will appear on your invoice."}
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4">
        {isEnterprise && (
          <>
            <FormField label="Company name*" autoComplete="organization" minLength={2} value={form.companyName} onChange={set("companyName")} />
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
          </>
        )}
        <AddressField
          label={isEnterprise ? "Company address*" : "Billing address*"}
          minLength={8}
          value={form.address}
          onChange={set("address")}
          onPlace={onPlace}
          hint={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? "Pick a suggestion, then add your flat or floor if it’s missing." : undefined}
        />
        <FormField label="State*" isSelect options={INDIAN_STATES} value={form.state} onChange={set("state")} />
      </div>

      {error && (
        <p role="alert" className="mt-4 text-[14px] text-red">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-2">
        <button type="submit" disabled={saving} className="btn btn-ink w-full disabled:cursor-not-allowed disabled:opacity-60">
          {saving ? "Generating…" : "Generate invoice"}
        </button>
      </div>
    </form>
  );
}
