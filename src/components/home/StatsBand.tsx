"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import Reveal from "@/components/motion/Reveal";

const STATS = [
  {
    value: 2,
    suffix: "",
    label: "Therapists — and twin sisters",
    href: "/about",
    aria: "Meet Esther and Laura on our About page",
  },
  {
    value: 10,
    suffix: "+",
    label: "Years of professional training",
    href: "/our-approach",
    aria: "Read about our approach",
  },
  {
    value: 8,
    suffix: "",
    label: "Areas of specialist support",
    href: "/how-we-can-help",
    aria: "See the areas we can help you with",
  },
  {
    value: 15,
    suffix: " min",
    label: "Free initial consultation",
    href: "/contact",
    aria: "Book a free initial consultation",
  },
];

export default function StatsBand() {
  return (
    <section className="py-20 px-6 bg-cream border-y border-grey-light">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.1}>
            <Link
              href={stat.href}
              aria-label={stat.aria}
              className="group flex flex-col items-center text-center h-full rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-sage-pale/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              <p className="font-heading text-5xl md:text-6xl font-light text-sage-dark mb-3 transition-colors duration-300 group-hover:text-sage">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-body text-xs text-muted uppercase tracking-widest leading-relaxed transition-colors duration-300 group-hover:text-charcoal">
                {stat.label}
              </p>
              <span
                className="mt-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-sage-pale text-sage-dark opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-sage group-hover:text-cream"
                aria-hidden="true"
              >
                <ArrowRight size={14} />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
