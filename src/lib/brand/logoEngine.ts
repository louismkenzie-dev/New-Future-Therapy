/* ============================================================================
   NewFuture Therapy — Logo Engine
   Single source of geometry for every logo lockup. Renders identical output to
   (a) inline SVG for vector download, and (b) a high-resolution transparent PNG
   via canvas (also used for the on-page raster previews). Leaf veins are TRUE
   KNOCKOUTS (transparent holes) so every mark sits cleanly on any background.

   Ported from the Claude Design handoff (logo-engine.js). Browser-only: every
   function that touches the DOM is lazy so the module is safe to import during
   server rendering of the client components that use it.
   ============================================================================ */

// ——— Brand colours ———
export const COLOURS = {
  cream: "#F5F3EF",
  sage: "#6B8C6F",
  sageLight: "#C4D9C6",
  sagePale: "#EBF2EC",
  sageDark: "#3A5A40",
  charcoal: "#2D2926",
  muted: "#5C5651",
} as const;

// ——— Leaf geometry (native 180×220 viewBox) ———
const LEAF_PATH = "M90 200 C20 150 10 80 90 20 C170 80 160 150 90 200Z";
const LEAF_VEINS = [
  { x1: 90, y1: 200, x2: 90, y2: 20, w: 3 },
  { x1: 90, y1: 120, x2: 50, y2: 80, w: 2.5 },
  { x1: 90, y1: 140, x2: 130, y2: 100, w: 2.5 },
  { x1: 90, y1: 160, x2: 55, y2: 130, w: 2.5 },
  { x1: 90, y1: 100, x2: 125, y2: 70, w: 2.5 },
];
const LEAF_VB_W = 180,
  LEAF_VB_H = 220,
  LEAF_AR = LEAF_VB_W / LEAF_VB_H;

// ——— Fonts (canonical names — loaded on the brand page via Google Fonts so the
//     canvas measurement context resolves them; SVG downloads embed the same
//     families via an @import for portability) ———
const F_HEAD = '"Cormorant Garamond", Georgia, serif';
const F_BODY = '"DM Sans", system-ui, sans-serif';

// ——— Types ———
export type ColourwayKey =
  | "sage"
  | "reversed"
  | "monoDark"
  | "monoLight"
  | "sageSolid";
export type VariantKey =
  | "primary"
  | "horizontal"
  | "stacked"
  | "wordmark"
  | "leaf";

export interface Colourway {
  label: string;
  leaf: string;
  nf: string;
  th: string;
  bg: string;
  swatch: string;
  onDark?: boolean;
}
interface FontSpec {
  family: string;
  weight: number;
  size: number;
  ls: number;
}
interface LeafOp {
  type: "leaf";
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
}
interface TextOp {
  type: "text";
  text: string;
  x: number;
  y: number;
  font: FontSpec;
  ls: number;
  fill: string;
  anchor: "start" | "middle";
}
type Op = LeafOp | TextOp;
interface BuildResult {
  ops: Op[];
  w: number;
  h: number;
  cw: Colourway;
}

// ——— Colourways ———
// leaf = fill of the leaf body (veins are always knocked out / transparent)
export const COLOURWAYS: Record<ColourwayKey, Colourway> = {
  sage: { label: "Primary", leaf: COLOURS.sageDark, nf: COLOURS.sageDark, th: COLOURS.muted, bg: COLOURS.cream, swatch: COLOURS.sageDark },
  reversed: { label: "Reversed", leaf: COLOURS.sageLight, nf: COLOURS.cream, th: COLOURS.sageLight, bg: COLOURS.charcoal, swatch: COLOURS.charcoal, onDark: true },
  monoDark: { label: "Mono Charcoal", leaf: COLOURS.charcoal, nf: COLOURS.charcoal, th: COLOURS.charcoal, bg: COLOURS.cream, swatch: COLOURS.charcoal },
  monoLight: { label: "Mono Cream", leaf: COLOURS.cream, nf: COLOURS.cream, th: COLOURS.cream, bg: COLOURS.sageDark, swatch: COLOURS.cream, onDark: true },
  sageSolid: { label: "Full Sage", leaf: COLOURS.sage, nf: COLOURS.sage, th: COLOURS.sage, bg: COLOURS.sagePale, swatch: COLOURS.sage },
};

export const COLOURWAY_ORDER: ColourwayKey[] = [
  "sage",
  "reversed",
  "monoDark",
  "monoLight",
  "sageSolid",
];

