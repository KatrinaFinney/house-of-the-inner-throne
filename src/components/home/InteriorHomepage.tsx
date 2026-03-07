"use client";

import { motion } from "framer-motion";
import { PathOfSovereignty } from "./PathOfSovereignty";
import { DailyDedicationSection } from "./DailyDedicationSection";
import { RitualToolsSection } from "./RitualToolsSection";
import { SovereigntyCodexSection } from "./SovereigntyCodexSection";
import { IncenseSmoke } from "./IncenseSmoke";

export function InteriorHomepage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-(--text) bg-[linear-gradient(180deg,#1a1813_0%,#0b0b09_35%,#070707_100%)]">

      {/* atmospheric glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,240,200,0.08),transparent_25%)]" />
      
      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center px-6 py-24">
      <IncenseSmoke />
        <div className=" relative z-10 mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-(--gold)">
              Welcome to the House
            </p>

            <h1 className="mt-4 text-5xl sm:text-6xl md:text-7xl leading-[0.95]">
              House of the Inner Throne
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-(--muted)">
              Discover the seat of your spirit.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <button
                type="button"
                className="min-w-55 rounded-full border border-(--gold) bg-(--gold) px-8 py-3 text-sm tracking-widest text-black transition hover:opacity-90"
              >
                Enter the Codex
              </button>

              <button
                type="button"
                className="min-w-55 rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm tracking-widest transition hover:bg-white/10"
              >
                Explore Ritual Tools
              </button>

            </div>
          </motion.div>

          {/* THREE PILLARS */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-(--gold)">
              The Three Pillars
            </p>

            <div className="mt-6 space-y-6">

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <h3 className="text-xl">Protection</h3>
                <p className="mt-2 text-(--muted)">
                  Protection is the foundation of power. Sacred boundaries
                  strengthen authority.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <h3 className="text-xl">Power</h3>
                <p className="mt-2 text-(--muted)">
                  Power is the fruit of sovereignty. When the spirit is seated,
                  authority follows.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <h3 className="text-xl">Prosperity</h3>
                <p className="mt-2 text-(--muted)">
                  Prosperity is the expression of spiritual power.
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* PATH */}
      <PathOfSovereignty />

      {/* DAILY DEDICATION */}
      <DailyDedicationSection />

      {/* RITUAL TOOLS */}
      <RitualToolsSection />

      {/* CODEX */}
      <SovereigntyCodexSection />

    </main>
  );
}