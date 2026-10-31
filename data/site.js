/* ------------------------------------------------------------------ *
 *  Site-wide settings.
 *
 *  FEATURES — flip any of these to false to switch an effect off.
 *    heroPhotos    → moving photo columns in the home hero
 *    reveal        → sections fade in gently as you scroll
 *    tilt          → light 3D tilt on the certificate preview
 *    viewCursor    → "View" bubble that follows the cursor over photos
 *    smoothScroll  → Lenis inertia scrolling
 * ------------------------------------------------------------------ */

export const FEATURES = {
  heroPhotos: true,
  reveal: true,
  tilt: true,
  viewCursor: true,
  smoothScroll: true,
};

export const SITE = {
  name: "The Professionals Network",
  shortName: "TPN",
  // Set NEXT_PUBLIC_SITE_URL to your live domain (used for SEO: canonical URLs, sitemap, OG tags).
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://theprofessionalnetwork.vercel.app").replace(/\/$/, ""),
  logo: "/assets/thePN-logo.svg",
  ogImage: "https://res.cloudinary.com/dtrv7p3gg/image/upload/v1784877679/tpn-og_tzzoym.webp",
  locale: "en_IN",
  keywords: [
    "online leadership course",
    "leadership training program",
    "executive education online",
    "Oded Netzer",
    "Quantitative Intuition",
    "Columbia Business School professor course",
    "decision making course",
    "AI leadership course",
    "online course India",
    "business school professors online",
  ],
  description:
    "Online courses taught by professors from the world's leading business schools. Watch at your own pace and earn a certificate.",
  email: "info@theprofessionals.network",
  phone: "+91 81081 15508",
  phoneHref: "tel:+918108115508",
  company: "Rextone Digital Pvt. Ltd.",
  companyUrl: "https://rextonedigital.com",
  address: [
    "16, Yashodham Center, Film City Road, Goregaon (E),",
    "Mumbai 400063, Maharashtra, India.",
  ],
  hours: "Monday – Friday, 10:00 AM – 6:00 PM IST",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/the-professionals-network-2000/" },
    { label: "Instagram", href: "https://www.instagram.com/theprofessionals.network/" },
    { label: "X", href: "https://x.com/TheProfNetwork" },
    { label: "YouTube", href: "https://www.youtube.com/@theprofessionalsnetwork-26" },
    { label: "Facebook", href: "https://www.facebook.com/people/The-Professionals-Network/61591918254183/" },
  ],
};

// Shown wherever a university name appears next to a professor.
export const COLLEGE_DISCLAIMER =
  "*Institution names indicate the faculty member's affiliation only. These courses are independently produced and are not affiliated with, endorsed by, or sponsored by the named institutions.";

// Items in the menu (hamburger on every screen size).
export const NAV = [
  { label: "Home", href: "/" },
  { label: "Course", href: "/view-details" },
  { label: "Gallery", href: "/gallery" },
  { label: "Speakers", href: "/#speakers" },
  { label: "About", href: "/about" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact-us" },
];

export const POLICIES = [
  { label: "Terms of Use", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cancellation & Refund", href: "/cancellation-and-refund" },
  { label: "Shipping & Delivery", href: "/shipping-and-exchange" },
  { label: "Contact Us", href: "/contact-us" },
];
