import "server-only";
import Mux from "@mux/mux-node";

/* Signed Mux playback tokens — generated server-side only, short-lived.
   Course videos use the signed playback policy, so a leaked URL is useless
   without a fresh token. */

let singleton: Mux | null = null;

function mux(): Mux {
  if (!singleton) {
    singleton = new Mux({
      tokenId: process.env.MUX_TOKEN_ID,
      tokenSecret: process.env.MUX_TOKEN_SECRET,
      jwtSigningKey:
        process.env.MUX_SIGNING_KEY_ID ?? process.env.MUX_SIGNING_KEY,
      jwtPrivateKey:
        process.env.MUX_SIGNING_KEY_PRIVATE_KEY ?? process.env.MUX_PRIVATE_KEY,
    });
  }
  return singleton;
}

export interface PlaybackTokens {
  playback?: string;
  thumbnail?: string;
  storyboard?: string;
}

function signingConfigured(): boolean {
  return Boolean(
    (process.env.MUX_SIGNING_KEY_ID ?? process.env.MUX_SIGNING_KEY) &&
      (process.env.MUX_SIGNING_KEY_PRIVATE_KEY ?? process.env.MUX_PRIVATE_KEY)
  );
}

export async function getPlaybackTokens(
  playbackId: string
): Promise<PlaybackTokens> {
  if (!playbackId || !signingConfigured()) return {};
  try {
    const tokens = await mux().jwt.signPlaybackId(playbackId, {
      type: ["video", "thumbnail", "storyboard"],
      expiration: "6h",
    });
    return {
      playback: tokens["playback-token"],
      thumbnail: tokens["thumbnail-token"],
      storyboard: tokens["storyboard-token"],
    };
  } catch (error) {
    console.error("Mux token signing failed:", error);
    return {};
  }
}
