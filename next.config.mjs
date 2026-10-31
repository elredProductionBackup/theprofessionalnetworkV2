import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    qualities: [75, 100],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
  },
  // Pages removed in the move from membership to online courses.
  async redirects() {
    return [
      { source: "/governing-charter", destination: "/terms-and-conditions", permanent: true },
      { source: "/view-details/:slug", destination: "/view-details", permanent: false },
      { source: "/career", destination: "/about", permanent: false },
      { source: "/sessions&clips", destination: "/#event-videos", permanent: false },
      { source: "/courses/quantitative-intuition", destination: "/view-details", permanent: false },
    ];
  },
};

export default nextConfig;
