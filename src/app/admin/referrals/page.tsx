import { redirect } from "next/navigation";
import { Handshake } from "lucide-react";
import { isAdmin } from "@/lib/adminAuth";
import { formatPence } from "@/lib/billing/plans";
import { COMMISSION_PERCENT, REFERRAL_PERCENT, REFERRAL_TERMS, referralLink, referralOverview } from "@/lib/referrals";
import { markPartnerPaid, togglePartner } from "@/app/actions/adminReferrals";
import AdminPageHeading from "@/components/admin/AdminPageHeading";
import AddPartnerForm from "@/components/admin/AddPartnerForm";
import CopyButton from "@/components/admin/CopyButton";
import { secondaryButton } from "@/components/admin/course/formStyles";

export const dynamic = "force-dynamic";

const dateFmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default async function AdminReferralsPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const { partners, recent } = await referralOverview();
  const owed = partners.reduce((n, p) => n + p.owedPence, 0);
  const sales = partners.reduce((n, p) => n + p.salesPence, 0);

  return (
    <section className="min-h-[80vh] bg-cream px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <AdminPageHeading title="Referral Partners" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Partners", value: String(partners.filter((p) => p.active).length) },
            { label: "Sales Through Referrals", value: formatPence(sales) },
            { label: "Commission Owed", value: formatPence(owed) },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-grey-light shadow-sm p-6">
              <p className="font-body text-xs text-sage-dark uppercase tracking-widest mb-2">{s.label}</p>
              <p className="font-heading text-4xl font-light text-charcoal">{s.value}</p>
            </div>
          ))}
        </div>

        <p className="font-body text-sm text-muted leading-relaxed mb-8 max-w-3xl">
          Clients save {REFERRAL_PERCENT}% on every payment {REFERRAL_TERMS.summary}, and partners earn{" "}
          {COMMISSION_PERCENT}% of each of those payments. Commission is worked out on
          the amount actually paid, after the discount. Pay partners by bank transfer, then press
          &ldquo;Mark as Paid&rdquo;.
        </p>

        <div className="mb-10">
          <AddPartnerForm />
        </div>

        {partners.length === 0 ? (
          <div className="bg-white rounded-2xl border border-grey-light p-16 text-center">
            <Handshake size={40} strokeWidth={1.25} className="text-sage mx-auto mb-5" />
            <h2 className="font-heading text-2xl font-light text-charcoal mb-2">No referral partners yet</h2>
            <p className="font-body text-sm text-muted">Add your first partner above to create their code.</p>
          </div>
        ) : (
          <div className="space-y-4 mb-12">
            {partners.map((p) => (
              <article
                key={p.id}
                className={`bg-white rounded-2xl border border-grey-light shadow-sm p-6 md:p-8 ${p.active ? "" : "opacity-60"}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="font-heading text-2xl font-light text-charcoal">{p.name}</p>
                    <p className="font-body text-sm text-muted">
                      {p.email}
                      {p.notes ? ` · ${p.notes}` : ""}
                    </p>
                  </div>
                  <span className="font-body text-sm tracking-wider bg-sage-pale text-sage-dark px-4 py-2 rounded-full border border-sage-light">
                    {p.code}
                    {!p.active && " (paused)"}
                  </span>
                </div>
                <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  {[
                    ["Clients", String(p.clients)],
                    ["Payments", String(p.payments)],
                    ["Owed", formatPence(p.owedPence)],
                    ["Paid So Far", formatPence(p.paidPence)],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="font-body text-xs text-muted uppercase tracking-widest mb-1">{k}</dt>
                      <dd className="font-body text-lg text-charcoal">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="flex flex-wrap gap-3">
                  <CopyButton text={referralLink(p.code)} label="Copy Their Link" />
                  {p.owedPence > 0 && (
                    <form action={markPartnerPaid}>
                      <input type="hidden" name="id" value={p.id} />
                      <button type="submit" className={secondaryButton}>
                        Mark {formatPence(p.owedPence)} as Paid
                      </button>
                    </form>
                  )}
                  <form action={togglePartner}>
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="active" value={p.active ? "false" : "true"} />
                    <button type="submit" className={secondaryButton}>
                      {p.active ? "Pause Code" : "Turn Code Back On"}
                    </button>
                  </form>
                </div>
              </article>
            ))}
          </div>
        )}

        {recent.length > 0 && (
          <>
            <h2 className="font-heading text-3xl font-light text-charcoal mb-5">Recent Referral Payments</h2>
            <div className="bg-white rounded-2xl border border-grey-light shadow-sm overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-grey-light">
                    {["Date", "Partner", "Client", "Paid", "Commission", "Status"].map((h) => (
                      <th key={h} className="font-body text-xs text-muted uppercase tracking-widest font-medium px-6 py-4">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-grey-light">
                  {recent.map((c) => (
                    <tr key={c.id} className="font-body text-sm text-muted">
                      <td className="px-6 py-4 whitespace-nowrap">{dateFmt(c.createdAt)}</td>
                      <td className="px-6 py-4 text-charcoal">{c.partnerName}</td>
                      <td className="px-6 py-4">{c.customerEmail ?? "Unknown"}</td>
                      <td className="px-6 py-4">{formatPence(c.amountPaidPence)}</td>
                      <td className="px-6 py-4 text-charcoal">{formatPence(c.commissionPence)}</td>
                      <td className="px-6 py-4">{c.paidOutAt ? `Paid ${dateFmt(c.paidOutAt)}` : "Owed"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
