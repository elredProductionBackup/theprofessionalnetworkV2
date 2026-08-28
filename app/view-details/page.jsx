import HeroSection from "@/components/view-details/HeroSection";
import KeyTakeawaysSection from "@/components/view-details/KeyTakeawaysSection";
import EventModulesSection from "@/components/view-details/EventModulesSection";
import EarnCertificateSection from "@/components/view-details/EarnCertificateSection";
import UpcomingEventDetailsSection from "@/components/view-details/UpcomingEventDetailsSection";
import WhyItMattersSection from "@/components/view-details/WhyItMattersSection";
import FaqSection from "@/components/view-details/FaqSection";

export const metadata = {
  title: "Event Details | The Professionals Network",
};

export default function ViewDetailsPage() {
  return (
    <main>
      <HeroSection />
      <KeyTakeawaysSection />
      <EventModulesSection />
      <EarnCertificateSection />
      <UpcomingEventDetailsSection currentName="Prof. Oded Netzer" />
      <WhyItMattersSection />
      <FaqSection />
    </main>
  );
}
