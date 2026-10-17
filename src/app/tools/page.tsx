import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GpaCalculator from '@/components/GpaCalculator';
import NuCgpaCalculator from '@/components/NuCgpaCalculator';
import JobAgeCalculator from '@/components/JobAgeCalculator';
import { 
  Calculator, 
  ChevronRight, 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle,
  Briefcase,
  ExternalLink
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'GPA, CGPA ও সরকারি চাকরির বয়স ক্যালকুলেটর — Janao.online',
  description: 'এসএসসি, দাখিল, এইচএসসি জিপিএ (GPA), জাতীয় বিশ্ববিদ্যালয় (NU) CGPA এবং সরকারি চাকরির বয়স (Job Age) হিসাব করার সেরা অনলাইন ক্যালকুলেটর প্ল্যাটফর্ম।',
  keywords: [
    'সরকারি চাকরির বয়স ক্যালকুলেটর',
    'job age calculator bd',
    'GPA calculator BD',
    'NU CGPA calculator',
    'SSC GPA calculator',
    'HSC GPA calculator',
    'বিসিএস বয়স হিসাব',
    'অনার্স সিজিপিএ ক্যালকুলেটর'
  ],
  alternates: {
    canonical: 'https://janao.online/tools/',
  },
  openGraph: {
    title: 'অনলাইন GPA, NU CGPA ও চাকরির বয়স ক্যালকুলেটর — Janao.online',
    description: 'SSC, HSC, জাতীয় বিশ্ববিদ্যালয়ের CGPA এবং সরকারি চাকরির বয়স হিসাব করুন সঠিক নিয়মে।',
    url: 'https://janao.online/tools/',
    siteName: 'Janao.online',
    locale: 'bn_BD',
    type: 'website',
  },
};

