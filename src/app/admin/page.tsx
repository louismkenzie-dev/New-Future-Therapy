import { redirect } from "next/navigation";
import {
  Inbox,
  CalendarDays,
  Clock,
  Mail,
  Phone,
  MessageSquareQuote,
  LogOut,
} from "lucide-react";
import { isAdmin } from "@/lib/adminAuth";
import { listSubmissions, type Submission } from "@/lib/submissions";
import { logout } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const REFERRAL_LABELS: Record<string, string> = {
  google: "Google search",
  social: "Social media",
  recommendation: "Personal recommendation",
  directory: "Therapy directory",
  other: "Other",
};

function SubmissionCard({ submission }: { submission: Submission }) {
  return (
    <article className="bg-white rounded-2xl border border-grey-light shadow-sm p-8 transition-all duration-300 hover:border-sage-light">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
        <div>
          <h3 className="font-heading text-2xl font-medium text-charcoal">
            {submission.name}
            {submission.pronouns && (
              <span className="ml-3 align-middle font-body text-xs bg-sage-pale text-sage-dark px-3 py-1 rounded-full border border-sage-light/60">
                {submission.pronouns}
              </span>
            )}
          </h3>
          <p className="font-body text-xs text-muted uppercase tracking-widest mt-2">
            {formatDate(submission.submittedAt)}
          </p>
        </div>
        {submission.referral && (
          <span className="font-body text-xs text-muted bg-cream px-3 py-1.5 rounded-full border border-grey-light">
            via {REFERRAL_LABELS[submission.referral] ?? submission.referral}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-x-8 gap-y-2 mb-6">
        <a
          href={`mailto:${submission.email}`}
          className="inline-flex items-center gap-2 font-body text-sm text-sage-dark hover:text-charcoal transition-colors duration-200"
        >
          <Mail size={15} />
          {submission.email}
        </a>
        {submission.phone && (
          <a
            href={`tel:${submission.phone}`}
            className="inline-flex items-center gap-2 font-body text-sm text-sage-dark hover:text-charcoal transition-colors duration-200"
          >
            <Phone size={15} />
            {submission.phone}
          </a>
        )}
      </div>

      <div className="bg-sage-pale/60 rounded-xl border border-sage-light/40 p-5">
        <MessageSquareQuote size={18} className="text-sage mb-2" aria-hidden="true" />
        <p className="font-body text-sm text-charcoal leading-relaxed whitespace-pre-wrap">
          {submission.message}
        </p>
      </div>
    </article>
  );
}

export default async function AdminDashboardPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const submissions = await listSubmissions();

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const todayCount = submissions.filter(
    (s) => new Date(s.submittedAt) >= startOfToday
  ).length;
  const weekCount = submissions.filter(
    (s) => new Date(s.submittedAt) >= sevenDaysAgo
  ).length;

  const stats = [
    { icon: Inbox, label: "Total enquiries", value: submissions.length },
    { icon: CalendarDays, label: "Last 7 days", value: weekCount },
    { icon: Clock, label: "Today", value: todayCount },
  ];

  return (
    <section className="min-h-[80vh] bg-cream px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Dashboard header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">
              Admin Dashboard
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-light text-charcoal">
              Consultation Enquiries
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

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-grey-light shadow-sm p-6 flex items-center gap-5"
            >
              <span className="w-12 h-12 rounded-full bg-sage-pale border border-sage-light flex items-center justify-center shrink-0">
                <Icon size={20} strokeWidth={1.5} className="text-sage-dark" />
              </span>
              <span>
                <span className="block font-heading text-4xl font-light text-sage-dark leading-none">
                  {value}
                </span>
                <span className="block font-body text-xs text-muted uppercase tracking-widest mt-1.5">
                  {label}
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* Submissions */}
        {submissions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-grey-light p-16 text-center">
            <Inbox size={40} strokeWidth={1.25} className="text-sage mx-auto mb-5" />
            <h2 className="font-heading text-2xl font-light text-charcoal mb-2">
              No enquiries yet
            </h2>
            <p className="font-body text-sm text-muted">
              New consultation requests from the contact form will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {submissions.map((s) => (
              <SubmissionCard key={s.id} submission={s} />
            ))}
          </div>
        )}

        <p className="font-body text-xs text-muted text-center mt-12">
          Enquiry data is encrypted at rest and visible only to signed-in team
          members. Handle in line with GDPR and BACP confidentiality guidelines.
        </p>
      </div>
    </section>
  );
}
