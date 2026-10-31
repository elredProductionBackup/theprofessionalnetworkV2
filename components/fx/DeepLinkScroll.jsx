"use client";

import { useEffect } from "react";
import { scrollToId } from "@/lib/scroll";

/* ------------------------------------------------------------------ *
 *  QR codes / mailers link straight to a section:
 *    pricing → /#preview-price  or  /?section=pricing
 *    videos  → /#event-videos   or  /?section=videos
 *  Scrolls after first paint, and again once media has loaded.
 * ------------------------------------------------------------------ */
const MAP = { pricing: "preview-price", videos: "event-videos" };

export default function DeepLinkScroll() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromParam = MAP[params.get("section")];
    const fromHash = decodeURIComponent(window.location.hash.slice(1));
    const id = fromParam || fromHash;
    if (!id) return;

    const go = () => scrollToId(id);
    const t = setTimeout(go, 350);
    window.addEventListener("load", go, { once: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("load", go);
    };
  }, []);

  return null;
}
