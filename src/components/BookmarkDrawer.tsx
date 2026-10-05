'use client';

import React from 'react';
import { Book } from '@/data/nctbData';
import { X, Bookmark, Download, Trash2, BookOpen } from 'lucide-react';

interface BookmarkDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedBooks: Book[];
  onRemoveBookmark: (id: string) => void;
  onSelectBook: (book: Book) => void;
  onClearAll: () => void;
}

export default function BookmarkDrawer({
  isOpen,
  onClose,
  bookmarkedBooks,
  onRemoveBookmark,
  onSelectBook,
  onClearAll,
}: BookmarkDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="w-full max-w-md h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              সংরক্ষিত বইসমূহ ({bookmarkedBooks.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {bookmarkedBooks.length === 0 ? (
            <div className="text-center py-20 px-4 text-slate-400">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40 text-slate-400" />
              <p className="text-sm font-medium">কোনো বই বুকমার্কে যুক্ত করা নেই</p>
              <p className="text-xs text-slate-500 mt-1">
                যেকোনো বইয়ের বুকমার্ক আইকনে ক্লিক করে পরবর্তীতে সহজে পড়ার জন্য সংরক্ষণ করুন।
              </p>
            </div>
          ) : (
            bookmarkedBooks.map((book) => (
              <div
                key={book.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 group"
              >
                <div 
                  className="flex items-center gap-3 flex-1 cursor-pointer"
                  onClick={() => {
                    onSelectBook(book);
                    onClose();
                  }}
                >
                  <div className={`w-10 h-14 rounded-lg bg-gradient-to-br ${book.coverGradient} flex items-center justify-center text-white shrink-0 text-xs font-bold shadow-xs`}>
                    {book.classNameBn.slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                      {book.titleBn}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono block">
                      {book.classNameBn} · {book.fileSizeBytes}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onRemoveBookmark(book.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 transition"
                    title="মুছুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {bookmarkedBooks.length > 0 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-rose-500 hover:underline font-medium"
            >
              সব বুকমার্ক মুছুন
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
            >
              সম্পন্ন
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
