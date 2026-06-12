import type { Metadata } from "next";
import Link from "next/link";
import { createHash } from "node:crypto";
import AuthCard from "@/components/auth/AuthCard";
import AcceptInviteForm from "@/components/account/AcceptInviteForm";
import { supabaseAdmin } from "@/lib/supabase";
import { getUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "An Invitation to Grow Together",
  robots: { index: false },
};

export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const tokenHash = createHash("sha256").update(token).digest("hex");

  const admin = supabaseAdmin();
  const { data: couple } = await admin
    .from("couples")
    .select("id, owner_id, invite_expires_at")
    .eq("invite_token_hash", tokenHash)
    .eq("status", "pending")
    .maybeSingle();

  const valid = Boolean(
    couple &&
      couple.invite_expires_at &&
      new Date(couple.invite_expires_at) > new Date()
  );

  if (!valid) {
    return (
      <AuthCard
        eyebrow="An Invitation"
        title="This Link Has Expired"
        lede="Invitation links work for fourteen days and can only be used once. Please ask your partner to create a fresh link from their account page."
        footer={{ text: "Curious about the course?", linkLabel: "Have a look", href: "/courses" }}
      >
        <div />
      </AuthCard>
    );
  }

  const { data: ownerProfile } = await admin
    .from("profiles")
    .select("display_name")
    .eq("id", couple!.owner_id)
    .maybeSingle();
  const ownerName = ownerProfile?.display_name ?? "Your partner";

  const user = await getUser();

  return (
    <AuthCard
      eyebrow="An Invitation"
      title={`${ownerName} Has Invited You to Grow Together`}
      lede="Growing Together is our course in building closer, healthier relationships — taken side by side, with your own private space and only the reflections you choose ever shared."
      footer={{
        text: "Want to know more first?",
        linkLabel: "About the course",
        href: "/courses",
      }}
    >
      {user ? (
        user.id === couple!.owner_id ? (
          <p className="font-body text-sm text-muted leading-relaxed text-center bg-sage-pale border border-sage-light rounded-lg p-4">
            This is your own invitation link — send it to your partner, and
            this page is where they will accept it.
          </p>
        ) : (
          <AcceptInviteForm token={token} />
        )
      ) : (
        <div className="space-y-4">
          <Link
            href={`/signup?next=${encodeURIComponent(`/invite/${token}`)}`}
            className="w-full inline-flex items-center justify-center gap-2 font-body text-sm bg-sage-dark text-cream px-8 py-4 rounded-full hover:bg-charcoal transition-colors duration-200"
          >
            Create an Account to Accept
          </Link>
          <Link
            href={`/login?next=${encodeURIComponent(`/invite/${token}`)}`}
            className="w-full inline-flex items-center justify-center gap-2 font-body text-sm border border-grey-light text-charcoal px-8 py-4 rounded-full hover:border-sage-light hover:text-sage-dark transition-colors duration-200"
          >
            I Already Have an Account
          </Link>
        </div>
      )}
    </AuthCard>
  );
}
