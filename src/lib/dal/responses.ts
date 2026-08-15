import "server-only";
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { createServerSupabase } from "@/lib/supabase/server";

/* Exercise responses. Free-text answers are AES-256-GCM encrypted inside the
   jsonb content column before they leave the app, so raw database access
   yields no readable journaling. Non-prose values (quiz selections, scales,
   choices) stay plaintext for potential aggregate insight.

   Encryption and decryption live entirely in this module — callers never see
   ciphertext. RLS governs which rows are visible (own rows, plus a partner's
   rows where is_shared and the couple is active). */

export type ExerciseKind =
  | "journal"
  | "quiz"
  | "checkin"
  | "shared_journal"
  | "worksheet";

export interface ResponseData {
  /** journal / sharedJournal: one entry per prompt */
  answers?: string[];
  /** quiz: question id -> chosen profile id */
  selections?: Record<string, string>;
  /** checkin: field id -> 1..10 */
  scales?: Record<string, number>;
  /** checkin: field id -> free text */
  texts?: Record<string, string>;
  /** checkin: field id -> chosen options */
  choices?: Record<string, string[]>;
}

export interface ResponseRecord {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  exerciseId: string;
  kind: ExerciseKind;
  data: ResponseData;
  isShared: boolean;
  sharedAt: string | null;
  updatedAt: string;
}

function encryptionKey(): Buffer {
  const hex =
    process.env.RESPONSES_SECRET ?? process.env.SUBMISSIONS_SECRET ?? "";
  if (hex.length !== 64) {
    throw new Error(
      "RESPONSES_SECRET (or SUBMISSIONS_SECRET) must be a 32-byte hex string"
    );
  }
  return Buffer.from(hex, "hex");
}

function encrypt(plain: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), enc]).toString("hex");
}

function decrypt(hex: string): string {
  const payload = Buffer.from(hex, "hex");
  const iv = payload.subarray(0, 12);
  const tag = payload.subarray(12, 28);
  const enc = payload.subarray(28);
  const decipher = createDecipheriv("aes-256-gcm", encryptionKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(enc), decipher.final()]).toString(
    "utf8"
  );
}

interface StoredContent {
  plain?: Pick<ResponseData, "selections" | "scales" | "choices">;
  enc?: string; // encrypted JSON of { answers?, texts? }
}

function toStored(data: ResponseData): StoredContent {
  const stored: StoredContent = {};
  const { answers, texts, selections, scales, choices } = data;
  if (selections || scales || choices) {
    stored.plain = {
      ...(selections ? { selections } : {}),
      ...(scales ? { scales } : {}),
      ...(choices ? { choices } : {}),
    };
  }
  if ((answers && answers.length) || (texts && Object.keys(texts).length)) {
    stored.enc = encrypt(
      JSON.stringify({
        ...(answers ? { answers } : {}),
        ...(texts ? { texts } : {}),
      })
    );
  }
  return stored;
}

function fromStored(content: unknown): ResponseData {
  const stored = (content ?? {}) as StoredContent;
  const data: ResponseData = { ...(stored.plain ?? {}) };
  if (stored.enc) {
    try {
      const secret = JSON.parse(decrypt(stored.enc)) as {
        answers?: string[];
        texts?: Record<string, string>;
      };
      if (secret.answers) data.answers = secret.answers;
      if (secret.texts) data.texts = secret.texts;
    } catch {
      // Unreadable ciphertext (rotated key?) — surface empty rather than crash.
    }
  }
  return data;
}

interface ResponseRow {
  id: string;
  user_id: string;
  course_id: string;
  lesson_id: string;
  exercise_id: string;
  exercise_kind: ExerciseKind;
  content: unknown;
  is_shared: boolean;
  shared_at: string | null;
  updated_at: string;
}

function mapRow(row: ResponseRow): ResponseRecord {
  return {
    id: row.id,
    userId: row.user_id,
    courseId: row.course_id,
    lessonId: row.lesson_id,
    exerciseId: row.exercise_id,
    kind: row.exercise_kind,
    data: fromStored(row.content),
    isShared: row.is_shared,
    sharedAt: row.shared_at,
    updatedAt: row.updated_at,
  };
}

const SELECT_COLUMNS =
  "id, user_id, course_id, lesson_id, exercise_id, exercise_kind, content, is_shared, shared_at, updated_at";

/* Upsert the signed-in member's response. is_shared is intentionally not
   touched here — sharing is a separate, explicit act. */
export async function saveResponse(
  userId: string,
  courseId: string,
  lessonId: string,
  exerciseId: string,
  kind: ExerciseKind,
  data: ResponseData
): Promise<void> {
  const supabase = await createServerSupabase();
  const { error } = await supabase.from("exercise_responses").upsert(
    {
      user_id: userId,
      course_id: courseId,
      lesson_id: lessonId,
      exercise_id: exerciseId,
      exercise_kind: kind,
      content: toStored(data),
    },
    { onConflict: "user_id,course_id,lesson_id,exercise_id" }
  );
  if (error) throw new Error(`Saving response failed: ${error.message}`);
}

/* The signed-in member's own responses for one lesson. */
export async function getOwnResponsesForLesson(
  userId: string,
  courseId: string,
  lessonId: string
): Promise<Map<string, ResponseRecord>> {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("exercise_responses")
    .select(SELECT_COLUMNS)
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .eq("lesson_id", lessonId);

  const map = new Map<string, ResponseRecord>();
  for (const row of (data ?? []) as ResponseRow[]) {
    map.set(row.exercise_id, mapRow(row));
  }
  return map;
}

/* One of the member's own responses, by exercise (e.g. the Module 1 baseline
   shown alongside its Module 10 retake). */
export async function getOwnResponse(
  userId: string,
  courseId: string,
  exerciseId: string
): Promise<ResponseRecord | null> {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("exercise_responses")
    .select(SELECT_COLUMNS)
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .eq("exercise_id", exerciseId)
    .maybeSingle();
  return data ? mapRow(data as ResponseRow) : null;
}

/* Responses by id, filtered by RLS visibility — used by learning-path
   bookmarks, where an unshared or unlinked source simply disappears. */
export async function getVisibleResponsesByIds(
  ids: string[]
): Promise<Map<string, ResponseRecord>> {
  const map = new Map<string, ResponseRecord>();
  if (ids.length === 0) return map;

  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("exercise_responses")
    .select(SELECT_COLUMNS)
    .in("id", ids);

  for (const row of (data ?? []) as ResponseRow[]) {
    map.set(row.id, mapRow(row));
  }
  return map;
}

/* Responses the member's active partner has shared with them. RLS does the
   heavy lifting: only is_shared rows from the active partner are visible. */
export async function getSharedFromPartner(
  userId: string
): Promise<ResponseRecord[]> {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("exercise_responses")
    .select(SELECT_COLUMNS)
    .neq("user_id", userId)
    .eq("is_shared", true)
    .order("shared_at", { ascending: false });
  return ((data ?? []) as ResponseRow[]).map(mapRow);
}
