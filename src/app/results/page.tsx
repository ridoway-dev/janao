import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { NOTICES_DATA } from '@/data/nctbData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink, 
  Calculator, 
  FileText, 
  Search, 
  Sparkles,
  BookOpen
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'সকল শিক্ষা বোর্ডের ফলাফল ও মার্কশিট | Board Results — janao.online',
  description: 'এসএসসি, এইচএসসি, আলিম, দাখিল ও প্রাথমিক বৃত্তি পরীক্ষার রেজাল্ট দেখার অফিসিয়াল সার্ভার লিংক, মার্কশিট ডাউনলোড পদ্ধতি এবং GPA ক্যালকুলেটর।',
  keywords: [
    'education board results',
    'SSC result 2026',
    'HSC result 2026',
    'এইচএসসি রেজাল্ট দেখার নিয়ম',
    'এসএসসি রেজাল্ট মার্কশিট',
    'eboardresults',
    'বোর্ড ফলাফল'
  ],
  alternates: {
    canonical: 'https://janao.online/results/',
  },
  openGraph: {
    title: 'শিক্ষা বোর্ড পরীক্ষার ফলাফল ও মার্কশিট — janao.online',
    description: 'এসএসসি, দাখিল ও এইচএসসি পরীক্ষার ফলাফল সরাসরি চেক ও মেধা তালিকা।',
    url: 'https://janao.online/results/',
    siteName: 'Janao.online',
    locale: 'bn_BD',
    type: 'website',
  },
};

export default function ResultsHubPage() {
  const resultItems = NOTICES_DATA.filter((n) => n.category === 'result' || n.category === 'notice');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <Header />

      {/* Breadcrumb Header */}
      <div className="bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">হোম</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white font-medium">ফলাফল ও মার্কশিট</span>
        </div>
      </div>

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full space-y-8">
        
        {/* Hero Header */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>অফিসিয়াল বোর্ড রেজাল্ট পোর্টাল</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            শিক্ষা বোর্ড পরীক্ষার ফলাফল ও মার্কশিট গেটওয়ে
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed max-w-2xl">
            বাংলাদেশ শিক্ষা বোর্ডের এসএসসি, দাখিল, এইচএসসি ও আলিম পরীক্ষার ফলাফল সরাসরি কেন্দ্রীয় সার্ভার থেকে দ্রুত ও নিরাপদে চেক করুন।
          </p>

          {/* Quick link to GPA Calculator */}
          <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-3">
            <Link
              href="/tools/#gpa-calculator"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              <Calculator className="w-4 h-4" />
              <span>রেজাল্টের পর জিপিএ হিসাব করতে চান? GPA ক্যালকুলেটর খুলুন →</span>
            </Link>
          </div>
        </div>

        {/* Live Official Server Gateways */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Server 1: eboardresults (Fastest for Individual / Institution) */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0f172a] border border-emerald-300 dark:border-emerald-800/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold rounded">
                  সার্ভার ১ (সুপার ফাস্ট)
                </span>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> সক্রিয় সার্ভার
                </span>
              </div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                eBoardResults মার্কশিট গেটওয়ে
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 leading-relaxed">
                রোল ও রেজিস্ট্রেশন নম্বর ছাড়াই সরাসরি বা বিস্তারিত পূর্ণ বিষয়ভিত্তিক মার্কশিট প্রিন্ট করার দ্রুততম মাধ্যম।
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span className="text-[11px] text-gray-500">ঢাকা বোর্ড ও অন্যান্য</span>
              <a
                href="https://eboardresults.com/v2/home"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <span>মার্কশিট দেখুন</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Server 2: Official Education Board Results */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-[11px] font-bold rounded">
                  সার্ভার ২ (সরকারি মূল সার্ভার)
                </span>
                <span className="text-xs text-blue-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> অফিশিয়াল
                </span>
              </div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                Education Board Results Gov BD
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 leading-relaxed">
                শিক্ষা মন্ত্রণালয়ের অফিসিয়াল কেন্দ্রীয় ডাটাবেজ সার্ভার। সকল সাধারণ, মাদ্রাসা ও কারিগরি বোর্ডের ফলাফল চেক করা যায়।
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span className="text-[11px] text-gray-500">সরকারি গেটওয়ে</span>
              <a
                href="http://www.educationboardresults.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <span>রেজাল্ট চেক করুন</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* SMS এ রেজাল্ট পাওয়ার নিয়ম কার্ড */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xs">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>মোবাইল SMS-এর মাধ্যমে দ্রুত রেজাল্ট জানার নিয়ম</span>
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            সার্ভারে চাপ থাকলে যেকোনো মোবাইল অপারেটর (Teletalk, Grameenphone, Robi, Banglalink, Airtel) থেকে মেসেজ পাঠিয়ে রেজাল্ট পাওয়া যায়:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3.5 bg-gray-50 dark:bg-[#141d2e] rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="font-bold text-emerald-700 dark:text-emerald-400 font-sans mb-1">
                SSC বা দাখিল রেজাল্ট:
              </div>
              <div className="text-gray-900 dark:text-white bg-white dark:bg-[#0f172a] p-2 rounded border border-gray-200 dark:border-gray-700">
                SSC &lt;স্পেস&gt; বোর্ডের ১ম ৩ অক্ষর &lt;স্পেস&gt; রোল &lt;স্পেস&gt; সাল
              </div>
              <div className="text-[11px] text-gray-500 font-sans mt-2">
                উদাহরণ: <code className="text-emerald-600">SSC DHA 123456 2026</code> লিখে পাঠান <strong>16222</strong> নম্বরে।
              </div>
            </div>

            <div className="p-3.5 bg-gray-50 dark:bg-[#141d2e] rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="font-bold text-teal-700 dark:text-teal-400 font-sans mb-1">
                HSC বা আলিম রেজাল্ট:
              </div>
              <div className="text-gray-900 dark:text-white bg-white dark:bg-[#0f172a] p-2 rounded border border-gray-200 dark:border-gray-700">
                HSC &lt;স্পেস&gt; বোর্ডের ১ম ৩ অক্ষর &lt;স্পেস&gt; রোল &lt;স্পেস&gt; সাল
              </div>
              <div className="text-[11px] text-gray-500 font-sans mt-2">
                উদাহরণ: <code className="text-teal-600">HSC RAJ 654321 2026</code> লিখে পাঠান <strong>16222</strong> নম্বরে।
              </div>
            </div>
          </div>
        </div>

        {/* Results Article & Board Updates List */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xs">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">
            সাম্প্রতিক ফলাফল সংক্রান্ত নোটিশ ও খাতা চ্যালেঞ্জ
          </h2>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {resultItems.map((n) => (
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
                  className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold hover:underline shrink-0"
                >
                  বিস্তারিত →
                </Link>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
