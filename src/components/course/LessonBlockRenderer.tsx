import Link from "next/link";
import { FileDown } from "lucide-react";
import LessonVideoPlayer from "@/components/course/LessonVideoPlayer";
import JournalExercise, {
  type ReceivedReaction,
} from "@/components/course/exercises/JournalExercise";
import WorksheetExercise from "@/components/course/exercises/WorksheetExercise";
import PairedReflection from "@/components/course/exercises/PairedReflection";
import QuizExercise from "@/components/course/exercises/QuizExercise";
import CheckinExercise from "@/components/course/exercises/CheckinExercise";
import IconCards from "@/components/course/blocks/IconCards";
import Accordion from "@/components/course/blocks/Accordion";
import Contrast from "@/components/course/blocks/Contrast";
import FlipCards from "@/components/course/blocks/FlipCards";
import TapChoice from "@/components/course/blocks/TapChoice";
import Flow from "@/components/course/blocks/Flow";
import Callout from "@/components/course/blocks/Callout";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import type { LessonBlock } from "@/lib/content/courses";
import { getPlaybackTokens } from "@/lib/mux";
import {
  TOGETHER_SUFFIX,
  getCoupleResponse,
  getPartnerExerciseStatus,
  getPartnerSharedResponse,
  type ResponseRecord,
} from "@/lib/dal/responses";

/* Renders one lesson block. Shared by the member lesson page and the admin
   preview (which passes interactive=false, so every exercise renders in its
   signed-out shape and nothing is saved). */

export type { ReceivedReaction };

/* Short label for the step list. */
export function stepLabel(block: LessonBlock, index: number): string {
  switch (block.kind) {
    case "video":
      return block.title ? `Watch: ${block.title}` : "Watch";
    case "audio":
      return `Listen: ${block.title}`;
    case "prose":
      return block.heading ?? (index === 0 ? "Introduction" : "Read");
    case "quote":
      return "A thought to hold";
    case "photo":
      return block.caption ?? "Laura and Esther";
    case "iconCards":
    case "accordion":
    case "contrast":
    case "flipCards":
    case "flow":
      return block.heading ?? "Explore";
    case "callout":
      return block.title;
    case "tapChoice":
    case "journal":
    case "sharedJournal":
    case "quiz":
    case "checkin":
    case "worksheet":
    case "pairedReflection":
    case "download":
      return block.title;
    default:
      return `Step ${index + 1}`;
  }
}

