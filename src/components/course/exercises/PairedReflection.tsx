"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  HeartHandshake,
  Lock,
  Printer,
  Users,
} from "lucide-react";
import {
  savePairedIndividual,
  savePairedTogether,
  toggleResponseShare,
  type ExerciseFormState,
} from "@/app/actions/exercises";
import { FormError, FormSuccess } from "@/components/auth/FormParts";
import ReflectionsPanel from "@/components/reflections/ReflectionsPanel";
import type { PairedQuestion } from "@/lib/content/courses";

/* The programme's paired reflection.

   1. Individual — each partner answers privately in their own login.
   2. Share — one deliberate, reversible act per partner.
   3. Side by side — once BOTH have shared, the answers appear together,
      question by question. Neither sees the other's answers first.
   4. Coming Back Together — the couple's joint answers, saved once for both.

   Members without a linked partner complete both halves privately. */

const initialState: ExerciseFormState = { status: "idle" };

interface Answers {
  texts: Record<string, string>;
  scales: Record<string, number>;
}

interface PairedReflectionProps {
  courseId: string;
  lessonId: string;
  exerciseId: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  order?: "individualFirst" | "togetherFirst";
  individual: { title: string; intro?: string; questions: PairedQuestion[] };
  together: {
    title: string;
    intro?: string;
    steps?: string[];
    questions: { id: string; label: string; hint?: string }[];
  };
  compare?: Record<string, string>;
  revealNote?: string;
  closing?: { text: string };
  viewerName: string;
  saved?: Answers & { responseId: string; isShared: boolean };
  /** Present when the member has an active linked partner. */
  partner: {
    name: string;
    saved: boolean;
    shared: boolean;
    /** Their answers — only present once they have shared. */
    answers?: Answers;
  } | null;
  togetherSaved?: {
    texts: Record<string, string>;
    /** true when it is the couple's joint record. */
    joint: boolean;
    updatedByName: string | null;
    updatedAt: string;
  };
  interactive: boolean;
}

const questionLabelClass =
  "block font-body text-base font-medium text-charcoal leading-relaxed";
const hintClass = "font-body text-sm text-muted leading-relaxed mt-1.5 mb-3";
const textareaClass =
  "w-full font-body text-sm text-charcoal bg-white border border-grey-light rounded-lg px-4 py-3 focus:outline-none focus:border-sage min-h-[104px] resize-y placeholder:text-muted/70 disabled:bg-cream/60";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* 1–10 slider with the therapists' end labels and a live value. */
function ScaleInput({
  id,
  name,
  low,
  high,
  defaultValue,
  disabled,
}: {
  id: string;
  name: string;
  low: string;
  high: string;
  defaultValue?: number;
  disabled: boolean;
}) {
  const [value, setValue] = useState(defaultValue ?? 5);
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3 sm:gap-4">
        <input
          id={id}
          type="range"
          name={name}
          min={1}
          max={10}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          disabled={disabled}
          className="flex-1 accent-[#3A5A40] min-h-[44px]"
          aria-valuetext={`${value} of 10`}
        />
        <span className="font-heading text-2xl font-light text-sage-dark w-8 text-right">
          {value}
        </span>
      </div>
      <div className="flex justify-between font-body text-xs text-grey-mid -mt-1 pr-11">
        <span>{low}</span>
        <span>{high}</span>
      </div>
    </div>
  );
}

function ScaleReadout({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="flex-1 h-1.5 rounded-full bg-sage-pale overflow-hidden">
        <div
          className="h-full bg-sage rounded-full"
          style={{ width: `${value * 10}%` }}
        />
      </div>
      <span className="font-heading text-xl font-light text-sage-dark w-12 text-right">
        {value}
        <span className="font-body text-xs text-grey-mid"> /10</span>
      </span>
    </div>
  );
}

function StatusPill({
  who,
  saved,
  shared,
}: {
  who: string;
  saved: boolean;
  shared: boolean;
}) {
  const Icon = shared ? HeartHandshake : saved ? CheckCircle2 : Circle;
  const text = shared ? "Shared" : saved ? "Saved, not yet shared" : "Not yet saved";
  return (
    <span
      className={`inline-flex items-center gap-2 font-body text-xs rounded-full px-4 py-2 border ${
        shared
          ? "bg-sage-dark text-cream border-sage-dark"
          : saved
            ? "bg-white text-sage-dark border-sage-light"
            : "bg-white text-muted border-grey-light"
      }`}
    >
      <Icon size={14} />
      <span className="font-medium">{who}</span>
      <span aria-hidden="true">·</span>
      {text}
    </span>
  );
}

