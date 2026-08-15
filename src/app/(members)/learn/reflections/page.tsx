import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircleHeart, Trash2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/motion/Reveal";
import ReflectionsPanel, {
  type PanelMessage,
} from "@/components/reflections/ReflectionsPanel";
import { requireEntitlement } from "@/lib/dal/entitlement";
import { listSessions, getMessages } from "@/lib/reflections/dal";
import {
  deleteReflectionsSession,
  deleteAllReflectionsSessions,
} from "@/app/actions/reflections";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reflections",
  robots: { index: false },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function ReflectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ session?: string }>;
}) {
  const { user } = await requireEntitlement("/learn/reflections");
  const { session: openSessionId } = await searchParams;

  const sessions = await listSessions(user.id);
  const openSession = openSessionId
    ? sessions.find((s) => s.id === openSessionId)
    : undefined;

  let initialMessages: PanelMessage[] = [];
  if (openSession) {
    initialMessages = await getMessages(openSession.id, 60);
  }

  return (
    <>
      <PageHeader
        eyebrow="Your Reflective Companion"
        title="Reflections"
        lede="A space to think out loud about your programme — your exercises, your progress, and whatever the course is stirring for you. Not counselling or therapy, and never a substitute for human support — just a gentle companion for the work you are already doing."
      />

      <section className="py-16 px-6 bg-cream">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <ReflectionsPanel
              key={openSession?.id ?? "new"}
              sessionId={openSession?.id}
              initialMessages={initialMessages}
              invitation={
                initialMessages.length === 0
                  ? "Help me reflect on how the programme is going"
                  : undefined
              }
            />
          </Reveal>

          {/* Past conversations, with delete controls */}
          {sessions.length > 0 && (
            <Reveal className="mt-14">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h2 className="font-heading text-2xl font-light text-charcoal">
                  Your Conversations
                </h2>
                <form action={deleteAllReflectionsSessions}>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 font-body text-xs text-muted hover:text-red-600 transition-colors duration-200"
                  >
                    <Trash2 size={13} />
                    Delete all conversations
                  </button>
                </form>
              </div>
              <ul className="space-y-3">
                {sessions.map((session) => (
                  <li
                    key={session.id}
                    className={`flex items-center gap-4 bg-white rounded-xl border px-5 py-4 ${
                      session.id === openSession?.id
                        ? "border-sage"
                        : "border-grey-light"
                    }`}
                  >
                    <MessageCircleHeart
                      size={18}
                      className="text-sage shrink-0"
                      strokeWidth={1.75}
                    />
                    <Link
                      href={`/learn/reflections?session=${session.id}`}
                      className="flex-1 min-w-0"
                    >
                      <span className="block font-body text-sm text-charcoal truncate hover:text-sage-dark transition-colors duration-200">
                        {session.title}
                      </span>
                      <span className="block font-body text-xs text-muted mt-0.5">
                        {formatDate(session.updatedAt)}
                      </span>
                    </Link>
                    <form action={deleteReflectionsSession}>
                      <input
                        type="hidden"
                        name="sessionId"
                        value={session.id}
                      />
                      <button
                        type="submit"
                        className="p-2 rounded-full text-muted hover:text-red-600 hover:bg-cream transition-colors duration-200"
                        aria-label={`Delete conversation ${session.title}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
              <p className="font-body text-xs text-muted mt-6 leading-relaxed">
                Your conversations are encrypted and private to you — no
                therapist or member of the NewFuture team reads them. Deleting
                a conversation removes it permanently. All Reflections data is
                deleted 30 days after your programme access ends.
              </p>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
