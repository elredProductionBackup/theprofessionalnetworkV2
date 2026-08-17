import HeroSection from "@/components/view-details/HeroSection";
import WhatYoullLearnSection from "@/components/view-details/WhatYoullLearnSection";
import WhyItMattersSection from "@/components/view-details/WhyItMattersSection";
import SpeakerBioSection from "@/components/view-details/SpeakerBioSection";

export const metadata = {
  title: "Event Details | The Professionals Network",
};

export default function ViewDetailsPage() {
  return (
    <main>
      <HeroSection />
      <WhatYoullLearnSection />
      <WhyItMattersSection />
      <SpeakerBioSection />
    </main>
  );
}
