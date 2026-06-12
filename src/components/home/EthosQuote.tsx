"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight } from "lucide-react";

/* The signature scroll moment: a pinned sage-dark band where the brand line
   illuminates word by word as you scroll through it — then releases. */

const QUOTE =
  "At NewFuture Therapy, we believe that growth begins with understanding.".split(" ");

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

export default function EthosQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const ctaOpacity = useTransform(scrollYProgress, [0.72, 0.92], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.72, 0.92], [24, 0]);

  return (
    <div ref={ref} className="relative h-[220vh] bg-sage-dark">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Drifting ellipse atmosphere */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 800 600" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <ellipse cx="650" cy="150" rx="350" ry="300" fill="#F5F3EF" />
            <ellipse cx="150" cy="480" rx="250" ry="220" fill="#C4D9C6" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <p className="font-body text-sm text-sage-light tracking-[0.25em] uppercase mb-10">
            Our Approach
          </p>
          <blockquote className="font-heading text-4xl md:text-5xl lg:text-6xl font-light italic leading-snug text-cream mb-12">
            {QUOTE.map((word, i) => {
              const start = 0.1 + (i / QUOTE.length) * 0.55;
              const end = start + 0.55 / QUOTE.length;
              return (
                <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />
              );
            })}
          </blockquote>

          <motion.div style={{ opacity: ctaOpacity, y: ctaY }}>
            <Link
              href="/our-approach"
              className="inline-flex items-center gap-2 font-body text-sm border border-sage-light text-sage-light px-6 py-3 rounded-full hover:bg-sage-light hover:text-sage-dark transition-colors duration-200"
            >
              Read our ethos
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
