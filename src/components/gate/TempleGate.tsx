"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DoorFrame } from "./DoorFrame";
import { GateCopy } from "./GateCopy";
import { InteriorHomepage } from "@/components/home/InteriorHomepage";

const ENTER_DURATION_MS = 1700;

type Star = {
  left: string;
  top: string;
  size: number;
  opacity: number;
  color: "soft" | "gold";
  blur?: number;
  twinkle?: boolean;
};

const STARS: Star[] = [
  { left: "6%", top: "8%", size: 1.6, opacity: 0.42, color: "soft" },
  { left: "12%", top: "14%", size: 1.2, opacity: 0.3, color: "soft" },
  { left: "18%", top: "10%", size: 1.8, opacity: 0.48, color: "gold", twinkle: true },
  { left: "24%", top: "18%", size: 1.3, opacity: 0.26, color: "soft" },
  { left: "31%", top: "9%", size: 1.5, opacity: 0.36, color: "soft" },
  { left: "38%", top: "15%", size: 1.9, opacity: 0.46, color: "gold" },
  { left: "44%", top: "8%", size: 1.2, opacity: 0.28, color: "soft" },
  { left: "51%", top: "13%", size: 1.5, opacity: 0.34, color: "soft" },
  { left: "58%", top: "9%", size: 1.8, opacity: 0.44, color: "gold", twinkle: true },
  { left: "64%", top: "17%", size: 1.3, opacity: 0.28, color: "soft" },
  { left: "71%", top: "10%", size: 1.6, opacity: 0.38, color: "soft" },
  { left: "78%", top: "14%", size: 1.9, opacity: 0.46, color: "gold" },
  { left: "85%", top: "9%", size: 1.4, opacity: 0.34, color: "soft" },
  { left: "91%", top: "16%", size: 1.7, opacity: 0.42, color: "soft" },

  { left: "8%", top: "26%", size: 1.1, opacity: 0.22, color: "soft" },
  { left: "16%", top: "33%", size: 1.4, opacity: 0.3, color: "soft" },
  { left: "23%", top: "28%", size: 1.2, opacity: 0.24, color: "soft" },
  { left: "29%", top: "36%", size: 1.7, opacity: 0.4, color: "gold" },
  { left: "36%", top: "30%", size: 1.2, opacity: 0.22, color: "soft" },
  { left: "43%", top: "39%", size: 1.5, opacity: 0.32, color: "soft" },
  { left: "50%", top: "27%", size: 1.3, opacity: 0.24, color: "soft" },
  { left: "57%", top: "35%", size: 1.8, opacity: 0.42, color: "gold", twinkle: true },
  { left: "63%", top: "29%", size: 1.1, opacity: 0.2, color: "soft" },
  { left: "70%", top: "38%", size: 1.4, opacity: 0.3, color: "soft" },
  { left: "77%", top: "31%", size: 1.2, opacity: 0.22, color: "soft" },
  { left: "84%", top: "37%", size: 1.6, opacity: 0.34, color: "gold" },
  { left: "90%", top: "28%", size: 1.2, opacity: 0.22, color: "soft" },

  { left: "7%", top: "48%", size: 1.1, opacity: 0.18, color: "soft" },
  { left: "15%", top: "56%", size: 1.3, opacity: 0.24, color: "soft" },
  { left: "22%", top: "50%", size: 1.1, opacity: 0.18, color: "soft" },
  { left: "30%", top: "61%", size: 1.4, opacity: 0.26, color: "soft" },
  { left: "39%", top: "53%", size: 1.2, opacity: 0.2, color: "soft" },
  { left: "48%", top: "58%", size: 1.5, opacity: 0.3, color: "gold" },
  { left: "56%", top: "50%", size: 1.1, opacity: 0.18, color: "soft" },
  { left: "65%", top: "63%", size: 1.4, opacity: 0.24, color: "soft" },
  { left: "73%", top: "54%", size: 1.2, opacity: 0.2, color: "soft" },
  { left: "81%", top: "60%", size: 1.5, opacity: 0.28, color: "soft" },
  { left: "89%", top: "52%", size: 1.2, opacity: 0.2, color: "soft" },

  { left: "10%", top: "72%", size: 1, opacity: 0.14, color: "soft" },
  { left: "19%", top: "80%", size: 1.1, opacity: 0.16, color: "soft" },
  { left: "28%", top: "74%", size: 1, opacity: 0.14, color: "soft" },
  { left: "40%", top: "84%", size: 1.2, opacity: 0.18, color: "soft" },
  { left: "52%", top: "76%", size: 1.1, opacity: 0.16, color: "soft" },
  { left: "63%", top: "88%", size: 1.2, opacity: 0.18, color: "soft" },
  { left: "75%", top: "79%", size: 1.1, opacity: 0.16, color: "soft" },
  { left: "87%", top: "86%", size: 1.2, opacity: 0.18, color: "soft" },
];

