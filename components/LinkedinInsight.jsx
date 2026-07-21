'use client';

import Script from "next/script";

export default function LinkedinInsight() {
  return (
    <>
      <Script
        id="linkedin-insight-1"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            _linkedin_partner_id = "10536265";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `,
        }}
      />
      <Script
        id="linkedin-insight-2"
        strategy="afterInteractive"
        src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src="https://px.ads.linkedin.com/collect/?pid=10536265&fmt=gif"
        />
      </noscript>
    </>
  );
}
