import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import type { LessonBlock } from "@/lib/content/courses";
import { normaliseBlocks } from "@/lib/content/courses/validate";
import { module01 } from "@/lib/content/courses/growing-together/module01";
import { module00 } from "@/lib/content/courses/growing-together/module00";

/* Turns the therapists' raw material (a script, a question sheet, a
   worksheet) into a formatted lesson — the same block structure the
   hand-built Introduction and Module 1 use — with Claude. The model is
   forced to answer through a tool call, so the output is always JSON, and
   everything it returns is run through the block validator before it is
   stored. */

const FORMAT_MODEL = "claude-sonnet-5";

export interface LessonDraft {
  title: string;
  summary: string;
  estimatedMinutes: number;
  blocks: LessonBlock[];
}

const BLOCK_CATALOGUE = `
BLOCK KINDS (JSON objects; "kind" is required):

Reading
- prose: { kind:"prose", heading?:string, body:string } — body is paragraphs separated by blank lines; a paragraph whose every line starts "- " renders as a list. KEEP TO 2–3 SHORT PARAGRAPHS; split long text into other block kinds.
- quote: { kind:"quote", text:string, attribution?:string } — a pull quote in the therapists' words.
- callout: { kind:"callout", icon?:ICON, title:string, body:string, tone?:"sage"|"dark" } — short emphasised band; "dark" only for safety warnings.
- photo: { kind:"photo", src:"/photos/twins-laptop.jpg", alt:string, caption?:string } — only this one photo path exists.

Looking and tapping
- iconCards: { kind:"iconCards", heading?:string, intro?:string, columns?:2|3|4, items:[{ icon:ICON, title:string, body?:string }] } — 3–6 short cards. Use for lists of themes, benefits, "what you will find".
- flow: { kind:"flow", heading?:string, intro?:string, steps:[{ icon:ICON, title:string, body?:string }] } — a numbered journey of 3 steps (beginning/middle/now; answer/share/come back together).
- accordion: { kind:"accordion", heading?:string, intro?:string, items:[{ icon?:ICON, title:string, body:string }] } — click-to-open sections for cautions and "look after yourself" material.
- contrast: { kind:"contrast", heading?:string, intro?:string, columns:[{ label:string, icon?:ICON, items:[string], tone?:"muted"|"sage" }, { ... }], note?:string } — two columns set against each other ("It is / It is not", "Instead of saying / Try"). Put the encouraged side second with tone "sage".
- flipCards: { kind:"flipCards", heading?:string, intro?:string, items:[{ frontLabel?:string, front:string, backLabel?:string, back:string }] } — the same moment seen from each partner's side; tap to turn.
- tapChoice: { kind:"tapChoice", exerciseId:string, title:string, intro?:string, questions:[{ id:string, text:string, options:[{ value:string, label:string, response:string }] }] } — one gentle question, 3–5 options, each with a warm one-or-two sentence response drawn from the material. Never scored. ONE question per block.

Video
- video: { kind:"video", title?:string, playbackId:"", durationSeconds:number } — playbackId is always "" (the team attaches the video afterwards). Add one at the top when the material is a video script.

Reflection (saved to the member's account)
- pairedReflection: { kind:"pairedReflection", exerciseId:string, eyebrow?:string, title:string, intro?:string, order?:"individualFirst"|"togetherFirst", individual:{ title:string, intro?:string, questions:[{ id:string, label:string, hint?:string, scale?:{ low:string, high:string } }] }, together:{ title:string, intro?:string, steps?:[string], questions:[{ id:string, label:string, hint?:string }] }, compare?:{ [myQuestionId]: partnerQuestionId }, revealNote?:string, closing?:{ text:string } }
  THE PROGRAMME'S SIGNATURE ACTIVITY. Use whenever the material has questions each partner answers individually and then questions to discuss together ("Individual Reflection" / "Coming Back Together" / "Couples Conversation"). Put the therapists' follow-on prompts ("Where did we meet? How did we first get in contact?…") in hint. Use scale for "How am I? 1–10" style check-ins, and compare when "how I think you are" should sit beside the partner's "how am I".
- journal: { kind:"journal", exerciseId, title, intro?, prompts:[string] } — private free writing, 2–4 prompts. Use for individual-only reflection with no partner sharing.
- sharedJournal: same shape plus partnerNote:string — free writing the member may share.
- checkin: { kind:"checkin", exerciseId, title, intro?, cadence?:"once"|"weekly"|"monthly", fields:[{ id, label, type:"scale"|"text"|"choices", options?:[string] }] } — sliders and short answers, individual only.
- worksheet: { kind:"worksheet", exerciseId, title, intro?, fields:[{ id, label, type:"text"|"scale"|"choices", options?, hint?, section? }], coupleSection?:{ title, intro, groundRules:[string], fields:[{ id, label }] }, partnerNote:string, closing?:{ heading, body, question, pull } } — a mixed-field worksheet; prefer pairedReflection for anything with an individual-then-together shape.

ICON must be one of: book-open-text, calendar-clock, compass, ear, eye, flame, hand-heart, heart, heart-handshake, hourglass, leaf, lightbulb, lock, message-circle, messages-square, milestone, mountain, pause-circle, pen-line, refresh-cw, route, search, shield, shield-alert, shield-check, sparkles, sprout, sun, tree-deciduous, trending-up, users, wind.
`;

