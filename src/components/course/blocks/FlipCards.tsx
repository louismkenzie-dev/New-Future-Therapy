"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import BlockHeading from "./BlockHeading";

/* Tap to turn a card over — the same moment, seen from the other side.
   A gentle cross-fade rather than a 3D spin (no spin in the motion language). */
export default function FlipCards({
  heading,
  intro,
  items,
}: {
  heading?: string;
  intro?: string;
  items: { frontLabel?: string; front: string; backLabel?: string; back: string }[];
}) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div>
      <BlockHeading heading={heading} intro={intro} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {items.map((item, i) => {
          const isBack = flipped.has(i);
          return (
            <button
              key={item.front}
              type="button"
              onClick={() => toggle(i)}
              aria-pressed={isBack}
              className={`text-left rounded-2xl border p-5 sm:p-7 min-h-[160px] sm:min-h-[180px] flex flex-col transition-all duration-500 ${
                isBack
                  ? "bg-sage-dark border-sage-dark text-cream"
                  : "bg-white border-grey-light shadow-sm hover:border-sage-light"
              }`}
            >
              <span
                className={`font-body text-xs uppercase tracking-[0.25em] mb-4 ${
                  isBack ? "text-sage-light" : "text-sage-dark"
                }`}
              >
                {isBack ? (item.backLabel ?? "Your partner") : (item.frontLabel ?? "You")}
              </span>
              <span
                className={`font-heading text-2xl font-light leading-snug flex-1 ${
                  isBack ? "text-cream" : "text-charcoal"
                }`}
              >
                &ldquo;{isBack ? item.back : item.front}&rdquo;
              </span>
              <span
                className={`inline-flex items-center gap-1.5 font-body text-xs mt-5 ${
                  isBack ? "text-cream/70" : "text-muted"
                }`}
              >
                <RefreshCw size={13} />
                {isBack ? "Turn back" : "Tap to see the other side"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
