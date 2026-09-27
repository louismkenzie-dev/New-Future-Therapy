"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Route,
  HeartHandshake,
  MessageCircleHeart,
  UserRound,
} from "lucide-react";

const links = [
  { href: "/learn", label: "My Course", icon: BookOpen, exactish: true },
  { href: "/learn/reflections", label: "Reflections", icon: MessageCircleHeart },
  { href: "/learn/path", label: "Learning Path", icon: Route },
  { href: "/learn/shared", label: "Shared With Me", icon: HeartHandshake },
  { href: "/account", label: "Account", icon: UserRound },
];

export default function MemberNav() {
  const pathname = usePathname();

  /* The phone tab bar is fixed, so give the page (footer included) room
     beneath it while the member area is mounted. */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => {
      document.body.style.paddingBottom = mq.matches ? "72px" : "";
    };
    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      document.body.style.paddingBottom = "";
    };
  }, []);

  const isActive = (href: string, exactish?: boolean) =>
    exactish
      ? pathname === href ||
        (pathname.startsWith("/learn/") &&
          !pathname.startsWith("/learn/path") &&
          !pathname.startsWith("/learn/shared") &&
          !pathname.startsWith("/learn/reflections"))
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Phones: app-style tab bar along the bottom, thumb reach. */}
      <nav
        aria-label="Member area"
        className="md:hidden fixed inset-x-0 bottom-0 z-[90] bg-cream/95 backdrop-blur border-t border-grey-light pb-safe print:hidden"
      >
        <ul className="grid grid-cols-5">
          {links.map(({ href, label, icon: Icon, exactish }) => {
            const active = isActive(href, exactish);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex flex-col items-center justify-center gap-1 min-h-[56px] px-1 font-body text-[11px] leading-none transition-colors duration-200 ${
                    active ? "text-sage-dark" : "text-muted"
                  }`}
                >
                  <span
                    className={`inline-flex items-center justify-center w-9 h-7 rounded-full ${
                      active ? "bg-sage-pale" : ""
                    }`}
                  >
                    <Icon size={18} strokeWidth={active ? 2.25 : 2} />
                  </span>
                  {label === "Shared With Me" ? "Shared" : label === "Learning Path" ? "Path" : label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

    <nav
      aria-label="Member area"
      className="hidden md:block bg-cream border-b border-grey-light px-6 overflow-x-auto"
    >
      <div className="max-w-6xl mx-auto flex items-center gap-2 py-3">
        {links.map(({ href, label, icon: Icon, exactish }) => {
          const active = isActive(href, exactish);
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
    </>
  );
}
