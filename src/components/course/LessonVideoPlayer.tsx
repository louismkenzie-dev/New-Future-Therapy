"use client";

import { useRef, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import type MuxPlayerElement from "@mux/mux-player";
import { PlayCircle, Headphones, Captions, CaptionsOff } from "lucide-react";
import WordCaptions from "@/components/course/WordCaptions";
import type { PlaybackTokens } from "@/lib/mux";
import { useAnalyticsConsent } from "@/lib/consent";
import {
  saveVideoPosition,
  markLessonCompleteFromPlayer,
} from "@/app/actions/progress";

const SAVE_INTERVAL_SECONDS = 15;

interface LessonVideoPlayerProps {
  playbackId: string;
  tokens: PlaybackTokens;
  title: string;
  courseId: string;
  lessonId: string;
  startTime?: number;
  /** Only signed-in members get their position saved. */
  canTrack: boolean;
  audioOnly?: boolean;
}

export default function LessonVideoPlayer({
  playbackId,
  tokens,
  title,
  courseId,
  lessonId,
  startTime,
  canTrack,
  audioOnly = false,
}: LessonVideoPlayerProps) {
  const lastSavedRef = useRef(0);
  const playerRef = useRef<MuxPlayerElement | null>(null);
  const [captionsOn, setCaptionsOn] = useState(true);
  const analyticsAllowed = useAnalyticsConsent();

  if (!playbackId) {
    return (
      <div
        className={`rounded-2xl border border-grey-light bg-sage-pale flex flex-col items-center justify-center gap-3 text-sage-dark ${
          audioOnly ? "py-10" : "aspect-video"
        }`}
      >
        {audioOnly ? (
          <Headphones size={40} strokeWidth={1.5} />
        ) : (
          <PlayCircle size={48} strokeWidth={1.5} />
        )}
        <p className="font-body text-sm text-center px-6">
          {audioOnly
            ? "This audio practice is being recorded — it will appear here soon."
            : "This video is being prepared for the programme — it will appear here soon."}
        </p>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-grey-light shadow-sm bg-charcoal">
      <MuxPlayer
        ref={playerRef}
        playbackId={playbackId}
        defaultHiddenCaptions
        tokens={tokens}
        streamType="on-demand"
        audio={audioOnly}
        startTime={startTime && startTime > 5 ? startTime : undefined}
        accentColor="#6B8C6F"
        envKey={analyticsAllowed ? process.env.NEXT_PUBLIC_MUX_DATA_ENV_KEY : undefined}
        metadata={{
          video_id: `${courseId}/${lessonId}`,
          video_title: title,
          video_series: courseId,
          player_name: "NewFuture Course Player",
        }}
        onTimeUpdate={(event) => {
          if (!canTrack) return;
          const player = event.currentTarget as HTMLVideoElement | null;
          const time = player?.currentTime ?? 0;
          if (Math.abs(time - lastSavedRef.current) >= SAVE_INTERVAL_SECONDS) {
            lastSavedRef.current = time;
            void saveVideoPosition(courseId, lessonId, time);
          }
        }}
        onEnded={() => {
          if (!canTrack) return;
          void markLessonCompleteFromPlayer(courseId, lessonId);
        }}
        style={{
          aspectRatio: audioOnly ? undefined : "16 / 9",
          width: "100%",
          /* Our word-by-word captions replace the player's own. */
          ["--captions-button" as string]: "none",
        }}
      />
      {!audioOnly && (
        <>
          <WordCaptions playerRef={playerRef} enabled={captionsOn} />
          <button
            type="button"
            onClick={() => setCaptionsOn((v) => !v)}
            aria-pressed={captionsOn}
            aria-label={captionsOn ? "Hide subtitles" : "Show subtitles"}
            className="absolute top-3 right-3 inline-flex items-center justify-center w-11 h-11 rounded-full bg-charcoal/60 text-cream/90 hover:bg-charcoal/80 transition-colors duration-200"
          >
            {captionsOn ? <Captions size={18} /> : <CaptionsOff size={18} />}
          </button>
        </>
      )}
    </div>
  );
}
