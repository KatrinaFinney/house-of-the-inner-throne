"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { currentDedication } from "@/lib/daily-dedication";
import { track } from "@vercel/analytics";

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
            A living offering of fire, renewed with purpose.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
            Daily Dedication is the Shrine’s recurring fire offering. Appointed
            ancestor money is offered for protection, power, prosperity,
            remembrance, gratitude, clear passage, and needs named through
            petitions when the petition window is open.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/daily-dedication"
              onClick={() => track("daily_dedication_opened", { source: "home" })}
              className="inline-flex items-center justify-center rounded-full border border-[var(--gold)] bg-[var(--gold)] px-8 py-3 text-sm uppercase tracking-[0.14em] text-black transition hover:opacity-90"
            >
              See the Daily Dedication
            </Link>

            <Link
              href="/socials"
              onClick={() => track("social_channels_opened", { source: "daily_dedication" })}
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-3 text-sm uppercase tracking-[0.14em] text-[var(--text)] transition hover:bg-white/5"
            >
              Follow the Dedication
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
              {currentDedication.eyebrow}
            </p>

            <h3 className="mt-5 text-3xl leading-tight">{currentDedication.intention}</h3>
            <dl className="mt-7 space-y-5">
              <div>
                <dt className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--gold)]">Offering</dt>
                <dd className="mt-1 text-[var(--muted)]">{currentDedication.offering}</dd>
              </div>
              <div>
                <dt className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--gold)]">Petition window</dt>
                <dd className="mt-1 text-[var(--muted)]">{currentDedication.petitionWindow}</dd>
              </div>
            </dl>
            <p className="mt-7 border-t border-white/10 pt-6 leading-7 text-[var(--muted)]">{currentDedication.note}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
