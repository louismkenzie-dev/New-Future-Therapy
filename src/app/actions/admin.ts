"use server";

import { redirect } from "next/navigation";
import { verifyPassword, createSession, destroySession } from "@/lib/adminAuth";

export interface LoginState {
  error?: string;
}

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = formData.get("password")?.toString() ?? "";

  if (!verifyPassword(password)) {
    return { error: "That password is not correct. Please try again." };
  }

  await createSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}
