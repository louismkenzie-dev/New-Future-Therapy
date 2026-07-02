"use client";

import MuxPlayer from "@mux/mux-player-react";
import { useAnalyticsConsent } from "@/lib/consent";

/* Public-policy trailer on the course sales page — no signing needed.
   Mux Data analytics only attaches with cookie consent. */
export default function TrailerPlayer({
  playbackId,
  title,
}: {
  playbackId: string;
  title: string;
}) {
  const analyticsAllowed = useAnalyticsConsent();

  return (
    <div className="rounded-2xl overflow-hidden border border-grey-light shadow-sm bg-charcoal">
      <MuxPlayer
        playbackId={playbackId}
        streamType="on-demand"
        accentColor="#6B8C6F"
        envKey={analyticsAllowed ? process.env.NEXT_PUBLIC_MUX_DATA_ENV_KEY : undefined}
        metadata={{
          video_id: `trailer/${playbackId}`,
          video_title: title,
          player_name: "NewFuture Course Player",
        }}
        style={{ aspectRatio: "16 / 9", width: "100%" }}
      />
    </div>
  );
}
