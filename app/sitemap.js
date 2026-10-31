import { absoluteUrl } from "@/lib/seo";

const ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/view-details", priority: 0.9, changeFrequency: "weekly" },
  { path: "/gallery", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faqs", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact-us", priority: 0.5, changeFrequency: "yearly" },
  { path: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cancellation-and-refund", priority: 0.3, changeFrequency: "yearly" },
  { path: "/shipping-and-exchange", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap() {
  const lastModified = new Date();
  return ROUTES.map((r) => ({ url: absoluteUrl(r.path), lastModified, changeFrequency: r.changeFrequency, priority: r.priority }));
}
