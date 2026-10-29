import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HscResultChecker from '@/components/HscResultChecker';
import { 
  ChevronRight, 
  HelpCircle, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  BookOpen, 
  FileText, 
  Award,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  GraduationCap
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'HSC Result 2026 মার্কশিট সহ রেজাল্ট দেখার নিয়ম ও ৩টি ডিরেক্ট লিংক | janao.online',
  description: 'এইচএসসি ও আলিম পরীক্ষা ২০২৬ ফলাফল ও পূর্ণাঙ্গ বিষয়ভিত্তিক মার্কশিট ডাউনলোড করুন। eBoardResults সার্ভার ১, ২ ও ৩ সরাসরি লিঙ্ক, রোল ও রেজিস্ট্রেশন ছাড়া রেজাল্ট এবং সকল বোর্ডের এসএমএস (SMS) পদ্ধতি।',
  keywords: [
    'HSC Result 2026',
    'এইচএসসি রেজাল্ট ২০২৬',
    'HSC result mark sheet with numbers',
    'eboardresults',
    'education board results bd',
    'hsc result 2026 sms format',
    'dhaka board hsc result',
    'hsc board challenge 2026',
    'hsc result server down problem solve'
  ],
  alternates: {
    canonical: 'https://janao.online/results/hsc/',
  },
  openGraph: {
    title: 'HSC Result 2026 মার্কশিট সহ দেখার নিয়ম — janao.online',
    description: 'এইচএসসি ২০২৬ ফলাফল দ্রুত সার্ভার ১ ও ২ থেকে ডাউনলোড করুন। সম্পূর্ণ বিষয়ভিত্তিক নম্বর ও এসএমএস ফরম্যাট।',
    url: 'https://janao.online/results/hsc/',
    siteName: 'Janao.online',
    locale: 'bn_BD',
    type: 'article',
  },
};

const FAQ_ITEMS = [
  {
    q: '১. এইচএসসি ২০২৬ রেজাল্ট কখন ও কীভাবে প্রকাশিত হয়?',
    a: 'শিক্ষা মন্ত্রণালয় এবং আন্তঃশিক্ষা বোর্ড সমন্বয় কমিটির ঘোষণা অনুযায়ী ফলাফল প্রকাশের দিন বেলা ১১:০০ টায় প্রধানমন্ত্রী/প্রধান উপদেষ্টার কাছে ফলাফলের অনুলিপি হস্তান্তর করা হয়। দুপুর ১২:০০ টা থেকে শিক্ষা বোর্ডের অফিশিয়াল সার্ভার এবং এসএমএস এর মাধ্যমে পরীক্ষার্থীরা রেজাল্ট দেখতে পারেন।',
  },
  {
    q: '২. সার্ভার ডাউন বা এরর দেখালে দ্রুত রেজাল্ট দেখার উপায় কী?',
    a: 'ফলাফল প্রকাশের প্রথম ২-৩ ঘণ্টা educationboardresults.gov.bd সার্ভারে লক্ষ লক্ষ ভিজিটরের চাপে সার্ভার ক্র্যাশ বা লোডিং টাইম অনেক বেশি হতে পারে। এমন অবস্থায় eboardresults.com (Server 1) অথবা মোবাইল থেকে SMS পাঠিয়ে সবচেয়ে দ্রুত ফলাফল জানা যায়।',
  },
  {
    q: '৩. মার্কশিট ও বিষয়ভিত্তিক নম্বরসহ রেজাল্ট কীভাবে ডাউনলোড করব?',
    a: 'eboardresults.com এ গিয়ে "Individual Result" নির্বাচন করুন। আপনার রোল এবং রেজিস্ট্রেশন নম্বর দুটিই ইনপুট দিয়ে ক্যাপচা সমাধান করে "Get Result" এ ক্লিক করলেই প্রতিটি বিষয়ের প্রাপ্ত গ্রেড ও নম্বর সহ পূর্ণাঙ্গ মার্কশিট চলে আসবে।',
  },
  {
    q: '৪. রেজিস্ট্রেশন নম্বর ছাড়া কি শুধু রোল দিয়ে রেজাল্ট দেখা সম্ভব?',
    a: 'হ্যাঁ! eBoardResults সার্ভারে শুধু রোল নম্বর দিলেও জিপিএ রেজাল্ট দেখা যায়। তবে বিষয়ভিত্তিক পূর্ণাঙ্গ গ্রেড ও নম্বর দেখার জন্য রেজিস্ট্রেশন নম্বর প্রয়োজন হবে।',
  },
  {
    q: '৫. EIIN নম্বর দিয়ে কলেজের পুরো রেজাল্ট শিট কীভাবে ডাউনলোড করব?',
    a: 'eboardresults.com এ "Institution Result" অপশন নির্বাচন করুন। আপনার কলেজ বা মাদ্রাসার ৬ সংখ্যার EIIN নম্বর দিয়ে সিকিউরিটি কোড পূরণ করে সাবমিট করলেই সংশ্লিষ্ট প্রতিষ্ঠানের সকল শিক্ষার্থীর পিডিএফ রেজাল্ট শিট ডাউনলোড হয়ে যাবে।',
  },
  {
    q: '৬. রেজাল্ট আশানুরূপ না হলে খাতা চ্যালেঞ্জ বা পুনঃনিরীক্ষণের নিয়ম কী?',
    a: 'ফলাফল প্রকাশের পরের দিন থেকেই টেলিটক প্রি-পেইড সিমের মাধ্যমে এসএমএস করে নির্দিষ্ট বিষয়ের খাতা পুনঃনিরীক্ষণের আবেদন করা যায়। প্রতি পত্রের জন্য নির্দিষ্ট আবেদন ফি প্রযোজ্য হয়।',
  },
];

