import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  BookOpen, 
  ChevronRight, 
  FileText, 
  Download, 
  Calendar, 
  Sparkles, 
  Clock, 
  AlertCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: '২০২৭ সালের এসএসসি ও এইচএসসি রুটিন এবং সিলেবাস — NCTB Syllabus & Routine | Janao.online',
  description: '২০২৭ সালের এসএসসি ও এইচএসসি পরীক্ষার অফিশিয়াল রুটিন, এসএসসি ২০২৭ পূর্ণাঙ্গ সিলেবাস PDF, এসএসসি ২০২৬ সংক্ষিপ্ত সিলেবাস ও ১ম-১০ম শ্রেণি এবং ইবতেদায়ি পাঠ্যবইয়ের তালিকা।',
  keywords: [
    'SSC routine 2027',
    'HSC routine 2027',
    'SSC syllabus 2027 pdf',
    'SSC 2026 short syllabus',
    'NCTB syllabus 2026 2027',
    '২০২৭ এসএসসি রুটিন',
    '২০২৭ এইচএসসি রুটিন',
    'এসএসসি ২০২৭ সিলেবাস',
    'ইবতেদায়ি সিলেবাস ও বই ২০২৬',
  ],
  alternates: {
    canonical: 'https://janao.online/syllabus/',
  },
};

