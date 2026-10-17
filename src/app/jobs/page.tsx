import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Briefcase, ChevronRight, CheckCircle2, ArrowRight, ExternalLink, Calendar, Building2, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'চাকরি ও ক্যারিয়ার তথ্য পোর্টাল — বিসিএস, সরকারি ও শিক্ষক নিয়োগ | Janao.online',
  description: 'বাংলাদেশ সরকারি চাকরি, বিসিএস প্রস্তুতি, ব্যাংক নিয়োগ, প্রাথমিক শিক্ষক নিয়োগ সার্কুলার ও অনলাইন আবেদন নির্দেশিকা।',
  keywords: ['সরকারি চাকরি সার্কুলার', 'বিসিএস প্রস্তুতি', 'BCS circular 2026', 'Govt job circular BD', 'শিক্ষক নিয়োগ', 'ব্যাংক জব'],
  alternates: {
    canonical: 'https://janao.online/jobs/',
  },
};

export default function JobsPage() {
  const jobCategories = [
    {
      id: 'bcs',
      title: 'বিসিএস ও বাংলাদেশ সরকারি কর্ম কমিশন (BPSC)',
      tag: 'শীর্ষ অগ্রাধিকার',
      badge: 'BPSC',
      desc: '৪৬তম ও ৪৭তম বিসিএস পরীক্ষার প্রস্তুতি, সিলেবাস, প্রিলিমিনারি মানবণ্টন ও সার্কুলার নির্দেশিকা।',
      linkText: 'বিসিএস প্রস্তুতি গাইড',
      officialPortal: 'http://bpsc.teletalk.com.bd/',
      officialName: 'bpsc.teletalk.com.bd',
    },
    {
      id: 'primary-teacher',
      title: 'প্রাথমিক সহকারী শিক্ষক নিয়োগ',
      tag: 'চলমান নিয়োগ',
      badge: 'DPE',
      desc: 'সরকারি প্রাথমিক বিদ্যালয়ের সহকারী শিক্ষক নিয়োগ পরীক্ষা, প্রবেশপত্র ডাউনলোড ও ফলাফল তথ্য।',
      linkText: 'শিক্ষক নিয়োগ তথ্য',
      officialPortal: 'http://dpe.teletalk.com.bd/',
      officialName: 'dpe.teletalk.com.bd',
    },
    {
      id: 'ntrca',
      title: 'বেসরকারি শিক্ষক নিবন্ধন (NTRCA)',
      tag: 'শিক্ষক নিয়োগ',
      badge: 'NTRCA',
      desc: 'স্কুল, কলেজ ও মাদ্রাসা পর্যায়ের শিক্ষক নিবন্ধন প্রিলিমিনারি ও লিখিত পরীক্ষা প্রস্তুতি।',
      linkText: 'NTRCA সার্কুলার নির্দেশিকা',
      officialPortal: 'http://ntrca.teletalk.com.bd/',
      officialName: 'ntrca.teletalk.com.bd',
    },
    {
      id: 'bank-jobs',
      title: 'বাংলাদেশ ব্যাংক ও সমন্বিত ৯ ব্যাংক নিয়োগ',
      tag: 'ব্যাংকার্স সিলেকশন',
      badge: 'BBSC',
      desc: 'অফিসার জেনারেল, সিনিয়র অফিসার ও ক্যাশ অফিসার নিয়োগ পরীক্ষার সময়সূচি ও প্রবেশপত্র।',
      linkText: 'ব্যাংক জব বিস্তারিত',
      officialPortal: 'https://erecruitment.bb.org.bd/',
      officialName: 'erecruitment.bb.org.bd',
    },
    {
      id: 'ministry-jobs',
      title: 'মন্ত্রণালয় ও সরকারি অধিদপ্তর সার্কুলার (১১-২০তম গ্রেড)',
      tag: 'সরকারি চাকরি',
      badge: 'All Govt',
      desc: 'বিভিন্ন মন্ত্রণালয়, সচিবালয় ও রাজস্ব খাতভুক্ত দপ্তরের পদসমূহের অনলাইন আবেদন ফর্ম।',
      linkText: 'মন্ত্রণালয় সার্কুলার সমূহ',
      officialPortal: 'http://alljobs.teletalk.com.bd/',
      officialName: 'alljobs.teletalk.com.bd',
    },
    {
      id: 'defense',
      title: 'প্রতিরক্ষা ও বাংলাদেশ পুলিশ নিয়োগ',
      tag: 'নিরাপত্তা বাহিনী',
      badge: 'Police/Armed',
      desc: 'বাংলাদেশ সেনাবাহিনী, নৌবাহিনী, বিমানবাহিনী ও পুলিশ সাব-ইন্সপেক্টর (SI) ও কনস্টেবল নিয়োগ তথ্য।',
      linkText: 'ডিফেন্স সার্কুলার',
      officialPortal: 'http://police.teletalk.com.bd/',
      officialName: 'police.teletalk.com.bd',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <Header />

      {/* Breadcrumb Header */}
      <div className="bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">হোম</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white font-medium">চাকরি ও ক্যারিয়ার</span>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16 w-full">
        
        {/* Hero Section */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Briefcase className="w-4 h-4" />
            <span>বাংলাদেশ চাকরি ও ক্যারিয়ার হাব</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            সরকারি ও বেসরকারি চাকরি সার্কুলার ও নিয়োগ গাইড
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-3xl leading-relaxed">
            বিসিএস, প্রাথমিক শিক্ষক নিয়োগ, ব্যাংক নিয়োগ ও সরকারি দপ্তরের অফিসিয়াল সার্কুলার, আবেদনের নিয়মাবলী এবং সঠিক প্রস্তুতি নির্দেশিকা এক জায়গায়।
          </p>

          <div className="mt-5 p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-700 dark:text-amber-400" />
            <div>
              <span className="font-bold">সতর্কবার্তা:</span> সরকারি চাকরির আবেদনের ক্ষেত্রে সবসময় অফিসিয়াল ওয়েবসাইট (যেমন teletalk.com.bd বা সংশ্লিষ্ট সরকারি পোর্টাল) ব্যবহার করুন। কোনো প্রকার আর্থিক লেনদেন বা দালালের খপ্পরে পড়বেন না।
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobCategories.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-lg p-5 flex flex-col justify-between hover:border-emerald-600 dark:hover:border-emerald-500 transition shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="px-2 py-0.5 text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded">
                    {item.badge}
                  </span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">
                    {item.tag}
                  </span>
                </div>

                <h2 className="text-base font-bold text-gray-900 dark:text-white leading-snug">
                  {item.title}
                </h2>

                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-xs">
                <a
                  href={item.officialPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
                >
                  <span>আবেদন পোর্টাল</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <span className="text-[11px] text-gray-400 truncate max-w-[140px]">
                  {item.officialName}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Age Limit & Eligibility Guidelines */}
        <section className="mt-10 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            সরকারি চাকরির বয়সসীমা ও প্রয়োজনীয় নির্দেশিকা
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-600 dark:text-gray-300">
            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">সাধারণ প্রার্থীর বয়সসীমা</h3>
              <p>সর্বশেষ গেজেট অনুযায়ী সরকারি চাকরির সাধারণ প্রার্থীদের সর্বোচ্চ বয়সসীমা ৩২ বছর নির্ধারিত হয়েছে।</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">মুক্তিযোদ্ধা ও প্রতিবন্ধী কোটা</h3>
              <p>বীর মুক্তিযোদ্ধার সন্তান ও শারীরিক প্রতিবন্ধী প্রার্থীদের জন্য বয়সসীমা সর্বোচ্চ ৩২ বছর বহাল রয়েছে।</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">টেলিটক এসএমএস আবেদন</h3>
              <p>আবেদন ফি প্রদানের জন্য পর্যাপ্ত ব্যালেন্সসহ প্রি-পেইড টেলিটক সংযোগ ব্যবহার করে নির্ধারিত কোডে SMS পাঠান।</p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
