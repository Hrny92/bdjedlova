import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ContactModalProvider } from "@/context/ContactModalContext";
import ContactModal             from "@/components/ContactModal";
import CookieBanner             from "@/components/CookieBanner";
import ChatBot                  from "@/components/ChatBot";
import SEOSchema                from "@/components/SEOSchema";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = "https://jedlova-plzen.cz";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  verification: {
    google: "uOHFzOPUWseplKllKNje4TG7fDgRtPOv-1IfalGVId0",
  },

  title: {
    default: "BD Jedlová — Prémiové bydlení v centru Plzně",
    template: "%s | BD Jedlová Plzeň",
  },
  description:
    "Bytový dům Jedlová — 8 prémiových bytů k prodeji v centru Plzně. Dispozice 1+kk až 3+kk penthouse. Ceny od 3 530 000 Kč (125 000 Kč/m²). Tmavá lícová cihla, terasy, kryté parkování. Kontakt: +420 723 117 023.",

  keywords: [
    "bytový dům Plzeň",
    "novostavba centrum Plzeň",
    "byty k prodeji Plzeň",
    "BD Jedlová",
    "Jedlová Plzeň",
    "3+kk Plzeň centrum",
    "1+kk Plzeň",
    "penthouse Plzeň",
    "prémiové bydlení Plzeň",
    "nové byty Plzeň centrum",
    "byty novostavba Plzeň 2025",
    "investiční byt Plzeň",
    "bytový dům centrum Plzně",
    "lícová cihla architektura Plzeň",
    "cena bytu Plzeň centrum",
  ],

  authors: [{ name: "BD Jedlová", url: BASE_URL }],
  creator: "BD Jedlová",
  publisher: "BD Jedlová",

  alternates: {
    canonical: BASE_URL,
    languages: { "cs-CZ": BASE_URL },
    // bytyjedlova.cz je alias — canonical vždy ukazuje na jedlova-plzen.cz
  },

  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: BASE_URL,
    siteName: "BD Jedlová",
    title: "BD Jedlová — 8 prémiových bytů v centru Plzně",
    description:
      "Bytový dům Jedlová: 8 bytů (1+kk až penthouse 3+kk), 125 000 Kč/m², kryté parkování, terasy. Centrum Plzně. Kontakt: +420 723 117 023.",
    images: [
      {
        url: "/images/gallery/exterier-1.webp",
        width: 1200,
        height: 630,
        alt: "BD Jedlová — bytový dům v centru Plzně, fasáda z tmavé lícové cihly",
      },
      {
        url: "/images/gallery/exterier-2.webp",
        width: 1200,
        height: 800,
        alt: "BD Jedlová — pohled na fasádu z tmavé lícové cihly a dřevěných lamel",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "BD Jedlová — Prémiové bydlení v centru Plzně",
    description: "8 prémiových bytů od 3 530 000 Kč. Centrum Plzně. Lícová cihla, terasy, parkování.",
    images: ["/images/gallery/exterier-1.webp"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "real estate",

  other: {
    // Geo meta tagy — lokalizační signály pro vyhledávače a AI
    "geo.region":       "CZ-PL",
    "geo.placename":    "Plzeň, Česká republika",
    "geo.position":     "49.7478;13.3775",
    "ICBM":             "49.7478, 13.3775",
    // Jazykové a regionální signály
    "content-language": "cs",
    // AI/LLM specifické meta
    "robots":           "index, follow, max-snippet:-1, max-image-preview:large",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
        {/* Strukturovaná data — SEO + GEO pro AI vyhledávače */}
        <SEOSchema />
      </head>
      <body>
        <ContactModalProvider>
          {children}
          <ContactModal />
          <CookieBanner />
          <ChatBot />
        </ContactModalProvider>
      </body>
    </html>
  );
}
