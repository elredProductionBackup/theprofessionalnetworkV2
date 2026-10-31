import { pageMetadata, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";
import LegalDoc from "@/components/legal/LegalDoc";
import { SITE } from "@/data/site";

export const metadata = pageMetadata({
  title: "Shipping & Delivery Policy",
  description: "Our courses are delivered online. How and when you receive access after payment.",
  path: "/shipping-and-exchange",
});

const SECTIONS = [
  {
    id: "digital",
    title: "Digital products only",
    body: [
      "Everything we sell is an online course delivered over the internet. We don't sell or ship physical goods, so no shipping charges apply. Any reference to shipping in a payment or checkout flow doesn't apply to our courses.",
    ],
  },
  {
    id: "delivery",
    title: "How you receive your course",
    body: [
      "Once your payment is confirmed, we send your access details to the email address you registered with. The course streams online, so there's nothing to download or install.",
      {
        list: [
          { lead: "Usually within minutes:", t: "most learners receive their access email shortly after payment." },
          { lead: "At most 24–48 hours:", t: "occasionally confirmation from the payment provider takes longer. If you have not received access within 48 hours, please contact us." },
        ],
      },
      "Please check your spam or promotions folder before writing to us, and make sure the email address you entered at checkout is correct.",
    ],
  },
  {
    id: "access-period",
    title: "Access period",
    body: [
      "Your access period starts on the date of purchase and is shown on the course page (currently 3 months). For Enterprise plans, each registered Learner receives their own access email.",
    ],
  },
  {
    id: "certificates",
    title: "Certificates",
    body: ["Certificates of completion are digital and are made available to download once you complete the course. No printed certificate is shipped."],
  },
  {
    id: "exchange",
    title: "Exchanges",
    body: [
      <>
        Because courses are digital, they can&apos;t be returned or exchanged once access has been granted. If something has
        gone wrong with your purchase, see our{" "}
        <Link href="/cancellation-and-refund" className="link-red">
          Cancellation &amp; Refund Policy
        </Link>{" "}
        or write to{" "}
        <a href={`mailto:${SITE.email}`} className="link-red">
          {SITE.email}
        </a>
        .
      </>,
    ],
  },
];

export default function ShippingPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Shipping & Delivery Policy", path: "/shipping-and-exchange" }])} />
    <LegalDoc
      title="Shipping & Delivery"
      updated="15 October 2026"
      intro="Our courses are delivered online. Here's how and when you get access."
      sections={SECTIONS}
    />
    </>
  );
}
