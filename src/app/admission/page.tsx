import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Compass, Clock, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ভর্তি তথ্য ও বিশ্ববিদ্যালয়ের সার্কুলার ২০২৬-২০২৭ | Admission - janao.online',
  description: 'বিশ্ববিদ্যালয়, মেডিকেল, ইঞ্জিনিয়ারিং, জাতীয় বিশ্ববিদ্যালয় ও কলেজ ভর্তি পরীক্ষার তথ্য ও যোগ্যতা।',
};

export default function AdmissionHubPage() {
  const categories = [
    { name: 'জিএসটি গুচ্ছ বিশ্ববিদ্যালয়', count: '২৪টি বিশ্ববিদ্যালয়', status: 'আসন্ন' },
    { name: 'মেডিকেল ও ডেন্টাল ভর্তি', count: 'এমবিবিএস ও বিডিএস', status: 'আসন্ন' },
    { name: 'বুয়েট ও ইঞ্জিনিয়ারিং গুচ্ছ', count: 'প্রকৌশল ভর্তি', status: 'আসন্ন' },
    { name: 'ঢাকা বিশ্ববিদ্যালয় (DU)', count: 'ক, খ, গ, চ ইউনিট', status: 'আসন্ন' },
    { name: 'জাতীয় বিশ্ববিদ্যালয় (NU)', count: 'ডিগ্রি ও অনার্স ভর্তি', status: 'চলমান' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full">
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-gray-900 dark:text-white">
            ভর্তি তথ্য (Admission)
          </span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          বিশ্ববিদ্যালয় ও কলেজ ভর্তি পরীক্ষা
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-8">
          পাবলিক বিশ্ববিদ্যালয়, মেডিকেল কলেজ, ইঞ্জিনিয়ারিং ও জাতীয় বিশ্ববিদ্যালয়ের ভর্তি তথ্য ও গাইডলাইন।
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat, i) => (
            <div key={i} className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">{cat.name}</h3>
                <span className="text-xs text-gray-500">{cat.count}</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium">
                {cat.status}
              </span>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
