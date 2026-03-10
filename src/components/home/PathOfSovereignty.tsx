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
    <section className="relative px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.34em] text-[var(--gold)]">
            Path of Sovereignty
          </p>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
  Choose a path to enter a guided sequence of teachings in protection, power,
  or prosperity.
</p>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            The House is entered through practice. Each chamber opens a sovereign path.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {paths.map((path, index) => (
            <motion.article
              key={path.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="group rounded-[2rem] border border-[rgba(202,169,107,0.12)] bg-white/[0.04] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
            >
              <div className="relative flex h-full min-h-[320px] flex-col rounded-[1.6rem] border border-[rgba(202,169,107,0.14)] bg-[linear-gradient(180deg,rgba(0,0,0,0.22),rgba(0,0,0,0.14))] p-7">
                <div className="mb-6 h-px w-16 bg-[linear-gradient(90deg,rgba(202,169,107,0.7),rgba(202,169,107,0.08))]" />

                <h3 className="text-2xl md:text-[2rem]">{path.title}</h3>

                <p className="mt-4 flex-1 text-base leading-8 text-[var(--muted)]">
                  {path.description}
                </p>

                <button
                  type="button"
                  className="mt-8 inline-flex w-fit rounded-full border border-[var(--gold)] px-5 py-2.5 text-sm uppercase tracking-[0.12em] text-[var(--gold)] transition hover:bg-white/5"
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