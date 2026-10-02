"use client";

import { useRef, useState } from "react";
import { CheckCircle2, FileVideo, Upload } from "lucide-react";
import { FormError } from "@/components/auth/FormParts";
import { secondaryButton } from "./formStyles";

/* Upload a recording straight from the browser to Mux. Reports progress,
   waits for Mux to finish processing, then hands back the Signed playback
   ID and duration for the video section. */

type Phase = "idle" | "starting" | "uploading" | "processing" | "done" | "error";

export default function VideoUploader({
  onReady,
}: {
  onReady: (result: { playbackId: string; durationSeconds: number }) => void;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [percent, setPercent] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError(null);
    setFileName(file.name);
    setPhase("starting");
    try {
      const ticket = await fetch("/admin/api/video", { method: "POST" });
      if (!ticket.ok) throw new Error((await ticket.json()).error ?? "Could not start the upload.");
      const { uploadId, url } = (await ticket.json()) as { uploadId: string; url: string };

      setPhase("uploading");
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", url, true);
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) setPercent(Math.round((e.loaded / e.total) * 100));
        };
        xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error("The upload was refused. Please try again.")));
        xhr.onerror = () => reject(new Error("The upload was interrupted. Check your connection and try again."));
        xhr.send(file);
      });

      setPhase("processing");
      for (let attempt = 0; attempt < 240; attempt++) {
        await new Promise((r) => setTimeout(r, 5000));
        const res = await fetch(`/admin/api/video?id=${encodeURIComponent(uploadId)}`);
        const data = (await res.json()) as { status: string; playbackId?: string | null; durationSeconds?: number };
        if (data.status === "errored") throw new Error("Mux could not process that file. Please check it plays on your computer and try again.");
        if (data.status === "ready" && data.playbackId) {
          onReady({ playbackId: data.playbackId, durationSeconds: data.durationSeconds ?? 0 });
          setPhase("done");
          return;
        }
      }
      throw new Error("Processing is taking longer than expected. Please refresh in a few minutes — the video may still appear.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setPhase("error");
    }
  }

  const busy = phase === "starting" || phase === "uploading" || phase === "processing";

  return (
    <div className="rounded-xl border border-dashed border-sage-light bg-sage-pale/50 p-5">
      <input
        ref={inputRef}
        type="file"
        accept="video/*,.mov,.mp4,.m4v"
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
          e.target.value = "";
        }}
      />
      {phase === "idle" || phase === "error" ? (
        <div className="space-y-3">
          <button type="button" onClick={() => inputRef.current?.click()} className={secondaryButton}>
            <Upload size={16} />
            Upload a Video From Your Computer
          </button>
          <p className="font-body text-xs text-muted">
            MP4 or MOV straight from your phone or camera. Large files are fine — it uploads directly
            to the video service and can take a few minutes. Keep this page open.
          </p>
          {error && <FormError message={error} />}
        </div>
      ) : phase === "done" ? (
        <p className="inline-flex items-center gap-2 font-body text-sm text-sage-dark">
          <CheckCircle2 size={16} />
          {fileName} is ready — press <strong>Save Sections</strong> below to keep it.
        </p>
      ) : (
        <div className="space-y-3">
          <p className="inline-flex items-center gap-2 font-body text-sm text-charcoal">
            <FileVideo size={16} className="text-sage-dark" />
            {fileName}
          </p>
          <div className="h-2 rounded-full bg-white overflow-hidden" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full bg-sage rounded-full transition-all duration-500" style={{ width: `${phase === "processing" ? 100 : percent}%` }} />
          </div>
          <p className="font-body text-xs text-muted">
            {phase === "starting" && "Starting…"}
            {phase === "uploading" && `Uploading… ${percent}%`}
            {phase === "processing" && "Uploaded. The video service is now preparing it for playback — usually a minute or two."}
          </p>
          {busy && <p className="font-body text-xs text-muted">Please keep this page open.</p>}
        </div>
      )}
    </div>
  );
}
