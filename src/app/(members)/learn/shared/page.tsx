import type { Metadata } from "next";
import Link from "next/link";
import { HeartHandshake, Users } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/motion/Reveal";
import SharedResponseCard, {
  type SharedResponseView,
} from "@/components/course/SharedResponseCard";
import { requireEntitlement } from "@/lib/dal/entitlement";
import { getCoupleState } from "@/lib/dal/couples";
import { getSharedFromPartner } from "@/lib/dal/responses";
import { getReactionsForResponses } from "@/lib/dal/reactions";
import { getBookmarkedResponseIds } from "@/lib/dal/learningPath";
import { findExercise, getLesson } from "@/lib/content/courses";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shared With You",
  robots: { index: false },
};

export default async function SharedWithYouPage() {
  const { user, entitlement } = await requireEntitlement("/learn/shared");
  const couple = await getCoupleState(user.id);

  if (!couple || couple.status !== "active") {
    return (
      <>
        <PageHeader
          eyebrow="Shared With You"
          title="A Space for Two"
          lede="When you link accounts with a partner, the reflections they choose to share with you will gather here."
        />
        <section className="py-16 px-6 bg-cream">
          <div className="max-w-xl mx-auto text-center">
            <Reveal>
              <Users size={40} className="text-sage mx-auto mb-6" strokeWidth={1.5} />
              {couple?.status === "suspended" ? (
                <p className="font-body text-base text-muted leading-relaxed mb-8">
                  Your partner link is paused because the Joint Couples plan
                  that covered it has ended. Everything you both wrote is safe —
                  resubscribing restores your shared space exactly as it was.
                </p>
              ) : (
                <p className="font-body text-base text-muted leading-relaxed mb-8">
                  {entitlement.canInvitePartner
                    ? "You are on the Joint Couples plan — invite your partner from your account page, and this space will come alive."
                    : "Sharing is part of the Joint Couples plan. With linked accounts, each of you can choose — reflection by reflection — what to share, and respond to each other gently."}
                </p>
              )}
              <Link
                href={
                  entitlement.canInvitePartner || couple?.status === "suspended"
                    ? "/account"
                    : "/courses"
                }
                className="inline-flex items-center gap-2 font-body text-sm bg-sage-dark text-cream px-8 py-4 rounded-full hover:bg-charcoal transition-colors duration-200"
              >
                {entitlement.canInvitePartner
                  ? "Invite Your Partner"
                  : couple?.status === "suspended"
                    ? "Go to Your Account"
                    : "Explore the Couples Plan"}
              </Link>
            </Reveal>
          </div>
        </section>
      </>
    );
  }

  const partnerName = couple.partnerName ?? "Your partner";
  const shared = await getSharedFromPartner(user.id);
  const [reactions, bookmarked] = await Promise.all([
    getReactionsForResponses(shared.map((r) => r.id)),
    getBookmarkedResponseIds(),
  ]);

  const views: SharedResponseView[] = [];
  for (const response of shared) {
    const lessonEntry = getLesson(response.courseId, response.lessonId);
    const block = findExercise(
      response.courseId,
      response.lessonId,
      response.exerciseId
    );
    if (!lessonEntry || !block || block.kind !== "sharedJournal") continue;

    const own = (reactions.get(response.id) ?? []).find(
      (r) => r.reactorId === user.id
    );
    views.push({
      responseId: response.id,
      courseId: response.courseId,
      lessonId: response.lessonId,
      moduleTitle: `Module ${lessonEntry.module.number} · ${lessonEntry.module.title}`,
      lessonTitle: lessonEntry.lesson.title,
      exerciseTitle: block.title,
      prompts: block.prompts,
      answers: response.data.answers ?? [],
      sharedAt: response.sharedAt,
      partnerName,
      existingReaction: own
        ? { reactionType: own.reactionType, replyText: own.replyText }
        : undefined,
      alreadyBookmarked: bookmarked.has(response.id),
    });
  }

  return (
    <>
      <PageHeader
        eyebrow="Shared With You"
        title={`From ${partnerName}`}
        lede="Reflections your partner has chosen to let you see. Read them twice — once to react, once to understand — and respond with care."
      />

      <section className="py-16 px-6 bg-cream">
        <div className="max-w-3xl mx-auto space-y-8">
          {views.length === 0 ? (
            <Reveal>
              <div className="text-center py-16">
                <HeartHandshake
                  size={40}
                  className="text-sage mx-auto mb-4"
                  strokeWidth={1.5}
                />
                <p className="font-body text-base text-muted leading-relaxed max-w-md mx-auto">
                  Nothing has been shared with you yet. When {partnerName}{" "}
                  chooses to share a reflection, it will appear here — in their
                  own time, and always by their own choice.
                </p>
              </div>
            </Reveal>
          ) : (
            views.map((view, index) => (
              <Reveal key={view.responseId} delay={Math.min(index * 0.05, 0.2)}>
                <SharedResponseCard response={view} />
              </Reveal>
            ))
          )}
        </div>
      </section>
    </>
  );
}
