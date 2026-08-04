"use client";

import { motion, useScroll, useSpring } from "motion/react";

/* Hairline sage progress bar pinned to the very top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] bg-sage origin-left z-[60] print:hidden"
      style={{ scaleX }}
    />
  );
}
