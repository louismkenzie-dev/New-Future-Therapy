"use client";

import AnimatedCounter from "@/components/motion/AnimatedCounter";
import Reveal from "@/components/motion/Reveal";

const STATS = [
  { value: 2, suffix: "", label: "Therapists — and twin sisters" },
  { value: 5, suffix: "+", label: "Years of professional training" },
  { value: 8, suffix: "", label: "Areas of specialist support" },
  { value: 15, suffix: " min", label: "Free initial consultation" },
];

export default function StatsBand() {
  return (
    <section className="py-20 px-6 bg-cream border-y border-grey-light">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.1} className="text-center">
            <p className="font-heading text-5xl md:text-6xl font-light text-sage-dark mb-3">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="font-body text-xs text-muted uppercase tracking-widest leading-relaxed">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
