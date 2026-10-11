import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";
import { isAdmin } from "@/lib/adminAuth";

/* Retroactively generate English subtitles for a video that was uploaded
   before subtitles were switched on (or added in Mux by hand). Takes a
   playback ID, finds the asset and its audio track, and asks Mux to
   transcribe it. The captions appear in the player once Mux has finished
   (usually a few minutes). */

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<NextResponse> {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  const { playbackId } = (await request.json().catch(() => ({}))) as { playbackId?: string };
  if (!playbackId) return NextResponse.json({ error: "Missing playback ID" }, { status: 400 });
  if (!process.env.MUX_TOKEN_ID || !process.env.MUX_TOKEN_SECRET) {
    return NextResponse.json({ error: "Mux is not configured" }, { status: 500 });
  }

  try {
    const mux = new Mux({ tokenId: process.env.MUX_TOKEN_ID, tokenSecret: process.env.MUX_TOKEN_SECRET });
    const lookup = await mux.video.playbackIds.retrieve(playbackId);
    const asset = await mux.video.assets.retrieve(lookup.object.id);
    const tracks = asset.tracks ?? [];
    const existing = tracks.find((t) => t.type === "text" && t.text_type === "subtitles");
    if (existing) {
      return NextResponse.json({ status: existing.status === "ready" ? "ready" : "preparing" });
    }
    const audio = tracks.find((t) => t.type === "audio");
    if (!audio?.id) return NextResponse.json({ error: "This video has no audio track to transcribe." }, { status: 400 });
    await mux.video.assets.generateSubtitles(asset.id, audio.id, {
      generated_subtitles: [{ language_code: "en", name: "English" }],
    });
    return NextResponse.json({ status: "preparing" });
  } catch (err) {
    console.error("Subtitle generation failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not generate subtitles" },
      { status: 500 }
    );
  }
}
