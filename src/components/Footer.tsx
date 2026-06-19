import Link from "next/link";
import Logo from "@/components/Logo";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/our-approach", label: "Our Approach" },
  { href: "/how-we-can-help", label: "How We Can Help" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Logo onDark />
            </div>
            <p className="font-body text-sm leading-relaxed text-cream/60 max-w-xs">
              A compassionate, non-judgemental space for individuals and couples
              to explore their experiences and move towards a healthier future.
            </p>

            <h3 className="font-body text-xs uppercase tracking-[0.18em] text-sage-light mt-8 mb-3">
              Our Brand
            </h3>
            <Link
              href="/brand"
              className="inline-flex items-center min-h-[44px] font-body text-sm text-cream/60 hover:text-sage-light transition-colors duration-200"
            >
              Brand Guidelines
            </Link>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-cream mb-5 tracking-wide">
              Navigation
            </h3>
            <ul className="space-y-1">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex items-center min-h-[44px] font-body text-sm text-cream/60 hover:text-sage-light transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-cream mb-5 tracking-wide">
              Get in Touch
            </h3>
            <p className="font-body text-sm text-cream/60 leading-relaxed mb-4">
              We offer a free 15-minute initial consultation so you can find out
              more about how we work and whether we might be a good fit for you.
            </p>
            <Link
              href="/contact"
              className="inline-block font-body text-sm border border-sage-light text-sage-light px-5 py-2 rounded-full hover:bg-sage-light hover:text-charcoal transition-all duration-200"
            >
              Book a Consultation
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-cream/40">
            © {new Date().getFullYear()} NewFuture Therapy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="font-body text-xs text-cream/40">
              Accredited members of BACP &bull; Wakefield &amp; Online
            </p>
            <Link
              href="/admin"
              className="font-body text-xs text-cream/20 hover:text-cream/50 transition-colors duration-200"
            >
              Team Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
