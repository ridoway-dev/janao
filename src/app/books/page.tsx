import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CLASS_SHORTCUTS, BOOKS_DATA } from '@/data/nctbData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BookOpen, ChevronRight, Layers, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'NCTB সকল শ্রেণির পাঠ্যবই ২০২৬ ও ২০২৭ PDF ডাউনলোড | All Books - janao.online',
  description: 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুমোদিত প্রাথমিক (১ম-৫ম), মাধ্যমিক (৬ষ্ঠ-১০ম), মাদ্রাসা ইবতেদায়ি, দাখিল ও কলেজ পর্যায়ের সকল বিষয়ের বোর্ড বই ডাউনলোড ও পড়ার সূচি।',
  alternates: {
    canonical: 'https://janao.online/books/',
  },
};

export default function AllBooksIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-gray-900 dark:text-white">
            সকল পাঠ্যবই
          </span>
        </nav>

        <div className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            NCTB পাঠ্যবই ডিরেক্টরি (১ম থেকে ১২শ শ্রেণি)
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-3xl leading-relaxed">
            জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) প্রণীত বাংলাদেশের সকল শ্রেণির প্রাথমিক, মাধ্যমিক ও মাদ্রাসা স্তরের অফিশিয়াল পাঠ্যবইয়ের তালিকা নিচে দেওয়া হলো। আপনার শ্রেণির ওপর ক্লিক করে বইগুলো সরাসরি পড়ুন বা ডাউনলোড করুন।
          </p>
        </div>

        {/* 2027 Alert Box */}
        <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-3 mb-8 text-xs sm:text-sm">
          <div>
            <span className="font-bold text-emerald-900 dark:text-emerald-200 block">
              ২০২৭ শিক্ষাবর্ষের নতুন বইয়ের খোঁজ করছেন?
            </span>
            <span className="text-emerald-800/80 dark:text-emerald-400/80 text-xs">
              বোর্ডের প্রকাশনা ও নতুন কারিকুলাম স্ট্যাটাস ট্র্যাক করতে ২০২৭ ট্র্যাকার পেজে যান।
            </span>
          </div>

          <Link
            href="/books/2027/"
            className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold text-xs shrink-0 transition"
          >
            ২০২৭ ট্র্যাকার দেখুন →
          </Link>
        </div>

        {/* Pillar Clusters */}
        <div className="space-y-6">
          {CLASS_SHORTCUTS.map((group) => (
            <div
              key={group.groupTitleBn}
              className="p-5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a]"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-800">
                <h2 className="font-bold text-base text-gray-900 dark:text-white">
                  {group.groupTitleBn}
                </h2>
                <span className="text-xs text-gray-400">
                  {group.classes.length} টি শ্রেণি
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {group.classes.map((cls) => (
                  <Link
                    key={cls.id}
                    href={`/books/${cls.id}/`}
                    className="p-3 rounded border border-gray-200 dark:border-gray-800 hover:border-emerald-600 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-center transition group"
                  >
                    <span className="text-xl font-bold block text-gray-900 dark:text-white group-hover:text-emerald-700">
                      {cls.num}
                    </span>
                    <span className="text-xs text-gray-500 group-hover:text-emerald-700 font-medium">
                      {cls.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
