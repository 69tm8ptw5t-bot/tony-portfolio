import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tony — 3D Motion Designer",
    short_name: "Tony",
    description:
      "3D Motion Designer and CGI Generalist — Cinematic, Stylized & AI-Accelerated Production.",
    start_url: "/",
    display: "standalone",
    background_color: "#0D0B08",
    theme_color: "#0D0B08",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}