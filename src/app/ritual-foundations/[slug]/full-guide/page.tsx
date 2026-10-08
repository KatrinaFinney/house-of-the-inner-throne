import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getRitualFoundation,
  ritualFoundations,
} from "@/components/ritual-foundations/ritualFoundations";

type FullGuidePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ritualFoundations.map((item) => ({
    slug: item.href.split("/").pop()!,
  }));
}

export async function generateMetadata({ params }: FullGuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const foundation = getRitualFoundation(slug);
  return foundation
    ? { title: `${foundation.title} Full Guide`, description: `Receive the forthcoming ${foundation.title} ritual-foundation guide.` }
    : { title: "Full Guide" };
}

export default async function FullGuidePage({ params }: FullGuidePageProps) {
  const { slug } = await params;
  const foundation = getRitualFoundation(slug);
  if (!foundation) notFound();

  return (
    <main className="flex min-h-screen items-center bg-[linear-gradient(180deg,#171510_0%,#0b0b09_60%,#060606_100%)] px-6 py-24 text-(--text)">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-(--gold)">Full Guide · In Preparation</p>
        <h1 className="mt-5 text-5xl leading-tight sm:text-6xl">{foundation.title}</h1>
        <p className="mt-7 text-lg leading-8 text-(--muted)">
          The complete guide is being prepared for the founding list. Join to receive release notice and return to the shorter foundation while the deeper work is arranged.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/?interior=1#founding-list" className="rounded-full bg-(--gold) px-7 py-3 text-sm uppercase tracking-[0.14em] text-black">Join the Founding List</Link>
          <Link href={foundation.href} className="rounded-full border border-white/20 px-7 py-3 text-sm uppercase tracking-[0.14em]">Read the Foundation</Link>
        </div>
      </div>
    </main>
  );
}
