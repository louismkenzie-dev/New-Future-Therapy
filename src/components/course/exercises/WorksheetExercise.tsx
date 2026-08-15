"use client";

import { useActionState } from "react";
import { HeartHandshake, Lock, Printer } from "lucide-react";
import {
  saveWorksheetResponse,
  toggleResponseShare,
  type ExerciseFormState,
} from "@/app/actions/exercises";
import { FormError, FormSuccess } from "@/components/auth/FormParts";
import ReflectionsPanel from "@/components/reflections/ReflectionsPanel";

/* Mixed-field reflection worksheet. Individual answers are private to the
   member until they choose "Share With <partner>" — one deliberate act for
   the whole worksheet, always reversible. Once saved, NewFuture Reflections
   offers to reflect on the answers. */

const initialState: ExerciseFormState = { status: "idle" };

interface WorksheetField {
  id: string;
  label: string;
  type: "text" | "scale" | "choices";
  options?: string[];
  hint?: string;
  section?: string;
}

interface WorksheetExerciseProps {
  courseId: string;
  lessonId: string;
  exerciseId: string;
  title: string;
  intro?: string;
  fields: WorksheetField[];
  coupleSection?: {
    title: string;
    intro: string;
    groundRules: string[];
    fields: { id: string; label: string }[];
  };
  partnerNote: string;
  closing?: { heading: string; body: string; question: string; pull: string };
  saved?: {
    responseId: string;
    texts: Record<string, string>;
    choices: Record<string, string[]>;
    isShared: boolean;
  };
  partnerName: string | null;
  interactive: boolean;
}

const fieldLabelClass =
  "block font-body text-sm font-medium text-charcoal mb-3 leading-relaxed";
const textareaClass =
  "w-full font-body text-sm text-charcoal bg-white border border-grey-light rounded-lg px-4 py-3 focus:outline-none focus:border-sage min-h-[88px] placeholder:text-muted/70";

function PillGroup({
  name,
  options,
  multi,
  defaultChosen,
  disabled,
}: {
  name: string;
  options: string[];
  multi: boolean;
  defaultChosen: string[];
  disabled: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <label
          key={option}
          className="inline-flex items-center gap-2 font-body text-sm text-charcoal bg-white border border-grey-light rounded-full px-4 py-2 min-h-[44px] cursor-pointer has-checked:bg-sage-pale has-checked:border-sage has-checked:text-sage-dark transition-colors duration-200"
        >
          <input
            type={multi ? "checkbox" : "radio"}
            name={name}
            value={option}
            defaultChecked={defaultChosen.includes(option)}
            disabled={disabled}
            className="accent-[#3A5A40]"
          />
          {option}
        </label>
      ))}
    </div>
  );
}

