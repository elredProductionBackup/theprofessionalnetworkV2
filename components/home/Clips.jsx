import Media from "@/components/ui/Media";

export const VIDEOS_ID = "event-videos";

export default function Clips({ course }) {
  return (
    <section id={VIDEOS_ID} className="section scroll-mt-20 bg-surface">
      <div className="wrap">
        <div data-reveal className="max-w-[44ch]">
          <h2 className="heading t-h2 text-ink">Hear it from the professor</h2>
          <p className="lede mt-4">Two short films with {course.professor.name} on why judgment is the new edge.</p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {course.clips.map((clip, i) => (
            <figure key={clip.id} data-reveal style={{ "--reveal-delay": `${i * 120}ms` }}>
              <Media src={clip.video} poster={clip.poster} alt={clip.caption} playLabel={`Play: ${clip.caption}`} className="aspect-video w-full" />
              <figcaption className="mt-5">
                <p className="text-[16px] font-medium text-ink">{clip.title}</p>
                <p className="mt-0.5 text-[15px] text-ink-2">{clip.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
