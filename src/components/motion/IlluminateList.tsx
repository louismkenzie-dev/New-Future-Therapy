"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

/* A vertical vein line draws downward as the user scrolls, and each item
   illuminates in turn as the line reaches it — the word-illumination idea
   applied to whole thoughts. Scroll-linked and reversible. */

function Item({
  children,
  index,
  count,
  progress,
}: {
  children: ReactNode;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const start = index / count;
  const end = start + 0.75 / count;
  const opacity = useTransform(progress, [start, end], [0.22, 1]);
  const x = useTransform(progress, [start, end], [12, 0]);
  const dotScale = useTransform(progress, [start, end], [0.5, 1]);

  return (
    <motion.li className="relative flex gap-5 pl-8" style={{ opacity, x }}>
      <motion.span
        className="absolute left-0 top-2 w-2.5 h-2.5 rounded-full bg-sage"
        style={{ scale: dotScale }}
        aria-hidden="true"
      />
      <div className="font-body text-base md:text-lg text-charcoal leading-relaxed">
        {children}
      </div>
    </motion.li>
  );
}

export default function IlluminateList({
  items,
  className,
}: {
  items: ReactNode[];
  className?: string;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.78", "end 0.5"],
  });
  const veinScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <ul ref={ref} className={`relative space-y-10 ${className ?? ""}`}>
      {/* The vein */}
      <div
        className="absolute left-[4px] top-2 bottom-2 w-px bg-sage/20"
        aria-hidden="true"
      />
      <motion.div
        className="absolute left-[4px] top-2 bottom-2 w-px bg-sage-dark origin-top"
        style={{ scaleY: veinScale }}
        aria-hidden="true"
      />
      {items.map((item, i) => (
        <Item key={i} index={i} count={items.length} progress={scrollYProgress}>
          {item}
        </Item>
      ))}
    </ul>
  );
}
