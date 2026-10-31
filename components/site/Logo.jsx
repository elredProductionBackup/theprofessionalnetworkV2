import Link from "next/link";
import { SITE } from "@/data/site";

/* The Professionals Network logo (public/assets/thePN-logo.svg, 293×60). */
export default function Logo({ className = "", height = 30, onClick }) {
  const width = Math.round((293 / 60) * height);
  return (
    <Link href="/" onClick={onClick} aria-label={`${SITE.name}, home`} className={`inline-flex shrink-0 items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={SITE.logo} alt={SITE.name} width={width} height={height} fetchPriority="high" style={{ height, width: "auto" }} />
    </Link>
  );
}
