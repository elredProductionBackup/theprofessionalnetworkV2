import Link from "next/link";
import ScrollToPricing from "@/components/ui/ScrollToPricing";

export default function ClosingCta({ course }) {
  return (
    <section className="section bg-surface">
      <div data-reveal className="wrap text-center">
        <h2 className="display t-h1 mx-auto max-w-[18ch] text-ink">Start today. Finish on your schedule.</h2>
        <p className="lede mx-auto mt-6 max-w-[46ch]">
          {course.facts[0].value} with {course.professor.name}, with three months to watch and rewatch.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ScrollToPricing className="btn btn-red">Enroll now</ScrollToPricing>
          {course.preview && (
            <Link href={course.preview.href} className="btn btn-ghost">
              Watch chapter 1 free
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
