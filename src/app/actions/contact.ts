"use server";

import { saveSubmission } from "@/lib/submissions";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";
  const pronouns = formData.get("pronouns")?.toString().trim() ?? "";
  const phone = formData.get("phone")?.toString().trim() ?? "";
  const referral = formData.get("referral")?.toString().trim() ?? "";
  const consent = formData.get("consent")?.toString() ?? "";

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in all required fields." };
  }

  /* UK GDPR: explicit consent is the lawful basis promised in the privacy
     policy — refuse to process without the ticked box. */
  if (consent !== "on") {
    return {
      status: "error",
      message:
        "Please tick the consent box so we have your permission to process your enquiry.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  try {
    await saveSubmission({ name, email, phone, pronouns, referral, message });
  } catch (error) {
    console.error("Failed to store contact submission:", error);
    return {
      status: "error",
      message:
        "Something went wrong sending your message. Please try again, or email us directly.",
    };
  }

  return {
    status: "success",
    message:
      "Thank you for getting in touch. We will be in contact with you within two working days.",
  };
}
