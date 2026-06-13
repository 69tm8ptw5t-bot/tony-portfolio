import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LanguageProvider from "@/components/LanguageProvider";
import ThemeProvider from "@/components/ThemeProvider";
import LayoutShell from "@/components/LayoutShell";
import { Analytics } from "@vercel/analytics/next";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tonydarko.work"),
  title: "Tony — 3D Motion Designer",
  description:
    "Cinematic · Stylized · AI-Accelerated Production. 25M views. 1st Place Iberoamerican CryptoArt. Speaker NFT Barcelona.",
  manifest: "/manifest",
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Tony — 3D Motion Designer",
    description:
      "3D Motion Designer and CGI Generalist — Cinematic, Stylized & AI-Accelerated Production.",
    type: "website",
    locale: "en_US",
    siteName: "Tony Portfolio",
    images: [
      {
        url: "/images/miniatura.png",
        width: 1200,
        height: 630,
        alt: "Tony Darko — 3D Motion Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tony — 3D Motion Designer",
    description:
      "Cinematic · Stylized · AI-Accelerated Production. 25M+ views.",
    images: ["/images/miniatura.png"],
  },
  alternates: {
    languages: {
      en: "/",
      es: "/",
      ru: "/",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <ThemeProvider>
          <LanguageProvider>
            <LayoutShell>{children}</LayoutShell>
          </LanguageProvider>
        </ThemeProvider>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="41190d75-0502-41c1-9493-a36e00ced6e1"
          strategy="afterInteractive"
        />
        <Analytics />
      </body>
    </html>
  );
}