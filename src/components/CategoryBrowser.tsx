'use client';

import React from 'react';
import { OTHER_CATEGORIES } from '@/data/nctbData';
import { 
  GraduationCap, 
  Award, 
  Book, 
  CheckCircle2, 
  Bell, 
  Building, 
  Radio, 
  FileText, 
  Landmark, 
  Compass,
  FolderOpen
} from 'lucide-react';

interface CategoryBrowserProps {
  onSelectCategoryFilter: (categoryName: string) => void;
}

export default function CategoryBrowser({ onSelectCategoryFilter }: CategoryBrowserProps) {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-blue-500" />;
      case 'Award':
        return <Award className="w-5 h-5 text-amber-500" />;
      case 'Book':
        return <Book className="w-5 h-5 text-emerald-500" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-teal-500" />;
      case 'Bell':
        return <Bell className="w-5 h-5 text-rose-500" />;
      case 'Building':
        return <Building className="w-5 h-5 text-emerald-600" />;
      case 'Radio':
        return <Radio className="w-5 h-5 text-cyan-500" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-purple-500" />;
      case 'Landmark':
        return <Landmark className="w-5 h-5 text-indigo-500" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-orange-500" />;
      default:
        return <FolderOpen className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
          <span>বিষয়ভিত্তিক ক্যাটাগরি</span>
          <span className="w-8 h-[2px] bg-emerald-500 rounded-full"></span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          অন্যান্য গুরুত্বপূর্ণ ক্যাটাগরি
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          সকল শিক্ষা সংবাদের ক্যাটাগরি ও প্রয়োজনীয় তথ্যাবলির ডিরেক্টরি।
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
        {OTHER_CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => onSelectCategoryFilter(cat.name)}
            className="group p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all text-left flex items-center gap-3"
          >
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
              {getCategoryIcon(cat.icon)}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                {cat.name}
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">
                {cat.count}+ রিসোর্স
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
