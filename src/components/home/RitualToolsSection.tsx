"use client";

import { motion } from "framer-motion";

const tools = [
  "Ancestor Currency",
  "Petition Papers",
  "Temple Candles",
  "Ritual Kits",
];

export function RitualToolsSection() {
  return (
    <section className="px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-(--gold)">
            Treasury of Practice
          </p>

          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
            Instruments prepared for sacred work.
          </h2>

          <p className="mt-6 text-lg leading-8 text-(--muted)">
            Candles, petition papers, ancestor currency, and ritual tools set
            apart for offering, remembrance, devotion, and disciplined
            spiritual practice.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <div
              key={tool}
              className="rounded-[1.8rem] border border-[rgba(202,169,107,0.12)] bg-white/[0.04] p-4"
            >
              <div className="rounded-[1.3rem] border border-[rgba(202,169,107,0.14)] bg-black/20 p-6 text-center">
                <p className="text-base">{tool}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          className="mt-10 rounded-full border border-white/20 px-8 py-3 text-sm uppercase tracking-[0.14em] hover:bg-white/10 transition"
          type="button"
        >
          Enter the Treasury
        </button>
      </div>
    </section>
  );
}