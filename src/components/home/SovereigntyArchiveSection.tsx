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
            Featured Manuscript
          </p>

          <p className="mt-4 text-lg leading-8 text-(--muted)">
            I · Foundations of Sovereignty
          </p>

          <p className="mt-4 text-base leading-7 text-(--muted)">
            The opening manuscript establishes the ground beneath every pillar:
            spiritual authority that is remembered, inhabited, and kept.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h2 className="text-4xl leading-tight sm:text-5xl">
            Spiritual Sovereignty
          </h2>

          <p className="mt-6 text-lg leading-8 text-(--muted)">
            Begin with the distinction between guidance and surrender, devotion
            and dependence, spiritual relationship and the abandonment of one’s
            own inner throne.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/archive/volume/foundations-of-sovereignty/spiritual-sovereignty"
              className="inline-flex min-w-55 items-center justify-center rounded-full border border-(--gold) bg-(--gold) px-6 py-3 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-black shadow-[0_8px_30px_rgba(202,169,107,0.18)] transition hover:brightness-[1.04]"
            >
              Read the First Manuscript
            </Link>

            <Link
              href="/archive"
              className="inline-flex min-w-55 items-center justify-center rounded-full border border-[rgba(202,169,107,0.28)] bg-white/3 px-6 py-3 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-(--text) transition hover:bg-white/6"
            >
              View All 44 Manuscripts
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
