import { Suspense } from "react";
import { Geist, Geist_Mono, Inter, Inter_Tight, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { brittany } from "./fonts";
import FaqPopup from "@/components/FaqPopup"; 
import ApplyPopup from "@/components/ApplyPopup"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
})


const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  metadataBase: new URL("https://theprofessionalnetwork.vercel.app"),

  title: "Professional Network",
  description: "A network of ambitious professionals",

  openGraph: {
    title: "Professional Network",
    description: "A network of ambitious professionals",
    url: "https://theprofessionalnetwork.vercel.app",
    siteName: "Professional Network",

    images: [
      {
        url: "https://theprofessionalnetwork.vercel.app/assets/og.webp",
        width: 1200,
        height: 630,
        alt: "Professional Network",
      },
    ],

    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Professional Network",
    description: "A network of ambitious professionals",
    images: ["https://theprofessionalnetwork.vercel.app/assets/og.webp"],
  },
};

import HomeButton from "@/components/HomeButton";
import RefreshRedirect from "@/components/RefreshRedirect";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${brittany.variable} ${geistSans.variable} ${geistMono.variable} ${inter.variable} ${interTight.variable} ${playfair.variable} antialiased`}
        >

        <Suspense fallback={null}><RefreshRedirect/></Suspense>
        <Navbar/>
        {children}
        <Footer/>
        <FaqPopup/>
        <ApplyPopup/>
        <HomeButton/>
      </body>
    </html>
  );
}
