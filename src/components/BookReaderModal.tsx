'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Book } from '@/data/nctbData';
import { 
  X, 
  Maximize2, 
  Minimize2, 
  Download, 
  ExternalLink,
  RefreshCw,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Loader2,
  FileText
} from 'lucide-react';
import { downloadPdfFile, getDirectDownloadUrl } from '@/utils/downloadPdf';
import { notifyDownload } from '@/utils/notifier';

interface BookReaderModalProps {
  book: Book | null;
  onClose: () => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (id: string) => void;
}

declare global {
  interface Window {
    pdfjsLib: any;
  }
}

export default function BookReaderModal({
  book,
  onClose,
  isBookmarked = false,
  onToggleBookmark,
}: BookReaderModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!book || isDownloading) return;
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

  const directDownloadHref = book
    ? getDirectDownloadUrl(book.downloadUrl, `${book.slug || `book-${book.id}`}.pdf`)
    : '#';
  // Device Detection: PC vs Mobile
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Common State
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Desktop (PC) State
  const [pdfSource, setPdfSource] = useState<'cloud' | 'google'>('cloud');
  const [iframeLoading, setIframeLoading] = useState(true);
  const [progress, setProgress] = useState(15);
  const [loadingStage, setLoadingStage] = useState('ক্লাউড সার্ভারের সাথে সংযোগ স্থাপন করা হচ্ছে...');

  // Mobile State
  const [mobileLoading, setMobileLoading] = useState(true);
  const [mobileLoadError, setMobileLoadError] = useState<string | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [zoomMultiplier, setZoomMultiplier] = useState<number>(1);
  const [rendering, setRendering] = useState<boolean>(false);
  const [pageInput, setPageInput] = useState<string>('1');
  const [touchStartX, setTouchStartX] = useState<number>(0);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [useFallbackIframe, setUseFallbackIframe] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<any>(null);

  // Detect PC vs Mobile
  useEffect(() => {
    const handleDeviceCheck = () => {
      const isMobileWidth = window.innerWidth < 768;
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isMobileWidth || (isTouch && window.innerWidth < 1024));
    };

    handleDeviceCheck();
    window.addEventListener('resize', handleDeviceCheck);
    return () => window.removeEventListener('resize', handleDeviceCheck);
  }, []);

  // Animated Progress Bar Stages (for both PC and Mobile)
  useEffect(() => {
    if (!book) return;
    setIframeLoading(true);
    setMobileLoading(true);
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
    }, 400);
  };

  // Determine Embed URL for PC
  const getEmbedUrl = () => {
    if (!book) return '';
    if (pdfSource === 'google') {
      return `https://docs.google.com/viewer?url=${encodeURIComponent(book.downloadUrl)}&embedded=true`;
    }
    // Embed directly from R2 or original host
    return book.downloadUrl;
  };

  const embedUrl = getEmbedUrl();

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Keyboard navigation
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

  // ==========================================
  // MOBILE PDF.js ENGINE (Only runs on Mobile)
  // ==========================================
  const loadPdfJs = useCallback((): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') return reject('Window undefined');
      if (window.pdfjsLib) return resolve(window.pdfjsLib);

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.async = true;
      script.onload = () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          resolve(window.pdfjsLib);
        } else {
          reject(new Error('PDF.js failed to initialize'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load PDF.js'));
      document.body.appendChild(script);
    });
  }, []);

  useEffect(() => {
    if (!isMobile || !book) return;

    let isCancelled = false;
    setMobileLoadError(null);
    setCurrentPage(1);
    setPageInput('1');
    setZoomMultiplier(1);

    loadPdfJs()
      .then((pdfjs) => {
        if (isCancelled) return;

        const targetUrl = book.downloadUrl;

        const loadingTask = pdfjs.getDocument({
          url: targetUrl,
          cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
          cMapPacked: true,
          enableXfa: true,
        });

        return loadingTask.promise;
      })
      .then((doc) => {
        if (isCancelled || !doc) return;
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setProgress(100);
        setTimeout(() => {
          setMobileLoading(false);
        }, 300);
      })
      .catch((err) => {
        if (isCancelled) return;
        console.error('Mobile PDF.js load error:', err);
        setMobileLoadError('পিডিএফ লোড হতে সমস্যা হয়েছে। আপনি বিকল্প ভিউয়ারে দেখতে পারেন।');
        setMobileLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [isMobile, book, loadPdfJs]);

  // Mobile Render Page
  const renderCurrentPage = useCallback(async () => {
    if (!isMobile || !pdfDoc || !canvasRef.current || rendering) return;

    try {
      setRendering(true);

      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }

      const page = await pdfDoc.getPage(currentPage);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) {
        setRendering(false);
        return;
      }

      const screenWidth = window.innerWidth;
      const availableWidth = screenWidth - 16;

      const unscaledViewport = page.getViewport({ scale: 1 });
      const baseScale = availableWidth / unscaledViewport.width;
      const finalScale = baseScale * zoomMultiplier;
      const viewport = page.getViewport({ scale: finalScale });

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(viewport.width * dpr);
      canvas.height = Math.floor(viewport.height * dpr);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const renderContext = {
        canvasContext: ctx,
        viewport,
        enableWebGL: true,
      };

      const renderTask = page.render(renderContext);
      renderTaskRef.current = renderTask;

      await renderTask.promise;
      setRendering(false);
    } catch (err: any) {
      if (err.name !== 'RenderingCancelledException') {
        console.error('Page render error:', err);
      }
      setRendering(false);
    }
  }, [isMobile, pdfDoc, currentPage, zoomMultiplier, rendering]);

  useEffect(() => {
    if (isMobile && pdfDoc && !useFallbackIframe) {
      renderCurrentPage();
    }
  }, [isMobile, pdfDoc, currentPage, zoomMultiplier, useFallbackIframe]);

  // Mobile Page navigation
  const goToPrevPage = () => {
    if (currentPage > 1) {
      const nextP = currentPage - 1;
      setCurrentPage(nextP);
      setPageInput(nextP.toString());
      const container = containerRef.current?.querySelector('.pdf-mobile-scroll');
      container?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNextPage = () => {
    if (currentPage < numPages) {
      const nextP = currentPage + 1;
      setCurrentPage(nextP);
      setPageInput(nextP.toString());
      const container = containerRef.current?.querySelector('.pdf-mobile-scroll');
      container?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const p = parseInt(e.target.value, 10);
    setCurrentPage(p);
    setPageInput(p.toString());
    const container = containerRef.current?.querySelector('.pdf-mobile-scroll');
    container?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoomMultiplier > 1) return;
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (zoomMultiplier > 1) return;
    const diffX = touchStartX - e.changedTouches[0].clientX;
    const diffY = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(diffX) > 60 && Math.abs(diffY) < 50) {
      if (diffX > 0) goToNextPage();
      else goToPrevPage();
    }
  };

  if (!book) return null;

  // ==========================================
  // 1. MOBILE VIEW (Smart Canvas Reader + Touch)
  // ==========================================
  if (isMobile) {
    return (
      <div 
        ref={containerRef}
        className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-slate-100 select-none animate-fadeIn"
      >
        {/* Mobile Header */}
        <header className="h-14 bg-slate-900 border-b border-slate-800 px-2 flex items-center justify-between shrink-0 gap-2 z-20 shadow-md">
          <div className="flex items-center gap-1.5 overflow-hidden min-w-0">
            <button
              onClick={onClose}
              className="p-2 -ml-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition shrink-0 active:scale-95"
              title="পড়া বন্ধ করুন (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col truncate min-w-0">
              <div className="flex items-center gap-1 truncate">
                <span className="font-bold text-xs text-white truncate max-w-[140px] xs:max-w-[190px]">
                  {book.titleBn}
                </span>
                <span className="text-[10px] px-1 py-0.5 rounded bg-emerald-900/80 text-emerald-300 font-semibold border border-emerald-700/60 shrink-0">
                  {book.classNameBn}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setUseFallbackIframe(!useFallbackIframe)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
              title="ভিউয়ার মোড পরিবর্তন"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
            <a
              href={directDownloadHref}
              download={book ? `${book.slug || `book-${book.id}`}.pdf` : undefined}
              onClick={() => book && notifyDownload(book.titleBn)}
              className="p-1.5 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 transition active:scale-95"
              title="সরাসরি ব্রাউজারে পিডিএফ ডাউনলোড করুন"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ডাউনলোড</span>
            </a>
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Mobile Viewport Area */}
        <div 
          className="flex-1 relative w-full overflow-hidden flex flex-col bg-slate-950"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Progress Bar Overlay for Mobile */}
          {mobileLoading && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/95 text-center p-4 backdrop-blur-xs">
              <div className="max-w-xs w-full bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col items-center animate-fadeIn">
                <div className="relative w-12 h-12 mb-3 flex items-center justify-center">
                  <div className="absolute inset-0 border-3 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{book.titleBn}</h3>
                <p className="text-[11px] text-emerald-400 font-medium mb-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>{loadingStage}</span>
                </p>

                {/* Animated Progress Bar */}
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mb-2 relative">
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <div className="w-full flex items-center justify-between text-[10px] text-slate-400 mt-1">
                  <span>লোড হচ্ছে: <strong className="text-white font-mono">{progress}%</strong></span>
                  <span>আকার: <strong className="text-slate-200">{book.fileSizeBytes}</strong></span>
                </div>
              </div>
            </div>
          )}

          {useFallbackIframe ? (
            <iframe
              src={embedUrl}
              title={book.titleBn}
              className="w-full h-full border-0 bg-white"
              allow="autoplay; fullscreen"
            />
          ) : (
            <div className="pdf-mobile-scroll flex-1 overflow-y-auto overflow-x-auto flex flex-col items-center p-2 relative">
              {mobileLoadError && !mobileLoading && (
                <div className="my-auto max-w-xs p-5 bg-slate-900 border border-red-500/30 rounded-xl text-center space-y-3">
                  <FileText className="w-8 h-8 mx-auto text-red-400" />
                  <p className="text-xs text-white">{mobileLoadError}</p>
                  <button
                    onClick={() => setUseFallbackIframe(true)}
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-semibold"
                  >
                    বিকল্প ভিউয়ারে দেখুন
                  </button>
                </div>
              )}

              {!mobileLoadError && (
                <div className="relative shadow-2xl rounded-sm overflow-hidden my-auto border border-slate-800 bg-white">
                  <canvas ref={canvasRef} className="block max-w-full" />
                  {rendering && (
                    <div className="absolute top-2 right-2 bg-slate-900/80 text-emerald-400 p-1 rounded-full shadow animate-pulse">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Bottom Thumb Bar */}
        {!useFallbackIframe && numPages > 0 && (
          <footer className="h-14 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-3 flex items-center justify-between shrink-0 z-20 gap-2 shadow-lg">
            <button
              onClick={goToPrevPage}
              disabled={currentPage <= 1 || mobileLoading}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-semibold disabled:opacity-40 transition shrink-0 flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>পূর্বের</span>
            </button>

            <div className="flex-1 max-w-xs flex items-center gap-2 mx-auto">
              <input
                type="range"
                min={1}
                max={numPages}
                value={currentPage}
                onChange={handleSliderChange}
                className="w-full accent-emerald-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
              />
              <span className="text-[11px] font-mono font-bold text-emerald-400 shrink-0">
                {currentPage}/{numPages}
              </span>
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage >= numPages || mobileLoading}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold disabled:opacity-40 transition shrink-0 flex items-center gap-1 shadow-sm"
            >
              <span>পরের</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </footer>
        )}
      </div>
    );
  }

  // ==========================================
  // 2. PC / DESKTOP VIEW (Exact Previous Viewer with Progress Bar)
  // ==========================================
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
            href={directDownloadHref}
            download={book ? `${book.slug || `book-${book.id}`}.pdf` : undefined}
            onClick={() => book && notifyDownload(book.titleBn)}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1 transition active:scale-95"
            title="বইটি সরাসরি ব্রাউজারে ডাউনলোড করুন"
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

        {/* Iframe Loading Overlay with Real Animated Progress Bar */}
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

        {/* Live PDF Frame for Desktop */}
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
