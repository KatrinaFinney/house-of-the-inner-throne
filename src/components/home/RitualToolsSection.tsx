"use client";

import { motion } from "framer-motion";

const tools = [
  "Ancestor Currency",
  "Petition Papers",
  "Temple Candles",
  "Ritual Kits"
];

export function RitualToolsSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-(--gold)">
            Ritual Tools
          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl leading-tight">
            Instruments of spiritual practice.
          </h2>

          <p className="mt-6 text-lg leading-8 text-(--muted)">
            The House provides ritual tools designed to support devotion,
            discipline, and sacred work.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <div
              key={tool}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center"
            >
              <p>{tool}</p>
            </div>
          ))}
        </div>

        <button
          className="mt-10 rounded-full border border-white/20 px-8 py-3 text-sm tracking-widest hover:bg-white/10 transition"
          type="button"
        >
          Enter the Ritual Shop
        </button>
      </div>
    </section>
  );
}