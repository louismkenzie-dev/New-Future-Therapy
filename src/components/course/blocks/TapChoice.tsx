"use client";

import { useActionState, useState } from "react";
import { Sparkles } from "lucide-react";
import { saveQuizResponse, type ExerciseFormState } from "@/app/actions/exercises";
import BlockHeading from "./BlockHeading";

/* One tap, one gentle response. Nothing is scored; the choice is saved so
   it is there when the member returns. */

const initialState: ExerciseFormState = { status: "idle" };

interface Question {
  id: string;
  text: string;
  options: { value: string; label: string; response: string }[];
}

export default function TapChoice({
  courseId,
  lessonId,
  exerciseId,
  title,
  intro,
  questions,
  saved,
  interactive,
}: {
  courseId: string;
  lessonId: string;
  exerciseId: string;
  title: string;
  intro?: string;
  questions: Question[];
  saved?: Record<string, string>;
  interactive: boolean;
}) {
  const [, formAction] = useActionState(saveQuizResponse, initialState);
  const [chosen, setChosen] = useState<Record<string, string>>(saved ?? {});

  return (
    <div className="bg-sage-pale rounded-2xl border border-sage-light/50 p-5 sm:p-5 sm:p-8 md:p-10">
      <p className="inline-flex items-center gap-2 font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">
        <Sparkles size={14} />
        A Moment to Notice
      </p>
      <BlockHeading heading={title} intro={intro} />

      <form action={formAction} className="space-y-10">
        <input type="hidden" name="courseId" value={courseId} />
        <input type="hidden" name="lessonId" value={lessonId} />
        <input type="hidden" name="exerciseId" value={exerciseId} />

        {questions.map((question) => {
          const current = chosen[question.id];
          const selected = question.options.find((o) => o.value === current);
          return (
            <fieldset key={question.id}>
              <legend className="font-body text-lg font-medium text-charcoal leading-snug mb-5">
                {question.text}
              </legend>
              <div className="flex flex-wrap gap-2.5">
                {question.options.map((option) => {
                  const active = current === option.value;
                  return (
                    <button
                      key={option.value}
                      type={interactive ? "submit" : "button"}
                      name={`question-${question.id}`}
                      value={option.value}
                      onClick={() =>
                        setChosen((prev) => ({ ...prev, [question.id]: option.value }))
                      }
                      aria-pressed={active}
                      className={`font-body text-sm rounded-full px-5 py-3 min-h-[44px] border transition-colors duration-200 ${
                        active
                          ? "bg-sage-dark text-cream border-sage-dark"
                          : "bg-white text-charcoal border-grey-light hover:border-sage-light hover:text-sage-dark"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
              {selected && (
                <div className="mt-6 bg-white rounded-xl border border-sage-light/60 p-6">
                  <p className="font-heading text-xl md:text-2xl font-light text-charcoal leading-snug">
                    {selected.response}
                  </p>
                </div>
              )}
            </fieldset>
          );
        })}
      </form>
    </div>
  );
}
