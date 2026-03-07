"use client";

import { motion } from "framer-motion";

const paths = [
  {
    title: "Protection",
    description:
      "Strengthen your spiritual boundaries through cleansing, covering, and sacred discipline.",
    cta: "Enter Protection",
  },
  {
    title: "Power",
    description:
      "Build spiritual authority through command, confidence, devotion, and right alignment.",
    cta: "Enter Power",
  },
  {
    title: "Prosperity",
    description:
      "Cultivate flow, increase, and material expression through offerings and intentional practice.",
    cta: "Enter Prosperity",
  },
];

export function PathOfSovereignty() {
  return (
    <section className="relative px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.34em] text-(--gold)">
            Path of Sovereignty
          </p>

          <h2 className="text-3xl leading-tight sm:text-4xl md:text-5xl">
            Choose the path that calls your spirit.
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-(--muted)">
            The House is entered through practice. Each path opens a different
            doorway into protection, power, and prosperity.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {paths.map((path, index) => (
            <motion.article
              key={path.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
            >
              <div className="rounded-3xl border border-[rgba(202,169,107,0.14)] bg-black/20 p-6">
                <h3 className="text-2xl">{path.title}</h3>
                <p className="mt-4 text-base leading-7 text-(--muted)">
                  {path.description}
                </p>

                <button
                  type="button"
                  className="mt-6 rounded-full border border-(--gold) px-5 py-2.5 text-sm tracking-[0.08em] text-(--gold) transition hover:bg-white/5"
                >
                  {path.cta}
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}