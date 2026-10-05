'use client';

import React, { useState } from 'react';
import { Book } from '@/data/nctbData';
import { 
  X, 
  Download, 
  FileText, 
  ExternalLink, 
  Bookmark, 
  Share2, 
  Check, 
  ShieldCheck, 
  Calendar, 
  HardDrive,
  Eye
} from 'lucide-react';

interface BookDetailModalProps {
  book: Book | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export default function BookDetailModal({
  book,
  onClose,
  isBookmarked,
  onToggleBookmark,
}: BookDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!book) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + `?book=${book.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatedDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      // Create actual virtual download trigger
      const link = document.createElement('a');
      link.href = '#';
      link.setAttribute('download', `${book.titleEn.replace(/\s+/g, '_')}_NCTB_${book.year}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => setDownloadSuccess(false), 3500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {book.classNameBn}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {book.year} শিক্ষাবর্ষ
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onToggleBookmark(book.id)}
              className={`p-2 rounded-xl border transition ${
                isBookmarked
                  ? 'bg-amber-100 dark:bg-amber-950 text-amber-600 border-amber-300 dark:border-amber-800'
                  : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:text-amber-500'
              }`}
              title={isBookmarked ? 'বুকমার্ক থেকে মুছুন' : 'বুকমার্ক করুন'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-emerald-600 transition"
              title="লিঙ্ক কপি করুন"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-500 transition"
              title="বন্ধ করুন"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
            
            {/* Book Cover Graphic */}
            <div className="sm:col-span-5 flex flex-col items-center">
              <div className={`w-44 h-60 rounded-2xl p-4 bg-gradient-to-br ${book.coverGradient} shadow-xl shadow-slate-400/20 dark:shadow-none flex flex-col justify-between text-white border-2 border-white/20 relative group`}>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-black/25 px-2 py-0.5 rounded backdrop-blur-xs">
                    NCTB {book.year}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="text-center my-auto">
                  <h4 className="text-lg font-extrabold leading-tight drop-shadow-sm">
                    {book.titleBn}
                  </h4>
                  <p className="text-[11px] text-white/80 mt-1 font-medium italic">
                    {book.titleEn}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/25 flex justify-between items-center text-[10px]">
                  <span>{book.classNameBn}</span>
                  <span className="font-mono">{book.fileSizeBytes}</span>
                </div>
              </div>

              {/* Security & Verification Badge */}
              <div className="mt-3.5 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>NCTB যাচাইকৃত মূল সংস্করণ</span>
              </div>
            </div>

            {/* Book Information */}
            <div className="sm:col-span-7">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {book.titleBn}
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                {book.titleEn}
              </p>

              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {book.descriptionBn}
              </p>

              {/* Metadata Specs Table */}
              <div className="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">শ্রেণি</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{book.classNameBn}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">মাধ্যম / কারিকুলাম</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{book.mediumBn}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">পৃষ্ঠা সংখ্যা</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">প্রায় {book.pageCount} পৃষ্ঠা</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">ফাইলের আকার</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">{book.fileSizeBytes}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col gap-2.5">
                <button
                  onClick={handleSimulatedDownload}
                  disabled={downloading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2"
                >
                  <Download className={`w-4 h-4 ${downloading ? 'animate-bounce' : ''}`} />
                  <span>
                    {downloading
                      ? 'ডাউনলোড প্রস্তুত হচ্ছে...'
                      : downloadSuccess
                      ? 'ডাউনলোড শুরু হয়েছে!'
                      : 'পিডিএফ ডাউনলোড করুন (Free PDF)'}
                  </span>
                </button>

                <a
                  href="https://nctb.portal.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  <span>NCTB অফিসিয়াল সার্ভার লিংক</span>
                </a>
              </div>

              {copied && (
                <div className="mt-3 p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs text-center font-medium">
                  বইটির শেয়ার লিংক সফলভাবে কপি করা হয়েছে!
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
