"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";

/* Brand intro in two weights:
   — "full": leaf draws stroke by stroke, wordmark rises, tagline fades —
     plays on initial load and refresh.
   — "quick": just the leaf drawing itself, much faster — plays on every
     client-side navigation between pages.
   Skipped entirely for reduced-motion users. */

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Variant = "full" | "quick";

/* Timings per variant (ms / s) */
const TIMING = {
  full: {
    exitAt: 2600, // curtain starts lifting
    doneAt: 3700, // unmount
    curtain: 1.1, // curtain lift duration (s)
    draw: 1.2, // leaf outline draw (s)
    fillDelay: 1.0,
    fillDur: 0.8,
    veinDelay: 1.2,
    veinStep: 0.08,
    veinDur: 0.5,
  },
  quick: {
    exitAt: 1000,
    doneAt: 1650,
    curtain: 0.65,
    draw: 0.6,
    fillDelay: 0.45,
    fillDur: 0.35,
    veinDelay: 0.55,
    veinStep: 0.04,
    veinDur: 0.25,
  },
} as const;

/* Explore-button chime: quiet, capped to ~4s total with a quick fade-out
   (a safety net should the clip ever ring on longer). */
const CHIME_VOLUME = 0.09;
const CHIME_TOTAL = 4.0; // seconds the chime is audible
const CHIME_FADE_AT = 3.2; // start the quick fade-out

const VEINS = [
  { x1: 90, y1: 200, x2: 90, y2: 20, w: 3 },
  { x1: 90, y1: 120, x2: 50, y2: 80, w: 2.5 },
  { x1: 90, y1: 140, x2: 130, y2: 100, w: 2.5 },
  { x1: 90, y1: 160, x2: 55, y2: 130, w: 2.5 },
  { x1: 90, y1: 100, x2: 125, y2: 70, w: 2.5 },
];

function LeafDraw({ variant }: { variant: Variant }) {
  const t = TIMING[variant];
  return (
    <svg width="90" height="110" viewBox="0 0 180 220" fill="none" aria-hidden="true">
      {/* Leaf outline draws in */}
      <motion.path
        d="M90 200 C20 150 10 80 90 20 C170 80 160 150 90 200Z"
        stroke="#3A5A40"
        strokeWidth="3"
        fill="#3A5A40"
        initial={{ pathLength: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, fillOpacity: 1 }}
        transition={{
          pathLength: { duration: t.draw, ease: "easeInOut" },
          fillOpacity: { duration: t.fillDur, delay: t.fillDelay },
        }}
      />
      {/* Veins fade in after the fill */}
      {VEINS.map((v, i) => (
        <motion.line
          key={i}
          {...{ x1: v.x1, y1: v.y1, x2: v.x2, y2: v.y2 }}
          stroke="#F5F3EF"
          strokeWidth={v.w}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: t.veinDur,
            delay: t.veinDelay + i * t.veinStep,
            ease: "easeOut",
          }}
        />
      ))}
    </svg>
  );
}

/* How long the quick fade-in takes — the route only changes after this,
   so the leaf screen is fully opaque before the page swaps underneath. */
const QUICK_FADE_MS = 450;

