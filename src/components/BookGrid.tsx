'use client';

import React, { useState } from 'react';
import { Book, NCTB_CATEGORIES } from '@/data/nctbData';
import { 
  Download, 
  Eye, 
  Bookmark, 
  FileText, 
  Search, 
  Check, 
  Filter, 
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';

interface BookGridProps {
  books: Book[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedClass: string;
  onSelectClass: (cls: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
  onOpenBookModal: (book: Book) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  selectedYear: number;
}

export default function BookGrid({
  books,
  selectedCategory,
  onSelectCategory,
  selectedClass,
  onSelectClass,
  searchQuery,
  onClearSearch,
  onOpenBookModal,
  bookmarkedIds,
  onToggleBookmark,
  selectedYear,
}: BookGridProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<'default' | 'name' | 'size'>('default');

  // Filter books based on search, category, class, year
  let filtered = books.filter((book) => {
    // Year filter
    if (book.year !== selectedYear) return false;

    // Category filter
    if (selectedCategory !== 'all' && book.category !== selectedCategory) {
      return false;
    }

    // Class filter
    if (selectedClass !== 'all' && book.classLevel !== selectedClass) {
      return false;
    }

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const matchBn = book.titleBn.toLowerCase().includes(q);
      const matchEn = book.titleEn.toLowerCase().includes(q);
      const matchClass = book.classNameBn.toLowerCase().includes(q) || book.classLevel.toLowerCase().includes(q);
      const matchCategory = book.categoryBn.toLowerCase().includes(q);
      const matchDesc = book.descriptionBn.toLowerCase().includes(q);
      if (!matchBn && !matchEn && !matchClass && !matchCategory && !matchDesc) {
        return false;
      }
    }

    return true;
  });

  // Sorting
  if (sortOption === 'name') {
    filtered = [...filtered].sort((a, b) => a.titleBn.localeCompare(b.titleBn, 'bn'));
  } else if (sortOption === 'size') {
    filtered = [...filtered].sort((a, b) => parseFloat(b.fileSizeBytes) - parseFloat(a.fileSizeBytes));
  }

  const handleDirectDownload = (e: React.MouseEvent, book: Book) => {
    e.stopPropagation();
    setDownloadingId(book.id);
    setTimeout(() => {
      setDownloadingId(null);
      const link = document.createElement('a');
      link.href = '#';
      link.setAttribute('download', `${book.titleEn.replace(/\s+/g, '_')}_${book.year}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };

  return (
    <section id="books-section" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Pills Bar */}
      <div className="flex items-center justify-between gap-3 mb-6 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {NCTB_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onSelectClass('all');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 hover:text-emerald-600'
                }`}
              >
                {cat.nameBn}
              </button>
            );
          })}
        </div>

        {/* Sort select */}
        <div className="hidden sm:flex items-center gap-2 text-xs shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500 dark:text-slate-400">সাজান:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as any)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="default">প্রচলিত নিয়ম</option>
            <option value="name">নাম অনুযায়ী (ক-ক্ষ)</option>
            <option value="size">সাইজ (বড় থেকে ছোট)</option>
          </select>
        </div>
      </div>

      {/* Header Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            পাঠ্যবইয়ের তালিকা
          </span>
          <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400">
            {filtered.length} টি বই পাওয়া গেছে
          </span>
          {selectedYear && (
            <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
              (শিক্ষাবর্ষ {selectedYear})
            </span>
          )}
        </div>

        {/* Active Filter Indicators */}
        <div className="flex items-center gap-2 text-xs">
          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-medium">
              অনুসন্ধান: &ldquo;{searchQuery}&rdquo;
              <button onClick={onClearSearch} className="hover:text-rose-500 ml-1">✕</button>
            </span>
          )}

          {selectedClass !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 font-medium">
              শ্রেণি: {selectedClass}
              <button onClick={() => onSelectClass('all')} className="hover:text-rose-500 ml-1">✕</button>
            </span>
          )}

          {(searchQuery || selectedClass !== 'all' || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                onClearSearch();
                onSelectClass('all');
                onSelectCategory('all');
              }}
              className="text-slate-400 hover:text-rose-500 transition underline underline-offset-2 ml-1"
            >
              রিসেট
            </button>
          )}
        </div>
      </div>

      {/* Book Cards Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            কোনো বই খুঁজে পাওয়া যায়নি
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            আপনার অনুসন্ধান &ldquo;{searchQuery}&rdquo; বা নির্বাচিত ফিল্টারের সাথে মিলে এমন কোনো বই নেই। ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।
          </p>
          <button
            onClick={() => {
              onClearSearch();
              onSelectCategory('all');
              onSelectClass('all');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md transition"
          >
            সকল বই দেখুন
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((book) => {
            const isBookmarked = bookmarkedIds.includes(book.id);
            const isDownloading = downloadingId === book.id;

            return (
              <div
                key={book.id}
                onClick={() => onOpenBookModal(book)}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 hover:shadow-xl hover:border-emerald-400/60 dark:hover:border-emerald-600/60 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Book Mockup Header */}
                  <div
                    className={`relative w-full h-44 rounded-xl p-3 bg-gradient-to-br ${book.coverGradient} text-white shadow-md group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between overflow-hidden`}
                  >
                    {/* Top Spine / Badges */}
                    <div className="flex justify-between items-start z-10">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/30 backdrop-blur-xs uppercase tracking-wider">
                        {book.classNameBn}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(book.id);
                        }}
                        className={`p-1.5 rounded-lg backdrop-blur-xs transition ${
                          isBookmarked
                            ? 'bg-amber-400 text-slate-900'
                            : 'bg-black/25 text-white/80 hover:text-white hover:bg-black/40'
                        }`}
                        title={isBookmarked ? 'বুকমার্ক সরানো' : 'বুকমার্ক যুক্ত করুন'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Book Title in Center */}
                    <div className="text-center my-auto z-10 px-1">
                      <h4 className="text-base font-extrabold leading-snug drop-shadow-md">
                        {book.titleBn}
                      </h4>
                      <p className="text-[10px] text-white/80 italic mt-0.5 font-sans truncate">
                        {book.titleEn}
                      </p>
                    </div>

                    {/* Footer Info */}
                    <div className="flex justify-between items-center text-[10px] text-white/90 pt-1 border-t border-white/20 z-10">
                      <span>NCTB {book.year}</span>
                      <span className="font-mono">{book.fileSizeBytes}</span>
                    </div>

                    {/* Subtle page-fold effect */}
                    <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
                  </div>

                  {/* Card Details */}
                  <div className="mt-3.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span>{book.categoryBn}</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">{book.mediumBn}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                      {book.titleBn}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {book.descriptionBn}
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={(e) => handleDirectDownload(e, book)}
                    disabled={isDownloading}
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs shadow-sm shadow-emerald-600/20 transition flex items-center justify-center gap-1.5"
                    title="সরাসরি পিডিএফ ডাউনলোড"
                  >
                    <Download className={`w-3.5 h-3.5 ${isDownloading ? 'animate-bounce' : ''}`} />
                    <span>{isDownloading ? 'ডাউনলোড হচ্ছে...' : 'ডাউনলোড PDF'}</span>
                  </button>

                  <button
                    onClick={() => onOpenBookModal(book)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition"
                    title="বিস্তারিত ও প্রিভিউ দেখুন"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
