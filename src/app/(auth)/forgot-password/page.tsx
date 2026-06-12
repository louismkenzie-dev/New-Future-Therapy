import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset Your Password",
  robots: { index: false },
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      eyebrow="No Pressure"
      title="Reset Your Password"
      lede="Enter the email address you signed up with and we will send you a link to choose a new password."
      footer={{
        text: "Remembered it after all?",
        linkLabel: "Sign in",
        href: "/login",
      }}
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
