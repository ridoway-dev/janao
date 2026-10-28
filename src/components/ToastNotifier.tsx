'use client';

import React, { useState, useEffect } from 'react';
import { Download, CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '@/utils/notifier';

export default function ToastNotifier() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<ToastMessage>;
      if (!customEvent.detail) return;

      const newToast: ToastMessage = {
        id: Math.random().toString(36).substring(2, 9),
        type: customEvent.detail.type || 'info',
        title: customEvent.detail.title,
        description: customEvent.detail.description,
        duration: customEvent.detail.duration || 4500,
      };

      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, newToast.duration);
    };

    window.addEventListener('show_toast_notification', handleToast);
    return () => {
      window.removeEventListener('show_toast_notification', handleToast);
    };
  }, []);

  const removeToast = (id?: string) => {
    if (!id) return;
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        const isDownload = toast.type === 'download';
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            role="alert"
            className="pointer-events-auto transform transition-all duration-300 ease-out animate-in fade-in slide-in-from-bottom-5 rounded-2xl bg-slate-900/95 dark:bg-slate-950/95 text-white border border-slate-700/80 dark:border-slate-800 shadow-2xl backdrop-blur-md p-4 flex items-start gap-3.5 relative overflow-hidden"
          >
            {/* Top decorative progress line */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 ${
                isDownload
                  ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400'
                  : isSuccess
                  ? 'bg-gradient-to-r from-emerald-500 to-green-400'
                  : isError
                  ? 'bg-gradient-to-r from-red-500 to-rose-400'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-400'
              }`}
            />

            {/* Icon */}
            <div
              className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                isDownload
                  ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30'
                  : isSuccess
                  ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30'
                  : isError
                  ? 'bg-red-500/20 text-red-400 ring-1 ring-red-500/30'
                  : 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30'
              }`}
            >
              {isDownload && <Download className="w-5 h-5 animate-bounce" />}
              {isSuccess && <CheckCircle className="w-5 h-5" />}
              {isError && <AlertCircle className="w-5 h-5" />}
              {!isDownload && !isSuccess && !isError && <Info className="w-5 h-5" />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-1">
              <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                {toast.title}
              </h4>
              {toast.description && (
                <p className="text-xs text-slate-300 mt-1 leading-relaxed line-clamp-2">
                  {toast.description}
                </p>
              )}
              {isDownload && (
                <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md w-fit border border-emerald-800/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>ব্রাউজারের ডাউনলোড বারে দেখুন</span>
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition shrink-0"
              aria-label="নোটিফিকেশন বন্ধ করুন"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
