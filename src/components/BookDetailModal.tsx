'use client';

import React, { useState } from 'react';
import { Book } from '@/data/nctbData';
import { X, Download, FileText, Bookmark, ExternalLink, Loader2 } from 'lucide-react';
import { downloadPdfFile, getDirectDownloadUrl } from '@/utils/downloadPdf';
import { notifyDownload } from '@/utils/notifier';

interface BookDetailModalProps {
  book: Book | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onOpenReader: (book: Book) => void;
}

export default function BookDetailModal({
  book,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onOpenReader,
}: BookDetailModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!book) return null;

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const filename = `${book.slug || `book-${book.id}`}.pdf`;
      await downloadPdfFile(book.downloadUrl, filename);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const directDownloadHref = getDirectDownloadUrl(
    book.downloadUrl,
    `${book.slug || `book-${book.id}`}.pdf`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60" onClick={onClose}>
      <div 
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 sm:p-5 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
          <div>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {book.classNameBn} · {book.year}
            </span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">
              {book.titleBn}
            </h3>
            <p className="text-xs text-gray-400">{book.titleEn}</p>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleBookmark(book.id)}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
              title="বুকমার্ক"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="py-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-3">
          <p className="leading-relaxed">
            {book.descriptionBn}
          </p>

          <div className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded border border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-400 block">শ্রেণি:</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">{book.classNameBn}</span>
            </div>
            <div>
              <span className="text-gray-400 block">ভার্সন:</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">{book.mediumBn}</span>
            </div>
            <div>
              <span className="text-gray-400 block">পৃষ্ঠা সংখ্যা:</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">{book.pageCount} পৃষ্ঠা</span>
            </div>
            <div>
              <span className="text-gray-400 block">সাইজ:</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">{book.fileSizeBytes}</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <button
            onClick={() => {
              onClose();
              onOpenReader(book);
            }}
            className="flex-1 py-2 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition"
          >
            <span>অনলাইনে সরাসরি পড়ুন</span>
          </button>

          <a
            href={directDownloadHref}
            download={`${book.slug || `book-${book.id}`}.pdf`}
            onClick={() => notifyDownload(book.titleBn)}
            className="py-2 px-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded text-xs font-medium transition flex items-center justify-center gap-1 active:scale-95"
            title="সরাসরি ব্রাউজারে পিডিএফ ডাউনলোড করুন"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ডাউনলোড PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
}
