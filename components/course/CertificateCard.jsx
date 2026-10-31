import Media from "@/components/ui/Media";
import Tilt from "@/components/fx/Tilt";
import { MEDIA } from "@/data/media";

/* Certificate preview. Uses MEDIA.certificate if set; otherwise a
 * built-in sample card. Wrapped in <Tilt> for a light 3D feel. */
export default function CertificateCard({ course }) {
  return (
    <Tilt className="mx-auto w-full max-w-[540px]">
      {MEDIA.certificate ? (
        <Media src={MEDIA.certificate} alt="Sample certificate of completion" className="aspect-[1.414/1] w-full shadow-[0_40px_80px_-40px_rgba(22,23,27,0.45)]" rounded="rounded-[18px]" />
      ) : (
        <div
          role="img"
          aria-label="Sample certificate of completion"
          className="@container relative aspect-[1.414/1] w-full overflow-hidden rounded-[18px] bg-surface p-[4%] shadow-[0_40px_80px_-40px_rgba(22,23,27,0.45)] ring-1 ring-line"
        >
          <div className="flex h-full flex-col rounded-[10px] border border-line p-[5cqw]">
            <div className="flex items-center justify-between">
              <span className="font-medium text-[3.2cqw] text-ink">The Professionals Network</span>
              <span className="text-[2.2cqw] text-ink-3">Certificate of completion</span>
            </div>
            <div className="my-auto">
              <p className="text-[2.2cqw] text-ink-3">This certifies that</p>
              <p className="heading mt-1 text-[7.5cqw] text-ink">Your Name</p>
              <p className="mt-2 max-w-[34ch] text-[2.6cqw] leading-snug text-ink-2">
                has completed the online course <span className="text-ink">{course.shortTitle}</span> taught by{" "}
                {course.professor.name}.
              </p>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="h-px w-[22cqw] bg-ink/30" />
                <p className="mt-1.5 text-[2cqw] text-ink-3">Programme director</p>
              </div>
              <span className="grid aspect-square w-[10cqw] place-items-center rounded-full bg-red text-white ring-4 ring-red-wash">
                <svg viewBox="0 0 24 24" className="h-1/2 w-1/2" fill="none" aria-hidden="true">
                  <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      )}
    </Tilt>
  );
}
