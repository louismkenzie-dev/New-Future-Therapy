"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

/* Pinned scroll moment: text illuminates word by word as the user scrolls
   through the band — the site's signature interaction (see home ethos quote). */

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span className="inline-block mr-[0.3em]" style={{ opacity }}>
      {word}
    </motion.span>
  );
}

export default function ScrollIlluminate({
  text,
  eyebrow,
  children,
  height = "200vh",
}: {
  text: string;
  eyebrow?: string;
  /* Rendered beneath the text, fading in near the end of the scroll */
  children?: ReactNode;
  height?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const words = text.split(" ");
  /* Words finish illuminating at ~0.65 (0.1 start + 0.55 span). Reveal the
     buttons right after, then hold them: useTransform clamps, so once shown
     they stay visible (and the text stays lit) for the rest of the downward
     scroll — both only reverse when the user scrolls back up. */
  const tailOpacity = useTransform(scrollYProgress, [0.6, 0.72], [0, 1]);
  const tailY = useTransform(scrollYProgress, [0.6, 0.72], [24, 0]);

  return (
    <div ref={ref} className="relative bg-sage-dark" style={{ height }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 800 600" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <ellipse cx="650" cy="150" rx="350" ry="300" fill="#F5F3EF" />
            <ellipse cx="150" cy="480" rx="250" ry="220" fill="#C4D9C6" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          {eyebrow && (
            <p className="font-body text-sm text-sage-light tracking-[0.25em] uppercase mb-10">
              {eyebrow}
            </p>
          )}
          <blockquote className="font-heading text-4xl md:text-5xl lg:text-6xl font-light italic leading-snug text-cream mb-12">
            {words.map((word, i) => {
              const start = 0.1 + (i / words.length) * 0.55;
              const end = start + 0.55 / words.length;
              return (
                <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />
              );
            })}
          </blockquote>

          {children && (
            <motion.div style={{ opacity: tailOpacity, y: tailY }}>
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
