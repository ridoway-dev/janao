'use client';

import React from 'react';
import { Bell, ChevronRight, Sparkles } from 'lucide-react';
import { NOTICES_DATA } from '@/data/nctbData';

interface NoticeTickerProps {
  onSelectNotice: (id: string) => void;
}

export default function NoticeTicker({ onSelectNotice }: NoticeTickerProps) {
  const latestNotice = NOTICES_DATA[0];

  return (
    <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white text-xs sm:text-sm py-2 px-4 shadow-sm relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden flex-1">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 font-semibold text-[11px] uppercase tracking-wider backdrop-blur-sm shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping mr-0.5"></span>
            জরুরি নোটিশ
          </span>
          <div className="truncate font-medium flex items-center gap-2">
            <span className="truncate cursor-pointer hover:underline" onClick={() => onSelectNotice(latestNotice.id)}>
              {latestNotice.title}
            </span>
            <span className="hidden md:inline text-white/70 text-xs">({latestNotice.date})</span>
          </div>
        </div>

        <a
          href="#notices"
          className="shrink-0 flex items-center gap-1 font-semibold text-emerald-100 hover:text-white transition text-xs pl-2 border-l border-white/20"
        >
          <span>সকল নোটিশ</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
