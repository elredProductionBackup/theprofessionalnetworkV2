import HeroSection from "@/components/view-details/niro-sivanathan/HeroSection";
import KeyTakeawaysSection from "@/components/view-details/niro-sivanathan/KeyTakeawaysSection";
import EventModulesSection from "@/components/view-details/niro-sivanathan/EventModulesSection";
import EarnCertificateSection from "@/components/view-details/niro-sivanathan/EarnCertificateSection";
import UpcomingEventDetailsSection from "@/components/view-details/UpcomingEventDetailsSection";
import WhyItMattersSection from "@/components/view-details/niro-sivanathan/WhyItMattersSection";
import FaqSection from "@/components/view-details/niro-sivanathan/FaqSection";

export const metadata = {
  title: "Event Details | The Professionals Network",
};

export default function NiroSivanathanViewDetailsPage() {
  return (
    <main>
      <HeroSection />
      <KeyTakeawaysSection />
      <EventModulesSection />
      <EarnCertificateSection />
      <UpcomingEventDetailsSection currentName="Prof. Niro Sivanathan" />
      <WhyItMattersSection />
      <FaqSection />
    </main>
  );
}
