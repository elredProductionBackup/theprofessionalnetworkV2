import "@fontsource-variable/geist/wght.css";
import "./globals.css";

import Script from "next/script";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ApplyPopup from "@/components/ApplyPopup";
import SmoothScroll from "@/components/fx/SmoothScroll";
import Reveal from "@/components/fx/Reveal";
import ViewCursor from "@/components/fx/ViewCursor";
import MetaPixel from "@/components/MetaPixel";
import LinkedinInsight from "@/components/LinkedinInsight";
import JsonLd from "@/components/seo/JsonLd";
import { SITE } from "@/data/site";
import { organizationLd, websiteLd } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Online courses from world-class professors`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: SITE.keywords,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.company,
  category: "education",
  alternates: { canonical: SITE.url },
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: {
    google: "DLkptU6iMYGB3h5mKKA1cKoqUv0QkTSM3_pNBJL7AbA",
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
    url: SITE.url,
    title: SITE.name,
    description: SITE.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@TheProfNetwork",
    title: SITE.name,
    description: SITE.description,
    images: [SITE.ogImage],
  },
};

export const viewport = {
  themeColor: "#f6f6f5",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <MetaPixel />
        <SmoothScroll />
        <Reveal />
        <ViewCursor />

        <Navbar />
        <div id="main">{children}</div>
        <Footer />

        {/* Checkout form — opened from any "Enroll" button */}
        <ApplyPopup />

        <LinkedinInsight />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-9T6P0J7FS0" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9T6P0J7FS0');
          `}
        </Script>
      </body>
    </html>
  );
}
