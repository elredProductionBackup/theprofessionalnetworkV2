import { pageMetadata, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";
import LegalDoc from "@/components/legal/LegalDoc";
import { SITE, POLICIES } from "@/data/site";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Contact The Professionals Network about courses, enterprise access, billing and refunds.",
  path: "/contact-us",
});

function Card({ title, children, className = "" }) {
  return (
    <div className={`rounded-[22px] bg-surface p-7 ring-1 ring-line ${className}`}>
      <h2 className="text-[14px] text-ink-3">{title}</h2>
      <div className="mt-3 text-[17px] leading-relaxed text-ink">{children}</div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Contact Us", path: "/contact-us" }])} />
    <LegalDoc
      title="Contact us"
      intro="Questions about a course, enterprise access, or a payment? We reply within 1–2 business days."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Email">
          <a href={`mailto:${SITE.email}`} className="link-red text-[22px]">
            {SITE.email}
          </a>
          <p className="mt-2 text-[15px] text-ink-2">For courses, enterprise access, billing, and refunds.</p>
        </Card>
        <Card title="Phone">
          <a href={SITE.phoneHref} className="link-red text-[22px]">
            {SITE.phone}
          </a>
          <p className="mt-2 text-[15px] text-ink-2">{SITE.hours}</p>
        </Card>
        <Card title="Office">
          <p>{SITE.address[0]}</p>
          <p>{SITE.address[1]}</p>
        </Card>
        <Card title="Operating entity">
          <p>{SITE.company}</p>
          <p className="mt-2 text-[15px] text-ink-2">
            The Professionals Network is a network trademarked and operated by {SITE.company}
          </p>
        </Card>
        <Card title="Follow us">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {SITE.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Policies">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {POLICIES.filter((p) => p.href !== "/contact-us").map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="link">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </LegalDoc>
    </>
  );
}
