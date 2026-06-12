"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ShieldCheck, Clock } from "lucide-react";
import FloatingLeaves from "@/components/FloatingLeaves";

const Hero3D = dynamic(() => import("@/components/Hero3D"), { ssr: false });

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HEADLINE = "A compassionate space for growth and healing".split(" ");

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);

  /* Scroll choreography: text drifts up and fades; the photo lags, grows
     slightly and lifts toward the viewer — Apple keynote style. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const photoScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.04]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-cream pt-24 pb-10 md:pt-28"
    >
      {/* 3D atmosphere (desktop only, self-disabling) */}
      <Hero3D />

      {/* Soft background ellipses */}
      <div
        className="absolute inset-x-0 top-0 h-full opacity-30 pointer-events-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 1200 800" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <ellipse cx="1000" cy="200" rx="380" ry="340" fill="#C4D9C6" />
          <ellipse cx="150" cy="650" rx="300" ry="280" fill="#6B8C6F" opacity="0.35" />
        </svg>
      </div>

      <FloatingLeaves />

      {/* Centred copy */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        style={{ y: textY, opacity: textOpacity }}
      >
        <motion.p
          className="font-body text-xs sm:text-sm text-sage-dark uppercase tracking-[0.25em] mb-5 sm:mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
        >
          Wakefield &amp; Online
        </motion.p>

        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-charcoal leading-tight mb-6 sm:mb-8">
          {HEADLINE.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: "110%", filter: "blur(6px)" }}
                animate={{ y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.07, ease: EASE_OUT }}
              >
                {word}
                {i < HEADLINE.length - 1 && " "}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="font-body text-base md:text-lg text-muted leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: EASE_OUT }}
        >
          We are Esther and Laura — twin sisters and qualified therapists
          offering professional, inclusive therapy for individuals and couples.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0, ease: EASE_OUT }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] font-body text-sm bg-sage-dark text-cream px-8 py-4 rounded-full hover:bg-charcoal transition-colors duration-200"
          >
            Book a Free Consultation
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] font-body text-sm border border-sage text-sage-dark px-8 py-4 rounded-full hover:bg-sage-pale transition-colors duration-200"
          >
            Meet Esther &amp; Laura
          </Link>
        </motion.div>
      </motion.div>

      {/* Cinematic landscape photo — both twins visible on every screen */}
      <motion.div
        className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 mt-10 sm:mt-14"
        style={{ y: photoY, scale: photoScale }}
        initial={{ opacity: 0, y: 48, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.3, delay: 0.6, ease: EASE_OUT }}
      >
        <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[3/2] sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src="/photos/twins-laptop.jpg"
            alt="Esther and Laura working together at NewFuture Therapy"
            fill
            priority
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="object-cover"
            style={{ objectPosition: "center 35%" }}
          />
          {/* Soft protection gradient for the chips */}
          <div
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-charcoal/30 to-transparent pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Floating info chips */}
        <motion.div
          className="absolute left-8 sm:left-12 -top-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: EASE_OUT }}
        >
          <motion.span
            className="inline-flex items-center gap-2 font-body text-xs sm:text-sm bg-white/95 backdrop-blur-sm text-sage-dark px-4 py-2.5 rounded-full border border-sage-light shadow-sm"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ShieldCheck size={15} strokeWidth={1.75} />
            Registered with BACP
          </motion.span>
        </motion.div>

        <motion.div
          className="absolute right-8 sm:right-12 -bottom-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7, ease: EASE_OUT }}
        >
          <motion.span
            className="inline-flex items-center gap-2 font-body text-xs sm:text-sm bg-white/95 backdrop-blur-sm text-sage-dark px-4 py-2.5 rounded-full border border-sage-light shadow-sm"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Clock size={15} strokeWidth={1.75} />
            Free 15-minute consultation
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-2 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 1 }}
        style={{ opacity: textOpacity }}
        aria-hidden="true"
      >
        <span className="font-body text-[10px] text-muted uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.div
          className="w-px h-9 bg-sage/40 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
