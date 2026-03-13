import { TempleGate } from "@/components/gate/TempleGate";
import { Suspense } from "react";

export default function HomePage() {
  return 
  <Suspense fallback={null}>
      <TempleGate />
    </Suspense>
}