export function TempleGate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefersReducedMotion = useReducedMotion();

  const shouldOpenInterior = searchParams.get("interior") === "1";

  const [isEntering, setIsEntering] = useState(false);
  const [showInterior, setShowInterior] = useState(shouldOpenInterior);

  useEffect(() => {
    if (shouldOpenInterior) {
      setIsEntering(true);
      setShowInterior(true);
    } else {
      setIsEntering(false);
      setShowInterior(false);
    }
  }, [shouldOpenInterior]);

  useEffect(() => {
    if (!isEntering || showInterior) return;

    if (prefersReducedMotion) {
      setShowInterior(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setShowInterior(true);
    }, ENTER_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [isEntering, showInterior, prefersReducedMotion]);

  const handleEnter = () => {
    setIsEntering(true);

    if (prefersReducedMotion) {
      setShowInterior(true);
      router.replace("/?interior=1", { scroll: false });
      return;
    }

    window.setTimeout(() => {
      router.replace("/?interior=1", { scroll: false });
    }, 250);
  };

  const overlayClassName = useMemo(() => {
    return showInterior
      ? "bg-[radial-gradient(circle_at_center,rgba(255,244,220,0.18),transparent_26%),linear-gradient(180deg,#1a1813_0%,#0b0b09_38%,#070707_100%)]"
      : "bg-[radial-gradient(circle_at_center,rgba(255,183,77,0.06),transparent_34%),linear-gradient(180deg,#0b0b09_0%,#090908_100%)]";
  }, [showInterior]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-colors duration-1000 ${overlayClassName}`}
      />

      <CelestialField reducedMotion={!!prefersReducedMotion} />

      <AnimatePresence mode="wait">
        {!showInterior ? (
          <motion.section
            key="gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.55,
              ease: "easeOut",
            }}
            className="relative min-h-[100svh] px-5 sm:px-6"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[50%] h-[24rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(120,70,18,0.12) 0%, rgba(120,70,18,0.06) 28%, rgba(0,0,0,0) 68%)",
                filter: "blur(28px)",
              }}
            />

            <div className="mx-auto flex min-h-[100svh] w-full max-w-5xl items-center justify-center px-2 pt-6 pb-6 sm:pt-8 sm:pb-8 md:pt-10 md:pb-10">
              <div className="flex w-full flex-col items-center justify-center gap-5 sm:gap-6 md:gap-7 threshold-door-compact threshold-copy-compact">
                <DoorFrame isEntering={isEntering} />
                <GateCopy isEntering={isEntering} onEnter={handleEnter} />
              </div>
            </div>

            <LightTransition isEntering={isEntering} />
          </motion.section>
        ) : (
          <motion.section
            key="interior"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0.15 : 0.9,
              ease: "easeOut",
            }}
            className="relative min-h-screen"
          >
            <InteriorHomepage />
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

function CelestialField({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 18%, rgba(120,90,40,0.12) 0%, rgba(120,90,40,0.05) 24%, transparent 58%)",
          filter: "blur(24px)",
        }}
      />

      {STARS.map((star, i) => {
        const color =
          star.color === "gold"
            ? "rgba(202,169,107,1)"
            : "rgba(255,244,214,1)";

        const glow =
          star.color === "gold"
            ? `0 0 ${star.size * 7}px rgba(202,169,107,0.22)`
            : `0 0 ${star.size * 6}px rgba(255,244,214,0.12)`;

        const commonStyle = {
          left: star.left,
          top: star.top,
          width: `${star.size}px`,
          height: `${star.size}px`,
          opacity: star.opacity,
          backgroundColor: color,
          boxShadow: glow,
          filter: star.blur ? `blur(${star.blur}px)` : undefined,
        } as const;

        if (star.twinkle && !reducedMotion) {
          return (
            <motion.span
              key={i}
              aria-hidden="true"
              className="pointer-events-none absolute rounded-full"
              style={commonStyle}
              animate={{
                opacity: [star.opacity * 0.75, star.opacity, star.opacity * 0.7],
                scale: [1, 1.12, 1],
              }}
              transition={{
                duration: 3.8 + (i % 3),
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          );
        }

        return (
          <span
            key={i}
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full"
            style={commonStyle}
          />
        );
      })}
    </>
  );
}

type LightTransitionProps = {
  isEntering: boolean;
};

function LightTransition({ isEntering }: LightTransitionProps) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: isEntering ? 1 : 0 }}
      transition={{ duration: 0.85, ease: "easeOut" }}
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at 50% 42%, rgba(255, 244, 214, 0.95) 0%, rgba(255, 235, 190, 0.88) 18%, rgba(255, 221, 156, 0.52) 34%, rgba(255,255,255,0.0) 68%)",
      }}
    />
  );
}