'use client';

import Script from "next/script";
import { TRACKING } from "@/lib/tracking";

/* HubSpot tracking code. Set NEXT_PUBLIC_HUBSPOT_PORTAL_ID (the
 * "Hub ID" in HubSpot → Settings → Tracking code) to switch it on. */
export default function HubSpotTracking() {
  const portal = TRACKING.hubspotPortalId;
  if (!portal) return null;
  const host = TRACKING.hubspotRegion === "eu1" ? "js-eu1.hs-scripts.com" : "js.hs-scripts.com";
  return <Script id="hs-script-loader" strategy="afterInteractive" src={`https://${host}/${portal}.js`} />;
}
