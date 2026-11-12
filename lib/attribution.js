/* ------------------------------------------------------------------ *
 *  Campaign attribution.
 *
 *  Ads link to the site with ?utm_source=…&utm_campaign=… (plus the
 *  platforms' own click ids). Those tags disappear as soon as the
 *  visitor clicks to another page, so we save them on arrival and read
 *  them back at checkout. The most recent tagged visit wins (last
 *  touch); the first one is kept too, for reporting.
 *
 *  Stored in localStorage under "tpn_attribution" for 90 days.
 * ------------------------------------------------------------------ */

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const CLICK_IDS = ["fbclid", "li_fat_id", "gclid"];
const STORE_KEY = "tpn_attribution";
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;

const read = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
    if (!saved || Date.now() - (saved.last?.ts || 0) > MAX_AGE_MS) return null;
    return saved;
  } catch {
    return null;
  }
};

const touchFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const touch = {};
  [...UTM_KEYS, ...CLICK_IDS].forEach((key) => {
    const value = params.get(key);
    if (value) touch[key] = value.slice(0, 200);
  });
  if (!Object.keys(touch).length) return null;
  touch.landing_page = window.location.pathname;
  touch.referrer = document.referrer || "";
  touch.ts = Date.now();
  return touch;
};

/* Call on every page view. Saves the tags if this URL has any. */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  const touch = touchFromUrl();
  if (!touch) return;
  const saved = read();
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({ first: saved?.first || touch, last: touch }));
  } catch {
    /* storage blocked (private mode) — the current URL is still read at checkout */
  }
}

/* The touch to credit a sale to: tags on the current URL, else the last saved visit. */
export function getAttribution() {
  if (typeof window === "undefined") return {};
  return touchFromUrl() || read()?.last || {};
}

export function getFirstTouch() {
  if (typeof window === "undefined") return {};
  return read()?.first || {};
}

/* Shape the payment backend already expects: { utm_source, utm_medium, … } */
export function utmPayload(fallbackCampaign = "") {
  const a = getAttribution();
  const utm = {};
  UTM_KEYS.forEach((key) => (utm[key] = a[key] || ""));
  if (!utm.utm_campaign && fallbackCampaign) utm.utm_campaign = fallbackCampaign;
  return utm;
}
