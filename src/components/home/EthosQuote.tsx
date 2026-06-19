"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollIlluminate from "@/components/motion/ScrollIlluminate";

/* The signature scroll moment: the brand line illuminates word by word. */
export default function EthosQuote() {
  return (
    <ScrollIlluminate
      text="At NewFuture Therapy, we believe that growth begins with understanding, curiosity and compassion."
      eyebrow="Our Approach"
      height="220vh"
    >
      <Link
        href="/our-approach"
        className="inline-flex items-center gap-2 font-body text-sm border border-sage-light text-sage-light px-6 py-3 rounded-full hover:bg-sage-light hover:text-sage-dark transition-colors duration-200"
      >
        Read our ethos
        <ArrowRight size={14} />
      </Link>
    </ScrollIlluminate>
  );
}
