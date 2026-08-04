"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { del } from "@vercel/blob";
import { isAdmin } from "@/lib/adminAuth";
import {
  createCategory,
  renameCategory,
  deleteCategory,
  createResource,
  updateResource,
  deleteResource,
  getResourceById,
  type ResourceInput,
  type ResourceType,
} from "@/lib/dal/resources";

/* Admin-only mutations for the client resource library. Every action
   re-checks the team session — server actions are open POST endpoints. */

export interface ResourceFormState {
  error?: string;
}

function revalidateLibrary(): void {
  revalidatePath("/resources", "layout");
  revalidatePath("/admin/resources", "layout");
}

async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
}

/* Best-effort blob cleanup — a leftover file must never block the save. */
async function deleteBlob(url: string | null): Promise<void> {
  if (!url) return;
  try {
    await del(url);
  } catch {
    /* ignore */
  }
}

/* ------------------------------- Folders --------------------------------- */

export async function addFolder(formData: FormData): Promise<void> {
  await requireAdmin();
  const name = formData.get("name")?.toString().trim() ?? "";
  if (name === "") return;
  await createCategory(name);
  revalidateLibrary();
}

export async function renameFolder(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = formData.get("id")?.toString() ?? "";
  const name = formData.get("name")?.toString().trim() ?? "";
  if (id === "" || name === "") return;
  await renameCategory(id, name);
  revalidateLibrary();
}

export async function removeFolder(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = formData.get("id")?.toString() ?? "";
  if (id === "") return;
  await deleteCategory(id);
  revalidateLibrary();
}

/* ------------------------------ Resources -------------------------------- */

function parseResourceForm(formData: FormData): ResourceInput | string {
  const title = formData.get("title")?.toString().trim() ?? "";
  if (title === "") return "Please give the resource a title.";

  const description = formData.get("description")?.toString().trim() ?? "";
  const typeRaw = formData.get("resourceType")?.toString() ?? "worksheet";
  const resourceType: ResourceType =
    typeRaw === "factsheet" || typeRaw === "article" ? typeRaw : "worksheet";

  const mode = formData.get("contentMode")?.toString() ?? "upload";
  const body = formData.get("body")?.toString().trim() ?? "";
  const fileUrl = formData.get("fileUrl")?.toString() || null;
  const filePath = formData.get("filePath")?.toString() || null;
  const fileName = formData.get("fileName")?.toString() || null;
  const fileSizeRaw = Number(formData.get("fileSize")?.toString() ?? "");
  const fileSize = Number.isFinite(fileSizeRaw) && fileSizeRaw > 0 ? fileSizeRaw : null;

  if (mode === "write") {
    if (body === "")
      return "Please write the resource content, or switch to a PDF upload.";
    return {
      title,
      description,
      resourceType,
      body,
      fileUrl: null,
      filePath: null,
      fileName: null,
      fileSize: null,
      published: formData.get("published") === "on",
      categoryIds: formData.getAll("categories").map(String),
    };
  }

  if (!fileUrl)
    return "Please upload a PDF, or switch to writing the content instead.";
  return {
    title,
    description,
    resourceType,
    body: null,
    fileUrl,
    filePath,
    fileName,
    fileSize,
    published: formData.get("published") === "on",
    categoryIds: formData.getAll("categories").map(String),
  };
}

export async function saveResource(
  formData: FormData
): Promise<ResourceFormState> {
  await requireAdmin();

  const parsed = parseResourceForm(formData);
  if (typeof parsed === "string") return { error: parsed };

  const id = formData.get("id")?.toString() || null;
  try {
    if (id) {
      const existing = await getResourceById(id);
      if (!existing) return { error: "This resource no longer exists." };
      await updateResource(id, parsed);
      // Remove the old file once it has been replaced or swapped for writing.
      if (existing.fileUrl && existing.fileUrl !== parsed.fileUrl) {
        await deleteBlob(existing.fileUrl);
      }
    } else {
      await createResource(parsed);
    }
  } catch (err) {
    return {
      error:
        err instanceof Error ? err.message : "Something went wrong while saving.",
    };
  }

  revalidateLibrary();
  redirect("/admin/resources");
}

export async function removeResource(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = formData.get("id")?.toString() ?? "";
  if (id === "") return;
  const existing = await getResourceById(id);
  if (!existing) return;
  await deleteResource(id);
  await deleteBlob(existing.fileUrl);
  revalidateLibrary();
}

export async function togglePublished(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = formData.get("id")?.toString() ?? "";
  const publish = formData.get("publish") === "true";
  if (id === "") return;
  const existing = await getResourceById(id);
  if (!existing) return;
  await updateResource(id, {
    title: existing.title,
    description: existing.description,
    resourceType: existing.resourceType,
    body: existing.body,
    fileUrl: existing.fileUrl,
    filePath: existing.filePath,
    fileName: existing.fileName,
    fileSize: existing.fileSize,
    published: publish,
    categoryIds: existing.categoryIds,
  });
  revalidateLibrary();
}
