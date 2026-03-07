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
            ? "bg-[linear-gradient(180deg,#9aa58f_0%,#7f8b76_28%,#66715f_58%,#505949_100%)]"
            : "bg-[linear-gradient(180deg,#95a088_0%,#7a866f_28%,#626d5a_58%,#4c5545_100%)]"
        )}
      />

      <div
        className="absolute inset-0 opacity-[0.58]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 14% 12%, rgba(255,255,255,0.22) 0%, transparent 10%),
            radial-gradient(circle at 28% 34%, rgba(255,255,255,0.10) 0%, transparent 14%),
            radial-gradient(circle at 72% 18%, rgba(255,255,255,0.16) 0%, transparent 12%),
            radial-gradient(circle at 82% 48%, rgba(255,255,255,0.08) 0%, transparent 14%),
            radial-gradient(circle at 22% 76%, rgba(0,0,0,0.14) 0%, transparent 18%),
            radial-gradient(circle at 68% 72%, rgba(255,255,255,0.08) 0%, transparent 18%),
            radial-gradient(circle at 88% 84%, rgba(0,0,0,0.12) 0%, transparent 14%)
          `,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.52]"
        style={{
          backgroundImage: `
            linear-gradient(112deg, rgba(255,255,255,0.20) 0%, transparent 18%, rgba(255,255,255,0.06) 31%, transparent 48%),
            linear-gradient(146deg, transparent 0%, rgba(255,255,255,0.12) 14%, transparent 24%, rgba(255,255,255,0.05) 42%, transparent 58%),
            linear-gradient(67deg, transparent 0%, rgba(255,255,255,0.07) 16%, transparent 27%, rgba(0,0,0,0.07) 62%, transparent 82%),
            linear-gradient(128deg, transparent 0%, rgba(255,255,255,0.10) 8%, transparent 17%, rgba(255,255,255,0.05) 25%, transparent 42%)
          `,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(33deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 4px)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 24%, rgba(255,255,255,0.20), transparent 22%), radial-gradient(circle at 64% 58%, rgba(255,255,255,0.12), transparent 26%)",
          mixBlendMode: "screen",
        }}
      />

      <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(to_right,rgba(0,0,0,0.45)_1px,transparent_1px)] bg-size-[36px_100%]" />

      <div className="absolute inset-x-0 top-0 h-[14%] bg-[linear-gradient(180deg,rgba(255,255,255,0.22),transparent)] opacity-55" />

      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-[linear-gradient(0deg,rgba(0,0,0,0.38),transparent)]" />

      <div className="absolute inset-y-0 left-0 w-px bg-white/10" />
      <div className="absolute inset-y-0 right-0 w-px bg-black/20" />

      <div className="absolute inset-y-[12%] right-4 w-px bg-black/12" />
      <div className="absolute inset-y-[18%] left-4 w-px bg-white/10" />

      <div className="absolute top-[9%] left-[12%] h-px w-[76%] bg-white/10" />
      <div className="absolute bottom-[10%] left-[10%] h-px w-[80%] bg-black/10" />

      {side === "left" ? (
        <div className="absolute inset-y-0 right-0 w-0.5 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(0,0,0,0.22))]" />
      ) : (
        <div className="absolute inset-y-0 left-0 w-0.5 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(0,0,0,0.22))]" />
      )}
    </motion.div>
  );
}