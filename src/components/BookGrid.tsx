'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Book, NCTB_CATEGORIES, searchBooks } from '@/data/nctbData';
import { Download, FileText, Bookmark, BookOpen, ExternalLink } from 'lucide-react';
import { downloadPdfFile, getDirectDownloadUrl } from '@/utils/downloadPdf';
import { notifyDownload } from '@/utils/notifier';

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

  // Filter books using smart search parser
  const filtered = searchBooks(books, searchQuery, {
    year: selectedYear,
    category: selectedCategory,
    classLevel: selectedClass,
  });

  const handleDownload = async (e: React.MouseEvent, book: Book) => {
    e.stopPropagation();
    setDownloadingId(book.id);

    try {
      const filename = `${book.slug || `book-${book.id}`}.pdf`;
      await downloadPdfFile(book.downloadUrl, filename);
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <section id="books-section" className="w-full max-w-6xl mx-auto px-3.5 sm:px-6 py-4 sm:py-6 min-w-0">
      
      {/* Category Tabs with no-scrollbar touch scroll */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-gray-200 dark:border-gray-800 text-xs sm:text-sm no-scrollbar w-full">
        {NCTB_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                onSelectClass('all');
              }}
              className={`px-3 py-1.5 rounded-full sm:rounded whitespace-nowrap font-medium transition shrink-0 active:scale-95 ${
                isSelected
                  ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                  : 'text-gray-700 dark:text-gray-300 bg-gray-100/70 dark:bg-gray-800/60 sm:bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {cat.nameBn}
            </button>
          );
        })}
      </div>

      {/* Info bar with responsive wrap */}
      <div className="flex flex-wrap items-center justify-between gap-2 py-2.5 sm:py-3 text-xs text-gray-500 dark:text-gray-400 w-full">
        <div className="flex flex-wrap items-center gap-1.5">
          <span>মোট <strong>{filtered.length}</strong> টি বই পাওয়া গেছে</span>
          {selectedClass !== 'all' && (
            <span className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded inline-flex items-center">
              শ্রেণি: {selectedClass}
              <button onClick={() => onSelectClass('all')} className="ml-1 text-gray-500 hover:text-red-500" aria-label="ফিল্টার মুছুন">✕</button>
            </span>
          )}
          {searchQuery && (
            <span className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded inline-flex items-center">
              &ldquo;{searchQuery}&rdquo;
              <button onClick={onClearSearch} className="ml-1 text-gray-500 hover:text-red-500" aria-label="সার্চ মুছুন">✕</button>
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
            className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
          >
            সব দেখুন
          </button>
        )}
      </div>

      {/* Book Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 sm:py-16 border border-dashed border-gray-300 dark:border-gray-800 rounded bg-white dark:bg-[#0f172a] w-full">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 w-full min-w-0">
          {filtered.map((book) => {
            const isBookmarked = bookmarkedIds.includes(book.id);
            const isDownloading = downloadingId === book.id;

            return (
              <div
                key={book.id}
                onClick={() => onOpenReader(book)}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl sm:rounded-lg p-3 sm:p-3.5 hover:border-emerald-600 transition-all flex flex-col justify-between cursor-pointer group shadow-xs active:scale-[0.99] w-full min-w-0 overflow-hidden box-border"
              >
                <div className="w-full min-w-0">
                  {/* Clean book header / thumbnail */}
                  <div className="flex items-start justify-between gap-2.5 mb-2 sm:mb-2.5">
                    <div className="w-10 h-12 sm:w-10 sm:h-12 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg sm:rounded flex flex-col items-center justify-center text-emerald-800 dark:text-emerald-300 shrink-0">
                      <FileText className="w-4 h-4 shrink-0" />
                      <span className="text-[9px] font-bold mt-0.5">PDF</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 flex-wrap">
                        <span className="font-semibold text-emerald-700 dark:text-emerald-400">{book.classNameBn}</span>
                        <span>·</span>
                        <span>{book.mediumBn}</span>
                        {book.fileSizeBytes && (
                          <>
                            <span>·</span>
                            <span className="text-gray-400 dark:text-gray-500">{book.fileSizeBytes}</span>
                          </>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition line-clamp-2 leading-snug mt-0.5">
                        {book.titleBn}
                      </h3>
                      {book.titleEn && book.titleEn !== book.titleBn && (
                        <p className="text-[11px] text-gray-400 truncate mt-0.5">
                          {book.titleEn}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(book.id);
                      }}
                      className="p-1.5 -mr-1 -mt-1 text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition active:scale-90 shrink-0"
                      title={isBookmarked ? 'বুকমার্ক সরানো' : 'বুকমার্ক করুন'}
                      aria-label="বুকমার্ক"
                    >
                      <Bookmark className={`w-4 h-4 sm:w-3.5 sm:h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                    </button>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed break-words">
                    {book.descriptionBn}
                  </p>
                </div>

                {/* Card action buttons: Read Online, Download, and Dedicated SEO Page */}
                <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-800/80 flex items-center gap-1.5 text-xs w-full min-w-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenReader(book);
                    }}
                    className="flex-1 min-w-0 py-1.5 px-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold transition active:scale-95 flex items-center justify-center gap-1 shadow-xs"
                    title="অনলাইনে সরাসরি বইটি পড়ুন"
                  >
                    <BookOpen className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">বইটি পড়ুন</span>
                  </button>

                  <a
                    href={getDirectDownloadUrl(book.downloadUrl, `${book.slug || `book-${book.id}`}.pdf`)}
                    download={`${book.slug || `book-${book.id}`}.pdf`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!book.downloadUrl || !book.downloadUrl.startsWith('http')) {
                        e.preventDefault();
                        alert('এই বইটির পিডিএফ ফাইল এখনও প্রকাশিত হয়নি বা লিংকটি প্রস্তুত নয়।');
                        return;
                      }
                      notifyDownload(book.titleBn);
                    }}
                    className="shrink-0 py-1.5 px-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded text-xs font-medium transition active:scale-95 flex items-center justify-center gap-1"
                    title="সরাসরি ব্রাউজারে পিডিএফ ডাউনলোড করুন"
                  >
                    <Download className="w-3.5 h-3.5 shrink-0" />
                    <span>PDF</span>
                  </a>

                  <Link
                    href={`/books/${book.classLevel}/${book.slug}/`}
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0 p-1.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800 text-gray-500 hover:text-emerald-700 dark:hover:text-emerald-400 border border-gray-200 dark:border-gray-700 rounded transition active:scale-95 flex items-center justify-center"
                    title="বইয়ের ডেডিকেটেড পেইজ"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </section>
  );
}
