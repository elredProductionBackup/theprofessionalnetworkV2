import HeroSection from "@/components/view-details/niro-sivanathan/HeroSection";
import WhatYoullLearnSection from "@/components/view-details/niro-sivanathan/WhatYoullLearnSection";
import WhyItMattersSection from "@/components/view-details/niro-sivanathan/WhyItMattersSection";
import SpeakerBioSection from "@/components/view-details/niro-sivanathan/SpeakerBioSection";
import FaqSection from "@/components/view-details/niro-sivanathan/FaqSection";

export const metadata = {
  title: "Event Details | The Professionals Network",
};

export default function NiroSivanathanViewDetailsPage() {
  return (
    <main>
      <HeroSection />
      <WhatYoullLearnSection />
      <WhyItMattersSection />
      <SpeakerBioSection />
      <FaqSection />
    </main>
  );
}
