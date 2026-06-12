"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Route, HeartHandshake, UserRound } from "lucide-react";

const links = [
  { href: "/learn", label: "My Course", icon: BookOpen, exactish: true },
  { href: "/learn/path", label: "Learning Path", icon: Route },
  { href: "/learn/shared", label: "Shared With Me", icon: HeartHandshake },
  { href: "/account", label: "Account", icon: UserRound },
];

export default function MemberNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Member area"
      className="bg-cream border-b border-grey-light px-6 overflow-x-auto"
    >
      <div className="max-w-6xl mx-auto flex items-center gap-2 py-3">
        {links.map(({ href, label, icon: Icon, exactish }) => {
          const active = exactish
            ? pathname === href ||
              (pathname.startsWith("/learn/") &&
                !pathname.startsWith("/learn/path") &&
                !pathname.startsWith("/learn/shared"))
            : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={`inline-flex items-center gap-2 font-body text-sm px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-200 ${
                active
                  ? "bg-sage-pale text-sage-dark border border-sage-light/50"
                  : "text-muted border border-transparent hover:text-charcoal"
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
