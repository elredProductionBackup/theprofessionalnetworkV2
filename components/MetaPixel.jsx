'use client';

import Script from "next/script";
import { TRACKING, PIXEL_HOSTS } from "@/lib/tracking";

/* Meta Pixel. Starts with any hashed email/phone saved at checkout or
 * preview sign-up (localStorage "tpn_um", see lib/tracking.js) so
 * Purchase and Lead events match back to the person who saw the ad.
 * Conversion events themselves are sent from lib/tracking.js.
 * Loads on the live site only (PIXEL_HOSTS): localhost, *.vercel.app
 * previews and staging skip it. */
export default function MetaPixel() {
  const id = TRACKING.metaPixelId;
  if (!id) return null;
  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
            if (${JSON.stringify(PIXEL_HOSTS)}.indexOf(window.location.hostname.toLowerCase()) === -1) return;
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            var tpnUser = {};
            try { tpnUser = JSON.parse(localStorage.getItem('tpn_um') || '{}') || {}; } catch (e) {}
            fbq('init', '${id}', tpnUser);
            fbq('track', 'PageView');
            })();
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
