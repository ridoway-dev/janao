import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Wrench, ChevronRight, Calculator, Calendar, BookOpen, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'শিক্ষা ও চাকরি প্রয়োজনীয় অনলাইন টুলস — GPA ও বয়স ক্যালকুলেটর | Janao.online',
  description: 'এসএসসি ও এইচএসসি জিপিএ (GPA) ক্যালকুলেটর, সরকারি চাকরির বয়স হিসাব ক্যালকুলেটর এবং প্রয়োজনীয় শিক্ষা টুলস।',
  keywords: ['GPA calculator BD', 'সরকারি চাকরির বয়স ক্যালকুলেটর', 'SSC GPA calculator', 'HSC GPA হিসাব'],
  alternates: {
    canonical: 'https://janao.online/tools/',
  },
};

export default function ToolsPage() {
  const tools = [
    {
      title: 'এসএসসি / এইচএসসি GPA ক্যালকুলেটর',
      desc: 'বিভিন্ন বিষয়ের গ্রেড পয়েন্ট ইনপুট দিয়ে সহজে সঠিক মোট জিপিএ (৪র্থ বিষয় সহ ও ছাড়া) হিসাব করুন।',
      badge: 'শিক্ষা টুল',
      status: 'শীঘ্রই লাইভ হচ্ছে',
    },
    {
      title: 'সরকারি চাকরির বয়স ক্যালকুলেটর',
      desc: 'সার্কুলারে উল্লিখিত নির্দিষ্ট তারিখে আপনার বয়স কত বছর, কত মাস এবং কত দিন হয়েছে তা তাৎক্ষণিক জানুন।',
      badge: 'চাকরি টুল',
      status: 'শীঘ্রই লাইভ হচ্ছে',
    },
    {
      title: 'শব্দ ও ক্যারেক্টার কাউন্টার',
      desc: 'অনলাইন চাকরির আবেদন ও রচনা লেখার জন্য সঠিক শব্দ ও অক্ষর সংখ্যা যাচাই টুল।',
      badge: 'ইউটিলিটি',
      status: 'শীঘ্রই লাইভ হচ্ছে',
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
          <span className="text-gray-900 dark:text-white font-medium">প্রয়োজনীয় টুলস</span>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16 w-full">
        
        {/* Hero Section */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Wrench className="w-4 h-4" />
            <span>শিক্ষার্থী ও চাকরিপ্রার্থীদের সহায়ক টুলস</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            প্রয়োজনীয় শিক্ষা ও চাকরি ইউটিলিটি টুলস
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-3xl leading-relaxed">
            GPA হিসাব, চাকরির বয়স গণনা এবং আবেদন সংক্রান্ত দ্রুত সমাধানের জন্য আমাদের বিশেষায়িত ইউটিলিটি টুলবক্স।
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tools.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-5 flex flex-col justify-between shadow-xs"
            >
              <div>
                <span className="px-2 py-0.5 text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded">
                  {item.badge}
                </span>

                <h2 className="text-base font-bold text-gray-900 dark:text-white mt-3 leading-snug">
                  {item.title}
                </h2>

                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-xs">
                <span className="text-amber-600 dark:text-amber-400 font-medium">
                  ● {item.status}
                </span>
                <Link
                  href="/books/"
                  className="text-emerald-700 dark:text-emerald-400 font-medium hover:underline"
                >
                  পাঠ্যবই দেখুন →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
