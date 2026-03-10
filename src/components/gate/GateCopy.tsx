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
      className="mx-auto mt-7 max-w-3xl text-center sm:mt-8 md:mt-9"
    >
      <p className="mb-3 font-display text-[10px] uppercase tracking-[0.28em] text-[var(--gold)] sm:text-[11px]">
        Protection · Power · Prosperity
      </p>

      <h1 className="mx-auto max-w-[14ch] text-[1.95rem] leading-[0.94] tracking-[0.02em] sm:text-[2.35rem] md:text-[2.8rem] lg:text-[3.1rem]">
        House of the
        <br />
        Inner Throne
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="mx-auto mt-3 max-w-md text-[0.95rem] leading-7 text-[var(--muted)] sm:text-[1rem]"
      >
        The Sacred House of Ritual Sovereignty
      </motion.p>

      <div className="mt-5 flex items-center justify-center">
        <button
          type="button"
          onClick={onEnter}
          disabled={isEntering}
          className="min-w-[164px] rounded-full border border-[var(--gold)] bg-[var(--gold)] px-5 py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-black shadow-[0_8px_24px_rgba(202,169,107,0.12)] transition hover:brightness-[1.04] disabled:cursor-default disabled:opacity-80"
        >
          Enter the House
        </button>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none mx-auto mt-8 h-px w-28 bg-[linear-gradient(90deg,transparent,rgba(202,169,107,0.24),transparent)]"
      />
    </motion.div>
  );
}