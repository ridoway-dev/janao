import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, Home, BookOpen, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <Header />

      <main className="flex-1 max-w-2xl mx-auto px-4 py-16 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-400 mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>

        <span className="text-4xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">
          404
        </span>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-2">
          কাঙ্ক্ষিত পেজটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-md leading-relaxed">
          আপনি যে ঠিকানাটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা লিংকটি সঠিক নয়। নিচের প্রয়োজনীয় লিংকগুলো থেকে আপনার প্রয়োজনীয় তথ্য খুঁজে নিতে পারেন।
        </p>

        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full mt-6 text-xs">
          <Link
            href="/"
            className="p-3 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-emerald-600 hover:text-emerald-700 font-semibold transition flex flex-col items-center gap-1"
          >
            <Home className="w-4 h-4 text-emerald-600" />
            <span>মূল পাতা</span>
          </Link>
          <Link
            href="/books/2027/"
            className="p-3 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-emerald-600 hover:text-emerald-700 font-semibold transition flex flex-col items-center gap-1"
          >
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>২০২৭ পাঠ্যবই</span>
          </Link>
          <Link
            href="/books/"
            className="p-3 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-emerald-600 hover:text-emerald-700 font-semibold transition flex flex-col items-center gap-1"
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>সকল বই (১–১২)</span>
          </Link>
          <Link
            href="/notices/"
            className="p-3 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-emerald-600 hover:text-emerald-700 font-semibold transition flex flex-col items-center gap-1"
          >
            <span>পরীক্ষা ও রুটিন</span>
          </Link>
          <Link
            href="/results/"
            className="p-3 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-emerald-600 hover:text-emerald-700 font-semibold transition flex flex-col items-center gap-1"
          >
            <span>ফলাফল ও মার্কশিট</span>
          </Link>
          <Link
            href="/jobs/"
            className="p-3 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-emerald-600 hover:text-emerald-700 font-semibold transition flex flex-col items-center gap-1"
          >
            <span>চাকরি সার্কুলার</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
