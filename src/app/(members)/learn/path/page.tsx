import type { Metadata } from "next";
import Link from "next/link";
import { BookmarkCheck, Route, StickyNote, Trash2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/motion/Reveal";
import AddNoteForm from "@/components/course/AddNoteForm";
import { requireEntitlement } from "@/lib/dal/entitlement";
import { getLearningPath } from "@/lib/dal/learningPath";
import { removePathItem } from "@/app/actions/learningPath";
import { getLesson } from "@/lib/content/courses";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your Learning Path",
  robots: { index: false },
};

export default async function LearningPathPage() {
  await requireEntitlement("/learn/path");
  const items = await getLearningPath();

  return (
    <>
      <PageHeader
        eyebrow="Your Learning Path"
        title="What You Are Keeping"
        lede="Notes you have written for yourself, and reflections from your partner you chose to hold on to — your own gathered map of the journey."
      />

      <section className="py-16 px-6 bg-cream">
        <div className="max-w-3xl mx-auto space-y-8">
          <Reveal>
            <AddNoteForm />
          </Reveal>

          {items.length === 0 ? (
            <Reveal>
              <div className="text-center py-16">
                <Route size={40} className="text-sage mx-auto mb-4" strokeWidth={1.5} />
                <p className="font-body text-base text-muted leading-relaxed max-w-md mx-auto">
                  Your path is just beginning. Notes you add here — and
                  anything you keep from your partner&rsquo;s shared
                  reflections — will gather in this place.
                </p>
              </div>
            </Reveal>
          ) : (
            items.map((item, index) => {
              const lessonEntry =
                item.courseId && item.lessonId
                  ? getLesson(item.courseId, item.lessonId)
                  : undefined;
              return (
                <Reveal key={item.id} delay={Math.min(index * 0.05, 0.2)}>
                  <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <p className="flex items-center gap-2 font-body text-xs text-sage-dark uppercase tracking-[0.25em]">
                        {item.kind === "note" ? (
                          <>
                            <StickyNote size={14} />
                            Your Note
                          </>
                        ) : (
                          <>
                            <BookmarkCheck size={14} />
                            Kept From Your Partner
                          </>
                        )}
                      </p>
                      <form action={removePathItem}>
                        <input type="hidden" name="itemId" value={item.id} />
                        <button
                          type="submit"
                          aria-label="Remove from your learning path"
                          className="text-grey-mid hover:text-charcoal transition-colors duration-200 p-2 -m-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </form>
                    </div>

                    {lessonEntry && (
                      <Link
                        href={`/learn/${item.courseId}/${item.lessonId}`}
                        className="font-body text-sm text-sage-dark underline underline-offset-4 hover:text-charcoal transition-colors duration-200"
                      >
                        {lessonEntry.module.title} · {lessonEntry.lesson.title}
                      </Link>
                    )}

                    {item.kind === "partner_bookmark" && (
                      <div className="bg-sage-pale/60 border border-sage-light/50 rounded-xl p-5 mt-4">
                        {item.source?.data.answers?.length ? (
                          item.source.data.answers
                            .filter(Boolean)
                            .map((answer, i) => (
                              <p
                                key={i}
                                className="font-body text-sm text-muted leading-relaxed mb-3 last:mb-0"
                              >
                                &ldquo;{answer}&rdquo;
                              </p>
                            ))
                        ) : (
                          <p className="font-body text-sm text-grey-mid italic leading-relaxed">
                            This shared reflection is no longer available — your
                            partner has made it private again, which is always
                            their choice. Your own note remains below.
                          </p>
                        )}
                      </div>
                    )}

                    {item.note && (
                      <p className="font-body text-base text-charcoal leading-relaxed mt-4">
                        {item.note}
                      </p>
                    )}

                    <p className="font-body text-xs text-grey-mid mt-4">
                      {new Date(item.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </Reveal>
              );
            })
          )}
        </div>
      </section>
    </>
  );
}
