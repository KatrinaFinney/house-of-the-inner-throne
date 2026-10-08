import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { siteUrl } from "@/lib/site";
import { SiteFooter } from "@/components/SiteFooter";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Shrine of the Inner Throne",
    template: "%s | Shrine of the Inner Throne",
  },
  description:
    "A sacred digital shrine of ritual sovereignty, ancestral remembrance, protection, power, and prosperity.",
  applicationName: "Shrine of the Inner Throne",
  openGraph: {
    type: "website",
    siteName: "Shrine of the Inner Throne",
    title: "Shrine of the Inner Throne",
    description:
      "A sacred digital shrine of ritual sovereignty, ancestral remembrance, protection, power, and prosperity.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shrine of the Inner Throne",
    description:
      "A sacred digital shrine of ritual sovereignty, ancestral remembrance, protection, power, and prosperity.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable}`}>
      <body>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
