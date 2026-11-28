"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/adminAuth";
import { issueWelcomeToken } from "@/lib/memberInvites";
import { EMAIL_PATTERN as EMAIL, ensureMember, linkCouple } from "@/lib/memberAccounts";
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
      const result = await linkCouple(a.id, b.id);
      if (result === "conflict") {
        return {
          status: "error",
          message:
            "One of these people is already linked to someone else (or has a partner invitation pending). Unlink them from their member page first.",
        };
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
