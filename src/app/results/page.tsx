import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { NOTICES_DATA } from '@/data/nctbData';
import { RESULT_CHECKERS_LIST } from '@/data/resultCheckersData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteractiveResultPortal from '@/components/InteractiveResultPortal';
import { 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink, 
  Calculator, 
  FileText, 
  Search, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'সকল পরীক্ষার ফলাফল চেকার — SSC, HSC, NU ও চাকরির রেজাল্ট | janao.online',
  description: 'এসএসসি, দাখিল, এইচএসসি, কারিগরি (BTEB), জাতীয় বিশ্ববিদ্যালয় (NU), বিসিএস ও সরকারি চাকরির ফলাফল এবং মার্কশিট চেকার পোর্টাল।',
  keywords: [
    'SSC result checker',
    'HSC result checker',
    'NU result checker',
    'বিসিএস রেজাল্ট',
    'কারিগরি বোর্ড রেজাল্ট',
    'primary scholarship result',
    'education board results bd'
  ],
  alternates: {
    canonical: 'https://janao.online/results/',
  },
  openGraph: {
    title: 'অনলাইন রেজাল্ট চেকার পোর্টাল — janao.online',
    description: 'এসএসসি, এইচএসসি, মাদ্রাসা, কারিগরি ও জাতীয় বিশ্ববিদ্যালয়ের অফিসিয়াল রেজাল্ট চেকার।',
    url: 'https://janao.online/results/',
    siteName: 'Janao.online',
    locale: 'bn_BD',
    type: 'website',
  },
};

export default function ResultsHubPage() {
  const resultNotices = NOTICES_DATA.filter((n) => n.category === 'result' || n.category === 'notice');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <Header />

      {/* Breadcrumb Header */}
      <div className="bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">হোম</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white font-medium">রেজাল্ট চেকার ও ফলাফল হাব</span>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full space-y-10">
        
        {/* Main Interactive Result Portal Form */}
        <section id="interactive-checker">
          <InteractiveResultPortal />
        </section>

        {/* Dedicated Specialized Result Checkers Grid (Like students.bd) */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <span>সকল অফিসিয়াল রেজাল্ট চেকার ডিরেক্টরি</span>
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                বোর্ড, মাদ্রাসা, কারিগরি, বিশ্ববিদ্যালয় ও চাকরির রেজাল্টের জন্য নির্দিষ্ট সার্ভার লিংক
              </p>
            </div>

            <Link
              href="/tools/"
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>GPA ও CGPA ক্যালকুলেটর →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {RESULT_CHECKERS_LIST.map((checker) => (
              <div
                key={checker.id}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:border-emerald-500 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{checker.icon}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${checker.badgeColor}`}>
                      {checker.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {checker.title}
                  </h3>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                    {checker.examName}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                    {checker.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <a
                      href={checker.server1Url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
                    >
                      <span>রেজাল্ট চেক করুন</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    {checker.server2Url && (
                      <a
                        href={checker.server2Url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                      >
                        সার্ভার ২ →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Results Notices & Challenge Rules */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xs">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>সাম্প্রতিক ফলাফল প্রকাশ ও খাতা পুনর্নিরীক্ষণ নোটিশ</span>
          </h2>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {resultNotices.map((n) => (
              <div key={n.id} className="py-3.5 flex items-center justify-between gap-4 group">
                <div>
                  <Link
                    href={`/results/${n.slug}/`}
                    className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 block"
                  >
                    {n.title}
                  </Link>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{n.summary}</p>
                  <span className="text-[11px] text-gray-400 mt-1 block">{n.date}</span>
                </div>

                <Link
                  href={`/results/${n.slug}/`}
                  className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold hover:underline shrink-0 flex items-center gap-1"
                >
                  <span>বিস্তারিত</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
