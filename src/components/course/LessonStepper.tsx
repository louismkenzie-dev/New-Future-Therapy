"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, LayoutList } from "lucide-react";

/* One snippet at a time. Each lesson block becomes a step with a progress
   bar, Continue / Back, and a step list to jump around. The place is
   remembered per lesson in this browser (localStorage, best effort). The
   final "finish" node — Mark Complete and lesson navigation — is its own
   step so completing a lesson feels like arriving. */

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface LessonStep {
  label: string;
  node: ReactNode;
}

export default function LessonStepper({
  lessonId,
  steps,
  finish,
}: {
  lessonId: string;
  steps: LessonStep[];
  finish: ReactNode;
}) {
  const total = steps.length + 1;
  const storageKey = `nf-lesson-step:${lessonId}`;
  const [index, setIndex] = useState(0);
  const [showList, setShowList] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    try {
      const saved = Number(window.localStorage.getItem(storageKey));
      if (Number.isFinite(saved) && saved > 0 && saved < total) setIndex(saved);
    } catch {
      // Private mode or blocked storage — start from the beginning.
    }
    setHydrated(true);
  }, [storageKey, total]);

  const go = (next: number) => {
    const clamped = Math.max(0, Math.min(total - 1, next));
    setIndex(clamped);
    setShowList(false);
    try {
      window.localStorage.setItem(storageKey, String(clamped));
    } catch {
      // ignore
    }
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  const isFinish = index === steps.length;
  const percent = Math.round(((index + 1) / total) * 100);

  return (
    <div ref={topRef} className="scroll-mt-28">
      {/* Progress */}
      <div className="flex items-center gap-3 sm:gap-4 mb-8 md:mb-10">
        <div
          className="flex-1 h-2 rounded-full bg-sage-pale overflow-hidden"
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label="Lesson progress"
        >
          <motion.div
            className="h-full bg-sage rounded-full"
            initial={false}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          />
        </div>
        <span className="font-body text-xs text-muted uppercase tracking-widest whitespace-nowrap">
          {index + 1} of {total}
        </span>
        <button
          type="button"
          onClick={() => setShowList((v) => !v)}
          aria-expanded={showList}
          className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-grey-light text-muted hover:border-sage-light hover:text-sage-dark transition-colors duration-200"
          aria-label="Show all steps"
        >
          <LayoutList size={16} />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {showList && (
          <motion.ol
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="bg-white rounded-2xl border border-grey-light shadow-sm divide-y divide-grey-light mb-10 overflow-hidden"
          >
            {[...steps.map((s) => s.label), "Finish"].map((label, i) => (
              <li key={`${i}-${label}`}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={i === index ? "step" : undefined}
                  className={`w-full text-left px-6 py-3.5 flex items-center gap-4 font-body text-sm transition-colors duration-200 ${
                    i === index
                      ? "bg-sage-pale text-sage-dark"
                      : "text-charcoal hover:bg-sage-pale/40"
                  }`}
                >
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs shrink-0 ${
                      i < index
                        ? "bg-sage text-cream"
                        : i === index
                          ? "bg-sage-dark text-cream"
                          : "border border-grey-light text-muted"
                    }`}
                  >
                    {i < index ? <Check size={13} /> : i + 1}
                  </span>
                  {label}
                </button>
              </li>
            ))}
          </motion.ol>
        )}
      </AnimatePresence>

      {/* The step itself */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={hydrated && !reduceMotion ? { opacity: 0, y: 24 } : false}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          {isFinish ? finish : steps[index].node}
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3 mt-10 md:mt-12 pt-6 md:pt-8 border-t border-grey-light">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="Back"
          className="inline-flex items-center justify-center gap-2 min-h-[52px] min-w-[52px] font-body text-sm text-muted px-4 sm:px-5 py-3 rounded-full border border-grey-light sm:border-transparent hover:text-sage-dark transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Back</span>
        </button>
        {!isFinish && (
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 min-h-[52px] font-body text-sm bg-sage-dark text-cream px-8 py-4 rounded-full hover:bg-charcoal transition-colors duration-200"
          >
            {index === steps.length - 1 ? "Finish" : "Continue"}
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
