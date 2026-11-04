import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";
import WelcomeForm from "@/components/auth/WelcomeForm";
import { findWelcomeInvite } from "@/lib/memberInvites";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Welcome to the Programme",
  robots: { index: false, follow: false },
};

export default async function WelcomePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const invite = await findWelcomeInvite(token);

  if (!invite) {
    return (
      <AuthCard
        eyebrow="Welcome"
        title="This Link Has Expired"
        lede="Welcome links work for fourteen days and can only be used once. If you have already set your password, simply sign in. Otherwise, please ask us for a fresh link."
        footer={{ text: "Already set your password?", linkLabel: "Sign in", href: "/login" }}
      >
        <div />
      </AuthCard>
    );
  }

  const firstName = invite.name.split(" ")[0];
  return (
    <AuthCard
      eyebrow="Welcome"
      title={firstName ? `Welcome, ${firstName}` : "Welcome to the Programme"}
      lede="Your place on Growing Together, our couples programme, is ready. Choose a password and you will go straight in. There is nothing to pay."
      footer={{ text: "Already set your password?", linkLabel: "Sign in", href: "/login" }}
    >
      <WelcomeForm token={token} email={invite.email} />
    </AuthCard>
  );
}
