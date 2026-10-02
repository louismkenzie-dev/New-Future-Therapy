import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";
import { isAdmin } from "@/lib/adminAuth";
import { siteUrl } from "@/lib/siteUrl";

/* Direct video upload for the course editor. The browser PUTs the file
   straight to Mux (so a 700 MB recording never touches our servers); we
   create the upload ticket and then report when the asset is ready. Assets
   are created with the Signed playback policy, which the course player
   requires. Lives under /admin so the team cookie (path=/admin) reaches it. */

export const dynamic = "force-dynamic";

function mux(): Mux {
  if (!process.env.MUX_TOKEN_ID || !process.env.MUX_TOKEN_SECRET) {
    throw new Error("Mux is not configured");
  }
  return new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET,
  });
}

export async function POST(request: Request): Promise<NextResponse> {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  try {
    const origin = request.headers.get("origin") ?? siteUrl();
    const upload = await mux().video.uploads.create({
      cors_origin: origin,
      new_asset_settings: { playback_policies: ["signed"], video_quality: "basic" },
    });
    return NextResponse.json({ uploadId: upload.id, url: upload.url });
  } catch (err) {
    console.error("Mux upload ticket failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not start the upload" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request): Promise<NextResponse> {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    const client = mux();
    const upload = await client.video.uploads.retrieve(id);
    if (upload.status === "errored" || upload.status === "cancelled" || upload.status === "timed_out") {
      return NextResponse.json({ status: "errored" });
    }
    if (!upload.asset_id) return NextResponse.json({ status: "uploading" });

    const asset = await client.video.assets.retrieve(upload.asset_id);
    const playbackId = asset.playback_ids?.find((p) => p.policy === "signed")?.id ?? null;
    return NextResponse.json({
      status: asset.status === "errored" ? "errored" : asset.status === "ready" ? "ready" : "processing",
      playbackId,
      durationSeconds: asset.duration ? Math.round(asset.duration) : 0,
    });
  } catch (err) {
    console.error("Mux upload status failed:", err);
    return NextResponse.json({ status: "errored" });
  }
}
