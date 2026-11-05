import Link from "next/link";
import PhotoColumns from "./PhotoColumns";
import ScrollToPricing from "@/components/ui/ScrollToPricing";
import { quantitativeIntuition as course } from "@/data/courses";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-[112px] lg:pt-[96px]">
      <div className="wrap grid grid-cols-[minmax(0,1fr)] items-center gap-14 pb-20 lg:min-h-[760px] lg:grid-cols-[minmax(0,1fr)_520px] lg:gap-20 lg:pb-10">
        <div className="max-w-[580px]">
          <Link href={course.href} className="group inline-flex items-center gap-2 text-[14px] text-ink-2 transition-colors hover:text-ink">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red/50 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red" />
            </span>
            Now enrolling: {course.professor.name}
          </Link>

          <h1 className="display t-hero mt-6 text-ink">Learn from the best academic minds in the world.</h1>

          <p className="lede mt-6 max-w-[48ch]">
            Access relevant courses taught by professors from some of the world’s leading universities.
Learn at your own pace, deepen your expertise in areas that matter to you, and earn a certificate upon completion.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ScrollToPricing className="btn btn-red">Enroll now</ScrollToPricing>
            <Link href={course.href} className="btn btn-ghost">
              View the course
            </Link>
          </div>
        </div>

        <PhotoColumns />
      </div>
    </section>
  );
}
