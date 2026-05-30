"use client";
import ComingSoonPopup from './ComingSoonPopup';

export default function TeamSection() {
  const team = [
    {
      name: "Saurabh Goswamy",
      role: "Founder",
      image: "/team/saurabh_goswamy.jpg",
    },
    {
      name: "Anushka",
      role: "Member Experience Lead",
      image: "/team/anushka.jpg", 
      scale: "scale-140",
    },
    { name: "Zahra", role: "Lead Curator", image: "/team/zahra.png" },
    { name: "Malaika", role: "Project Manager", image: "/team/malaika.png" },
    { name: "Uttam", role: "Lead Design", image: "/team/uttam.png" },
    {
      name: "Ritika",
      role: "Lead, Native Applications",
      image: "/team/ritika.png",
    },
    { name: "Vignesh", role: "Lead AWS/API", image: "/team/vignesh.png" },
    {
      name: "Tashaf",
      role: "Lead Web Applications",
      image: "/team/tashaf_mahmood.png",
    },
    { name: "Ananya", role: "Admin", image: "/team/ananya.png" },
  ];

  return (
    <section className="bg-[#F6F6F6] text-black">
      <div className="mx-auto px-6 md:px-10 py-20 lg:py-28">
        {/* ===== HEADER ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-10 lg:gap-20">
          {/* LEFT */}
          <h2 className="text-[30px] font-inter md:text-5xl font-medium tracking-[-2px] text-black">
            The Tribe
          </h2>

          {/* RIGHT */}
          <div>
            <p className="text-[19px] md:text-[21px] font-inter tracking-[-1.2px] font-medium text-[#333336] mb-4">
              We hate company politics
            </p>

            <p className=" text-[30px] font-inter md:text-[35px] font-medium tracking-[-1.4px] leading-[120%] text-[#8A8A91] ">
              At The Tribe, we are committed to creating thoughtfully curated
              learning experiences that are relevant, immersive, and
              future-focused. We value every member deeply, taking the time to
              understand individual journeys and aspirations.
            </p>
          </div>
        </div>

        {/* ===== TEAM SECTION (EXACT ALIGNMENT) ===== */}
        <div className="md:mt-20 grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-10 lg:gap-20">
          {/* LEFT EMPTY COLUMN */}
          <div />

          {/* RIGHT CONTENT (THIS MATCHES HEADER EXACTLY) */}
          <div>
            {/* TEAM GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
              {team.map((member, i) => (
                <div key={i} className="group">
                  <div className="aspect-[3/5] overflow-hidden bg-zinc-200">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition duration-200 group-hover:scale-110"
                    />
                  </div>

                  <div className="mt-4">
                    <h3 className="font-inter text-[21px] text-[#333336] tracking-[-1px] font-medium">
                      {member.name}
                    </h3>
                    <p className="text-[17px] font-inter font-normal tracking-[-0.68px] text-[#8A8A91]">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="">
        <div className="mx-auto px-6 pb-20 lg:py-24">
          {/* SAME GRID AS ABOVE (IMPORTANT) */}

          {/* RIGHT CONTENT */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 lg:gap-10">
            {/* TITLE */}
            <h3 className="text-[32px] lg:text-[32px] font-serif text-[#8A8A91] tracking-[-1.2px]">
              Join the Team
            </h3>
            <hr className="md:hidden h-1 -mt-4 w-46 text-[#bfbfbf]"/>

            {/* DIVIDER */}
            <div className="hidden sm:block w-px h-16 bg-zinc-300" />

            {/* LINKS */}
            <div className="flex items-center gap-8 text-lg">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('openCareerPopup')); }}
                className="group relative font-medium font-inter text-2xl md:text-[28px] tracking-[-1.2px] text-[#333336] hover:text-[#C01522] transition"
              >
                career page
                <span className="absolute left-0 -bottom-1 h-[2px] bg-[#C01522] w-4 transition-all duration-300 group-hover:w-full" />
              </a>

              <a
                href="#"
                className="group relative font-medium font-inter text-2xl md:text-[28px] tracking-[-1.2px] text-[#333336] hover:text-[#C01522] transition"
              >
                contact page
                <span className="absolute left-0 -bottom-1 h-[2px] bg-[#C01522] w-4 transition-all duration-300 group-hover:w-full" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <ComingSoonPopup eventName="openCareerPopup" />
    </section>
  );
}
