import Link from "next/link";
import Accordion from "@/components/ui/Accordion";
import { faqs } from "@/data/courses";

export default function FaqBlock({ limit = 5, title = "Questions, answered" }) {
  return (
    <section className="section border-t border-line">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-24">
        <div data-reveal>
          <h2 className="heading t-h2 text-ink">{title}</h2>
          <p className="mt-5 text-[16px] leading-relaxed text-ink-2">
            More in{" "}
            <Link href="/faqs" className="link-red">all FAQs</Link>, or{" "}
            <Link href="/contact-us" className="link-red">contact us</Link>.
          </p>
        </div>
        <div data-reveal style={{ "--reveal-delay": "100ms" }}>
          <Accordion items={faqs.slice(0, limit)} />
        </div>
      </div>
    </section>
  );
}
