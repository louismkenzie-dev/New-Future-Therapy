import { redirect } from "next/navigation";
import { ExternalLink, MessageSquareHeart, RefreshCw, Star } from "lucide-react";
import { isAdmin } from "@/lib/adminAuth";
import {
  ensureTesterPageKey,
  listFeedback,
  listTesterSignups,
  testerCap,
  testerPageUrl,
  testerPlacesUsed,
} from "@/lib/testers";
import { changeTesterLink, updateTesterCap } from "@/app/actions/adminTesters";
import AdminPageHeading from "@/components/admin/AdminPageHeading";
import CopyButton from "@/components/admin/CopyButton";
import { inputClass, labelClass, secondaryButton } from "@/components/admin/course/formStyles";

export const dynamic = "force-dynamic";

const dateFmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

function Answer({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <p className="font-body text-xs text-sage-dark uppercase tracking-widest mb-1">{label}</p>
      <p className="font-body text-sm text-charcoal leading-relaxed whitespace-pre-wrap">{value}</p>
    </div>
  );
}

export default async function AdminTestersPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const [key, cap, used, signups, feedback] = await Promise.all([
    ensureTesterPageKey(),
    testerCap(),
    testerPlacesUsed(),
    listTesterSignups(),
    listFeedback(),
  ]);
  const url = testerPageUrl(key);

  return (
    <section className="min-h-[80vh] bg-cream px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <AdminPageHeading title="Programme Testers" />

        {/* The private link */}
        <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-6 md:p-8 mb-8">
          <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-2">Your Private Tester Page</p>
          <p className="font-body text-sm text-muted leading-relaxed mb-5 max-w-2xl">
            Share this link only with people you trust. Anyone with it can claim free access for
            themselves and a partner, until the free places run out. It is hidden from search
            engines and is not linked anywhere on the website.
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <code className="font-body text-sm text-charcoal bg-cream border border-grey-light rounded-lg px-4 py-3 break-all flex-1 min-w-0">
              {url}
            </code>
            <CopyButton text={url} />
            <a href={url} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
              <ExternalLink size={15} />
              Open
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-grey-light">
            <form action={updateTesterCap} className="flex flex-wrap items-end gap-3">
              <div>
                <label htmlFor="cap" className={labelClass}>Free Places ({used} taken)</label>
                <input id="cap" name="cap" type="number" min={0} max={10000} defaultValue={cap} className={`${inputClass} w-32`} />
              </div>
              <button type="submit" className={secondaryButton}>Save</button>
            </form>
            <form action={changeTesterLink} className="flex flex-col items-start gap-2">
              <p className="font-body text-xs text-muted leading-relaxed">
                If the link has been passed around, change it. The old link stops working straight away;
                everyone who already joined keeps their access.
              </p>
              <button type="submit" className={secondaryButton}>
                <RefreshCw size={15} />
                Change the Link
              </button>
            </form>
          </div>
        </div>

        {/* Feedback */}
        <h2 className="font-heading text-3xl font-light text-charcoal mb-5">Feedback ({feedback.length})</h2>
        {feedback.length === 0 ? (
          <div className="bg-white rounded-2xl border border-grey-light p-12 text-center mb-12">
            <MessageSquareHeart size={36} strokeWidth={1.25} className="text-sage mx-auto mb-4" />
            <p className="font-body text-sm text-muted">Feedback will appear here, and in your inbox, as it arrives.</p>
          </div>
        ) : (
          <div className="space-y-4 mb-12">
            {feedback.map((f) => (
              <article key={f.id} className="bg-white rounded-2xl border border-grey-light shadow-sm p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <p className="font-body text-sm font-medium text-charcoal">{f.name}</p>
                  <a href={`mailto:${f.email}`} className="font-body text-sm text-sage-dark underline underline-offset-2">
                    {f.email}
                  </a>
                  {f.rating && (
                    <span className="inline-flex items-center gap-1 font-body text-xs bg-sage-pale text-sage-dark px-3 py-1 rounded-full border border-sage-light">
                      <Star size={12} /> {f.rating} out of 5
                    </span>
                  )}
                  {f.partnerInterest && (
                    <span className="font-body text-xs bg-sage-dark text-cream px-3 py-1 rounded-full">
                      Interested in referrals
                    </span>
                  )}
                  <span className="font-body text-xs text-muted ml-auto">{dateFmt(f.createdAt)}</span>
                </div>
                <div className="space-y-4">
                  <Answer label="How far they have got" value={f.progress} />
                  <Answer label="What worked well" value={f.workedWell} />
                  <Answer label="What could be better" value={f.couldImprove} />
                  <Answer label="Professional perspective" value={f.professionalView} />
                </div>
                <p className="font-body text-xs text-muted mt-5">
                  {f.mayQuote ? "Happy to be quoted anonymously." : "Please do not quote."}
                </p>
              </article>
            ))}
          </div>
        )}

        {/* Sign-ups */}
        <h2 className="font-heading text-3xl font-light text-charcoal mb-5">Testers ({signups.length})</h2>
        {signups.length === 0 ? (
          <div className="bg-white rounded-2xl border border-grey-light p-12 text-center">
            <p className="font-body text-sm text-muted">Nobody has claimed a place yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-grey-light shadow-sm overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-grey-light">
                  {["Tester", "Partner", "Joined"].map((h) => (
                    <th key={h} className="font-body text-xs text-muted uppercase tracking-widest font-medium px-6 py-4">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-grey-light">
                {signups.map((s) => (
                  <tr key={s.id}>
                    <td className="px-6 py-4 font-body text-sm">
                      <span className="text-charcoal font-medium">{s.name}</span>
                      <span className="block text-muted">{s.email}</span>
                    </td>
                    <td className="px-6 py-4 font-body text-sm text-muted">
                      {s.partnerName ? (
                        <>
                          <span className="text-charcoal">{s.partnerName}</span>
                          <span className="block">{s.partnerEmail}</span>
                          {!s.linkedAsCouple && <span className="block text-xs">Not linked as a couple</span>}
                        </>
                      ) : (
                        "None"
                      )}
                    </td>
                    <td className="px-6 py-4 font-body text-sm text-muted whitespace-nowrap">{dateFmt(s.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