export default function WorksheetExercise({
  courseId,
  lessonId,
  exerciseId,
  title,
  intro,
  fields,
  coupleSection,
  closing,
  saved,
  partnerName,
  interactive,
}: WorksheetExerciseProps) {
  const [state, formAction, isPending] = useActionState(
    saveWorksheetResponse,
    initialState
  );

  const texts = saved?.texts ?? {};
  const choices = saved?.choices ?? {};
  const hasSaved = Boolean(saved) || state.status === "success";

  return (
    <div className="space-y-8">
      <div className="bg-sage-pale/60 rounded-2xl border border-sage-light/40 p-8 print:border-none print:p-0">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em]">
            Reflection Worksheet · Shareable
          </p>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 font-body text-xs text-muted hover:text-sage-dark transition-colors duration-200 print:hidden"
          >
            <Printer size={14} />
            Print to complete on paper
          </button>
        </div>
        <h3 className="font-heading text-2xl md:text-3xl font-light text-charcoal mb-3">
          {title}
        </h3>
        {intro && (
          <p className="font-body text-sm text-muted leading-relaxed mb-8">
            {intro}
          </p>
        )}

        <form action={formAction}>
          <input type="hidden" name="courseId" value={courseId} />
          <input type="hidden" name="lessonId" value={lessonId} />
          <input type="hidden" name="exerciseId" value={exerciseId} />

          <div className="space-y-8">
            {fields.map((field) => (
              <div key={field.id}>
                {field.section && (
                  <p className="font-heading text-xl font-medium text-sage-dark mb-4 mt-2 flex items-center gap-3">
                    <span
                      className="w-8 h-0.5 bg-sage inline-block"
                      aria-hidden="true"
                    />
                    {field.section}
                  </p>
                )}
                <label className={fieldLabelClass} htmlFor={`field-${field.id}`}>
                  {field.label}
                  {field.hint && (
                    <span className="block font-normal text-muted text-xs mt-1">
                      {field.hint}
                    </span>
                  )}
                </label>
                {field.type === "text" ? (
                  <textarea
                    id={`field-${field.id}`}
                    name={`text-${field.id}`}
                    defaultValue={texts[field.id] ?? ""}
                    disabled={!interactive}
                    className={textareaClass}
                  />
                ) : (
                  <PillGroup
                    name={`${field.type === "scale" ? "scale" : "choices"}-${field.id}`}
                    options={field.options ?? []}
                    multi={field.type === "choices"}
                    defaultChosen={choices[field.id] ?? []}
                    disabled={!interactive}
                  />
                )}
              </div>
            ))}
          </div>

          {coupleSection && (
            <div className="mt-12 bg-white rounded-2xl border border-sage-light/60 p-7 print:border print:border-charcoal">
              <p className="font-heading text-xl font-medium text-sage-dark mb-2">
                {coupleSection.title}
              </p>
              <p className="font-body text-sm text-muted leading-relaxed mb-3">
                {coupleSection.intro}
              </p>
              <ul className="space-y-1.5 mb-6">
                {coupleSection.groundRules.map((rule) => (
                  <li
                    key={rule}
                    className="flex gap-3 font-body text-sm text-charcoal"
                  >
                    <span
                      className="mt-2.5 shrink-0 w-6 h-0.5 bg-sage"
                      aria-hidden="true"
                    />
                    {rule}
                  </li>
                ))}
              </ul>
              <div className="space-y-6">
                {coupleSection.fields.map((field) => (
                  <div key={field.id}>
                    <label
                      className={fieldLabelClass}
                      htmlFor={`field-${field.id}`}
                    >
                      {field.label}
                    </label>
                    <textarea
                      id={`field-${field.id}`}
                      name={`text-${field.id}`}
                      defaultValue={texts[field.id] ?? ""}
                      disabled={!interactive}
                      className={textareaClass}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {state.status === "error" && <FormError message={state.message} />}
          {state.status === "success" && (
            <FormSuccess message={state.message} />
          )}

          {interactive && (
            <div className="flex flex-wrap items-center gap-4 mt-8 print:hidden">
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm bg-sage-dark text-cream px-8 py-3 rounded-full hover:bg-charcoal transition-colors duration-200 disabled:opacity-60"
              >
                {isPending ? "Saving…" : "Save My Reflections"}
              </button>
              <span className="inline-flex items-center gap-1.5 font-body text-xs text-muted">
                <Lock size={13} />
                Private to you unless you choose to share
              </span>
            </div>
          )}
        </form>

        {/* Share with partner — one deliberate, reversible act */}
        {interactive && saved && partnerName && (
          <div className="mt-8 pt-6 border-t border-sage-light/50 print:hidden">
            {saved.isShared ? (
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-2 font-body text-sm text-sage-dark">
                  <HeartHandshake size={16} />
                  Shared with {partnerName}
                </span>
                <form action={toggleResponseShare}>
                  <input type="hidden" name="responseId" value={saved.responseId} />
                  <input type="hidden" name="share" value="false" />
                  <input type="hidden" name="courseId" value={courseId} />
                  <input type="hidden" name="lessonId" value={lessonId} />
                  <button
                    type="submit"
                    className="font-body text-xs text-muted underline underline-offset-2 hover:text-charcoal transition-colors duration-200"
                  >
                    Stop sharing
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <p className="font-body text-sm text-muted leading-relaxed mb-4">
                  When you are ready — and only if you want to — you can share
                  your reflections with {partnerName}. Sharing is always your
                  choice, and you can stop sharing at any time.
                </p>
                <form action={toggleResponseShare}>
                  <input type="hidden" name="responseId" value={saved.responseId} />
                  <input type="hidden" name="share" value="true" />
                  <input type="hidden" name="courseId" value={courseId} />
                  <input type="hidden" name="lessonId" value={lessonId} />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm border border-sage text-sage-dark px-6 py-3 rounded-full hover:bg-white transition-colors duration-200"
                  >
                    <HeartHandshake size={15} />
                    Share With {partnerName}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {closing && (
          <div className="mt-10 pt-8 border-t border-sage-light/50 text-center">
            <p className="font-heading text-xl font-medium text-sage-dark mb-3">
              {closing.heading}
            </p>
            <p className="font-body text-sm text-muted leading-relaxed max-w-xl mx-auto mb-5">
              {closing.body}
            </p>
            <p className="font-heading text-xl md:text-2xl font-light italic text-charcoal leading-snug max-w-lg mx-auto mb-5">
              &ldquo;{closing.question}&rdquo;
            </p>
            <p className="font-heading text-base italic text-sage-dark leading-relaxed max-w-md mx-auto">
              {closing.pull}
            </p>
          </div>
        )}
      </div>

      {/* The reflective companion appears once something has been saved */}
      {interactive && hasSaved && (
        <div className="print:hidden">
          <ReflectionsPanel
            courseId={courseId}
            lessonId={lessonId}
            exerciseId={exerciseId}
            invitation="Reflect with me on what I have written"
            placeholder="Or write to Reflections about this worksheet…"
          />
        </div>
      )}
    </div>
  );
}
