"use client";

import { motion, useReducedMotion } from "framer-motion";

type GateCopyProps = {
  isEntering: boolean;
};

export function GateCopy({ isEntering }: GateCopyProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isEntering && !prefersReducedMotion ? 0.35 : 1,
        y: 0,
      }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="threshold-copy-compact mx-auto max-w-3xl text-center"
    >
      <h1 className="mx-auto max-w-[15ch] text-[1.8rem] leading-[0.96] tracking-[0.015em] sm:text-[2.35rem] md:text-[2.8rem] lg:text-[3.1rem]">
        Shrine of the
        <br />
        Inner Throne
      </h1>

      <p className="threshold-kicker mt-3 font-display text-[10px] uppercase tracking-[0.25em] text-(--gold) sm:mt-3.5 sm:text-[11px]">
        Adorn the Seat of Your Soul
      </p>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="threshold-subtitle mx-auto mt-3 max-w-[26ch] text-[0.98rem] leading-[1.45] text-(--muted) sm:max-w-md sm:text-[1rem] sm:leading-7"
      >
        The Sacred Shrine of Ritual Sovereignty
      </motion.p>

      <div
        aria-hidden="true"
        className="threshold-divider pointer-events-none mx-auto mt-4 h-px w-24 bg-[linear-gradient(90deg,transparent,rgba(202,169,107,0.24),transparent)] sm:mt-6 sm:w-28"
      />
    </motion.div>
  );
}
