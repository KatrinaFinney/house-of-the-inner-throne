import { Suspense } from "react";
import { ShrineGate } from "@/components/gate/ShrineGate";

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <ShrineGate />
    </Suspense>
  );
}
