'use client';

import React from 'react';
import { NOTICES_DATA, PREVIOUS_YEARS } from '@/data/nctbData';
import { Calendar, ChevronRight, FileText } from 'lucide-react';

interface NoticeBoardProps {
  onSelectYear: (year: number) => void;
}

export default function NoticeBoard({ onSelectYear }: NoticeBoardProps) {
  const recentPosts = [
    {
      title: 'এসএসসি পরীক্ষা ২০২৬-এর ফল পুনঃনিরীক্ষণের নিয়মাবলি',
      slug: 'ssc-rescrutiny-2026',
      date: '০৫ অক্টোবর ২০২৬',
    },
    {
      title: 'যশোর বোর্ড | এসএসসি পরীক্ষা ২০২৬-এর ফলাফল পুনঃনিরীক্ষণের নিয়মাবলী',
      slug: 'ssc-rescrutiny-jessore',
      date: '০৪ অক্টোবর ২০২৬',
    },
    {
      title: 'এসএসসি পরীক্ষার খাতা চ্যালেঞ্জের নতুন নিয়ম ও টেলিটকে ফি প্রদান',
      slug: 'ssc-khata-challenge-rules',
      date: '০২ অক্টোবর ২০২৬',
    },
    {
      title: 'SSC রেজাল্ট দেখার নিয়ম ২০২৬ | SSC result kivabe dekhbo 2026',
      slug: 'ssc-result-check-method',
      date: '২৮ সেপ্টেম্বর ২০২৬',
    },
  ];

  return (
    <section id="notices" className="max-w-6xl mx-auto px-4 sm:px-6 py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: নোটিশ ও সিলেবাস (6 cols) */}
        <div className="lg:col-span-6">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              নোটিশ ও সিলেবাস
            </h2>
            <a
              href="#notices"
              className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-medium"
            >
              সব দেখুন
            </a>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {NOTICES_DATA.map((item) => (
              <div key={item.id} className="py-2.5 flex items-start justify-between gap-3 group">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 dark:text-emerald-400 mt-1">▪</span>
                  <div>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`${item.title}\n\n${item.summary}`);
                      }}
                      className="text-sm text-gray-800 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium group-hover:underline leading-snug block"
                    >
                      {item.title}
                    </a>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Column: সাম্প্রতিক পোস্ট (6 cols on small, 6 on desktop) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                সাম্প্রতিক পোস্ট
              </h2>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {recentPosts.map((post, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between gap-2 group">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`${post.title}\nপ্রকাশের তারিখ: ${post.date}`);
                    }}
                    className="text-sm text-gray-800 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium group-hover:underline truncate"
                  >
                    {post.title}
                  </a>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 shrink-0 font-medium hover:underline cursor-pointer">
                    দেখুন
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Purano bochorer boi */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
              পুরানো বছরের বই
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              আগের শিক্ষাবর্ষের সব শ্রেণির বই ক্যাটাগরি থেকে পাওয়া যাবে।
            </p>

            <div className="flex flex-wrap gap-2 text-xs">
              {PREVIOUS_YEARS.filter((y) => !y.isCurrent).map((yr) => (
                <button
                  key={yr.year}
                  onClick={() => {
                    onSelectYear(yr.year);
                    const elem = document.querySelector('#books-section');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-emerald-50 dark:bg-gray-800 dark:hover:bg-emerald-950/40 text-gray-800 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-emerald-400 border border-gray-300 dark:border-gray-700 rounded transition font-medium"
                >
                  {yr.year} সব শ্রেণি →
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
