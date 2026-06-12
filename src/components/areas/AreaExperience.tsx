"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import type { HelpArea } from "@/lib/content/helpAreas";
import { areaIcons } from "@/lib/areaIcons";
import ScrollIlluminate from "@/components/motion/ScrollIlluminate";
import Reveal, { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import FloatingLeaves from "@/components/FloatingLeaves";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function AreaExperience({
  area,
  prev,
  next,
}: {
  area: HelpArea;
  prev: HelpArea;
  next: HelpArea;
}) {
  const Icon = areaIcons[area.id];
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const titleWords = area.title.split(" ");
  /* Keep only the opening paragraph — the experience replaces the rest */
  const firstParagraph = area.body.split("\n\n")[0];

  return (
    <>
      {/* ── Immersive hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-sage-pale"
      >
        <FloatingLeaves />

        {/* Breathing rings behind the icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          {[420, 640, 880].map((size, i) => (
            <motion.div
              key={size}
              className="absolute rounded-full border border-sage/20"
              style={{ width: size, height: size }}
              animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 7 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
            />
          ))}
        </div>

        <motion.div
          className="relative z-10 max-w-3xl mx-auto px-6 text-center py-28"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <Link
              href="/how-we-can-help"
              className="inline-flex items-center gap-2 font-body text-xs text-muted uppercase tracking-[0.25em] hover:text-sage-dark transition-colors duration-200 mb-12"
            >
              <ArrowLeft size={14} />
              All areas
            </Link>
          </motion.div>

          {/* Floating icon */}
          <motion.div
            className="mx-auto mb-10 w-28 h-28 rounded-full bg-white border border-sage-light shadow-sm flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
          >
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {Icon && <Icon size={46} strokeWidth={1.5} className="text-sage-dark" />}
            </motion.div>
          </motion.div>

          <h1 className="font-heading text-4xl md:text-6xl font-light text-charcoal leading-tight mb-8">
            {titleWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.35 + i * 0.06, ease: EASE_OUT }}
                >
                  {word}
                  {i < titleWords.length - 1 && " "}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="font-body text-base text-muted leading-relaxed max-w-xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE_OUT }}
          >
            {area.summary}
          </motion.p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          style={{ opacity: heroOpacity }}
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

      {/* ── Word-by-word illumination ── */}
      <ScrollIlluminate text={area.essence} eyebrow={area.title} />

      {/* ── Floating keyword chips ── */}
      <section className="py-24 px-6 bg-cream relative overflow-hidden">
        <FloatingLeaves className="opacity-60" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Reveal className="text-center mb-14">
            <p className="font-body text-sm text-sage uppercase tracking-[0.25em] mb-3">
              Together We Can Explore
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal">
              Whatever You Bring
            </h2>
          </Reveal>

          <StaggerGroup className="flex flex-wrap justify-center gap-4">
            {area.keywords.map((keyword, i) => (
              <StaggerItem key={keyword}>
                <motion.span
                  className="inline-block font-body text-sm md:text-base bg-white text-sage-dark px-6 py-3 rounded-full border border-sage-light shadow-sm"
                  animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0] }}
                  transition={{
                    duration: 5 + (i % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                >
                  {keyword}
                </motion.span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── One short paragraph, not a wall of text ── */}
      <section className="py-24 px-6 bg-sage-pale">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="font-heading text-2xl md:text-3xl font-light text-charcoal leading-relaxed">
            {firstParagraph}
          </p>
        </Reveal>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-sage relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 800 300" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <ellipse cx="700" cy="150" rx="400" ry="300" fill="#F5F3EF" />
            <ellipse cx="100" cy="200" rx="200" ry="200" fill="#F5F3EF" />
          </svg>
        </div>
        <Reveal className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-light text-cream mb-6">
            You do not have to face this alone
          </h2>
          <p className="font-body text-base text-cream/80 leading-relaxed mb-10 max-w-lg mx-auto">
            A free 15-minute consultation is a gentle first step. There is no
            pressure and no commitment — just a conversation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-body text-sm bg-cream text-sage-dark px-10 py-4 rounded-full hover:bg-sage-pale transition-colors duration-200"
          >
            Book a Free Consultation
            <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>

      {/* ── Prev / next area navigation ── */}
      <nav className="bg-cream border-t border-grey-light" aria-label="Other areas">
        <div className="max-w-6xl mx-auto grid grid-cols-2 divide-x divide-grey-light">
          {[
            { a: prev, dir: "prev" as const },
            { a: next, dir: "next" as const },
          ].map(({ a, dir }) => {
            const NavIcon = areaIcons[a.id];
            return (
              <Link
                key={dir}
                href={`/how-we-can-help/${a.id}`}
                className={`group flex items-center gap-4 px-6 py-10 hover:bg-sage-pale transition-colors duration-300 ${
                  dir === "next" ? "flex-row-reverse text-right" : ""
                }`}
              >
                <span className="w-12 h-12 rounded-full bg-sage-pale border border-sage-light flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-sage group-hover:scale-110">
                  {NavIcon && (
                    <NavIcon
                      size={20}
                      strokeWidth={1.5}
                      className="text-sage-dark transition-colors duration-300 group-hover:text-cream"
                    />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block font-body text-[10px] text-muted uppercase tracking-[0.25em] mb-1">
                    {dir === "prev" ? "Previous" : "Next"}
                  </span>
                  <span className="block font-heading text-lg md:text-xl text-charcoal truncate group-hover:text-sage-dark transition-colors duration-200">
                    {a.title}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
