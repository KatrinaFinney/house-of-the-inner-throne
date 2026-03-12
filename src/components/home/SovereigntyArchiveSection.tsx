"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function SovereigntyArchiveSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
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

          <p className="mt-4 text-lg leading-8 text-(--muted)">
            Teachings, philosophy, correspondences, and ritual instruction
            preserved by the House.
          </p>

          <p className="mt-4 text-base leading-7 text-(--muted)">
            Read in sequence for full formation, or enter by pillar according to
            present need.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h2 className="text-4xl leading-tight sm:text-5xl">
            Study the philosophy of spiritual authority.
          </h2>

          <p className="mt-6 text-lg leading-8 text-(--muted)">
            The Archive contains the manuscript body of the House: lessons that
            train perception, deepen ritual intelligence, and restore sovereignty
            to the individual.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/archive"
              className="inline-flex min-w-55 items-center justify-center rounded-full border border-(--gold) bg-(--gold) px-6 py-3 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-black shadow-[0_8px_30px_rgba(202,169,107,0.18)] transition hover:brightness-[1.04]"
            >
              Enter the Archive
            </Link>

            <Link
              href="/archive/foundations"
              className="inline-flex min-w-55 items-center justify-center rounded-full border border-[rgba(202,169,107,0.28)] bg-white/3 px-6 py-3 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-(--text) transition hover:bg-white/6"
            >
              Read Foundations First
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}