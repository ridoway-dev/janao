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
  Sun, 
  Moon, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  List,
  Volume2,
  ExternalLink,
  Check
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(book?.pageCount || 96);
  const [themeMode, setThemeMode] = useState<'paper' | 'white' | 'sepia' | 'dark'>('paper');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const [readingMode, setReadingMode] = useState<'interactive' | 'embed'>('interactive');
  const [copiedLink, setCopiedLink] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (book) {
      setCurrentPage(1);
      setTotalPages(book.pageCount || 96);
    }
  }, [book]);

  // Keyboard navigation: Left/Right arrows, Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!book) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrevPage();
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages, book, isFullscreen]);

  if (!book) return null;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((p) => p + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Sample chapters according to subject
  const getChapters = (book: Book) => {
    if (book.titleBn.includes('বাংলা')) {
      return [
        { page: 1, title: '১ম পাঠ: আমাদের প্রিয় মাতৃভাষা ও বর্ণমালা' },
        { page: 8, title: '২য় পাঠ: প্রভাতী (কবিতা - কাজী নজরুল ইসলাম)' },
        { page: 16, title: '৩য় পাঠ: রূপসী বাংলা ও আমাদের প্রকৃতি' },
        { page: 28, title: '৪র্থ পাঠ: সুন্দরবনের প্রাণী ও পরিবেশ' },
        { page: 42, title: '৫ম পাঠ: আদর্শ ছেলে (কবিতা - কুসুমকুমারী দাশ)' },
        { page: 56, title: '৬ষ্ঠ পাঠ: বীরশ্রেষ্ঠদের আত্মত্যাগ' },
        { page: 70, title: '৭ম পাঠ: অনুশীলন ও ব্যাকরণ জ্ঞান' },
      ];
    } else if (book.titleBn.includes('গণিত')) {
      return [
        { page: 1, title: 'অধ্যায় ১: সংখ্যা গণনা ও স্থানীয় মান' },
        { page: 12, title: 'অধ্যায় ২: যোগ ও বিয়োগের বাস্তব প্রয়োগ' },
        { page: 24, title: 'অধ্যায় ৩: গুণ ও ভাগের সহজ নিয়ম' },
        { page: 38, title: 'অধ্যায় ৪: ভগ্নাংশ ও দশমিক ধারণা' },
        { page: 52, title: 'অধ্যায় ৫: জ্যামিতিক আকৃতি ও কোণ' },
        { page: 68, title: 'অধ্যায় ৬: পরিমাপ, ওজন ও সময়' },
        { page: 82, title: 'অধ্যায় ৭: তথ্য ও উপাত্ত বিন্যাস' },
      ];
    } else if (book.titleBn.includes('বিজ্ঞান')) {
      return [
        { page: 1, title: 'অধ্যায় ১: জীব ও জড় জগৎ' },
        { page: 14, title: 'অধ্যায় ২: উদ্ভিদ ও প্রাণীর বৈশিষ্ট্য' },
        { page: 28, title: 'অধ্যায় ৩: আমাদের পরিবেশ ও খাদ্যশৃঙ্খল' },
        { page: 44, title: 'অধ্যায় ৪: পানিচক্র ও পরিবেশ দূষণ' },
        { page: 60, title: 'অধ্যায় ৫: পদার্থ ও শক্তির রূপান্তর' },
        { page: 76, title: 'অধ্যায় ৬: স্বাস্থ্যবিধি ও প্রাথমিক চিকিৎসা' },
      ];
    } else {
      return [
        { page: 1, title: 'অধ্যায় ১: প্রারম্ভিক পরিচিতি ও সূচিপত্র' },
        { page: 15, title: 'অধ্যায় ২: মূল পাঠ ও ধারণাসমূহ' },
        { page: 35, title: 'অধ্যায় ৩: অনুশীলনী ও ব্যবহারিক কাজ' },
        { page: 55, title: 'অধ্যায় ৪: মূল্যায়ন ও সমাধান' },
      ];
    }
  };

  const chapters = getChapters(book);

  // Background and text color per theme
  const getThemeClasses = () => {
    switch (themeMode) {
      case 'paper':
        return 'bg-[#fcf9f2] text-[#292524] border-[#e7e0d3] shadow-[inset_0_0_80px_rgba(0,0,0,0.03)]';
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
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/85 backdrop-blur-md text-slate-100 select-none animate-fadeIn"
    >
      {/* Top Reader Controls Bar */}
      <div className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between shrink-0">
        
        {/* Book Title & Badge */}
        <div className="flex items-center gap-3 overflow-hidden">
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
            title="পড়া বন্ধ করুন (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex flex-col truncate">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white truncate">
                {book.titleBn}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-900/80 text-emerald-300 font-semibold border border-emerald-700/60 shrink-0">
                {book.classNameBn}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) ২০২৬
            </span>
          </div>
        </div>

        {/* Middle: Page navigation controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition flex items-center gap-1 text-xs"
            title="পূর্ববর্তী পৃষ্ঠা (←)"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden md:inline">আগের পৃষ্ঠা</span>
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-950 rounded border border-slate-800 text-xs font-mono">
            <input
              type="number"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val >= 1 && val <= totalPages) setCurrentPage(val);
              }}
              className="w-10 bg-transparent text-center font-bold text-emerald-400 focus:outline-none"
            />
            <span className="text-slate-500">/ {totalPages}</span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition flex items-center gap-1 text-xs"
            title="পরবর্তী পৃষ্ঠা (→)"
          >
            <span className="hidden md:inline">পরের পৃষ্ঠা</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Tools: Theme, Toc, Zoom, Fullscreen, Download */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Table of contents toggle */}
          <button
            onClick={() => setShowToc(!showToc)}
            className={`p-1.5 rounded text-xs flex items-center gap-1 border transition ${
              showToc ? 'bg-emerald-700 text-white border-emerald-600' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
            title="সূচিপত্র (Table of Contents)"
          >
            <List className="w-4 h-4" />
            <span className="hidden lg:inline">সূচিপত্র</span>
          </button>

          {/* Theme switcher */}
          <div className="hidden sm:flex items-center gap-1 p-0.5 bg-slate-950 rounded border border-slate-800 text-xs">
            <button
              onClick={() => setThemeMode('paper')}
              className={`px-2 py-1 rounded text-[11px] font-medium transition ${themeMode === 'paper' ? 'bg-[#fcf9f2] text-slate-900' : 'text-slate-400 hover:text-white'}`}
              title="কাগজের রঙ (Paper)"
            >
              কাগজ
            </button>
            <button
              onClick={() => setThemeMode('white')}
              className={`px-2 py-1 rounded text-[11px] font-medium transition ${themeMode === 'white' ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'}`}
              title="সাদা মোড (White)"
            >
              সাদা
            </button>
            <button
              onClick={() => setThemeMode('sepia')}
              className={`px-2 py-1 rounded text-[11px] font-medium transition ${themeMode === 'sepia' ? 'bg-[#f4ecd8] text-amber-950' : 'text-slate-400 hover:text-white'}`}
              title="আই-কেয়ার সেপিয়া (Sepia)"
            >
              সেপিয়া
            </button>
            <button
              onClick={() => setThemeMode('dark')}
              className={`px-2 py-1 rounded text-[11px] font-medium transition ${themeMode === 'dark' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
              title="ডার্ক মোড (Dark)"
            >
              ডার্ক
            </button>
          </div>

          {/* Zoom controls */}
          <div className="hidden md:flex items-center gap-1 text-slate-400">
            <button
              onClick={() => setZoomLevel((z) => Math.max(75, z - 15))}
              className="p-1 hover:text-white"
              title="জুম কমান"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
              className="p-1 hover:text-white"
              title="জুম বাড়ান"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Bookmark */}
          <button
            onClick={() => onToggleBookmark(book.id)}
            className={`p-1.5 rounded transition ${
              isBookmarked ? 'text-amber-400 bg-amber-950/60' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title={isBookmarked ? 'বুকমার্ক সরানো' : 'বুকমার্ক করুন'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Direct Download PDF Button */}
          <a
            href={book.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 sm:px-2.5 sm:py-1 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1 transition"
            title="সম্পূর্ণ বইটি অফলাইনে ডাউনলোড করুন"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ডাউনলোড</span>
          </a>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
            title="ফুলস্ক্রিন মোড"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Main Reader Canvas */}
      <div className="flex-1 relative flex overflow-hidden">
        
        {/* Table of Contents Sidebar */}
        {showToc && (
          <div className="w-64 sm:w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 z-20 animate-slideRight">
            <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-emerald-400">
                সূচিপত্র ও অধ্যায়সমূহ
              </span>
              <button onClick={() => setShowToc(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2 flex-1 overflow-y-auto space-y-1 text-xs">
              {chapters.map((ch, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentPage(ch.page);
                    setShowToc(false);
                  }}
                  className={`w-full text-left p-2.5 rounded transition flex items-center justify-between ${
                    currentPage >= ch.page && (idx === chapters.length - 1 || currentPage < chapters[idx + 1].page)
                      ? 'bg-emerald-900/60 text-emerald-200 font-bold border-l-2 border-emerald-500'
                      : 'hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <span className="truncate pr-2">{ch.title}</span>
                  <span className="text-[10px] text-slate-500 font-mono">পৃ. {ch.page}</span>
                </button>
              ))}
            </div>

            <div className="p-3 border-t border-slate-800 text-[11px] text-slate-500 text-center">
              অধ্যায়ে সরাসরি যেতে ক্লিক করুন
            </div>
          </div>
        )}

        {/* Center Book Viewing Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex items-center justify-center relative">
          
          {/* Previous / Next Arrow float triggers on desktop */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-emerald-700 text-white backdrop-blur border border-slate-700 transition shadow-xl disabled:opacity-0 disabled:pointer-events-none z-10"
            title="পূর্ববর্তী পৃষ্ঠা"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-emerald-700 text-white backdrop-blur border border-slate-700 transition shadow-xl disabled:opacity-0 disabled:pointer-events-none z-10"
            title="পরবর্তী পৃষ্ঠা"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Realistic Book Page Card */}
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className={`w-full max-w-2xl min-h-[580px] sm:min-h-[720px] rounded-lg border p-6 sm:p-12 transition-all duration-200 relative flex flex-col justify-between shadow-2xl ${getThemeClasses()}`}
          >
            {/* Book spine line shadow effect on left margin */}
            <div className="absolute top-0 bottom-0 left-0 w-8 pointer-events-none bg-gradient-to-r from-black/5 to-transparent"></div>

            {/* Page Header */}
            <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 text-xs text-opacity-70">
              <span className="font-semibold tracking-wide">
                {book.classNameBn} — {book.titleBn}
              </span>
              <span className="font-mono text-emerald-800 dark:text-emerald-400 font-bold">
                পৃষ্ঠা {currentPage}
              </span>
            </div>

            {/* Dynamic Page Lesson Content */}
            <div className="my-6 space-y-4 flex-1 text-sm sm:text-base leading-relaxed">
              
              {currentPage === 1 ? (
                // Cover / Introduction Page
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-2xl shadow-md">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {book.titleBn}
                  </h2>
                  <p className="text-sm italic opacity-75 font-serif">
                    {book.titleEn}
                  </p>
                  <div className="inline-block px-3 py-1 bg-black/5 dark:bg-white/10 rounded text-xs font-semibold">
                    {book.classNameBn} · {book.mediumBn}
                  </div>
                  <p className="max-w-md mx-auto text-xs sm:text-sm opacity-80 pt-4 leading-relaxed">
                    জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) কর্তৃক ২০২৬ শিক্ষাবর্ষের জন্য অনুমোদিত ও প্রকাশিত মূল পাঠ্যবই।
                  </p>
                  <div className="pt-6">
                    <button
                      onClick={handleNextPage}
                      className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded shadow transition"
                    >
                      পড়া শুরু করুন (পরের পৃষ্ঠা) →
                    </button>
                  </div>
                </div>
              ) : currentPage === 2 ? (
                // Table of Contents Page
                <div className="space-y-4">
                  <h3 className="text-lg font-bold border-b pb-2 border-black/10 dark:border-white/10">
                    সূচিপত্র (Table of Contents)
                  </h3>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    {chapters.map((ch, i) => (
                      <div 
                        key={i} 
                        onClick={() => setCurrentPage(ch.page)}
                        className="flex items-center justify-between p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer border-b border-dashed border-black/10 dark:border-white/10"
                      >
                        <span className="font-medium">{ch.title}</span>
                        <span className="font-mono opacity-70">পৃষ্ঠা {ch.page}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // Actual reading lesson content
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg sm:text-xl font-bold">
                      {chapters.find((c) => c.page <= currentPage)?.title || 'পাঠ্য অধ্যায়'}
                    </h3>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-semibold">
                      অধ্যায় ভিত্তিক পাঠ
                    </span>
                  </div>

                  <p className="leading-relaxed text-justify opacity-90">
                    শিক্ষার্থীদের সার্বিক দক্ষতা ও মানবিক মূল্যবোধ জাগ্রত করার লক্ষ্যে জাতীয় শিক্ষাক্রম ২০২৬ অনুসারে এই অধ্যায়টি রচিত। প্রতিটি বিষয়ের মৌলিক ধারণা স্পষ্ট করার জন্য রয়েছে বাস্তব উদাহরণ, চিত্র এবং হাতে-কলমে অনুশীলনী।
                  </p>

                  {/* Illustrated exercise box */}
                  <div className="p-4 rounded border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 space-y-2">
                    <span className="font-bold text-xs text-emerald-800 dark:text-emerald-400 block uppercase tracking-wide">
                      অনুশীলন ও প্রশ্নাবলি (Exercise)
                    </span>
                    <ul className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm opacity-85">
                      <li>পাঠ্যটির মূল ভাব নিজের ভাষায় ৩টি বাক্যে লেখো।</li>
                      <li>প্রতিদিনের জীবনের সাথে এই অধ্যায়ের জ্ঞানের দুটি বাস্তব উদাহরণ দাও।</li>
                      <li>নিচের সঠিক শব্দটি বেছে নিয়ে শূন্যস্থান পূরণ করো এবং শ্রেণিকক্ষে আলোচনা করো।</li>
                    </ul>
                  </div>

                  <p className="leading-relaxed opacity-90">
                    নিয়মিত পাঠ অনুশীলন এবং শিক্ষকের নির্দেশনামাফিক বাড়ির কাজ সম্পন্ন করার মাধ্যমে শিক্ষার্থীরা প্রতিটি দক্ষতা সফলভাবে অর্জন করতে সক্ষম হবে।
                  </p>
                </div>
              )}

            </div>

            {/* Page Footer */}
            <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs opacity-60">
              <span>janao.click · ডিজিটাল পাঠশালা</span>
              <span>বাংলাদেশ সরকার কর্তৃক বিনামূল্যে বিতরণের জন্য</span>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Floating Quick Page Navigator Bar */}
      <div className="h-10 bg-slate-900 border-t border-slate-800 px-4 flex items-center justify-between text-xs text-slate-400 shrink-0">
        <span className="hidden sm:inline">
          কীবোর্ড শর্টকাট: ডানে যেতে <strong>→</strong> অথবা বামে যেতে <strong>←</strong> চাপুন
        </span>

        {/* Page progress track */}
        <div className="flex-1 max-w-xs mx-auto flex items-center gap-2">
          <input
            type="range"
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={(e) => setCurrentPage(parseInt(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        <span className="font-mono">
          {Math.round((currentPage / totalPages) * 100)}% সম্পন্ন
        </span>
      </div>

    </div>
  );
}
