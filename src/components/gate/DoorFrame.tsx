"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DoorPanel } from "./DoorPanel";

type DoorFrameProps = {
  isEntering: boolean;
};

export function DoorFrame({ isEntering }: DoorFrameProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative mx-auto h-[20.5rem] w-[13.75rem] sm:h-[23.5rem] sm:w-[15.75rem] md:h-[27.5rem] md:w-[18.25rem] lg:h-[31rem] lg:w-[20.25rem]">
      <div className="absolute inset-0 rounded-[28px] border-2 border-[var(--gold-soft)] bg-[#13140f] shadow-[0_35px_120px_rgba(0,0,0,0.58)]" />

      <div className="absolute inset-2 rounded-3xl border border-white/6 bg-[linear-gradient(180deg,#161711,#0f100c)] shadow-[inset_0_4px_14px_rgba(0,0,0,0.4)]" />

      <InnerGlow isEntering={isEntering} />

      <div className="absolute inset-[18px] grid grid-cols-2 gap-px overflow-hidden rounded-[22px]">
        <DoorPanel side="left" isEntering={isEntering} />
        <DoorPanel side="right" isEntering={isEntering} />
      </div>

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
    </div>
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
          "radial-gradient(circle at 50% 40%, rgba(255,244,214,0.62) 0%, rgba(240,219,170,0.30) 18%, rgba(214,188,132,0.12) 36%, rgba(255,183,77,0.05) 52%, transparent 74%)",
      }}
    />
  );
}