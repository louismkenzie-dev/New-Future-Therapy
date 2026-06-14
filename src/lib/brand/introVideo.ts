/* ============================================================================
   NewFuture Therapy — Intro logo animation, rendered to video.
   Reproduces the site's "full" intro (IntroScreen.tsx) deterministically on a
   canvas — cream background, leaf outline draws in dark green, fills, the cream
   veins draw, the wordmark rises, the tagline fades — then encodes it to a true
   MP4 via WebCodecs H.264 (MediaRecorder fallback). Browser-only.
   ============================================================================ */

import { fontsReady } from "./logoEngine";

const CREAM = "#F5F3EF";
const SAGE_DARK = "#3A5A40";
const SAGE = "#6B8C6F";
const MUTED = "#5C5651";

const LEAF_PATH = "M90 200 C20 150 10 80 90 20 C170 80 160 150 90 200Z";
const VEINS = [
  { x1: 90, y1: 200, x2: 90, y2: 20, w: 3 },
  { x1: 90, y1: 120, x2: 50, y2: 80, w: 2.5 },
  { x1: 90, y1: 140, x2: 130, y2: 100, w: 2.5 },
  { x1: 90, y1: 160, x2: 55, y2: 130, w: 2.5 },
  { x1: 90, y1: 100, x2: 125, y2: 70, w: 2.5 },
];

/* Timings mirror IntroScreen's "full" variant, then a gentle hold. */
const T = {
  draw: 1.2,
  fillDelay: 1.0,
  fillDur: 0.8,
  veinDelay: 1.2,
  veinStep: 0.08,
  veinDur: 0.5,
  // Wordmark holds until the leaf is fully formed — outline (1.2s), fill (1.8s)
  // and veins (~2.0s) are all complete — before it rises into view.
  wordDelay: 2.05,
  wordDur: 0.9,
  tagDelay: 2.55,
  tagDur: 0.8,
};
export const INTRO_DURATION = 4.0; // seconds (animation settles ~3.35s, then holds)

// ——— Easing ———
function bezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  const cx = 3 * p1x,
    bx = 3 * (p2x - p1x) - cx,
    ax = 1 - cx - bx;
  const cy = 3 * p1y,
    by = 3 * (p2y - p1y) - cy,
    ay = 1 - cy - by;
  const fx = (tt: number) => ((ax * tt + bx) * tt + cx) * tt;
  const fy = (tt: number) => ((ay * tt + by) * tt + cy) * tt;
  const dfx = (tt: number) => (3 * ax * tt + 2 * bx) * tt + cx;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let tt = x;
    for (let i = 0; i < 8; i++) {
      const e = fx(tt) - x;
      if (Math.abs(e) < 1e-5) break;
      const d = dfx(tt);
      if (Math.abs(d) < 1e-6) break;
      tt -= e / d;
    }
    return fy(tt);
  };
}
const easeInOut = bezier(0.42, 0, 0.58, 1);
const easeOut = bezier(0, 0, 0.58, 1);
const easeOutBrand = bezier(0.22, 1, 0.36, 1); // the site's signature ease
const clamp = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

// ——— Leaf outline length (for the draw-in dash) ———
let _leafLen: number | null = null;
function leafLen(): number {
  if (_leafLen != null) return _leafLen;
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("width", "0");
  svg.setAttribute("height", "0");
  svg.style.position = "absolute";
  svg.style.left = "-9999px";
  const p = document.createElementNS(NS, "path");
  p.setAttribute("d", LEAF_PATH);
  svg.appendChild(p);
  document.body.appendChild(svg);
  _leafLen = p.getTotalLength();
  document.body.removeChild(svg);
  return _leafLen;
}

type Ctx = CanvasRenderingContext2D & { letterSpacing: string };

