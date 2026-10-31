import Link from "next/link";
import Media from "@/components/ui/Media";
import PlanPicker from "@/components/course/PlanPicker";
import ProfessorChip from "@/components/course/ProfessorChip";
import { PRICING_ID } from "@/components/ui/ScrollToPricing";

/* The pricing card starts level with the course title and stays
 * pinned (sticky) while the left column scrolls past. */
export default function FeaturedCourse({ course }) {
  return (
    <section id="course" className="section scroll-mt-20 bg-surface">
      <div className="wrap grid items-start gap-12 lg:grid-cols-[1fr_380px] lg:gap-20">
        <div className="min-w-0">
          <div data-reveal>
            <h2 className="heading t-h2 max-w-[22ch] text-ink">{course.title}</h2>
            <ProfessorChip professor={course.professor} className="mt-8" />
          </div>

          <div data-reveal className="mt-12">
              {/* <Media
                src={course.trailer}
                poster={course.trailerPoster}
                label="Course trailer"
                alt={`${course.shortTitle} trailer`}
                playLabel="Play the course trailer"
                className="aspect-video w-full"
              /> */}
            <p className="lede mt-10 max-w-[58ch]">{course.summary}</p>

            <dl className="mt-10 grid grid-cols-2 gap-y-8 sm:grid-cols-4">
              {course.facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-[13px] text-ink-3">{f.label}</dt>
                  <dd className="num mt-2 text-[24px] text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>

          </div>

          {/* What you'll learn — part of this column so the price card stays pinned alongside */}
          <div className="mt-24 border-t border-line pt-16">
            <h3 data-reveal className="heading t-h3 text-ink">What you&apos;ll be able to do</h3>
            <ul className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {course.learn.map((item, i) => (
                <li key={item.lead} data-reveal style={{ "--reveal-delay": `${(i % 2) * 90}ms` }}>
                  <span aria-hidden="true" className="block h-px w-10 bg-red" />
                  <p className="mt-5 text-[18px] font-medium tracking-[-0.02em] text-ink">{item.lead}</p>
                  <p className="mt-1.5 text-[16px] leading-relaxed text-ink-2">
                    {item.rest.charAt(0).toUpperCase() + item.rest.slice(1)}
                  </p>
                </li>
              ))}
            </ul>
            <Link href={course.href} className="link mt-14 inline-block text-[15px] font-medium text-ink">
              See the full course outline
            </Link>
          </div>
        </div>

        {/* No reveal transform here: transforms and sticky don't mix well */}
        <aside className="self-start lg:sticky lg:top-24">
          <PlanPicker course={course} id={PRICING_ID} />
        </aside>
      </div>
    </section>
  );
}
