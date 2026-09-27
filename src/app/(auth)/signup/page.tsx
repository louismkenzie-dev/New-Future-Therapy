import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AuthCard from "@/components/auth/AuthCard";
import SignupForm from "@/components/auth/SignupForm";
import { SIGNUPS_OPEN } from "@/lib/launch";

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

  if (!SIGNUPS_OPEN) {
    return (
      <AuthCard
        eyebrow="Coming Soon"
        title="Sign-Ups Are Not Open Yet"
        lede="Our Couples Relationship Programme is being finished by Laura and Esther. If you already have an account, you can sign in below."
        footer={{
          text: "Curious about the programme?",
          linkLabel: "Get in touch",
          href: "/contact",
        }}
      >
        <Link
          href={`/login?next=${encodeURIComponent(safeNext)}`}
          className="w-full inline-flex items-center justify-center gap-2 font-body text-sm bg-sage-dark text-cream px-8 py-4 rounded-full hover:bg-charcoal transition-colors duration-200"
        >
          Sign In
          <ArrowRight size={16} />
        </Link>
      </AuthCard>
    );
  }

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
