import { redirect } from "next/navigation";
import {
  Banknote,
  CalendarClock,
  LogOut,
  TrendingUp,
  UserMinus,
  UserPlus,
  Users,
} from "lucide-react";
import { isAdmin } from "@/lib/adminAuth";
import {
  getRecentActivity,
  getRevenueStats,
  getStripeRevenue,
} from "@/lib/dal/revenue";
import { formatPence, isPlanKey, PLAN_INFO } from "@/lib/billing/plans";
import { logout } from "@/app/actions/admin";
import AdminTabs from "@/components/admin/AdminTabs";

export const dynamic = "force-dynamic";

export default async function AdminRevenuePage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const [stats, stripeRevenue, activity] = await Promise.all([
    getRevenueStats(),
    getStripeRevenue(),
    getRecentActivity(),
  ]);

  const cards = [
    {
      icon: Users,
      label: "Active subscribers",
      value: `${stats.activeSubscribers}`,
      detail: `${stats.individualCount} individual · ${stats.couplesCount} couples`,
    },
    {
      icon: TrendingUp,
      label: "Monthly recurring revenue",
      value: formatPence(stats.mrrPence),
      detail: "Annual plans counted at one twelfth",
    },
    {
      icon: Banknote,
      label: "Lifetime revenue",
      value: stripeRevenue.available
        ? formatPence(stripeRevenue.lifetimePence)
        : "—",
      detail: stripeRevenue.available
        ? "All paid invoices, refreshed hourly"
        : "Awaiting Stripe configuration",
    },
    {
      icon: CalendarClock,
      label: "Needs attention",
      value: `${stats.pastDueCount + stats.cancellingCount}`,
      detail: `${stats.pastDueCount} payment issues · ${stats.cancellingCount} ending soon`,
    },
  ];

  const maxMonth = Math.max(1, ...stripeRevenue.months.map((m) => m.pence));

  return (
    <section className="min-h-[80vh] bg-cream px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">
              Admin Dashboard
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-light text-charcoal">
              Course Revenue
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

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {cards.map(({ icon: Icon, label, value, detail }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-grey-light shadow-sm p-6"
            >
              <span className="w-12 h-12 rounded-full bg-sage-pale border border-sage-light flex items-center justify-center mb-4">
                <Icon size={20} strokeWidth={1.5} className="text-sage-dark" />
              </span>
              <span className="block font-heading text-4xl font-light text-sage-dark leading-none">
                {value}
              </span>
              <span className="block font-body text-xs text-muted uppercase tracking-widest mt-2">
                {label}
              </span>
              <span className="block font-body text-xs text-grey-mid mt-1.5">
                {detail}
              </span>
            </div>
          ))}
        </div>

        {/* 12-month strip */}
        <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-8 mb-12">
          <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-6">
            Revenue, Last Twelve Months
          </p>
          {stripeRevenue.available ? (
            <div className="flex items-end gap-2 h-40" role="img" aria-label="Monthly revenue bars">
              {stripeRevenue.months.map((month, i) => (
                <div key={`${month.label}-${i}`} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="font-body text-[10px] text-grey-mid">
                    {month.pence > 0 ? formatPence(month.pence) : ""}
                  </span>
                  <div
                    className="w-full rounded-t-md bg-sage transition-all duration-700"
                    style={{
                      height: `${Math.max(month.pence > 0 ? 6 : 2, Math.round((month.pence / maxMonth) * 100))}%`,
                      opacity: month.pence > 0 ? 1 : 0.25,
                    }}
                  />
                  <span className="font-body text-xs text-muted">{month.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-body text-sm text-muted leading-relaxed">
              Revenue history will appear here once the Stripe keys are
              configured and the first payments arrive.
            </p>
          )}
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-8">
          <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-6">
            Recent Activity
          </p>
          {activity.length === 0 ? (
            <p className="font-body text-sm text-muted">
              New subscriptions and cancellations will appear here.
            </p>
          ) : (
            <ul className="divide-y divide-grey-light">
              {activity.map((event) => {
                const isSignup = event.type === "checkout.session.completed";
                const planLabel =
                  event.planKey && isPlanKey(event.planKey)
                    ? PLAN_INFO[event.planKey].label
                    : null;
                return (
                  <li key={event.id} className="py-4 flex items-center gap-4">
                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border ${
                        isSignup
                          ? "bg-sage-pale border-sage-light text-sage-dark"
                          : "bg-cream border-grey-light text-muted"
                      }`}
                    >
                      {isSignup ? <UserPlus size={16} /> : <UserMinus size={16} />}
                    </span>
                    <span className="flex-1 font-body text-sm text-charcoal">
                      {event.memberName ?? "A member"}{" "}
                      <span className="text-muted">
                        {isSignup ? "subscribed" : "subscription ended"}
                        {planLabel ? ` · ${planLabel}` : ""}
                      </span>
                    </span>
                    <span className="font-body text-xs text-grey-mid whitespace-nowrap">
                      {new Date(event.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
