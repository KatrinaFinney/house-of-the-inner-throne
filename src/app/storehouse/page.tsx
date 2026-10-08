import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Storehouse",
  description:
    "Ritual instruments prepared to support offering, remembrance, devotion, and disciplined sacred work.",
};

const offerings = [
  ["ancestor-currency", "Ancestor Currency"],
  ["petition-papers", "Petition Papers"],
  ["temple-candles", "Temple Candles"],
  ["ritual-kits", "Ritual Kits"],
  ["curated-incense", "Curated Incense"],
  ["fire-safe-bowls", "Fire-Safe Bowls"],
  ["cauldrons-and-burners", "Cauldrons and Burners"],
  ["prayer-journals", "Prayer Journals"],
  ["altar-tools", "Altar Tools"],
  ["offering-bowls", "Offering Bowls"],
  ["honey-jar-supports", "Honey Jar Supports"],
] as const;

export default function StorehousePage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#171510_0%,#0b0b09_45%,#060606_100%)] px-6 py-24 text-(--text)">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.35em] text-(--gold)">
          The Storehouse
        </p>
        <h1 className="mt-5 max-w-4xl text-5xl leading-tight sm:text-6xl">
          Instruments prepared with intention.
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-(--muted)">
          The Storehouse is being prepared slowly and carefully. Its instruments
          will support practice without standing in place of discipline,
          attention, or spiritual relationship.
        </p>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-(--muted)">
          Join the founding list to receive the first word when offerings become
          available.
        </p>

        <section className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Planned Storehouse offerings">
          {offerings.map(([id, title]) => (
            <article
              id={id}
              key={id}
              className="scroll-mt-8 rounded-[1.6rem] border border-[rgba(202,169,107,0.14)] bg-white/[0.04] p-6"
            >
              <p className="text-[10px] uppercase tracking-[0.28em] text-(--gold)">
                In preparation
              </p>
              <h2 className="mt-3 text-2xl">{title}</h2>
            </article>
          ))}
        </section>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/?interior=1#founding-list" className="rounded-full bg-(--gold) px-7 py-3 text-sm uppercase tracking-[0.14em] text-black">
            Join the Founding List
          </Link>
          <Link href="/?interior=1" className="rounded-full border border-white/20 px-7 py-3 text-sm uppercase tracking-[0.14em]">
            Return to the Shrine
          </Link>
        </div>
      </div>
    </main>
  );
}
