import Link from "next/link";
import Logo from "./Logo";
import { SITE, POLICIES, COLLEGE_DISCLAIMER } from "@/data/site";
import { courses } from "@/data/courses";

function Column({ title, children }) {
  return (
    <div>
      <h2 className="text-[13px] font-semibold text-ink">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-[15px] text-ink-2">{children}</ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="wrap pb-12 pt-20 md:pt-28">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr] lg:gap-20">
          <div className="max-w-[360px]">
            <Logo />
            <p className="mt-5 text-[15px] leading-relaxed text-ink-2">
              Online courses taught by professors from the world&apos;s leading business schools. Stream at your own
              pace and earn a certificate when you finish.
            </p>
            <a href={`mailto:${SITE.email}`} className="link mt-6 inline-block text-[15px] font-medium">
              {SITE.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <Column title="Courses">
              {courses.map((c) => (
                <li key={c.slug}>
                  <Link href={c.href} className="link hover:text-ink">
                    {c.shortTitle}
                  </Link>
                </li>
              ))}
              <li className="text-ink-3">More courses coming soon</li>
            </Column>

            <Column title="Company">
              <li>
                <Link href="/about" className="link hover:text-ink">About</Link>
              </li>
              <li>
                <Link href="/gallery" className="link hover:text-ink">Gallery</Link>
              </li>
              <li>
                <Link href="/faqs" className="link hover:text-ink">FAQs</Link>
              </li>
              <li>
                <Link href="/contact-us" className="link hover:text-ink">Contact</Link>
              </li>
              <li>
                <a href={SITE.phoneHref} className="link hover:text-ink">{SITE.phone}</a>
              </li>
            </Column>

            <Column title="Policies">
              {POLICIES.filter((p) => p.href !== "/contact-us").map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="link hover:text-ink">
                    {p.label}
                  </Link>
                </li>
              ))}
            </Column>

            <Column title="Follow">
              {SITE.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link hover:text-ink">
                    {s.label}
                  </a>
                </li>
              ))}
            </Column>
          </div>
        </div>

        <div className="mt-16 grid gap-6 border-t border-line pt-8 text-[13px] leading-relaxed text-ink-3 md:grid-cols-3 md:gap-10">
          <p>
            © {year} {SITE.company} The Professionals Network is a network trademarked and operated by{" "}
            <a href={SITE.companyUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">
              Rextone Digital
            </a>
            .
          </p>
          <p>
            {SITE.address[0]} {SITE.address[1]}
          </p>
          <p>{COLLEGE_DISCLAIMER}</p>
        </div>
      </div>
    </footer>
  );
}
