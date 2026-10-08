import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Daily Dedication",
  description:
    "A daily fire offering of ancestor money and petitions for protection, power, prosperity, remembrance, and aligned purpose.",
};

export default function DailyDedicationPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#171510_0%,#0b0b09_45%,#060606_100%)] px-6 py-24 text-(--text)">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.35em] text-(--gold)">Daily Dedication</p>
        <h1 className="mt-5 text-5xl leading-tight sm:text-6xl">A shared fire, offered with purpose.</h1>
        <p className="mt-7 text-xl leading-9 text-(--muted)">
          Daily Dedication is the Shrine’s recurring fire offering. Ancestor
          money and written petitions are offered for changing intentions:
          protection, power, prosperity, remembrance, clarity, gratitude, and
          the needs named by the community.
        </p>
        <p className="mt-6 text-lg leading-8 text-(--muted)">
          Notices and the day’s appointed intention will be shared through the
          Shrine’s social channels as they open. Until then, the founding list
          is the surest way to remain close to the rite.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/?interior=1#founding-list" className="rounded-full bg-(--gold) px-7 py-3 text-sm uppercase tracking-[0.14em] text-black">
            Remain Close
          </Link>
          <Link href="/?interior=1" className="rounded-full border border-white/20 px-7 py-3 text-sm uppercase tracking-[0.14em]">
            Return to the Shrine
          </Link>
        </div>
      </div>
    </main>
  );
}
