'use client';

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution } from "@/lib/attribution";
import { trackHubSpotPageView } from "@/lib/tracking";

/* On every page view: save any campaign tags in the URL (so they reach
 * checkout even after the visitor clicks around) and record the page
 * view in HubSpot. The Meta pixel and GA4 track client-side page
 * changes on their own; HubSpot needs to be told. */
export default function RouteTracking() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    captureAttribution();
    if (first.current) {
      first.current = false; // HubSpot's script records the first page view itself
      return;
    }
    trackHubSpotPageView(pathname + window.location.search);
  }, [pathname]);

  return null;
}
