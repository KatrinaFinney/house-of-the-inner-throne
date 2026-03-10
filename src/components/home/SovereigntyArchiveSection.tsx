"use client";

import { motion } from "framer-motion";

export function SovereigntyArchiveSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-8"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-(--gold)">
            The Sovereignty Archive
          </p>

          <p className="mt-4 text-lg text-(--muted)">
            Teachings, philosophy, and ritual instruction preserved by the
            House.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h2 className="text-4xl sm:text-5xl leading-tight">
            Study the philosophy of spiritual authority.
          </h2>

          <p className="mt-6 text-lg leading-8 text-(--muted)">
            The Archive contains teachings that guide the discipline of the
            spirit and restore sovereignty to the individual.
          </p>

          <button
            className="mt-8 rounded-full border border-(--gold) px-8 py-3 text-sm tracking-widest text-(--gold) hover:bg-white/5 transition"
            type="button"
          >
            Access the Archive
          </button>
        </motion.div>
      </div>
    </section>
  );
}