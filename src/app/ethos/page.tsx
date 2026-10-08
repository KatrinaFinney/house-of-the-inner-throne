import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ethos of the Shrine",
  description: "The principles of sovereignty, cultural care, privacy, and discernment that guide Shrine of the Inner Throne.",
};

const principles = [
  ["Sovereignty before dependence", "The Shrine offers teachings and instruments for reflection and practice. Authority remains with the person who enters."],
  ["Cultural care", "The work is grounded in ancestral remembrance and approaches African-diasporic spiritual traditions with respect, context, and restraint."],
  ["Privacy is sacred", "Petitions, personal intentions, and private spiritual work are never treated as spectacle. Public teaching does not expose the altar."],
  ["Practice without promises", "Ritual can focus attention, strengthen relationship, and support purposeful action. The Shrine does not guarantee spiritual, financial, medical, or legal outcomes."],
  ["Teach first", "The Archive carries doctrine. Ritual Foundations prepare the hands. The Storehouse supports the work without becoming its center."],
] as const;

export default function EthosPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#171510_0%,#0b0b09_45%,#060606_100%)] px-6 py-20 text-(--text)">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.35em] text-(--gold)">Ethos of the Shrine</p>
        <h1 className="mt-5 max-w-4xl text-5xl leading-[1.02] sm:text-6xl">Enter with discernment. Leave with your authority intact.</h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-(--muted)">
          Shrine of the Inner Throne is a faceless digital sanctuary for spiritual sovereignty, ancestral remembrance, ritual intelligence, and a rightful relationship with increase. It is made primarily with Black and African-diasporic seekers in mind and remains open to respectful visitors.
        </p>

        <section className="mt-14 grid gap-5 md:grid-cols-2" aria-label="Guiding principles">
          {principles.map(([title, body]) => (
            <article key={title} className="rounded-[1.6rem] border border-[rgba(202,169,107,0.16)] bg-white/[0.04] p-7">
              <h2 className="text-2xl">{title}</h2>
              <p className="mt-4 leading-7 text-(--muted)">{body}</p>
            </article>
          ))}
        </section>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/archive" className="rounded-full bg-(--gold) px-7 py-3 text-sm uppercase tracking-[0.14em] text-black">Enter the Archive</Link>
          <Link href="/?interior=1" className="rounded-full border border-white/20 px-7 py-3 text-sm uppercase tracking-[0.14em]">Return to the Shrine</Link>
        </div>
      </div>
    </main>
  );
}
