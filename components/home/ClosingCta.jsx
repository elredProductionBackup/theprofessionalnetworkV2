import ScrollToPricing from "@/components/ui/ScrollToPricing";

export default function ClosingCta({ course }) {
  return (
    <section className="section bg-surface">
      <div data-reveal className="wrap text-center">
        <h2 className="display t-h1 mx-auto max-w-[18ch] text-ink">Start today. Finish on your schedule.</h2>
        <p className="lede mx-auto mt-6 max-w-[46ch]">
          {course.facts[0].value} with {course.professor.name}, with three months to watch and rewatch.
        </p>
        <ScrollToPricing className="btn btn-red mt-10">Enroll now</ScrollToPricing>
      </div>
    </section>
  );
}
