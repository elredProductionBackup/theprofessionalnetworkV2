# Checkout, free preview and conversion tracking

What changed, what to switch on, and what the backend developer needs to confirm.

## 1. Shorter checkout

Single-user checkout (`SU-*` tickets) now asks only for **first name, last name, email and phone**.
Enterprise keeps the full form (GST invoice needs company, GSTIN and address).

The rest (address, city, state, pincode, company, title, experience, LinkedIn) is asked on the
payment-success page in a "One last step" card (`components/CompleteProfile.jsx`). City and state
are required there; the buyer can skip.

- Switch: `FEATURES.shortCheckout` in `data/site.js`. Set to `false` to bring back the old form instantly.
- The payload to `registerAndInitiatePayment/html` keeps every key; skipped fields are sent as `""`.

## 2. Free preview — `/preview`

Chapter 1 behind a two-field sign-up (name, email). After sign-up the chapter plays inline; when it
ends, the frame turns into the question chapter 2 answers, with **Enroll** and **Watch again**.

- Video: paste the chapter 1 `.mp4` URL into `previewChapter1` in `data/media.js`.
- Copy (end-of-chapter question, duration): `preview` in `data/courses.js`.
- Linked from: the menu ("Free preview"), every pricing card, and the closing call-to-action on home.
- Sign-ups go to the HubSpot **preview** form → build the email series as a HubSpot workflow (below).
- Returning visitors skip the form (remembered in the browser). The gate is a marketing gate, not DRM:
  anyone determined can find the video URL. Don't use it for paid content.

## 3. Campaign tags (UTMs)

**Bug fixed:** the old form read the `utm_*` tags and then threw them away, sending a hard-coded
`{ utm_source: "", utm_campaign: "aug2026" }` for every sale.

Now `components/RouteTracking.jsx` saves `utm_source / utm_medium / utm_campaign / utm_content / utm_term`
(plus `fbclid`, `li_fat_id`, `gclid`) the moment a visitor lands, keeps them for 90 days in the
browser, and checkout sends them in the existing `utm` object. Last tagged visit wins. With no tags,
`utm_campaign` falls back to `"aug2026"` as before (`DEFAULT_CAMPAIGN` in `ApplyPopup.jsx`).

Tag every ad link like this:

```
https://theprofessionals.network/?utm_source=meta&utm_medium=paid_social&utm_campaign=qi_nov26&utm_content={{ad.name}}
https://theprofessionals.network/preview?utm_source=linkedin&utm_medium=paid_social&utm_campaign=qi_nov26&utm_content=ceo_video
```

## 4. Events

| Moment | Meta | LinkedIn | GA4 | HubSpot form |
| --- | --- | --- | --- | --- |
| Course page viewed | `ViewContent` | — | — | — |
| Checkout form opens | `InitiateCheckout` (value, INR) | checkout conversion | `begin_checkout` | — |
| Checkout submitted | `AddPaymentInfo` | — | `add_payment_info` | **checkout** |
| Payment confirmed | `Purchase` (amount paid, `eventID: purchase_<txnid>`) | purchase conversion | `purchase` | **purchase** |
| Preview sign-up | `Lead` | lead conversion | `generate_lead` | **preview** |
| Preview watched to the end | `PreviewCompleted` (custom) | — | `preview_complete` | — |
| Details after payment | — | — | — | **profile** |

- Purchase fires once per transaction id, even if the success page is reloaded.
- The Meta pixel loads only on `theprofessionals.network` (and `www.`), never on localhost or
  vercel.app previews (`PIXEL_HOSTS` in `lib/tracking.js`). Test Meta events on the live site.
- Purchase is also sent server-side through the Meta Conversions API
  (`app/api/meta/purchase/route.js`) after re-checking the txnid with `/tpnEvent/payment/getStatus`.
  Both use `event_id = purchase_<txnid>`, so Meta counts each sale once. Needs `META_CAPI_TOKEN`
  in Vercel (Production only); does nothing without it.
- Meta advanced matching: email, phone and name are SHA-256 hashed in the browser at checkout and
  passed to the pixel on the next page load, so the Purchase on the return page matches the ad click.
- Code: `lib/tracking.js` (all events), `lib/attribution.js` (UTMs).

## 5. Setup checklist

### Vercel
Add the variables from `.env.example`, then redeploy.

