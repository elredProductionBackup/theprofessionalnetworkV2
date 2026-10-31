import { SITE } from "@/data/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // payment return pages are private to each buyer
      disallow: ["/payment", "/event/", "/tpnEvent/"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
