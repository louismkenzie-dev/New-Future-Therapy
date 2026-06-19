import type { Metadata } from "next";

/* The contact page itself is a client component (interactive form), so its
   metadata lives here in a route-segment layout. */

const description =
  "Get in touch with NewFuture Therapy. Book a free 15-minute initial consultation with Esther or Laura — BACP-accredited therapists offering counselling and couples therapy in Wakefield and online. Everyone is welcome.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | NewFuture Therapy",
    description,
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
