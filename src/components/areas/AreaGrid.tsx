"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { helpAreas } from "@/lib/content/helpAreas";
import { areaIcons } from "@/lib/areaIcons";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

/* Visual launcher: one icon card per area, each opening its own
   immersive scroll experience. Minimal words — the icon and title lead. */
export default function AreaGrid() {
  return (
    <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {helpAreas.map((area, i) => {
        const Icon = areaIcons[area.id];
        return (
          <StaggerItem key={area.id}>
            <Link
              href={`/how-we-can-help/${area.id}`}
              className="group relative flex flex-col items-center text-center bg-white rounded-2xl border border-grey-light p-8 pb-10 h-full overflow-hidden transition-all duration-500 hover:border-sage-light hover:shadow-xl hover:-translate-y-2"
            >
              {/* Sage wash rises on hover */}
              <span
                className="absolute inset-0 bg-sage-pale opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />

              <span className="relative z-10 flex flex-col items-center">
                <motion.span
                  className="w-20 h-20 rounded-full bg-sage-pale border border-sage-light flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-sage group-hover:scale-110"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 4 + (i % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.35,
                  }}
                >
                  {Icon && (
                    <Icon
                      size={34}
                      strokeWidth={1.5}
                      className="text-sage-dark transition-colors duration-500 group-hover:text-cream"
                    />
                  )}
                </motion.span>

                <span className="font-heading text-xl font-medium text-charcoal leading-snug mb-3 group-hover:text-sage-dark transition-colors duration-300">
                  {area.title}
                </span>

                <span className="font-body text-xs text-muted leading-relaxed mb-5 line-clamp-2">
                  {area.keywords.slice(0, 3).join(" · ")}
                </span>

                <span className="inline-flex items-center gap-1.5 font-body text-xs text-sage-dark uppercase tracking-[0.2em] opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  Explore
                  <ArrowRight size={12} />
                </span>
              </span>
            </Link>
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}
