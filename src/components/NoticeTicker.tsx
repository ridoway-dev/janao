'use client';

import React from 'react';
import Link from 'next/link';
import { NOTICES_DATA } from '@/data/nctbData';

interface NoticeTickerProps {
  onSelectNotice?: (id: string) => void;
}

export default function NoticeTicker({ onSelectNotice }: NoticeTickerProps) {
  const latestNotice = NOTICES_DATA[0];

  return (
    <div className="bg-emerald-800 text-white text-xs py-1.5 sm:py-2 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden flex-1 min-w-0">
          <span className="font-bold text-emerald-200 uppercase shrink-0 text-[11px] sm:text-xs">
            <span className="hidden sm:inline">[জরুরি আপডেট]</span>
            <span className="sm:hidden">[জরুরি]</span>
          </span>
          <Link
            href={`/notices/${latestNotice.slug}/`}
            className="truncate hover:underline font-medium hover:text-emerald-100 text-[11px] sm:text-xs"
          >
            {latestNotice.title}
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0 text-[11px] sm:text-xs">
          <Link
            href="/results/hsc/"
            className="text-amber-300 hover:text-white font-extrabold underline flex items-center gap-1"
          >
            <span>🔴 HSC রেজাল্ট ২০২৬</span>
          </Link>
          <Link
            href="/syllabus/"
            className="text-emerald-200 hover:text-white underline font-semibold hidden md:inline"
          >
            রুটিন ও সিলেবাস
          </Link>
          <Link
            href="/notices/"
            className="text-emerald-200 hover:text-white underline hidden sm:inline"
          >
            সব নোটিশ
          </Link>
        </div>
      </div>
    </div>
  );
}
