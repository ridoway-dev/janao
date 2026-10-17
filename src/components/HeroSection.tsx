'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedYear: number;
  onYearChange: (year: number) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
}

export default function HeroSection({
  searchQuery,
  onSearchChange,
  selectedYear,
  onYearChange,
  searchInputRef,
}: HeroSectionProps) {
  const quickSearches = [
    'ষষ্ঠ শ্রেণির বাংলা',
    'class 6 math',
    '৯ম শ্রেণি বিজ্ঞান',
    'দাখিল ৭ম শ্রেণি',
    'HSC বাংলা',
    '২০২৫ class 5',
  ];

  const trendingTopics = [
    { label: '🔥 NCTB Books 2027', href: '/books/2027/', highlight: true },
    { label: '২০২৬-এর বই', href: '/books/', highlight: false },
    { label: 'SSC Routine 2027', href: '/notices/ssc-routine-2027/', highlight: false },
    { label: 'HSC Routine 2027', href: '/notices/hsc-routine-2027/', highlight: false },
    { label: 'Primary Scholarship Result', href: '/results/primary-scholarship-result-2025/', highlight: false },
    { label: 'University Admission 2027', href: '/admission/', highlight: false },
    { label: 'Government Job Circular', href: '/jobs/', highlight: false },
    { label: 'BCS প্রস্তুতি', href: '/jobs/', highlight: false },
  ];

  return (
    <section className="bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 py-6 sm:py-10 w-full min-w-0">
      <div className="w-full max-w-4xl mx-auto px-3.5 sm:px-6 text-center min-w-0">
        
        {/* Title & Tagline - Primary Focus: NCTB Books 2027 */}
        <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-snug">
          NCTB Books 2027 — Class 1–12 PDF
        </h1>
        <p className="text-sm sm:text-lg text-emerald-800 dark:text-emerald-400 font-semibold mt-1">
          Janao.online — শিক্ষা, চাকরি, ভর্তি ও প্রয়োজনীয় তথ্য
        </p>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2 leading-relaxed">
          জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) প্রকাশিত ২০২৭ ও ২০২৬ শিক্ষাবর্ষের ১ম থেকে ১২শ শ্রেণির সকল বিষয়ের পাঠ্যবই, বোর্ড পরীক্ষার রুটিন, রেজাল্ট ও ক্যারিয়ার তথ্য।
        </p>

        {/* Clean Year Selector with 2027 & 2026 - Responsive flex-wrap */}
        <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex border border-gray-300 dark:border-gray-700 rounded-xl sm:rounded overflow-hidden shadow-xs p-0.5 bg-gray-100/70 dark:bg-gray-800/70">
            {[2026, 2025, 2024].map((year) => (
              <button
                key={year}
                onClick={() => onYearChange(year)}
                className={`px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg sm:rounded-none transition active:scale-95 ${
                  selectedYear === year
                    ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200/60 dark:hover:bg-gray-700'
                }`}
              >
                <span>{year}</span>
                <span className="hidden sm:inline"> সংস্করণ</span>
              </button>
            ))}
          </div>

          <a
            href="/books/2027/"
            className="px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-xl sm:rounded bg-amber-500 hover:bg-amber-600 active:scale-95 text-white transition flex items-center gap-1 shadow-xs"
          >
            <span>২০২৭ শিক্ষাবর্ষ</span>
            <span className="text-[9px] sm:text-[10px] bg-white text-amber-700 font-bold px-1 rounded">নতুন</span>
          </a>
        </div>

        {/* Search Bar - Crisp, clean, iOS friendly with >=16px text-base */}
        <div className="mt-5 sm:mt-6 max-w-xl mx-auto">
          <div className="flex items-center border-2 border-emerald-700 dark:border-emerald-600 rounded-2xl sm:rounded bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
            <div className="pl-2.5 sm:pl-3 text-gray-400 shrink-0">
              <Search className="w-4 h-4" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              id="main-book-search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="বইয়ের নাম বা শ্রেণি লিখুন (যেমন: ষষ্ঠ শ্রেণি বাংলা)..."
              className="w-full py-2 sm:py-2.5 px-2.5 sm:px-3 bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 text-base sm:text-sm focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="px-2 text-xs text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                aria-label="মুছুন"
              >
                ✕
              </button>
            )}
            <button
              onClick={() => {
                const elem = document.querySelector('#books-section');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm transition shrink-0"
            >
              খুঁজুন
            </button>
          </div>

          {/* Quick searches */}
          <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs">
            <span className="text-gray-500 dark:text-gray-400 font-medium">উদাহরণ:</span>
            {quickSearches.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  onSearchChange(tag);
                  const elem = document.querySelector('#books-section');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 transition"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Trending Topics (Item #14) */}
          <div className="mt-3.5 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs">
            <span className="text-gray-500 dark:text-gray-400 font-semibold mr-1">জনপ্রিয় টপিক:</span>
            {trendingTopics.map((topic) => (
              <a
                key={topic.label}
                href={topic.href}
                className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-medium border transition ${
                  topic.highlight
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700 font-semibold'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-emerald-600 hover:text-emerald-700 dark:hover:text-emerald-400'
                }`}
              >
                {topic.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
