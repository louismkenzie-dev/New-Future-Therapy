"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/* Sticky stacking cards: each card pins near the top of the viewport and the
   next slides up over it; cards already passed recede gently (scale + fade),
   like sheets of paper settling. Scroll-linked, fully reversible. */

export interface StackCard {
  content: ReactNode;
}

function Card({
  children,
  index,
  count,
  progress,
  reduced,
}: {
  children: ReactNode;
  index: number;
  count: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
}) {
  /* As the cards after this one arrive, this card settles back */
  const start = (index + 1) / count;
  const scale = useTransform(progress, [start, 1], [1, 1 - (count - index - 1) * 0.05]);
  const targetOpacity = 1 - (count - index - 1) * 0.25;
  const opacity = useTransform(progress, [start, 1], [1, Math.max(targetOpacity, 0.45)]);

  if (reduced) {
    return <div className="mb-8">{children}</div>;
  }

  return (
    <div className="sticky" style={{ top: `calc(14vh + ${index * 22}px)` }}>
      <motion.div style={{ scale, opacity }} className="origin-top">
        {children}
      </motion.div>
      {/* Spacer so each card occupies scroll room beneath the pin */}
      <div className="h-[32vh]" aria-hidden="true" />
    </div>
  );
}

export default function StackingCards({
  cards,
  className,
}: {
  cards: ReactNode[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.6", "end end"],
  });

  return (
    <div ref={ref} className={className}>
      {cards.map((card, i) => (
        <Card
          key={i}
          index={i}
          count={cards.length}
          progress={scrollYProgress}
          reduced={reduced}
        >
          {card}
        </Card>
      ))}
    </div>
  );
}
