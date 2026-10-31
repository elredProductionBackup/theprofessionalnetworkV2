import { MEDIA } from "./media";

/* ------------------------------------------------------------------ *
 *  SPEAKERS — the "Speakers" section on the home page.
 *
 *  To add a speaker: copy one object in `speakers`, change the text,
 *  and paste a photo URL into `photo` (leave "" for a gray box).
 *  To remove one: delete its object. Order here = order on the page.
 *
 *  Fields
 *    slug        unique id, lowercase-with-dashes
 *    name        display name, e.g. "Prof. Oded Netzer"
 *    role        line under the name, e.g. "Professor of Business"
 *    org         institution or company (shown with a * disclaimer)
 *    orgLink     link for the org name (optional)
 *    photo       image URL (optional)
 *    linkedin    LinkedIn URL (optional)
 *    bio         2–3 sentences
 *    cta         button under the bio, { label, href } (optional)
 *
 *  `upcoming` controls the "more speakers joining soon" line.
 *  Set count to 0 to hide it.
 * ------------------------------------------------------------------ */

export const SPEAKERS_SECTION = {
  title: "Speaker",
  intro: "Leading academic minds, in their own words.",
};

export const speakers = [
  {
    slug: "oded-netzer",
    name: "Prof. Oded Netzer",
    role: "Professor of Business",
    org: "Columbia Business School",
    orgLink: "https://business.columbia.edu/faculty/people/oded-netzer",
    photo: MEDIA.odedPortrait,
    linkedin: "https://www.linkedin.com/in/oded-netzer-700255",
    bio: "Prof. Oded Netzer's work explores how data, analytics, and quantitative thinking can improve business decision-making. His approach to quantitative intuition brings together analytical evidence, contextual understanding, and managerial judgment.",
    cta: { label: "View the course", href: "/view-details" },
  },
];

// Hidden for now (count: 0). Set e.g. count: 3 to show "3 more speakers joining soon".
export const upcoming = {
  count: 0,
  text: "more speakers joining soon",
  notifyLabel: "Tell me when new courses open",
};

export const getSpeaker = (slug) => speakers.find((s) => s.slug === slug);

export default speakers;
