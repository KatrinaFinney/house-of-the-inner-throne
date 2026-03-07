"use client";

import { motion } from "framer-motion";

export function DailyDedicationSection() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-(--gold)">
            Daily Dedication
          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl leading-tight">
            Return to the discipline of the spirit.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-(--muted)">
            The Daily Dedication is a simple ritual of alignment practiced once
            each day. Through steady devotion the spirit grows stronger in
            protection, power, and prosperity.
          </p>

          <button
            className="mt-8 rounded-full border border-(--gold) bg-(--gold) px-8 py-3 text-sm tracking-widest text-black hover:opacity-90 transition"
            type="button"
          >
            Learn the Daily Dedication
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-8"
        >
          <ol className="space-y-6">
            <li>
              <p className="text-(--gold) text-sm tracking-[0.2em] uppercase">
                Step One
              </p>
              <p className="text-(--muted)">
                Enter stillness and center your spirit.
              </p>
            </li>

            <li>
              <p className="text-(--gold) text-sm tracking-[0.2em] uppercase">
                Step Two
              </p>
              <p className="text-(--muted)">
                Make your offering with clarity and intention.
              </p>
            </li>

            <li>
              <p className="text-(--gold) text-sm tracking-[0.2em] uppercase">
                Step Three
              </p>
              <p className="text-(--muted)">
                Leave the rite strengthened in authority and presence.
              </p>
            </li>
          </ol>
        </motion.div>
      </div>
    </section>
  );
}