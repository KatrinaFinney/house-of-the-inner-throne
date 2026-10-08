import { ShrineGate } from "@/components/gate/ShrineGate";

type HomePageProps = {
  searchParams: Promise<{ interior?: string }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const { interior } = await searchParams;

  return <ShrineGate initialOpen={interior === "1"} />;
}
