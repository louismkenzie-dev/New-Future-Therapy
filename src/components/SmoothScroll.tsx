"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { isAppRoute } from "@/lib/memberRoutes";

/* Lenis smooth scrolling — the backbone of the Apple-like feel.
   Disabled automatically for users who prefer reduced motion. */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  const inApp = isAppRoute(pathname);

  /* Inside the programme the document is pinned and <main> scrolls
     natively, so Lenis (which drives window scroll) is torn down there. */
  useEffect(() => {
    if (inApp) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [inApp]);

  /* Always open a newly navigated page at the top. Lenis tracks its own scroll
     target, so without this it would animate the new page back to the previous
     position (often the bottom of the page just left). */
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true, force: true });
    } else if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      document.querySelector("main")?.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
}
