"use client";

import { useEffect, useState } from "react";
import { renderDataURL, fontsReady, type VariantKey } from "@/lib/brand/logoEngine";

const CS = 54; // clear-space margin (= leaf height unit "x"), in px

function XBadge({ pos }: { pos: React.CSSProperties }) {
  return (
    <div
      className="absolute flex items-center justify-center font-heading text-[1.2rem] italic text-sage-dark"
      style={{
        width: CS,
        height: CS,
        background: "rgba(107,140,111,0.18)",
        border: "1px dashed #6B8C6F",
        ...pos,
      }}
    >
      x
    </div>
  );
}

export default function LogoDiagrams() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    fontsReady().then(() => {
      if (alive) setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  const img = (variant: VariantKey, style: React.CSSProperties) =>
    ready ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={renderDataURL(variant, "sage", 1600)} alt="" className="block object-contain" style={style} />
    ) : null;

  const minItems: { variant: VariantKey; style: React.CSSProperties; label: React.ReactNode }[] = [
    {
      variant: "primary",
      style: { width: 150 },
      label: (
        <>
          <b className="font-semibold text-charcoal">Primary lockup</b>
          <br />
          120&nbsp;px / 32&nbsp;mm min width
        </>
      ),
    },
    {
      variant: "horizontal",
      style: { width: 150 },
      label: (
        <>
          <b className="font-semibold text-charcoal">Horizontal</b>
          <br />
          110&nbsp;px min width
        </>
      ),
    },
    {
      variant: "leaf",
      style: { height: 40 },
      label: (
        <>
          <b className="font-semibold text-charcoal">Leaf mark</b>
          <br />
          24&nbsp;px / 10&nbsp;mm min
        </>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
      {/* Clear space */}
      <div className="rounded-2xl border border-grey-light bg-white p-10 shadow-sm">
        <h3 className="mb-2 font-heading text-2xl font-medium text-charcoal">
          Clear space
        </h3>
        <p className="mb-6 font-body text-sm leading-relaxed text-muted">
          Keep a margin of clear space around the logo equal to the height of the
          leaf (we call this <em>x</em>). Never let other logos, type, photo edges
          or busy detail intrude into this zone.
        </p>
        <div className="flex min-h-[260px] items-center justify-center rounded-xl bg-sage-pale">
          <div className="relative" style={{ padding: CS }}>
            <div style={{ outline: "1.5px dashed #6B8C6F", outlineOffset: 0 }}>
              {img("primary", { height: 96 })}
            </div>
            <XBadge pos={{ left: 0, top: 0 }} />
            <XBadge pos={{ right: 0, top: 0 }} />
            <XBadge pos={{ left: 0, bottom: 0 }} />
            <XBadge pos={{ right: 0, bottom: 0 }} />
          </div>
        </div>
      </div>

      {/* Minimum size */}
      <div className="rounded-2xl border border-grey-light bg-white p-10 shadow-sm">
        <h3 className="mb-2 font-heading text-2xl font-medium text-charcoal">
          Minimum size
        </h3>
        <p className="mb-6 font-body text-sm leading-relaxed text-muted">
          Below these sizes the wordmark loses legibility and the veins fill in.
          Do not reproduce the logo any smaller.
        </p>
        <div className="flex flex-wrap items-end gap-10">
          {minItems.map((it) => (
            <div key={it.variant} className="text-center">
              <div className="flex items-end justify-center p-4">
                {img(it.variant, it.style)}
              </div>
              <div className="mt-3 font-body text-xs leading-relaxed text-muted">
                {it.label}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 font-body text-xs text-grey-mid">
          For print, hold the primary lockup at 32&nbsp;mm wide or larger; the leaf
          mark at 10&nbsp;mm or larger.
        </p>
      </div>
    </div>
  );
}
