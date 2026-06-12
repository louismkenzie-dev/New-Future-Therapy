"use client";

import { useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* Pinned scenes (the Apple wipe, softened): the band pins to the viewport and
   scenes breathe in and out one at a time as the user scrolls. Each scene owns
   an exclusive window with a dead-zone gap either side, so two scenes can
   never be visible at once — between them the band simply breathes. A dot
   rail, scene counter and a "next" button let the user step through without
   scrolling. */

export interface Scene {
  icon: LucideIcon;
  eyebrow: string;
  line: string; // a single distilled sentence
}

/* Large line-veined leaf watermark behind each scene */
function LeafWatermark() {
  return (
    <svg
      viewBox="0 0 180 220"
      fill="none"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[540px] opacity-[0.05] pointer-events-none"
      aria-hidden="true"
    >
      <path d="M90 200 C20 150 10 80 90 20 C170 80 160 150 90 200Z" fill="#3A5A40" />
      <line x1="90" y1="200" x2="90" y2="20" stroke="#F5F3EF" strokeWidth="2" />
      <line x1="90" y1="120" x2="50" y2="80" stroke="#F5F3EF" strokeWidth="1.5" />
      <line x1="90" y1="140" x2="130" y2="100" stroke="#F5F3EF" strokeWidth="1.5" />
      <line x1="90" y1="160" x2="55" y2="130" stroke="#F5F3EF" strokeWidth="1.5" />
      <line x1="90" y1="100" x2="125" y2="70" stroke="#F5F3EF" strokeWidth="1.5" />
    </svg>
  );
}

function ScenePanel({
  scene,
  index,
  count,
  progress,
}: {
  scene: Scene;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const Icon = scene.icon;

  /* Exclusive window: each scene owns slice [i/n, (i+1)/n], but is only
     visible inside [start+gap .. end-gap]. Adjacent gaps form a breath of
     empty band between scenes — no two scenes can ever overlap. */
  const slice = 1 / count;
  const start = index * slice;
  const end = start + slice;
  const gap = 0.1 * slice;
  const fadeSpan = 0.18 * slice;

  const opacity = useTransform(
    progress,
    index === 0
      ? [0, end - gap - fadeSpan, end - gap]
      : index === count - 1
        ? [start + gap, start + gap + fadeSpan, 1]
        : [start + gap, start + gap + fadeSpan, end - gap - fadeSpan, end - gap],
    index === 0
      ? [1, 1, 0]
      : index === count - 1
        ? [0, 1, 1]
        : [0, 1, 1, 0]
  );
  /* Hard-remove from paint outside the window — belt and braces against
     any double exposure during fast scrolling */
  const visibility = useTransform(opacity, (v) =>
    v < 0.02 ? ("hidden" as const) : ("visible" as const)
  );
  const y = useTransform(progress, [start, end], [22, -22]);
  const ringScale = useTransform(opacity, [0, 1], [0.92, 1]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none"
      style={{ opacity, visibility }}
    >
      <LeafWatermark />
      <motion.div className="relative max-w-2xl text-center" style={{ y }}>
        {/* Icon held in its own small breathing ring */}
        <motion.span
          className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-white border border-sage-light shadow-sm mb-8"
          style={{ scale: ringScale }}
        >
          <motion.span
            className="absolute inset-[-10px] rounded-full border border-sage/25"
            animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.15, 0.6] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <Icon size={32} strokeWidth={1.5} className="text-sage-dark" />
        </motion.span>

        {/* Sage dash, the area-card signature */}
        <span className="block w-8 h-0.5 bg-sage mx-auto mb-6" aria-hidden="true" />

        <p className="font-body text-xs text-sage-dark uppercase tracking-[0.3em] mb-6">
          {scene.eyebrow}
        </p>
        <p className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-charcoal leading-snug">
          {scene.line}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function SceneSequence({ scenes }: { scenes: Scene[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const n = scenes.length;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setCurrent(Math.min(n - 1, Math.max(0, Math.floor(v * n))));
  });

  /* Drifting parallax blobs behind everything */
  const blobY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const blobX = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  /* Auto-scroll to a scene's centre (or just past the band for i >= n) */
  const scrollToScene = useCallback(
    (i: number) => {
      const el = ref.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const travel = el.offsetHeight - window.innerHeight;
      const target =
        i >= n
          ? top + el.offsetHeight - window.innerHeight * 0.1
          : top + ((i + 0.5) / n) * travel;
      window.scrollTo({ top: target, behavior: "smooth" });
    },
    [n]
  );

  if (reduced) {
    return (
      <section className="bg-cream py-24 px-6">
        <div className="max-w-2xl mx-auto space-y-20 text-center">
          {scenes.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i}>
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage-pale border border-sage-light mb-8">
                  <Icon size={28} strokeWidth={1.5} className="text-sage-dark" />
                </span>
                <p className="font-body text-xs text-sage-dark uppercase tracking-[0.3em] mb-6">
                  {s.eyebrow}
                </p>
                <p className="font-heading text-3xl font-light text-charcoal leading-snug">
                  {s.line}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <div ref={ref} className="relative bg-cream" style={{ height: `${n * 110}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Drifting soft blobs */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: blobY, x: blobX }}
          aria-hidden="true"
        >
          <div className="absolute -top-24 right-[8%] w-[420px] h-[380px] rounded-full bg-sage-light/30 blur-3xl" />
          <div className="absolute bottom-[5%] left-[4%] w-[340px] h-[320px] rounded-full bg-sage/15 blur-3xl" />
        </motion.div>

        {/* Breathing rings holding the scenes */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          {[480, 720, 980].map((size, i) => (
            <motion.div
              key={size}
              className="absolute rounded-full border border-sage/15"
              style={{ width: size, height: size }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.9,
              }}
            />
          ))}
        </div>

        {/* Scene counter */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20">
          <p className="font-body text-xs text-sage-dark tracking-[0.3em]">
            {String(current + 1).padStart(2, "0")}
            <span className="text-sage/50 mx-2">/</span>
            <span className="text-sage/70">{String(n).padStart(2, "0")}</span>
          </p>
        </div>

        {/* Dot rail — jump to any scene */}
        <div className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
          {scenes.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToScene(i)}
              aria-label={`Go to: ${s.eyebrow}`}
              className="group relative flex items-center justify-center w-11 h-11"
            >
              <span
                className={`rounded-full transition-all duration-500 ${
                  i === current
                    ? "w-2.5 h-2.5 bg-sage-dark"
                    : "w-1.5 h-1.5 bg-sage/40 group-hover:bg-sage"
                }`}
              />
            </button>
          ))}
        </div>

        {/* The scenes */}
        {scenes.map((scene, i) => (
          <ScenePanel
            key={i}
            scene={scene}
            index={i}
            count={n}
            progress={scrollYProgress}
          />
        ))}

        {/* Next-scene button */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <motion.button
            type="button"
            onClick={() => scrollToScene(current + 1)}
            aria-label={current < n - 1 ? "Next thought" : "Continue"}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-sage-light shadow-sm text-sage-dark hover:bg-sage-pale hover:border-sage transition-colors duration-300"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} strokeWidth={1.75} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
