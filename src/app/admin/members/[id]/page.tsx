import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Gift, LogOut, ShieldOff, Unlink } from "lucide-react";
import { isAdmin } from "@/lib/adminAuth";
import { getMember } from "@/lib/dal/adminMembers";
import { logout } from "@/app/actions/admin";
import {
  adminUnlinkCouple,
  setAccountDeactivated,
  toggleComplimentaryAccess,
} from "@/app/actions/adminMembers";
import AdminTabs from "@/components/admin/AdminTabs";

export const dynamic = "force-dynamic";

export default async function AdminMemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");

  const { id } = await params;
  const member = await getMember(id);
  if (!member) notFound();

  return (
    <section className="min-h-[80vh] bg-cream px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">
              Admin Dashboard
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-light text-charcoal">
              {member.name}
            </h1>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm border border-sage text-sage-dark px-6 py-3 rounded-full hover:bg-sage-pale transition-colors duration-200"
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </form>
        </div>

        <AdminTabs />

        <Link
          href="/admin/members"
          className="inline-flex items-center gap-2 font-body text-sm text-sage-dark hover:text-charcoal transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={15} />
          All members
        </Link>

        {/* Account summary */}
        <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-8 mb-8">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            {[
              ["Email", member.email],
              ["Pronouns", member.pronouns ?? "—"],
              [
                "Plan",
                member.plan === "couples"
                  ? "Joint Couples"
                  : member.plan === "individual"
                    ? "Individual"
                    : member.plan === "complimentary"
                      ? "Complimentary access"
                      : "No active plan",
              ],
              [
                "Subscription status",
                member.subscriptionStatus
                  ? `${member.subscriptionStatus}${member.cancelAtPeriodEnd ? " · ending at period end" : ""}`
                  : "—",
              ],
              [
                "Partner",
                member.partnerName ??
                  (member.partnerPending ? "Invite pending" : "Not linked"),
              ],
              [
                "Joined",
                new Date(member.joinedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }),
              ],
              ["Account", member.deactivated ? "Deactivated" : "Active"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="font-body text-xs text-muted uppercase tracking-widest mb-1">
                  {label}
                </dt>
                <dd className="font-body text-sm text-charcoal">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-8 space-y-6">
          <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em]">
            Manage This Member
          </p>

          <div className="flex flex-wrap gap-3">
            <form action={toggleComplimentaryAccess}>
              <input type="hidden" name="userId" value={member.id} />
              <input
                type="hidden"
                name="grant"
                value={member.plan === "complimentary" ? "false" : "true"}
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm border border-sage text-sage-dark px-6 py-3 rounded-full hover:bg-sage-pale transition-colors duration-200"
              >
                <Gift size={15} />
                {member.plan === "complimentary"
                  ? "Revoke Complimentary Access"
                  : "Grant Complimentary Access"}
              </button>
            </form>

            {(member.partnerName || member.partnerPending) && (
              <form action={adminUnlinkCouple}>
                <input type="hidden" name="userId" value={member.id} />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm border border-grey-light text-charcoal px-6 py-3 rounded-full hover:border-sage-light hover:text-sage-dark transition-colors duration-200"
                >
                  <Unlink size={15} />
                  {member.partnerPending
                    ? "Cancel Pending Invite"
                    : "Unlink Couple"}
                </button>
              </form>
            )}

            <form action={setAccountDeactivated}>
              <input type="hidden" name="userId" value={member.id} />
              <input
                type="hidden"
                name="deactivate"
                value={member.deactivated ? "false" : "true"}
              />
              <button
                type="submit"
                className={`inline-flex items-center gap-2 min-h-[44px] font-body text-sm border px-6 py-3 rounded-full transition-colors duration-200 ${
                  member.deactivated
                    ? "border-sage text-sage-dark hover:bg-sage-pale"
                    : "border-grey-light text-muted hover:border-red-200 hover:text-red-600"
                }`}
              >
                <ShieldOff size={15} />
                {member.deactivated
                  ? "Reactivate Account"
                  : "Deactivate Account"}
              </button>
            </form>
          </div>

          <p className="font-body text-xs text-muted leading-relaxed">
            Complimentary access grants the full course without a subscription.
            Unlinking a couple ends sharing between the two accounts
            immediately; nothing either member wrote is deleted. Deactivating
            blocks sign-in without deleting any data. Billing changes and
            refunds are handled in Stripe.
          </p>
        </div>
      </div>
    </section>
  );
}
