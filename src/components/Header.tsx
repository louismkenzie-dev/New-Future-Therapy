"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/our-approach", label: "Our Approach" },
  { href: "/how-we-can-help", label: "How We Can Help" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-heading text-2xl font-semibold text-sage-dark tracking-wide">
            NewFuture
          </span>
          <span className="font-body text-xs text-muted uppercase tracking-[0.2em] -mt-0.5">
            Therapy
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
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
            const active = pathname === href;
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
