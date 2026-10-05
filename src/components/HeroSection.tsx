'use client';

import React from 'react';
import { Search, Sparkles, BookOpen, CheckCircle, FileDown, Calendar, ShieldCheck } from 'lucide-react';

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
    '১ম শ্রেণি বাংলা',
    '৫ম শ্রেণি গণিত',
    '৬ষ্ঠ শ্রেণি বিজ্ঞান',
    '৯ম শ্রেণি পদার্থবিজ্ঞান',
    'দাখিল হাদিস শরীফ',
    'এইচএসসি ICT',
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200/70 dark:border-slate-800/80">
      {/* Background ambient decorative shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 dark:opacity-20 overflow-hidden">
        <div className="absolute -top-12 left-10 w-72 h-72 rounded-full bg-emerald-400 blur-3xl"></div>
        <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-teal-400 blur-3xl"></div>
        <div className="absolute top-28 left-1/3 w-64 h-64 rounded-full bg-blue-400 blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-semibold mb-5 shadow-sm">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
          <span>জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) ২০২৬ শিক্ষাবর্ষ</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.25] sm:leading-[1.2]">
          NCTB Books 2026
          <span className="block mt-1 sm:mt-2 text-gradient">
            ১ম থেকে ১২শ শ্রেণির সকল পাঠ্যবই ও নোটিশ
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          প্রাথমিক, মাধ্যমিক, ইবতেদায়ি, দাখিল ও কলেজ পর্যায়ের সকল বিষয়ের অফিশিয়াল বোর্ড বই ও শিক্ষাক্রম পিডিএফ এক ক্লিকে সম্পূর্ণ বিনামূল্যে ডাউনলোড করুন।
        </p>

        {/* Year Selector Tabs */}
        <div className="mt-6 inline-flex p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700/60 shadow-inner">
          {[2026, 2025, 2024].map((year) => (
            <button
              key={year}
              onClick={() => onYearChange(year)}
              className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedYear === year
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              {year === 2026 ? '২০২৬ (নতুন শিক্ষাক্রম)' : `${year} সংস্করণ`}
            </button>
          ))}
        </div>

        {/* Instant Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="relative flex items-center glass rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-none border border-slate-200 dark:border-slate-700 p-1.5 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all">
            <div className="pl-3.5 pr-2 text-slate-400 dark:text-slate-500">
              <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              id="main-book-search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="বইয়ের নাম, শ্রেণি বা বিষয়ের নাম দিয়ে খুঁজুন (যেমন: গণিত, Class 9, পদার্থবিজ্ঞান)..."
              className="w-full py-2.5 sm:py-3 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm sm:text-base focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="px-2.5 py-1 text-xs font-semibold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 mr-1"
              >
                মুছুন
              </button>
            )}
            <button
              onClick={() => {
                const elem = document.querySelector('#books-section');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/30 transition flex items-center gap-1.5 shrink-0"
            >
              <span>খুঁজুন</span>
            </button>
          </div>

          {/* Quick Suggestion Pills */}
          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs">
            <span className="text-slate-400 dark:text-slate-500 font-medium">জনপ্রিয় অনুসন্ধান:</span>
            {quickSearches.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  onSearchChange(tag);
                  const elem = document.querySelector('#books-section');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-100 hover:text-emerald-700 dark:hover:bg-emerald-950/60 dark:hover:text-emerald-400 border border-slate-200/60 dark:border-slate-700/60 transition"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Value Highlights */}
        <div className="mt-10 pt-8 border-t border-slate-200/60 dark:border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">১০০% অফিশিয়াল বই</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">NCTB কর্তৃক অনুমোদিত</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2">
              <FileDown className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">হাই-স্পিড ডাউনলোড</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">সরাসরি গুগল ড্রাইভ ও বোর্ড লিঙ্ক</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">শ্রেণি ১ থেকে ১২</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">সাধারণ ও মাদ্রাসা কারিকুলাম</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">রুটিন ও রেজাল্ট</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">সর্বশেষ শিক্ষা নোটিশ</span>
          </div>
        </div>

      </div>
    </section>
  );
}