export default function ToolsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Janao Academic GPA, NU CGPA & Job Age Calculator',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BDT',
    },
    description: 'Online GPA, NU CGPA and Bangladesh Govt Job Age calculator for students and job seekers.',
    url: 'https://janao.online/tools/',
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      {/* Breadcrumb Header */}
      <div className="bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">হোম</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white font-medium">ক্যালকুলেটর ও টুলস</span>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-16 w-full space-y-10">
        
        {/* Hero Section */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Calculator className="w-4 h-4" />
            <span>শিক্ষার্থী ও চাকরিপ্রার্থী সহায়ক ক্যালকুলেশন প্ল্যাটফর্ম</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            GPA, CGPA ও সরকারি চাকরির বয়স ক্যালকুলেটর
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2.5 max-w-3xl leading-relaxed">
            বাংলাদেশ শিক্ষা বোর্ডের (SSC, HSC) ৪র্থ বিষয় সহ GPA, জাতীয় বিশ্ববিদ্যালয়ের (Honours, Degree) ক্রেডিট আওয়ার ভিত্তিক CGPA এবং বিসিএস/সরকারি চাকরির সার্কুলারের বয়স এক ক্লিকে নির্ভুল হিসাব করুন।
          </p>

          {/* Jump Navigation Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-5 pt-5 border-t border-gray-100 dark:border-gray-800">
            <a
              href="#job-age-calculator"
              className="px-3.5 py-1.5 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 text-indigo-800 dark:text-indigo-300 text-xs font-bold rounded-lg transition border border-indigo-200 dark:border-indigo-800 flex items-center gap-1.5"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>সরকারি চাকরির বয়স ক্যালকুলেটর</span>
              <span className="text-indigo-500">↓</span>
            </a>
            <a
              href="#gpa-calculator"
              className="px-3.5 py-1.5 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-lg transition border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5"
            >
              <span>SSC / HSC GPA ক্যালকুলেটর</span>
              <span className="text-emerald-500">↓</span>
            </a>
            <a
              href="#nu-calculator"
              className="px-3.5 py-1.5 bg-teal-50 dark:bg-teal-950/50 hover:bg-teal-100 text-teal-800 dark:text-teal-300 text-xs font-bold rounded-lg transition border border-teal-200 dark:border-teal-800 flex items-center gap-1.5"
            >
              <span>জাতীয় বিশ্ববিদ্যালয় (NU) CGPA</span>
              <span className="text-teal-500">↓</span>
            </a>
            <Link
              href="/results/"
              className="px-3.5 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-lg transition flex items-center gap-1.5"
            >
              <span>বোর্ড রেজাল্ট ও মার্কশিট</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Section 1: Job Age Calculator (High Search Traffic in BD) */}
        <section id="job-age-calculator" className="scroll-mt-20">
          <JobAgeCalculator />
        </section>

        {/* Section 2: SSC / HSC GPA Calculator */}
        <section id="gpa-calculator" className="scroll-mt-20">
          <GpaCalculator />
        </section>

        {/* Section 3: National University CGPA Calculator */}
        <section id="nu-calculator" className="scroll-mt-20">
          <NuCgpaCalculator />
        </section>

        {/* SEO & Knowledge Guide Section (Helps in Google Rank #1) */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>বয়স ও ফলাফল হিসাব করার নিয়মাবলি</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              শিক্ষার্থী ও চাকরিপ্রার্থীদের সুবিধার্থে বাংলাদেশ সরকারের নিয়ম সংক্ষেপে তুলে ধরা হলো:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Job Age Rule */}
            <div className="bg-gray-50 dark:bg-[#141d2e] p-5 rounded-xl border border-gray-200 dark:border-gray-800 space-y-2.5">
              <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                <span>চাকরির বয়সের সঠিক নিয়ম</span>
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                চাকরির বিজ্ঞপ্তিতে যে তারিখটি উল্লেখ থাকে, প্রার্থীর জন্মতারিখ থেকে ঠিক সেই তারিখ পর্যন্ত বছর, মাস ও দিন হিসাব করতে হয়।
              </p>
              <div className="p-2.5 bg-white dark:bg-[#0f172a] rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold text-indigo-700 dark:text-indigo-400">
                সাধারণ কোটা: ১৮ - ৩০ বছর<br />
                বীর মুক্তিযোদ্ধা কোটা: ১৮ - ৩২ বছর
              </div>
            </div>

            {/* Board Formula */}
            <div className="bg-gray-50 dark:bg-[#141d2e] p-5 rounded-xl border border-gray-200 dark:border-gray-800 space-y-2.5">
              <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>SSC / HSC ৪র্থ বিষয়ের বোনাস</span>
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                ৪র্থ বিষয়ের পয়েন্ট থেকে ২.০০ বাদ দিয়ে বাকি উদ্বৃত্ত পয়েন্ট মূল বিষয়ের যোগফলের সাথে যুক্ত হয়।
              </p>
              <div className="p-2.5 bg-white dark:bg-[#0f172a] rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-mono text-emerald-700 dark:text-emerald-400">
                GPA = (মূল পয়েন্ট + [৪র্থ বিষয় - ২.০০]) ÷ মূল বিষয়
              </div>
            </div>

            {/* NU CGPA Formula */}
            <div className="bg-gray-50 dark:bg-[#141d2e] p-5 rounded-xl border border-gray-200 dark:border-gray-800 space-y-2.5">
              <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-teal-600" />
                <span>NU ক্রেডিট আওয়ার সিজিপিএ</span>
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                জাতীয় বিশ্ববিদ্যালয়ে কোর্স ক্রেডিট অনুযায়ী গ্রেড পয়েন্ট গুণ করে মোট ক্রেডিট দিয়ে ভাগ করে CGPA বের করা হয়।
              </p>
              <div className="p-2.5 bg-white dark:bg-[#0f172a] rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-mono text-teal-700 dark:text-teal-400">
                CGPA = Σ(ক্রেডিট × পয়েন্ট) ÷ মোট ক্রেডিট
              </div>
            </div>
          </div>

          {/* Quick FAQ Accordion for SEO */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>সাধারণ প্রশ্নোত্তর (FAQ)</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-gray-50 dark:bg-[#141d2e] rounded-xl border border-gray-200 dark:border-gray-800">
                <span className="font-bold text-gray-900 dark:text-white block">
                  প্রশ্ন: চাকরির আবেদনের জন্য বয়স কোন তারিখ অনুযায়ী হিসাব করতে হয়?
                </span>
                <span className="text-gray-600 dark:text-gray-400 mt-1 block">
                  উত্তর: যে সার্কুলারে আবেদন করছেন, তার শর্তাবলিতে একটি নির্দিষ্ট তারিখ (যেমন: মাসের ১ তারিখ বা আবেদনের শেষ তারিখ) দেওয়া থাকে। সেই তারিখটি সিলেক্ট করে হিসাব করতে হয়।
                </span>
              </div>

              <div className="p-3.5 bg-gray-50 dark:bg-[#141d2e] rounded-xl border border-gray-200 dark:border-gray-800">
                <span className="font-bold text-gray-900 dark:text-white block">
                  প্রশ্ন: ৩০ বছর ১ দিন হলে কি সাধারণ কোটায় সরকারি চাকরিতে আবেদন করা যাবে?
                </span>
                <span className="text-gray-600 dark:text-gray-400 mt-1 block">
                  উত্তর: না। নির্ধারিত তারিখে বয়স সর্বোচ্চ ৩০ বছর ০ মাস ০ দিন হতে হবে (যদি না বিশেষ কোনো বয়স ছাড়ের সরকারি প্রজ্ঞাপন থাকে)।
                </span>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
