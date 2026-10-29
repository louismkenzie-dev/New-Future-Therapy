"use client";

import { useEffect, useRef, useState } from "react";
import type MuxPlayerElement from "@mux/mux-player";

/* Word-by-word captions. Reads the video's subtitle track (Mux's
   auto-generated English track) and, instead of showing each cue as a
   block of text, lights the cue's words up one at a time as they are
   spoken — the timing is spread evenly across the cue, which tracks
   natural speech closely enough to feel live.

   The native caption rendering is kept hidden so nothing doubles up. On
   desktop Chrome, Edge and Firefox the player streams through hls.js, and
   Mux's playback core only loads a subtitle track's cues once that track
   is set to "showing" — so the track is shown for a moment to select it,
   then hidden. Full screen moves the picture outside this overlay, so
   there the browser's own captions take over.

   Sized small and sat at the very bottom of the frame so they never cover
   faces; they lift just clear of the control bar only while the controls
   are showing (media-chrome's userinactivechange event). */

interface Cue {
  start: number;
  end: number;
  words: string[];
}

function pickTrack(player: MuxPlayerElement): TextTrack | null {
  const list = player.textTracks;
  if (!list) return null;
  let best: TextTrack | null = null;
  for (let i = 0; i < list.length; i++) {
    const t = list[i];
    if (t.kind !== "subtitles" && t.kind !== "captions") continue;
    if (!best || t.language.startsWith("en")) best = t;
  }
  return best;
}

export default function WordCaptions({
  playerRef,
  enabled,
}: {
  playerRef: React.RefObject<MuxPlayerElement | null>;
  enabled: boolean;
}) {
  const [cue, setCue] = useState<Cue | null>(null);
  const [wordIndex, setWordIndex] = useState(-1);
  const [available, setAvailable] = useState(false);
  const trackRef = useRef<TextTrack | null>(null);
  const [controlsShowing, setControlsShowing] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    const onFullscreen = () => {
      const el = document.fullscreenElement;
      setFullscreen(Boolean(el && (el === player || el.contains(player))));
    };
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => document.removeEventListener("fullscreenchange", onFullscreen);
  }, [playerRef]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    const onChange = (e: Event) => setControlsShowing(!(e as CustomEvent<boolean>).detail);
    player.addEventListener("userinactivechange", onChange);
    return () => player.removeEventListener("userinactivechange", onChange);
  }, [playerRef]);

  // Attach to the subtitle track once the player has loaded its manifest.
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const attach = () => {
      const track = pickTrack(player);
      if (!track || trackRef.current === track) return;
      trackRef.current = track;
      setAvailable(true);
      const onCueChange = () => {
        const active = track.activeCues?.[0] as VTTCue | undefined;
        if (!active) {
          setCue(null);
          return;
        }
        const text = active.text.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
        setCue({ start: active.startTime, end: active.endTime, words: text.split(" ").filter(Boolean) });
      };
      track.addEventListener("cuechange", onCueChange);
    };

    attach();
    const tracks = player.textTracks;
    tracks?.addEventListener("addtrack", attach);
    player.addEventListener("loadedmetadata", attach);
    return () => {
      tracks?.removeEventListener("addtrack", attach);
      player.removeEventListener("loadedmetadata", attach);
    };
  }, [playerRef]);

  // Off: no captions at all. Full screen: the browser draws them. Otherwise
  // select the track (so its cues load) and keep the native drawing hidden.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (!enabled) {
      track.mode = "disabled";
      return;
    }
    track.mode = "showing";
    if (fullscreen) return;
    const timer = window.setTimeout(() => {
      track.mode = "hidden";
    }, 0);
    return () => window.clearTimeout(timer);
  }, [enabled, available, fullscreen]);

  // Advance the highlighted word with the playhead.
  useEffect(() => {
    if (!cue || !enabled) return;
    const player = playerRef.current;
    if (!player) return;
    let raf = 0;
    const tick = () => {
      const t = player.currentTime;
      const span = Math.max(0.2, cue.end - cue.start);
      const idx = Math.min(cue.words.length - 1, Math.floor(((t - cue.start) / span) * cue.words.length));
      setWordIndex(idx);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [cue, enabled, playerRef]);

  if (!enabled || !cue || fullscreen) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 flex justify-center px-3 transition-[bottom] duration-300 ${
        controlsShowing ? "bottom-11 sm:bottom-14" : "bottom-1.5 sm:bottom-3"
      }`}
      aria-live="off"
    >
      <p className="max-w-[90%] text-center font-body text-[11px] sm:text-sm md:text-base leading-snug text-cream/45 bg-charcoal/65 rounded-lg sm:rounded-xl px-2 py-0.5 sm:px-3 sm:py-1.5 text-balance">
        {cue.words.map((word, i) => (
          <span
            key={`${cue.start}-${i}`}
            className={`transition-colors duration-150 ${i <= wordIndex ? "text-cream" : ""} ${
              i === wordIndex ? "text-sage-light" : ""
            }`}
          >
            {word}
            {i < cue.words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
    </div>
  );
}
