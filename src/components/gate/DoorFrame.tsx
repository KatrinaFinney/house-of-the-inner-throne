"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DoorPanel } from "./DoorPanel";

type DoorFrameProps = {
  isEntering: boolean;
  onEnter: () => void;
};

export function DoorFrame({ isEntering, onEnter }: DoorFrameProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onEnter}
      disabled={isEntering}
      aria-label="Open the doors and enter the Shrine"
      whileHover={prefersReducedMotion || isEntering ? undefined : { scale: 1.012 }}
      whileTap={prefersReducedMotion || isEntering ? undefined : { scale: 0.992 }}
      className="threshold-door group relative mx-auto block aspect-[11/17] h-auto shrink-0 cursor-pointer appearance-none border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-(--gold) focus-visible:ring-offset-4 focus-visible:ring-offset-(--bg) disabled:cursor-default"
    >
      <div className="absolute inset-0 border border-[#a68d53]/55 bg-[#101511] shadow-[0_34px_110px_rgba(0,0,0,0.68),inset_0_0_28px_rgba(180,199,180,0.08)]" />
      <div className="pointer-events-none absolute inset-[1.6%] border border-[#d1bd82]/18" />

      <InnerGlow isEntering={isEntering} />

      <div className="absolute inset-[3%] grid grid-cols-2 gap-[2px] overflow-hidden border border-[#b9a56a]/35 bg-[#090c09] shadow-[inset_0_0_22px_rgba(0,0,0,0.7)]">
        <DoorPanel side="left" isEntering={isEntering} />
        <DoorPanel side="right" isEntering={isEntering} />
      </div>

      <div className="pointer-events-none absolute left-[1.6%] top-[1.6%] h-[8%] w-px bg-[#d7c184]/35" />
      <div className="pointer-events-none absolute left-[1.6%] top-[1.6%] h-px w-[12%] bg-[#d7c184]/35" />
      <div className="pointer-events-none absolute right-[1.6%] bottom-[1.6%] h-[8%] w-px bg-[#d7c184]/35" />
      <div className="pointer-events-none absolute right-[1.6%] bottom-[1.6%] h-px w-[12%] bg-[#d7c184]/35" />

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0.14 }}
        animate={{
          opacity: isEntering && !prefersReducedMotion ? 0.32 : 0.14,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pointer-events-none absolute inset-[3%] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-20px_40px_rgba(0,0,0,0.18)]"
      />
    </motion.button>
  );
}

type InnerGlowProps = {
  isEntering: boolean;
};

function InnerGlow({ isEntering }: InnerGlowProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0.14, scale: 0.985 }}
      animate={{
        opacity: isEntering ? 0.92 : 0.14,
        scale: isEntering && !prefersReducedMotion ? 1 : 0.985,
      }}
      transition={{
        duration: prefersReducedMotion ? 0.15 : 1.05,
        ease: "easeOut",
      }}
      className="absolute inset-[3%]"
      style={{
        background:
          "radial-gradient(circle at 50% 40%, rgba(255,255,248,0.98) 0%, rgba(255,244,214,0.82) 18%, rgba(255,221,156,0.48) 38%, rgba(255,183,77,0.16) 58%, transparent 78%)",
        boxShadow: isEntering
          ? "0 0 72px rgba(255,235,190,0.72), 0 0 150px rgba(255,183,77,0.32)"
          : "0 0 18px rgba(255,221,156,0.08)",
      }}
    />
  );
}
