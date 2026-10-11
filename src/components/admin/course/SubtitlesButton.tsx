"use client";

import { useState } from "react";
import { Captions, CheckCircle2 } from "lucide-react";
import { FormError } from "@/components/auth/FormParts";
import { secondaryButton } from "./formStyles";

/* Asks Mux to transcribe an already-uploaded video. New uploads get
   subtitles automatically; this is for videos attached before that. */
export default function SubtitlesButton({ playbackId }: { playbackId: string }) {
  const [state, setState] = useState<"idle" | "busy" | "ready" | "preparing" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function run() {
    setState("busy");
    setError(null);
    try {
      const res = await fetch("/admin/api/video/subtitles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playbackId }),
      });
      const data = (await res.json()) as { status?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Could not generate subtitles.");
      setState(data.status === "ready" ? "ready" : "preparing");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "ready") {
    return (
      <p className="inline-flex items-center gap-2 font-body text-sm text-sage-dark">
        <CheckCircle2 size={16} /> Subtitles are ready for this video.
      </p>
    );
  }
  if (state === "preparing") {
    return (
      <p className="inline-flex items-center gap-2 font-body text-sm text-sage-dark">
        <CheckCircle2 size={16} /> Subtitles are being written — they will appear in the player in a few minutes.
      </p>
    );
  }
  return (
    <div className="space-y-2">
      <button type="button" onClick={run} disabled={state === "busy"} className={secondaryButton}>
        <Captions size={16} />
        {state === "busy" ? "Asking for subtitles…" : "Generate Subtitles for This Video"}
      </button>
      <p className="font-body text-xs text-muted">
        Videos uploaded from now on get subtitles automatically. Use this for videos attached earlier.
      </p>
      {error && <FormError message={error} />}
    </div>
  );
}
