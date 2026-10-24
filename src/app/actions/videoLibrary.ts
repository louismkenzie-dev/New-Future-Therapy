"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/adminAuth";
import { deleteVideo } from "@/lib/courseEditor/videoLibrary";

export async function removeVideo(formData: FormData): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
  const assetId = String(formData.get("assetId") ?? "");
  if (!/^[A-Za-z0-9]{10,80}$/.test(assetId)) redirect("/admin/course/videos?result=error");
  let result: string;
  try {
    result = await deleteVideo(assetId);
  } catch (err) {
    console.error("Mux delete failed:", err);
    result = "error";
  }
  revalidatePath("/admin/course", "layout");
  revalidatePath("/learn", "layout");
  redirect(`/admin/course/videos?result=${result}`);
}
