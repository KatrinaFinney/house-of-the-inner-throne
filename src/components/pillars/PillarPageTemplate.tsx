"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type LinkItem = {
  readonly title: string;
  readonly href: string;
  readonly description?: string;
};

type PillarPageProps = {
  readonly eyebrow: string;
  readonly title: string;
  readonly subtitle: string;
  readonly heroBody: string;
  readonly ctaPrimary: { readonly label: string; readonly href: string };
  readonly ctaSecondary: { readonly label: string; readonly href: string };
  readonly currentTitle: string;
  readonly currentBody: readonly string[];
  readonly whyTitle: string;
  readonly whyItems: readonly string[];
  readonly beginTitle: string;
  readonly beginIntro: string;
  readonly beginItems: readonly LinkItem[];
  readonly practicesTitle: string;
  readonly practicesIntro: string;
  readonly practices: readonly LinkItem[];
  readonly supportTitle: string;
  readonly supportBody: string;
  readonly houseSupports: readonly LinkItem[];
  readonly curatedSupports: readonly LinkItem[];
  readonly closingTitle: string;
  readonly closingBody: string;
};

export function PillarPageTemplate(props: PillarPageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#171510_0%,#0b0b09_38%,#060606_100%)] text-(--text)">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,180,111,0.08),transparent_24%)]" />

      <section className="px-6 pb-18 pt-28 md:pb-24 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-[10px] uppercase tracking-[0.36em] text-(--gold) sm:text-xs">
              {props.eyebrow}
            </p>

            <h1 className="mt-5 text-[3rem] leading-[0.95] sm:text-[4rem] md:text-[5rem]">
              {props.title}
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-9 text-(--muted)">
              {props.subtitle}
            </p>

            <p className="mt-6 max-w-2xl text-base leading-8 text-(--muted)">
              {props.heroBody}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href={props.ctaPrimary.href}
                className="inline-flex min-w-55 items-center justify-center rounded-full border border-(--gold) bg-(--gold) px-7 py-3 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-black shadow-[0_8px_30px_rgba(202,169,107,0.18)] transition hover:brightness-[1.04]"
              >
                {props.ctaPrimary.label}
              </Link>

              <Link
                href={props.ctaSecondary.href}
                className="inline-flex min-w-55 items-center justify-center rounded-full border border-[rgba(202,169,107,0.28)] bg-white/3 px-7 py-3 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-(--text) transition hover:bg-white/6"
              >
                {props.ctaSecondary.label}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-(--gold)">
              {props.currentTitle}
            </p>
          </div>

          <div className="space-y-6">
            {props.currentBody.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-8 text-(--muted)">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-[rgba(202,169,107,0.12)] bg-white/[0.04] p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.34em] text-(--gold)">
            {props.whyTitle}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {props.whyItems.map((item) => (
              <div
                key={item}
                className="rounded-[1.4rem] border border-[rgba(202,169,107,0.1)] bg-black/20 p-5"
              >
                <p className="text-base leading-8 text-(--muted)">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.34em] text-(--gold)">
            {props.beginTitle}
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-(--muted)">
            {props.beginIntro}
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {props.beginItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-[1.8rem] border border-[rgba(202,169,107,0.12)] bg-white/[0.04] p-4 transition hover:bg-white/[0.05]"
              >
                <div className="h-full rounded-[1.3rem] border border-[rgba(202,169,107,0.14)] bg-black/20 p-6">
                  <h3 className="text-2xl leading-tight">{item.title}</h3>
                  {item.description ? (
                    <p className="mt-4 text-base leading-7 text-(--muted)">
                      {item.description}
                    </p>
                  ) : null}
                  <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-(--gold)">
                    Read Lesson
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-(--gold)">
              {props.practicesTitle}
            </p>

            <p className="mt-5 text-lg leading-8 text-(--muted)">
              {props.practicesIntro}
            </p>
          </div>

          <div className="grid gap-4">
            {props.practices.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-[1.4rem] border border-[rgba(202,169,107,0.1)] bg-black/20 p-5 transition hover:bg-white/[0.04]"
              >
                <p className="text-lg">{item.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-[rgba(202,169,107,0.12)] bg-white/[0.04] p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.34em] text-(--gold)">
            {props.supportTitle}
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-(--muted)">
            {props.supportBody}
          </p>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-(--gold)">
                Prepared by the House
              </p>
              <div className="mt-4 grid gap-4">
                {props.houseSupports.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="rounded-[1.4rem] border border-[rgba(202,169,107,0.1)] bg-black/20 p-5 transition hover:bg-white/[0.04]"
                  >
                    <p className="text-base">{item.title}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-(--gold)">
                Curated Instruments
              </p>
              <div className="mt-4 grid gap-4">
                {props.curatedSupports.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="rounded-[1.4rem] border border-[rgba(202,169,107,0.1)] bg-black/20 p-5 transition hover:bg-white/[0.04]"
                  >
                    <p className="text-base">{item.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 pt-16 md:pb-28 md:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.34em] text-(--gold)">
            {props.closingTitle}
          </p>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-(--muted)">
            {props.closingBody}
          </p>
        </div>
      </section>
    </main>
  );
}