import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  robots: { index: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;
  const safeNext =
    next && next.startsWith("/") && !next.startsWith("//") ? next : "/learn";

  return (
    <AuthCard
      eyebrow="Welcome Back"
      title="Sign In"
      footer={{
        text: "New to the course?",
        linkLabel: "Create an account",
        href: `/signup?next=${encodeURIComponent(safeNext)}`,
      }}
    >
      <LoginForm next={safeNext} linkError={error === "link"} />
    </AuthCard>
  );
}
