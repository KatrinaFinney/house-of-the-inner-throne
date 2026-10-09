import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getRitualFoundation,
  ritualFoundations,
} from "@/components/ritual-foundations/ritualFoundations";

type FoundationPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ritualFoundations.map((item) => ({
    slug: item.href.split("/").pop()!,
  }));
}

export async function generateMetadata({ params }: FoundationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const foundation = getRitualFoundation(slug);
  return foundation
    ? { title: foundation.title, description: foundation.body }
    : { title: "Ritual Foundation" };
}

export default async function FoundationPage({ params }: FoundationPageProps) {
  const { slug } = await params;
  const foundation = getRitualFoundation(slug);
  if (!foundation) notFound();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#171510_0%,#0b0b09_45%,#060606_100%)] px-6 py-24 text-(--text)">
      <article className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.35em] text-(--gold)">Ritual Foundations</p>
        <h1 className="mt-5 text-5xl leading-tight sm:text-6xl">{foundation.title}</h1>
        <p className="mt-7 text-xl leading-9 text-(--muted)">{foundation.body}</p>
        <div className="mt-10 rounded-[1.8rem] border border-[rgba(202,169,107,0.14)] bg-white/[0.04] p-7">
          <p className="text-xs uppercase tracking-[0.3em] text-(--gold)">The foundation</p>
          <p className="mt-5 text-lg leading-8 text-(--muted)">
            Approach the material with clear intention, patient observation, and respect for the living traditions from which ritual knowledge emerges. Begin simply. Record what you prepare, why you prepare it, and what changes through consistent practice.
          </p>
          <p className="mt-5 text-lg leading-8 text-(--muted)">
            No instrument replaces discernment. The purpose of a foundation is to make practice more conscious, responsible, and exact.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href={`${foundation.href}/full-guide`} className="rounded-full bg-(--gold) px-7 py-3 text-sm uppercase tracking-[0.14em] text-black">Open the Full Guide</Link>
          <Link href="/ritual-foundations" className="rounded-full border border-white/20 px-7 py-3 text-sm uppercase tracking-[0.14em]">All Foundations</Link>
        </div>
      </article>
    </main>
  );
}
