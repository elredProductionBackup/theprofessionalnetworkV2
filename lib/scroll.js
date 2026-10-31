/* Smooth-scroll helpers that cooperate with Lenis when it's switched on. */

const HEADER_OFFSET = -88;

export function scrollToElement(el) {
  if (!el) return;
  const lenis = typeof window !== "undefined" ? window.__lenis : null;
  if (lenis) lenis.scrollTo(el, { offset: HEADER_OFFSET, duration: 1.2 });
  else {
    const top = el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export function scrollToId(id) {
  if (typeof document === "undefined") return false;
  const el = document.getElementById(id);
  if (!el) return false;
  scrollToElement(el);
  return true;
}
