import { LogOut } from "lucide-react";
import { logout } from "@/app/actions/admin";
import AdminTabs from "@/components/admin/AdminTabs";

export default function AdminPageHeading({ title }: { title: string }) {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <div>
          <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">Admin Dashboard</p>
          <h1 className="font-heading text-4xl md:text-5xl font-light text-charcoal">{title}</h1>
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
    </>
  );
}
