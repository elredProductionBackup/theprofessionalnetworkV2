import PreviewGate from "@/components/preview/PreviewGate";
import ProfessorChip from "@/components/course/ProfessorChip";
import JsonLd from "@/components/seo/JsonLd";
import { quantitativeIntuition as course } from "@/data/courses";
import { COLLEGE_DISCLAIMER } from "@/data/site";
import { pageMetadata, breadcrumbLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `Watch chapter 1 free: ${course.shortTitle}`,
  description: `See how ${course.professor.name} teaches Quantitative Intuition. Watch the first chapter of the online course free, then decide.`,
  path: course.preview.href,
});

export default function PreviewPage() {
  const first = course.modules[0];
  return (
    <main className="wrap pb-20 pt-[120px] md:pt-[150px]">
      <JsonLd data={[breadcrumbLd([{ name: "Free preview", path: course.preview.href }])]} />

      <header className="max-w-[760px]">
        <h1 className="display t-h1 text-ink">See how {course.professor.name} teaches, before you enroll.</h1>
        <p className="lede mt-5 max-w-[56ch]">
          The first of 11 chapters of {course.shortTitle}, free. {course.preview.duration}.
        </p>
        <ProfessorChip professor={course.professor} className="mt-8" />
      </header>

      <div className="mt-12">
        <PreviewGate course={course} />
      </div>

      <section className="mt-16 grid gap-10 border-t border-line pt-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="heading t-h3 text-ink">In chapter 1: {first.title.toLowerCase()}</h2>
          <p className="mt-3 max-w-[52ch] text-[17px] leading-relaxed text-ink-2">{first.desc}</p>
        </div>
        <div>
          <h2 className="heading t-h3 text-ink">The full course</h2>
          <p className="mt-3 max-w-[52ch] text-[17px] leading-relaxed text-ink-2">
            {course.facts.map((f) => `${f.value} ${f.label.toLowerCase()}`).join(", ")}, three months of access and a
            certificate you can add to LinkedIn.
          </p>
        </div>
      </section>

      <p className="fine mt-16 border-t border-line pt-8">{COLLEGE_DISCLAIMER}</p>
    </main>
  );
}
