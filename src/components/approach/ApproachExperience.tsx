"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  Heart,
  Lightbulb,
  Users,
  BookOpen,
  HandHeart,
  Sunrise,
} from "lucide-react";
import FloatingLeaves from "@/components/FloatingLeaves";
import SceneSequence, { type Scene } from "@/components/motion/SceneSequence";
import StackingCards from "@/components/motion/StackingCards";
import IlluminateList from "@/components/motion/IlluminateList";
import ScrollIlluminate from "@/components/motion/ScrollIlluminate";
import Reveal, { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── The ethos, one thought at a time ── */
const SCENES: Scene[] = [
  {
    icon: BookOpen,
    eyebrow: "Your Story",
    line: "Every person carries a unique story — shaped by experience, relationships, challenge and strength.",
  },
  {
    icon: HandHeart,
    eyebrow: "No Blame",
    line: "We do not look for blame, judgement or fault. We look for curiosity, understanding and compassion. We believe that greater awareness creates greater choice and opens the door to meaningful change.",
  },
  {
    icon: Sunrise,
    eyebrow: "Safety First",
    line: "Meaningful change happens when people feel safe enough to explore their experiences with curiosity, compassion and openness.",
  },
];

const PRINCIPLES = [
  {
    icon: Heart,
    number: "01",
    title: "Compassion",
    body: "People do the best they can with the knowledge, resources and experiences available to them at the time. We meet every person with warmth and genuine care — never blame or judgement.",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Curiosity",
    body: "We encourage a deeper understanding of self, your experiences and your patterns of thinking, feeling and behaving. Open minds — never assuming, always asking.",
  },
  {
    icon: Users,
    number: "03",
    title: "Connection",
    body: "Change grows from a genuinely non-judgemental, inclusive and connected therapeutic relationship. We create the conditions for that safety — for all, together.",
  },
];

const PRACTICE_POINTS = [
  "Sessions are tailored entirely to you — there is no one-size-fits-all approach.",
  "You set the pace. We will never push you further or faster than feels right.",
  "Our work is grounded in Person-Centred Therapy and draws upon a range of evidence-based approaches including Cognitive Behavioural Therapy (CBT), Internal Family Systems (IFS), Emotionally Focused Therapy (EFT), The Gottman Method, Imago Relationship Therapy, Solution-Focused Therapy, Inner Child Work, Attachment Theory, Polyvagal Theory, Transactional Analysis, mindfulness and trauma-informed practice. This integrative approach allows us to tailor counselling to the unique needs of each individual and couple we work with.",
  "Therapy is something we do together — never something done to you.",
  "We welcome and affirm people of all backgrounds, identities, sexualities, gender identities, relationship structures, cultures and lived experiences. We are committed to creating a safe, respectful and inclusive space where everyone feels valued, heard and accepted.",
];

const COMMITMENTS = [
  "We offer LGBTQIA+ affirming therapy — not tolerance, but active affirmation of who you are.",
  "We respect your pronouns, your identity and your own language for yourself and we never make assumptions.",
  "We affirm monogamous, non-monogamous, polyamorous and other relationship structures equally.",
  "We work with adults at every stage of life, from 18 to 70 and beyond — no chapter of life is the wrong one.",
  "We will never pathologise who you are. Who you love, how you identify and how your mind works are not problems to be fixed.",
];

const HEADLINE = "The NewFuture Therapy Ethos".split(" ");

export default function ApproachExperience() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-sage-pale"
      >
        <FloatingLeaves />
        {/* Breathing rings */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          {[460, 700, 960].map((size, i) => (
            <motion.div
              key={size}
              className="absolute rounded-full border border-sage/20"
              style={{ width: size, height: size }}
              animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{
                duration: 7 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
            />
          ))}
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
            How We Work
          </motion.p>

          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-light text-charcoal leading-tight mb-8">
            {HEADLINE.map((word, i) => (
              <span
                key={i}
                className={`inline-block overflow-hidden align-bottom${
                  i < HEADLINE.length - 1 ? " mr-[0.25em]" : ""
                }`}
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%", filter: "blur(6px)" }}
                  animate={{ y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.08, ease: EASE_OUT }}
                >
                  {word}
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
            Three beliefs shape every session. Scroll to meet them, one at a
            time.
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

      {/* ── Pinned crossfade scenes: the ethos in three breaths ── */}
      <SceneSequence scenes={SCENES} />

      {/* ── Core principles: stacking cards ── */}
      <section className="py-24 px-6 bg-sage-pale relative overflow-hidden">
        <FloatingLeaves className="opacity-40" />
        <div className="max-w-3xl mx-auto relative z-10">
          <Reveal className="text-center mb-16">
            <p className="font-body text-xs text-sage-dark uppercase tracking-[0.3em] mb-4">
              Our Core Principles
            </p>
            <h2 className="font-heading text-4xl md:text-6xl font-light text-charcoal">
              Compassion, Curiosity &amp; Connection
            </h2>
          </Reveal>

          <StackingCards
            cards={PRINCIPLES.map(({ icon: Icon, number, title, body }) => (
              <div
                key={title}
                className="relative bg-white rounded-2xl border border-grey-light shadow-sm p-10 md:p-14 overflow-hidden"
              >
                {/* Oversized serif watermark number */}
                <span
                  className="absolute -top-6 right-6 font-heading text-[120px] md:text-[160px] font-light text-sage-pale select-none leading-none"
                  aria-hidden="true"
                >
                  {number}
                </span>
                <div className="relative z-10">
                  <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage-pale border border-sage-light mb-8">
                    <Icon size={28} strokeWidth={1.5} className="text-sage-dark" />
                  </span>
                  <h3 className="font-heading text-4xl md:text-5xl font-light text-charcoal mb-5">
                    {title}
                  </h3>
                  <p className="font-body text-base md:text-lg text-muted leading-relaxed max-w-lg">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          />
        </div>
      </section>

      {/* ── In practice: the illuminating vein ── */}
      <section className="py-24 md:py-32 px-6 bg-cream">
        <div className="max-w-2xl mx-auto">
          <Reveal className="mb-16">
            <p className="font-body text-xs text-sage-dark uppercase tracking-[0.3em] mb-4">
              In The Room
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal">
              What This Means in Practice
            </h2>
          </Reveal>
          <IlluminateList items={PRACTICE_POINTS} />
        </div>
      </section>

      {/* ── Inclusivity: held on the dark band ── */}
      <section className="py-24 md:py-32 px-6 bg-sage-dark relative overflow-hidden">
        <FloatingLeaves className="opacity-40" />
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          aria-hidden="true"
        >
          <svg viewBox="0 0 800 600" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <ellipse cx="650" cy="120" rx="350" ry="300" fill="#F5F3EF" />
            <ellipse cx="120" cy="500" rx="260" ry="220" fill="#C4D9C6" />
          </svg>
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <Reveal className="text-center mb-14">
            <p className="font-body text-xs text-sage-light uppercase tracking-[0.3em] mb-4">
              A Founder Priority
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-cream mb-5">
              Our Commitment to Inclusivity
            </h2>
            <p className="font-body text-base text-cream/75 leading-relaxed max-w-xl mx-auto">
              Inclusion is not a line in our policy — it is the foundation of
              how we practise. These commitments hold in every session, with
              every client.
            </p>
          </Reveal>

          <StaggerGroup className="space-y-5">
            {COMMITMENTS.map((commitment, i) => (
              <StaggerItem key={i}>
                <div className="flex gap-4 bg-cream/[0.06] backdrop-blur-sm rounded-xl border border-sage-light/25 p-6 transition-colors duration-500 hover:border-sage-light/50">
                  <div className="w-2 h-2 rounded-full bg-sage-light mt-2.5 shrink-0" />
                  <p className="font-body text-base text-cream/90 leading-relaxed">
                    {commitment}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── Finale: the promise, illuminated word by word ── */}
      <ScrollIlluminate
        text="At NewFuture Therapy, we believe that growth begins with understanding, curiosity and compassion."
        eyebrow="Our Promise"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/how-we-can-help"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] font-body text-sm bg-cream text-sage-dark px-8 py-4 rounded-full hover:bg-sage-pale transition-colors duration-200"
          >
            How We Can Help
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] font-body text-sm border border-sage-light text-sage-light px-8 py-4 rounded-full hover:bg-sage-light hover:text-charcoal transition-all duration-200"
          >
            Book a Free Consultation
          </Link>
        </div>
      </ScrollIlluminate>
    </>
  );
}
