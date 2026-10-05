'use client';

import React from 'react';
import { OTHER_CATEGORIES } from '@/data/nctbData';

interface CategoryBrowserProps {
  onSelectCategoryFilter: (categoryName: string) => void;
}

export default function CategoryBrowser({ onSelectCategoryFilter }: CategoryBrowserProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6 border-t border-gray-200 dark:border-gray-800">
      <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-3">
        অন্যান্য ক্যাটাগরি
      </h3>

      <div className="flex flex-wrap gap-2 text-xs">
        {OTHER_CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => onSelectCategoryFilter(cat.name)}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-gray-800 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-emerald-400 border border-gray-200 dark:border-gray-700 rounded transition"
          >
            {cat.name}
          </button>
        ))}
      </div>
    </section>
  );
}
