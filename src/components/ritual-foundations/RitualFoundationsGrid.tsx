"use client";

import Link from "next/link";

type RitualFoundationItem = {
  title: string;
  body: string;
  href: string;
  guideHref: string;
};

type RitualFoundationsGridProps = {
  items: readonly RitualFoundationItem[];
};

export function RitualFoundationsGrid({ items }: RitualFoundationsGridProps) {
  return (
    <section className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article key={item.title} className="rounded-[2rem] border border-[rgba(202,169,107,0.12)] bg-white/[0.04] p-4">
          <div className="flex h-full flex-col rounded-[1.5rem] border border-[rgba(202,169,107,0.14)] bg-black/20 p-7">
            <h2 className="text-3xl leading-tight">{item.title}</h2>
            <p className="mt-4 flex-1 text-base leading-8 text-(--muted)">{item.body}</p>
            <div className="mt-8 flex flex-col gap-3">
              <Link href={item.href} className="inline-flex w-fit rounded-full border border-(--gold) bg-(--gold) px-5 py-2.5 text-sm uppercase tracking-[0.12em] text-black transition hover:brightness-[1.04]">Read Introduction</Link>
              <Link href={item.guideHref} className="inline-flex w-fit rounded-full border border-white/15 px-5 py-2.5 text-sm uppercase tracking-[0.12em] text-(--text) transition hover:bg-white/5">Receive Full Guide</Link>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