/* Draw a single frame of the intro at time `t` (seconds) into a W×H context. */
export function drawIntroFrame(
  ctx: CanvasRenderingContext2D,
  t: number,
  W: number,
  H: number
) {
  const c = ctx as Ctx;

  // background
  c.fillStyle = CREAM;
  c.fillRect(0, 0, W, H);
  c.textAlign = "center";
  c.textBaseline = "alphabetic";

  // —— layout ——
  const leafH = H * 0.17;
  const leafW = leafH * (180 / 220);
  const gapLeafWord = H * 0.06;
  const nfSize = H * 0.052;
  const thSize = H * 0.0185;
  const thGap = H * 0.014;
  const gapWordTag = H * 0.05;
  const tagSize = H * 0.026;

  const nfFont = `600 ${nfSize}px "Cormorant Garamond", Georgia, serif`;
  const thFont = `400 ${thSize}px "DM Sans", system-ui, sans-serif`;
  const tagFont = `italic 400 ${tagSize}px "Cormorant Garamond", Georgia, serif`;

  c.font = nfFont;
  c.letterSpacing = `${0.025 * nfSize}px`;
  const nfCap = c.measureText("NewFuture").actualBoundingBoxAscent || nfSize * 0.7;
  c.font = thFont;
  c.letterSpacing = `${0.3 * thSize}px`;
  const thCap = c.measureText("THERAPY").actualBoundingBoxAscent || thSize * 0.72;
  c.font = tagFont;
  c.letterSpacing = "0px";
  const tagCap =
    c.measureText("growth begins with understanding").actualBoundingBoxAscent ||
    tagSize * 0.7;

  const wordBlockH = nfCap + thGap + thCap;
  const totalH = leafH + gapLeafWord + wordBlockH + gapWordTag + tagCap;
  const cx = W / 2;
  let y = (H - totalH) / 2;

  // —— leaf ——
  const leafTop = y;
  c.save();
  c.translate(cx - leafW / 2, leafTop);
  c.scale(leafW / 180, leafH / 220);
  const path = new Path2D(LEAF_PATH);

  const fillA = easeInOut(clamp((t - T.fillDelay) / T.fillDur));
  if (fillA > 0) {
    c.save();
    c.globalAlpha = fillA;
    c.fillStyle = SAGE_DARK;
    c.fill(path);
    c.restore();
  }
  const pDraw = easeInOut(clamp(t / T.draw));
  if (pDraw > 0) {
    c.save();
    c.strokeStyle = SAGE_DARK;
    c.lineWidth = 3;
    c.lineJoin = "round";
    c.lineCap = "round";
    const L = leafLen();
    c.setLineDash([L]);
    c.lineDashOffset = L * (1 - pDraw);
    c.stroke(path);
    c.restore();
  }
  for (let i = 0; i < VEINS.length; i++) {
    const v = VEINS[i];
    const pv = easeOut(clamp((t - (T.veinDelay + i * T.veinStep)) / T.veinDur));
    if (pv <= 0) continue;
    const x2 = v.x1 + (v.x2 - v.x1) * pv;
    const y2 = v.y1 + (v.y2 - v.y1) * pv;
    c.save();
    c.strokeStyle = CREAM;
    c.lineWidth = v.w;
    c.lineCap = "round";
    c.beginPath();
    c.moveTo(v.x1, v.y1);
    c.lineTo(x2, y2);
    c.stroke();
    c.restore();
  }
  c.restore();
  y += leafH + gapLeafWord;

  // —— wordmark (rises from below a clip, like the intro) ——
  const wordTop = y;
  const nfBaseline = wordTop + nfCap;
  const thBaseline = wordTop + nfCap + thGap + thCap;
  const pWord = easeOutBrand(clamp((t - T.wordDelay) / T.wordDur));
  // Clip band exactly contains the resting wordmark (glyph headroom above the
  // caps, descender room below). The block starts a full band-height below it —
  // entirely hidden — and rises into view, so no part of the text (top included)
  // shows until it pops up.
  const clipTop = wordTop - nfCap * 0.2;
  const clipBottom = thBaseline + thSize * 0.3;
  const clipH = clipBottom - clipTop;
  const slide = (1 - pWord) * clipH;
  c.save();
  c.beginPath();
  c.rect(0, clipTop, W, clipH);
  c.clip();
  c.translate(0, slide);
  c.fillStyle = SAGE_DARK;
  c.font = nfFont;
  c.letterSpacing = `${0.025 * nfSize}px`;
  c.fillText("NewFuture", cx, nfBaseline);
  c.fillStyle = MUTED;
  c.font = thFont;
  c.letterSpacing = `${0.3 * thSize}px`;
  c.fillText("THERAPY", cx, thBaseline);
  c.letterSpacing = "0px";
  c.restore();
  y += wordBlockH + gapWordTag;

  // —— tagline (fades in) ——
  const pTag = easeInOut(clamp((t - T.tagDelay) / T.tagDur));
  if (pTag > 0) {
    c.save();
    c.globalAlpha = pTag;
    c.fillStyle = SAGE;
    c.font = tagFont;
    c.fillText("growth begins with understanding", cx, y + tagCap);
    c.restore();
  }
}

// ——— Encoders ———
interface RenderOpts {
  width?: number;
  height?: number;
  fps?: number;
  onProgress?: (p: number) => void;
}

