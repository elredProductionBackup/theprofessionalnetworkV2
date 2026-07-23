// Shared helpers for building/reading shareable deep links to a specific event modal.

export function slugify(str = "") {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function getEventSlugFromUrl() {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("event");
}

export function buildEventShareUrl(slug) {
  if (typeof window === "undefined" || !slug) return "";
  const url = new URL(window.location.href);
  url.search = "";
  url.searchParams.set("event", slug);
  return url.toString();
}
