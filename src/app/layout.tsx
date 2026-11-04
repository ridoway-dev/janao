import type { Metadata, Viewport } from "next";
import { Noto_Sans_Bengali, Inter } from "next/font/google";
import VisitorTracker from "@/components/VisitorTracker";
import ToastNotifier from "@/components/ToastNotifier";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import FacebookPixel from "@/components/FacebookPixel";
import TelegramWidget from "@/components/TelegramWidget";
import DownloadConfirmHost from "@/components/download/DownloadConfirmHost";
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
    default: "Janao.online — NCTB পাঠ্যবই ২০২৬ ও ২০২৭, চাকরি ও ভর্তি",
    // Page titles already include the brand, so do not append it again.
    template: "%s",
  },
  description:
    "বাংলাদেশের শিক্ষা ও চাকরি তথ্য পোর্টাল। NCTB ২০২৬ ও ২০২৭ সালের সব শ্রেণির পাঠ্যবই PDF, এসএসসি-এইচএসসি রুটিন, ফলাফল, ভর্তি ও চাকরি সার্কুলার।",
  applicationName: "Janao.online",
  category: "education",
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
  // Canonical URLs are declared per-page. A global canonical here would make
  // any page that forgets to override it point at the homepage.
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
    title: "Janao.online — NCTB পাঠ্যবই ২০২৬ ও ২০২৭, চাকরি ও ভর্তি",
    description: "NCTB পাঠ্যবই ২০২৬ ও ২০২৭, রুটিন, ফলাফল, ভর্তি ও চাকরি সার্কুলার।",
    url: "https://janao.online",
    siteName: "janao.online",
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: "https://janao.online/og-image.png",
        width: 1200,
        height: 630,
        alt: "Janao.online — NCTB Books 2026 & 2027 PDF Download",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Janao.online — NCTB পাঠ্যবই ২০২৬ ও ২০২৭, চাকরি ও ভর্তি",
    description: "NCTB পাঠ্যবই ২০২৬ ও ২০২৭, রুটিন, ফলাফল, ভর্তি ও চাকরি সার্কুলার।",
    images: ["https://janao.online/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://janao.online/#organization',
                  name: 'Janao.online',
                  alternateName: ['জানা অনলাইন', 'janao.online'],
                  url: 'https://janao.online/',
                  logo: {
                    '@type': 'ImageObject',
                    '@id': 'https://janao.online/#logo',
                    url: 'https://janao.online/og-image.png',
                    contentUrl: 'https://janao.online/og-image.png',
                    width: 1200,
                    height: 630,
                    caption: 'Janao.online',
                  },
                  image: { '@id': 'https://janao.online/#logo' },
                  description:
                    'বাংলাদেশের শিক্ষা, চাকরি, ভর্তি ও পরীক্ষার তথ্য পোর্টাল।',
                  sameAs: ['https://t.me/janao_online'],
                  contactPoint: [
                    {
                      '@type': 'ContactPoint',
                      contactType: 'customer support',
                      email: 'info@janao.online',
                      url: 'https://janao.online/',
                      availableLanguage: ['Bengali', 'English'],
                    },
                  ],
                  areaServed: {
                    '@type': 'Country',
                    name: 'Bangladesh',
                  },
                  knowsLanguage: ['bn', 'en'],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://janao.online/#website',
                  url: 'https://janao.online/',
                  name: 'Janao.online',
                  alternateName: 'জানা অনলাইন',
                  inLanguage: 'bn-BD',
                  publisher: { '@id': 'https://janao.online/#organization' },
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                      '@type': 'EntryPoint',
                      urlTemplate: 'https://janao.online/?q={search_term_string}',
                    },
                    'query-input': 'required name=search_term_string',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-white w-full overflow-x-hidden pb-16 lg:pb-0">
        <GoogleAnalytics />
        <FacebookPixel />
        <VisitorTracker />
        <ToastNotifier />
        <TelegramWidget />
        {children}
        <DownloadConfirmHost />
      </body>
    </html>
  );
}
