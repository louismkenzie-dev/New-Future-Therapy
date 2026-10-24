"use client";

import { useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { removeVideo } from "@/app/actions/videoLibrary";

/* Two-step delete. A video in use asks for a deliberate tick first, naming
   the lessons it will be removed from. */
export default function DeleteVideoButton({ assetId, usedIn }: { assetId: string; usedIn: string[] }) {
  const [confirming, setConfirming] = useState(false);
  const [understood, setUnderstood] = useState(false);
  const [pending, setPending] = useState(false);
  const inUse = usedIn.length > 0;

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm text-muted px-4 py-2 rounded-full hover:text-red-600 transition-colors duration-200 shrink-0"
      >
        <Trash2 size={15} />
        Delete
      </button>
    );
  }

  return (
    <form
      action={removeVideo}
      onSubmit={() => setPending(true)}
      className="w-full sm:w-72 shrink-0 rounded-xl border border-red-200 bg-white p-4 space-y-3"
    >
      <input type="hidden" name="assetId" value={assetId} />
      <p className="flex items-start gap-2 font-body text-sm text-charcoal leading-relaxed">
        <AlertTriangle size={16} className="text-red-600 shrink-0 mt-0.5" />
        <span>
          {inUse
            ? `This video is in ${usedIn.join(", ")}. Deleting it removes it from the lesson, and members will see “video coming soon” until you upload a replacement.`
            : "This video will be deleted for good."}
        </span>
      </p>
      {inUse && (
        <label className="flex items-start gap-3 font-body text-sm text-charcoal cursor-pointer min-h-[44px]">
          <input
            type="checkbox"
            checked={understood}
            onChange={(e) => setUnderstood(e.target.checked)}
            className="mt-0.5 w-5 h-5 shrink-0 accent-[#3A5A40] cursor-pointer"
          />
          Yes, I want to remove it from the lesson
        </label>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="submit"
          disabled={pending || (inUse && !understood)}
          className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm border border-red-200 text-red-600 px-5 py-2 rounded-full hover:bg-red-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 size={15} />
          {pending ? "Deleting…" : "Delete Video"}
        </button>
        <button
          type="button"
          onClick={() => {
            setConfirming(false);
            setUnderstood(false);
          }}
          className="min-h-[44px] font-body text-sm text-muted px-3 hover:text-charcoal"
        >
          Keep it
        </button>
      </div>
    </form>
  );
}
