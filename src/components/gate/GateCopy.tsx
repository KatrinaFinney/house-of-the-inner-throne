"use client";

import { motion, useReducedMotion } from "framer-motion";

type GateCopyProps = {
  isEntering: boolean;
  onEnter: () => void;
};

export function GateCopy({ isEntering, onEnter }: GateCopyProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isEntering && !prefersReducedMotion ? 0.35 : 1,
        y: 0,
      }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mx-auto mt-8 max-w-4xl text-center md:mt-10"
    >
      <p className="mb-4 font-display text-[11px] uppercase tracking-[0.42em] text-(--gold) sm:text-xs">
        Protection · Power · Prosperity
      </p>

      <h1 className="mx-auto max-w-4xl text-4xl leading-[0.95] sm:text-5xl md:text-6xl lg:text-[4.5rem]">
        House of the
        <br />
        Inner Throne
      </h1>

      <motion.p
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.25, duration: 0.6 }}
  className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-(--muted) sm:text-xl"
>
  The Sacred House of Ritual Sovereignty
</motion.p>

      <div className="mt-8 flex items-center justify-center">
        <button
          type="button"
          onClick={onEnter}
          disabled={isEntering}
          className="min-w-47.5 rounded-full border border-(--gold) bg-(--gold) px-7 py-3 text-sm font-medium tracking-[0.08em] text-black transition hover:opacity-90 disabled:cursor-default disabled:opacity-80"
        >
          Enter the House
        </button>
      </div>
    </motion.div>
  );
}