import "server-only";
import { supabaseAnon, supabaseAdmin } from "@/lib/supabase";

/* Client resource library data access.
   Public reads use the anon client (RLS: published resources only).
   Admin reads/writes use the service-role client, guarded by isAdmin() in
   every page and action that calls in here. */

export type ResourceType = "worksheet" | "factsheet" | "article";

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  worksheet: "Worksheet",
  factsheet: "Factsheet",
  article: "Article",
};

export interface ResourceCategory {
  id: string;
  slug: string;
  name: string;
  sortOrder: number;
  resourceCount: number;
}

export interface Resource {
  id: string;
  slug: string;
  title: string;
  description: string;
  resourceType: ResourceType;
  body: string | null;
  fileUrl: string | null;
  filePath: string | null;
  fileName: string | null;
  fileSize: number | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  categoryIds: string[];
}

interface ResourceRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  resource_type: ResourceType;
  body: string | null;
  file_url: string | null;
  file_path: string | null;
  file_name: string | null;
  file_size: number | null;
  published: boolean;
  created_at: string;
  updated_at: string;
  resource_category_links: { category_id: string }[];
}

const RESOURCE_SELECT =
  "id, slug, title, description, resource_type, body, file_url, file_path, file_name, file_size, published, created_at, updated_at, resource_category_links(category_id)";

function mapResource(row: ResourceRow): Resource {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    resourceType: row.resource_type,
    body: row.body,
    fileUrl: row.file_url,
    filePath: row.file_path,
    fileName: row.file_name,
    fileSize: row.file_size,
    published: row.published,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    categoryIds: (row.resource_category_links ?? []).map((l) => l.category_id),
  };
}

interface CategoryRow {
  id: string;
  slug: string;
  name: string;
  sort_order: number;
}

function mapCategories(
  rows: CategoryRow[],
  resources: Resource[]
): ResourceCategory[] {
  const counts = new Map<string, number>();
  for (const resource of resources) {
    for (const id of resource.categoryIds) {
      counts.set(id, (counts.get(id) ?? 0) + 1);
    }
  }
  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    sortOrder: row.sort_order,
    resourceCount: counts.get(row.id) ?? 0,
  }));
}

/* ------------------------------- Public reads ---------------------------- */

export async function listPublishedResources(): Promise<Resource[]> {
  const { data, error } = await supabaseAnon()
    .from("resources")
    .select(RESOURCE_SELECT)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Failed to load resources: ${error.message}`);
  return ((data ?? []) as unknown as ResourceRow[]).map(mapResource);
}

export async function getPublishedResource(
  slug: string
): Promise<Resource | null> {
  const { data, error } = await supabaseAnon()
    .from("resources")
    .select(RESOURCE_SELECT)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`Failed to load resource: ${error.message}`);
  return data ? mapResource(data as unknown as ResourceRow) : null;
}

export async function listPublicCategories(): Promise<ResourceCategory[]> {
  const [{ data, error }, resources] = await Promise.all([
    supabaseAnon()
      .from("resource_categories")
      .select("id, slug, name, sort_order")
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true }),
    listPublishedResources(),
  ]);
  if (error) throw new Error(`Failed to load categories: ${error.message}`);
  return mapCategories((data ?? []) as CategoryRow[], resources);
}

/* ------------------------------- Admin reads ----------------------------- */

export async function listAllResources(): Promise<Resource[]> {
  const { data, error } = await supabaseAdmin()
    .from("resources")
    .select(RESOURCE_SELECT)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Failed to load resources: ${error.message}`);
  return ((data ?? []) as unknown as ResourceRow[]).map(mapResource);
}

export async function getResourceById(id: string): Promise<Resource | null> {
  const { data, error } = await supabaseAdmin()
    .from("resources")
    .select(RESOURCE_SELECT)
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`Failed to load resource: ${error.message}`);
  return data ? mapResource(data as unknown as ResourceRow) : null;
}

export async function listAllCategories(): Promise<ResourceCategory[]> {
  const admin = supabaseAdmin();
  const [{ data, error }, resources] = await Promise.all([
    admin
      .from("resource_categories")
      .select("id, slug, name, sort_order")
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true }),
    listAllResources(),
  ]);
  if (error) throw new Error(`Failed to load categories: ${error.message}`);
  return mapCategories((data ?? []) as CategoryRow[], resources);
}

