import type { Metadata } from "next";
import { PillarPageTemplate } from "@/components/pillars/PillarPageTemplate";
import { pillars } from "@/components/pillars/pillars";

export const metadata: Metadata = { title: "Prosperity", description: pillars.prosperity.subtitle };

export default function ProsperityPage() {
  return <PillarPageTemplate {...pillars.prosperity} />;
}
