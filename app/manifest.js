import { SITE } from "@/data/site";

export default function manifest() {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f5f4",
    theme_color: "#f5f5f4",
    icons: [{ src: "/icon.png", sizes: "any", type: "image/png" }],
  };
}
