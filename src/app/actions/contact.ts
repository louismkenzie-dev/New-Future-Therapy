"use server";

import { saveSubmission } from "@/lib/submissions";
import { sendEnquiryAlert } from "@/lib/alerts";
import { LIMITS, rateLimitByIp } from "@/lib/rateLimit";
import { MAX, clean } from "@/lib/limits";
import { isReferralSource } from "@/lib/referralSources";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot: a hidden field real visitors never fill in.
  if (clean(formData.get("website"), MAX.shortText)) {
    return {
      status: "success",
      message: "Thank you for getting in touch. We will be in contact with you within two working days.",
    };
  }
  if (!(await rateLimitByIp(LIMITS.contact))) {
    return {
      status: "error",
      message:
        "We have received several messages from you in a short time. Please wait a little while, or email us directly.",
    };
  }

  const name = clean(formData.get("name"), MAX.name);
  const email = clean(formData.get("email"), MAX.email);
  const message = clean(formData.get("message"), MAX.message);
  const pronouns = clean(formData.get("pronouns"), MAX.pronouns);
  const phone = clean(formData.get("phone"), MAX.phone);
  const referralRaw = clean(formData.get("referral"), MAX.shortText);
  // Only accept one of the listed options.
  const referral = isReferralSource(referralRaw) ? referralRaw : "";
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
    // Alert the team; never let a notification failure break the enquiry.
    await sendEnquiryAlert(name);
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
