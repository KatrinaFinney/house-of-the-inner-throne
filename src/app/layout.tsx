import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/cinzel";
import "@fontsource-variable/cormorant-garamond";
import "./globals.css";
import { siteUrl } from "@/lib/site";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Analytics } from "@vercel/analytics/next";

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
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
