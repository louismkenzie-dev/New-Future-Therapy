import type { Metadata } from "next";
import { Check, Heart, Lightbulb, Users, X } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/motion/Reveal";
import LogoSuite from "@/components/brand/LogoSuite";
import IntroVideoCard from "@/components/brand/IntroVideoCard";
import LogoDiagrams from "@/components/brand/LogoDiagrams";
import LogoMisuse from "@/components/brand/LogoMisuse";
import ColourPalette from "@/components/brand/ColourPalette";

export const metadata: Metadata = {
  title: "Brand Guidelines",
  description:
    "The NewFuture Therapy brand at a glance — our logo suite (with high-resolution SVG and PNG downloads), colour palette, typography and voice, in one place.",
};

function SectionHead({
  num,
  eyebrow,
  title,
  lede,
}: {
  num: string;
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <Reveal className="mb-16 text-center">
      <p className="mb-4 font-body text-xs uppercase tracking-[0.2em] text-grey-mid">
        {num}
      </p>
      <p className="mb-3 font-body text-sm uppercase tracking-[0.25em] text-sage-dark">
        {eyebrow}
      </p>
      <h2 className="font-heading text-4xl font-light text-charcoal md:text-5xl">
        {title}
      </h2>
      {lede && (
        <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-muted">
          {lede}
        </p>
      )}
    </Reveal>
  );
}

