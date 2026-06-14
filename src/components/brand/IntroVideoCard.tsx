"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Film } from "lucide-react";
import { drawIntroFrame, renderIntroVideo, INTRO_DURATION } from "@/lib/brand/introVideo";
import { fontsReady } from "@/lib/brand/logoEngine";
import { useToast } from "./useToast";

const HOLD = 0.9; // seconds the loop rests on the finished logo before replaying

export default function IntroVideoCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const { notify, toast } = useToast();

  /* Looping live preview — the same draw function the encoder uses. */
  useEffect(() => {
    let raf = 0;
    let start = 0;
    let alive = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };

    const loop = (now: number) => {
      if (!alive) return;
      if (!start) start = now;
      const elapsed = (now - start) / 1000;
      const cycle = INTRO_DURATION + HOLD;
      const t = Math.min(elapsed % cycle, INTRO_DURATION);
      if (!busy) drawIntroFrame(ctx, t, canvas.width, canvas.height);
      raf = requestAnimationFrame(loop);
    };

    fontsReady().then(() => {
      if (!alive) return;
      resize();
      raf = requestAnimationFrame(loop);
    });
    window.addEventListener("resize", resize);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [busy]);

  const download = async () => {
    setBusy(true);
    setProgress(0);
    try {
      const { blob, ext } = await renderIntroVideo({
        onProgress: (p) => setProgress(p),
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `NewFutureTherapy_Intro.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      notify(
        ext === "mp4"
          ? "Downloading intro animation · MP4"
          : "Downloading intro animation · WebM (MP4 not supported by this browser)"
      );
    } catch {
      notify("Sorry — the video could not be generated in this browser");
    } finally {
      setBusy(false);
      setProgress(0);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-grey-light bg-white shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Preview */}
        <div className="border-b border-grey-light md:border-b-0 md:border-r">
          <canvas
            ref={canvasRef}
            className="block aspect-video w-full"
            aria-label="Preview of the NewFuture Therapy intro animation"
          />
        </div>

        {/* Copy + download */}
        <div className="flex flex-col justify-center p-8 md:p-10">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage-pale text-sage-dark">
            <Film size={22} />
          </div>
          <h3 className="mb-2 font-heading text-xl font-medium text-charcoal">
            Animated Intro
          </h3>
          <p className="mb-6 font-body text-sm leading-relaxed text-muted">
            The brand intro as a video — the leaf drawing itself in, the wordmark
            rising, the tagline settling, on the warm cream background. Download it
            to open talks, reels and social posts, or as a loading or title card.
          </p>

          <button
            type="button"
            onClick={download}
            disabled={busy}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-sage-dark bg-sage-dark px-6 py-3 font-body text-sm text-cream transition-colors duration-200 hover:border-charcoal hover:bg-charcoal disabled:opacity-60"
          >
            <Download size={16} />
            {busy ? `Rendering… ${Math.round(progress * 100)}%` : "Download MP4"}
          </button>

          {busy && (
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-sage-pale">
              <div
                className="h-full rounded-full bg-sage-dark transition-[width] duration-150"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          )}

          <p className="mt-4 font-body text-xs text-grey-mid">
            1920 × 1080 · {INTRO_DURATION.toFixed(1)}s · cream background.
            Rendered in your browser.
          </p>
        </div>
      </div>
      {toast}
    </div>
  );
}
