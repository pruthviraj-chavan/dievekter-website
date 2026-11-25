import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "dieVekter — Software Solutions & Study Abroad Consultancy",
    short_name: "dieVekter",
    description:
      "Technology Solutions (websites, mobile apps, custom software, AI agents, CRM & business automation) and Study Abroad Consultancy across Radhanagari, Kolhapur, Phondaghat and global clients.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#FF5422",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/dievektor_logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
