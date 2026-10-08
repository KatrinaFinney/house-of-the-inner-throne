import type { Metadata } from "next";
import { PillarPageTemplate } from "@/components/pillars/PillarPageTemplate";
import { pillars } from "@/components/pillars/pillars";

export const metadata: Metadata = { title: "Power", description: pillars.power.subtitle };

export default function PowerPage() {
  return <PillarPageTemplate {...pillars.power} />;
}
