import localFont from "next/font/local";

export const brittany = localFont({
  src: [
    {
      path: "../public/fonts/BrittanySignature.woff2", // or .ttf
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-brittany",
  display: "swap",
});