"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/* Animated page-opening band: eyebrow rises, serif title follows, lede fades. */

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
}) {
  return (
    <section className="bg-sage-pale pt-16 pb-12 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          className="font-body text-sm text-sage-dark uppercase tracking-[0.25em] mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          {eyebrow}
        </motion.p>
        <div className="overflow-hidden">
          <motion.h1
            className="font-heading text-5xl md:text-6xl font-light text-charcoal leading-tight"
            initial={{ y: "60%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE_OUT }}
          >
            {title}
          </motion.h1>
        </div>
        {lede && (
          <motion.p
            className="font-body text-base text-muted leading-relaxed max-w-xl mx-auto mt-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT }}
          >
            {lede}
          </motion.p>
        )}
      </div>
    </section>
  );
}
