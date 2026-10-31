import { pageMetadata, breadcrumbLd, faqLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";
import Accordion from "@/components/ui/Accordion";
import { LegalHeader } from "@/components/legal/LegalDoc";
import { faqs } from "@/data/courses";

export const metadata = pageMetadata({
  title: "FAQs",
  description: "Answers about course access, certificates, Single user and Enterprise plans, payment and refunds.",
  path: "/faqs",
});

export default function FaqsPage() {
  const groups = [...new Set(faqs.map((f) => f.group))];
  return (
    <main className="pb-24">
      <JsonLd data={[faqLd(faqs), breadcrumbLd([{ name: "FAQs", path: "/faqs" }])]} />
      <LegalHeader title="Frequently asked questions" intro="Everything about access, certificates, plans, and payment." />
      <div className="wrap mt-20 space-y-20">
        {groups.map((g) => (
          <section key={g} className="grid gap-6 lg:grid-cols-[1fr_2.4fr] lg:gap-16">
            <h2 className="heading t-h3 text-ink">{g}</h2>
            <Accordion items={faqs.filter((f) => f.group === g)} />
          </section>
        ))}
        <p className="text-[17px] text-ink-2">
          Still have a question?{" "}
          <Link href="/contact-us" className="link-red">
            Contact us
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
