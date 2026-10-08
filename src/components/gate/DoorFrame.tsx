"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DoorPanel } from "./DoorPanel";

const LIMESTONE_SURFACE = {
  backgroundColor: "#879180",
  backgroundImage: `
    radial-gradient(ellipse at 18% 12%, rgba(222,230,216,0.34) 0%, transparent 30%),
    radial-gradient(ellipse at 78% 72%, rgba(35,47,37,0.22) 0%, transparent 34%),
    linear-gradient(112deg, transparent 0 22%, rgba(49,63,51,0.22) 23%, rgba(214,223,209,0.18) 24%, transparent 26%),
    linear-gradient(76deg, transparent 0 58%, rgba(44,58,47,0.18) 59%, rgba(223,230,216,0.14) 60%, transparent 62%),
    linear-gradient(180deg, #aab4a5 0%, #879180 50%, #667062 100%)
  `,
} as const;

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
      <div
        className="absolute inset-0 border border-[#4d5a4d] shadow-[0_35px_120px_rgba(0,0,0,0.62)] [clip-path:polygon(7%_0,93%_0,100%_100%,0_100%)]"
        style={LIMESTONE_SURFACE}
      />

      <div className="absolute inset-x-[9%] top-[10%] bottom-[7%] border border-black/35 bg-[#16140f] shadow-[inset_0_8px_24px_rgba(0,0,0,0.72)]" />

      <InnerGlow isEntering={isEntering} />

      <div className="absolute inset-x-[11%] top-[12%] bottom-[8%] grid grid-cols-2 gap-px overflow-hidden border border-black/25">
        <DoorPanel side="left" isEntering={isEntering} />
        <DoorPanel side="right" isEntering={isEntering} />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[3%] top-0 h-[12%] border-x border-t border-[#4d5a4d] shadow-[0_8px_18px_rgba(0,0,0,0.35)]"
        style={LIMESTONE_SURFACE}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[1%] top-[8%] bottom-[2%] w-[11%] border border-[#4d5a4d] shadow-[8px_0_18px_rgba(0,0,0,0.28)]"
        style={LIMESTONE_SURFACE}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[1%] top-[8%] bottom-[2%] w-[11%] border border-[#4d5a4d] shadow-[-8px_0_18px_rgba(0,0,0,0.28)]"
        style={LIMESTONE_SURFACE}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[8%] border border-[#4d5a4d] shadow-[0_-7px_16px_rgba(0,0,0,0.25)]"
        style={LIMESTONE_SURFACE}
      />

      <div className="pointer-events-none absolute inset-x-[6%] top-[4%] h-px bg-[#e1e8dc]/35" />
      <div className="pointer-events-none absolute inset-x-[7%] top-[7.5%] h-px bg-black/20" />
      <div className="pointer-events-none absolute inset-x-[13%] bottom-[4%] h-px bg-[#dce5d8]/30" />

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0.14 }}
        animate={{
          opacity: isEntering && !prefersReducedMotion ? 0.32 : 0.14,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-20px_40px_rgba(0,0,0,0.18)] [clip-path:polygon(7%_0,93%_0,100%_100%,0_100%)]"
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
      className="absolute inset-x-[11%] top-[12%] bottom-[8%]"
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