export default function IntroScreen() {
  const pathname = usePathname();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [variant, setVariant] = useState<Variant>("full");
  /* On first entry the full intro waits on screen; the Explore button appears
     once it has settled and dismisses the intro on click. */
  const [ready, setReady] = useState(false);
  /* Bump on each play so the curtain (and the leaf draw inside it) fully
     remounts and re-runs its animation, even when the route stays mounted. */
  const [runId, setRunId] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  /* Preload the quiet singing-bowl chime played when Explore is pressed. */
  useEffect(() => {
    const a = new Audio("/audio/uichime.mp3");
    a.preload = "auto";
    a.volume = CHIME_VOLUME;
    audioRef.current = a;
    return () => {
      if (fadeRef.current) clearInterval(fadeRef.current);
    };
  }, []);

  /* Dismiss the first-entry intro: play the chime, then lift the curtain. */
  const handleExplore = () => {
    if (leaving) return;

    const a = audioRef.current;
    if (a) {
      if (fadeRef.current) clearInterval(fadeRef.current);
      a.pause();
      a.currentTime = 0;
      a.volume = CHIME_VOLUME;
      void a.play().catch(() => {});
      const start = performance.now();
      fadeRef.current = setInterval(() => {
        const el = audioRef.current;
        if (!el) return;
        const elapsed = (performance.now() - start) / 1000;
        if (elapsed >= CHIME_TOTAL) {
          el.pause();
          el.currentTime = 0;
          el.volume = CHIME_VOLUME;
          if (fadeRef.current) clearInterval(fadeRef.current);
          fadeRef.current = null;
        } else if (elapsed >= CHIME_FADE_AT) {
          const k = 1 - (elapsed - CHIME_FADE_AT) / (CHIME_TOTAL - CHIME_FADE_AT);
          el.volume = Math.max(0, CHIME_VOLUME * k);
        }
      }, 50);
    }

    clearTimers();
    setLeaving(true);
    timersRef.current.push(
      setTimeout(() => {
        setShow(false);
        document.documentElement.style.overflow = "";
      }, TIMING.full.curtain * 1000 + 80)
    );
  };

  /* Full intro once, on initial load / refresh */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    setVariant("full");
    setLeaving(false);
    setReady(false);
    setShow(true);
    setRunId((n) => n + 1);
    document.documentElement.style.overflow = "hidden";

    /* Reveal the Explore button once the leaf, wordmark and tagline have
       settled. The intro then waits on screen until it is pressed. */
    timersRef.current.push(setTimeout(() => setReady(true), 2900));

    return () => {
      clearTimers();
      document.documentElement.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Quick intro on navigation: intercept internal link clicks, cover the
     screen with the leaf first, then push the route once fully opaque. */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;

      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (
        !href ||
        !href.startsWith("/") ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        href === pathname
      )
        return;

      /* Stop Next.js <Link> from navigating instantly — we navigate
         ourselves once the leaf screen is fully opaque. */
      e.preventDefault();
      e.stopPropagation();
      clearTimers();

      const t = TIMING.quick;
      setVariant("quick");
      setLeaving(false);
      setShow(true);
      setRunId((n) => n + 1);
      document.documentElement.style.overflow = "hidden";

      timersRef.current.push(
        /* Navigate only once the leaf screen fully covers the old page */
        setTimeout(() => router.push(href), QUICK_FADE_MS),
        setTimeout(() => setLeaving(true), t.exitAt),
        setTimeout(() => {
          setShow(false);
          document.documentElement.style.overflow = "";
        }, t.doneAt)
      );
    };

    /* Capture phase: run before Next.js <Link>'s own click handler,
       which would otherwise preventDefault and navigate immediately. */
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, router]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={runId}
          className="fixed inset-0 z-[100] bg-cream flex items-center justify-center"
          /* Quick (navigation) variant breathes in and out — a soft fade,
             like an exhale — while the full intro keeps its curtain lift. */
          initial={variant === "quick" ? { opacity: 0 } : false}
          animate={
            variant === "quick"
              ? { opacity: leaving ? 0 : 1 }
              : { y: leaving ? "-100%" : 0 }
          }
          exit={variant === "quick" ? { opacity: 0 } : { y: "-100%" }}
          transition={{
            duration: variant === "quick" ? 0.45 : TIMING.full.curtain,
            ease: variant === "quick" ? "easeInOut" : EASE_OUT,
          }}
        >
          <div className="flex flex-col items-center">
            <LeafDraw variant={variant} />

            {variant === "full" && (
              <>
                <div className="overflow-hidden mt-6">
                  <motion.div
                    className="flex flex-col items-center leading-none"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 1.4, ease: EASE_OUT }}
                  >
                    <span className="font-heading text-4xl font-semibold text-sage-dark tracking-wide">
                      NewFuture
                    </span>
                    <span className="font-body text-sm text-muted uppercase tracking-[0.3em] mt-1">
                      Therapy
                    </span>
                  </motion.div>
                </div>

                <motion.p
                  className="font-heading italic text-lg text-sage mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.9 }}
                >
                  growth begins with understanding
                </motion.p>

                {/* Always rendered so it reserves its space from the first
                    frame — the leaf, wordmark and tagline never shift. It only
                    fades in (no pop) and becomes interactive once ready. */}
                <motion.button
                  type="button"
                  onClick={handleExplore}
                  aria-label="Explore the site"
                  aria-hidden={!ready}
                  tabIndex={ready ? 0 : -1}
                  style={{ pointerEvents: ready ? "auto" : "none" }}
                  className="mt-12 inline-flex items-center gap-2 rounded-full bg-sage-dark text-cream font-body text-sm tracking-wide px-9 py-4 shadow-[0_14px_34px_-10px_rgba(58,90,64,0.55)] transition-colors duration-300 hover:bg-charcoal"
                  initial={false}
                  animate={{ opacity: ready ? 1 : 0 }}
                  transition={{ duration: 0.7, ease: EASE_OUT }}
                >
                  Explore
                  <ArrowRight size={16} />
                </motion.button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