export default function BrandGuidelinesPage() {
  return (
    <>
      {/* Canonical webfonts so the logo engine's canvas measurement resolves the
          exact families used in downloads (next/font self-hosts under hashed
          names the canvas cannot reference). */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
      />

      <PageHeader
        eyebrow="Visual Identity"
        title="Brand Guidelines"
        lede="Everything you need to present NewFuture Therapy consistently and with care — our logos, colours, type and voice, in one place. Growth begins with understanding."
      />

      {/* ——— Story ——— */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="mb-4 font-body text-xs uppercase tracking-[0.2em] text-grey-mid">
              01 — Our Story
            </p>
            <p className="mb-3 font-body text-sm uppercase tracking-[0.25em] text-sage-dark">
              The Brand at a Glance
            </p>
            <h2 className="font-heading text-4xl font-light text-charcoal md:text-5xl">
              Growth begins with understanding.
            </h2>
            <div className="mt-8 font-body text-lg leading-loose text-muted">
              <p className="mb-6">
                NewFuture Therapy is a private therapy practice run by Esther and
                Laura — BACP-registered therapists offering therapy for
                individuals and couples, in person in Wakefield and online. We
                specialise in trauma, anxiety, depression, attachment,
                relationships and couples therapy.
              </p>
              <p>
                Our voice is warm, compassionate and non-judgemental. We speak as
                &ldquo;we&rdquo;, directly to &ldquo;you&rdquo; — reassuring,
                professional, never clinical and never salesy. Our visual language
                follows the same principles: calm sage greens, warm creams, and an
                elegant light serif. These guidelines exist to keep that feeling
                consistent everywhere our brand appears.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {[
                "Compassion",
                "Curiosity",
                "Connection",
                "Warm & non-judgemental",
                "Registered with BACP",
              ].map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-sage-light/50 bg-sage-pale px-4 py-2 font-body text-sm text-sage-dark"
                >
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— Logo suite ——— */}
      <section className="bg-sage-pale px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            num="02 — The Logo Suite"
            eyebrow="Logos & Downloads"
            title="One leaf, five lockups"
            lede="The logo is the sage leaf glyph beside the stacked “NewFuture / Therapy” wordmark. Choose the lockup that fits the space, pick a colourway, and download a crisp vector (SVG) or a high-resolution transparent PNG. Leaf veins are knocked out, so every mark sits cleanly on any background."
          />
          <LogoSuite />

          <Reveal className="mt-12">
            <p className="mb-6 text-center font-body text-sm uppercase tracking-[0.25em] text-sage-dark">
              The Logo in Motion
            </p>
            <IntroVideoCard />
          </Reveal>
        </div>
      </section>

      {/* ——— Clear space & minimum size ——— */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            num="03 — Protecting the Mark"
            eyebrow="Clear Space & Minimum Size"
            title="Give it room to breathe"
          />
          <LogoDiagrams />
        </div>
      </section>

      {/* ——— Misuse ——— */}
      <section className="bg-sage-pale px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            num="04 — Logo Misuse"
            eyebrow="Do Not"
            title="Eight ways to break the logo"
            lede="The logo is fixed artwork. Always use the supplied files, unaltered. These are the most common mistakes — please avoid them all."
          />
          <LogoMisuse />
        </div>
      </section>

      {/* ——— Colour ——— */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            num="05 — Colour"
            eyebrow="The Palette"
            title="Calm greens, warm neutrals"
            lede="One green family carries the brand, grounded in warm cream and charcoal — never pure white or black. Click any swatch to copy its hex."
          />
          <ColourPalette />
        </div>
      </section>

      {/* ——— Typography ——— */}
      <section className="bg-sage-pale px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            num="06 — Typography"
            eyebrow="Type System"
            title="An elegant serif, a quiet sans"
            lede="Cormorant Garamond carries every heading — large and light, italic for pull quotes. DM Sans handles body copy, navigation and buttons. Both load free from Google Fonts."
          />

          {/* Cormorant */}
          <Reveal className="rounded-2xl border border-grey-light bg-white p-8 shadow-sm md:p-12">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-6 border-b border-grey-light pb-6">
              <h3 className="font-heading text-4xl font-light text-charcoal">
                Cormorant Garamond
              </h3>
              <span className="font-body text-sm text-muted">
                Headings · display · pull quotes — weights 300–700 + italic
              </span>
            </div>
            <p className="font-heading text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.25] text-charcoal">
              AaBbCcDdEeFfGgHh
              <br />
              NewFuture Therapy — growth begins with understanding
            </p>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-6">
              {[
                { lbl: "Light 300", w: 300, it: false },
                { lbl: "Regular 400", w: 400, it: false },
                { lbl: "Medium 500", w: 500, it: false },
                { lbl: "Semibold 600", w: 600, it: false },
                { lbl: "Italic 400", w: 400, it: true },
              ].map((s) => (
                <div key={s.lbl}>
                  <div className="mb-2 font-body text-xs uppercase tracking-wider text-grey-mid">
                    {s.lbl}
                  </div>
                  <div
                    className="font-heading text-3xl text-charcoal"
                    style={{ fontWeight: s.w, fontStyle: s.it ? "italic" : "normal" }}
                  >
                    Understanding
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* DM Sans */}
          <Reveal className="mt-8 rounded-2xl border border-grey-light bg-white p-8 shadow-sm md:p-12">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-6 border-b border-grey-light pb-6">
              <h3 className="font-body text-4xl font-medium text-charcoal">DM Sans</h3>
              <span className="font-body text-sm text-muted">
                Body · UI · navigation · buttons — weights 300–600
              </span>
            </div>
            <p className="font-body text-[clamp(1.3rem,2.6vw,2rem)] font-normal leading-[1.4] text-charcoal">
              AaBbCcDdEeFfGgHh 0123456789
              <br />
              You do not need a diagnosis to begin. There is no pressure and no
              commitment.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-6">
              {[
                { lbl: "Light 300", w: 300 },
                { lbl: "Regular 400", w: 400 },
                { lbl: "Medium 500", w: 500 },
                { lbl: "Semibold 600", w: 600 },
              ].map((s) => (
                <div key={s.lbl}>
                  <div className="mb-2 font-body text-xs uppercase tracking-wider text-grey-mid">
                    {s.lbl}
                  </div>
                  <div className="font-body text-2xl text-charcoal" style={{ fontWeight: s.w }}>
                    Compassion
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Scale */}
          <Reveal className="mt-8 rounded-2xl border border-grey-light bg-white p-8 shadow-sm md:p-12">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-6 border-b border-grey-light pb-6">
              <h3 className="font-heading text-2xl font-medium text-charcoal">
                The Type Scale
              </h3>
              <span className="font-body text-sm text-muted">
                As used across the brand
              </span>
            </div>
            <table className="w-full border-collapse">
              <tbody>
                {[
                  { role: "Hero", sample: "A new future", spec: "Cormorant · 72px · 300", style: { fontFamily: "var(--font-heading)", fontWeight: 300, fontSize: "3.4rem", lineHeight: 1 } as React.CSSProperties },
                  { role: "Page title", sample: "A new future", spec: "Cormorant · 60px · 300", style: { fontFamily: "var(--font-heading)", fontWeight: 300, fontSize: "2.6rem", lineHeight: 1 } as React.CSSProperties },
                  { role: "Section", sample: "A new future", spec: "Cormorant · 48px · 300", style: { fontFamily: "var(--font-heading)", fontWeight: 300, fontSize: "2rem", lineHeight: 1 } as React.CSSProperties },
                  { role: "Card title", sample: "A new future", spec: "Cormorant · 20px · 500", style: { fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "1.25rem" } as React.CSSProperties },
                  { role: "Eyebrow", sample: "A New Future", spec: "DM Sans · 14px · 0.25em", style: { fontFamily: "var(--font-body)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.25em", color: "#3A5A40" } as React.CSSProperties },
                  { role: "Body", sample: "A safe, compassionate and non-judgemental space.", spec: "DM Sans · 16px · 1.65", style: { fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.65, color: "#5C5651" } as React.CSSProperties },
                ].map((row) => (
                  <tr key={row.role} className="border-b border-grey-light last:border-b-0">
                    <td className="w-px whitespace-nowrap py-4 pr-4 align-baseline font-body text-xs uppercase tracking-wider text-grey-mid">
                      {row.role}
                    </td>
                    <td className="py-4 align-baseline text-charcoal" style={row.style}>
                      {row.sample}
                    </td>
                    <td className="w-px whitespace-nowrap py-4 pl-4 text-right align-baseline font-body text-xs text-grey-mid">
                      {row.spec}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* ——— Voice & tone ——— */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            num="07 — Voice & Tone"
            eyebrow="How We Speak"
            title="Warm, measured, reassuring"
            lede="We write in first-person plural “we”, speaking directly to “you”. British English, no contractions in body copy, and never an emoji. Every page lowers the barrier to reaching out."
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: Heart,
                title: "Compassion",
                body: "Never blame or pathologise. People do the best they can with the knowledge, resources and experiences available to them at the time.",
              },
              {
                icon: Lightbulb,
                title: "Curiosity",
                body: "Lead with lived experience, not diagnosis. “Worry, overthinking, panic…”. Explore with openness rather than deciding who is right or wrong.",
              },
              {
                icon: Users,
                title: "Connection",
                body: "Inclusive, explicitly. We welcome and affirm people of all sexual orientations, gender identities, relationship structures and cultural backgrounds.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <Reveal
                key={title}
                className="h-full rounded-2xl border border-grey-light bg-white p-8 shadow-sm"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-sage-pale text-sage-dark">
                  <Icon size={22} />
                </div>
                <h3 className="mb-2 font-heading text-xl font-medium text-charcoal">
                  {title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted">{body}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Reveal className="rounded-2xl border border-sage-light/50 bg-sage-pale p-8">
              <div className="mb-5 flex items-center gap-3 font-body text-sm font-semibold uppercase tracking-wider text-sage-dark">
                <Check size={18} strokeWidth={2.4} /> We Say
              </div>
              <ul>
                {[
                  <>“You do not need a diagnosis to begin.”</>,
                  <>“There is no pressure and no commitment.”</>,
                  <>“A free 15-minute initial consultation.”</>,
                  <>
                    “Healing is possible, and{" "}
                    <em className="italic text-charcoal">you do not have to face it alone</em>.”
                  </>,
                  <>“We work at your pace. You set the pace.”</>,
                ].map((li, i) => (
                  <li
                    key={i}
                    className="border-b border-charcoal/[0.06] py-3 font-body text-base leading-snug text-muted last:border-b-0"
                  >
                    {li}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="rounded-2xl border border-grey-light bg-white p-8">
              <div className="mb-5 flex items-center gap-3 font-body text-sm font-semibold uppercase tracking-wider text-grey-mid">
                <X size={18} strokeWidth={2.4} /> We Avoid
              </div>
              <ul>
                {[
                  "Contractions in body copy — “don’t”, “you’re”, “it’s”.",
                  "Clinical or diagnosis-first labelling.",
                  "Salesy urgency, hype or pressure.",
                  "American spellings — use “specialising”, “fulfilment”.",
                  "Emoji, ever. And exclamation marks in body copy.",
                ].map((li, i) => (
                  <li
                    key={i}
                    className="border-b border-charcoal/[0.06] py-3 font-body text-base leading-snug text-muted last:border-b-0"
                  >
                    {li}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="mt-12 text-center">
            <p className="mb-4 font-body text-sm uppercase tracking-[0.25em] text-sage-dark">
              Signature Phrases
            </p>
            <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
              {[
                "growth begins with understanding",
                "compassion, curiosity and connection",
                "a safe, compassionate and non-judgemental space",
                "Wakefield & Online",
                "Registered with BACP",
                "you set the pace",
                "there is no pressure and no commitment",
              ].map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-sage-light/50 bg-sage-pale px-4 py-2 font-body text-sm text-sage-dark"
                >
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
