import type { Metadata } from "next";
import { Noto_Sans_Bengali, Inter } from "next/font/google";
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

export const metadata: Metadata = {
  title: "janao.click | NCTB Books 2026 - সকল শ্রেণির পাঠ্যবই, রুটিন ও নোটিশ",
  description:
    "জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) ২০২৬ শিক্ষাবর্ষের প্রাথমিক (১ম-৫ম), মাধ্যমিক (৬ষ্ঠ-১০ম), মাদ্রাসা ইবতেদায়ি, দাখিল ও একাদশ-দ্বাদশ শ্রেণির সকল পিডিএফ বই, পরীক্ষার রুটিন এবং রেজাল্ট নোটিশ বিনামূল্যে ডাউনলোড করুন।",
  keywords: [
    "janao.click",
    "NCTB Books 2026",
    "NCTB PDF Download",
    "Class 1-12 Books",
    "প্রাথমিক পাঠ্যবই",
    "মাধ্যমিক বই",
    "দাখিল বই ২০২৬",
    "SSC Routine 2027",
    "HSC Routine",
    "বাংলাদেশ শিক্ষাবোর্ড নোটিশ",
  ],
  authors: [{ name: "janao.click Team" }],
  openGraph: {
    title: "janao.click · NCTB Books 2026 - Download Class 1-12 PDF Books",
    description: "ডাউনলোড করুন ২০২৬ সালের ১ম থেকে ১২শ শ্রেণির সকল এনসিটিবি পাঠ্যবই এবং শিক্ষামূলক আপডেট।",
    url: "https://janao.click",
    siteName: "janao.click",
    locale: "bn_BD",
    type: "website",
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
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
