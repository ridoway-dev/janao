import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  CLASS_SHORTCUTS, 
  getBooksByYear 
} from '@/data/nctbData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Clock, 
  AlertCircle, 
  Calendar, 
  ChevronRight, 
  BookOpen, 
  CheckCircle2, 
  Bell 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'NCTB Books 2027 | ২০২৭ শিক্ষাবর্ষের সকল শ্রেণির নতুন পাঠ্যবই ও প্রকাশনা আপডেট - janao.online',
  description: 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) ২০২৭ শিক্ষাবর্ষের প্রাথমিক, মাধ্যমিক ও মাদ্রাসা স্তরের নতুন পাঠ্যবই প্রকাশনা ট্র্যাকার। বই প্রকাশের সাথে সাথেই সবার আগে অফিশিয়াল পিডিএফ ডাউনলোড লিঙ্ক দেওয়া হবে।',
  keywords: [
    'NCTB Books 2027',
    '২০২৭ সালের বই',
    'Class 1-12 Books 2027 PDF',
    '২০২৭ নতুন শিক্ষাক্রম পাঠ্যবই',
    'NCTB 2027 syllabus',
  ],
  alternates: {
    canonical: 'https://janao.online/books/2027/',
  },
};

export default function Books2027HubPage() {
  const books2027 = getBooksByYear(2027);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/books/" className="hover:text-emerald-700 dark:hover:text-emerald-400">
            পাঠ্যবই
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-gray-900 dark:text-white">
            ২০২৭ শিক্ষাবর্ষ
          </span>
        </nav>

        {/* 2027 Official Notice Banner */}
        <div className="p-5 rounded-lg border-2 border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 mb-8">
          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                NCTB Books 2027 — প্রকাশনা ও আপডেট ট্র্যাকার
              </h1>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-1.5 leading-relaxed">
                ২০২৭ শিক্ষাবর্ষের সকল শ্রেণির পাঠ্যপুস্তক জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (এনসিটিবি) কর্তৃক সম্পাদনা ও মুদ্রণ প্রক্রিয়া চলছে। janao.online কোনো ভুয়া বা অননুমোদিত লিংক প্রকাশ করে না। বোর্ড কর্তৃক অফিশিয়াল পিডিএফ উন্মুক্ত হওয়ার সাথে সাথে এখানে সরাসরি লিংক হালনাগাদ করা হবে।
              </p>
            </div>
          </div>
        </div>

        {/* Class Selection Hub */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            শ্রেণি অনুযায়ী ২০২৭ শিক্ষাবর্ষের স্ট্যাটাস
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            আপনার কাঙ্ক্ষিত শ্রেণি নির্বাচন করে বইয়ের তালিকা ও প্রকাশনা অগ্রগতি দেখুন:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CLASS_SHORTCUTS.map((group) => (
              <div 
                key={group.groupTitleBn}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a]"
              >
                <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-3">
                  {group.groupTitleBn}
                </h3>
                <div className="space-y-2 text-xs">
                  {group.classes.map((cls) => (
                    <div 
                      key={cls.id}
                      className="p-2 rounded bg-gray-50 dark:bg-gray-800/60 flex items-center justify-between border border-gray-100 dark:border-gray-800"
                    >
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{cls.label}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-medium">
                        আপডেট ট্র্যাকড
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Working Edition Link: 2026 */}
        <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <div>
            <span className="font-bold text-gray-900 dark:text-white block">
              বর্তমানে ক্লাসে পাঠ্য ২০২৬ সালের সকল বই খুঁজছেন?
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-xs">
              চলতি শিক্ষাবর্ষের সকল শ্রেণির ৪৪৪টি মূল পাঠ্যবই এখনই ডাউনলোডযোগ্য।
            </span>
          </div>

          <Link
            href="/books/"
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold text-xs shrink-0 transition"
          >
            ২০২৬ সালের সব বই দেখুন →
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
