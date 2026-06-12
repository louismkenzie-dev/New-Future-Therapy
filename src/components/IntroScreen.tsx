"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* Brand intro: the leaf glyph draws itself stroke by stroke, the wordmark
   rises beneath it, then the cream curtain lifts to reveal the page.
   Shown once per browser session; skipped for reduced-motion users. */

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function IntroScreen() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("nf-intro-seen");
    if (reduced || seen) return;

    sessionStorage.setItem("nf-intro-seen", "1");
    setShow(true);
    document.documentElement.style.overflow = "hidden";

    const exitTimer = setTimeout(() => setLeaving(true), 2600);
    const doneTimer = setTimeout(() => {
      setShow(false);
      document.documentElement.style.overflow = "";
    }, 3700);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] bg-cream flex items-center justify-center"
          initial={false}
          animate={leaving ? { y: "-100%" } : { y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: EASE_OUT }}
        >
          <div className="flex flex-col items-center">
            <svg
              width="90"
              height="110"
              viewBox="0 0 180 220"
              fill="none"
              aria-hidden="true"
            >
              {/* Leaf outline draws in */}
              <motion.path
                d="M90 200 C20 150 10 80 90 20 C170 80 160 150 90 200Z"
                stroke="#3A5A40"
                strokeWidth="3"
                fill="#3A5A40"
                initial={{ pathLength: 0, fillOpacity: 0 }}
                animate={{ pathLength: 1, fillOpacity: 1 }}
                transition={{
                  pathLength: { duration: 1.2, ease: "easeInOut" },
                  fillOpacity: { duration: 0.8, delay: 1.0 },
                }}
              />
              {/* Veins fade in after the fill */}
              {[
                { x1: 90, y1: 200, x2: 90, y2: 20, w: 3 },
                { x1: 90, y1: 120, x2: 50, y2: 80, w: 2.5 },
                { x1: 90, y1: 140, x2: 130, y2: 100, w: 2.5 },
                { x1: 90, y1: 160, x2: 55, y2: 130, w: 2.5 },
                { x1: 90, y1: 100, x2: 125, y2: 70, w: 2.5 },
              ].map((v, i) => (
                <motion.line
                  key={i}
                  {...{ x1: v.x1, y1: v.y1, x2: v.x2, y2: v.y2 }}
                  stroke="#F5F3EF"
                  strokeWidth={v.w}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + i * 0.08, ease: "easeOut" }}
                />
              ))}
            </svg>

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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
