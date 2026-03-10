"use client";

import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";

type DoorSide = "left" | "right";

type DoorPanelProps = {
  side: DoorSide;
  isEntering: boolean;
};

export function DoorPanel({ side, isEntering }: DoorPanelProps) {
  const prefersReducedMotion = useReducedMotion();

  const xOffset = prefersReducedMotion ? 10 : 86;
  const x = !isEntering ? 0 : side === "left" ? -xOffset : xOffset;

  return (
    <motion.div
      initial={false}
      animate={{ x, opacity: 0.985 }}
      transition={{
        duration: prefersReducedMotion ? 0.18 : 1.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={clsx(
        "relative h-full w-full overflow-hidden",
        side === "left" ? "rounded-l-[22px]" : "rounded-r-[22px]"
      )}
    >
      <div
        className={clsx(
          "absolute inset-0",
          side === "left"
            ? "bg-[linear-gradient(180deg,#7e8b79_0%,#6d7968_22%,#5f6b5a_48%,#55604f_72%,#4a5445_100%)]"
            : "bg-[linear-gradient(180deg,#83907d_0%,#727e6d_22%,#626e5d_48%,#576251_72%,#4c5647_100%)]"
        )}
      />

      <div
        className="absolute inset-0 opacity-[0.62]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 18% 14%, rgba(214,223,205,0.26) 0%, transparent 16%),
            radial-gradient(circle at 34% 30%, rgba(175,190,165,0.18) 0%, transparent 20%),
            radial-gradient(circle at 68% 20%, rgba(221,228,215,0.18) 0%, transparent 16%),
            radial-gradient(circle at 82% 44%, rgba(162,176,152,0.16) 0%, transparent 18%),
            radial-gradient(circle at 26% 74%, rgba(58,66,54,0.15) 0%, transparent 24%),
            radial-gradient(circle at 62% 70%, rgba(205,214,196,0.12) 0%, transparent 22%),
            radial-gradient(circle at 86% 86%, rgba(49,56,46,0.12) 0%, transparent 18%)
          `,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.24]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              180deg,
              rgba(255,255,255,0.055) 0px,
              rgba(255,255,255,0.055) 1px,
              transparent 1px,
              transparent 18px
            ),
            repeating-linear-gradient(
              176deg,
              rgba(0,0,0,0.045) 0px,
              rgba(0,0,0,0.045) 1px,
              transparent 1px,
              transparent 24px
            )
          `,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 26%, transparent 62%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 12% 18%, rgba(255,255,255,0.12) 0 1px, transparent 1.8px),
            radial-gradient(circle at 28% 42%, rgba(0,0,0,0.10) 0 1px, transparent 1.8px),
            radial-gradient(circle at 44% 24%, rgba(255,255,255,0.08) 0 1px, transparent 2px),
            radial-gradient(circle at 64% 58%, rgba(0,0,0,0.08) 0 1px, transparent 2px),
            radial-gradient(circle at 78% 28%, rgba(255,255,255,0.09) 0 1px, transparent 2px),
            radial-gradient(circle at 82% 76%, rgba(0,0,0,0.10) 0 1px, transparent 2px),
            radial-gradient(circle at 24% 82%, rgba(255,255,255,0.08) 0 1px, transparent 2px)
          `,
          backgroundSize: "140px 140px",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(118deg, transparent 0%, rgba(235,241,231,0.18) 12%, transparent 20%, transparent 44%, rgba(235,241,231,0.10) 52%, transparent 60%),
            linear-gradient(96deg, transparent 0%, transparent 24%, rgba(255,255,255,0.08) 28%, transparent 34%, transparent 68%, rgba(230,236,226,0.08) 74%, transparent 80%)
          `,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.46]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.16), transparent 14%, transparent 86%, rgba(0,0,0,0.22)),
            linear-gradient(to bottom, rgba(255,255,255,0.10), transparent 16%, transparent 82%, rgba(0,0,0,0.20))
          `,
        }}
      />

      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:38px_100%]" />

      <div className="absolute inset-x-0 top-0 h-[14%] bg-[linear-gradient(180deg,rgba(255,255,255,0.14),transparent)] opacity-55" />
      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-[linear-gradient(0deg,rgba(0,0,0,0.28),transparent)]" />

      <div className="absolute inset-y-0 left-0 w-px bg-white/10" />
      <div className="absolute inset-y-0 right-0 w-px bg-black/20" />

      <div className="absolute inset-y-[12%] right-4 w-px bg-black/10" />
      <div className="absolute inset-y-[18%] left-4 w-px bg-white/8" />

      <div className="absolute top-[9%] left-[12%] h-px w-[76%] bg-white/8" />
      <div className="absolute bottom-[10%] left-[10%] h-px w-[80%] bg-black/10" />

      {side === "left" ? (
        <div className="absolute inset-y-0 right-0 w-0.5 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(0,0,0,0.18))]" />
      ) : (
        <div className="absolute inset-y-0 left-0 w-0.5 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(0,0,0,0.18))]" />
      )}
    </motion.div>
  );
}