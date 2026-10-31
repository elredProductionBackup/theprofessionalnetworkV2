import Link from "next/link";
import Media from "@/components/ui/Media";
import { speakers, upcoming, SPEAKERS_SECTION } from "@/data/speakers";
import { SITE } from "@/data/site";

/* Content lives in data/speakers.js — edit there, not here. */
export default function Speakers() {
  const notifyHref = `mailto:${SITE.email}?subject=${encodeURIComponent("Notify me about new courses")}`;

  return (
    <section id="speakers" className="section scroll-mt-20 border-t border-line">
      {/* keeps old /#faculty links working */}
      <span id="faculty" className="block scroll-mt-20" aria-hidden="true" />
      <div className="wrap">
        <div data-reveal className="max-w-[44ch]">
          <h2 className="heading t-h2 text-ink">{SPEAKERS_SECTION.title}</h2>
          <p className="lede mt-4">{SPEAKERS_SECTION.intro}</p>
        </div>

        {speakers.map((s) => (
          <article key={s.slug} data-reveal className="mt-14 grid items-center gap-10 md:grid-cols-[300px_1fr] md:gap-16">
            <Media src={s.photo} alt={s.name} label="Speaker photo" className="aspect-[4/5] w-full max-w-[300px]" />
            <div className="max-w-[54ch]">
              <h3 className="heading t-h3 text-ink">{s.name}</h3>
              {(s.role || s.org) && (
                <p className="mt-1.5 text-[15px] text-ink-2">
                  {s.role}
                  {s.role && s.org && ", "}
                  {s.org &&
                    (s.orgLink ? (
                      <a href={s.orgLink} target="_blank" rel="noopener noreferrer" className="link">
                        {s.org}
                      </a>
                    ) : (
                      s.org
                    ))}
                  {s.org && <sup className="text-ink-3">*</sup>}
                </p>
              )}
              <p className="mt-6 text-[17px] leading-relaxed text-ink-2">{s.bio}</p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                {s.cta && (
                  <Link href={s.cta.href} className="btn btn-ink">
                    {s.cta.label}
                  </Link>
                )}
                {s.linkedin && (
                  <a href={s.linkedin} target="_blank" rel="noopener noreferrer" className="link text-[15px] font-medium text-ink">
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}

        {upcoming.count > 0 && (
          <div data-reveal className="mt-20 flex flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex -space-x-3">
                {Array.from({ length: upcoming.count }, (_, i) => (
                  <span key={i} className="placeholder h-11 w-11 rounded-full ring-4 ring-paper" />
                ))}
              </div>
              <p className="text-[16px] text-ink-2">
                {upcoming.count} {upcoming.text}
              </p>
            </div>
            <a href={notifyHref} className="link text-[15px] font-medium text-ink">
              {upcoming.notifyLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
