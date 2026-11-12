/* Meta pixel helpers.
 *
 * The pixel only loads on the live site (see PIXEL_HOSTS). On localhost,
 * vercel.app previews and staging, window.fbq never exists, so every helper
 * here quietly does nothing and test traffic stays out of the live pixel.
 */

export const META_PIXEL_ID = "1350131159900260";

// Hostnames allowed to send data to the live pixel.
export const PIXEL_HOSTS = ["theprofessionals.network", "www.theprofessionals.network"];

export function isPixelHost(hostname) {
  const host = hostname ?? (typeof window !== "undefined" ? window.location.hostname : "");
  return PIXEL_HOSTS.includes(String(host).toLowerCase());
}

// "₹5,000" -> 5000
export function priceToNumber(price) {
  const n = Number(String(price ?? "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

/* Fire a standard pixel event. fbq is loaded afterInteractive, so a component
 * can mount before it exists: wait for it (up to ~10s) instead of dropping
 * the event. `eventID` lets Meta deduplicate against the server-side event. */
export function trackEvent(name, params = {}, eventID) {
  if (typeof window === "undefined" || !isPixelHost()) return;

  let tries = 0;
  const send = () => {
    if (typeof window.fbq === "function") {
      if (eventID) window.fbq("track", name, params, { eventID: String(eventID) });
      else window.fbq("track", name, params);
      return;
    }
    if (++tries < 50) setTimeout(send, 200);
  };
  send();
}

/* Run `fn` once per key in this browser (survives refreshes of the success
 * page). Falls back to running it if storage is unavailable. */
export function once(key, fn) {
  try {
    const k = `tpn_once_${key}`;
    if (window.localStorage.getItem(k)) return;
    window.localStorage.setItem(k, "1");
  } catch {
    /* storage blocked: still run */
  }
  fn();
}
