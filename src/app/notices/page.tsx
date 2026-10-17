import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { NOTICES_DATA } from '@/data/nctbData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Bell, Calendar, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'শিক্ষা বোর্ড নোটিশ ও রুটিন ২০২৬-২০২৭ | Notices - janao.online',
  description: 'শিক্ষা মন্ত্রণালয়, এনসিটিবি ও শিক্ষা বোর্ডসমূহের সকল জরুরি বিজ্ঞপ্তি, পরীক্ষার রুটিন ও নির্দেশিকা।',
  alternates: {
    canonical: 'https://janao.online/notices/',
  },
};

export default function NoticesIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full">
        
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-gray-900 dark:text-white">
            নোটিশ ও রুটিন
          </span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          শিক্ষা নোটিশ ও পরীক্ষার রুটিন
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-6">
          শিক্ষা বোর্ড ও শিক্ষা মন্ত্রণালয় কর্তৃক প্রকাশিত সর্বশেষ বিজ্ঞপ্তি এবং নির্দেশনাবলী।
        </p>

        <div className="divide-y divide-gray-200 dark:divide-gray-800 border-t border-b border-gray-200 dark:border-gray-800">
          {NOTICES_DATA.map((n) => (
            <div key={n.id} className="py-4 flex items-center justify-between gap-4 group">
              <div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold uppercase">
                  {n.categoryBn}
                </span>
                <Link
                  href={`/notices/${n.slug}/`}
                  className="font-bold text-sm sm:text-base text-gray-900 dark:text-white group-hover:text-emerald-700 block mt-1"
                >
                  {n.title}
                </Link>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{n.summary}</p>
                <span className="text-[11px] text-gray-400 mt-1 block">{n.date}</span>
              </div>

              <Link
                href={`/notices/${n.slug}/`}
                className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold hover:underline shrink-0"
              >
                বিস্তারিত পড়ুন →
              </Link>
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