export default function HscResultPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'হোম',
            'item': 'https://janao.online/',
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'ফলাফল হাব',
            'item': 'https://janao.online/results/',
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'HSC Result 2026',
            'item': 'https://janao.online/results/hsc/',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        'mainEntity': FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          'name': item.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.a,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      {/* Inject FAQ & Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      {/* Breadcrumb Navigation */}
      <div className="bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">হোম</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/results/" className="hover:text-emerald-700 dark:hover:text-emerald-400">ফলাফল</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white font-medium">HSC Result 2026</span>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full space-y-10">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-black animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>লাইভ রেজাল্ট ও মার্কশিট সার্ভার ২০২৬</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-snug">
            HSC Result 2026 — এইচএসসি ও আলিম ফলাফল ও মার্কশিট
          </h1>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            ঢাকা, রাজশাহী, চট্টগ্রাম, কুমিল্লা, যশোর, বরিশাল, সিলেট, দিনাজপুর, ময়মনসিংহ, মাদ্রাসা ও কারিগরি বোর্ডের ফলাফল দেখার ৩টি দ্রুততম বিকল্প সার্ভার ও মোবাইল SMS পদ্ধতি।
          </p>
        </div>

        {/* Interactive Server Switcher & SMS Generator Component */}
        <section id="servers">
          <HscResultChecker />
        </section>

        {/* Step-by-Step Guide for Marksheet Download */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-600" />
              <span>নম্বর ও মার্কশিট সহ এইচএসসি রেজাল্ট দেখার বিস্তারিত নিয়ম</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              eBoardResults সার্ভার ব্যবহার করে সবচেয়ে সহজে বিষয়ভিত্তিক গ্রেড দেখার ধাপসমূহ:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-2">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                ১
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">পরীক্ষা ও সাল নির্বাচন:</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                eBoardResults পোর্টালে গিয়ে Examination অপশনে <strong>HSC / Alim / Equivalent</strong> নির্বাচন করুন এবং Year অপশনে <strong>2026</strong> নির্বাচন করুন।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-2">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                ২
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">বোর্ড ও রেজাল্ট টাইপ:</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                আপনার শিক্ষা বোর্ড সিলেক্ট করুন। Result Type ড্রপডাউনে <strong>Individual Result</strong> (ব্যক্তিগত ফলাফল) বেছে নিন।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-2">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                ৩
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">রোল ও রেজিস্ট্রেশন নম্বর:</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                আপনার ৬ সংখ্যার রোল নম্বর এবং রেজিস্ট্রেশন নম্বর প্রবেশ করান। মার্কশিট দেখার জন্য রেজিস্ট্রেশন নম্বর বাধ্যতামূলক।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-2">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                ৪
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">ক্যাপচা পূরণ ও প্রিন্ট:</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                ছবিতে প্রদর্শিত ৪ সংখ্যার সিকিউরিটি কোড (Security Key) লিখে <strong>Get Result</strong> বাটনে ক্লিক করুন। আপনার পূর্ণাঙ্গ মার্কশিট স্ক্রিনে আসবে, যা প্রিন্ট বা PDF সংরক্ষণ করা যাবে।
              </p>
            </div>
          </div>
        </section>

        {/* Grading System Table */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white mb-1 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-600" />
            <span>বাংলাদেশ শিক্ষা বোর্ড এইচএসসি গ্রেডিং সিস্টেম</span>
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
            প্রাপ্ত নম্বরের ভিত্তিতে কোন গ্রেড ও জিপিএ পয়েন্ট হিসাব করা হয় তা নিচে দেওয়া হলো:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 font-bold">
                  <th className="py-2.5 px-3">নম্বর ব্যাপ্তি (Class Interval)</th>
                  <th className="py-2.5 px-3">লেটার গ্রেড (Letter Grade)</th>
                  <th className="py-2.5 px-3">গ্রেড পয়েন্ট (Grade Point)</th>
                  <th className="py-2.5 px-3">মন্তব্য (Remarks)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-800 dark:text-gray-200 font-medium">
                <tr>
                  <td className="py-2.5 px-3">৮০ – ১০০</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">A+</td>
                  <td className="py-2.5 px-3 font-bold">5.00</td>
                  <td className="py-2.5 px-3">Outstanding</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">৭০ – ৭৯</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">A</td>
                  <td className="py-2.5 px-3 font-bold">4.00</td>
                  <td className="py-2.5 px-3">Excellent</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">৬০ – ৬৯</td>
                  <td className="py-2.5 px-3 font-bold text-blue-600 dark:text-blue-400">A-</td>
                  <td className="py-2.5 px-3 font-bold">3.50</td>
                  <td className="py-2.5 px-3">Very Good</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">৫০ – ৫৯</td>
                  <td className="py-2.5 px-3 font-bold text-blue-600 dark:text-blue-400">B</td>
                  <td className="py-2.5 px-3 font-bold">3.00</td>
                  <td className="py-2.5 px-3">Good</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">৪০ – ৪৯</td>
                  <td className="py-2.5 px-3 font-bold text-amber-600 dark:text-amber-400">C</td>
                  <td className="py-2.5 px-3 font-bold">2.00</td>
                  <td className="py-2.5 px-3">Passing</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">৩৩ – ৩৯</td>
                  <td className="py-2.5 px-3 font-bold text-orange-600 dark:text-orange-400">D</td>
                  <td className="py-2.5 px-3 font-bold">1.00</td>
                  <td className="py-2.5 px-3">Below Average</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">০০ – ৩২</td>
                  <td className="py-2.5 px-3 font-bold text-red-600 dark:text-red-400">F</td>
                  <td className="py-2.5 px-3 font-bold">0.00</td>
                  <td className="py-2.5 px-3">Fail</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Board Challenge & Re-scrutiny Section */}
        <section className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="max-w-3xl space-y-3">
            <span className="px-2.5 py-1 text-[11px] font-extrabold bg-emerald-800 text-emerald-200 rounded-lg inline-block">
              রেজাল্ট পরবর্তী গুরুত্বপূর্ণ তথ্য
            </span>
            <h2 className="text-xl sm:text-2xl font-black">
              এইচএসসি পরীক্ষার খাতা চ্যালেঞ্জ বা পুনঃনিরীক্ষণ আবেদন ২০২৬
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              ফলাফল প্রকাশের পর কোনো বিষয়ে প্রত্যাশিত গ্রেড না এলে টেলিটকের মাধ্যমে খাতা চ্যালেঞ্জ বা পুনঃনিরীক্ষণের আবেদন করা যায়। প্রতি বিষয়ের জন্য ১৫০ টাকা হারে ফি প্রযোজ্য হয়।
            </p>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs space-y-2 mt-4">
              <p className="font-bold">আবেদনের এসএমএস ফরম্যাট:</p>
              <p className="font-mono bg-black/30 p-2.5 rounded-lg text-emerald-200 text-xs sm:text-sm">
                RSC &lt;বোর্ডের নামের প্রথম ৩ অক্ষর&gt; &lt;রোল নম্বর&gt; &lt;বিষয় কোড&gt; পাঠিয়ে দিন 16222 নম্বরে
              </p>
              <p className="text-[11px] text-emerald-200/80">
                উদাহরণ: RSC DHA 123456 101 লিখে পাঠাতে হবে 16222 নম্বরে। দ্বিপত্র বিষয়ের ক্ষেত্রে উভয় পত্রের বিষয় কোড কমা দিয়ে লিখতে হবে।
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-emerald-600" />
              <span>এইচএসসি রেজাল্ট সম্পর্কিত সাধারণ প্রশ্নোত্তর (FAQ)</span>
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              ফলাফল ও মার্কশিট সংক্রান্ত সচরাচর জিজ্ঞাসিত প্রশ্ন ও সঠিক উত্তর
            </p>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx} className="py-4 space-y-1.5">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                  {item.q}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Helpful Next Steps Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/tools/"
            className="p-5 rounded-2xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 hover:border-emerald-500 transition-all flex flex-col justify-between group shadow-xs"
          >
            <div>
              <span className="text-2xl">🧮</span>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 mt-2">
                GPA ও CGPA ক্যালকুলেটর
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                বিষয়ভিত্তিক প্রাপ্ত পয়েন্ট হিসাব করে মোট জিপিএ বের করুন।
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-3 inline-flex items-center gap-1">
              <span>ক্যালকুলেট করুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            href="/admission/"
            className="p-5 rounded-2xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 hover:border-emerald-500 transition-all flex flex-col justify-between group shadow-xs"
          >
            <div>
              <span className="text-2xl">🎓</span>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 mt-2">
                বিশ্ববিদ্যালয় ভর্তি ২০২৬-২৭
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                এইচএসসি পরবর্তী পাবলিক বিশ্ববিদ্যালয় ও গুচ্ছ ভর্তি সার্কুলার।
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-3 inline-flex items-center gap-1">
              <span>ভর্তি তথ্য দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            href="/results/"
            className="p-5 rounded-2xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 hover:border-emerald-500 transition-all flex flex-col justify-between group shadow-xs"
          >
            <div>
              <span className="text-2xl">📋</span>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 mt-2">
                সকল পরীক্ষার ফলাফল হাব
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                মাদ্রাসা, কারিগরি, জাতীয় বিশ্ববিদ্যালয় ও চাকরির রেজাল্ট পোর্টাল।
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-3 inline-flex items-center gap-1">
              <span>রেজাল্ট হাব</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
