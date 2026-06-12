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

/* Apple-style pinned horizontal journey: the section pins to the viewport
   and vertical scroll drives horizontal travel through full-screen chapters.
   A progress vein draws along the bottom. Reduced-motion users get a plain
   vertical stack of the same chapters. */

const EASE_NOTE = "easeInOut";

export interface JourneyChapter {
  era: string; // small tracked label, e.g. "The Beginning"
  title: string; // serif chapter title
  body: string; // one or two short sentences, never more
  icon: LucideIcon;
}

function ChapterPanel({
  chapter,
  index,
  count,
  progress,
}: {
  chapter: JourneyChapter;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const Icon = chapter.icon;
  /* Each chapter breathes in as it crosses the centre of the journey.
     Input ranges MUST stay within [0,1] — motion can bind these as WAAPI
     keyframe offsets, and out-of-range offsets throw at mount. */
  const centre = count <= 1 ? 0 : index / (count - 1);
  const window = 0.5 / Math.max(count - 1, 1);
  const range =
    index === 0
      ? [0, window]
      : index === count - 1
        ? [1 - window, 1]
        : [centre - window, centre, centre + window];
  const opacityOut =
    index === 0 ? [1, 0.35] : index === count - 1 ? [0.35, 1] : [0.35, 1, 0.35];
  const scaleOut =
    index === 0 ? [1, 0.94] : index === count - 1 ? [0.94, 1] : [0.94, 1, 0.94];
  const opacity = useTransform(progress, range, opacityOut);
  const scale = useTransform(progress, range, scaleOut);

  return (
    <div className="w-screen h-full shrink-0 flex items-center justify-center px-6">
      <motion.div
        className="max-w-xl text-center"
        style={{ opacity, scale }}
      >
        <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white border border-sage-light shadow-sm mb-8">
          <motion.span
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: EASE_NOTE, delay: index * 0.4 }}
          >
            <Icon size={32} strokeWidth={1.5} className="text-sage-dark" />
          </motion.span>
        </span>

        <p className="font-body text-xs text-sage-dark uppercase tracking-[0.3em] mb-4">
          {String(index + 1).padStart(2, "0")} &mdash; {chapter.era}
        </p>
        <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-charcoal leading-tight mb-6">
          {chapter.title}
        </h3>
        <p className="font-body text-base md:text-lg text-muted leading-relaxed max-w-md mx-auto">
          {chapter.body}
        </p>
      </motion.div>
    </div>
  );
}

export default function HorizontalJourney({
  chapters,
  eyebrow,
}: {
  chapters: JourneyChapter[];
  eyebrow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const n = chapters.length;
  /* Track translates from 0 to -(n-1) screens as the user scrolls */
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(n - 1) * 100}vw`]);
  const veinScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  /* Background ellipses drift slower than the chapters for depth */
  const bgX = useTransform(scrollYProgress, [0, 1], ["0vw", "-30vw"]);

  /* Reduced motion: a calm vertical stack, no pinning */
  if (reduced) {
    return (
      <section className="bg-sage-pale py-24 px-6">
        <div className="max-w-xl mx-auto space-y-20">
          {chapters.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="text-center">
                <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white border border-sage-light shadow-sm mb-8">
                  <Icon size={32} strokeWidth={1.5} className="text-sage-dark" />
                </span>
                <p className="font-body text-xs text-sage-dark uppercase tracking-[0.3em] mb-4">
                  {String(i + 1).padStart(2, "0")} &mdash; {c.era}
                </p>
                <h3 className="font-heading text-4xl font-light text-charcoal leading-tight mb-6">
                  {c.title}
                </h3>
                <p className="font-body text-base text-muted leading-relaxed">{c.body}</p>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <div ref={ref} className="relative bg-sage-pale" style={{ height: `${n * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Soft background ellipses, drifting slower than the chapters */}
        <motion.div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{ x: bgX }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 1600 800" fill="none" className="w-[160vw] h-full" preserveAspectRatio="xMidYMid slice">
            <ellipse cx="300" cy="180" rx="320" ry="280" fill="#C4D9C6" opacity="0.5" />
            <ellipse cx="1000" cy="600" rx="380" ry="300" fill="#6B8C6F" opacity="0.18" />
            <ellipse cx="1450" cy="220" rx="260" ry="240" fill="#C4D9C6" opacity="0.4" />
          </svg>
        </motion.div>

        {eyebrow && (
          <p className="absolute top-10 left-1/2 -translate-x-1/2 font-body text-xs text-sage-dark uppercase tracking-[0.3em] z-10">
            {eyebrow}
          </p>
        )}

        {/* The horizontal track */}
        <motion.div className="flex h-full" style={{ x }}>
          {chapters.map((chapter, i) => (
            <ChapterPanel
              key={i}
              chapter={chapter}
              index={i}
              count={n}
              progress={scrollYProgress}
            />
          ))}
        </motion.div>

        {/* Progress vein along the bottom */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 z-10">
          <div className="h-px bg-sage/25 w-full" />
          <motion.div
            className="h-px bg-sage-dark -mt-px origin-left"
            style={{ scaleX: veinScale }}
          />
          <div className="flex justify-between mt-3">
            {chapters.map((_, i) => (
              <ChapterDot key={i} index={i} count={n} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChapterDot({
  index,
  count,
  progress,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  /* Same clamping rule as ChapterPanel: ranges must stay within [0,1] */
  const centre = count <= 1 ? 0 : index / (count - 1);
  const window = 0.5 / Math.max(count - 1, 1);
  const range =
    index === 0
      ? [0, window]
      : index === count - 1
        ? [1 - window, 1]
        : [centre - window, centre, centre + window];
  const opacityOut =
    index === 0 ? [1, 0.3] : index === count - 1 ? [0.3, 1] : [0.3, 1, 0.3];
  const opacity = useTransform(progress, range, opacityOut);
  return (
    <motion.span
      className="w-1.5 h-1.5 rounded-full bg-sage-dark"
      style={{ opacity }}
    />
  );
}
