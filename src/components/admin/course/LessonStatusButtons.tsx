"use client";

import { useState } from "react";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { removeLesson, setLessonStatus } from "@/app/actions/courseEditor";
import { primaryButton, secondaryButton } from "./formStyles";

export default function LessonStatusButtons({
  lessonId,
  status,
  replacesBuiltIn,
}: {
  lessonId: string;
  status: "draft" | "published";
  replacesBuiltIn: boolean;
}) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <form action={setLessonStatus}>
        <input type="hidden" name="lessonId" value={lessonId} />
        <input type="hidden" name="status" value={status === "published" ? "draft" : "published"} />
        <button type="submit" className={status === "published" ? secondaryButton : primaryButton}>
          {status === "published" ? <EyeOff size={16} /> : <Eye size={16} />}
          {status === "published" ? "Unpublish (hide from members)" : "Publish to Members"}
        </button>
      </form>

      {confirming ? (
        <form action={removeLesson} className="flex flex-wrap items-center gap-3">
          <input type="hidden" name="lessonId" value={lessonId} />
          <span className="font-body text-sm text-charcoal">
            {replacesBuiltIn
              ? "Delete your edited version and go back to the built-in lesson?"
              : "Delete this lesson? Members’ saved answers for it are kept but will no longer be shown."}
          </span>
          <button type="submit" className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm border border-red-200 text-red-600 px-6 py-3 rounded-full hover:bg-red-50 transition-colors duration-200">
            <Trash2 size={15} />
            Yes, Delete
          </button>
          <button type="button" onClick={() => setConfirming(false)} className="font-body text-sm text-muted px-3 py-3 hover:text-charcoal">
            Keep it
          </button>
        </form>
      ) : (
        <button type="button" onClick={() => setConfirming(true)} className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm text-muted px-4 py-3 rounded-full hover:text-red-600 transition-colors duration-200">
          <Trash2 size={15} />
          {replacesBuiltIn ? "Revert to Built-In" : "Delete Lesson"}
        </button>
      )}
    </div>
  );
}
