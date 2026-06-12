import Link from "next/link";
import { redirect } from "next/navigation";
import { Users, LogOut } from "lucide-react";
import { isAdmin } from "@/lib/adminAuth";
import { listMembers, type MemberListRow } from "@/lib/dal/adminMembers";
import { logout } from "@/app/actions/admin";
import AdminTabs from "@/components/admin/AdminTabs";

export const dynamic = "force-dynamic";

function planBadge(member: MemberListRow): { label: string; tinted: boolean } {
  if (member.deactivated) return { label: "Deactivated", tinted: false };
  switch (member.plan) {
    case "individual":
      return { label: "Individual", tinted: true };
    case "couples":
      return { label: "Joint Couples", tinted: true };
    case "complimentary":
      return { label: "Complimentary", tinted: true };
    default:
      return { label: "No plan", tinted: false };
  }
}

export default async function AdminMembersPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const members = await listMembers();

  return (
    <section className="min-h-[80vh] bg-cream px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">
              Admin Dashboard
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-light text-charcoal">
              Course Members
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

        {members.length === 0 ? (
          <div className="bg-white rounded-2xl border border-grey-light p-16 text-center">
            <Users size={40} strokeWidth={1.25} className="text-sage mx-auto mb-5" />
            <h2 className="font-heading text-2xl font-light text-charcoal mb-2">
              No members yet
            </h2>
            <p className="font-body text-sm text-muted">
              Course sign-ups will appear here as soon as the first account is
              created.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-grey-light shadow-sm overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-grey-light">
                  {["Member", "Email", "Plan", "Partner", "Joined"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="font-body text-xs text-muted uppercase tracking-widest font-medium px-6 py-4"
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-grey-light">
                {members.map((member) => {
                  const badge = planBadge(member);
                  return (
                    <tr
                      key={member.id}
                      className={`hover:bg-sage-pale/30 transition-colors duration-200 ${
                        member.deactivated ? "opacity-60" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/members/${member.id}`}
                          className="font-body text-sm font-medium text-charcoal hover:text-sage-dark transition-colors duration-200"
                        >
                          {member.name}
                        </Link>
                        {member.pronouns && (
                          <span className="ml-2 font-body text-xs bg-sage-pale text-sage-dark px-2 py-0.5 rounded-full border border-sage-light/60">
                            {member.pronouns}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-body text-sm text-muted">
                        {member.email}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block font-body text-xs px-3 py-1 rounded-full border ${
                            badge.tinted
                              ? "bg-sage-pale text-sage-dark border-sage-light"
                              : "bg-cream text-muted border-grey-light"
                          }`}
                        >
                          {badge.label}
                        </span>
                        {member.subscriptionStatus === "past_due" && (
                          <span className="ml-2 font-body text-xs text-red-600">
                            payment failed
                          </span>
                        )}
                        {member.cancelAtPeriodEnd && (
                          <span className="ml-2 font-body text-xs text-muted">
                            ending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-body text-sm text-muted">
                        {member.partnerName ??
                          (member.partnerPending ? "Invite pending" : "—")}
                      </td>
                      <td className="px-6 py-4 font-body text-sm text-muted whitespace-nowrap">
                        {new Date(member.joinedAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <p className="font-body text-xs text-muted text-center mt-12">
          Member data is confidential. Reflections are encrypted and are never
          visible here — only account and plan details are shown.
        </p>
      </div>
    </section>
  );
}
