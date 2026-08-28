import { Share2, Award, ScrollText } from "lucide-react";
import { RED } from "@/data/eventRegistration";

const FEATURES = [
  { icon: Share2, title: "LinkedIn Ready", desc: "Instantly sharable" },
  { icon: Award, title: "Global Standard", desc: "Recognized worldwide" },
  { icon: ScrollText, title: "Digital & Print", desc: "High-res formats" },
];

export default function EarnCertificateSection({
  certificateSrc = "/icons/certificate.svg",
  certificateAlt = "Sample certificate of completion",
}) {
  return (
    <section className="font-inter bg-white">
      <div className="mx-auto w-[95%] max-w-[1440px] px-5 pb-14 md:px-[100px] md:pb-20">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy + features */}
          <div>
            <h2 className="font-inter text-[22px] font-semibold leading-[1.4] tracking-normal text-slate-900 sm:text-[32px]">
              Earn Certificate
            </h2>
            <p className="font-inter mt-3 text-[16px] font-normal leading-[1.5] tracking-normal text-[#67686B]">
              Complete the course and earn a certificate of completion that demonstrates your Excel proficiency - from foundational skills to advanced data visualisation and automation. Share it on LinkedIn or include it in your portfolio to stand out in any job application.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-xl border border-rose-100 bg-white p-4">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-50"
                    style={{ color: RED }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="font-inter mt-3 text-[15px] font-bold text-slate-900">{title}</p>
                  <p className="font-inter text-[13px] text-[#67686B]">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: certificate preview */}
          <div className="flex justify-center lg:justify-end">
            <img
              src={certificateSrc}
              alt={certificateAlt}
              className="w-full max-w-[520px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
