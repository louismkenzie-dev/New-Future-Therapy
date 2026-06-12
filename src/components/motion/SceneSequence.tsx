"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import type { LucideIcon } from "lucide-react";

/* Pinned crossfade scenes (the Apple wipe, softened): the band pins to the
   viewport and successive scenes breathe in and out in place as the user
   scrolls — one thought at a time, nothing competing for attention. */

export interface Scene {
  icon: LucideIcon;
  eyebrow: string;
  line: string; // a single distilled sentence
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
  /* Each scene owns an equal slice of the scroll; crossfade at the joins */
  const sliceStart = index / count;
  const sliceEnd = (index + 1) / count;
  const fade = 0.12 / count;

  const opacity = useTransform(
    progress,
    index === 0
      ? [0, sliceEnd - fade, sliceEnd]
      : index === count - 1
        ? [sliceStart, sliceStart + fade, 1]
        : [sliceStart, sliceStart + fade, sliceEnd - fade, sliceEnd],
    index === 0
      ? [1, 1, 0]
      : index === count - 1
        ? [0, 1, 1]
        : [0, 1, 1, 0]
  );
  const y = useTransform(progress, [sliceStart, sliceEnd], [28, -28]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6"
      style={{ opacity }}
    >
      <motion.div className="max-w-2xl text-center" style={{ y }}>
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage-pale border border-sage-light mb-8">
          <Icon size={28} strokeWidth={1.5} className="text-sage-dark" />
        </span>
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

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
    <div
      ref={ref}
      className="relative bg-cream"
      style={{ height: `${scenes.length * 90}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
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

        {scenes.map((scene, i) => (
          <ScenePanel
            key={i}
            scene={scene}
            index={i}
            count={scenes.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}
