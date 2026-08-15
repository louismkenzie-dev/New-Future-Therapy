import { NextResponse, type NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createServerSupabase } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth/session";
import { getEntitlement } from "@/lib/dal/entitlement";
import { getLesson, findExercise } from "@/lib/content/courses";
import { getOwnResponse, getSharedFromPartner } from "@/lib/dal/responses";
import { getActivePartner } from "@/lib/dal/couples";
import {
  REFLECTIONS_SYSTEM_PROMPT,
  buildContextBlock,
  type ExerciseContext,
} from "@/lib/reflections/prompt";
import {
  getOrCreateSession,
  getMessages,
  appendMessage,
  recordSafetyEvent,
} from "@/lib/reflections/dal";

/* NewFuture Reflections chat. Every request re-checks auth and entitlement;
   partner text enters the model context only when BOTH partners have shared
   the exercise (checked here, and enforced again by RLS underneath); a
   safety classifier runs on every inbound message before the model replies.
   The crisis screen itself is fixed UI content — never model output. */

export const maxDuration = 60;
export const preferredRegion = "lhr1";

const CHAT_MODEL = "claude-sonnet-5";
const SAFETY_MODEL = "claude-haiku-4-5";
const MAX_MESSAGE_CHARS = 4000;

interface ChatRequest {
  sessionId?: string;
  courseId?: string;
  lessonId?: string;
  exerciseId?: string;
  message?: string;
}

function anthropic(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  return new Anthropic();
}

/* Three-way tier on the raw inbound message only, so the classification can
   never be reframed by conversation context. Recall-first: a false positive
   costs one gentle support screen. */
async function classifySafety(
  client: Anthropic,
  message: string
): Promise<"none" | "vulnerability" | "immediate"> {
  try {
    const result = await client.messages.create({
      model: SAFETY_MODEL,
      max_tokens: 8,
      system: `You classify one message from an adult using a relationship-education platform. Reply with exactly one word.

immediate — mentions of suicide, wanting to die, self-harm intent, immediate danger from another person, a medical emergency, or harm to a child.
vulnerability — significant distress, fear of a partner, coercion or control, abuse that is not an immediate emergency, disclosure of being under 18, or clearly worsening mental health.
none — everything else, including ordinary sadness, conflict and frustration.

When genuinely unsure between two tiers, choose the more serious one. Reply with only: none, vulnerability, or immediate.`,
      messages: [{ role: "user", content: message }],
    });
    const text =
      result.content[0]?.type === "text"
        ? result.content[0].text.trim().toLowerCase()
        : "";
    if (text.includes("immediate")) return "immediate";
    if (text.includes("vulnerability")) return "vulnerability";
    return "none";
  } catch {
    // Classifier failure must not block support — fall through as none and
    // rely on the main model's trained caution.
    return "none";
  }
}

function formatResponseData(data: {
  texts?: Record<string, string>;
  choices?: Record<string, string[]>;
  answers?: string[];
}): string {
  const parts: string[] = [];
  if (data.answers?.length) {
    parts.push(...data.answers.filter(Boolean).map((a) => `- ${a}`));
  }
  for (const [key, value] of Object.entries(data.texts ?? {})) {
    parts.push(`- ${key}: ${value}`);
  }
  for (const [key, value] of Object.entries(data.choices ?? {})) {
    parts.push(`- ${key}: ${value.join(", ")}`);
  }
  return parts.join("\n");
}

async function loadExerciseContext(
  userId: string,
  courseId: string,
  lessonId: string,
  exerciseId: string
): Promise<ExerciseContext | null> {
  const entry = getLesson(courseId, lessonId);
  const block = findExercise(courseId, lessonId, exerciseId);
  if (!entry || !block || !("title" in block)) return null;

  const own = await getOwnResponse(userId, courseId, exerciseId);

  /* Partner answers are included only when BOTH sides have shared this
     exercise. getSharedFromPartner is already limited by RLS to rows the
     partner explicitly shared within an active couple. */
  let partnerAnswers: string | null = null;
  let partnerName: string | null = null;
  if (own?.isShared) {
    const partner = await getActivePartner(userId);
    if (partner) {
      const shared = await getSharedFromPartner(userId);
      const match = shared.find((r) => r.exerciseId === exerciseId);
      if (match) {
        partnerAnswers = formatResponseData(match.data);
        partnerName = partner.name;
      }
    }
  }

  return {
    lessonTitle: entry.lesson.title,
    exerciseTitle: block.title,
    ownAnswers: own ? formatResponseData(own.data) : "",
    partnerName,
    partnerAnswers,
  };
}

