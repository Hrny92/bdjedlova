import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ContactModalProvider } from "@/context/ContactModalContext";
import ContactModal             from "@/components/ContactModal";
import CookieBanner             from "@/components/CookieBanner";
import ChatBot                  from "@/components/ChatBot";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BD Jedlová — Prémiové bydlení v centru Plzně",
  description:
    "Bytový dům Jedlová — 8 prémiových bytů od 1+kk po 3+kk penthouse v centru Plzně. Architektura od Project Studio 8. Tmavá lícová cihla, dřevo, beton.",
  keywords: "bytový dům, Plzeň, novostavba, byty, Jedlová, centrum",
  openGraph: {
    title: "BD Jedlová — Plzeň",
    description: "8 prémiových bytů v centru Plzně. Bydlení s charakterem.",
    type: "website",
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
