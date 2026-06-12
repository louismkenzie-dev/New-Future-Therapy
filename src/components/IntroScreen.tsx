"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

/* Brand intro in two weights:
   — "full": leaf draws stroke by stroke, wordmark rises, tagline fades —
     plays on initial load and refresh.
   — "quick": just the leaf drawing itself, much faster — plays on every
     client-side navigation between pages.
   Skipped entirely for reduced-motion users. */

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Variant = "full" | "quick";

/* Timings per variant (ms / s) */
const TIMING = {
  full: {
    exitAt: 2600, // curtain starts lifting
    doneAt: 3700, // unmount
    curtain: 1.1, // curtain lift duration (s)
    draw: 1.2, // leaf outline draw (s)
    fillDelay: 1.0,
    fillDur: 0.8,
    veinDelay: 1.2,
    veinStep: 0.08,
    veinDur: 0.5,
  },
  quick: {
    exitAt: 1000,
    doneAt: 1650,
    curtain: 0.65,
    draw: 0.6,
    fillDelay: 0.45,
    fillDur: 0.35,
    veinDelay: 0.55,
    veinStep: 0.04,
    veinDur: 0.25,
  },
} as const;

const VEINS = [
  { x1: 90, y1: 200, x2: 90, y2: 20, w: 3 },
  { x1: 90, y1: 120, x2: 50, y2: 80, w: 2.5 },
  { x1: 90, y1: 140, x2: 130, y2: 100, w: 2.5 },
  { x1: 90, y1: 160, x2: 55, y2: 130, w: 2.5 },
  { x1: 90, y1: 100, x2: 125, y2: 70, w: 2.5 },
];

function LeafDraw({ variant }: { variant: Variant }) {
  const t = TIMING[variant];
  return (
    <svg width="90" height="110" viewBox="0 0 180 220" fill="none" aria-hidden="true">
      {/* Leaf outline draws in */}
      <motion.path
        d="M90 200 C20 150 10 80 90 20 C170 80 160 150 90 200Z"
        stroke="#3A5A40"
        strokeWidth="3"
        fill="#3A5A40"
        initial={{ pathLength: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, fillOpacity: 1 }}
        transition={{
          pathLength: { duration: t.draw, ease: "easeInOut" },
          fillOpacity: { duration: t.fillDur, delay: t.fillDelay },
        }}
      />
      {/* Veins fade in after the fill */}
      {VEINS.map((v, i) => (
        <motion.line
          key={i}
          {...{ x1: v.x1, y1: v.y1, x2: v.x2, y2: v.y2 }}
          stroke="#F5F3EF"
          strokeWidth={v.w}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: t.veinDur,
            delay: t.veinDelay + i * t.veinStep,
            ease: "easeOut",
          }}
        />
      ))}
    </svg>
  );
}

export default function IntroScreen() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [variant, setVariant] = useState<Variant>("full");
  /* Bump on each play so the curtain (and the leaf draw inside it) fully
     remounts and re-runs its animation, even when the route stays mounted. */
  const [runId, setRunId] = useState(0);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    /* Full intro on the initial load/refresh; quick leaf-only on navigation */
    const v: Variant = isFirstLoad.current ? "full" : "quick";
    isFirstLoad.current = false;
    const t = TIMING[v];

    setVariant(v);
    setLeaving(false);
    setShow(true);
    setRunId((n) => n + 1);
    document.documentElement.style.overflow = "hidden";

    const exitTimer = setTimeout(() => setLeaving(true), t.exitAt);
    const doneTimer = setTimeout(() => {
      setShow(false);
      document.documentElement.style.overflow = "";
    }, t.doneAt);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.documentElement.style.overflow = "";
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={runId}
          className="fixed inset-0 z-[100] bg-cream flex items-center justify-center"
          /* Quick (navigation) variant breathes in and out — a soft fade,
             like an exhale — while the full intro keeps its curtain lift. */
          initial={variant === "quick" ? { opacity: 0 } : false}
          animate={
            variant === "quick"
              ? { opacity: leaving ? 0 : 1 }
              : { y: leaving ? "-100%" : 0 }
          }
          exit={variant === "quick" ? { opacity: 0 } : { y: "-100%" }}
          transition={{
            duration: variant === "quick" ? 0.45 : TIMING.full.curtain,
            ease: variant === "quick" ? "easeInOut" : EASE_OUT,
          }}
        >
          <div className="flex flex-col items-center">
            <LeafDraw variant={variant} />

            {variant === "full" && (
              <>
                <div className="overflow-hidden mt-6">
                  <motion.div
                    className="flex flex-col items-center leading-none"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 1.4, ease: EASE_OUT }}
                  >
                    <span className="font-heading text-4xl font-semibold text-sage-dark tracking-wide">
                      NewFuture
                    </span>
                    <span className="font-body text-sm text-muted uppercase tracking-[0.3em] mt-1">
                      Therapy
                    </span>
                  </motion.div>
                </div>

                <motion.p
                  className="font-heading italic text-lg text-sage mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.9 }}
                >
                  growth begins with understanding
                </motion.p>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
