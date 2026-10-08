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
      className="group relative mx-auto block aspect-[2/3] h-auto w-[min(13.75rem,32svh,calc(100vw-3rem))] shrink-0 cursor-pointer appearance-none border-0 bg-transparent p-0 text-left outline-none focus-visible:rounded-[30px] focus-visible:ring-2 focus-visible:ring-(--gold) focus-visible:ring-offset-4 focus-visible:ring-offset-(--bg) disabled:cursor-default sm:w-[min(15.75rem,32svh,calc(100vw-4rem))] md:w-[min(18.25rem,32svh,calc(100vw-5rem))] lg:w-[min(20.25rem,34svh)]"
    >
      <div className="absolute inset-0 rounded-[28px] border-2 border-[var(--gold-soft)] bg-[#13140f] shadow-[0_35px_120px_rgba(0,0,0,0.58)]" />

      <div className="absolute inset-2 rounded-3xl border border-white/6 bg-[linear-gradient(180deg,#161711,#0f100c)] shadow-[inset_0_4px_14px_rgba(0,0,0,0.4)]" />

      <InnerGlow isEntering={isEntering} />

      <div className="absolute inset-[18px] grid grid-cols-2 gap-px overflow-hidden rounded-[22px]">
        <DoorPanel side="left" isEntering={isEntering} />
        <DoorPanel side="right" isEntering={isEntering} />
      </div>

      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{
          opacity: isEntering ? 0 : 1,
          y: isEntering ? 6 : 0,
        }}
        transition={{ duration: prefersReducedMotion ? 0.1 : 0.35 }}
        className="pointer-events-none absolute inset-x-0 bottom-[8%] z-10 mx-auto w-max rounded-full border border-white/12 bg-black/45 px-4 py-2 font-display text-[9px] uppercase tracking-[0.22em] text-[#fff4d6] shadow-[0_0_24px_rgba(255,221,156,0.16)] backdrop-blur-sm transition-colors group-hover:border-(--gold) group-hover:text-white sm:text-[10px]"
      >
        Touch the doors to enter
      </motion.span>

      <div className="pointer-events-none absolute inset-[10px] rounded-3xl border border-[rgba(202,169,107,0.12)]" />

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0.14 }}
        animate={{
          opacity: isEntering && !prefersReducedMotion ? 0.32 : 0.14,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-20px_40px_rgba(0,0,0,0.22)]"
      />

      <div className="pointer-events-none absolute inset-x-[18px] top-[18px] h-[18%] rounded-t-[22px] bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.06),transparent_68%)] opacity-60" />
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
      className="absolute inset-[18px] rounded-[20px]"
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