/* ------------------------------- Admin writes ---------------------------- */

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/* Appends -2, -3… until the slug is free in the given table. */
async function uniqueSlug(
  table: "resources" | "resource_categories",
  base: string,
  excludeId?: string
): Promise<string> {
  const admin = supabaseAdmin();
  const fallback = base || "untitled";
  for (let attempt = 0; attempt < 50; attempt++) {
    const candidate = attempt === 0 ? fallback : `${fallback}-${attempt + 1}`;
    let query = admin.from(table).select("id").eq("slug", candidate);
    if (excludeId) query = query.neq("id", excludeId);
    const { data, error } = await query.limit(1);
    if (error) throw new Error(`Slug check failed: ${error.message}`);
    if (!data || data.length === 0) return candidate;
  }
  throw new Error("Could not find a free slug");
}

export async function createCategory(name: string): Promise<void> {
  const admin = supabaseAdmin();
  const slug = await uniqueSlug("resource_categories", slugify(name));
  const { error } = await admin
    .from("resource_categories")
    .insert({ name, slug, sort_order: 500 });
  if (error) throw new Error(`Failed to create folder: ${error.message}`);
}

export async function renameCategory(id: string, name: string): Promise<void> {
  const { error } = await supabaseAdmin()
    .from("resource_categories")
    .update({ name })
    .eq("id", id);
  if (error) throw new Error(`Failed to rename folder: ${error.message}`);
}

export async function deleteCategory(id: string): Promise<void> {
  const { error } = await supabaseAdmin()
    .from("resource_categories")
    .delete()
    .eq("id", id);
  if (error) throw new Error(`Failed to delete folder: ${error.message}`);
}

export interface ResourceInput {
  title: string;
  description: string;
  resourceType: ResourceType;
  body: string | null;
  fileUrl: string | null;
  filePath: string | null;
  fileName: string | null;
  fileSize: number | null;
  published: boolean;
  categoryIds: string[];
}

async function setResourceCategories(
  resourceId: string,
  categoryIds: string[]
): Promise<void> {
  const admin = supabaseAdmin();
  const { error: clearError } = await admin
    .from("resource_category_links")
    .delete()
    .eq("resource_id", resourceId);
  if (clearError)
    throw new Error(`Failed to update folders: ${clearError.message}`);
  if (categoryIds.length === 0) return;
  const { error } = await admin.from("resource_category_links").insert(
    categoryIds.map((categoryId) => ({
      resource_id: resourceId,
      category_id: categoryId,
    }))
  );
  if (error) throw new Error(`Failed to update folders: ${error.message}`);
}

export async function createResource(input: ResourceInput): Promise<string> {
  const admin = supabaseAdmin();
  const slug = await uniqueSlug("resources", slugify(input.title));
  const { data, error } = await admin
    .from("resources")
    .insert({
      slug,
      title: input.title,
      description: input.description,
      resource_type: input.resourceType,
      body: input.body,
      file_url: input.fileUrl,
      file_path: input.filePath,
      file_name: input.fileName,
      file_size: input.fileSize,
      published: input.published,
    })
    .select("id")
    .single();
  if (error || !data)
    throw new Error(`Failed to create resource: ${error?.message}`);
  await setResourceCategories(data.id, input.categoryIds);
  return data.id;
}

export async function updateResource(
  id: string,
  input: ResourceInput
): Promise<void> {
  const { error } = await supabaseAdmin()
    .from("resources")
    .update({
      title: input.title,
      description: input.description,
      resource_type: input.resourceType,
      body: input.body,
      file_url: input.fileUrl,
      file_path: input.filePath,
      file_name: input.fileName,
      file_size: input.fileSize,
      published: input.published,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw new Error(`Failed to update resource: ${error.message}`);
  await setResourceCategories(id, input.categoryIds);
}

export async function deleteResource(id: string): Promise<void> {
  const { error } = await supabaseAdmin().from("resources").delete().eq("id", id);
  if (error) throw new Error(`Failed to delete resource: ${error.message}`);
}
