'use client';

import React, { useState, useEffect } from 'react';
import { Send, X } from 'lucide-react';

export default function TelegramWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed previously in session
    try {
      const dismissed = sessionStorage.getItem('janao_tg_dismissed');
      if (dismissed === 'true') {
        setIsDismissed(true);
      }
    } catch (e) {
      // ignore storage errors
    }

    // Small delay for smooth entry animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDismissed(true);
    try {
      sessionStorage.setItem('janao_tg_dismissed', 'true');
    } catch (e) {}
  };

  if (isDismissed || !isVisible) return null;

  return (
    <aside
      aria-label="Telegram Community Alert"
      className="fixed bottom-20 lg:bottom-6 right-3 sm:right-6 z-40 group animate-fade-in"
    >
      <div className="relative flex items-center">
        {/* Close small cross button */}
        <button
          onClick={handleDismiss}
          className="absolute -top-2 -right-1 z-50 bg-gray-700/80 hover:bg-gray-900 text-white p-0.5 rounded-full shadow-sm transition opacity-80 hover:opacity-100"
          title="বন্ধ করুন"
          aria-label="টেলিগ্রাম উইজেট বন্ধ করুন"
        >
          <X className="w-3 h-3" />
        </button>

        <a
          href="https://t.me/janao_online"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 bg-gradient-to-r from-[#229ED9] to-[#0088cc] hover:from-[#1b8ec5] hover:to-[#0077b5] text-white px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95 border border-white/20"
        >
          {/* Telegram Icon with pulsing ring */}
          <div className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-40 animate-ping"></span>
            <div className="w-7 h-7 rounded-full bg-white text-[#0088cc] flex items-center justify-center shrink-0 shadow-xs">
              <Send className="w-3.5 h-3.5 -translate-x-[1px] translate-y-[0.5px]" />
            </div>
          </div>

          <div className="flex flex-col text-left pr-1">
            <span className="text-[11px] sm:text-xs font-bold leading-tight flex items-center gap-1.5">
              <span>টেলিগ্রাম কমিউনিটি</span>
              <span className="bg-white/20 text-[9px] px-1 py-0.2 rounded text-white font-medium">Join</span>
            </span>
            <span className="text-[9px] sm:text-[10px] text-cyan-100 font-medium leading-tight hidden sm:block">
              সবার আগে রেজাল্ট ও নোটিশ পেতে যুক্ত হোন
            </span>
          </div>
        </a>
      </div>
    </aside>
  );
}
