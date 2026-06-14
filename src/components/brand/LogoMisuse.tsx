"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { X } from "lucide-react";
import { renderDataURL, fontsReady } from "@/lib/brand/logoEngine";

function B({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-charcoal">{children}</strong>;
}

export default function LogoMisuse() {
  const [src, setSrc] = useState<{ primary: string; leaf: string } | null>(null);

  useEffect(() => {
    let alive = true;
    fontsReady().then(() => {
      if (alive)
        setSrc({
          primary: renderDataURL("primary", "sage", 1400),
          leaf: renderDataURL("leaf", "sage", 800),
        });
    });
    return () => {
      alive = false;
    };
  }, []);

  const primary = (style?: CSSProperties) =>
    src ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src.primary} alt="" className="block h-[62px] w-auto object-contain" style={style} />
    ) : null;

  const leaf = (h: number) =>
    src ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src.leaf} alt="" className="block w-auto object-contain" style={{ height: h }} />
    ) : null;

  const items: { cap: ReactNode; demo: ReactNode; bg?: string }[] = [
    {
      cap: (
        <>
          Do not <B>stretch or distort</B> the proportions.
        </>
      ),
      demo: <div className="flex items-center justify-center">{primary({ transform: "scaleY(1.7)" })}</div>,
    },
    {
      cap: (
        <>
          Do not <B>rotate</B> or set at an angle.
        </>
      ),
      demo: <div className="flex items-center justify-center">{primary({ transform: "rotate(-13deg)" })}</div>,
    },
    {
      cap: (
        <>
          Do not <B>recolour</B> outside the palette.
        </>
      ),
      demo: <div className="flex items-center justify-center">{primary({ filter: "hue-rotate(165deg) saturate(1.7)" })}</div>,
    },
    {
      cap: (
        <>
          Do not add <B>shadows, glows or effects</B>.
        </>
      ),
      demo: <div className="flex items-center justify-center">{primary({ filter: "drop-shadow(3px 5px 4px rgba(45,41,38,0.45))" })}</div>,
    },
    {
      cap: (
        <>
          Do not <B>redraw the wordmark</B> in another font.
        </>
      ),
      demo: (
        <div className="flex items-center gap-2">
          {leaf(56)}
          <span className="flex flex-col leading-none">
            <span style={{ fontFamily: "'Comic Sans MS','Trebuchet MS',cursive", fontWeight: 700, fontSize: 20, color: "#3A5A40" }}>
              NewFuture
            </span>
            <span style={{ fontFamily: "'Comic Sans MS','Trebuchet MS',cursive", fontSize: 11, letterSpacing: "0.1em", color: "#5C5651" }}>
              Therapy
            </span>
          </span>
        </div>
      ),
    },
    {
      cap: (
        <>
          Do not <B>rearrange or re-space</B> the elements.
        </>
      ),
      demo: (
        <div className="flex items-center gap-[26px]">
          <span className="flex flex-col text-right leading-none">
            <span className="font-heading font-semibold tracking-wide" style={{ fontSize: 22, color: "#3A5A40" }}>
              NewFuture
            </span>
            <span className="font-body uppercase" style={{ fontSize: 11, letterSpacing: "0.2em", color: "#5C5651" }}>
              Therapy
            </span>
          </span>
          {leaf(50)}
        </div>
      ),
    },
    {
      cap: (
        <>
          Do not place on <B>low-contrast</B> or clashing colour.
        </>
      ),
      bg: "#6B8C6F",
      demo: <div className="flex items-center justify-center">{primary()}</div>,
    },
    {
      cap: (
        <>
          Do not add a <B>keyline, box or container</B>.
        </>
      ),
      demo: (
        <div className="flex items-center justify-center rounded-lg border-[2.5px] border-sage-dark bg-white px-4 py-[10px]">
          {primary()}
        </div>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-grey-light bg-white">
          <div
            className="relative flex h-[150px] items-center justify-center overflow-hidden p-6"
            style={{ background: it.bg ?? "#F5F3EF" }}
          >
            {it.demo}
            <span className="absolute right-3 top-3 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-red-600 text-white">
              <X size={15} strokeWidth={2.4} />
            </span>
          </div>
          <p className="border-t border-grey-light px-5 py-4 font-body text-sm text-muted">
            {it.cap}
          </p>
        </div>
      ))}
    </div>
  );
}
