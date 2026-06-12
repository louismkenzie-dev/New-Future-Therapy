import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create an Account",
  robots: { index: false },
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const safeNext =
    next && next.startsWith("/") && !next.startsWith("//") ? next : "/learn";

  return (
    <AuthCard
      eyebrow="Begin Here"
      title="Create Your Account"
      lede="An account lets you take our course, save your reflections, and continue at your own pace."
      footer={{
        text: "Already have an account?",
        linkLabel: "Sign in",
        href: `/login?next=${encodeURIComponent(safeNext)}`,
      }}
    >
      <SignupForm next={safeNext} />
    </AuthCard>
  );
}
