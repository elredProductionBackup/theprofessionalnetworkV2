# Checkout, free preview and conversion tracking

What changed, what to switch on, and what the backend developer needs to confirm.

## 1. Shorter checkout

Checkout asks every plan for only **name, email and phone**, then opens Razorpay
(`registerAndInitiatePayment` → `checkoutOptions`).

The invoice lives on the payment-success page (`components/InvoiceSection.jsx`, API in `lib/invoice.js`),
driven by `getStatus` → `registrationCode` and `invoice { status, invoiceNumber, token, requestBy }`:

- Invoice issued → invoice number with **Preview** (each PDF page drawn as a full-width image with pdf.js,
  `components/InvoicePreview.jsx`, same on phones and desktops) and **Download** (saved as a file, no redirect). If no billing details were added yet (`requestBy` is null): "Add billing details".
- Not issued → "Need a GST invoice?" → **Generate invoice** → form → `POST /tpnEvent/invoice/request`
  `{ registrationCode, token, address, city, state, pincode, country, placeId }` (+ `companyName`, `gstin`
  for Enterprise, see `SEND_COMPANY_FIELDS`), then the PDF from `GET /tpnEvent/invoice/download`.
- Single user: address, city, pincode, state. Enterprise adds company name and GSTIN. Google Maps fills
  city, pincode, state and placeId; the state also pre-fills from the GSTIN.
- `lmsAccess.loginUrl` → **Start learning** button; `lmsAccess.manageTeamUrl` → **Manage team access**.

- The payload to `registerAndInitiatePayment` keeps every key; fields not asked are sent as `""`.

## 2. Free preview — `/preview`

Chapter 1 behind a sign-up: **name, email and mobile number**. The form posts to
`/api/preview-lead`, which saves the row to a Google Sheet and only then sends back the video link.
When the chapter ends, the frame turns into the question chapter 2 answers, with **Enroll** and **Watch again**.

- Video: paste the chapter 1 `.mp4` link into `lib/previewVideo.js` (or set `PREVIEW_VIDEO_URL` in Vercel).
  It's server-only, so the link isn't in the page until someone signs up.
- Copy (end-of-chapter question, duration): `preview` in `data/courses.js`.
- Linked from: the menu ("Free preview"), every pricing card, and the closing call-to-action on home.
- Sign-up fires Meta `Lead`, LinkedIn "lead", GA4 `generate_lead` and the HubSpot **preview** form
  (firstname, lastname, email, course, stage, UTMs) → build the email series as a HubSpot workflow.
  Playing it fires `PreviewStarted` (Meta custom, GA4 `preview_start`); finishing it fires `PreviewCompleted`.
- Returning visitors skip the form (remembered in the browser). It's a marketing gate, not DRM:
  once someone has the link they can share it. Don't use it for paid content.

### Google Sheet setup (one time)

1. Create a Google Sheet → **Extensions → Apps Script**. Replace everything with
   `scripts/google-sheets-preview-leads.gs`.
2. In that script, change `SECRET` to a long random string.
3. **Deploy → New deployment → Web app**. Execute as **Me**, access **Anyone**. Authorize, copy the
   URL ending in `/exec`.
4. In Vercel: `GOOGLE_SHEET_WEBHOOK_URL` = that URL, `GOOGLE_SHEET_SECRET` = the same secret. Redeploy.

Rows land in a "Preview leads" tab: time (IST), name, email, phone, UTM source/medium/campaign/content/term,
page, referrer, browser. If the sheet isn't set up or is down, visitors still get the video and the error
shows in Vercel → Logs. After changing the script, use **Manage deployments → Edit → New version** so the
URL stays the same.

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
| Preview sign-up (name, email, phone) | `Lead` | lead conversion | `generate_lead` | **preview** (+ Google Sheet) |
| Preview played | `PreviewStarted` (custom) | — | `preview_start` | — |
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

1. `registerAndInitiatePayment` accepts `SU-*` and `ENT-*` registrations with empty `address`, `city`,
   `state`, `pincode`, `companyName`, `gstin`.
1a. Razorpay (`redirectMode: false`): the success page polls `getStatus?txnid=…` (txnid only).
   `getStatus` must return `success` once the payment is captured (Razorpay webhook
   `payment.captured` / `order.paid` on the backend). Otherwise the page stays on "Confirming payment".
2. All five `utm_*` keys inside `utm` are stored (previously only `utm_source` and `utm_campaign` were sent).
3. `invoice/request` accepts `companyName` and `gstin` for Enterprise (not in the shared body). If it
   rejects unknown keys, set `SEND_COMPANY_FIELDS = false` in `lib/invoice.js`.
3a. `invoice/download` must allow CORS from the site's domain (the PDF is fetched by the page, not opened
   in a new tab) and send `Content-Type: application/pdf`; `Content-Disposition` sets the file name.
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
3. Complete a test payment: `Purchase` fires on the success page, "Need a GST invoice?" appears, HubSpot
   gets "TPN purchase" then "TPN profile".
4. `/preview`: enter name, email + phone → `Lead` + "TPN preview" submission fire, a row appears in the Google Sheet, the chapter plays.
