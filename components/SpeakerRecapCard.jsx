'use client'
import { useState } from "react";
import { Link as LinkIcon, Play } from "lucide-react";
import { RED, speaker as defaultSpeaker, clips as defaultClips } from "@/data/eventRegistration";

/* Video + speaker profile card used both on the event page and the view-details pages.
 * Defaults to Oded Netzer's data; pass `speaker` / `clips` to reuse it for another professor. */
export default function SpeakerRecapCard({ id, speaker = defaultSpeaker, clips = defaultClips, showProfile = true }) {
  const [playingClip, setPlayingClip] = useState(null); // index of clip playing, or null

  return (
    <div className="flex w-full flex-col items-start">
      <div id={id} className={`scroll-mt-24 flex w-full flex-col rounded-3xl bg-[#F8E6E6] p-2.5 shadow-sm lg:w-[500px] ${showProfile ? "lg:h-[420px]" : ""}`}>
        {clips.map((clip, i) => {
          const poster = clip.videoThumbnail;
          const isPlaying = playingClip === i;
          return (
            <div key={clip.name} className="group relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-neutral-900">
              {isPlaying ? (
                <video
                  key={clip.video}
                  src={clip.video}
                  poster={poster}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <>
                  <img src={poster} alt={clip.name} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-black/40" />
                  <button
                    type="button"
                    onClick={() => setPlayingClip(i)}
                    aria-label={`Play ${clip.name}'s clip`}
                    className="absolute inset-0 grid place-items-center"
                  >
                    <span className="grid h-16 w-16 place-items-center rounded-full text-white transition-transform duration-300 hover:scale-110" style={{ backgroundColor: RED }}>
                      <Play className="ml-0.5 h-7 w-7" fill="currentColor" />
                    </span>
                  </button>
                </>
              )}
            </div>
          );
        })}

        {showProfile && (
          <div className="mt-5 flex items-center justify-between gap-3 px-1 py-2">
            <div className="flex items-center gap-3">
              <img src={speaker.image} alt={speaker.name} className="h-15 w-15 shrink-0 rounded-full object-cover" />
              <div>
                <p className="font-inter text-[20px] font-medium leading-[1.1] tracking-normal text-slate-900 sm:text-[28px] sm:tracking-[-1px] md:text-[35px] md:tracking-[-2px]">
                  {speaker.name}
                </p>
                <p className="font-inter text-[13px] font-normal leading-[1.4] tracking-normal text-left text-[#231f20] sm:text-[16px] md:text-[18px]">
                  {speaker.school}
                  <sup>*</sup>
                </p>
              </div>
            </div>
            <a
              href={speaker.linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${speaker.name} on LinkedIn`}
              className="relative grid h-8 w-8 shrink-0 place-items-center transition hover:opacity-90"
            >
              <img src="/icons/linkedin.svg" alt="" className="h-full w-full" />
              <span className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-white text-slate-500 shadow-sm ring-1 ring-slate-200">
                <LinkIcon className="h-2.5 w-2.5" />
              </span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
