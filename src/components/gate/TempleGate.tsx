"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { DoorFrame } from "./DoorFrame";
import { GateCopy } from "./GateCopy";
import { InteriorHomepage } from "@/components/home/InteriorHomepage";

const ENTER_DURATION_MS = 1700;

export function TempleGate() {
  const [isEntering, setIsEntering] = useState(false);
  const [showInterior, setShowInterior] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isEntering) return;

    if (prefersReducedMotion) {
      setShowInterior(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setShowInterior(true);
    }, ENTER_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [isEntering, prefersReducedMotion]);

  const handleEnter = () => {
    setIsEntering(true);
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

      {/* celestial field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.24]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 14% 16%, rgba(255,244,214,0.85) 0px, rgba(255,244,214,0.85) 1px, transparent 1.8px),
            radial-gradient(circle at 22% 28%, rgba(255,244,214,0.55) 0px, rgba(255,244,214,0.55) 1px, transparent 1.9px),
            radial-gradient(circle at 36% 14%, rgba(255,244,214,0.7) 0px, rgba(255,244,214,0.7) 1px, transparent 1.8px),
            radial-gradient(circle at 48% 10%, rgba(255,244,214,0.55) 0px, rgba(255,244,214,0.55) 1px, transparent 2px),
            radial-gradient(circle at 62% 20%, rgba(255,244,214,0.6) 0px, rgba(255,244,214,0.6) 1px, transparent 1.9px),
            radial-gradient(circle at 74% 14%, rgba(255,244,214,0.72) 0px, rgba(255,244,214,0.72) 1px, transparent 1.8px),
            radial-gradient(circle at 86% 24%, rgba(255,244,214,0.55) 0px, rgba(255,244,214,0.55) 1px, transparent 1.9px),
            radial-gradient(circle at 18% 42%, rgba(255,244,214,0.35) 0px, rgba(255,244,214,0.35) 1px, transparent 2px),
            radial-gradient(circle at 80% 38%, rgba(255,244,214,0.32) 0px, rgba(255,244,214,0.32) 1px, transparent 2px)
          `,
        }}
      />

      {/* sparse gold stars */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 16% 18%, rgba(202,169,107,0.95) 0px, rgba(202,169,107,0.95) 1.2px, transparent 2.2px),
            radial-gradient(circle at 44% 12%, rgba(202,169,107,0.8) 0px, rgba(202,169,107,0.8) 1.2px, transparent 2.2px),
            radial-gradient(circle at 68% 16%, rgba(202,169,107,0.75) 0px, rgba(202,169,107,0.75) 1.2px, transparent 2.2px),
            radial-gradient(circle at 84% 28%, rgba(202,169,107,0.72) 0px, rgba(202,169,107,0.72) 1.2px, transparent 2.2px)
          `,
        }}
      />

      {/* faint upper haze */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 18%, rgba(120,90,40,0.12) 0%, rgba(120,90,40,0.05) 24%, transparent 58%)",
          filter: "blur(24px)",
        }}
      />

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
              className="pointer-events-none absolute left-1/2 top-[58%] h-[26rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(120,70,18,0.12) 0%, rgba(120,70,18,0.06) 28%, rgba(0,0,0,0) 68%)",
                filter: "blur(28px)",
              }}
            />

            <div className="mx-auto flex min-h-[100svh] w-full max-w-5xl items-start justify-center pt-[5.5rem] pb-8 sm:pt-[6rem] md:pt-[6.5rem]">
              <div className="flex w-full flex-col items-center justify-start">
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