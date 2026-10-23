"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { removeVideo } from "@/app/actions/videoLibrary";

export default function DeleteVideoButton({ assetId }: { assetId: string }) {
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm text-muted px-4 py-2 rounded-full hover:text-red-600 transition-colors duration-200"
      >
        <Trash2 size={15} />
        Delete
      </button>
    );
  }
  return (
    <form action={removeVideo} onSubmit={() => setPending(true)} className="flex flex-wrap items-center gap-2">
      <input type="hidden" name="assetId" value={assetId} />
      <span className="font-body text-sm text-charcoal">Delete for good?</span>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm border border-red-200 text-red-600 px-5 py-2 rounded-full hover:bg-red-50 transition-colors duration-200 disabled:opacity-60"
      >
        <Trash2 size={15} />
        {pending ? "Deleting…" : "Yes, Delete"}
      </button>
      <button type="button" onClick={() => setConfirming(false)} className="min-h-[44px] font-body text-sm text-muted px-3 hover:text-charcoal">
        Keep it
      </button>
    </form>
  );
}
