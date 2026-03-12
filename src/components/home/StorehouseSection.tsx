"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const storeItems = [
  { title: "Ancestor Currency", href: "/storehouse/ancestor-currency" },
  { title: "Petition Papers", href: "/storehouse/petition-papers" },
  { title: "Temple Candles", href: "/storehouse/temple-candles" },
  { title: "Ritual Kits", href: "/storehouse/ritual-kits" },
];

export function StorehouseSection() {
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
            The Storehouse
          </p>

          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
            Instruments prepared for sacred work.
          </h2>

          <p className="mt-6 text-lg leading-8 text-(--muted)">
            The Storehouse holds practical instruments for offering, remembrance,
            devotion, and disciplined ritual work.
          </p>

          <p className="mt-4 text-lg leading-8 text-(--muted)">
            These items support practice, but they do not replace it. The work
            begins with attention, order, and spiritual intention.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {storeItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-[1.8rem] border border-[rgba(202,169,107,0.12)] bg-white/[0.04] p-4 transition hover:bg-white/[0.05]"
            >
              <div className="rounded-[1.3rem] border border-[rgba(202,169,107,0.14)] bg-black/20 p-6 text-center">
                <p className="text-base">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/storehouse"
            className="inline-flex rounded-full border border-white/20 px-8 py-3 text-sm uppercase tracking-[0.14em] transition hover:bg-white/10"
          >
            Enter the Storehouse
          </Link>
        </div>
      </div>
    </section>
  );
}