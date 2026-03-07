import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

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
  title: "House of the Inner Throne",
  description: "Temple of protection, power, and prosperity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}