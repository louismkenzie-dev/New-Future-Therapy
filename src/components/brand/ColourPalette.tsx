"use client";

import { useToast } from "./useToast";

interface Swatch {
  nm: string;
  hx: string;
  us: string;
  /* dark === the chip is light enough that the hover "Copy" tag needs dark text */
  dark?: boolean;
  ring?: boolean;
}

const GREENS: Swatch[] = [
  { nm: "Cream", hx: "#F5F3EF", us: "Default page background. Never pure white.", dark: true },
  { nm: "Sage Pale", hx: "#EBF2EC", us: "Tinted alternating bands, info panels.", dark: true },
  { nm: "Sage Light", hx: "#C4D9C6", us: "Accents on dark, borders on hover.", dark: true },
  { nm: "Sage", hx: "#6B8C6F", us: "Eyebrows, secondary CTAs, small accents." },
  { nm: "Sage Dark", hx: "#3A5A40", us: "Primary buttons, quote bands, the leaf." },
];

const NEUTRALS: Swatch[] = [
  { nm: "Charcoal", hx: "#2D2926", us: "Headings and the footer background." },
  { nm: "Muted Brown-Grey", hx: "#5C5651", us: "Body copy throughout." },
  { nm: "Grey Mid", hx: "#8C8680", us: "Soft / secondary text, placeholders." },
  { nm: "Grey Light", hx: "#E4E0DB", us: "1px borders and dividers.", dark: true },
  { nm: "White", hx: "#FFFFFF", us: "Cards only — never the page.", dark: true, ring: true },
];

export default function ColourPalette() {
  const { notify, toast } = useToast();

  const copy = (hex: string) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(hex)
        .then(() => notify(`${hex} copied`))
        .catch(() => notify(hex));
    } else {
      notify(hex);
    }
  };

  const card = (c: Swatch) => (
    <button
      key={c.nm}
      type="button"
      onClick={() => copy(c.hx)}
      className="group cursor-pointer overflow-hidden rounded-xl border border-grey-light bg-white text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div
        className="flex h-[116px] items-end justify-end p-3"
        style={{
          background: c.hx,
          boxShadow: c.ring ? "inset 0 0 0 1px #E4E0DB" : undefined,
        }}
      >
        <span
          className="rounded-full px-2 py-[3px] font-body text-[10px] uppercase tracking-wider opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{
            color: c.dark ? "#2D2926" : "#F5F3EF",
            background: c.dark ? "rgba(45,41,38,0.10)" : "rgba(255,255,255,0.18)",
          }}
        >
          Copy
        </span>
      </div>
      <div className="px-5 pb-5 pt-4">
        <p className="mb-0.5 font-body text-sm font-semibold text-charcoal">{c.nm}</p>
        <p className="mb-2 font-body text-xs tracking-wide text-sage-dark">{c.hx}</p>
        <p className="font-body text-xs leading-relaxed text-muted">{c.us}</p>
      </div>
    </button>
  );

  return (
    <>
      <div>
        <h3 className="mb-6 font-heading text-2xl font-medium text-charcoal">
          Greens &amp; Surfaces
        </h3>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {GREENS.map(card)}
        </div>
      </div>
      <div className="mt-12">
        <h3 className="mb-6 font-heading text-2xl font-medium text-charcoal">
          Neutrals &amp; Text
        </h3>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {NEUTRALS.map(card)}
        </div>
      </div>
      {toast}
    </>
  );
}
