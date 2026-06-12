"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Compass } from "lucide-react";
import {
  saveQuizResponse,
  type ExerciseFormState,
} from "@/app/actions/exercises";
import { FormError } from "@/components/auth/FormParts";

const initialState: ExerciseFormState = { status: "idle" };

interface QuizQuestion {
  id: string;
  text: string;
  options: { value: string; label: string }[];
}

interface QuizProfile {
  id: string;
  title: string;
  description: string;
}

interface QuizExerciseProps {
  courseId: string;
  lessonId: string;
  exerciseId: string;
  title: string;
  intro: string;
  questions: QuizQuestion[];
  profiles: QuizProfile[];
  saved?: { selections: Record<string, string> };
  interactive: boolean;
}

function leadingProfiles(
  selections: Record<string, string>,
  profiles: QuizProfile[]
): QuizProfile[] {
  const counts = new Map<string, number>();
  for (const value of Object.values(selections)) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  const max = Math.max(0, ...counts.values());
  if (max === 0) return [];
  return profiles.filter((p) => counts.get(p.id) === max);
}

export default function QuizExercise({
  courseId,
  lessonId,
  exerciseId,
  title,
  intro,
  questions,
  profiles,
  saved,
  interactive,
}: QuizExerciseProps) {
  const [state, formAction, isPending] = useActionState(
    saveQuizResponse,
    initialState
  );

  const results = saved ? leadingProfiles(saved.selections, profiles) : [];

  return (
    <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-8 md:p-10">
      <div className="flex items-center gap-3 mb-2">
        <Compass size={18} className="text-sage-dark" />
        <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em]">
          Gentle Self-Reflection
        </p>
      </div>
      <h3 className="font-heading text-2xl font-light text-charcoal mb-3">
        {title}
      </h3>
      <p className="font-body text-sm text-muted leading-relaxed mb-8">{intro}</p>

      {!interactive ? (
        <Link
          href={`/signup?next=${encodeURIComponent(`/learn/${courseId}/${lessonId}`)}`}
          className="inline-flex items-center gap-2 font-body text-sm bg-sage-dark text-cream px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-200"
        >
          Create an Account to Take This Reflection
        </Link>
      ) : (
        <>
          <form action={formAction} className="space-y-8">
            <input type="hidden" name="courseId" value={courseId} />
            <input type="hidden" name="lessonId" value={lessonId} />
            <input type="hidden" name="exerciseId" value={exerciseId} />

            {questions.map((question, qIndex) => (
              <fieldset key={question.id}>
                <legend className="font-body text-sm font-medium text-charcoal mb-4 leading-relaxed">
                  {qIndex + 1}. {question.text}
                </legend>
                <div className="space-y-3">
                  {question.options.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-start gap-3 p-4 rounded-xl border border-grey-light hover:border-sage-light cursor-pointer transition-colors duration-200 has-checked:border-sage has-checked:bg-sage-pale/50"
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option.value}
                        defaultChecked={
                          saved?.selections[question.id] === option.value
                        }
                        required
                        className="mt-1 accent-(--color-sage-dark)"
                      />
                      <span className="font-body text-sm text-muted leading-relaxed">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}

            {state.status === "error" && <FormError message={state.message} />}

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 font-body text-sm bg-sage-dark text-cream px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? "Saving…" : saved ? "Update My Answers" : "See My Reflection"}
            </button>
          </form>

          {results.length > 0 && (
            <div className="mt-10 space-y-4">
              <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em]">
                Your Reflection — held lightly
              </p>
              {results.map((profile) => (
                <div
                  key={profile.id}
                  className="bg-sage-pale border border-sage-light/50 rounded-xl p-6"
                >
                  <h4 className="font-heading text-xl font-medium text-charcoal mb-2">
                    {profile.title}
                  </h4>
                  <p className="font-body text-sm text-muted leading-relaxed">
                    {profile.description}
                  </p>
                </div>
              ))}
              <p className="font-body text-xs text-muted leading-relaxed">
                This is a mirror, not a measurement — most people recognise
                themselves in more than one pattern, and patterns can change.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
