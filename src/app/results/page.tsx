import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { NOTICES_DATA } from '@/data/nctbData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle2, ChevronRight, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'সকল পরীক্ষার ফলাফল | Board Results - janao.online',
  description: 'এসএসসি, এইচএসসি, প্রাথমিক বৃত্তি ও মাদ্রাসা শিক্ষা বোর্ডের পরীক্ষার ফলাফল সরাসরি চেক ও মেধা তালিকা।',
  alternates: {
    canonical: 'https://janao.online/results/',
  },
};

export default function ResultsHubPage() {
  const resultItems = NOTICES_DATA.filter((n) => n.category === 'result' || n.category === 'notice');

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
            ফলাফল (Results)
          </span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          শিক্ষা বোর্ড পরীক্ষার ফলাফল ও মেধা তালিকা
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-6">
          প্রাথমিক বৃত্তি, এসএসসি, দাখিল ও এইচএসসি পরীক্ষার ফলাফল এবং খাতা চ্যালেঞ্জের নিয়মাবলি।
        </p>

        {/* Official Board Result Fast-track */}
        <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          <div>
            <span className="font-bold text-sm text-gray-900 dark:text-white block">
              অনলাইন বোর্ড রেজাল্ট সার্ভার
            </span>
            <span className="text-xs text-gray-500">
              শিক্ষা মন্ত্রণালয়ের কেন্দ্রীয় সার্ভার থেকে সরাসরি রেজাল্ট দেখুন।
            </span>
          </div>

          <a
            href="http://www.educationboardresults.gov.bd/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-bold transition flex items-center gap-1.5 shrink-0"
          >
            <span>রেজাল্ট চেক করুন</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Results Article List */}
        <div className="divide-y divide-gray-200 dark:divide-gray-800 border-t border-b border-gray-200 dark:border-gray-800">
          {resultItems.map((n) => (
            <div key={n.id} className="py-4 flex items-center justify-between gap-4 group">
              <div>
                <Link
                  href={`/results/${n.slug}/`}
                  className="font-bold text-sm sm:text-base text-gray-900 dark:text-white group-hover:text-emerald-700 block"
                >
                  {n.title}
                </Link>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{n.summary}</p>
                <span className="text-[11px] text-gray-400 mt-1 block">{n.date}</span>
              </div>

              <Link
                href={`/results/${n.slug}/`}
                className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold hover:underline shrink-0"
              >
                দেখুন →
              </Link>
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
