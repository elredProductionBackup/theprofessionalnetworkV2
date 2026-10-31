import CoursePage from "@/components/course/CoursePage";
import DeepLinkScroll from "@/components/fx/DeepLinkScroll";
import JsonLd from "@/components/seo/JsonLd";
import { quantitativeIntuition as course, faqs } from "@/data/courses";
import { pageMetadata, courseLd, faqLd, breadcrumbLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `Quantitative Intuition course with ${course.professor.name}`,
  description: `${course.summary} Online leadership course, ${course.facts[0].value}, with a certificate of completion.`,
  path: course.href,
});

export default function ViewDetailsPage() {
  return (
    <>
      <JsonLd data={[courseLd(course), faqLd(faqs), breadcrumbLd([{ name: course.shortTitle, path: course.href }])]} />
      <DeepLinkScroll />
      <CoursePage course={course} />
    </>
  );
}
