"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Inbox, Users, TrendingUp } from "lucide-react";

const tabs = [
  { href: "/admin", label: "Enquiries", icon: Inbox, exact: true },
  { href: "/admin/members", label: "Members", icon: Users },
  { href: "/admin/revenue", label: "Revenue", icon: TrendingUp },
];

export default function AdminTabs() {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin sections" className="mb-10 overflow-x-auto">
      <div className="inline-flex rounded-full border border-grey-light bg-white p-1">
        {tabs.map(({ href, label, icon: Icon, exact }) => {
          const active = exact
            ? pathname === href
            : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={`inline-flex items-center gap-2 font-body text-sm px-5 py-2.5 rounded-full whitespace-nowrap transition-colors duration-300 ${
                active
                  ? "bg-sage-dark text-cream"
                  : "text-muted hover:text-charcoal"
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
