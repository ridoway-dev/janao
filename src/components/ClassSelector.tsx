'use client';

import React from 'react';
import { CLASS_SHORTCUTS } from '@/data/nctbData';
import { GraduationCap, BookOpen, Building2, School, Award, Sparkles } from 'lucide-react';

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
  const getIcon = (cat: string) => {
    switch (cat) {
      case 'primary':
        return <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'secondary':
        return <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'ibtedai':
        return <Building2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      case 'dakhil':
        return <School className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'college':
        return <Award className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-emerald-600" />;
    }
  };

  const getBorderColor = (cat: string) => {
    switch (cat) {
      case 'primary':
        return 'hover:border-emerald-400/80';
      case 'secondary':
        return 'hover:border-blue-400/80';
      case 'ibtedai':
        return 'hover:border-teal-400/80';
      case 'dakhil':
        return 'hover:border-cyan-400/80';
      case 'college':
        return 'hover:border-rose-400/80';
      default:
        return 'hover:border-emerald-400/80';
    }
  };

  return (
    <section id="categories" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
            <span>দ্রুত শ্রেণি নির্বাচন</span>
            <span className="w-8 h-[2px] bg-emerald-500 rounded-full"></span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            শ্রেণি অনুযায়ী পাঠ্যবইসমূহ
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            আপনার কাঙ্ক্ষিত শ্রেণির বাটনে ক্লিক করে সংশ্লিষ্ট সকল বই দেখুন ও ডাউনলোড করুন।
          </p>
        </div>

        {/* Reset / All filter button */}
        {(selectedClass !== 'all' || selectedCategory !== 'all') && (
          <button
            onClick={() => {
              onSelectClass('all');
              onSelectCategory('all');
            }}
            className="self-start sm:self-auto text-xs px-3.5 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold hover:bg-emerald-200 transition border border-emerald-300 dark:border-emerald-800"
          >
            সব বই একসাথে দেখুন (Reset Filter)
          </button>
        )}
      </div>

      {/* Grid of Class Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CLASS_SHORTCUTS.map((group) => {
          const isCategoryActive = selectedCategory === group.category;
          return (
            <div
              key={group.groupTitleBn}
              className={`glass-card rounded-2xl p-5 transition-all duration-200 ${getBorderColor(
                group.category
              )} ${
                isCategoryActive
                  ? 'ring-2 ring-emerald-500/70 shadow-lg shadow-emerald-500/10'
                  : 'hover:shadow-md'
              }`}
            >
              {/* Group Title Header */}
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80">
                    {getIcon(group.category)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {group.groupTitleBn}
                    </h3>
                    <span className="text-[11px] text-slate-400 capitalize">
                      {group.category} Education
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectCategory(group.category);
                    onSelectClass('all');
                    const elem = document.querySelector('#books-section');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  সব দেখুন →
                </button>
              </div>

              {/* Class Number Buttons (Just like competitor but modernized) */}
              <div className="flex flex-wrap items-center gap-2">
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
                      className={`group relative flex-1 min-w-[50px] py-2 px-2.5 rounded-xl text-center font-bold transition-all duration-200 ${
                        isSelected
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 scale-105'
                          : 'bg-slate-100/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600'
                      }`}
                      title={cls.label}
                    >
                      <span className="text-base sm:text-lg block leading-none">{cls.num}</span>
                      <span className="text-[10px] block opacity-80 mt-1 font-normal truncate">
                        {cls.label.replace('শ্রেণি', '')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Notice & Routine Quick Tile */}
        <div className="glass-card rounded-2xl p-5 border-dashed border-2 border-emerald-300/70 dark:border-emerald-800/70 flex flex-col justify-between bg-gradient-to-br from-emerald-50/50 to-teal-50/30 dark:from-emerald-950/20 dark:to-teal-950/10">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm mb-2">
              <Sparkles className="w-4 h-4" />
              <span>রুটিন, সিলেবাস ও নোটিশ</span>
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">
              পরীক্ষা ও বোর্ডের আপডেট
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              এসএসসি ও এইচএসসি পরীক্ষার রুটিন, রেজাল্ট পুনঃনিরীক্ষণ নিয়মাবলি ও বৃত্তির ফল।
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-200/60 dark:border-emerald-900/60 flex items-center justify-between">
            <a
              href="#notices"
              className="w-full text-center py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/25 transition"
            >
              নোটিশ বোর্ডে যান →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
