'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Book } from '@/data/nctbData';
import { 
  X, 
  Maximize2, 
  Minimize2, 
  Download, 
  ExternalLink,
  RefreshCw
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
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (book) {
      setIframeLoading(true);
    }
  }, [book, pdfSource]);

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

        {/* Right Tools: Server switch, New tab, Download, Fullscreen */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
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
        <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-1.5 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>অফিশিয়াল পিডিএফ ভিউয়ার সক্রিয়</span>
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
    </div>
  );
}