export interface VariantInfo {
  key: VariantKey;
  name: string;
  desc: string;
}
export const VARIANTS: VariantInfo[] = [
  { key: "primary", name: "Primary Lockup", desc: "Leaf with the stacked wordmark. The default mark — use it wherever space allows." },
  { key: "horizontal", name: "Horizontal Lockup", desc: "Leaf and wordmark on one line. For letterhead, email signatures and tight headers." },
  { key: "stacked", name: "Stacked / Centred", desc: "Leaf above a centred wordmark. For covers, stamps and social profile images." },
  { key: "wordmark", name: "Wordmark", desc: "Type only, no leaf. Use when the leaf already appears nearby." },
  { key: "leaf", name: "Leaf Mark", desc: "The symbol alone. App icon, favicon, watermark and pattern building-block." },
];

// ——— Measurement context (lazily created; uses page-loaded webfonts) ———
type CtxWithSpacing = CanvasRenderingContext2D & { letterSpacing: string };
let _mctx: CtxWithSpacing | null = null;
function mctx(): CtxWithSpacing {
  if (_mctx) return _mctx;
  const c = document.createElement("canvas");
  _mctx = c.getContext("2d") as CtxWithSpacing;
  return _mctx;
}
function setFont(o: FontSpec) {
  const ctx = mctx();
  ctx.font = `${o.weight} ${o.size}px ${o.family}`;
  ctx.letterSpacing = (o.ls || 0) + "px";
}
function textW(t: string, o: FontSpec) {
  setFont(o);
  return mctx().measureText(t).width;
}
function capH(o: FontSpec) {
  setFont(o);
  const m = mctx().measureText("H");
  return m.actualBoundingBoxAscent;
}

// ——— Type specs ———
function specs(scale: number): { nf: FontSpec; th: FontSpec; thIn: FontSpec } {
  const NF = scale; // NewFuture serif size (px) == scale
  return {
    nf: { family: F_HEAD, weight: 600, size: NF, ls: NF * 0.025 },
    th: { family: F_BODY, weight: 400, size: NF * 0.5, ls: NF * 0.5 * 0.2 },
    thIn: { family: F_BODY, weight: 400, size: NF * 0.4, ls: NF * 0.4 * 0.2 },
  };
}

/* --------------------------------------------------------------------------
   buildOps(variant, colourwayKey) -> { ops, w, h, cw }
   ops: array of leaf/text ops in final padded coordinate space.
   -------------------------------------------------------------------------- */
