"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function DailyDedicationSection() {
  return (
    <section className="relative px-6 py-24 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">
            Daily Dedication
          </p>

          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
            Join the Daily Dedication and practice with the House each day.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
            The Daily Dedication is the shared rite of the House. Join through
            our social channels each day to remain in rhythm with the work of
            discipline, remembrance, prayer, and spiritual order.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/daily-dedication"
              className="inline-flex items-center justify-center rounded-full border border-[var(--gold)] bg-[var(--gold)] px-8 py-3 text-sm uppercase tracking-[0.14em] text-black transition hover:opacity-90"
            >
              Join the Daily Dedication
            </Link>

            <Link
              href="/socials"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-3 text-sm uppercase tracking-[0.14em] text-[var(--text)] transition hover:bg-white/5"
            >
              View Social Channels
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="rounded-[2rem] border border-[rgba(202,169,107,0.12)] bg-white/[0.04] p-5"
        >
          <div className="rounded-[1.5rem] border border-[rgba(202,169,107,0.14)] bg-black/20 p-7">
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--gold)]">
              Order of the Rite
            </p>

            <ol className="mt-6 space-y-6">
              <li>
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--gold)]">
                  Gather
                </p>
                <p className="mt-1 text-[var(--muted)]">
                  Enter the appointed daily space and come into stillness with
                  the House.
                </p>
              </li>

              <li>
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--gold)]">
                  Align
                </p>
                <p className="mt-1 text-[var(--muted)]">
                  Join the spoken or written act of devotion with clarity,
                  attention, and spiritual presence.
                </p>
              </li>

              <li>
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--gold)]">
                  Continue
                </p>
                <p className="mt-1 text-[var(--muted)]">
                  Leave strengthened, then carry the current of the rite into
                  the rest of the day.
                </p>
              </li>
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}