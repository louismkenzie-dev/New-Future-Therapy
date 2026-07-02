import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import IntroScreen from "@/components/IntroScreen";
import ScrollProgress from "@/components/ScrollProgress";
import CookieBanner from "@/components/CookieBanner";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://newfuturetherapy.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NewFuture Therapy | Counselling & Couples Therapy in Wakefield & Online",
    template: "%s | NewFuture Therapy",
  },
  description:
    "Compassionate, inclusive counselling and couples therapy for adults of all ages (18+). Esther and Laura are BACP-accredited therapists specialising in relationships, anxiety, trauma, self-esteem and more. LGBTQIA+ affirming. Wakefield & Online.",
  applicationName: "NewFuture Therapy",
  authors: [{ name: "NewFuture Therapy" }],
  creator: "NewFuture Therapy",
  publisher: "NewFuture Therapy",
  keywords: [
    "therapy Wakefield",
    "counselling Wakefield",
    "couples therapy",
    "online therapy",
    "relationship counselling",
    "anxiety therapy",
    "trauma therapy",
    "BACP therapist",
    "LGBTQIA+ affirming therapy",
    "psychotherapy",
  ],
  category: "Health",
  openGraph: {
    type: "website",
    siteName: "NewFuture Therapy",
    title: "NewFuture Therapy | Counselling & Couples Therapy in Wakefield & Online",
    description:
      "Compassionate, inclusive counselling and couples therapy for adults of all ages. BACP-accredited, LGBTQIA+ affirming. Wakefield & Online.",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "NewFuture Therapy | Counselling & Couples Therapy in Wakefield & Online",
    description:
      "Compassionate, inclusive counselling and couples therapy. BACP-accredited, LGBTQIA+ affirming. Wakefield & Online.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${cormorant.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <IntroScreen />
          <ScrollProgress />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </SmoothScroll>
      </body>
    </html>
  );
}