export async function Block({
  block,
  courseId,
  lessonId,
  interactive,
  viewer,
  responses,
  partner,
  reactionsByResponse,
  startTime,
  baselineCompare,
}: {
  block: LessonBlock;
  courseId: string;
  lessonId: string;
  interactive: boolean;
  viewer: { id: string; name: string } | null;
  responses: Map<string, ResponseRecord>;
  partner: { id: string; name: string } | null;
  reactionsByResponse: Map<string, ReceivedReaction[]>;
  startTime?: number;
  baselineCompare?: Record<string, number>;
}) {
  const partnerName = partner?.name ?? null;
  switch (block.kind) {
    case "video":
    case "audio": {
      const tokens = await getPlaybackTokens(block.playbackId);
      return (
        <div>
          {block.title && (
            <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-4">
              {block.kind === "audio" ? "Audio Practice" : "Watch"} ·{" "}
              {block.title}
            </p>
          )}
          <LessonVideoPlayer
            playbackId={block.playbackId}
            tokens={tokens}
            title={block.title ?? ""}
            courseId={courseId}
            lessonId={lessonId}
            startTime={block.kind === "video" ? startTime : undefined}
            canTrack={interactive && block.kind === "video"}
            audioOnly={block.kind === "audio"}
          />
        </div>
      );
    }

    case "prose":
      return (
        <div>
          {block.heading && (
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-light text-charcoal leading-tight mb-5 md:mb-6">
              {block.heading}
            </h2>
          )}
          {block.body.split("\n\n").map((para, i) => {
            const lines = para.split("\n");
            if (lines.length > 0 && lines.every((l) => l.startsWith("- "))) {
              return (
                <ul key={i} className="space-y-2.5 mb-6 last:mb-0">
                  {lines.map((line) => (
                    <li
                      key={line}
                      className="flex gap-3 font-body text-base sm:text-lg text-muted leading-[1.7]"
                    >
                      <span
                        className="mt-4 shrink-0 w-6 h-0.5 bg-sage"
                        aria-hidden="true"
                      />
                      {line.slice(2)}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p
                key={i}
                className="font-body text-base sm:text-lg text-muted leading-[1.8] sm:leading-[1.9] mb-5 sm:mb-6 last:mb-0"
              >
                {para}
              </p>
            );
          })}
        </div>
      );

    case "quote":
      return (
        <blockquote className="text-center py-4">
          <span className="block w-8 h-0.5 bg-sage mx-auto mb-6" aria-hidden="true" />
          <p className="font-heading text-2xl md:text-3xl font-light italic text-sage-dark leading-snug max-w-2xl mx-auto">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <cite className="block font-body text-sm text-muted not-italic mt-4">
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      );

    case "journal":
    case "sharedJournal": {
      const saved = responses.get(block.exerciseId);
      return (
        <JournalExercise
          courseId={courseId}
          lessonId={lessonId}
          exerciseId={block.exerciseId}
          kind={block.kind}
          title={block.title}
          intro={block.intro}
          prompts={block.prompts}
          saved={
            saved
              ? {
                  responseId: saved.id,
                  answers: saved.data.answers ?? [],
                  isShared: saved.isShared,
                }
              : undefined
          }
          partnerName={block.kind === "sharedJournal" ? partnerName : null}
          interactive={interactive}
          reactions={saved ? (reactionsByResponse.get(saved.id) ?? []) : []}
        />
      );
    }

    case "quiz": {
      const saved = responses.get(block.exerciseId);
      return (
        <QuizExercise
          courseId={courseId}
          lessonId={lessonId}
          exerciseId={block.exerciseId}
          title={block.title}
          intro={block.intro}
          questions={block.questions}
          profiles={block.profiles}
          saved={
            saved?.data.selections
              ? { selections: saved.data.selections }
              : undefined
          }
          interactive={interactive}
        />
      );
    }

    case "worksheet": {
      const saved = responses.get(block.exerciseId);
      return (
        <WorksheetExercise
          courseId={courseId}
          lessonId={lessonId}
          exerciseId={block.exerciseId}
          title={block.title}
          intro={block.intro}
          fields={block.fields}
          coupleSection={block.coupleSection}
          partnerNote={block.partnerNote}
          closing={block.closing}
          saved={
            saved
              ? {
                  responseId: saved.id,
                  texts: saved.data.texts ?? {},
                  choices: saved.data.choices ?? {},
                  isShared: saved.isShared,
                }
              : undefined
          }
          partnerName={partnerName}
          interactive={interactive}
        />
      );
    }

    case "iconCards":
      return (
        <IconCards
          heading={block.heading}
          intro={block.intro}
          columns={block.columns}
          items={block.items}
        />
      );

    case "accordion":
      return <Accordion heading={block.heading} intro={block.intro} items={block.items} />;

    case "contrast":
      return (
        <Contrast
          heading={block.heading}
          intro={block.intro}
          columns={block.columns}
          note={block.note}
        />
      );

    case "flipCards":
      return <FlipCards heading={block.heading} intro={block.intro} items={block.items} />;

    case "flow":
      return <Flow heading={block.heading} intro={block.intro} steps={block.steps} />;

    case "callout":
      return (
        <Callout icon={block.icon} title={block.title} body={block.body} tone={block.tone} />
      );

    case "photo":
      return (
        <figure>
          <PhotoPlaceholder
            src={block.src}
            alt={block.alt}
            position={block.position}
            className="aspect-[16/9] rounded-2xl shadow-sm"
          />
          {block.caption && (
            <figcaption className="font-body text-sm text-muted text-center mt-3">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "tapChoice": {
      const saved = responses.get(block.exerciseId);
      return (
        <TapChoice
          courseId={courseId}
          lessonId={lessonId}
          exerciseId={block.exerciseId}
          title={block.title}
          intro={block.intro}
          questions={block.questions}
          saved={saved?.data.selections}
          interactive={interactive}
        />
      );
    }

    case "pairedReflection": {
      const saved = responses.get(block.exerciseId);
      const soloTogether = responses.get(`${block.exerciseId}${TOGETHER_SUFFIX}`);

      let partnerView: React.ComponentProps<typeof PairedReflection>["partner"] = null;
      let togetherSaved: React.ComponentProps<typeof PairedReflection>["togetherSaved"];

      if (viewer && partner) {
        const [status, theirs, joint] = await Promise.all([
          getPartnerExerciseStatus(courseId, lessonId, block.exerciseId),
          saved?.isShared
            ? getPartnerSharedResponse(viewer.id, courseId, lessonId, block.exerciseId)
            : Promise.resolve(null),
          getCoupleResponse(courseId, lessonId, block.exerciseId),
        ]);
        partnerView = {
          name: partner.name,
          saved: status.saved,
          shared: status.shared,
          answers: theirs
            ? { texts: theirs.data.texts ?? {}, scales: theirs.data.scales ?? {} }
            : undefined,
        };
        if (joint) {
          togetherSaved = {
            texts: joint.data.texts ?? {},
            joint: true,
            updatedByName:
              joint.updatedBy === viewer.id
                ? viewer.name
                : joint.updatedBy === partner.id
                  ? partner.name
                  : null,
            updatedAt: joint.updatedAt,
          };
        }
      } else if (soloTogether) {
        togetherSaved = {
          texts: soloTogether.data.texts ?? {},
          joint: false,
          updatedByName: null,
          updatedAt: soloTogether.updatedAt,
        };
      }

      return (
        <PairedReflection
          courseId={courseId}
          lessonId={lessonId}
          exerciseId={block.exerciseId}
          eyebrow={block.eyebrow}
          title={block.title}
          intro={block.intro}
          order={block.order}
          individual={block.individual}
          together={block.together}
          compare={block.compare}
          revealNote={block.revealNote}
          closing={block.closing}
          viewerName={viewer?.name ?? "You"}
          saved={
            saved
              ? {
                  responseId: saved.id,
                  texts: saved.data.texts ?? {},
                  scales: saved.data.scales ?? {},
                  isShared: saved.isShared,
                }
              : undefined
          }
          partner={partnerView}
          togetherSaved={togetherSaved}
          interactive={interactive}
        />
      );
    }

    case "checkin": {
      const saved = responses.get(block.exerciseId);
      return (
        <CheckinExercise
          courseId={courseId}
          lessonId={lessonId}
          exerciseId={block.exerciseId}
          title={block.title}
          intro={block.intro}
          fields={block.fields}
          cadence={block.cadence}
          saved={
            saved
              ? {
                  scales: saved.data.scales ?? {},
                  texts: saved.data.texts ?? {},
                  choices: saved.data.choices ?? {},
                }
              : undefined
          }
          compare={
            baselineCompare
              ? { label: "When you began", scales: baselineCompare }
              : undefined
          }
          interactive={interactive}
        />
      );
    }

    case "download":
      return (
        <div className="bg-sage-pale rounded-2xl border border-sage-light/50 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <FileDown size={32} className="text-sage-dark shrink-0" strokeWidth={1.5} />
          <div className="flex-1">
            <h3 className="font-body text-lg font-medium text-charcoal mb-1">
              {block.title}
            </h3>
            <p className="font-body text-sm text-muted leading-relaxed">
              {block.description}
            </p>
          </div>
          {interactive ? (
            <a
              href={`/api/downloads/${block.blobPath}`}
              className="inline-flex items-center gap-2 font-body text-sm bg-sage-dark text-cream px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-200 shrink-0"
            >
              {block.fileLabel}
              <FileDown size={15} />
            </a>
          ) : (
            <Link
              href={`/signup?next=${encodeURIComponent(`/learn/${courseId}/${lessonId}`)}`}
              className="inline-flex items-center gap-2 font-body text-sm border border-sage text-sage-dark px-6 py-3 rounded-full hover:bg-white transition-colors duration-200 shrink-0"
            >
              Sign Up to Download
            </Link>
          )}
        </div>
      );

    default:
      return null;
  }
}
