import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'অনুসন্ধান ফলাফল | Janao.online',
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          বই ও শিক্ষা তথ্য অনুসন্ধান
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-6">
          সরাসরি হোমপেজ থেকে যেকোনো বিষয়ের নাম বা শ্রেণি লিখে তাৎক্ষণিক ফলাফল ফিল্টার করতে পারেন।
        </p>

        <Link
          href="/#main-book-search"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm rounded transition"
        >
          <Search className="w-4 h-4" />
          <span>হোমপেজের মূল সার্চে যান</span>
        </Link>
      </main>

      <Footer />
    </div>
  );
}