### LinkedIn Campaign Manager
Analyze → Conversion tracking → Create conversion, three times. Method: **Insight Tag → event-specific
action**. Names: "Checkout started", "Purchase" (value: ₹5,000), "Preview sign-up". Copy each
conversion id into the matching `NEXT_PUBLIC_LINKEDIN_CONVERSION_*` variable.

### Meta Events Manager
Nothing to install. After deploy, check Test Events, then optimise sales campaigns for **Purchase**
and preview campaigns for **Lead**. Build a custom audience from `PreviewCompleted` for retargeting.

### HubSpot
1. **Contact properties** (Settings → Properties → Contact → Create). Single-line text unless noted:
   `tpn_course`, `tpn_plan`, `tpn_stage`, `tpn_txnid`, `tpn_amount` (number), `tpn_experience`,
   `tpn_linkedin`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`,
   `tpn_first_utm_source`, `tpn_first_utm_campaign`.
2. **Four forms** (Marketing → Forms). They're never shown, only submitted by the site, but HubSpot
   rejects a submission with a field that isn't on the form, so each must contain exactly these
   (hidden fields are fine):

   | Form | Fields |
   | --- | --- |
   | TPN checkout | firstname, lastname, email, phone, company, tpn_course, tpn_plan, tpn_stage, tpn_first_utm_source, tpn_first_utm_campaign, utm_source, utm_medium, utm_campaign, utm_content, utm_term |
   | TPN purchase | email, tpn_course, tpn_plan, tpn_stage, tpn_txnid, tpn_amount |
   | TPN preview | firstname, lastname, email, tpn_course, tpn_stage, utm_source, utm_medium, utm_campaign, utm_content, utm_term |
   | TPN profile | email, address, city, state, zip, company, jobtitle, tpn_experience, tpn_linkedin, tpn_txnid |

   Copy each form's GUID into `NEXT_PUBLIC_HUBSPOT_FORM_*`.
3. **Workflows**
   - *Preview nurture*: enrol on "TPN preview" submission; 3–4 emails over ~10 days linking to
     `/view-details#preview-price`; un-enrol when "TPN purchase" is submitted.
   - *Abandoned checkout*: enrol on "TPN checkout" submission; wait 1 hour; if no "TPN purchase",
     send a reminder; un-enrol on purchase.
   - *Customer*: on "TPN purchase", set lifecycle stage = Customer (and create a deal if you track revenue there).

## 6. For the backend developer — please confirm

1. `registerAndInitiatePayment/html` accepts `SU-VIRTUAL` registrations with empty `address`, `city`,
   `state`, `pincode`. If it rejects them, either relax that validation or set `shortCheckout: false`.
2. All five `utm_*` keys inside `utm` are stored (previously only `utm_source` and `utm_campaign` were sent).
3. Optional: an endpoint to save the post-payment details against the registration; put its URL in
   `NEXT_PUBLIC_PROFILE_UPDATE_URL` (POST JSON: `txnid, email, address, city, state, pincode,
   companyName, userTitle, exp, linkedIn`). Until then they're stored in HubSpot only.
4. Invoices: state now arrives after payment (or not at all if skipped). Check with the accountant
   how place of supply should be set for B2C invoices without a state.
5. Recommended next step: the success page already triggers a server-side Meta Purchase
   (`/api/meta/purchase`), but buyers who close the tab before that page are still missed. Send the
   Purchase server-side from the payment webhook too (Meta Conversions
   API and LinkedIn Conversions API) with `event_id = purchase_<txnid>`. Browser events miss buyers
   with ad blockers or who close the tab before the success page; the shared id stops double counting.

## 7. How to test

1. Open `/?utm_source=test&utm_campaign=qa` in Chrome with the **Meta Pixel Helper** and
   **LinkedIn Insight Tag** extensions, click to another page, then Enroll → Single user.
   You should see `InitiateCheckout`; the form has four fields.
2. Submit: the payment request (DevTools → Network) carries `utm.utm_campaign = "qa"`; HubSpot shows
   a new "TPN checkout" submission with the UTMs.
3. Complete a test payment: `Purchase` fires on the success page, "One last step" appears, HubSpot
   gets "TPN purchase" then "TPN profile".
4. `/preview`: sign up → `Lead` + "TPN preview" submission; the chapter plays.