export function buildOps(variant: VariantKey, cwKey: ColourwayKey): BuildResult {
  const cw = COLOURWAYS[cwKey] || COLOURWAYS.sage;
  const leafFill = cw.leaf;
  let ops: Op[];

  if (variant === "leaf") {
    const NF = 200,
      lh = NF,
      lw = lh * LEAF_AR,
      pad = 8;
    ops = [{ type: "leaf", x: pad, y: pad, w: lw, h: lh, fill: leafFill }];
    return { ops, w: lw + pad * 2, h: lh + pad * 2, cw };
  }

  const NF = 96;
  const s = specs(NF);
  const T = "NewFuture",
    TH = "THERAPY";

  if (variant === "wordmark" || variant === "primary") {
    const wNF = textW(T, s.nf),
      wTH = textW(TH, s.th);
    const capNF = capH(s.nf),
      capTH = capH(s.th);
    const gapV = NF * 0.2;
    const blockH = capNF + gapV + capTH;
    const colW = Math.max(wNF, wTH);
    const pad = 10;

    if (variant === "wordmark") {
      const ox = pad,
        oy = pad;
      const b1 = oy + capNF,
        b2 = b1 + gapV + capTH;
      ops = [
        { type: "text", text: T, x: ox, y: b1, font: s.nf, ls: s.nf.ls, fill: cw.nf, anchor: "start" },
        { type: "text", text: TH, x: ox, y: b2, font: s.th, ls: s.th.ls, fill: cw.th, anchor: "start" },
      ];
      return { ops, w: colW + pad * 2, h: blockH + pad * 2, cw };
    }

    // primary: leaf left + stacked wordmark
    const lh = NF * 1.45,
      lw = lh * LEAF_AR;
    const gapH = NF * 0.42;
    const contentH = Math.max(lh, blockH);
    const ox = pad,
      oy = pad;
    const leafY = oy + (contentH - lh) / 2;
    const tx = ox + lw + gapH;
    const textTop = oy + (contentH - blockH) / 2;
    const b1 = textTop + capNF,
      b2 = b1 + gapV + capTH;
    ops = [
      { type: "leaf", x: ox, y: leafY, w: lw, h: lh, fill: leafFill },
      { type: "text", text: T, x: tx, y: b1, font: s.nf, ls: s.nf.ls, fill: cw.nf, anchor: "start" },
      { type: "text", text: TH, x: tx, y: b2, font: s.th, ls: s.th.ls, fill: cw.th, anchor: "start" },
    ];
    return { ops, w: lw + gapH + colW + pad * 2, h: contentH + pad * 2, cw };
  }

  if (variant === "horizontal") {
    const wNF = textW(T, s.nf),
      wTH = textW(TH, s.thIn);
    const capNF = capH(s.nf);
    const lh = NF * 1.3,
      lw = lh * LEAF_AR;
    const gapH = NF * 0.4,
      gapMid = NF * 0.34;
    const pad = 10;
    const contentH = lh;
    const oy = pad,
      ox = pad;
    const leafY = oy + (contentH - lh) / 2;
    const baseline = oy + contentH / 2 + capNF / 2; // vertically centre the caps
    const tx = ox + lw + gapH;
    const txTH = tx + wNF + gapMid;
    ops = [
      { type: "leaf", x: ox, y: leafY, w: lw, h: lh, fill: leafFill },
      { type: "text", text: T, x: tx, y: baseline, font: s.nf, ls: s.nf.ls, fill: cw.nf, anchor: "start" },
      { type: "text", text: TH, x: txTH, y: baseline, font: s.thIn, ls: s.thIn.ls, fill: cw.th, anchor: "start" },
    ];
    return { ops, w: lw + gapH + wNF + gapMid + wTH + pad * 2, h: contentH + pad * 2, cw };
  }

  if (variant === "stacked") {
    const wNF = textW(T, s.nf),
      wTH = textW(TH, s.th);
    const capNF = capH(s.nf),
      capTH = capH(s.th);
    const lh = NF * 1.55,
      lw = lh * LEAF_AR;
    const gapLeaf = NF * 0.34,
      gapV = NF * 0.22;
    const pad = 12;
    const colW = Math.max(wNF, wTH, lw);
    const cx = pad + colW / 2;
    const oy = pad;
    const leafY = oy;
    const b1 = leafY + lh + gapLeaf + capNF;
    const b2 = b1 + gapV + capTH;
    ops = [
      { type: "leaf", x: cx - lw / 2, y: leafY, w: lw, h: lh, fill: leafFill },
      { type: "text", text: T, x: cx, y: b1, font: s.nf, ls: s.nf.ls, fill: cw.nf, anchor: "middle" },
      { type: "text", text: TH, x: cx, y: b2, font: s.th, ls: s.th.ls, fill: cw.th, anchor: "middle" },
    ];
    return { ops, w: colW + pad * 2, h: b2 + capTH * 0.1 + pad, cw };
  }

  throw new Error("unknown variant " + variant);
}

// ——— Leaf transform helper ———
function leafScale(op: LeafOp) {
  return { sx: op.w / LEAF_VB_W, sy: op.h / LEAF_VB_H };
}

/* --------------------------------------------------------------------------
   SVG rendering
   -------------------------------------------------------------------------- */
let maskSeq = 0;
function leafSVG(op: LeafOp, embedId: string) {
  const { sx, sy } = leafScale(op);
  const mid = "veinmask_" + embedId + "_" + maskSeq++;
  const veins = LEAF_VEINS.map(
    (v) =>
      `<line x1="${v.x1}" y1="${v.y1}" x2="${v.x2}" y2="${v.y2}" stroke="#000" stroke-width="${v.w}" stroke-linecap="round"/>`
  ).join("");
  return (
    `<g transform="translate(${r(op.x)},${r(op.y)}) scale(${r6(sx)},${r6(sy)})">` +
    `<mask id="${mid}" maskUnits="userSpaceOnUse" x="-20" y="-20" width="220" height="260">` +
    `<rect x="-20" y="-20" width="220" height="260" fill="#fff"/>${veins}` +
    `</mask>` +
    `<path d="${LEAF_PATH}" fill="${op.fill}" mask="url(#${mid})"/>` +
    `</g>`
  );
}
function textSVG(op: TextOp) {
  const anchor = op.anchor === "middle" ? "middle" : "start";
  const fam = op.font.family.replace(/"/g, "&quot;");
  return (
    `<text x="${r(op.x)}" y="${r(op.y)}" fill="${op.fill}" ` +
    `font-family='${fam}' font-weight="${op.font.weight}" ` +
    `font-size="${r(op.font.size)}" letter-spacing="${r(op.ls)}" text-anchor="${anchor}" ` +
    `style="font-family:${fam}">${esc(op.text)}</text>`
  );
}
function r(n: number) {
  return Math.round(n * 100) / 100;
}
function r6(n: number) {
  return Math.round(n * 1e6) / 1e6;
}
function esc(s: string) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function toSVGString(
  variant: VariantKey,
  cwKey: ColourwayKey,
  opts: { sizeAttrs?: boolean } = {}
): string {
  const { ops, w, h } = buildOps(variant, cwKey);
  const id = (variant + "_" + cwKey).replace(/[^a-z0-9_]/gi, "");
  const fontStyle = `<style>@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=DM+Sans:wght@400&display=swap");</style>`;
  const body = ops
    .map((op) => (op.type === "leaf" ? leafSVG(op, id) : textSVG(op)))
    .join("");
  const sizeAttr = opts.sizeAttrs === false ? "" : ` width="${r(w)}" height="${r(h)}"`;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r(w)} ${r(h)}"${sizeAttr} ` +
    `preserveAspectRatio="xMidYMid meet" role="img" aria-label="NewFuture Therapy logo">` +
    `<defs>${fontStyle}</defs>${body}</svg>`
  );
}

