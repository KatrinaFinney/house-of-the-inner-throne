"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PathOfSovereignty } from "./PathOfSovereignty";
import { DailyDedicationSection } from "./DailyDedicationSection";
import { RitualToolsSection } from "./RitualToolsSection";
import { IncenseSmoke } from "./IncenseSmoke";
import { SovereigntyArchiveSection } from "./SovereigntyArchiveSection";

export function InteriorHomepage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#1a1813_0%,#0b0b09_35%,#070707_100%)] text-[var(--text)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,240,200,0.08),transparent_25%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]" />

      <section className="relative flex min-h-screen items-center justify-center px-6 py-20 md:py-24">
        <IncenseSmoke />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 md:gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-2xl"
          >
            <p className="text-[10px] uppercase tracking-[0.38em] text-[var(--gold)] sm:text-xs">
              Welcome to the House
            </p>

            <h1 className="mt-4 text-[2.8rem] leading-[0.94] sm:text-[3.6rem] md:text-[4.4rem] lg:text-[5rem]">
              House of the Inner Throne
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
              Discover the seat of your spirit.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/archive"
                className="inline-flex min-w-[210px] items-center justify-center rounded-full border border-[var(--gold)] bg-[var(--gold)] px-7 py-3 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-black shadow-[0_8px_30px_rgba(202,169,107,0.18)] transition hover:brightness-[1.04]"
              >
                Enter the Archive
              </Link>

              <Link
                href="/ritual-tools"
                className="inline-flex min-w-[210px] items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-[var(--text)] transition hover:bg-white/10"
              >
                Explore Ritual Tools
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm md:p-6"
          >
            <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--gold)] sm:text-xs">
              The Three Pillars
            </p>

            <div className="mt-5 space-y-4 md:space-y-5">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <h3 className="text-xl">Protection</h3>
                <p className="mt-2 text-[var(--muted)]">
                  Protection is the foundation of power. Sacred boundaries
                  strengthen authority.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <h3 className="text-xl">Power</h3>
                <p className="mt-2 text-[var(--muted)]">
                  Power is the fruit of sovereignty. When the spirit is seated,
                  authority follows.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <h3 className="text-xl">Prosperity</h3>
                <p className="mt-2 text-[var(--muted)]">
                  Prosperity is the expression of spiritual power.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <PathOfSovereignty />
      <DailyDedicationSection />
      <RitualToolsSection />
      <SovereigntyArchiveSection />
    </main>
  );
}