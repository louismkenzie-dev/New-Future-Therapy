"use client";

import { useActionState } from "react";
import Link from "next/link";
import { CalendarHeart } from "lucide-react";
import {
  saveCheckinResponse,
  type ExerciseFormState,
} from "@/app/actions/exercises";
import {
  inputClass,
  labelClass,
  FormError,
  FormSuccess,
} from "@/components/auth/FormParts";

const initialState: ExerciseFormState = { status: "idle" };

interface CheckinField {
  id: string;
  label: string;
  type: "scale" | "text" | "choices";
  options?: string[];
}

interface CheckinExerciseProps {
  courseId: string;
  lessonId: string;
  exerciseId: string;
  title: string;
  intro?: string;
  fields: CheckinField[];
  cadence?: "once" | "weekly" | "monthly";
  saved?: {
    scales: Record<string, number>;
    texts: Record<string, string>;
    choices: Record<string, string[]>;
  };
  /** Earlier answers shown alongside (the Module 10 then-and-now). */
  compare?: {
    label: string;
    scales: Record<string, number>;
  };
  interactive: boolean;
}

export default function CheckinExercise({
  courseId,
  lessonId,
  exerciseId,
  title,
  intro,
  fields,
  cadence,
  saved,
  compare,
  interactive,
}: CheckinExerciseProps) {
  const [state, formAction, isPending] = useActionState(
    saveCheckinResponse,
    initialState
  );

  return (
    <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-8 md:p-10">
      <div className="flex items-center gap-3 mb-2">
        <CalendarHeart size={18} className="text-sage-dark" />
        <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em]">
          Check-In
          {cadence === "weekly" && " · A Weekly Practice"}
          {cadence === "monthly" && " · A Monthly Practice"}
        </p>
      </div>
      <h3 className="font-heading text-2xl font-light text-charcoal mb-3">
        {title}
      </h3>
      {intro && (
        <p className="font-body text-sm text-muted leading-relaxed mb-8">
          {intro}
        </p>
      )}

      {!interactive ? (
        <Link
          href={`/signup?next=${encodeURIComponent(`/learn/${courseId}/${lessonId}`)}`}
          className="inline-flex items-center gap-2 font-body text-sm bg-sage-dark text-cream px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-200"
        >
          Create an Account to Begin This Check-In
        </Link>
      ) : (
        <form action={formAction} className="space-y-8">
          <input type="hidden" name="courseId" value={courseId} />
          <input type="hidden" name="lessonId" value={lessonId} />
          <input type="hidden" name="exerciseId" value={exerciseId} />

          {fields.map((field) => (
            <div key={field.id}>
              {field.type === "scale" && (
                <div>
                  <label
                    htmlFor={`${exerciseId}-${field.id}`}
                    className={labelClass}
                  >
                    {field.label}
                  </label>
                  <div className="flex items-center gap-4">
                    <span className="font-body text-xs text-grey-mid">
                      Not at all
                    </span>
                    <input
                      id={`${exerciseId}-${field.id}`}
                      type="range"
                      name={`scale-${field.id}`}
                      min={1}
                      max={10}
                      step={1}
                      defaultValue={saved?.scales[field.id] ?? 5}
                      className="flex-1 accent-(--color-sage-dark)"
                    />
                    <span className="font-body text-xs text-grey-mid">
                      Completely
                    </span>
                  </div>
                  {compare && compare.scales[field.id] !== undefined && (
                    <p className="font-body text-xs text-sage-dark mt-2">
                      {compare.label}: {compare.scales[field.id]} out of 10
                    </p>
                  )}
                </div>
              )}

              {field.type === "text" && (
                <div>
                  <label
                    htmlFor={`${exerciseId}-${field.id}`}
                    className={labelClass}
                  >
                    {field.label}
                  </label>
                  <textarea
                    id={`${exerciseId}-${field.id}`}
                    name={`text-${field.id}`}
                    rows={3}
                    defaultValue={saved?.texts[field.id] ?? ""}
                    className={`${inputClass} resize-y min-h-20`}
                  />
                </div>
              )}

              {field.type === "choices" && field.options && (
                <fieldset>
                  <legend className={labelClass}>{field.label}</legend>
                  <div className="flex flex-wrap gap-2">
                    {field.options.map((option) => (
                      <label
                        key={option}
                        className="inline-flex items-center gap-2 font-body text-sm border border-grey-light rounded-full px-4 py-2 cursor-pointer transition-colors duration-200 hover:border-sage-light has-checked:bg-sage-pale has-checked:border-sage has-checked:text-sage-dark"
                      >
                        <input
                          type="checkbox"
                          name={`choices-${field.id}`}
                          value={option}
                          defaultChecked={saved?.choices[field.id]?.includes(
                            option
                          )}
                          className="sr-only"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}
            </div>
          ))}

          {state.status === "error" && <FormError message={state.message} />}
          {state.status === "success" && <FormSuccess message={state.message} />}

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 font-body text-sm bg-sage-dark text-cream px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? "Saving…" : saved ? "Update Check-In" : "Save Check-In"}
          </button>
        </form>
      )}
    </div>
  );
}
