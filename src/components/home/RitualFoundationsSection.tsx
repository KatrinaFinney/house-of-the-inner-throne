"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const foundations = [
  {
    title: "Herbs",
    description:
      "Learn the spiritual logic of common ritual herbs, their qualities, and how they are used in cleansing, blessing, and focused work.",
    href: "/ritual-foundations/herbs",
  },
  {
    title: "Candles",
    description:
      "Study candle colors, intention, preparation, and the role of fire as a visible instrument of prayer, focus, and offering.",
    href: "/ritual-foundations/candles",
  },
  {
    title: "Honey Jars",
    description:
      "Understand sweetness work, gradual influence, and the disciplined use of honey jars in relational and devotional practice.",
    href: "/ritual-foundations/honey-jars",
  },
  {
    title: "Sacred Geometry",
    description:
      "Explore spiritual pattern, symbolic order, and the use of geometric forms as meditative and ritual structures.",
    href: "/ritual-foundations/sacred-geometry",
  },
];

export function RitualFoundationsSection() {
  return (
    <section className="px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-(--gold)">
            Ritual Foundations
          </p>

          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
            Learn the structures beneath the work.
          </h2>

          <p className="mt-6 text-lg leading-8 text-(--muted)">
            Ritual Foundations offers guided introductions to the materials,
            symbols, and methods that support practice in the House.
          </p>

          <p className="mt-4 text-lg leading-8 text-(--muted)">
            Short teachings may be read within the site. Full guides may be
            received through your email or phone, allowing the deeper work to be
            carried with you beyond the page.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {foundations.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="rounded-[2rem] border border-[rgba(202,169,107,0.12)] bg-white/[0.04] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
            >
              <div className="flex h-full flex-col rounded-[1.6rem] border border-[rgba(202,169,107,0.14)] bg-[linear-gradient(180deg,rgba(0,0,0,0.22),rgba(0,0,0,0.14))] p-7">
                <h3 className="text-2xl md:text-[2rem]">{item.title}</h3>

                <p className="mt-4 flex-1 text-base leading-8 text-(--muted)">
                  {item.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={item.href}
                    className="inline-flex w-fit rounded-full border border-[var(--gold)] px-5 py-2.5 text-sm uppercase tracking-[0.12em] text-[var(--gold)] transition hover:bg-white/5"
                  >
                    Read the Guide
                  </Link>

                  <Link
                    href={`${item.href}/full-guide`}
                    className="inline-flex w-fit rounded-full border border-white/15 px-5 py-2.5 text-sm uppercase tracking-[0.12em] text-(--text) transition hover:bg-white/5"
                  >
                    Get Full Guide
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}