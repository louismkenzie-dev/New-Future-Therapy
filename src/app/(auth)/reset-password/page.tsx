import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Choose a New Password",
  robots: { index: false },
};

export default function ResetPasswordPage() {
  return (
    <AuthCard
      eyebrow="Almost There"
      title="Choose a New Password"
      lede="Pick a new password for your account. You will stay signed in once it is saved."
    >
      <ResetPasswordForm />
    </AuthCard>
  );
}
