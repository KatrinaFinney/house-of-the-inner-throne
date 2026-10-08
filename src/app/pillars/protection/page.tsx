import type { Metadata } from "next";
import { PillarPageTemplate } from "@/components/pillars/PillarPageTemplate";
import { pillars } from "@/components/pillars/pillars";

export const metadata: Metadata = { title: "Protection", description: pillars.protection.subtitle };

export default function ProtectionPage() {
  return <PillarPageTemplate {...pillars.protection} />;
}
