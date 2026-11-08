import type { CSSProperties } from "react";

/* Custom properties for the CSS .nf-rise / .nf-word entrances in
   globals.css, which start at first paint rather than after hydration. */
export function riseStyle(delay: number, rise: number | string = 20, duration = 0.9, scale = 1): CSSProperties {
  return {
    "--rise-delay": `${delay}s`,
    "--rise-y": typeof rise === "number" ? `${rise}px` : rise,
    "--rise-dur": `${duration}s`,
    "--rise-scale": String(scale),
  } as CSSProperties;
}