export async function POST(request: NextRequest): Promise<Response> {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ kind: "unauthenticated" }, { status: 401 });
  }
  const entitlement = await getEntitlement(
    user.id,
    user.profile.complimentaryAccess
  );
  if (!entitlement.active) {
    return NextResponse.json({ kind: "unentitled" }, { status: 403 });
  }

  const client = anthropic();
  if (!client) {
    return NextResponse.json({ kind: "unavailable" }, { status: 503 });
  }

  let body: ChatRequest;
  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return NextResponse.json({ kind: "bad_request" }, { status: 400 });
  }
  const message = (body.message ?? "").trim().slice(0, MAX_MESSAGE_CHARS);
  if (!message) {
    return NextResponse.json({ kind: "bad_request" }, { status: 400 });
  }

  // Session (retained transcript with delete controls — the chosen default).
  let title = "Reflections";
  let exerciseContext: ExerciseContext | null = null;
  if (body.courseId && body.lessonId && body.exerciseId) {
    exerciseContext = await loadExerciseContext(
      user.id,
      body.courseId,
      body.lessonId,
      body.exerciseId
    );
    if (exerciseContext) title = exerciseContext.exerciseTitle;
  }
  const session = await getOrCreateSession(user.id, {
    sessionId: body.sessionId,
    courseId: body.courseId,
    lessonId: body.lessonId,
    exerciseId: body.exerciseId,
    title,
  });
  if (!session) {
    return NextResponse.json({ kind: "bad_request" }, { status: 400 });
  }

  // Safety tier before anything else. The crisis screen is fixed UI content.
  const tier = await classifySafety(client, message);
  if (tier === "immediate") {
    await Promise.all([
      recordSafetyEvent("immediate"),
      appendMessage(session.id, "user", message),
    ]);
    return NextResponse.json({ kind: "crisis", sessionId: session.id });
  }

  const history = await getMessages(session.id);
  await appendMessage(session.id, "user", message);

  const systemBlocks: Anthropic.TextBlockParam[] = [
    {
      type: "text",
      text: REFLECTIONS_SYSTEM_PROMPT,
      cache_control: { type: "ephemeral" },
    },
    { type: "text", text: buildContextBlock(exerciseContext) },
  ];
  if (tier === "vulnerability") {
    await recordSafetyEvent("vulnerability");
    systemBlocks.push({
      type: "text",
      text: "# For this reply\nThe participant may be in a vulnerable moment. Keep your reply especially short and gentle. Do not interpret, label or suggest intensifying exercises. Do not suggest joint or partner exercises. Name your limits softly and encourage support from a trusted person, their GP or a qualified therapist, alongside at most one gentle grounding suggestion.",
    });
  }
  if (user.profile.displayName) {
    systemBlocks.push({
      type: "text",
      text: `# Participant\nThey have asked to be called ${user.profile.displayName}. Their pronouns are ${user.profile.pronouns ?? "not stated — use they/them"}.`,
    });
  }

  const messages: Anthropic.MessageParam[] = [
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: "user" as const, content: message },
  ];

  const encoder = new TextEncoder();
  const sessionId = session.id;
  // Request-scoped client captured now, so the assistant turn can be saved
  // after the stream closes (cookie scope is unavailable by then).
  const persistClient = await createServerSupabase();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let full = "";
      try {
        const modelStream = client.messages.stream({
          model: CHAT_MODEL,
          max_tokens: 1024,
          system: systemBlocks,
          messages,
        });
        for await (const event of modelStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            full += event.delta.text;
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        await modelStream.finalMessage();
      } catch (error) {
        console.error("Reflections stream failed:", error);
        if (!full) {
          controller.enqueue(
            encoder.encode(
              "I am sorry — something went wrong on my side just now. Your words have been kept safely; please try again in a moment."
            )
          );
        }
      } finally {
        if (full) {
          try {
            await appendMessage(sessionId, "assistant", full, persistClient);
          } catch (error) {
            console.error("Reflections persist failed:", error);
          }
        }
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Reflections-Session": sessionId,
    },
  });
}
