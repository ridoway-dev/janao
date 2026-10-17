import type { Metadata, Viewport } from "next";
import { Noto_Sans_Bengali, Inter } from "next/font/google";
import VisitorTracker from "@/components/VisitorTracker";
import "./globals.css";

const notoBengali = Noto_Sans_Bengali({
  weight: ["400", "500", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-bengali",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://janao.online"),
  title: {
    default: "Janao.online — শিক্ষা, চাকরি, ভর্তি ও প্রয়োজনীয় তথ্য",
    template: "%s | Janao.online",
  },
  description:
    "বাংলাদেশ শিক্ষা ও চাকরি তথ্য পোর্টাল। জাতীয় শিক্ষাক্রম (NCTB) ২০২৬ ও ২০২৭ পাঠ্যবই PDF, এসএসসি ও এইচএসসি রুটিন, ফলাফল, বিশ্ববিদ্যালয় ভর্তি ও সরকারি চাকরি সার্কুলার।",
  keywords: [
    "janao.online",
    "NCTB Books 2026",
    "NCTB Books 2027",
    "NCTB PDF Download",
    "Class 1-12 Books",
    "প্রাথমিক পাঠ্যবই",
    "মাধ্যমিক বই",
    "দাখিল বই ২০২৬",
    "SSC Routine 2027",
    "HSC Routine 2027",
    "সরকারি চাকরি সার্কুলার",
    "বিশ্ববিদ্যালয় ভর্তি ২০২৭",
  ],
  authors: [{ name: "janao.online Team", url: "https://janao.online" }],
  creator: "janao.online Team",
  publisher: "Janao.online",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Janao.online — শিক্ষা, চাকরি, ভর্তি ও প্রয়োজনীয় তথ্য",
    description: "জাতীয় শিক্ষাক্রম (NCTB) পাঠ্যবই ২০২৬ ও ২০২৭, রুটিন, ফলাফল, ভর্তি ও চাকরি সার্কুলার।",
    url: "https://janao.online",
    siteName: "janao.online",
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Janao.online — শিক্ষা, চাকরি, ভর্তি ও প্রয়োজনীয় তথ্য",
    description: "জাতীয় শিক্ষাক্রম (NCTB) পাঠ্যবই ২০২৬ ও ২০২৭, রুটিন, ফলাফল, ভর্তি ও চাকরি সার্কুলার।",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`${notoBengali.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Janao.online',
              alternateName: 'জানা অনলাইন',
              url: 'https://janao.online',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://janao.online/?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-white w-full overflow-x-hidden pb-16 lg:pb-0">
        <VisitorTracker />
        {children}
      </body>
    </html>
  );
}
