import type { ReactNode } from "react";
import { riseStyle } from "@/lib/rise";

/* Page-opening band: eyebrow rises, serif title follows, lede fades. The
   entrances are CSS (.nf-rise in globals.css) so the heading is visible
   from first paint, without waiting for JavaScript. */
export default function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
}) {
  return (
    <section className="bg-sage-pale pt-16 pb-12 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        <p
          className="nf-rise font-body text-sm text-sage-dark uppercase tracking-[0.25em] mb-4"
          style={riseStyle(0, 16, 0.7)}
        >
          {eyebrow}
        </p>
        <div className="overflow-hidden">
          <h1
            className="nf-rise font-heading text-5xl md:text-6xl font-light text-charcoal leading-tight"
            style={riseStyle(0.15, "60%")}
          >
            {title}
          </h1>
        </div>
        {lede && (
          <p
            className="nf-rise font-body text-base text-muted leading-relaxed max-w-xl mx-auto mt-6"
            style={riseStyle(0.4, 16, 0.8)}
          >
            {lede}
          </p>
        )}
      </div>
    </section>
  );
}