export default function SyllabusPage() {
  const primaryClasses = [
    { name: '১ম শ্রেণি', link: '/books/class-1/', code: 'Class 1' },
    { name: '২য় শ্রেণি', link: '/books/class-2/', code: 'Class 2' },
    { name: '৩য় শ্রেণি', link: '/books/class-3/', code: 'Class 3' },
    { name: '৪র্থ শ্রেণি', link: '/books/class-4/', code: 'Class 4' },
    { name: '৫ম শ্রেণি', link: '/books/class-5/', code: 'Class 5' },
  ];

  const secondaryClasses = [
    { name: '৬ষ্ঠ শ্রেণি', link: '/books/class-6/', code: 'Class 6' },
    { name: '৭ম শ্রেণি', link: '/books/class-7/', code: 'Class 7' },
    { name: '৮ম শ্রেণি', link: '/books/class-8/', code: 'Class 8' },
    { name: '৯ম শ্রেণি', link: '/books/class-9/', code: 'Class 9' },
    { name: '১০ম শ্রেণি (SSC)', link: '/books/class-10/', code: 'SSC Batch' },
  ];

  const ibtedaiClasses = [
    { name: 'ইবতেদায়ি ১ম', link: '/books/ibtedai-1/' },
    { name: 'ইবতেদায়ি ২য়', link: '/books/ibtedai-2/' },
    { name: 'ইবতেদায়ি ৩য়', link: '/books/ibtedai-3/' },
    { name: 'ইবতেদায়ি ৪র্থ', link: '/books/ibtedai-4/' },
    { name: 'ইবতেদায়ি ৫ম', link: '/books/ibtedai-5/' },
  ];

  const dakhilClasses = [
    { name: 'দাখিল ৬ষ্ঠ', link: '/books/dakhil-6/' },
    { name: 'দাখিল ৭ম', link: '/books/dakhil-7/' },
    { name: 'দাখিল ৮ম', link: '/books/dakhil-8/' },
    { name: 'দাখিল ৯ম-১০ম', link: '/books/dakhil-9/' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <Header />

      {/* Breadcrumb Header */}
      <div className="bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">হোম</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white font-medium">সিলেবাস ও পরীক্ষার রুটিন</span>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16 w-full space-y-10">
        
        {/* Hero Section */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>লেটেস্ট শিক্ষাক্রম ও রুটিন আপডেট</span>
            </span>
            <span className="text-xs text-gray-500">
              ২০২৬ শিক্ষাবর্ষ ও ২০২৭ পাবলিক পরীক্ষা
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white tracking-tight leading-snug">
            ২০২৭ সালের এসএসসি ও এইচএসসি রুটিন এবং সিলেবাস PDF
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2.5 max-w-3xl leading-relaxed">
            শিক্ষা মন্ত্রণালয়, এনসিটিবি (NCTB) ও আন্তঃশিক্ষা বোর্ড কর্তৃক প্রকাশিত এসএসসি ২০২৭ ও এইচএসসি ২০২৭ পরীক্ষার অফিসিয়াল রুটিন, এসএসসি ২০২৭ পূর্ণাঙ্গ সিলেবাস (৩টি খণ্ড), এসএসসি ২০২৬ সংক্ষিপ্ত সিলেবাস এবং ১ম–১০ম শ্রেণি ও ইবতেদায়ি পাঠ্যবই ডাউনলোড ডিরেক্টরি।
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#ssc-routine"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition shadow-xs flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>এসএসসি ২০২৭ রুটিন</span>
            </a>

            <a
              href="#hsc-routine"
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition shadow-xs flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>এইচএসসি ২০২৭ রুটিন</span>
            </a>

            <a
              href="#ssc-2027-syllabus"
              className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-lg transition shadow-xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>এসএসসি ২০২৭ সিলেবাস PDF</span>
            </a>

            <a
              href="#short-syllabus"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition shadow-xs flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>এসএসসি ২০২৬ শর্ট সিলেবাস</span>
            </a>
          </div>
        </div>

        {/* 1. SECTION: ২০২৭ সালের এসএসসি ও এইচএসসি রুটিন কার্ডস */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* SSC Routine 2027 */}
          <div id="ssc-routine" className="bg-white dark:bg-[#0f172a] border border-emerald-200 dark:border-emerald-800/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                  পাবলিক পরীক্ষা ২০২৭
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  ১৪ মার্চ ২০২৭ থেকে শুরু
                </span>
              </div>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                SSC Routine 2027 | এসএসসি রুটিন ২০২৭
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                সাধারণ ৯টি শিক্ষা বোর্ড, মাদ্রাসা শিক্ষা বোর্ড (দাখিল) এবং কারিগরি শিক্ষা বোর্ডের এসএসসি ২০২৭ পরীক্ষার অফিসিয়াল সংশোধিত সময়সূচি।
              </p>

              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-xs space-y-1.5 text-gray-700 dark:text-gray-300">
                <div className="flex items-center justify-between">
                  <span>তত্ত্বীয় পরীক্ষা শুরু:</span>
                  <strong className="text-gray-900 dark:text-white">১৪ মার্চ, ২০২৭</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>পরীক্ষার সময়:</span>
                  <span>সকাল ১০:০০ টা – দুপুর ১:০০ টা</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>প্রশ্ন কাঠামো:</span>
                  <span>প্রথমে MCQ ও পরে সৃজনশীল (CQ)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
              <a
                href="https://drive.google.com/file/d/156eL3AGXGhvDj8F4OLjewn8WuJzLf4Bl/view"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1.5 transition shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>📥 রুটিন PDF ডাউনলোড</span>
              </a>

              <Link
                href="/notices/ssc-routine-2027/"
                className="px-3 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-semibold transition"
              >
                বিস্তারিত
              </Link>
            </div>
          </div>

          {/* HSC Routine 2027 */}
          <div id="hsc-routine" className="bg-white dark:bg-[#0f172a] border border-blue-200 dark:border-blue-800/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-xs font-bold">
                  উচ্চ মাধ্যমিক ২০২৭
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  ০৬ জুন ২০২৭ থেকে শুরু
                </span>
              </div>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                HSC Routine 2027 | এইচএসসি রুটিন ২০২৭
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                উচ্চ মাধ্যমিক সার্টিফিকেট (এইচএসসি), আলিম ও এইচএসসি বিএম ভোকেশনাল পরীক্ষা ২০২৭-এর পূর্ণাঙ্গ বিষয়ভিত্তিক পরীক্ষার সময়সূচি ও কেন্দ্র তালিকা।
              </p>

              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-xs space-y-1.5 text-gray-700 dark:text-gray-300">
                <div className="flex items-center justify-between">
                  <span>পরীক্ষা শুরুর তারিখ:</span>
                  <strong className="text-gray-900 dark:text-white">০৬ জুন, ২০২৭</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>শিফট:</span>
                  <span>সকাল ১০টা - ১টা ও বিকাল ২টা - ৫টা</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>ব্যবহারিক পরীক্ষা:</span>
                  <span>তত্ত্বীয় পরীক্ষা সমাপ্তির পর নিজ কেন্দ্রে</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
              <a
                href="https://drive.google.com/file/d/1iq1kewpGvwbT1IWeJgT_NOeZFaB5vvvH/view"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1.5 transition shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>📥 রুটিন PDF ডাউনলোড</span>
              </a>

              <Link
                href="/notices/hsc-routine-2027/"
                className="px-3 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-semibold transition"
              >
                বিস্তারিত
              </Link>
            </div>
          </div>

        </div>

        {/* 2. SECTION: এসএসসি ২০২৭ পূর্ণাঙ্গ সিলেবাস PDF (৩টি পার্ট) */}
        <div id="ssc-2027-syllabus" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-bold text-xs uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>NCTB মূল্যায়ন নির্দেশিকা ও নম্বর বিভাজন</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            এসএসসি পরীক্ষা ২০২৭ পূর্ণাঙ্গ সিলেবাস PDF ডাউনলোড (৩টি খণ্ড)
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-3xl leading-relaxed">
            ২০২৫-২০২৬ শিক্ষাবর্ষে ৯ম ও ১০ম শ্রেণিতে অধ্যয়নরত শিক্ষার্থীদের ২০২৭ সালের এসএসসি পরীক্ষার জন্য ৩টি পৃথক খণ্ডে বিষয়ভিত্তিক সিলেবাস ও মানবণ্টন প্রকাশ করা হয়েছে।
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            
            {/* Part 1 */}
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300">
                  খণ্ড ০১
                </span>
                <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white mt-2">
                  আবশ্যিক বিষয়সমূহ
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  বাংলা, ইংরেজি, গণিত, তথ্য ও যোগাযোগ প্রযুক্তি (ICT) সহ সকল আবশ্যিক বিষয়।
                </p>
              </div>
              <a
                href="https://drive.google.com/file/d/135PtijGbpOI2kf0Xi88LWcYMqIlbUI0J/view"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-3 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>পার্ট-১ PDF ডাউনলোড</span>
              </a>
            </div>

            {/* Part 2 */}
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300">
                  খণ্ড ০২
                </span>
                <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white mt-2">
                  বিজ্ঞান ও কারিগরি বিষয়
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান, উচ্চতর গণিত ও ব্যবহারিক পরীক্ষা রূপরেখা।
                </p>
              </div>
              <a
                href="https://drive.google.com/file/d/131hgufsoekk3x4LSESr2jF6yrqZmxfD3/view"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-3 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>পার্ট-২ PDF ডাউনলোড</span>
              </a>
            </div>

            {/* Part 3 */}
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300">
                  খণ্ড ০৩
                </span>
                <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white mt-2">
                  মানবিক ও ব্যবসায় শিক্ষা
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  ইতিহাস, ভূগোল, পৌরনীতি, অর্থনীতি, হিসাববিজ্ঞান, ফিন্যান্স ও ব্যবসায় উদ্যোগ।
                </p>
              </div>
              <a
                href="https://drive.google.com/file/d/1jqCocawEYug-ljl9WyWLc5ecuqPZYZ6z/view"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-3 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>পার্ট-৩ PDF ডাউনলোড</span>
              </a>
            </div>

          </div>
        </div>

        {/* 3. SECTION: এসএসসি ২০২৬ সংক্ষিপ্ত সিলেবাস (Short Syllabus) */}
        <div id="short-syllabus" className="bg-white dark:bg-[#0f172a] border border-amber-200 dark:border-amber-900/60 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold">
              পরিমার্জিত পুনর্বিন্যাসকৃত সিলেবাস
            </span>
            <span className="text-xs text-gray-500">
              ২০২৬ সালের এসএসসি পরীক্ষার্থীদের জন্য প্রযোজ্য
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            SSC 2026 Short Syllabus PDF & সংশোধিত নম্বর বিভাজন
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
            শিক্ষা মন্ত্রণালয় ও NCTB কর্তৃক এসএসসি ২০২৬ ব্যাচের জন্য অধ্যায়ভিত্তিক পরিমার্জিত সংক্ষিপ্ত সিলেবাসের মূল পরিবর্তনগুলো নিচে দেওয়া হলো:
          </p>

          {/* Quick Notice Points */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 rounded-lg text-xs">
              <strong className="text-amber-900 dark:text-amber-200 block mb-1">বাংলা ২য় পত্র:</strong>
              অনুবাদ অংশ (১০ নম্বর) বাদ দিয়ে তা সংবাদ প্রতিবেদন অংশে যুক্ত করা হয়েছে।
            </div>

            <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 rounded-lg text-xs">
              <strong className="text-amber-900 dark:text-amber-200 block mb-1">আইসিটি (ICT):</strong>
              সংক্ষিপ্ত উত্তর বাদ দিয়ে বহুনির্বাচনি (MCQ) অংশে মোট ২৫ নম্বর নির্ধারণ করা হয়েছে।
            </div>

            <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 rounded-lg text-xs">
              <strong className="text-amber-900 dark:text-amber-200 block mb-1">ফিন্যান্স ও ব্যাংকিং:</strong>
              ফিন্যান্স থেকে ৮টি ও ব্যাংকিং থেকে ৭টি মোট ১৫টি থেকে ১০টির উত্তর দিতে হবে।
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="https://drive.google.com/file/d/1yBeEoqvWnzUsvb8M0DEfQ5DHtmFzZz9z/view"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>সংশোধিত নম্বর বণ্টন PDF</span>
            </a>

            <a
              href="https://drive.google.com/file/d/1IfvGB_E6DK3FuDPhMJquxKtQjOwyq5aY/view"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-xs font-bold border border-gray-300 dark:border-gray-700 flex items-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>প্রশ্ন কাঠামো ও সম্পূর্ণ সিলেবাস PDF</span>
            </a>

            <Link
              href="/notices/ssc-2026-short-syllabus/"
              className="text-xs text-amber-700 dark:text-amber-400 hover:underline font-bold ml-auto"
            >
              অধ্যায়ভিত্তিক পূর্ণাঙ্গ তালিকা পড়ুন →
            </Link>
          </div>
        </div>

        {/* 4. SECTION: ২০২৭ পাঠ্যবই পরিবর্তন ও কারিকুলাম নোটিশ */}
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase mb-1">
            <AlertCircle className="w-4 h-4" />
            <span>NCTB কারিকুলাম উন্নয়ন ২০২৭</span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            ২০২৭ সাল থেকে পাঠ্যবই পরিমার্জন ও ৩টি নতুন বিষয় সংযোজন
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-2 leading-relaxed max-w-3xl">
            ২০২৭ শিক্ষাবর্ষ থেকে মাধ্যমিকে ৯৯টি ও প্রাথমিকে ৩৬টি বই পরিমার্জন করা হচ্ছে। এর মধ্যে ৪র্থ শ্রেণিতে <strong>ক্রীড়া ও সংস্কৃতি</strong>, ৬ষ্ঠ শ্রেণিতে <strong>লার্নিং উইথ হ্যাপিনেস</strong> এবং ৭ম শ্রেণিতে <strong>জীবন ও কর্মমুখী শিক্ষা</strong> সংযোজিত হচ্ছে। এছাড়া তথ্য ও যোগাযোগ প্রযুক্তিতে এআই (AI), রোবটিক্স এবং মুক্তিযুদ্ধের সঠিক ইতিহাসের সংযোজন চূড়ান্ত হয়েছে।
          </p>

          <div className="mt-4 flex items-center gap-3">
            <Link
              href="/notices/nctb-book-changes-2027/"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition"
            >
              পরিমার্জন নির্দেশিকা বিস্তারিত দেখুন →
            </Link>
            <Link
              href="/books/2027/"
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-xs font-semibold rounded-lg hover:bg-emerald-50 transition"
            >
              ২০২৭ পাঠ্যবই ট্র্যাকার
            </Link>
          </div>
        </div>

        {/* 5. SECTION: শ্রেণিভিত্তিক পাঠ্যবই ও সিলেবাস নেভিগেশন (১–১০ম শ্রেণি ও ইবতেদায়ি) */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              ২০২৬ শিক্ষাবর্ষের শ্রেণিভিত্তিক মূল পাঠ্যবই ও সিলেবাস ডিরেক্টরি
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              সংশ্লিষ্ট শ্রেণির সব বিষয়ের মূল বোর্ড বই অনলাইনে সরাসরি পড়তে বা PDF ডাউনলোড করতে ক্লিক করুন।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Primary */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-xs">
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase block mb-1">
                প্রাথমিক স্তর (১–৫ম)
              </span>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-3">
                প্রাথমিক শিক্ষাক্রম বই
              </h3>
              <div className="space-y-1.5">
                {primaryClasses.map((c) => (
                  <Link
                    key={c.code}
                    href={c.link}
                    className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-medium text-gray-800 dark:text-gray-200 hover:text-emerald-700 transition"
                  >
                    <span>{c.name}</span>
                    <span className="text-[11px] text-gray-400">বই দেখুন →</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Secondary */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-xs">
              <span className="text-[11px] font-bold text-blue-700 dark:text-blue-400 uppercase block mb-1">
                মাধ্যমিক স্তর (৬ষ্ঠ–১০ম)
              </span>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-3">
                মাধ্যমিক ও এসএসসি বই
              </h3>
              <div className="space-y-1.5">
                {secondaryClasses.map((c) => (
                  <Link
                    key={c.code}
                    href={c.link}
                    className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-xs font-medium text-gray-800 dark:text-gray-200 hover:text-blue-700 transition"
                  >
                    <span>{c.name}</span>
                    <span className="text-[11px] text-gray-400">বই দেখুন →</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Ibtedai */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-xs">
              <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 uppercase block mb-1">
                মাদ্রাসা ইবতেদায়ি (১–৫ম)
              </span>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-3">
                ইবতেদায়ি পাঠ্যবই
              </h3>
              <div className="space-y-1.5">
                {ibtedaiClasses.map((c) => (
                  <Link
                    key={c.name}
                    href={c.link}
                    className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-800/60 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-xs font-medium text-gray-800 dark:text-gray-200 hover:text-teal-700 transition"
                  >
                    <span>{c.name}</span>
                    <span className="text-[11px] text-gray-400">বই দেখুন →</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Dakhil & College */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-xs">
              <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase block mb-1">
                দাখিল ও কলেজ
              </span>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-3">
                দাখিল ও উচ্চ মাধ্যমিক
              </h3>
              <div className="space-y-1.5">
                {dakhilClasses.map((c) => (
                  <Link
                    key={c.name}
                    href={c.link}
                    className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-xs font-medium text-gray-800 dark:text-gray-200 hover:text-amber-700 transition"
                  >
                    <span>{c.name}</span>
                    <span className="text-[11px] text-gray-400">বই দেখুন →</span>
                  </Link>
                ))}
                <Link
                  href="/books/class-11/"
                  className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-xs font-medium text-gray-800 dark:text-gray-200 hover:text-amber-700 transition"
                >
                  <span>একাদশ শ্রেণি (HSC)</span>
                  <span className="text-[11px] text-gray-400">বই দেখুন →</span>
                </Link>
                <Link
                  href="/books/class-12/"
                  className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-xs font-medium text-gray-800 dark:text-gray-200 hover:text-amber-700 transition"
                >
                  <span>দ্বাদশ শ্রেণি (HSC)</span>
                  <span className="text-[11px] text-gray-400">বই দেখুন →</span>
                </Link>
              </div>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