const HOUSE_STYLE = `
VOICE AND STYLE (hard rules)
- These are Laura and Esther's own words. Preserve their meaning, order and phrasing; you may tidy, split and re-house the text, never rewrite its substance or add advice they did not give. Do not invent questions, exercises or claims. Where you write connective copy (card titles, tap-choice responses, intros), keep it brief, warm and drawn from the material.
- First-person plural "we" to "you". Warm, professional, British English (specialising, non-judgemental, programme).
- NO CONTRACTIONS in body copy: "do not", "you are", "we have", "it is".
- Title Case for headings, titles and button-like labels; sentence case for body text.
- Inclusive by default: partner/couple language, no gendered assumptions, LGBTQIA+ (never LGBTQ+). Adults of all ages.
- No emoji, no symbols as icons — icons only from the ICON list.
- Video scripts: drop speaker names (LAURA:/ESTHER:), stage directions and notes to the developer (e.g. "amend when Louis logins"); merge the two voices into one "we".
- Reassuring throughout: no pressure, no right answers, go at your own pace.

SHAPE OF A GOOD LESSON
- Open with a video block if the material is a script, then 2–3 short prose paragraphs of welcome/orientation.
- Break every long stretch of text into things to look at, open or tap: iconCards for lists of themes, flow for journeys or how-it-works, accordion for cautions, contrast for "not this / but this", flipCards for two-sided moments, one tapChoice where the material invites the reader to notice something about themselves.
- End activities with a pairedReflection (individual questions then together questions) whenever the material has them; use its closing for the therapists' final line.
- 8–16 blocks for a full lesson; fewer for a short worksheet. Never a single giant prose block.
- estimatedMinutes: reading ≈ 200 words/min; add 10–15 minutes per reflection activity; videos by their length if known.
- exerciseId and question ids: short kebab-case, unique within the lesson.
`;

function exemplar(): string {
  const welcome = module00.lessons[0];
  const part1 = module01.lessons[0];
  const trim = (lesson: typeof part1) => ({
    title: lesson.title,
    summary: lesson.summary,
    estimatedMinutes: lesson.estimatedMinutes,
    blocks: lesson.blocks,
  });
  return `EXEMPLAR 1 — the Welcome lesson, built from the therapists' "Intro Written Instructions" document:\n${JSON.stringify(trim(welcome), null, 1)}\n\nEXEMPLAR 2 — Module 1 Part 1, built from a two-voice video script plus a question sheet:\n${JSON.stringify(trim(part1), null, 1)}`;
}

const SYSTEM = `You format course material for NewFuture Therapy's online Couples Relationship Programme, written by Laura and Esther (identical twins, counsellors and couples therapists in Yorkshire). Members complete it on their phones, one snippet at a time, often as a couple with linked accounts.

You receive their raw material (documents, scripts, question sheets) and return ONE lesson as JSON through the emit_lesson tool: a title, a one-sentence summary, estimated minutes, and an ordered list of blocks.
${BLOCK_CATALOGUE}
${HOUSE_STYLE}

${exemplar()}`;

const LESSON_TOOL: Anthropic.Tool = {
  name: "emit_lesson",
  description: "Return the formatted lesson.",
  input_schema: {
    type: "object",
    properties: {
      title: { type: "string" },
      summary: { type: "string", description: "One sentence, no contractions." },
      estimatedMinutes: { type: "integer" },
      blocks: {
        type: "array",
        items: { type: "object", properties: { kind: { type: "string" } }, required: ["kind"] },
      },
    },
    required: ["title", "summary", "estimatedMinutes", "blocks"],
  },
};

function client(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("The formatter is not configured (ANTHROPIC_API_KEY is missing).");
  }
  return new Anthropic();
}

async function callFormatter(userMessage: string): Promise<LessonDraft> {
  const response = await client().messages.create({
    model: FORMAT_MODEL,
    max_tokens: 16000,
    system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
    tools: [LESSON_TOOL],
    tool_choice: { type: "tool", name: "emit_lesson" },
    messages: [{ role: "user", content: userMessage }],
  });

  const call = response.content.find((c) => c.type === "tool_use");
  if (!call || call.type !== "tool_use") throw new Error("The formatter returned nothing usable.");
  const input = call.input as Record<string, unknown>;
  const blocks = normaliseBlocks(input.blocks);
  if (blocks.length === 0) throw new Error("The formatter could not build any sections from that material.");
  return {
    title: typeof input.title === "string" && input.title.trim() ? input.title.trim() : "Untitled lesson",
    summary: typeof input.summary === "string" ? input.summary.trim() : "",
    estimatedMinutes: typeof input.estimatedMinutes === "number" ? Math.max(5, Math.round(input.estimatedMinutes)) : 20,
    blocks,
  };
}

export async function formatFromSource(input: {
  sources: { name: string; text: string }[];
  moduleTitle: string;
  notes?: string;
}): Promise<LessonDraft> {
  const material = input.sources
    .map((s) => `<document name="${s.name}">\n${s.text}\n</document>`)
    .join("\n\n");
  const message = `Module: ${input.moduleTitle}
${input.notes ? `Notes from Laura and Esther about this lesson: ${input.notes}\n` : ""}
Format the following material into one lesson.

${material}`;
  return callFormatter(message);
}

export async function refineDraft(input: {
  current: LessonDraft;
  instruction: string;
  sourceText?: string | null;
}): Promise<LessonDraft> {
  const message = `Here is the current lesson as JSON:
${JSON.stringify({ title: input.current.title, summary: input.current.summary, estimatedMinutes: input.current.estimatedMinutes, blocks: input.current.blocks })}
${input.sourceText ? `\nThe original material it was built from, for reference:\n<document>\n${input.sourceText}\n</document>\n` : ""}
Laura and Esther ask for this change: "${input.instruction}"

Apply the change and return the whole lesson again. Keep everything they did not ask you to change exactly as it is — including exerciseId and question ids, which members' saved answers depend on. Keep any playbackId values.`;
  return callFormatter(message);
}
