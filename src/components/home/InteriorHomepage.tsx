"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BeginWithinSection } from "./BeginWithinSection";
import { DailyDedicationSection } from "./DailyDedicationSection";
import { FoundingListSection } from "./FoundingListSection";
import { StorehouseSection } from "./StorehouseSection";
import { RitualFoundationsSection } from "./RitualFoundationsSection";
import { IncenseSmoke } from "./IncenseSmoke";
import { SovereigntyArchiveSection } from "./SovereigntyArchiveSection";
import { track } from "@vercel/analytics";

const pillars = [
  {
    title: "Protection",
    body: "Protection preserves freedom. Sacred boundaries strengthen authority and keep the inner throne undisturbed.",
    href: "/pillars/protection",
  },
  {
    title: "Power",
    body: "Power restores inner authority. When the spirit is seated, authority follows.",
    href: "/pillars/power",
  },
  {
    title: "Prosperity",
    body: "Prosperity opens a rightful relationship with increase, circulation, stewardship, and enoughness.",
    href: "/pillars/prosperity",
  },
];

export function InteriorHomepage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#171510_0%,#0b0b09_38%,#060606_100%)] text-(--text)">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,180,111,0.08),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-168 w-px -translate-x-1/2 bg-[linear-gradient(180deg,rgba(202,169,107,0.22),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.55))]" />

      <section className="relative flex min-h-screen items-center px-6 py-20 md:py-24">
        <IncenseSmoke />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="relative max-w-2xl"
          >
            <div className="mb-8 h-px w-24 bg-[linear-gradient(90deg,rgba(202,169,107,0.7),rgba(202,169,107,0.08))]" />

            <p className="text-[10px] uppercase tracking-[0.38em] text-(--gold) sm:text-xs">
              Welcome to the Shrine
            </p>

            <h1
              data-shrine-interior-heading
              tabIndex={-1}
              className="mt-5 text-[2.9rem] leading-[0.92] outline-none sm:text-[3.8rem] md:text-[4.7rem] lg:text-[5.4rem]"
            >
              Shrine of the Inner Throne
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-(--muted) sm:text-lg">
              A sacred digital space for the throne within. Return to spiritual
              sovereignty, ancestral remembrance, ritual intelligence, and a
              rightful relationship with increase.
            </p>

            <p className="mt-4 max-w-xl text-base leading-8 text-(--muted)">
              The Archive holds 44 manuscripts across four volumes. Begin at the
              threshold, follow a pillar, or receive the teaching that calls your
              attention.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#begin-within"
                onClick={() => track("begin_within_opened", { source: "home_hero" })}
                className="inline-flex min-w-55 items-center justify-center rounded-full border border-(--gold) bg-(--gold) px-7 py-3 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-black shadow-[0_8px_30px_rgba(202,169,107,0.18)] transition hover:brightness-[1.04]"
              >
                Begin Within
              </Link>

              <Link
                href="/archive"
                onClick={() => track("archive_opened", { source: "home_hero" })}
                className="inline-flex min-w-55 items-center justify-center rounded-full border border-[rgba(202,169,107,0.28)] bg-white/3 px-7 py-3 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-(--text) transition hover:bg-white/6"
              >
                Explore the Archive
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="relative rounded-4xl border border-[rgba(202,169,107,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-6"
          >
            <div className="pointer-events-none absolute inset-3 rounded-[1.6rem] border border-white/6" />

            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.34em] text-(--gold) sm:text-xs">
                The Three Pillars
              </p>

              <div className="mt-5 space-y-4">
                {pillars.map((pillar) => (
                  <Link
                    key={pillar.title}
                    href={pillar.href}
                    onClick={() => track("pillar_selected", { pillar: pillar.title })}
                    className="block rounded-[1.4rem] border border-[rgba(202,169,107,0.1)] bg-[linear-gradient(180deg,rgba(0,0,0,0.22),rgba(0,0,0,0.12))] px-5 py-5 transition hover:bg-white/[0.04] md:px-6"
                  >
                    <p className="mb-2 text-[10px] uppercase tracking-[0.32em] text-(--gold)/80">
                      Pillar
                    </p>
                    <h3 className="text-[1.9rem] leading-none">{pillar.title}</h3>
                    <p className="mt-3 max-w-md text-[15px] leading-7 text-(--muted)">
                      {pillar.body}
                    </p>
                    <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-(--gold)">
                      Enter {pillar.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div id="begin-within" className="scroll-mt-24">
        <BeginWithinSection />
      </div>
      <SovereigntyArchiveSection />
      <FoundingListSection />
      <RitualFoundationsSection />
      <StorehouseSection />
      <DailyDedicationSection />
    </main>
  );
}
