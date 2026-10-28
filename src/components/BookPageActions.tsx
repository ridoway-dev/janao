'use client';

import React, { useState } from 'react';
import { Book } from '@/data/nctbData';
import { BookOpen, Download, ExternalLink, Loader2 } from 'lucide-react';
import BookReaderModal from './BookReaderModal';
import { downloadPdfFile, getDirectDownloadUrl } from '@/utils/downloadPdf';
import { notifyDownload } from '@/utils/notifier';

interface BookPageActionsProps {
  book: Book;
}

export default function BookPageActions({ book }: BookPageActionsProps) {
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

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
    <>
      <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
        {/* Read Online Button */}
        <button
          onClick={() => setIsReaderOpen(true)}
          className="flex-1 py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 shadow-sm transition active:scale-98"
        >
          <BookOpen className="w-4 h-4" />
          <span>অনলাইনে সরাসরি পড়ুন</span>
        </button>

        {/* Download Button */}
        <a
          href={directDownloadHref}
          download={`${book.slug || `book-${book.id}`}.pdf`}
          onClick={() => notifyDownload(book.titleBn)}
          className="py-3 px-5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 shadow-sm transition active:scale-98"
          title="সরাসরি ব্রাউজারে পিডিএফ ডাউনলোড করুন"
        >
          <Download className="w-4 h-4" />
          <span>ডাউনলোড ({book.fileSizeBytes})</span>
        </a>

        {/* Direct Link */}
        <a
          href={book.downloadUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition active:scale-98"
          title="নতুন ট্যাবে সরাসরি পিডিএফ ওপেন করুন"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">নতুন ট্যাব</span>
        </a>
      </div>

      {isReaderOpen && (
        <BookReaderModal
          book={book}
          onClose={() => setIsReaderOpen(false)}
        />
      )}
    </>
  );
}
