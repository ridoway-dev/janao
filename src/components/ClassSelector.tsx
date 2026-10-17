'use client';

import React from 'react';
import { CLASS_SHORTCUTS } from '@/data/nctbData';

interface ClassSelectorProps {
  selectedClass: string;
  onSelectClass: (classId: string) => void;
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function ClassSelector({
  selectedClass,
  onSelectClass,
  selectedCategory,
  onSelectCategory,
}: ClassSelectorProps) {
  return (
    <section id="categories" className="w-full max-w-6xl mx-auto px-3.5 sm:px-6 py-6 sm:py-8 min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-gray-200 dark:border-gray-800 w-full">
        <div>
          <h2 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white">
            শ্রেণি নির্বাচন করুন
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            সংশ্লিষ্ট শ্রেণির সব বিষয়ের পাঠ্যবই দেখতে শ্রেণি বাটনে ক্লিক করুন।
          </p>
        </div>

        {(selectedClass !== 'all' || selectedCategory !== 'all') && (
          <button
            onClick={() => {
              onSelectClass('all');
              onSelectCategory('all');
            }}
            className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-semibold self-start sm:self-auto"
          >
            সব বই একসাথে দেখুন (Reset)
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 w-full min-w-0">
        {CLASS_SHORTCUTS.map((group) => {
          return (
            <div
              key={group.groupTitleBn}
              className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-lg p-3.5 sm:p-4 shadow-xs"
            >
              <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                  {group.groupTitleBn}
                </h3>
                <button
                  onClick={() => {
                    onSelectCategory(group.category);
                    onSelectClass('all');
                    const elem = document.querySelector('#books-section');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-medium"
                >
                  সব দেখুন
                </button>
              </div>

              {/* Clean square/compact numeric buttons */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {group.classes.map((cls) => {
                  const isSelected = selectedClass === cls.id;
                  return (
                    <button
                      key={cls.id}
                      onClick={() => {
                        onSelectClass(cls.id);
                        onSelectCategory(group.category);
                        const elem = document.querySelector('#books-section');
                        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded border flex flex-col items-center justify-center font-bold text-sm sm:text-base active:scale-90 transition-all ${
                        isSelected
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                          : 'bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-600 hover:text-emerald-700 shadow-2xs'
                      }`}
                      title={cls.label}
                    >
                      <span className="leading-none">{cls.num}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Quick notice box */}
        <div className="bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 rounded-lg p-3.5 sm:p-4 flex flex-col justify-between shadow-xs">
          <div>
            <h3 className="font-bold text-sm text-emerald-900 dark:text-emerald-300">
              নোটিশ ও পরীক্ষার সিলেবাস
            </h3>
            <p className="text-xs text-emerald-800/80 dark:text-emerald-400/80 mt-1 leading-relaxed">
              এসএসসি, দাখিল ও এইচএসসি পরীক্ষার রুটিন এবং খাতা চ্যালেঞ্জের নিয়মাবলী সরাসরি দেখুন।
            </p>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <a
              href="#notices"
              className="inline-block text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 px-3 py-1.5 rounded transition"
            >
              নোটিশ ও রুটিন দেখুন →
            </a>
            <a
              href="/books/2027/"
              className="inline-block text-xs font-semibold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/50 hover:bg-amber-200 px-2.5 py-1.5 rounded transition"
            >
              ২০২৭ ট্র্যাকার
            </a>
          </div>
        </div>
      </div>

      {/* Internal SEO Linking Bar */}
      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs text-gray-600 dark:text-gray-400">
        <span className="font-semibold text-gray-800 dark:text-gray-200 mr-1">শ্রেণিভিত্তিক পেইজ:</span>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
          <a
            key={num}
            href={`/books/class-${num}/`}
            className="px-2 py-0.5 rounded bg-white dark:bg-[#0f172a] hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 transition"
          >
            {num === 11 || num === 12 ? (num === 11 ? 'একাদশ' : 'দ্বাদশ') : `${num}ম`} শ্রেণি
          </a>
        ))}
      </div>
    </section>
  );
}
