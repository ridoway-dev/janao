'use client';

import React, { useState } from 'react';
import { Book, NCTB_CATEGORIES } from '@/data/nctbData';
import { Download, FileText, Bookmark, BookOpen } from 'lucide-react';

interface BookGridProps {
  books: Book[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedClass: string;
  onSelectClass: (cls: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
  onOpenBookModal: (book: Book) => void;
  onOpenReader: (book: Book) => void;
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
  onOpenReader,
  bookmarkedIds,
  onToggleBookmark,
  selectedYear,
}: BookGridProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Filter books
  let filtered = books.filter((book) => {
    if (book.year !== selectedYear) return false;
    if (selectedCategory !== 'all' && book.category !== selectedCategory) return false;
    if (selectedClass !== 'all' && book.classLevel !== selectedClass) return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const matchBn = book.titleBn.toLowerCase().includes(q);
      const matchEn = book.titleEn.toLowerCase().includes(q);
      const matchClass = book.classNameBn.toLowerCase().includes(q) || book.classLevel.toLowerCase().includes(q);
      if (!matchBn && !matchEn && !matchClass) return false;
    }

    return true;
  });

  const handleDownload = (e: React.MouseEvent, book: Book) => {
    e.stopPropagation();
    setDownloadingId(book.id);
    setTimeout(() => {
      setDownloadingId(null);
      const link = document.createElement('a');
      link.href = book.downloadUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();
    }, 500);
  };

  return (
    <section id="books-section" className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      
      {/* Category Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-gray-200 dark:border-gray-800 text-xs sm:text-sm">
        {NCTB_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                onSelectClass('all');
              }}
              className={`px-3 py-1.5 rounded whitespace-nowrap font-medium transition ${
                isSelected
                  ? 'bg-emerald-700 text-white font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {cat.nameBn}
            </button>
          );
        })}
      </div>

      {/* Info bar */}
      <div className="flex items-center justify-between py-3 text-xs text-gray-500 dark:text-gray-400">
        <div>
          <span>মোট <strong>{filtered.length}</strong> টি বই পাওয়া গেছে</span>
          {selectedClass !== 'all' && (
            <span className="ml-2 px-1.5 py-0.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
              শ্রেণি: {selectedClass}
              <button onClick={() => onSelectClass('all')} className="ml-1 text-gray-500 hover:text-red-500">✕</button>
            </span>
          )}
          {searchQuery && (
            <span className="ml-2 px-1.5 py-0.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
              &ldquo;{searchQuery}&rdquo;
              <button onClick={onClearSearch} className="ml-1 text-gray-500 hover:text-red-500">✕</button>
            </span>
          )}
        </div>

        {(selectedCategory !== 'all' || selectedClass !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              onSelectCategory('all');
              onSelectClass('all');
              onClearSearch();
            }}
            className="text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            সব দেখুন
          </button>
        )}
      </div>

      {/* Book Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-gray-300 dark:border-gray-800 rounded bg-white dark:bg-[#0f172a]">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">কোনো বই পাওয়া যায়নি।</p>
          <button
            onClick={() => {
              onSelectCategory('all');
              onSelectClass('all');
              onClearSearch();
            }}
            className="mt-3 text-xs text-emerald-700 dark:text-emerald-400 font-semibold underline"
          >
            সব বইয়ের তালিকা দেখুন
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((book) => {
            const isBookmarked = bookmarkedIds.includes(book.id);
            const isDownloading = downloadingId === book.id;

            return (
              <div
                key={book.id}
                onClick={() => onOpenReader(book)}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-lg p-3.5 hover:border-emerald-600 transition flex flex-col justify-between cursor-pointer group shadow-xs"
              >
                <div>
                  {/* Clean book header / thumbnail */}
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="w-10 h-12 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded flex flex-col items-center justify-center text-emerald-800 dark:text-emerald-300 shrink-0">
                      <FileText className="w-4 h-4" />
                      <span className="text-[9px] font-bold mt-0.5">PDF</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
                        <span className="font-semibold text-emerald-700 dark:text-emerald-400">{book.classNameBn}</span>
                        <span>·</span>
                        <span>{book.mediumBn}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition truncate mt-0.5">
                        {book.titleBn}
                      </h3>
                      <p className="text-[11px] text-gray-400 truncate">
                        {book.titleEn}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(book.id);
                      }}
                      className="p-1 text-gray-400 hover:text-amber-500 transition"
                      title={isBookmarked ? 'বুকমার্ক সরানো' : 'বুকমার্ক করুন'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                    </button>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {book.descriptionBn}
                  </p>
                </div>

                {/* Card action buttons: Read Online & Download */}
                <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-800/80 flex items-center gap-2 text-xs">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenReader(book);
                    }}
                    className="flex-1 py-1.5 px-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold transition flex items-center justify-center gap-1"
                    title="অনলাইনে সরাসরি বইটি পড়ুন"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>বইটি পড়ুন</span>
                  </button>

                  <button
                    onClick={(e) => handleDownload(e, book)}
                    disabled={isDownloading}
                    className="py-1.5 px-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded text-xs font-medium transition flex items-center gap-1"
                    title="সরাসরি পিডিএফ ডাউনলোড"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isDownloading ? '...' : 'PDF'}</span>
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