async function pickAvcCodec(width: number, height: number, fps: number) {
  const candidates = [
    "avc1.640028",
    "avc1.4D0028",
    "avc1.42E028",
    "avc1.640020",
    "avc1.42001f",
  ];
  for (const codec of candidates) {
    try {
      const support = await VideoEncoder.isConfigSupported({
        codec,
        width,
        height,
        bitrate: 12_000_000,
        framerate: fps,
      });
      if (support.supported) return codec;
    } catch {
      /* try next */
    }
  }
  return null;
}

async function renderViaWebCodecs(opts: Required<RenderOpts>): Promise<Blob> {
  const { width, height, fps, onProgress } = opts;
  await fontsReady();
  const codec = await pickAvcCodec(width, height, fps);
  if (!codec) throw new Error("No supported H.264 encoder configuration");

  const { Muxer, ArrayBufferTarget } = await import("mp4-muxer");
  const muxer = new Muxer({
    target: new ArrayBufferTarget(),
    video: { codec: "avc", width, height, frameRate: fps },
    fastStart: "in-memory",
  });
  const encoder = new VideoEncoder({
    output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
    error: (e) => {
      throw e;
    },
  });
  encoder.configure({ codec, width, height, bitrate: 12_000_000, framerate: fps });

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");

  const total = Math.round(INTRO_DURATION * fps);
  const frameDur = 1e6 / fps;
  for (let i = 0; i < total; i++) {
    drawIntroFrame(ctx, i / fps, width, height);
    const frame = new VideoFrame(canvas, {
      timestamp: Math.round(i * frameDur),
      duration: Math.round(frameDur),
    });
    encoder.encode(frame, { keyFrame: i % fps === 0 });
    frame.close();
    onProgress?.((i + 1) / total);
    // keep the UI responsive and let the encoder drain
    if (encoder.encodeQueueSize > 20) {
      await new Promise<void>((resolve) => {
        const id = setInterval(() => {
          if (encoder.encodeQueueSize <= 8) {
            clearInterval(id);
            resolve();
          }
        }, 4);
      });
    } else if (i % 8 === 0) {
      await new Promise((r) => setTimeout(r, 0));
    }
  }
  await encoder.flush();
  muxer.finalize();
  return new Blob([muxer.target.buffer], { type: "video/mp4" });
}

async function renderViaRecorder(
  opts: Required<RenderOpts>
): Promise<{ blob: Blob; ext: "mp4" | "webm" }> {
  const { width, height, fps, onProgress } = opts;
  await fontsReady();
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");

  const stream = canvas.captureStream(fps);
  let mime = "video/mp4";
  let ext: "mp4" | "webm" = "mp4";
  if (!MediaRecorder.isTypeSupported(mime)) {
    mime = "video/webm;codecs=vp9";
    ext = "webm";
    if (!MediaRecorder.isTypeSupported(mime)) mime = "video/webm";
  }
  const rec = new MediaRecorder(stream, {
    mimeType: mime,
    videoBitsPerSecond: 12_000_000,
  });
  const chunks: BlobPart[] = [];
  rec.ondataavailable = (e) => {
    if (e.data.size) chunks.push(e.data);
  };
  const stopped = new Promise<void>((res) => (rec.onstop = () => res()));
  rec.start();
  const start = performance.now();
  await new Promise<void>((resolve) => {
    const loop = (now: number) => {
      const t = (now - start) / 1000;
      drawIntroFrame(ctx, Math.min(t, INTRO_DURATION), width, height);
      onProgress?.(Math.min(t / INTRO_DURATION, 1));
      if (t >= INTRO_DURATION) {
        resolve();
        return;
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });
  rec.stop();
  await stopped;
  return { blob: new Blob(chunks, { type: mime.split(";")[0] }), ext };
}

/* True MP4 when WebCodecs is available; otherwise a MediaRecorder fallback
   (which yields .webm on browsers without an MP4 recorder). */
export async function renderIntroVideo(
  opts: RenderOpts = {}
): Promise<{ blob: Blob; ext: "mp4" | "webm" }> {
  const resolved: Required<RenderOpts> = {
    width: opts.width ?? 1920,
    height: opts.height ?? 1080,
    fps: opts.fps ?? 60,
    onProgress: opts.onProgress ?? (() => {}),
  };
  if (typeof VideoEncoder !== "undefined" && typeof VideoFrame !== "undefined") {
    try {
      const blob = await renderViaWebCodecs(resolved);
      return { blob, ext: "mp4" };
    } catch {
      /* fall through to the recorder */
    }
  }
  return renderViaRecorder(resolved);
}
