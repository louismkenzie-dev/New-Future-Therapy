"use client";

import { useEffect, useRef, useState } from "react";
import type MuxPlayerElement from "@mux/mux-player";

/* Word-by-word captions. Reads the video's subtitle track (Mux's
   auto-generated English track) and, instead of showing each cue as a
   block of text, lights the cue's words up one at a time as they are
   spoken — the timing is spread evenly across the cue, which tracks
   natural speech closely enough to feel live.

   The native caption rendering is kept hidden so nothing doubles up. */

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

  // Attach to the subtitle track once the player has loaded its manifest.
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const attach = () => {
      const track = pickTrack(player);
      if (!track || trackRef.current === track) return;
      trackRef.current = track;
      track.mode = "hidden";
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

  // Keep the native rendering off while ours is on.
  useEffect(() => {
    const track = trackRef.current;
    if (track) track.mode = enabled ? "hidden" : "showing";
  }, [enabled, available]);

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

  if (!enabled || !cue) return null;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-14 sm:bottom-16 flex justify-center px-4"
      aria-live="off"
    >
      <p className="max-w-[92%] text-center font-body text-base sm:text-xl leading-snug text-cream/45 bg-charcoal/70 backdrop-blur-sm rounded-2xl px-4 py-2.5 text-balance">
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
