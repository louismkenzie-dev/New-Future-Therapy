"use server";

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

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in all required fields." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  // TODO: wire to an email service (Resend, SendGrid, Nodemailer, etc.)
  // For now, log and return success to verify the form works end-to-end.
  console.log("Contact form submission:", { name, email, message });

  return {
    status: "success",
    message:
      "Thank you for getting in touch. We will be in contact with you within two working days.",
  };
}
