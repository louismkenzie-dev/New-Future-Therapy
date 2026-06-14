"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import {
  VARIANTS,
  COLOURWAYS,
  COLOURWAY_ORDER,
  renderDataURL,
  downloadSVG,
  downloadPNG,
  fontsReady,
  type ColourwayKey,
  type VariantInfo,
} from "@/lib/brand/logoEngine";
import { useToast } from "./useToast";

const DEFAULT_CW: Record<string, ColourwayKey> = {
  primary: "sage",
  horizontal: "monoDark",
  stacked: "reversed",
  wordmark: "sageSolid",
  leaf: "sage",
};

function LogoCard({
  variant,
  ready,
  notify,
}: {
  variant: VariantInfo;
  ready: boolean;
  notify: (m: string) => void;
}) {
  const [cw, setCw] = useState<ColourwayKey>(DEFAULT_CW[variant.key] ?? "sage");
  const [src, setSrc] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const feature = variant.key === "primary";

  useEffect(() => {
    if (!ready) return;
    setSrc(renderDataURL(variant.key, cw, 1600));
  }, [ready, variant.key, cw]);

  const colourway = COLOURWAYS[cw];

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl border border-grey-light bg-white shadow-sm ${
        feature ? "md:col-span-2" : ""
      }`}
    >
      {/* Stage */}
      <div
        className={`flex items-center justify-center p-12 transition-colors duration-200 ${
          feature ? "min-h-[300px]" : "min-h-[220px]"
        }`}
        style={{ background: colourway.bg }}
      >
        {src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={`NewFuture Therapy ${variant.name}, ${colourway.label} colourway`}
            className={`w-full object-contain ${feature ? "h-[232px]" : "h-[190px]"}`}
          />
        )}
      </div>

      {/* Meta */}
      <div className="border-t border-grey-light p-6">
        <h3 className="mb-2 font-heading text-xl font-medium text-charcoal">
          {variant.name}
        </h3>
        <p className="font-body text-sm leading-relaxed text-muted">
          {variant.desc}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              {COLOURWAY_ORDER.map((key) => {
                const c = COLOURWAYS[key];
                const active = key === cw;
                return (
                  <button
                    key={key}
                    type="button"
                    title={c.label}
                    aria-label={c.label}
                    aria-pressed={active}
                    onClick={() => setCw(key)}
                    className={`h-[26px] w-[26px] rounded-full border border-grey-light transition-transform duration-200 hover:-translate-y-px ${
                      active
                        ? "ring-2 ring-sage-dark ring-offset-2 ring-offset-white"
                        : ""
                    }`}
                    style={{ background: c.swatch }}
                  />
                );
              })}
            </div>
            <span className="font-body text-xs tracking-wide text-grey-mid">
              {colourway.label} · transparent
            </span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                downloadSVG(variant.key, cw);
                notify(`Downloading ${variant.name} · SVG`);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-sage-dark px-4 py-2 font-body text-xs tracking-wide text-sage-dark transition-colors duration-200 hover:bg-sage-pale"
            >
              <Download size={13} /> SVG
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                await downloadPNG(variant.key, cw, 2600);
                notify(`Downloading ${variant.name} · PNG (transparent)`);
                setBusy(false);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-sage-dark bg-sage-dark px-4 py-2 font-body text-xs tracking-wide text-cream transition-colors duration-200 hover:border-charcoal hover:bg-charcoal disabled:opacity-60"
            >
              <Download size={13} /> {busy ? "…" : "PNG"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LogoSuite() {
  const [ready, setReady] = useState(false);
  const { notify, toast } = useToast();

  useEffect(() => {
    let alive = true;
    fontsReady().then(() => {
      if (alive) setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {VARIANTS.map((v) => (
          <LogoCard key={v.key} variant={v} ready={ready} notify={notify} />
        ))}
      </div>
      {toast}
    </>
  );
}
