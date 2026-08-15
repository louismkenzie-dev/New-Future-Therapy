"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/session";
import { deleteSession, deleteAllSessions } from "@/lib/reflections/dal";

/* Participant delete controls for retained Reflections transcripts.
   Deletion is a hard delete of the encrypted rows. */

export async function deleteReflectionsSession(
  formData: FormData
): Promise<void> {
  const user = await requireUser("/learn/reflections");
  const sessionId = formData.get("sessionId")?.toString() ?? "";
  if (sessionId) await deleteSession(user.id, sessionId);
  revalidatePath("/learn/reflections");
}

export async function deleteAllReflectionsSessions(): Promise<void> {
  const user = await requireUser("/learn/reflections");
  await deleteAllSessions(user.id);
  revalidatePath("/learn/reflections");
}
