"use client";

import { useState } from "react";
import FormField from "./ui/FormField";
import { INDIAN_STATES } from "@/data/indianStates";
import { submitProfile } from "@/lib/tracking";

// Optional: an endpoint on the TPN backend that saves these details against
// the registration (POST JSON: { txnid, email, address, city, state, pincode,
// companyName, userTitle, exp, linkedIn }). Until the backend adds one, the
// details go to HubSpot only.
const PROFILE_URL = process.env.NEXT_PUBLIC_PROFILE_UPDATE_URL;

/* Shown on the payment-success page to buyers who used the short checkout:
 * the details we no longer ask for before payment. City and state are
 * required (state decides the GST on the invoice); everything else is optional. */
export default function CompleteProfile({ email, txnid, onDone }) {
  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    companyName: "",
    userTitle: "",
    exp: "",
    linkedIn: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const requests = [submitProfile({ email, txnid, ...form })];
      if (PROFILE_URL) {
        requests.push(
          fetch(PROFILE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ txnid, email, ...form }),
          }).then((res) => {
            if (!res.ok) throw new Error(`Profile save failed (${res.status})`);
          })
        );
      }
      await Promise.all(requests);
      onDone?.();
    } catch (err) {
      console.error(err);
      setError("Your details weren’t saved. Check your connection and select Save details again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={save} className="mt-1 text-left">
      <h2 className="heading text-[22px] text-ink">One last step</h2>
      <p className="mt-1.5 text-[14px] leading-relaxed text-ink-2">
        Add your billing details for the invoice. Your access email is already on its way.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <FormField label="Address" autoComplete="street-address" value={form.address} onChange={set("address")} />
        </div>
        <FormField label="City*" autoComplete="address-level2" value={form.city} onChange={set("city")} />
        <FormField label="State*" isSelect options={INDIAN_STATES} value={form.state} onChange={set("state")} />
        <FormField
          label="Pincode"
          autoComplete="postal-code"
          inputMode="numeric"
          maxLength={6}
          pattern="[0-9]{6}"
          title="Enter a valid 6-digit pincode"
          value={form.pincode}
          onChange={(v) => set("pincode")((v || "").replace(/[^0-9]/g, "").slice(0, 6))}
        />
        <FormField label="Company" autoComplete="organization" value={form.companyName} onChange={set("companyName")} />
        <FormField label="Your title" autoComplete="organization-title" value={form.userTitle} onChange={set("userTitle")} />
        <FormField label="Years of experience" isSelect value={form.exp} onChange={set("exp")} />
        <div className="sm:col-span-2">
          <FormField
            label="LinkedIn profile"
            placeholder="linkedin.com/in/yourname"
            pattern="(https?://)?([\w-]+\.)?linkedin\.com/.*"
            title="Enter a valid LinkedIn URL (e.g. linkedin.com/in/yourname)"
            value={form.linkedIn}
            onChange={set("linkedIn")}
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-[14px] text-red">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-2">
        <button type="submit" disabled={saving} className="btn btn-ink w-full disabled:cursor-not-allowed disabled:opacity-60">
          {saving ? "Saving…" : "Save details"}
        </button>
        <button type="button" onClick={() => onDone?.({ skipped: true })} className="btn btn-ghost w-full">
          Skip for now
        </button>
      </div>
    </form>
  );
}
