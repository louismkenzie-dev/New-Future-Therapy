"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { BookmarkPlus, BookmarkCheck } from "lucide-react";
import { setReaction, type ReactionFormState } from "@/app/actions/reactions";
import {
  addPartnerBookmark,
  type PathFormState,
} from "@/app/actions/learningPath";
import { REACTION_META } from "@/components/course/reactionMeta";
import {
  inputClass,
  labelClass,
  FormError,
  FormSuccess,
} from "@/components/auth/FormParts";

const reactionInitial: ReactionFormState = { status: "idle" };
const bookmarkInitial: PathFormState = { status: "idle" };

export interface SharedResponseView {
  responseId: string;
  courseId: string;
  lessonId: string;
  moduleTitle: string;
  lessonTitle: string;
  exerciseTitle: string;
  prompts: string[];
  answers: string[];
  sharedAt: string | null;
  partnerName: string;
  existingReaction?: { reactionType: string; replyText: string | null };
  alreadyBookmarked: boolean;
}

export default function SharedResponseCard({
  response,
}: {
  response: SharedResponseView;
}) {
  const [reactionState, reactionAction, reactionPending] = useActionState(
    setReaction,
    reactionInitial
  );
  const [bookmarkState, bookmarkAction, bookmarkPending] = useActionState(
    addPartnerBookmark,
    bookmarkInitial
  );
  const [selectedType, setSelectedType] = useState(
    response.existingReaction?.reactionType ?? ""
  );
  const [bookmarkOpen, setBookmarkOpen] = useState(false);

  const bookmarked =
    response.alreadyBookmarked || bookmarkState.status === "success";

  return (
    <article className="bg-white rounded-2xl border border-grey-light shadow-sm p-8 md:p-10">
      <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-2">
        {response.moduleTitle}
      </p>
      <h3 className="font-heading text-2xl font-light text-charcoal">
        {response.exerciseTitle}
      </h3>
      <p className="font-body text-sm text-muted mt-1">
        Shared by {response.partnerName}
        {response.sharedAt &&
          ` · ${new Date(response.sharedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}`}
        {" · from "}
        <Link
          href={`/learn/${response.courseId}/${response.lessonId}`}
          className="text-sage-dark underline underline-offset-4 hover:text-charcoal transition-colors duration-200"
        >
          {response.lessonTitle}
        </Link>
      </p>

      <div className="bg-sage-pale/60 border border-sage-light/50 rounded-xl p-6 mt-6 space-y-5">
        {response.prompts.map((prompt, i) => {
          const answer = response.answers[i];
          if (!answer) return null;
          return (
            <div key={prompt}>
              <p className="font-body text-xs text-sage-dark uppercase tracking-widest mb-2">
                {prompt}
              </p>
              <p className="font-body text-base text-charcoal leading-relaxed">
                {answer}
              </p>
            </div>
          );
        })}
      </div>

      {/* Reaction bar */}
      <form action={reactionAction} className="mt-8">
        <input type="hidden" name="responseId" value={response.responseId} />
        <input type="hidden" name="reactionType" value={selectedType} />
        <p className={labelClass}>Respond gently</p>
        <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Reactions">
          {Object.entries(REACTION_META).map(([type, meta]) => {
            const Icon = meta.icon;
            const selected = selectedType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                aria-pressed={selected}
                className={`inline-flex items-center gap-2 font-body text-sm px-4 py-2.5 rounded-full border transition-colors duration-200 ${
                  selected
                    ? "bg-sage-pale border-sage-light text-sage-dark"
                    : "border-grey-light text-muted hover:border-sage-light hover:text-sage-dark"
                }`}
              >
                <Icon size={15} />
                {meta.label}
              </button>
            );
          })}
        </div>

        <label htmlFor={`reply-${response.responseId}`} className={labelClass}>
          A few words back (optional)
        </label>
        <textarea
          id={`reply-${response.responseId}`}
          name="replyText"
          rows={2}
          defaultValue={response.existingReaction?.replyText ?? ""}
          placeholder="Thank you for letting me see this…"
          className={`${inputClass} resize-y min-h-16 mb-4`}
        />

        {reactionState.status === "error" && (
          <div className="mb-4">
            <FormError message={reactionState.message} />
          </div>
        )}
        {reactionState.status === "success" && (
          <div className="mb-4">
            <FormSuccess message={reactionState.message} />
          </div>
        )}

        <button
          type="submit"
          disabled={reactionPending || !selectedType}
          className="inline-flex items-center gap-2 font-body text-sm bg-sage-dark text-cream px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {reactionPending
            ? "Sending…"
            : response.existingReaction
              ? "Update My Response"
              : "Send My Response"}
        </button>
      </form>

      {/* Add to learning path */}
      <div className="mt-8 border-t border-grey-light pt-6">
        {bookmarked ? (
          <p className="inline-flex items-center gap-2 font-body text-sm text-sage-dark">
            <BookmarkCheck size={16} />
            Saved to your learning path
          </p>
        ) : bookmarkOpen ? (
          <form action={bookmarkAction} className="space-y-4">
            <input
              type="hidden"
              name="sourceResponseId"
              value={response.responseId}
            />
            <input type="hidden" name="courseId" value={response.courseId} />
            <input type="hidden" name="lessonId" value={response.lessonId} />
            <div>
              <label
                htmlFor={`bookmark-note-${response.responseId}`}
                className={labelClass}
              >
                What would you like to remember about this?
              </label>
              <textarea
                id={`bookmark-note-${response.responseId}`}
                name="note"
                rows={2}
                className={`${inputClass} resize-y min-h-16`}
              />
            </div>
            {bookmarkState.status === "error" && (
              <FormError message={bookmarkState.message} />
            )}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={bookmarkPending}
                className="inline-flex items-center gap-2 font-body text-sm bg-sage-dark text-cream px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-200 disabled:opacity-60"
              >
                <BookmarkPlus size={15} />
                {bookmarkPending ? "Saving…" : "Save to My Path"}
              </button>
              <button
                type="button"
                onClick={() => setBookmarkOpen(false)}
                className="font-body text-sm text-muted px-4 py-3 hover:text-charcoal transition-colors duration-200"
              >
                Not now
              </button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setBookmarkOpen(true)}
            className="inline-flex items-center gap-2 font-body text-sm border border-grey-light text-charcoal px-6 py-3 rounded-full hover:border-sage-light hover:text-sage-dark transition-colors duration-200"
          >
            <BookmarkPlus size={16} />
            Add to My Learning Path
          </button>
        )}
      </div>
    </article>
  );
}
