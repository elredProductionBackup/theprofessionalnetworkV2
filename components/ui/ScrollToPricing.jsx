"use client";

import { useRouter } from "next/navigation";
import { scrollToId } from "@/lib/scroll";

export const PRICING_ID = "preview-price";

/* Button that scrolls to the pricing panel on this page,
 * or opens the home page at its pricing panel. */
export default function ScrollToPricing({ children, className = "" }) {
  const router = useRouter();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (!scrollToId(PRICING_ID)) router.push(`/#${PRICING_ID}`);
      }}
    >
      {children}
    </button>
  );
}
