import { pageMetadata, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";
import LegalDoc from "@/components/legal/LegalDoc";
import { SITE } from "@/data/site";

export const metadata = pageMetadata({
  title: "Cancellation & Refund Policy",
  description: "When you can cancel an online course purchase, when refunds apply, and how to request one.",
  path: "/cancellation-and-refund",
});

const SECTIONS = [
  {
    id: "overview",
    title: "Overview",
    body: [
      "Our courses are digital and access is delivered as soon as payment is confirmed. Because of this, purchases are final once access has been granted, except in the situations described below. Nothing in this policy limits any refund you are entitled to under applicable law.",
    ],
  },
  {
    id: "eligible",
    title: "When you can get a refund",
    body: [
      {
        list: [
          { lead: "Duplicate payment:", t: "if you were charged more than once for the same purchase, we refund the extra payment in full." },
          { lead: "Access not delivered:", t: "if you paid but we're unable to give you access to the course, and we can't fix it within 7 days of you telling us, we refund the purchase in full." },
          { lead: "Course withdrawn:", t: "if we withdraw a course before your access period ends, we refund a fair amount for the unused portion, or offer access to another course if you prefer." },
        ],
      },
    ],
  },
  {
    id: "not-eligible",
    title: "When refunds don't apply",
    body: [
      {
        list: [
          "You change your mind after access has been granted.",
          "You didn't watch the course, or didn't finish it, within your access period.",
          "Your access was suspended for breaking our Terms of Use, such as sharing access details.",
          "Problems caused by your own device, browser, or internet connection.",
        ],
      },
    ],
  },
  {
    id: "cancelling",
    title: "Cancelling a purchase",
    body: [
      "If your payment is still pending, or you completed checkout by mistake and haven't yet received access, write to us straight away. If access hasn't been granted, we'll cancel the purchase and refund you in full.",
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise plans",
    body: [
      "Enterprise plans are treated as one purchase. Learners can't be removed for a partial refund once access has been granted. Before access has been granted, you may change the named Learners by writing to us.",
    ],
  },
  {
    id: "how-to",
    title: "How to request a refund",
    body: [
      <>
        Email{" "}
        <a href={`mailto:${SITE.email}?subject=Refund%20request`} className="link-red">
          {SITE.email}
        </a>{" "}
        with the subject &ldquo;Refund request&rdquo;, your registered email address, the transaction ID, and the
        reason for your request. We aim to respond within 2 business days.
      </>,
    ],
  },
  {
    id: "processing",
    title: "How refunds are paid",
    body: [
      "Approved refunds are made to the original payment method and are usually initiated within 7–10 business days of approval. The time for the amount to reach your account then depends on your bank or card issuer and the payment provider.",
    ],
  },
  {
    id: "contact",
    title: "Questions",
    body: [
      <>
        See our{" "}
        <Link href="/terms-and-conditions" className="link-red">
          Terms of Use
        </Link>{" "}
        or{" "}
        <Link href="/contact-us" className="link-red">
          contact us
        </Link>
        .
      </>,
    ],
  },
];

export default function RefundPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Cancellation & Refund Policy", path: "/cancellation-and-refund" }])} />
    <LegalDoc
      title="Cancellation & Refund"
      updated="15 October 2026"
      intro="When you can cancel a course purchase, when you can get your money back, and how to ask."
      sections={SECTIONS}
    />
    </>
  );
}
