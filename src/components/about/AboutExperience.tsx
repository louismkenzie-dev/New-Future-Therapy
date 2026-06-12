"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  Users,
  Briefcase,
  HeartPulse,
  GraduationCap,
  Leaf,
} from "lucide-react";
import FloatingLeaves from "@/components/FloatingLeaves";
import HorizontalJourney, {
  type JourneyChapter,
} from "@/components/motion/HorizontalJourney";
import ScrollIlluminate from "@/components/motion/ScrollIlluminate";
import Reveal, { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

const Hero3D = dynamic(() => import("@/components/Hero3D"), { ssr: false });

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── The journey, told in five breaths ── */
const CHAPTERS: JourneyChapter[] = [
  {
    era: "The Beginning",
    title: "Two Sisters, One Path",
    body: "We are Esther and Laura — identical twins, born and raised in Leicester. We have walked remarkably similar paths our whole lives, often without planning to.",
    icon: Users,
  },
  {
    era: "First Venture",
    title: "Recruitment",
    body: "Our first business together. Even then, the heart of the work was helping people reach their potential and create positive change.",
    icon: Briefcase,
  },
  {
    era: "A Turning Point",
    title: "Family & Wellbeing",
    body: "Career breaks to raise our young families drew us towards health and wellbeing — building confidence and self-esteem, not just fitness.",
    icon: HeartPulse,
  },
  {
    era: "The Retraining",
    title: "Five Years of Study",
    body: "We qualified as therapists and went on to specialise in trauma, anxiety, depression, attachment, relationships and couples therapy.",
    icon: GraduationCap,
  },
  {
    era: "Today",
    title: "NewFuture Therapy",
    body: "Wakefield & Online. We help individuals and couples build stronger, healthier and more fulfilling relationships — together, as ever.",
    icon: Leaf,
  },
];

const TWINS = [
  {
    name: "Esther",
    photo: "/photos/therapist-green-portrait.jpg",
    position: "35% 25%",
    intro:
      "Esther works with individuals and couples, specialising in trauma, anxiety, self-esteem and relationship difficulties. She brings warmth, curiosity and a deep commitment to creating a space where you feel genuinely safe to explore.",
    aside: "Currently learning tennis — proof that it is never too late to begin.",
    specialisms: ["Trauma", "Anxiety", "Self-Esteem", "Relationships"],
  },
  {
    name: "Laura",
    photo: "/photos/therapist-white-armchair.jpg",
    position: "center 25%",
    intro:
      "Laura works with individuals and couples, with particular expertise in couples therapy, depression, attachment and neurodiversity. She is passionate about helping people understand themselves and one another more fully.",
    aside: "Recently swept up in what she modestly calls a passion for padel.",
    specialisms: ["Couples Therapy", "Depression", "Attachment", "Neurodiversity"],
  },
];

const HEADLINE = "Our Journey So Far".split(" ");

function TwinPanel({ twin, flip }: { twin: (typeof TWINS)[number]; flip: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const photoScale = useTransform(scrollYProgress, [0, 0.5], [1.12, 1]);

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${
        flip ? "" : ""
      }`}
    >
      {/* Photo with curtain reveal + inner parallax */}
      <div className={flip ? "md:order-2" : ""}>
        <div className="relative overflow-hidden rounded-2xl shadow-sm aspect-[3/4] max-h-[560px]">
          <motion.div className="absolute inset-0" style={{ y: photoY, scale: photoScale }}>
            <Image
              src={twin.photo}
              alt={`Photo of ${twin.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              style={{ objectPosition: twin.position }}
            />
          </motion.div>
          {/* Curtain lifts away on reveal */}
          <motion.div
            className="absolute inset-0 bg-sage-pale origin-top"
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true, margin: "0px 0px -120px 0px" }}
            transition={{ duration: 1.1, ease: EASE_OUT }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Words — short, breathable */}
      <div className={flip ? "md:order-1" : ""}>
        <Reveal>
          <p className="font-body text-xs text-sage-dark uppercase tracking-[0.3em] mb-3">
            Therapist &amp; Co-founder
          </p>
          <h3 className="font-heading text-5xl md:text-6xl font-light text-charcoal mb-6">
            {twin.name}
          </h3>
          <p className="font-body text-base text-muted leading-relaxed mb-6 max-w-md">
            {twin.intro}
          </p>
          <p className="font-heading italic text-lg text-sage-dark mb-8">
            {twin.aside}
          </p>
        </Reveal>
        <StaggerGroup className="flex flex-wrap gap-3">
          {twin.specialisms.map((s, i) => (
            <StaggerItem key={s}>
              <motion.span
                className="inline-block font-body text-sm bg-white text-sage-dark px-5 py-2.5 rounded-full border border-sage-light shadow-sm"
                animate={{ y: [0, i % 2 === 0 ? -5 : 5, 0] }}
                transition={{
                  duration: 5 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.35,
                }}
              >
                {s}
              </motion.span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </div>
  );
}

export default function AboutExperience() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const photoBandRef = useRef<HTMLElement>(null);
  const { scrollYProgress: bandProgress } = useScroll({
    target: photoBandRef,
    offset: ["start end", "end start"],
  });
  const bandY = useTransform(bandProgress, [0, 1], ["-6%", "6%"]);

  return (
    <>
      {/* ── Hero: calm, dimensional ── */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-cream"
      >
        <Hero3D />
        <FloatingLeaves />
        <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 1200 800" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <ellipse cx="1050" cy="180" rx="360" ry="320" fill="#C4D9C6" />
            <ellipse cx="120" cy="660" rx="280" ry="260" fill="#6B8C6F" opacity="0.3" />
          </svg>
        </div>

        <motion.div
          className="relative z-10 max-w-3xl mx-auto px-6 text-center"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.p
            className="font-body text-xs sm:text-sm text-sage-dark uppercase tracking-[0.3em] mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
          >
            Our Story
          </motion.p>

          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-light text-charcoal leading-tight mb-8">
            {HEADLINE.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%", filter: "blur(6px)" }}
                  animate={{ y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.08, ease: EASE_OUT }}
                >
                  {word}
                  {i < HEADLINE.length - 1 && " "}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="font-body text-base md:text-lg text-muted leading-relaxed max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE_OUT }}
          >
            Identical twins. Two careers. One purpose. Scroll to walk the path
            with us.
          </motion.p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
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

      {/* ── The journey: pinned horizontal chapters ── */}
      <HorizontalJourney chapters={CHAPTERS} eyebrow="The Journey" />

      {/* ── Signature illumination ── */}
      <ScrollIlluminate
        text="One thing that has remained constant throughout our lives is our love of learning."
        eyebrow="Esther & Laura"
      />

      {/* ── In-session photo, held in a soft card ── */}
      <section
        ref={photoBandRef}
        className="relative py-24 md:py-32 px-6 bg-cream overflow-hidden"
      >
        {/* Soft decorative ellipses behind the card */}
        <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 1200 700" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <ellipse cx="1080" cy="140" rx="320" ry="280" fill="#C4D9C6" />
            <ellipse cx="100" cy="600" rx="260" ry="240" fill="#6B8C6F" opacity="0.25" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="font-body text-xs text-sage-dark uppercase tracking-[0.3em] mb-4">
              Inside The Room
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal">
              Where the Work Happens
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              {/* The photo card: rounded, lifted, breathing parallax inside */}
              <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[3/2] sm:aspect-[16/9]">
                <motion.div
                  className="absolute inset-x-0 -top-[12%] h-[124%]"
                  style={{ y: bandY }}
                >
                  <Image
                    src="/photos/therapist-green-session.jpg"
                    alt="A therapy session in progress at NewFuture Therapy"
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-cover"
                    style={{ objectPosition: "60% 30%" }}
                  />
                </motion.div>
                {/* Gentle protective gradient for the caption */}
                <div
                  className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal/45 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Caption panel — glass card inside the photo */}
                <motion.div
                  className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-auto sm:max-w-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                  transition={{ duration: 0.9, delay: 0.4, ease: EASE_OUT }}
                >
                  <div className="flex items-start gap-4 bg-white/90 backdrop-blur-sm rounded-2xl border border-sage-light p-5 sm:p-6 shadow-sm">
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-sage-pale border border-sage-light shrink-0">
                      <Leaf size={20} strokeWidth={1.5} className="text-sage-dark" />
                    </span>
                    <span>
                      <span className="block font-heading italic text-xl sm:text-2xl font-light text-charcoal leading-snug">
                        Growth happens when we stay curious.
                      </span>
                      <span className="block font-body text-xs text-muted uppercase tracking-[0.2em] mt-2">
                        The NewFuture belief
                      </span>
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Floating info chips on the card edges, like the home hero */}
              <motion.div
                className="absolute left-6 sm:left-10 -top-4 z-10"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT }}
              >
                <motion.span
                  className="inline-flex items-center gap-2 font-body text-xs sm:text-sm bg-white/95 backdrop-blur-sm text-sage-dark px-4 py-2.5 rounded-full border border-sage-light shadow-sm"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Users size={15} strokeWidth={1.75} />
                  Individuals &amp; Couples
                </motion.span>
              </motion.div>

              <motion.div
                className="absolute right-6 sm:right-10 -bottom-4 z-10"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.8, delay: 0.8, ease: EASE_OUT }}
              >
                <motion.span
                  className="inline-flex items-center gap-2 font-body text-xs sm:text-sm bg-white/95 backdrop-blur-sm text-sage-dark px-4 py-2.5 rounded-full border border-sage-light shadow-sm"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <HeartPulse size={15} strokeWidth={1.75} />
                  Wakefield &amp; Online
                </motion.span>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Meet the twins, one at a time ── */}
      <section className="py-24 md:py-32 px-6 bg-cream relative overflow-hidden">
        <FloatingLeaves className="opacity-50" />
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal className="text-center mb-20 md:mb-28">
            <p className="font-body text-xs text-sage-dark uppercase tracking-[0.3em] mb-4">
              Meet Us Individually
            </p>
            <h2 className="font-heading text-4xl md:text-6xl font-light text-charcoal">
              Two Voices, One Practice
            </h2>
          </Reveal>

          <div className="space-y-28 md:space-y-36">
            <TwinPanel twin={TWINS[0]} flip={false} />
            <TwinPanel twin={TWINS[1]} flip={true} />
          </div>
        </div>
      </section>

      {/* ── Reassurance + CTA ── */}
      <section className="py-24 px-6 bg-sage relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 800 300" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <ellipse cx="700" cy="150" rx="400" ry="300" fill="#F5F3EF" />
            <ellipse cx="100" cy="200" rx="200" ry="200" fill="#F5F3EF" />
          </svg>
        </div>
        <Reveal className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-light text-cream mb-6">
            Whoever you sit with, the welcome is the same
          </h2>
          <p className="font-body text-base text-cream/85 leading-relaxed mb-10 max-w-lg mx-auto">
            Whether you come to Esther or Laura, you will find a warm,
            compassionate and non-judgemental space to begin. Registered with
            BACP &mdash; Wakefield &amp; Online.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 min-h-[48px] font-body text-sm bg-cream text-sage-dark px-10 py-4 rounded-full hover:bg-sage-pale transition-colors duration-200"
          >
            Book a Free Consultation
            <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
