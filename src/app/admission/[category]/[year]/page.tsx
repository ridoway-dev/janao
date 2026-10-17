import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GraduationCap, ChevronRight, Clock, AlertCircle, ExternalLink, Calendar } from 'lucide-react';

interface AdmissionYearPageProps {
  params: Promise<{
    category: string;
    year: string;
  }>;
}

const CATEGORY_NAMES: Record<string, string> = {
  university: 'পাবলিক বিশ্ববিদ্যালয়',
  nu: 'জাতীয় বিশ্ববিদ্যালয় (NU)',
  medical: 'মেডিকেল ও ডেন্টাল',
  engineering: 'প্রকৌশল গুচ্ছ (BUET, CKET)',
};

export async function generateStaticParams() {
  return [
    { category: 'university', year: '2027' },
    { category: 'nu', year: '2027' },
    { category: 'medical', year: '2027' },
    { category: 'engineering', year: '2027' },
  ];
}

export async function generateMetadata({ params }: AdmissionYearPageProps): Promise<Metadata> {
  const { category, year } = await params;
  const catName = CATEGORY_NAMES[category] || 'ভর্তি';

  return {
    title: `${catName} ভর্তি পরীক্ষা ${year} — প্রস্তুতি ও সম্ভাব্য সময়সূচি | Janao.online`,
    description: `${catName} ${year} শিক্ষাবর্ষের ভর্তি পরীক্ষা প্রস্তুতি, জিপিএ যোগ্যতা, সম্ভাব্য তারিখ এবং সার্কুলার ট্র্যাকার।`,
    keywords: [`${catName} ভর্তি ${year}`, `Admission ${year} Bangladesh`, `University admission ${year}`],
    alternates: {
      canonical: `https://janao.online/admission/${category}/${year}/`,
    },
  };
}

export default async function AdmissionYearPage({ params }: AdmissionYearPageProps) {
  const { category, year } = await params;
  const catName = CATEGORY_NAMES[category];

  if (!catName) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">হোম</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/admission/" className="hover:text-emerald-700 dark:hover:text-emerald-400">ভর্তি</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/admission/${category}/`} className="hover:text-emerald-700 dark:hover:text-emerald-400">
            {catName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white font-medium">{year} শিক্ষাবর্ষ</span>
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-16 w-full">
        <div className="border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 rounded-xl p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Clock className="w-4 h-4" />
            <span>ভর্তি পরীক্ষা শিক্ষাবর্ষ {year} ট্র্যাকার</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {catName} ভর্তি পরীক্ষা {year} (Admission Tracker)
          </h1>
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
            {year} শিক্ষাবর্ষে {catName}-এ ভর্তির প্রস্তুতি, সেকেন্ড টাইম সুযোগ, ন্যূনতম জিপিএ শর্ত এবং ভর্তি পরীক্ষার সম্ভাব্য সময়সূচি সংক্রান্ত অগ্রিম তথ্য।
          </p>

          <div className="mt-5 p-3.5 bg-white dark:bg-gray-900 border border-amber-300 dark:border-amber-800 rounded-lg text-xs text-gray-700 dark:text-gray-300">
            <strong>ট্র্যাকার স্ট্যাটাস:</strong> এইচএসসি পরীক্ষার চূড়ান্ত ফলাফল ও মন্ত্রণালয়ের সমন্বিত সিদ্ধান্ত সাপেক্ষে অফিসিয়াল ভর্তি বিজ্ঞপ্তি প্রকাশিত হবে। চূড়ান্ত বিজ্ঞপ্তি প্রকাশের সাথে সাথে সকল ইউনিটের লিংক এখানে সংযুক্ত হবে।
          </div>

          <div className="mt-6 pt-4 border-t border-amber-200/80 dark:border-amber-900/40 flex items-center justify-between text-xs">
            <Link
              href={`/admission/${category}/`}
              className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
            >
              ← বর্তমান সার্কুলার ও গাইড দেখুন
            </Link>
            <Link
              href="/books/2027/"
              className="text-amber-700 dark:text-amber-400 font-semibold hover:underline"
            >
              ২০২৭ পাঠ্যবই ট্র্যাকার →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