/* --------------------------------------------------------------------------
   Canvas rendering (high-res transparent PNG)
   -------------------------------------------------------------------------- */
function drawCanvas(
  ctx: CtxWithSpacing,
  variant: VariantKey,
  cwKey: ColourwayKey,
  scale: number
) {
  const { ops } = buildOps(variant, cwKey);
  ctx.save();
  ctx.scale(scale, scale);
  for (const op of ops) {
    if (op.type === "leaf") {
      const { sx, sy } = leafScale(op);
      ctx.save();
      ctx.translate(op.x, op.y);
      ctx.scale(sx, sy);
      const p = new Path2D(LEAF_PATH);
      ctx.fillStyle = op.fill;
      ctx.fill(p);
      // knockout veins
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineCap = "round";
      for (const v of LEAF_VEINS) {
        ctx.beginPath();
        ctx.lineWidth = v.w;
        ctx.moveTo(v.x1, v.y1);
        ctx.lineTo(v.x2, v.y2);
        ctx.strokeStyle = "#000";
        ctx.stroke();
      }
      ctx.restore();
    } else {
      ctx.fillStyle = op.fill;
      ctx.font = `${op.font.weight} ${op.font.size}px ${op.font.family}`;
      ctx.letterSpacing = op.ls + "px";
      ctx.textAlign = op.anchor === "middle" ? "center" : "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillText(op.text, op.x, op.y);
    }
  }
  ctx.restore();
}

function makeCanvas(
  variant: VariantKey,
  cwKey: ColourwayKey,
  targetMax?: number
) {
  const { w, h } = buildOps(variant, cwKey);
  const dim = Math.max(w, h);
  const scale = (targetMax || 2400) / dim;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * scale);
  canvas.height = Math.round(h * scale);
  drawCanvas(
    canvas.getContext("2d") as CtxWithSpacing,
    variant,
    cwKey,
    scale
  );
  return canvas;
}
function renderPNGBlob(
  variant: VariantKey,
  cwKey: ColourwayKey,
  targetMax?: number
): Promise<Blob | null> {
  return new Promise((resolve) => {
    makeCanvas(variant, cwKey, targetMax).toBlob((b) => resolve(b), "image/png");
  });
}
export function renderDataURL(
  variant: VariantKey,
  cwKey: ColourwayKey,
  targetMax?: number
): string {
  return makeCanvas(variant, cwKey, targetMax).toDataURL("image/png");
}

/* --------------------------------------------------------------------------
   Download helpers
   -------------------------------------------------------------------------- */
function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function fileName(variant: VariantKey, cwKey: ColourwayKey, ext: string) {
  return `NewFutureTherapy_${variant}_${cwKey}.${ext}`;
}
export function downloadSVG(variant: VariantKey, cwKey: ColourwayKey) {
  const svg = toSVGString(variant, cwKey);
  triggerDownload(
    new Blob([svg], { type: "image/svg+xml" }),
    fileName(variant, cwKey, "svg")
  );
}
export async function downloadPNG(
  variant: VariantKey,
  cwKey: ColourwayKey,
  targetMax?: number
) {
  const blob = await renderPNGBlob(variant, cwKey, targetMax);
  if (blob) triggerDownload(blob, fileName(variant, cwKey, "png"));
}

/* --------------------------------------------------------------------------
   Fonts ready — resolves once the canonical webfonts are loaded so canvas
   measurement and rendering are faithful.
   -------------------------------------------------------------------------- */
export function fontsReady(): Promise<void> {
  if (typeof document === "undefined" || !document.fonts) return Promise.resolve();
  return document.fonts.ready
    .then(() =>
      Promise.all([
        document.fonts.load('600 96px "Cormorant Garamond"'),
        document.fonts.load('400 48px "DM Sans"'),
      ])
    )
    .then(() => undefined)
    .catch(() => undefined);
}
