"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { useAuthStatus } from "@/components/auth/useAuthStatus";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/our-approach", label: "Our Approach" },
  { href: "/how-we-can-help", label: "How We Can Help" },
  { href: "/articles", label: "Articles" },
  { href: "/contact", label: "Contact" },
];

/* The course platform (sales pages, sign in, member area) is built but kept
   out of public view until launch. Set NEXT_PUBLIC_COURSE_ENABLED=true to
   restore the "Course" and "Sign In" links — proxy.ts gates the routes with
   the same flag. */
const COURSE_ENABLED = process.env.NEXT_PUBLIC_COURSE_ENABLED === "true";

function isActive(pathname: string, href: string): boolean {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const signedIn = useAuthStatus();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-cream/95 backdrop-blur-sm shadow-sm border-b border-grey-light"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="shrink-0 mr-8">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={`font-body text-sm tracking-wide transition-colors duration-200 ${
                  active
                    ? "text-sage-dark border-b border-sage"
                    : "text-muted hover:text-charcoal"
                }`}
              >
                {label}
              </Link>
            );
          })}
          {COURSE_ENABLED && (
            <>
              <Link
                href="/courses"
                className={`font-body text-sm tracking-wide transition-colors duration-200 ${
                  isActive(pathname, "/courses")
                    ? "text-sage-dark border-b border-sage"
                    : "text-muted hover:text-charcoal"
                }`}
              >
                Course
              </Link>
              <Link
                href={signedIn ? "/learn" : "/login"}
                className={`font-body text-sm tracking-wide transition-all duration-300 ${
                  signedIn === null ? "opacity-0 pointer-events-none" : "opacity-100"
                } ${
                  isActive(pathname, signedIn ? "/learn" : "/login")
                    ? "text-sage-dark border-b border-sage"
                    : "text-muted hover:text-charcoal"
                }`}
              >
                {signedIn ? "My Course" : "Sign In"}
              </Link>
            </>
          )}
          <Link
            href="/contact"
            className="font-body text-sm bg-sage text-cream px-5 py-2 rounded-full hover:bg-sage-dark transition-colors duration-200"
          >
            Book a Consultation
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-charcoal p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream/98 backdrop-blur-sm border-t border-grey-light px-6 py-6 flex flex-col gap-5">
          {navLinks.map(({ href, label }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={`font-body text-base transition-colors duration-200 ${
                  active ? "text-sage-dark font-medium" : "text-muted hover:text-charcoal"
                }`}
              >
                {label}
              </Link>
            );
          })}
          {COURSE_ENABLED && (
            <>
              <Link
                href="/courses"
                className={`font-body text-base transition-colors duration-200 ${
                  isActive(pathname, "/courses")
                    ? "text-sage-dark font-medium"
                    : "text-muted hover:text-charcoal"
                }`}
              >
                Course
              </Link>
              <Link
                href={signedIn ? "/learn" : "/login"}
                className={`font-body text-base transition-colors duration-200 ${
                  isActive(pathname, signedIn ? "/learn" : "/login")
                    ? "text-sage-dark font-medium"
                    : "text-muted hover:text-charcoal"
                }`}
              >
                {signedIn ? "My Course" : "Sign In"}
              </Link>
            </>
          )}
          <Link
            href="/contact"
            className="font-body text-sm bg-sage text-cream px-5 py-3 rounded-full text-center hover:bg-sage-dark transition-colors duration-200 mt-2"
          >
            Book a Consultation
          </Link>
        </div>
      )}
    </header>
  );
}
