"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import MuxPlayer from "@mux/mux-player-react";
import { Play, X } from "lucide-react";
import type { TherapistStory } from "@/lib/content/therapists";
import { useAnalyticsConsent } from "@/lib/consent";

/* Click-to-open story video for a therapist profile. On open it plays the
   brand's signature leaf-draw intro, then seamlessly crossfades into the video
   — all inside one cohesive, on-brand framed panel (public-policy Mux asset).
   Two triggers: "overlay" (a play button over a photo) and "pill". */

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const LEAF_PATH = "M90 200 C20 150 10 80 90 20 C170 80 160 150 90 200Z";
const VEINS = [
  { x1: 90, y1: 200, x2: 90, y2: 20, w: 3 },
  { x1: 90, y1: 120, x2: 50, y2: 80, w: 2.5 },
  { x1: 90, y1: 140, x2: 130, y2: 100, w: 2.5 },
  { x1: 90, y1: 160, x2: 55, y2: 130, w: 2.5 },
  { x1: 90, y1: 100, x2: 125, y2: 70, w: 2.5 },
];
const INTRO_MS = 2200;

/* The leaf, drawing itself in — sage-light on dark, matching the site intro. */
function LeafDraw() {
  return (
    <svg width="86" height="105" viewBox="0 0 180 220" fill="none" aria-hidden="true">
      <motion.path
        d={LEAF_PATH}
        stroke="#C4D9C6"
        strokeWidth="3"
        fill="#C4D9C6"
        initial={{ pathLength: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, fillOpacity: 1 }}
        transition={{
          pathLength: { duration: 1.0, ease: "easeInOut" },
          fillOpacity: { duration: 0.7, delay: 0.7 },
        }}
      />
      {VEINS.map((v, i) => (
        <motion.line
          key={i}
          x1={v.x1}
          y1={v.y1}
          x2={v.x2}
          y2={v.y2}
          stroke="#2D2926"
          strokeWidth={v.w}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.9 + i * 0.06, ease: "easeOut" }}
        />
      ))}
    </svg>
  );
}

export default function StoryVideo({
  name,
  story,
  variant = "overlay",
  className = "",
}: {
  name: string;
  story: TherapistStory;
  variant?: "overlay" | "pill";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"intro" | "video">("intro");
  const reduced = useReducedMotion();
  const analyticsAllowed = useAnalyticsConsent();

  useEffect(() => setMounted(true), []);

  /* Reset to the intro each time it opens (reduced-motion jumps to the video). */
  useEffect(() => {
    if (open) setPhase(reduced ? "video" : "intro");
  }, [open, reduced]);

  /* Hold on the leaf-draw intro, then reveal the video. */
  useEffect(() => {
    if (!open || phase !== "intro" || reduced) return;
    const t = setTimeout(() => setPhase("video"), INTRO_MS);
    return () => clearTimeout(t);
  }, [open, phase, reduced]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const trigger =
    variant === "pill" ? (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-2 font-body text-sm bg-sage-dark text-cream px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-200 ${className}`}
      >
        <Play size={15} className="fill-current" />
        Watch {name}&rsquo;s Story
      </button>
    ) : (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Watch ${name}'s story`}
        className={`group/play inline-flex items-center justify-center ${className}`}
      >
        <span className="flex items-center justify-center w-16 h-16 rounded-full bg-cream/95 shadow-lg border border-sage-light transition-all duration-300 group-hover/play:scale-110 group-hover/play:bg-cream">
          <Play size={26} className="text-sage-dark fill-sage-dark ml-1" />
        </span>
      </button>
    );

  const modal =
    open && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-charcoal/95 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${name}'s story`}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-cream/10 text-cream hover:bg-cream/20 transition-colors duration-200"
            >
              <X size={22} />
            </button>

            <motion.div
              className="w-full max-w-4xl"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* One cohesive branded panel: the leaf-draw intro morphs into the video */}
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-sage-light/25 bg-charcoal shadow-2xl">
                <AnimatePresence>
                  {phase === "intro" ? (
                    <motion.button
                      key="intro"
                      type="button"
                      onClick={() => setPhase("video")}
                      aria-label="Play the video now"
                      className="absolute inset-0 flex flex-col items-center justify-center"
                      exit={{ opacity: 0, scale: 1.03 }}
                      transition={{ duration: 0.5, ease: EASE_OUT }}
                    >
                      {/* Soft sage atmosphere */}
                      <span
                        className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-sage-dark/40 blur-3xl"
                        aria-hidden="true"
                      />
                      <span
                        className="pointer-events-none absolute -bottom-20 right-[-10%] h-64 w-64 rounded-full bg-sage/25 blur-3xl"
                        aria-hidden="true"
                      />

                      <span className="relative flex flex-col items-center">
                        <LeafDraw />
                        <motion.span
                          className="mt-5 flex flex-col items-center leading-none"
                          initial={{ y: "120%", opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.8, delay: 1.05, ease: EASE_OUT }}
                        >
                          <span className="font-heading text-2xl sm:text-3xl font-semibold text-cream tracking-wide">
                            NewFuture
                          </span>
                          <span className="font-body text-[0.6rem] sm:text-xs text-sage-light uppercase tracking-[0.3em] mt-1">
                            Therapy
                          </span>
                        </motion.span>
                        <motion.span
                          className="mt-5 font-heading italic text-base sm:text-lg text-sage-light"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.7, delay: 1.5 }}
                        >
                          {name}&rsquo;s Story
                        </motion.span>
                      </span>
                    </motion.button>
                  ) : (
                    <motion.div
                      key="video"
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, ease: EASE_OUT }}
                    >
                      <MuxPlayer
                        playbackId={story.playbackId}
                        streamType="on-demand"
                        autoPlay
                        accentColor="#6B8C6F"
                        envKey={analyticsAllowed ? process.env.NEXT_PUBLIC_MUX_DATA_ENV_KEY : undefined}
                        metadata={{
                          video_id: `therapist-story/${story.playbackId}`,
                          video_title: `${name} — Therapist Story`,
                          player_name: "NewFuture Profile Player",
                        }}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <p className="text-center font-body text-sm text-cream/70 mt-4">
                {name} &middot; Therapist &amp; Co-founder
              </p>
            </motion.div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      {trigger}
      {modal}
    </>
  );
}
