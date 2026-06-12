import { ImageResponse } from "next/og";

export const alt = "Tony — 3D Motion Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0D0B08 0%, #1A150E 100%)",
          color: "#F0E6D6",
          fontFamily: "sans-serif",
          padding: 60,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginBottom: 16,
            color: "#F0A500",
          }}
        >
          Tony
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            opacity: 0.8,
            textAlign: "center",
            maxWidth: 600,
            lineHeight: 1.4,
          }}
        >
          3D Motion Designer & CGI Generalist
        </div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 16,
            fontSize: 14,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            opacity: 0.5,
          }}
        >
          Cinematic · Stylized · AI-Accelerated
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}