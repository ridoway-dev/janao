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
    '১ম শ্রেণি',
    '৫ম শ্রেণি',
    '৬ষ্ঠ শ্রেণি গণিত',
    '৯ম শ্রেণি বিজ্ঞান',
    'দাখিল',
    'এইচএসসি',
  ];

  return (
    <section className="bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 py-8 sm:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Title & Tagline */}
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          NCTB Books {selectedYear}
        </h1>
        <p className="text-base sm:text-lg text-emerald-800 dark:text-emerald-400 font-semibold mt-1">
          Download Class 1-12 PDF Books
        </p>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto mt-2 leading-relaxed">
          জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুমোদিত প্রাথমিক, মাধ্যমিক ও মাদ্রাসা স্তরের সকল বিষয়ের নতুন পাঠ্যবই সম্পূর্ণ বিনামূল্যে ডাউনলোড করুন।
        </p>

        {/* Clean Year Selector */}
        <div className="mt-5 inline-flex border border-gray-300 dark:border-gray-700 rounded overflow-hidden">
          {[2026, 2025, 2024].map((year) => (
            <button
              key={year}
              onClick={() => onYearChange(year)}
              className={`px-4 py-1.5 text-xs sm:text-sm font-medium transition ${
                selectedYear === year
                  ? 'bg-emerald-700 text-white font-semibold'
                  : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {year} সংস্করণ
            </button>
          ))}
        </div>

        {/* Search Bar - Crisp, clean, standard */}
        <div className="mt-6 max-w-xl mx-auto">
          <div className="flex items-center border-2 border-emerald-700 dark:border-emerald-600 rounded bg-white dark:bg-gray-900 overflow-hidden shadow-xs">
            <div className="pl-3 text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              id="main-book-search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="বইয়ের নাম বা শ্রেণি লিখে সার্চ করুন (যেমন: গণিত, Class 7, দাখিল)..."
              className="w-full py-2.5 px-3 bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 text-sm focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="px-2 text-xs text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                ✕
              </button>
            )}
            <button
              onClick={() => {
                const elem = document.querySelector('#books-section');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm transition"
            >
              খুঁজুন
            </button>
          </div>

          {/* Quick tags */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs">
            <span className="text-gray-500 dark:text-gray-400">দ্রুত খুঁজুন:</span>
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
        </div>

      </div>
    </section>
  );
}
