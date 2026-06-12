"use client";

import { useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import FloatingLeaves from "@/components/FloatingLeaves";

const Hero3D = dynamic(() => import("@/components/Hero3D"), { ssr: false });

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HEADLINE = "A compassionate space for growth and healing".split(" ");

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);

  /* As the hero scrolls away: text drifts up and fades, photo lags behind. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section
      ref={ref}
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-cream"
    >
      {/* 3D atmosphere */}
      <Hero3D />

      {/* Soft background ellipses */}
      <div
        className="absolute right-0 top-0 w-1/2 h-full opacity-30 pointer-events-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 600 800" fill="none" className="w-full h-full">
          <ellipse cx="500" cy="300" rx="350" ry="400" fill="#C4D9C6" />
          <ellipse cx="400" cy="600" rx="200" ry="250" fill="#6B8C6F" opacity="0.4" />
        </svg>
      </div>

      <FloatingLeaves />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        <motion.div style={{ y: textY, opacity: textOpacity }}>
          <motion.p
            className="font-body text-sm text-sage uppercase tracking-[0.25em] mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
          >
            Wakefield &amp; Online
          </motion.p>

          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-light text-charcoal leading-tight mb-8">
            {HEADLINE.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.07, ease: EASE_OUT }}
                >
                  {word}
                  {i < HEADLINE.length - 1 && " "}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="font-body text-base md:text-lg text-muted leading-relaxed mb-10 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease: EASE_OUT }}
          >
            We are Esther and Laura — twin sisters and qualified therapists
            offering professional, inclusive therapy for individuals and
            couples. We believe meaningful change begins when people feel truly
            safe to explore their experiences.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0, ease: EASE_OUT }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 font-body text-sm bg-sage-dark text-cream px-8 py-4 rounded-full hover:bg-charcoal transition-colors duration-200"
            >
              Book a Free Consultation
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 font-body text-sm border border-sage text-sage-dark px-8 py-4 rounded-full hover:bg-sage-pale transition-colors duration-200"
            >
              Meet Esther &amp; Laura
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="hidden md:block"
          style={{ y: photoY, scale: photoScale }}
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE_OUT }}
        >
          <PhotoPlaceholder
            className="w-full aspect-[4/5] rounded-2xl shadow-lg"
            src="/photos/twins-laptop.jpg"
            alt="Esther and Laura working together"
            position="center 30%"
          />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{ opacity: textOpacity }}
        aria-hidden="true"
      >
        <span className="font-body text-[10px] text-muted uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.div
          className="w-px h-10 bg-sage/40 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
