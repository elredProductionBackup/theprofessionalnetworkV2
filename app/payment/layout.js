import { pageMetadata } from "@/lib/seo";

// Payment pages are personal to each buyer — keep them out of search results.
export const metadata = pageMetadata({ title: "Payment status", path: "/payment", noindex: true });

export default function Layout({ children }) {
  return children;
}
