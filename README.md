# The Professionals Network — online courses

Next.js 16 (App Router) + Tailwind v4. Light theme, Geist (self-hosted via Fontsource).

```bash
npm install
npm run dev
```

## Where to change things

| What | File |
| --- | --- |
| Every image / video URL (empty = gray placeholder) | `data/media.js` |
| Gallery + hero photos, categories, alt text | `data/gallery.js` |
| Live domain for SEO (canonical, sitemap, OG) | env `NEXT_PUBLIC_SITE_URL` |
| Course content, prices, ticket codes, FAQs | `data/courses.js` |
| Speakers section (people, bios, photos, "joining soon") | `data/speakers.js` |
| Contact details, socials, nav, footer policy links | `data/site.js` |
| Switch 3D / tilt / smooth scroll on or off | `FEATURES` in `data/site.js` |
| Colours, fonts, buttons | `app/globals.css` (tokens at the top) |

### Adding media
Paste a full URL into `data/media.js`. Images and videos (`.mp4`, `.webm`, `.mov`) are detected automatically.
Set `logo` to `"/assets/thepn-logo.svg"` (or any URL) to replace the text wordmark.

### Adding a speaker
Copy one object in `speakers` in `data/speakers.js`, change the text and photo URL. Lower `upcoming.count`
(or set it to 0 to hide the "joining soon" line). The section title and intro are in `SPEAKERS_SECTION`.
For their course, copy the `quantitativeIntuition` object in `data/courses.js` and add it to `courses`.

## Effects (all optional, switches in `FEATURES`, `data/site.js`)

- **Hero photo columns** (`heroPhotos`) — `components/home/PhotoColumns.jsx`. Two columns drift in opposite
  directions (one sideways row on mobile) with soft eased fades top and bottom; hovering eases the speed down.
  Photos are the items marked `hero: true` in `data/gallery.js`.
- **Gallery** — home: `components/gallery/HorizontalGallery.jsx` (pinned horizontal scroll with chapters,
  parallax and a progress bar; swipe row on mobile). `/gallery`: `EditorialGallery.jsx` (magazine layout).
  Both open photos in `Lightbox.jsx`.
- **"View" cursor** (`viewCursor`) — `components/fx/ViewCursor.jsx`. Add `data-cursor="View"` to anything.
- **Scroll reveal** (`reveal`) — `components/fx/Reveal.jsx`. Add `data-reveal` to any element.
- **Certificate tilt** (`tilt`) — `components/fx/Tilt.jsx`.
- **Smooth scroll** (`smoothScroll`) — `components/fx/SmoothScroll.jsx` (Lenis).

Images from Cloudinary are resized and served as AVIF/WebP automatically (`lib/image.js`).

## SEO

- Every page uses `pageMetadata()` from `lib/seo.js`: title, description, canonical URL, Open Graph, Twitter card.
- Structured data (JSON-LD): Organization + WebSite on every page, Course + FAQPage on home and `/view-details`,
  FAQPage on `/faqs`, ImageGallery on `/gallery`, BreadcrumbList on inner pages.
- `app/sitemap.js`, `app/robots.js`, `app/manifest.js`. Payment pages are `noindex`.
- **Set `NEXT_PUBLIC_SITE_URL`** to the live domain in Vercel, or canonical URLs will point at the vercel.app address.

## Checkout

`components/ApplyPopup.jsx` — restyled, logic unchanged. It still posts to
`NEXT_PUBLIC_PAYMENT_BASE_URL/tpnEvent/registerAndInitiatePayment/html` with the same payload, and reads
`?apply=true`, `?ref=` and `?ticketCode=` from the URL. Any button can open it:

```js
window.dispatchEvent(new CustomEvent("openApplyPopup", { detail: { eventCode, ticketCode } }));
```

Payment return routes (`/payment/*`, `/event/*`, `/tpnEvent/payment/return/*`) are unchanged.

## Deep links (QR codes / mailers) still work
- Pricing: `/#preview-price` or `/?section=pricing`
- Videos: `/#event-videos` or `/?section=videos`
- OG variant: `/?details=open`

## Removed
Membership section, Governing Charter, membership FAQs, career page, sessions page, Niro Sivanathan page,
old event popups/calendars. Old URLs redirect (see `next.config.mjs`).
