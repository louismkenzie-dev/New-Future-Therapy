"use server";

import { randomBytes } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabase";
import { issueWelcomeToken } from "@/lib/memberInvites";
import { siteUrl } from "@/lib/siteUrl";
import { MAX, clean } from "@/lib/limits";

/* Create course accounts while public sign-ups are closed. Each person is
   given complimentary access and a single-use welcome link to choose
   their own password; with a partner, the two are linked as a couple.
   Inviting an email that already has an account simply issues a fresh
   welcome link (and grants access) — nothing is duplicated. */

export interface InviteResult {
  status: "idle" | "success" | "error";
  message?: string;
  links?: { name: string; email: string; url: string; existing: boolean }[];
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function findUserId(email: string): Promise<string | null> {
  const admin = supabaseAdmin();
  for (let page = 1; ; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error || !data?.users?.length) return null;
    const match = data.users.find((u) => u.email?.toLowerCase() === email);
    if (match) return match.id;
    if (data.users.length < 1000) return null;
  }
}

async function ensureMember(name: string, email: string): Promise<{ id: string; existing: boolean }> {
  const admin = supabaseAdmin();
  const existingId = await findUserId(email);
  let id = existingId;
  if (!id) {
    const { data, error } = await admin.auth.admin.createUser({
      email,
      email_confirm: true,
      // Never shared: the member sets their own password from the welcome link.
      password: randomBytes(24).toString("base64url"),
      user_metadata: { display_name: name },
    });
    if (error || !data.user) throw new Error(error?.message ?? "Could not create the account.");
    id = data.user.id;
  }
  await admin.from("profiles").update({ complimentary_access: true }).eq("id", id);
  return { id, existing: Boolean(existingId) };
}

async function currentCouple(userId: string) {
  const { data } = await supabaseAdmin()
    .from("couples")
    .select("id, owner_id, partner_id, status")
    .or(`owner_id.eq.${userId},partner_id.eq.${userId}`)
    .in("status", ["pending", "active", "suspended"]);
  return data ?? [];
}

export async function inviteMembers(_prev: InviteResult, formData: FormData): Promise<InviteResult> {
  if (!(await isAdmin())) redirect("/admin/login");

  const people: { name: string; email: string }[] = [];
  for (const prefix of ["", "partner-"]) {
    const name = clean(formData.get(`${prefix}name`), MAX.name);
    const email = clean(formData.get(`${prefix}email`), MAX.email).toLowerCase();
    if (!name && !email && prefix) continue;
    if (!name || !EMAIL.test(email)) {
      return {
        status: "error",
        message: prefix
          ? "Please give the partner's first name and a valid email, or leave both partner fields empty."
          : "Please give a first name and a valid email address.",
      };
    }
    people.push({ name, email });
  }
  if (people.length === 2 && people[0].email === people[1].email) {
    return { status: "error", message: "The two email addresses are the same." };
  }

  try {
    const members = [];
    for (const person of people) members.push({ ...person, ...(await ensureMember(person.name, person.email)) });

    if (members.length === 2) {
      const [a, b] = members;
      const [aCouples, bCouples] = await Promise.all([currentCouple(a.id), currentCouple(b.id)]);
      const together = aCouples.find(
        (c) => c.status === "active" && (c.partner_id === b.id || c.owner_id === b.id)
      );
      if (!together) {
        if (aCouples.length || bCouples.length) {
          return {
            status: "error",
            message:
              "One of these people is already linked to someone else (or has a partner invitation pending). Unlink them from their member page first.",
          };
        }
        const { error } = await supabaseAdmin().from("couples").insert({
          owner_id: a.id,
          partner_id: b.id,
          status: "active",
          linked_at: new Date().toISOString(),
        });
        if (error) throw new Error(error.message);
      }
    }

    const links = [];
    for (const m of members) {
      const token = await issueWelcomeToken(m.id);
      links.push({ name: m.name, email: m.email, url: `${siteUrl()}/welcome/${token}`, existing: m.existing });
    }
    revalidatePath("/admin/members");
    return {
      status: "success",
      message:
        members.length === 2
          ? "Both accounts are ready with complimentary access, linked as a couple."
          : "The account is ready with complimentary access.",
      links,
    };
  } catch (err) {
    console.error("Member invite failed:", err);
    return { status: "error", message: "Something went wrong creating the account. Please try again." };
  }
}
