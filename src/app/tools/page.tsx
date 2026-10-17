import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GpaCalculator from '@/components/GpaCalculator';
import NuCgpaCalculator from '@/components/NuCgpaCalculator';
import { 
  Calculator, 
  ChevronRight, 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'GPA ও CGPA ক্যালকুলেটর — SSC, HSC ও জাতীয় বিশ্ববিদ্যালয় (NU) | Janao.online',
  description: 'এসএসসি, দাখিল, এইচএসসি জিপিএ (GPA) ও জাতীয় বিশ্ববিদ্যালয় (NU Honours, Degree) CGPA হিসাব করার সেরা অনলাইন ক্যালকুলেটর। ৪র্থ বিষয় ও ক্রেডিট আওয়ার সহ নির্ভুল হিসাব।',
  keywords: [
    'GPA calculator BD',
    'NU CGPA calculator',
    'SSC GPA calculator',
    'HSC GPA calculator',
    'অনার্স সিজিপিএ ক্যালকুলেটর',
    'জাতীয় বিশ্ববিদ্যালয় জিপিএ',
    '৪র্থ বিষয় জিপিএ হিসাব',
    'education board result gpa calculator'
  ],
  alternates: {
    canonical: 'https://janao.online/tools/',
  },
  openGraph: {
    title: 'অনলাইন GPA ও NU CGPA ক্যালকুলেটর — Janao.online',
    description: 'SSC, HSC এবং জাতীয় বিশ্ববিদ্যালয়ের সঠিক GPA ও CGPA হিসাব করুন সহজে।',
    url: 'https://janao.online/tools/',
    siteName: 'Janao.online',
    locale: 'bn_BD',
    type: 'website',
  },
};

export default function ToolsPage() {
  // Google Structured Data for SoftwareApplication / WebApplication
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Janao Academic GPA & NU CGPA Calculator',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BDT',
    },
    description: 'Online GPA and CGPA calculator for Bangladesh Secondary, Higher Secondary, and National University (Honours/Degree) students.',
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
            <span>শিক্ষার্থী সহায়ক ক্যালকুলেশন প্ল্যাটফর্ম</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            GPA ও NU CGPA ক্যালকুলেটর
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2.5 max-w-3xl leading-relaxed">
            বাংলাদেশ শিক্ষা বোর্ডের (SSC, HSC, Dakhil, Alim) ৪র্থ ঐচ্ছিক বিষয় সহ মোট GPA এবং জাতীয় বিশ্ববিদ্যালয়ের (Honours, Degree) ক্রেডিট আওয়ার অনুযায়ী সঠিক CGPA এক ক্লিকে হিসাব করুন।
          </p>

          {/* Jump Navigation Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-5 pt-5 border-t border-gray-100 dark:border-gray-800">
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
              <span>বোর্ড পরীক্ষার রেজাল্ট দেখুন</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Section 1: SSC / HSC GPA Calculator */}
        <section id="gpa-calculator" className="scroll-mt-20">
          <GpaCalculator />
        </section>

        {/* Section 2: National University CGPA Calculator */}
        <section id="nu-calculator" className="scroll-mt-20">
          <NuCgpaCalculator />
        </section>

        {/* SEO & Knowledge Guide Section (Helps in Google Rank #1) */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>GPA এবং CGPA হিসাব করার নিয়মাবলি</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              শিক্ষার্থীদের সুবিধার্থে বাংলাদেশ শিক্ষা বোর্ড ও জাতীয় বিশ্ববিদ্যালয়ের অফিসিয়াল নিয়ম সংক্ষেপে তুলে ধরা হলো:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Board Formula */}
            <div className="bg-gray-50 dark:bg-[#141d2e] p-5 rounded-xl border border-gray-200 dark:border-gray-800 space-y-3">
              <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>SSC / HSC তে ৪র্থ বিষয়ের বোনাস নিয়ম</span>
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                বাংলাদেশ শিক্ষা বোর্ডের নিয়ম অনুযায়ী, ৪র্থ বিষয়ের গ্রেড পয়েন্ট থেকে <strong>২.০০ পয়েন্ট</strong> বাদ দেওয়া হয়। বাকি উদ্বৃত্ত পয়েন্ট আবশ্যিক বিষয়গুলোর মোট পয়েন্টের সাথে যোগ হয়ে মূল বিষয় সংখ্যা দিয়ে ভাগ হয়।
              </p>
              <div className="p-3 bg-white dark:bg-[#0f172a] rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-mono text-emerald-700 dark:text-emerald-400">
                মোট GPA = (আবশ্যিক বিষয়ের মোট পয়েন্ট + [৪র্থ বিষয় - ২.০০]) ÷ আবশ্যিক বিষয় সংখ্যা
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                * মনে রাখবেন, কোনো একটি বিষয়ে এফ (F) গ্রেড থাকলে মোট ফলাফল অকৃতকার্য (0.00) হিসেবে গণ্য হবে।
              </p>
            </div>

            {/* NU CGPA Formula */}
            <div className="bg-gray-50 dark:bg-[#141d2e] p-5 rounded-xl border border-gray-200 dark:border-gray-800 space-y-3">
              <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-teal-600" />
                <span>জাতীয় বিশ্ববিদ্যালয় (NU) CGPA নিয়ম</span>
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                জাতীয় বিশ্ববিদ্যালয়ে সাধারণ যোগফল নয়, বরং <strong>ক্রেডিট আওয়ার (Credit Hours)</strong> অনুযায়ী গ্রেড পয়েন্ট গুণ করে গড় বের করা হয়। একে ওয়েটেড জিপিএ বলা হয়।
              </p>
              <div className="p-3 bg-white dark:bg-[#0f172a] rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-mono text-teal-700 dark:text-teal-400">
                CGPA = Σ(কোর্স ক্রেডিট × প্রাপ্ত পয়েন্ট) ÷ মোট ক্রেডিট সংখ্যা
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                * honours ১ম থেকে ৪র্থ বর্ষ পর্যন্ত প্রতিটি বর্ষের মোট ক্রেডিট অনুযায়ী সামগ্রিক CGPA নির্ধারিত হয়।
              </p>
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
                  প্রশ্ন: ৪র্থ বিষয়ে ২.০০ পেলে কি কোনো পয়েন্ট যোগ হবে?
                </span>
                <span className="text-gray-600 dark:text-gray-400 mt-1 block">
                  উত্তর: না। ৪র্থ বিষয়ে পয়েন্ট ২.০০ এর বেশি হলেই কেবল বাড়তি অংশ (যেমন: ৩.০০ পেলে ১.০০ পয়েন্ট, ৫.০০ পেলে ৩.০০ পয়েন্ট) মূল জিপিএ এর সাথে যোগ হয়।
                </span>
              </div>

              <div className="p-3.5 bg-gray-50 dark:bg-[#141d2e] rounded-xl border border-gray-200 dark:border-gray-800">
                <span className="font-bold text-gray-900 dark:text-white block">
                  প্রশ্ন: জাতীয় বিশ্ববিদ্যালয়ে কত CGPA পেলে First Class বা ১ম বিভাগ গণ্য হয়?
                </span>
                <span className="text-gray-600 dark:text-gray-400 mt-1 block">
                  উত্তর: ৪.০০ স্কেলের মধ্যে ৩.০০ বা তার বেশি অর্জন করলে তা প্রথম শ্রেণি (First Class Equivalent) হিসেবে গণ্য হয়।
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
