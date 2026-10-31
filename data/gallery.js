/* ------------------------------------------------------------------ *
 *  Gallery — photos used in the home hero and on /gallery.
 *
 *  category: one of the ids in GALLERY_CATEGORIES.
 *  alt:      describe what's in the photo — this is what Google reads.
 *  hero:     true = also used in the moving photo columns on the home hero.
 *
 *  Add a category by adding to GALLERY_CATEGORIES; it shows up as a
 *  tab on the home page and a section on /gallery automatically.
 * ------------------------------------------------------------------ */

export const GALLERY_CATEGORIES = [
  {
    id: "oded-netzer",
    label: "Oded Netzer",
    description: "Prof. Oded Netzer of Columbia Business School* on Quantitative Intuition and leadership in the AI era.",
  },
  {
    id: "leadership",
    label: "Leadership",
    description: "Senior leaders sharpening how they decide with data, AI, and judgment.",
  },
  {
    id: "network",
    label: "The network",
    description: "The professionals who learn with us.",
  },
];

const CLD = "https://res.cloudinary.com/dtrv7p3gg/image/upload";

export const GALLERY = [
  { src: `${CLD}/v1786339135/r6mmfoaymtujzutvflyq_zzcho1.webp`, category: "oded-netzer", alt: "Prof. Oded Netzer with The Professionals Network", hero: true },
  { src: `${CLD}/v1786339136/xfh8lhbfrsxcd9p6ruux_m3njog.webp`, category: "oded-netzer", alt: "Prof. Oded Netzer teaching Quantitative Intuition", hero: true },
  { src: `${CLD}/v1786339137/cx7nrz2sdteojh3oaeai_pr3sxe.webp`, category: "oded-netzer", alt: "Session on leadership intelligence in an AI era", hero: true },
  { src: `${CLD}/v1786339137/ktkyiat9bclwpb6jrbgp_ujtgme.webp`, category: "oded-netzer", alt: "Prof. Oded Netzer in conversation with business leaders", hero: true },
  { src: `${CLD}/v1786339151/dssexrfdfdtwrbvl9wvb_geqxsr.webp`, category: "leadership", alt: "Business leaders in a leadership session", hero: true },
  { src: `${CLD}/v1786339151/akdrkrzxpz2nkkhjhroh_bi7nbg.webp`, category: "leadership", alt: "Executives discussing data-driven decision making", hero: true },
  { src: `${CLD}/v1786339151/ale5b4auhphyva2b4zun_n6eabg.webp`, category: "leadership", alt: "Leadership learning with The Professionals Network", hero: true },
  { src: `${CLD}/v1786339152/e7nydhgrizlplhdo63zx_cqfok6.webp`, category: "leadership", alt: "Senior professionals at a leadership masterclass", hero: true },
  { src: `${CLD}/v1786339153/ekz2vxs1fbo69ksaoshr_lijkz9.webp`, category: "network", alt: "Members of The Professionals Network", hero: true },
  { src: `${CLD}/v1786339167/fluu438xcx5okotpglj2_kgcvlh.webp`, category: "network", alt: "Professionals networking after a session", hero: true },
  { src: `${CLD}/v1786339169/ktdgfso58h3g77ppbjbn_v9rlik.webp`, category: "network", alt: "The Professionals Network community in Mumbai", hero: true },
  { src: `${CLD}/v1786339169/pb7lo5tjewvgfvkmcgwa_corvjd.webp`, category: "network", alt: "Professionals learning from world-class faculty", hero: true },
];

export default GALLERY;
