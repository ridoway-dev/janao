'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Book } from '@/data/nctbData';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Download, 
  Bookmark, 
  BookOpen, 
  FileText,
  ExternalLink,
  RefreshCw,
  Eye,
  List
} from 'lucide-react';

interface BookReaderModalProps {
  book: Book | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export default function BookReaderModal({
  book,
  onClose,
  isBookmarked,
  onToggleBookmark,
}: BookReaderModalProps) {
  // Default to official PDF viewer as user requested
  const [viewMode, setViewMode] = useState<'pdf' | 'digital'>('pdf');
  const [pdfSource, setPdfSource] = useState<'cloud' | 'google'>('cloud');
  const [iframeLoading, setIframeLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(book?.pageCount || 96);
  const [themeMode, setThemeMode] = useState<'paper' | 'white' | 'sepia' | 'dark'>('paper');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showToc, setShowToc] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (book) {
      setCurrentPage(1);
      setTotalPages(book.pageCount || 96);
      setIframeLoading(true);
    }
  }, [book]);

  // Keyboard navigation for digital mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!book) return;
      if (viewMode === 'digital') {
        if (e.key === 'ArrowRight' || e.key === 'PageDown') {
          e.preventDefault();
          if (currentPage < totalPages) setCurrentPage((p) => p + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          e.preventDefault();
          if (currentPage > 1) setCurrentPage((p) => p - 1);
        }
      }
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages, book, isFullscreen, viewMode]);

  if (!book) return null;

  // Determine the best PDF embed URL
  const getEmbedUrl = () => {
    if (pdfSource === 'google') {
      return `https://docs.google.com/viewer?url=${encodeURIComponent(book.downloadUrl)}&embedded=true`;
    }

    // Nextcloud Cloud link: egovcloud public preview
    if (book.downloadUrl.includes('drive.egovcloud.gov.bd/index.php/s/')) {
      // Removing /download gives the interactive Nextcloud PDF viewer
      return book.downloadUrl.replace(/\/download\/?$/, '');
    }

    // Google Drive file preview
    if (book.downloadUrl.includes('drive.google.com/file/d/')) {
      return book.downloadUrl.replace(/\/view(\?.*)?$/, '/preview');
    }

    // Fallback: Google Docs viewer
    return `https://docs.google.com/viewer?url=${encodeURIComponent(book.downloadUrl)}&embedded=true`;
  };

  const embedUrl = getEmbedUrl();

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Sample chapters for digital mode
  const getChapters = (b: Book) => {
    if (b.titleBn.includes('বাংলা')) {
      return [
        { page: 1, title: '১ম পাঠ: আমাদের প্রিয় মাতৃভাষা ও বর্ণমালা' },
        { page: 8, title: '২য় পাঠ: প্রভাতী (কবিতা - কাজী নজরুল ইসলাম)' },
        { page: 16, title: '৩য় পাঠ: রূপসী বাংলা ও আমাদের প্রকৃতি' },
        { page: 28, title: '৪র্থ পাঠ: সুন্দরবনের প্রাণী ও পরিবেশ' },
        { page: 42, title: '৫ম পাঠ: আদর্শ ছেলে (কবিতা - কুসুমকুমারী দাশ)' },
      ];
    } else if (b.titleBn.includes('গণিত')) {
      return [
        { page: 1, title: 'অধ্যায় ১: সংখ্যা গণনা ও স্থানীয় মান' },
        { page: 12, title: 'অধ্যায় ২: যোগ ও বিয়োগের বাস্তব প্রয়োগ' },
        { page: 24, title: 'অধ্যায় ৩: গুণ ও ভাগের সহজ নিয়ম' },
        { page: 38, title: 'অধ্যায় ৪: ভগ্নাংশ ও দশমিক ধারণা' },
      ];
    } else {
      return [
        { page: 1, title: 'অধ্যায় ১: প্রারম্ভিক পরিচিতি ও সূচিপত্র' },
        { page: 15, title: 'অধ্যায় ২: মূল পাঠ ও ধারণাসমূহ' },
        { page: 35, title: 'অধ্যায় ৩: অনুশীলনী ও ব্যবহারিক কাজ' },
      ];
    }
  };

  const chapters = getChapters(book);

  const getThemeClasses = () => {
    switch (themeMode) {
      case 'paper':
        return 'bg-[#fcf9f2] text-[#292524] border-[#e7e0d3]';
      case 'sepia':
        return 'bg-[#f4ecd8] text-[#433422] border-[#e2d5b8]';
      case 'dark':
        return 'bg-[#18181b] text-[#e4e4e7] border-[#27272a]';
      case 'white':
      default:
        return 'bg-white text-gray-900 border-gray-200';
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/90 text-slate-100 select-none animate-fadeIn"
    >
      {/* Top Header Controls Bar */}
      <div className="h-14 bg-slate-900 border-b border-slate-800 px-3 sm:px-4 flex items-center justify-between shrink-0 gap-2">
        
        {/* Book Title & Close */}
        <div className="flex items-center gap-2.5 overflow-hidden">
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
            title="পড়া বন্ধ করুন (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex flex-col truncate">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm text-white truncate">
                {book.titleBn}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-900/80 text-emerald-300 font-semibold border border-emerald-700/60 shrink-0">
                {book.classNameBn}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 hidden md:inline">
              NCTB {book.year} · {book.mediumBn}
            </span>
          </div>
        </div>

        {/* View Mode Switcher: Official Cloud PDF vs Digital E-Book */}
        <div className="flex items-center p-0.5 bg-slate-950 rounded border border-slate-800 text-xs shrink-0">
          <button
            onClick={() => setViewMode('pdf')}
            className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition ${
              viewMode === 'pdf'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>মূল পিডিএফ ভিউয়ার</span>
          </button>

          <button
            onClick={() => setViewMode('digital')}
            className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition ${
              viewMode === 'digital'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>ডিজিটাল ই-বুক</span>
          </button>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* PDF Source switch (Cloud vs Google) */}
          {viewMode === 'pdf' && (
            <button
              onClick={() => {
                setPdfSource(pdfSource === 'cloud' ? 'google' : 'cloud');
                setIframeLoading(true);
              }}
              className="hidden lg:flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
              title="পিডিএফ লোড না হলে সার্ভার পরিবর্তন করুন"
            >
              <RefreshCw className="w-3 h-3" />
              <span>সার্ভার {pdfSource === 'cloud' ? '১' : '২'}</span>
            </button>
          )}

          {/* Open in full new tab */}
          <a
            href={book.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            title="নতুন উইন্ডোতে বড় করে দেখুন"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Direct Download Button */}
          <a
            href={book.downloadUrl}
            download
            className="p-1.5 sm:px-2.5 sm:py-1 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1 transition"
            title="বইটি ডাউনলোড করুন"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ডাউনলোড</span>
          </a>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
            title="ফুলস্ক্রিন করুন"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Main Reading Body */}
      <div className="flex-1 relative w-full h-[calc(100vh-56px)] bg-slate-950 flex flex-col">
        
        {viewMode === 'pdf' ? (
          /* =========================================================================
             1. Official Cloud / Google Drive Embedded PDF Viewer
             ========================================================================= */
          <div className="relative w-full h-full flex flex-col">
            
            {/* Top Helper Notice for Students */}
            <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-1.5 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>অফিশিয়াল ক্লাউড পিডিএফ ভিউয়ার সক্রিয়</span>
                <span className="hidden md:inline text-slate-500">
                  (জুম, পেজ স্ক্রল এবং সার্চ অপশন সহ)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-400">
                  লোড হতে সময় লাগলে:
                </span>
                <button
                  onClick={() => {
                    setPdfSource(pdfSource === 'cloud' ? 'google' : 'cloud');
                    setIframeLoading(true);
                  }}
                  className="text-emerald-400 hover:underline font-semibold text-xs"
                >
                  সার্ভার বদলান ({pdfSource === 'cloud' ? 'গুগল ড্রাইভ ভিউয়ার' : 'ক্লাউড ভিউয়ার'})
                </button>
                <a
                  href={book.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-semibold text-xs flex items-center gap-0.5"
                >
                  <span>নতুন ট্যাবে খুলুন</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Iframe Loading Overlay */}
            {iframeLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/80 text-center p-4">
                <div className="w-10 h-10 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-sm font-semibold text-white">
                  {book.titleBn} পিডিএফ লোড হচ্ছে...
                </p>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  এনসিটিবি ক্লাউড সার্ভার থেকে সরাসরি পৃষ্ঠাগুলো প্রস্তুত করা হচ্ছে।
                </p>
              </div>
            )}

            {/* Live PDF Frame */}
            <iframe
              src={embedUrl}
              title={book.titleBn}
              className="w-full flex-1 border-0 bg-white"
              allow="autoplay; fullscreen"
              onLoad={() => setIframeLoading(false)}
            />
          </div>
        ) : (
          /* =========================================================================
             2. Interactive Digital E-Book Reader with Paper Modes & Navigation
             ========================================================================= */
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
            
            {/* Digital Toolbar */}
            <div className="h-10 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowToc(!showToc)}
                  className={`px-2 py-1 rounded text-xs flex items-center gap-1 border transition ${
                    showToc ? 'bg-emerald-700 text-white border-emerald-600' : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>সূচিপত্র</span>
                </button>

                <div className="flex items-center gap-1 bg-slate-950 rounded p-0.5 border border-slate-800">
                  <button
                    onClick={() => setThemeMode('paper')}
                    className={`px-2 py-0.5 rounded text-[11px] ${themeMode === 'paper' ? 'bg-[#fcf9f2] text-slate-900 font-bold' : 'text-slate-400'}`}
                  >
                    কাগজ
                  </button>
                  <button
                    onClick={() => setThemeMode('white')}
                    className={`px-2 py-0.5 rounded text-[11px] ${themeMode === 'white' ? 'bg-white text-slate-900 font-bold' : 'text-slate-400'}`}
                  >
                    সাদা
                  </button>
                  <button
                    onClick={() => setThemeMode('sepia')}
                    className={`px-2 py-0.5 rounded text-[11px] ${themeMode === 'sepia' ? 'bg-[#f4ecd8] text-amber-950 font-bold' : 'text-slate-400'}`}
                  >
                    সেপিয়া
                  </button>
                  <button
                    onClick={() => setThemeMode('dark')}
                    className={`px-2 py-0.5 rounded text-[11px] ${themeMode === 'dark' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400'}`}
                  >
                    ডার্ক
                  </button>
                </div>
              </div>

              {/* Page jump */}
              <div className="flex items-center gap-1 text-xs">
                <span>পৃষ্ঠা:</span>
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val >= 1 && val <= totalPages) setCurrentPage(val);
                  }}
                  className="w-12 bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5 text-center text-emerald-400 font-bold"
                />
                <span className="text-slate-500">/ {totalPages}</span>
              </div>
            </div>

            {/* Reading Center Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex items-center justify-center relative">
              
              {/* Previous page arrow */}
              <button
                onClick={() => currentPage > 1 && setCurrentPage((p) => p - 1)}
                disabled={currentPage <= 1}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-emerald-700 text-white border border-slate-700 disabled:opacity-0 transition z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next page arrow */}
              <button
                onClick={() => currentPage < totalPages && setCurrentPage((p) => p + 1)}
                disabled={currentPage >= totalPages}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-emerald-700 text-white border border-slate-700 disabled:opacity-0 transition z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Table of contents drawer */}
              {showToc && (
                <div className="absolute left-4 top-4 bottom-4 w-64 bg-slate-900 border border-slate-800 rounded-lg p-3 overflow-y-auto z-20 shadow-xl space-y-1 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800 mb-2">
                    <span className="font-bold text-white">সূচিপত্র</span>
                    <button onClick={() => setShowToc(false)} className="text-slate-400 hover:text-white">✕</button>
                  </div>
                  {chapters.map((ch, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentPage(ch.page);
                        setShowToc(false);
                      }}
                      className="w-full text-left p-2 rounded hover:bg-slate-800 text-slate-300 flex justify-between"
                    >
                      <span className="truncate pr-1">{ch.title}</span>
                      <span className="text-[10px] text-slate-500 font-mono">পৃ. {ch.page}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Book Page Card */}
              <div className={`w-full max-w-2xl min-h-[520px] rounded border p-6 sm:p-10 flex flex-col justify-between shadow-xl ${getThemeClasses()}`}>
                
                <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10 text-xs opacity-75">
                  <span className="font-semibold">{book.classNameBn} — {book.titleBn}</span>
                  <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400">পৃষ্ঠা {currentPage}</span>
                </div>

                <div className="my-6 space-y-4 flex-1 text-sm sm:text-base leading-relaxed">
                  {currentPage === 1 ? (
                    <div className="text-center py-8 space-y-3">
                      <div className="w-14 h-14 mx-auto rounded bg-emerald-700 text-white flex items-center justify-center font-bold text-xl">
                        <BookOpen className="w-7 h-7" />
                      </div>
                      <h2 className="text-2xl font-bold">{book.titleBn}</h2>
                      <p className="text-xs opacity-75">{book.titleEn}</p>
                      <span className="inline-block px-2.5 py-0.5 bg-black/5 dark:bg-white/10 rounded text-xs font-semibold">
                        {book.classNameBn} · {book.mediumBn}
                      </span>
                      <p className="text-xs sm:text-sm opacity-80 pt-2 leading-relaxed">
                        জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুমোদিত ২০২৬ শিক্ষাবর্ষের পাঠ্যবই।
                      </p>
                      <div className="pt-4">
                        <button
                          onClick={() => setCurrentPage(2)}
                          className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded"
                        >
                          পরের পৃষ্ঠা পড়ুন →
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold">
                        {chapters.find((c) => c.page <= currentPage)?.title || 'পাঠ্য অধ্যায়'}
                      </h3>
                      <p className="leading-relaxed opacity-90 text-justify">
                        শিক্ষার্থীদের সার্বিক দক্ষতা ও মানবিক মূল্যবোধ জাগ্রত করার লক্ষ্যে জাতীয় শিক্ষাক্রম ২০২৬ অনুসারে এই অধ্যায়টি রচিত। প্রতিটি বিষয়ের মৌলিক ধারণা স্পষ্ট করার জন্য রয়েছে বাস্তব উদাহরণ, চিত্র এবং হাতে-কলমে অনুশীলনী।
                      </p>
                      <div className="p-3 rounded border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 space-y-1.5 text-xs sm:text-sm">
                        <span className="font-bold text-emerald-800 dark:text-emerald-400 block">অনুশীলন ও প্রশ্নাবলি</span>
                        <ul className="list-decimal list-inside space-y-1 opacity-85">
                          <li>পাঠ্যটির মূল ভাব নিজের ভাষায় ৩টি বাক্যে লেখো।</li>
                          <li>প্রতিদিনের জীবনের সাথে এই অধ্যায়ের জ্ঞানের দুটি বাস্তব উদাহরণ দাও।</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs opacity-60">
                  <span>janao.click · ডিজিটাল পাঠশালা</span>
                  <span>বিনামূল্যে বিতরণের জন্য</span>
                </div>

              </div>

            </div>

            {/* Bottom Scrubber */}
            <div className="h-10 bg-slate-900 border-t border-slate-800 px-4 flex items-center justify-between text-xs text-slate-400">
              <span>তীর চিহ্ন (← / →) দিয়ে পাতা উল্টান</span>
              <div className="flex-1 max-w-xs mx-4">
                <input
                  type="range"
                  min={1}
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => setCurrentPage(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
              <span className="font-mono">{Math.round((currentPage / totalPages) * 100)}%</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
