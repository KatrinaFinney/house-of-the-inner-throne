"use client";

import { motion } from "framer-motion";

const plumes = [
  {
    leftClassName: "left-[10%]",
    widthClassName: "w-28 sm:w-36",
    heightClassName: "h-44 sm:h-56",
    duration: 14,
    delay: 0,
  },
  {
    leftClassName: "left-[30%]",
    widthClassName: "w-24 sm:w-32",
    heightClassName: "h-40 sm:h-52",
    duration: 16,
    delay: 1.5,
  },
  {
    leftClassName: "left-[58%]",
    widthClassName: "w-30 sm:w-40",
    heightClassName: "h-48 sm:h-60",
    duration: 15,
    delay: 0.8,
  },
  {
    leftClassName: "left-[78%]",
    widthClassName: "w-24 sm:w-34",
    heightClassName: "h-42 sm:h-54",
    duration: 17,
    delay: 2.2,
  },
] as const;

export function IncenseSmoke() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {plumes.map((plume, index) => (
        <motion.div
          key={`${plume.leftClassName}-${index}`}
          initial={{ opacity: 0, y: 30, x: 0, scale: 0.92 }}
          animate={{
            opacity: [0, 0.12, 0.2, 0.1, 0],
            y: [30, -10, -60, -110, -150],
            x: [0, 8, -6, 10, -4],
            scale: [0.92, 1, 1.04, 1.08, 1.12],
          }}
          transition={{
            duration: plume.duration,
            delay: plume.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className={`absolute bottom-[6%] ${plume.leftClassName} ${plume.widthClassName} ${plume.heightClassName} rounded-full blur-2xl`}
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.22) 0%, rgba(220,205,185,0.14) 28%, rgba(170,160,150,0.08) 52%, transparent 74%)",
          }}
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(7,7,7,0.14))]" />
    </div>
  );
}