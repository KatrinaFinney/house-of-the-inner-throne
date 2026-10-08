import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { siteUrl } from "@/lib/site";
import { SiteFooter } from "@/components/SiteFooter";

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
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
