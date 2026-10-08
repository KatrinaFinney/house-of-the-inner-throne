"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const entrances = [
  {
    title: "Study the Archive",
    description:
      "Read the 44-manuscript canon in sequence and let each teaching prepare the ground for the next.",
    cta: "Open the Archive",
    href: "/archive",
  },
  {
    title: "Enter a Pillar",
    description:
      "Meet the need before you through Protection, Power, or Prosperity, then follow its related teachings.",
    cta: "Choose a Pillar",
    href: "/pillars",
  },
  {
    title: "Prepare for Practice",
    description:
      "Learn the materials, symbols, and methods that help intention become conscious, capable practice.",
    cta: "Prepare the Hands",
    href: "/ritual-foundations",
  },
];

export function BeginWithinSection() {
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
            Find Your Way Within
          </p>

          <h2 className="text-4xl leading-tight sm:text-5xl">
            Begin where your spirit recognizes itself.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Read from the beginning, follow the pillar that meets your present
            need, or prepare the hands for practice. Each way leads inward.
          </p>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            The Shrine offers structure. Sovereignty remains with the one who enters.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {entrances.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="group rounded-[2rem] border border-[rgba(202,169,107,0.12)] bg-white/[0.04] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
            >
              <div className="relative flex h-full min-h-[320px] flex-col rounded-[1.6rem] border border-[rgba(202,169,107,0.14)] bg-[linear-gradient(180deg,rgba(0,0,0,0.22),rgba(0,0,0,0.14))] p-7">
                <div className="mb-6 h-px w-16 bg-[linear-gradient(90deg,rgba(202,169,107,0.7),rgba(202,169,107,0.08))]" />

                <h3 className="text-2xl md:text-[2rem]">{item.title}</h3>

                <p className="mt-4 flex-1 text-base leading-8 text-[var(--muted)]">
                  {item.description}
                </p>

                <Link
                  href={item.href}
                  className="mt-8 inline-flex w-fit rounded-full border border-[var(--gold)] px-5 py-2.5 text-sm uppercase tracking-[0.12em] text-[var(--gold)] transition hover:bg-white/5"
                >
                  {item.cta}
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
