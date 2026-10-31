import Media from "@/components/ui/Media";
import Accordion from "@/components/ui/Accordion";
import ScrollToPricing, { PRICING_ID } from "@/components/ui/ScrollToPricing";
import PlanPicker from "./PlanPicker";
import ProfessorChip from "./ProfessorChip";
import CertificateCard from "./CertificateCard";
import { faqs } from "@/data/courses";
import { COLLEGE_DISCLAIMER } from "@/data/site";

function Block({ title, children, id }) {
  return (
    <section id={id} data-reveal className="scroll-mt-28 border-t border-line py-16 md:py-20">
      <h2 className="heading text-[clamp(24px,2.4vw,30px)] text-ink">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function CoursePage({ course }) {
  const { professor } = course;

  return (
    <main>
      <div className="wrap grid items-start gap-12 pb-16 pt-[132px] md:pt-[168px] lg:grid-cols-[1fr_380px] lg:gap-20">
        {/* Main column */}
        <div className="min-w-0">
          <header className="mb-12">
            <p className="text-[15px] text-ink-2">Online course</p>
            <h1 className="display t-h1 mt-4 max-w-[22ch] text-ink">{course.title}</h1>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
              <ProfessorChip professor={professor} size="lg" />
              <ScrollToPricing className="btn btn-red lg:hidden">Enroll now</ScrollToPricing>
            </div>
          </header>

          {/* <Media
            src={course.trailer}
            poster={course.trailerPoster}
            label="Course trailer"
            alt={`${course.shortTitle} trailer`}
            playLabel="Play the course trailer"
            className="aspect-video w-full"
            priority
          /> */}

          <dl className="mt-8 grid grid-cols-2 gap-y-6 sm:grid-cols-4">
            {course.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-[13px] text-ink-3">{f.label}</dt>
                <dd className="num mt-2 text-[24px] text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>

          <Block title="About this course">
            <p className="lede">{course.summary}</p>
            <p className="mt-5 max-w-[68ch] text-[17px] leading-relaxed text-ink-2">{course.description}</p>
            <blockquote className="mt-10 border-l-2 border-red pl-6">
              <p className="heading t-h3 text-ink">&ldquo;{course.quote}&rdquo;</p>
              <footer className="mt-3 text-[15px] text-ink-2">{professor.name}</footer>
            </blockquote>
          </Block>

          <Block title="Course outline">
            <ol className="space-y-3">
              {course.modules.map((m, i) => (
                <li key={m.title} className="flex gap-5 rounded-[20px] bg-surface p-6 ring-1 ring-line">
                  <span className="heading grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper text-[18px] text-ink">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-[19px] font-medium text-ink">{m.title}</h3>
                    <p className="mt-1.5 text-[16px] leading-relaxed text-ink-2">{m.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Block>

          <Block title="What you'll learn">
            <ul className="grid gap-x-10 sm:grid-cols-2">
              {course.learn.map((item) => (
                <li key={item.lead} className="flex gap-3.5 border-b border-line py-4">
                  <svg viewBox="0 0 20 20" className="mt-1 h-[18px] w-[18px] shrink-0 text-red" fill="none" aria-hidden="true">
                    <path d="m4.5 10.5 3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-[16px] leading-snug text-ink-2">
                    <span className="font-medium text-ink">{item.lead}</span> {item.rest}
                  </p>
                </li>
              ))}
            </ul>
            <h3 className="mt-12 text-[19px] font-medium text-ink">Key takeaways</h3>
            <div className="mt-4 grid gap-3">
              {course.takeaways.map((t) => (
                <p key={t} className="rounded-[16px] border-l-2 border-red bg-red-wash px-6 py-5 text-[17px] leading-relaxed text-ink">
                  {t}
                </p>
              ))}
            </div>
          </Block>

          <Block title="Who it's for">
            <p className="max-w-[62ch] text-[17px] leading-relaxed text-ink-2">{course.audience.text}</p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {course.audience.roles.map((r) => (
                <li key={r} className="rounded-full bg-surface px-4 py-2 text-[15px] text-ink ring-1 ring-line">
                  {r}
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Earn a certificate">
            <div className="grid gap-10">
              <p className="max-w-[46ch] text-[17px] leading-relaxed text-ink-2">
                Finish the course to receive a digital certificate of completion. Download it, print it, or add it to
                the Licenses &amp; certifications section of your LinkedIn profile.
              </p>
              <CertificateCard course={course} />
            </div>
          </Block>

          <Block title="Your speaker">
            <div className="grid gap-8 sm:grid-cols-[200px_1fr]">
              <Media src={professor.photo} alt={professor.name} label="Portrait" className="aspect-[4/5] w-full max-w-[200px]" />
              <div>
                <p className="heading text-[28px] text-ink">{professor.name}</p>
                <p className="mt-1 text-[15px] text-ink-2">
                  <a href={professor.orgLink} target="_blank" rel="noopener noreferrer" className="link">
                    {professor.org}
                  </a>
                  <sup className="text-ink-3">*</sup>
                </p>
                <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-ink-2">{professor.bio}</p>
              </div>
            </div>
          </Block>

          <Block title="Watch" id="event-videos">
            <div className="grid gap-6 sm:grid-cols-2">
              {course.clips.map((clip) => (
                <figure key={clip.id}>
                  <Media src={clip.video} poster={clip.poster} alt={clip.caption} playLabel={`Play: ${clip.caption}`} className="aspect-video w-full" />
                  <figcaption className="mt-3 text-[15px] text-ink-2">{clip.caption}</figcaption>
                </figure>
              ))}
            </div>
          </Block>

          <Block title="Frequently asked questions">
            <Accordion items={faqs} />
          </Block>

          <p className="fine border-t border-line py-8">{COLLEGE_DISCLAIMER}</p>
        </div>

        {/* Sticky pricing */}
        <aside className="self-start lg:sticky lg:top-24">
          <PlanPicker course={course} id={PRICING_ID} />
        </aside>
      </div>
    </main>
  );
}