export default function PairedReflection({
  courseId,
  lessonId,
  exerciseId,
  eyebrow,
  title,
  intro,
  order = "individualFirst",
  individual,
  together,
  compare,
  revealNote,
  closing,
  viewerName,
  saved,
  partner,
  togetherSaved,
  interactive,
}: PairedReflectionProps) {
  const [indState, indAction, indPending] = useActionState(
    savePairedIndividual,
    initialState
  );
  const [togState, togAction, togPending] = useActionState(
    savePairedTogether,
    initialState
  );

  const hasSaved = Boolean(saved) || indState.status === "success";
  const bothShared = Boolean(saved?.isShared && partner?.shared && partner.answers);
  const viewerFirst = viewerName.split(" ")[0];
  const partnerFirst = partner?.name.split(" ")[0];
  const hidden = { courseId, lessonId, exerciseId };

  /* ---- Individual half -------------------------------------------------- */
  const individualCard = (
    <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-5 sm:p-5 sm:p-8 md:p-10">
      <div className="flex items-center gap-3 mb-2">
        <Lock size={16} className="text-sage-dark" />
        <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em]">
          {individual.title} · Private until you choose to share
        </p>
      </div>
      {individual.intro && (
        <p className="font-body text-sm text-muted leading-relaxed mb-8">
          {individual.intro}
        </p>
      )}

      {!interactive ? (
        <div>
          <ol className="space-y-5 mb-8">
            {individual.questions.map((q) => (
              <li key={q.id} className="border-l-2 border-sage-light pl-4">
                <p className="font-body text-sm text-charcoal font-medium">{q.label}</p>
                {q.hint && <p className="font-body text-xs text-muted mt-1">{q.hint}</p>}
              </li>
            ))}
          </ol>
          <Link
            href={`/signup?next=${encodeURIComponent(`/learn/${courseId}/${lessonId}`)}`}
            className="inline-flex items-center gap-2 font-body text-sm bg-sage-dark text-cream px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-200"
          >
            Create an Account to Save Your Answers
          </Link>
        </div>
      ) : (
        <form action={indAction} className="space-y-8">
          <input type="hidden" name="courseId" value={hidden.courseId} />
          <input type="hidden" name="lessonId" value={hidden.lessonId} />
          <input type="hidden" name="exerciseId" value={hidden.exerciseId} />

          {individual.questions.map((q, i) => (
            <div key={q.id}>
              <label htmlFor={`${exerciseId}-${q.id}`} className={questionLabelClass}>
                <span className="font-heading text-lg text-sage mr-2">{i + 1}.</span>
                {q.label}
              </label>
              {q.hint ? (
                <p className={hintClass}>{q.hint}</p>
              ) : (
                <div className="mb-3" />
              )}
              {q.scale && (
                <ScaleInput
                  id={`${exerciseId}-${q.id}-scale`}
                  name={`scale-${q.id}`}
                  low={q.scale.low}
                  high={q.scale.high}
                  defaultValue={saved?.scales[q.id]}
                  disabled={!interactive}
                />
              )}
              <textarea
                id={`${exerciseId}-${q.id}`}
                name={`text-${q.id}`}
                defaultValue={saved?.texts[q.id] ?? ""}
                placeholder={q.scale ? "In a few words…" : undefined}
                className={textareaClass}
              />
            </div>
          ))}

          {indState.status === "error" && <FormError message={indState.message} />}
          {indState.status === "success" && <FormSuccess message={indState.message} />}

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={indPending}
              className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm bg-sage-dark text-cream px-8 py-3 rounded-full hover:bg-charcoal transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {indPending ? "Saving…" : saved ? "Update My Answers" : "Save My Answers"}
            </button>
            <span className="inline-flex items-center gap-1.5 font-body text-xs text-muted">
              <Lock size={13} />
              Private to you unless you choose to share
            </span>
          </div>
        </form>
      )}
    </div>
  );

  /* ---- Share + side by side ------------------------------------------- */
  const sharePanel = interactive && (
    <div className="bg-sage-pale rounded-2xl border border-sage-light/50 p-5 sm:p-5 sm:p-8 md:p-10 print:hidden">
      <div className="flex items-center gap-3 mb-2">
        <Users size={16} className="text-sage-dark" />
        <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em]">
          Sharing Your Answers
        </p>
      </div>

      {!partner ? (
        <p className="font-body text-sm text-muted leading-relaxed">
          This activity is designed for two. When you link accounts with a
          partner, you will each be able to share your answers and see them
          side by side here. Until then, everything you write stays private to
          you.
        </p>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mt-4 mb-6">
            <StatusPill
              who={viewerFirst}
              saved={hasSaved}
              shared={Boolean(saved?.isShared)}
            />
            <StatusPill who={partnerFirst!} saved={partner.saved} shared={partner.shared} />
          </div>

          {!saved ? (
            <p className="font-body text-sm text-muted leading-relaxed">
              Save your own answers first. Sharing is always your choice — you
              do not automatically have to share an individual reflection with{" "}
              {partnerFirst}.
            </p>
          ) : saved.isShared ? (
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2 font-body text-sm text-sage-dark">
                <HeartHandshake size={16} />
                You have shared your answers with {partnerFirst}
              </span>
              <form action={toggleResponseShare}>
                <input type="hidden" name="responseId" value={saved.responseId} />
                <input type="hidden" name="share" value="false" />
                <input type="hidden" name="courseId" value={courseId} />
                <input type="hidden" name="lessonId" value={lessonId} />
                <button
                  type="submit"
                  className="font-body text-xs text-muted underline underline-offset-2 hover:text-charcoal transition-colors duration-200 min-h-[44px]"
                >
                  Stop sharing
                </button>
              </form>
            </div>
          ) : (
            <div>
              <p className="font-body text-sm text-muted leading-relaxed mb-4">
                When you are ready, share your answers with {partnerFirst}. You
                will see each other&rsquo;s answers side by side only once you
                have both chosen to share — so neither of you reads the other
                first. You can stop sharing at any time.
              </p>
              <form action={toggleResponseShare}>
                <input type="hidden" name="responseId" value={saved.responseId} />
                <input type="hidden" name="share" value="true" />
                <input type="hidden" name="courseId" value={courseId} />
                <input type="hidden" name="lessonId" value={lessonId} />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm bg-sage-dark text-cream px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-200"
                >
                  <HeartHandshake size={15} />
                  Share My Answers With {partnerFirst}
                </button>
              </form>
            </div>
          )}

          {saved?.isShared && !partner.shared && (
            <p className="font-body text-sm text-muted leading-relaxed mt-6">
              {partner.saved
                ? `${partnerFirst} has saved their answers but has not shared them yet. Their answers will appear here, beside yours, when they choose to.`
                : `${partnerFirst} has not saved their answers yet. When they have saved and shared, both sets will appear here side by side.`}
            </p>
          )}

          {bothShared && (
            <div className="mt-8">
              <p className="font-heading text-2xl font-light text-charcoal mb-6">
                Side by Side
              </p>
              <div className="space-y-6">
                {individual.questions.map((q) => {
                  const partnerQuestionId = compare?.[q.id] ?? q.id;
                  const partnerQuestion =
                    individual.questions.find((pq) => pq.id === partnerQuestionId) ?? q;
                  const mine = saved!;
                  const theirs = partner.answers!;
                  return (
                    <div
                      key={q.id}
                      className="bg-white rounded-2xl border border-sage-light/60 p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
                    >
                      <div>
                        <p className="font-body text-xs text-sage-dark uppercase tracking-widest mb-1">
                          {viewerFirst}
                        </p>
                        <p className="font-body text-sm font-medium text-charcoal mb-3">
                          {q.label}
                        </p>
                        {mine.scales[q.id] !== undefined && (
                          <ScaleReadout value={mine.scales[q.id]} />
                        )}
                        <p className="font-body text-base text-charcoal leading-relaxed whitespace-pre-line">
                          {mine.texts[q.id] || (
                            <span className="text-grey-mid italic">No written answer</span>
                          )}
                        </p>
                      </div>
                      <div className="border-t border-sage-light/60 pt-5 md:border-t-0 md:pt-0 md:border-l md:pl-6">
                        <p className="font-body text-xs text-sage-dark uppercase tracking-widest mb-1">
                          {partnerFirst}
                        </p>
                        <p className="font-body text-sm font-medium text-charcoal mb-3">
                          {partnerQuestion.label}
                        </p>
                        {theirs.scales[partnerQuestionId] !== undefined && (
                          <ScaleReadout value={theirs.scales[partnerQuestionId]} />
                        )}
                        <p className="font-body text-base text-charcoal leading-relaxed whitespace-pre-line">
                          {theirs.texts[partnerQuestionId] || (
                            <span className="text-grey-mid italic">No written answer</span>
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {revealNote && (
                <p className="font-heading text-lg md:text-xl font-light italic text-sage-dark leading-snug text-center max-w-xl mx-auto mt-8">
                  {revealNote}
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );

  /* ---- Coming Back Together (joint) ------------------------------------ */
  const togetherCard = (
    <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-5 sm:p-5 sm:p-8 md:p-10">
      <div className="flex items-center gap-3 mb-2">
        <HeartHandshake size={16} className="text-sage-dark" />
        <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em]">
          {together.title}
          {partner ? " · Written together" : ""}
        </p>
      </div>
      {together.intro && (
        <p className="font-body text-sm text-muted leading-relaxed mb-6">
          {together.intro}
        </p>
      )}
      {together.steps && together.steps.length > 0 && (
        <ol className="space-y-2.5 mb-8">
          {together.steps.map((step, i) => (
            <li key={step} className="flex gap-3 font-body text-sm text-charcoal leading-relaxed">
              <span className="font-heading text-lg text-sage shrink-0 w-5">{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      )}

      {together.questions.length > 0 &&
        (!interactive ? (
          <ul className="space-y-4">
            {together.questions.map((q) => (
              <li key={q.id} className="border-l-2 border-sage-light pl-4">
                <p className="font-body text-sm text-charcoal font-medium">{q.label}</p>
                {q.hint && <p className="font-body text-xs text-muted mt-1">{q.hint}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <form action={togAction} className="space-y-8">
            <input type="hidden" name="courseId" value={hidden.courseId} />
            <input type="hidden" name="lessonId" value={hidden.lessonId} />
            <input type="hidden" name="exerciseId" value={hidden.exerciseId} />

            {partner && !bothShared && together.questions.length > 0 && (
              <p className="font-body text-sm text-sage-dark bg-sage-pale border border-sage-light/50 rounded-lg p-4 leading-relaxed">
                These questions are for once you have both shared your
                individual answers and talked them through. They are here
                whenever you are ready.
              </p>
            )}

            {together.questions.map((q) => (
              <div key={q.id}>
                <label htmlFor={`${exerciseId}-together-${q.id}`} className={questionLabelClass}>
                  {q.label}
                </label>
                {q.hint ? <p className={hintClass}>{q.hint}</p> : <div className="mb-3" />}
                <textarea
                  id={`${exerciseId}-together-${q.id}`}
                  name={`together-${q.id}`}
                  defaultValue={togetherSaved?.texts[q.id] ?? ""}
                  className={textareaClass}
                />
              </div>
            ))}

            {togState.status === "error" && <FormError message={togState.message} />}
            {togState.status === "success" && <FormSuccess message={togState.message} />}

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={togPending}
                className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm bg-sage-dark text-cream px-8 py-3 rounded-full hover:bg-charcoal transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {togPending
                  ? "Saving…"
                  : partner
                    ? togetherSaved
                      ? "Update Our Answers"
                      : "Save Our Answers"
                    : "Save My Answers"}
              </button>
              {togetherSaved?.joint ? (
                <span className="inline-flex items-center gap-1.5 font-body text-xs text-muted">
                  <Users size={13} />
                  Saved once for both of you
                  {togetherSaved.updatedByName &&
                    ` · last saved by ${togetherSaved.updatedByName.split(" ")[0]} on ${formatDate(togetherSaved.updatedAt)}`}
                </span>
              ) : partner ? (
                <span className="inline-flex items-center gap-1.5 font-body text-xs text-muted">
                  <Users size={13} />
                  Saved once, for both of you — either of you can edit it
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 font-body text-xs text-muted">
                  <Lock size={13} />
                  Private to you
                </span>
              )}
            </div>
          </form>
        ))}
    </div>
  );

  const reflections = interactive && hasSaved && (
    <div className="print:hidden">
      <ReflectionsPanel
        courseId={courseId}
        lessonId={lessonId}
        exerciseId={exerciseId}
        invitation="Reflect with me on what I have written"
        placeholder="Or write to Reflections about this activity…"
      />
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          {eyebrow && (
            <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">
              {eyebrow}
            </p>
          )}
          <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-light text-charcoal leading-tight">
            {title}
          </h3>
          {intro && (
            <p className="font-body text-base text-muted leading-relaxed mt-3 max-w-2xl">
              {intro}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 font-body text-xs text-muted hover:text-sage-dark transition-colors duration-200 print:hidden min-h-[44px]"
        >
          <Printer size={14} />
          Print to complete on paper
        </button>
      </div>

      {order === "togetherFirst" ? (
        <>
          {togetherCard}
          {individualCard}
          {sharePanel}
          {reflections}
        </>
      ) : (
        <>
          {individualCard}
          {sharePanel}
          {reflections}
          {togetherCard}
        </>
      )}

      {closing && (
        <p className="font-heading text-xl md:text-2xl font-light italic text-sage-dark leading-snug text-center max-w-2xl mx-auto pt-4">
          &ldquo;{closing.text}&rdquo;
        </p>
      )}
    </div>
  );
}
