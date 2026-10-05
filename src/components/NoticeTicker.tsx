'use client';

import React from 'react';
import { NOTICES_DATA } from '@/data/nctbData';

interface NoticeTickerProps {
  onSelectNotice: (id: string) => void;
}

export default function NoticeTicker({ onSelectNotice }: NoticeTickerProps) {
  const latestNotice = NOTICES_DATA[0];

  return (
    <div className="bg-emerald-800 text-white text-xs py-2 px-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden flex-1">
          <span className="font-bold text-emerald-200 uppercase shrink-0">
            [নোটিশ]
          </span>
          <span
            className="truncate hover:underline cursor-pointer font-medium"
            onClick={() => onSelectNotice(latestNotice.id)}
          >
            {latestNotice.title} ({latestNotice.date})
          </span>
        </div>

        <a
          href="#notices"
          className="shrink-0 text-emerald-200 hover:text-white underline text-xs ml-2"
        >
          সব নোটিশ
        </a>
      </div>
    </div>
  );
}
