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
    <main className="relative min-h-screen overflow-hidden bg-(--bg) text-(--text)">
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-colors duration-1000 ${overlayClassName}`}
      />

      <AnimatePresence mode="wait">
        {!showInterior ? (
          <motion.section
            key="gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: "easeOut" }}
            className="relative flex min-h-screen items-center justify-center px-5 py-10 sm:px-6"
          >
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center">
              <DoorFrame isEntering={isEntering} />
              <GateCopy isEntering={isEntering} onEnter={handleEnter} />
            </div>

            <LightTransition isEntering={isEntering} />
          </motion.section>
        ) : (
          <motion.section
            key="interior"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.9, ease: "easeOut" }}
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

function TrueHomepagePlaceholder() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 font-display text-[11px] uppercase tracking-[0.42em] text-(--gold) sm:text-xs">
          You Have Entered the House
        </p>

        <h1 className="text-4xl leading-[0.95] sm:text-5xl md:text-6xl">
          The True Homepage Begins Here
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-(--muted)">
          Next, we build the interior homepage experience: darker, deeper, more sacred,
          and designed as though the visitor has crossed the threshold.
        </p>
      </div>
    </div>
  );
}