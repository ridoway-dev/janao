'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Download, ShieldCheck, X } from 'lucide-react';
import AdSlot from '@/components/ads/AdSlot';
import { downloadPdfFile } from '@/utils/downloadPdf';
import {
  DOWNLOAD_REQUEST_EVENT,
  type DownloadRequest,
} from './downloadConfirm';

/**
 * Global, user-initiated download confirmation.
 *
 * The ad is clearly separated and labelled. There is no countdown, no fake
 * download button and no forced redirect: the visitor can start the real
 * download immediately.
 */
export default function DownloadConfirmHost() {
  const [request, setRequest] = useState<DownloadRequest | null>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onRequest = (event: Event) => {
      const detail = (event as CustomEvent<DownloadRequest>).detail;
      if (!detail || !detail.url) return;
      setRequest(detail);
    };

    window.addEventListener(DOWNLOAD_REQUEST_EVENT, onRequest);
    return () => window.removeEventListener(DOWNLOAD_REQUEST_EVENT, onRequest);
  }, []);

  useEffect(() => {
    if (!request) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setRequest(null);
    };

    window.addEventListener('keydown', onKeyDown);
    const focusTimer = window.setTimeout(() => confirmRef.current?.focus(), 60);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [request]);

  const close = useCallback(() => setRequest(null), []);

  const confirm = useCallback(() => {
    if (!request) return;
    downloadPdfFile(request.url, request.filename, request.bookTitle);
    setRequest(null);
  }, [request]);

  if (!request) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-confirm-title"
      onClick={close}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-800 dark:bg-gray-900 sm:p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2
              id="download-confirm-title"
              className="text-base font-bold text-gray-900 dark:text-white"
            >
              ডাউনলোড নিশ্চিত করুন
            </h2>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              আপনার ফাইলটি প্রস্তুত। নিচের বাটনে ক্লিক করলে ডাউনলোড শুরু হবে।
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="মডাল বন্ধ করুন"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-800/40">
          <p className="break-words text-sm font-semibold text-gray-900 dark:text-white">
            {request.bookTitle}
          </p>
          <p className="mt-0.5 break-all text-xs text-gray-500 dark:text-gray-400">
            {request.filename}
            {request.fileSize ? ` · ${request.fileSize}` : ''}
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="order-2 shrink-0 sm:order-1">
            <AdSlot format="banner" showDismiss={false} compact />
          </div>

          <div className="order-1 flex w-full flex-col gap-2 sm:order-2">
            <div className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50/60 p-3 text-xs text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
              <span>ফাইলটি সরাসরি ব্রাউজারে ডাউনলোড হবে।</span>
            </div>

            <button
              ref={confirmRef}
              type="button"
              onClick={confirm}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 active:scale-[0.99]"
            >
              <Download className="h-4 w-4" />
              <span>ডাউনলোড শুরু করুন</span>
            </button>

            <button
              type="button"
              onClick={close}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              বাতিল করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
