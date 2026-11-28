"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/adminAuth";
import { rotateTesterPageKey, setTesterCap } from "@/lib/testers";

/* Team controls for the private tester page. */

export async function changeTesterLink(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
  await rotateTesterPageKey();
  revalidatePath("/admin/testers");
}

export async function updateTesterCap(formData: FormData): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
  const cap = Number(formData.get("cap"));
  if (Number.isInteger(cap) && cap >= 0 && cap <= 10_000) await setTesterCap(cap);
  revalidatePath("/admin/testers");
}
