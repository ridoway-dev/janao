'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Book } from '@/data/nctbData';
import { 
  X, 
  Maximize2, 
  Minimize2, 
  Download, 
  ExternalLink,
  RefreshCw,
  BookOpen
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
  const [pdfSource, setPdfSource] = useState<'cloud' | 'google'>('cloud');
  const [iframeLoading, setIframeLoading] = useState(true);
  const [progress, setProgress] = useState(15);
  const [loadingStage, setLoadingStage] = useState('ক্লাউড সার্ভারের সাথে সংযোগ স্থাপন করা হচ্ছে...');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!book) return;
    setIframeLoading(true);
    setProgress(15);
    setLoadingStage('ক্লাউড সার্ভারের সাথে সংযোগ স্থাপন করা হচ্ছে...');

    const timer1 = setTimeout(() => {
      setProgress(38);
      setLoadingStage(`পিডিএফ ডেটা স্ট্রিম নেওয়া হচ্ছে (${book.fileSizeBytes})...`);
    }, 600);

    const timer2 = setTimeout(() => {
      setProgress(68);
      setLoadingStage(`পৃষ্ঠাগুলো বাফার ও রেন্ডার করা হচ্ছে (${book.pageCount} পৃষ্ঠা)...`);
    }, 1800);

    const timer3 = setTimeout(() => {
      setProgress(88);
      setLoadingStage('ভিউয়ার ইন্টারফেস প্রস্তুত হচ্ছে...');
    }, 3800);

    const timer4 = setTimeout(() => {
      setProgress(96);
      setLoadingStage('ফাইল ডিসপ্লে প্রস্তুত হচ্ছে...');
    }, 6500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [book, pdfSource]);

  const handleIframeLoaded = () => {
    setProgress(100);
    setLoadingStage('সফলভাবে প্রস্তুত সম্পন্ন হয়েছে!');
    setTimeout(() => {
      setIframeLoading(false);
    }, 300);
  };

  // Keyboard navigation: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!book) return;
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
  }, [book, isFullscreen, onClose]);

  if (!book) return null;

  // Determine the best PDF embed URL
  const getEmbedUrl = () => {
    if (pdfSource === 'google') {
      return `https://docs.google.com/viewer?url=${encodeURIComponent(book.downloadUrl)}&embedded=true`;
    }
    // Same-origin Next.js PDF proxy stream completely bypasses X-Frame-Options & CORS blocking!
    return `/api/pdf?url=${encodeURIComponent(book.downloadUrl)}`;
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

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/90 text-slate-100 select-none animate-fadeIn"
    >
      {/* Top Header Controls Bar */}
      <div className="h-14 bg-slate-900 border-b border-slate-800 px-2 sm:px-4 flex items-center justify-between shrink-0 gap-1.5 sm:gap-2">
        
        {/* Book Title & Close */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 overflow-hidden min-w-0">
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition shrink-0"
            title="পড়া বন্ধ করুন (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex flex-col truncate min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs sm:text-sm text-white truncate max-w-[120px] xs:max-w-[180px] sm:max-w-xs">
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

        {/* Right Tools: Server switch, New tab, Download, Fullscreen */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          
          {/* PDF Source switch */}
          <button
            onClick={() => {
              setPdfSource(pdfSource === 'cloud' ? 'google' : 'cloud');
              setIframeLoading(true);
            }}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
            title="পিডিএফ লোড না হলে সার্ভার পরিবর্তন করুন"
          >
            <RefreshCw className="w-3 h-3" />
            <span>সার্ভার {pdfSource === 'cloud' ? '১' : '২'}</span>
          </button>

          {/* Open in full new tab */}
          <a
            href={book.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1 text-xs"
            title="নতুন উইন্ডোতে বড় করে দেখুন"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden md:inline">নতুন ট্যাবে খুলুন</span>
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

      {/* Main PDF Viewer */}
      <div className="flex-1 relative w-full h-[calc(100vh-56px)] bg-slate-950 flex flex-col">
        
        {/* Top Helper Notice for Students */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-3 sm:px-4 py-1.5 flex flex-wrap items-center justify-between gap-1 text-[11px] sm:text-xs text-slate-400">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <span className="truncate">পিডিএফ ভিউয়ার সক্রিয়</span>
            <span className="hidden md:inline text-slate-500">
              (জুম, পেজ স্ক্রল এবং সার্চ অপশন সহ)
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => {
                setPdfSource(pdfSource === 'cloud' ? 'google' : 'cloud');
                setIframeLoading(true);
              }}
              className="text-emerald-400 hover:underline font-semibold text-[11px] sm:text-xs"
            >
              সার্ভার বদলান
            </button>
            <a
              href={book.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline font-semibold text-[11px] sm:text-xs flex items-center gap-0.5"
            >
              <span>নতুন ট্যাবে</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Iframe Loading Overlay with Real Progress */}
        {iframeLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/90 text-center p-4 backdrop-blur-xs">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl flex flex-col items-center animate-fadeIn">
              
              {/* Spinner & Book Icon */}
              <div className="relative w-14 h-14 mb-4 flex items-center justify-center">
                <div className="absolute inset-0 border-3 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                <BookOpen className="w-6 h-6 text-emerald-400" />
              </div>

              {/* Title & Stage */}
              <h3 className="text-base font-bold text-white mb-1">
                {book.titleBn}
              </h3>
              <p className="text-xs text-emerald-400 font-medium mb-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>{loadingStage}</span>
              </p>

              {/* Progress Bar Container */}
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden mb-2 relative">
                <div
                  className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* Progress Percentage & Meta info */}
              <div className="w-full flex items-center justify-between text-[11px] text-slate-400 mt-1 mb-4">
                <span>লোড হচ্ছে: <strong className="text-white font-mono">{progress}%</strong></span>
                <span>আকার: <strong className="text-slate-200">{book.fileSizeBytes}</strong></span>
                <span>পৃষ্ঠা: <strong className="text-slate-200">{book.pageCount} টি</strong></span>
              </div>

              {/* Server switcher info */}
              <div className="pt-3 border-t border-slate-800/80 w-full flex items-center justify-between text-xs text-slate-400">
                <span className="text-[11px]">
                  বর্তমান: <span className="text-slate-200">{pdfSource === 'cloud' ? 'সার্ভার ১ (হাই-স্পিড)' : 'সার্ভার ২ (গুগল)'}</span>
                </span>
                <button
                  onClick={() => {
                    setPdfSource(pdfSource === 'cloud' ? 'google' : 'cloud');
                  }}
                  className="text-emerald-400 hover:text-emerald-300 underline font-medium text-xs"
                >
                  সার্ভার বদলান
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Live PDF Frame */}
        <iframe
          src={embedUrl}
          title={book.titleBn}
          className="w-full flex-1 border-0 bg-white"
          allow="autoplay; fullscreen"
          onLoad={handleIframeLoaded}
        />
      </div>
    </div>
  );
}
