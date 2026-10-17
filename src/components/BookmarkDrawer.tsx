'use client';

import React from 'react';
import { Book } from '@/data/nctbData';
import { X, Trash2, BookOpen } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50" onClick={onClose}>
      <div 
        className="w-full max-w-[85vw] sm:max-w-sm h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm">
            সংরক্ষিত বই ({bookmarkedBooks.length})
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto space-y-2">
          {bookmarkedBooks.length === 0 ? (
            <div className="text-center py-20 text-gray-400 text-xs">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>কোনো বই বুকমার্কে যুক্ত করা নেই।</p>
            </div>
          ) : (
            bookmarkedBooks.map((book) => (
              <div
                key={book.id}
                className="p-2.5 rounded border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-2"
              >
                <div 
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => {
                    onSelectBook(book);
                    onClose();
                  }}
                >
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white hover:text-emerald-700 truncate">
                    {book.titleBn}
                  </h4>
                  <span className="text-[11px] text-gray-400">
                    {book.classNameBn} · {book.fileSizeBytes}
                  </span>
                </div>

                <button
                  onClick={() => onRemoveBookmark(book.id)}
                  className="text-gray-400 hover:text-red-500 p-1"
                  title="মুছুন"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {bookmarkedBooks.length > 0 && (
          <div className="p-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-red-500 hover:underline"
            >
              সব মুছুন
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-emerald-700 text-white text-xs font-medium rounded"
            >
              সম্পন্ন
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
