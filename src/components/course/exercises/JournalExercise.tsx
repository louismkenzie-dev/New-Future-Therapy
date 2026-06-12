"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Heart, Lock, PenLine, Users } from "lucide-react";
import {
  saveJournalResponse,
  toggleResponseShare,
  type ExerciseFormState,
} from "@/app/actions/exercises";
import {
  inputClass,
  labelClass,
  FormError,
  FormSuccess,
} from "@/components/auth/FormParts";
import { REACTION_META } from "@/components/course/reactionMeta";

const initialState: ExerciseFormState = { status: "idle" };

export interface ReceivedReaction {
  reactionType: string;
  replyText: string | null;
  reactorName: string;
}

interface JournalExerciseProps {
  courseId: string;
  lessonId: string;
  exerciseId: string;
  kind: "journal" | "sharedJournal";
  title: string;
  intro?: string;
  prompts: string[];
  saved?: {
    responseId: string;
    answers: string[];
    isShared: boolean;
  };
  /** Active partner's name, when linked — enables the share toggle. */
  partnerName?: string | null;
  /** false on the free preview for signed-out visitors. */
  interactive: boolean;
  reactions?: ReceivedReaction[];
}

export default function JournalExercise({
  courseId,
  lessonId,
  exerciseId,
  kind,
  title,
  intro,
  prompts,
  saved,
  partnerName,
  interactive,
  reactions = [],
}: JournalExerciseProps) {
  const [state, formAction, isPending] = useActionState(
    saveJournalResponse,
    initialState
  );

  return (
    <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-8 md:p-10">
      <div className="flex items-center gap-3 mb-2">
        <PenLine size={18} className="text-sage-dark" />
        <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em]">
          {kind === "sharedJournal" ? "Reflection · Shareable" : "Private Reflection"}
        </p>
      </div>
      <h3 className="font-heading text-2xl font-light text-charcoal mb-3">
        {title}
      </h3>
      {intro && (
        <p className="font-body text-sm text-muted leading-relaxed mb-6">
          {intro}
        </p>
      )}

      {!interactive ? (
        <div>
          <ul className="space-y-4 mb-8">
            {prompts.map((prompt) => (
              <li
                key={prompt}
                className="font-body text-sm text-muted leading-relaxed border-l-2 border-sage-light pl-4"
              >
                {prompt}
              </li>
            ))}
          </ul>
          <Link
            href={`/signup?next=${encodeURIComponent(`/learn/${courseId}/${lessonId}`)}`}
            className="inline-flex items-center gap-2 font-body text-sm bg-sage-dark text-cream px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-200"
          >
            Create an Account to Save Your Reflections
          </Link>
        </div>
      ) : (
        <>
          <form action={formAction} className="space-y-6">
            <input type="hidden" name="courseId" value={courseId} />
            <input type="hidden" name="lessonId" value={lessonId} />
            <input type="hidden" name="exerciseId" value={exerciseId} />
            {prompts.map((prompt, i) => (
              <div key={prompt}>
                <label htmlFor={`${exerciseId}-${i}`} className={labelClass}>
                  {prompt}
                </label>
                <textarea
                  id={`${exerciseId}-${i}`}
                  name={`answer-${i}`}
                  rows={4}
                  defaultValue={saved?.answers[i] ?? ""}
                  className={`${inputClass} resize-y min-h-24`}
                />
              </div>
            ))}

            {state.status === "error" && <FormError message={state.message} />}
            {state.status === "success" && (
              <FormSuccess message={state.message} />
            )}

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 font-body text-sm bg-sage-dark text-cream px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending
                ? "Saving…"
                : saved
                  ? "Update Reflection"
                  : "Save Reflection"}
            </button>
          </form>

          {kind === "sharedJournal" && saved && (
            <div className="mt-8 border-t border-grey-light pt-6">
              {partnerName ? (
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <p className="flex items-center gap-2 font-body text-sm text-muted flex-1">
                    {saved.isShared ? (
                      <>
                        <Users size={16} className="text-sage-dark" />
                        Shared with {partnerName}
                      </>
                    ) : (
                      <>
                        <Lock size={16} className="text-sage-dark" />
                        Private to you
                      </>
                    )}
                  </p>
                  <form action={toggleResponseShare}>
                    <input type="hidden" name="responseId" value={saved.responseId} />
                    <input type="hidden" name="courseId" value={courseId} />
                    <input type="hidden" name="lessonId" value={lessonId} />
                    <input
                      type="hidden"
                      name="share"
                      value={saved.isShared ? "false" : "true"}
                    />
                    <button
                      type="submit"
                      className="font-body text-sm border border-grey-light text-charcoal px-5 py-2.5 rounded-full hover:border-sage-light hover:text-sage-dark transition-colors duration-200"
                    >
                      {saved.isShared
                        ? `Stop Sharing With ${partnerName}`
                        : `Share With ${partnerName}`}
                    </button>
                  </form>
                </div>
              ) : (
                <p className="flex items-center gap-2 font-body text-xs text-muted leading-relaxed">
                  <Lock size={14} className="text-sage-dark shrink-0" />
                  This reflection stays private to you. Sharing becomes
                  available when you link accounts with a partner on the Joint
                  Couples plan.
                </p>
              )}
              {partnerName && (
                <p className="font-body text-xs text-muted leading-relaxed mt-3">
                  Sharing is always your choice. You can change your mind at any
                  time, and your words will no longer be visible to your
                  partner.
                </p>
              )}
            </div>
          )}

          {reactions.length > 0 && (
            <div className="mt-6 space-y-3">
              {reactions.map((reaction) => {
                const meta = REACTION_META[reaction.reactionType];
                const Icon = meta?.icon ?? Heart;
                return (
                  <div
                    key={`${reaction.reactorName}-${reaction.reactionType}`}
                    className="bg-sage-pale/60 border border-sage-light/50 rounded-xl p-4"
                  >
                    <p className="flex items-center gap-2 font-body text-sm text-sage-dark">
                      <Icon size={15} />
                      {reaction.reactorName} responded: {meta?.label ?? "…"}
                    </p>
                    {reaction.replyText && (
                      <p className="font-body text-sm text-muted leading-relaxed mt-2">
                        &ldquo;{reaction.replyText}&rdquo;
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
