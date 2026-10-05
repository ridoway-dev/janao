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
    <section id="categories" className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
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
            className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
          >
            সব বই একসাথে দেখুন (Reset)
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CLASS_SHORTCUTS.map((group) => {
          return (
            <div
              key={group.groupTitleBn}
              className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
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

              {/* Clean square/compact numeric buttons like competitor */}
              <div className="flex flex-wrap gap-2">
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
                      className={`w-11 h-11 rounded border flex flex-col items-center justify-center font-bold transition ${
                        isSelected
                          ? 'bg-emerald-700 text-white border-emerald-700'
                          : 'bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-600 hover:text-emerald-700'
                      }`}
                      title={cls.label}
                    >
                      <span className="text-base leading-none">{cls.num}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Quick notice box */}
        <div className="bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-emerald-900 dark:text-emerald-300">
              নোটিশ ও পরীক্ষার সিলেবাস
            </h3>
            <p className="text-xs text-emerald-800/80 dark:text-emerald-400/80 mt-1 leading-relaxed">
              এসএসসি, দাখিল ও এইচএসসি পরীক্ষার রুটিন এবং খাতা চ্যালেঞ্জের নিয়মাবলী সরাসরি দেখুন।
            </p>
          </div>
          <div className="mt-3">
            <a
              href="#notices"
              className="inline-block text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 px-3.5 py-1.5 rounded transition"
            >
              নোটিশ ও রুটিন দেখুন →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
