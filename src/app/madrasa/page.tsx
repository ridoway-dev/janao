import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BookOpen, ChevronRight, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'মাদ্রাসা শিক্ষাক্রম পাঠ্যবই ২০২৬ ও ২০২৭ — ইবতেদায়ি ও দাখিল | Janao.online',
  description: 'বাংলাদেশ মাদ্রাসা শিক্ষা বোর্ড ও NCTB প্রকাশিত ইবতেদায়ি (১ম–৫ম) এবং দাখিল (৬ষ্ঠ–১০ম) শ্রেণির সকল বিষয়ের পাঠ্যবই PDF ও সিলেবাস নির্দেশিকা।',
  keywords: ['মাদ্রাসা বই ২০২৬', 'ইবতেদায়ি বই', 'দাখিল বই ২০২৬', 'দাখিল গণিত', 'কুরআন মাজিদ বই', 'Madrasa Books PDF'],
  alternates: {
    canonical: 'https://janao.online/madrasa/',
  },
};

export default function MadrasaIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <Header />

      {/* Breadcrumb Header */}
      <div className="bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">হোম</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white font-medium">মাদ্রাসা শিক্ষাক্রম</span>
        </div>
      </div>

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-16 w-full">
        {/* Hero Section */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>বাংলাদেশ মাদ্রাসা শিক্ষা বোর্ড</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            মাদ্রাসা পাঠ্যবই ও শিক্ষাক্রম হাব ২০২৬–২০২৭
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-3xl leading-relaxed">
            জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) এবং মাদ্রাসা শিক্ষা বোর্ড প্রকাশিত ইবতেদায়ি ও দাখিল স্তরের কুরআন মাজিদ, আকাইদ ও ফিকাহ, আরবি এবং সাধারণ সকল বিষয়ের পিডিএফ বই।
          </p>
        </div>

        {/* 2 Clusters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs hover:border-emerald-600 transition flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded">
                প্রাথমিক স্তর (শ্রেণি ১–৫)
              </span>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-3">
                ইবতেদায়ি স্তরের পাঠ্যবই
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                ১ম থেকে ৫ম শ্রেণির আরবি, আকাইদ ও ফিকহ্, আমার বাংলা বই, প্রাথমিক গণিত, ইংরেজি ও পরিবেশ পরিচিতি বই।
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span className="text-xs text-gray-500">মোট ৩৬+ টি বই</span>
              <Link
                href="/madrasa/ebtedayi/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold transition"
              >
                <span>ইবতেদায়ি বই দেখুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs hover:border-emerald-600 transition flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded">
                মাধ্যমিক স্তর (শ্রেণি ৬–১০)
              </span>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-3">
                দাখিল স্তরের পাঠ্যবই
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                ৬ষ্ঠ থেকে ১০ম শ্রেণির কুরআন মাজিদ ও তাজবীদ, হাদিস শরিফ, আরবি ১ম ও ২য় পত্র, গণিত, বিজ্ঞান এবং সাধারণ বিষয়সমূহ।
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span className="text-xs text-gray-500">মোট ৫৮+ টি বই</span>
              <Link
                href="/madrasa/dakhil/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold transition"
              >
                <span>দাখিল বই দেখুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
