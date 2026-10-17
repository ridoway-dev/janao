'use client';

import React from 'react';
import Link from 'next/link';
import { NOTICES_DATA, PREVIOUS_YEARS } from '@/data/nctbData';
import { Calendar, ChevronRight, FileText, Download } from 'lucide-react';

interface NoticeBoardProps {
  onSelectYear: (year: number) => void;
}

export default function NoticeBoard({ onSelectYear }: NoticeBoardProps) {
  const recentPosts = [
    {
      title: 'SSC Routine 2027 | এসএসসি ও সমমান পরীক্ষা ২০২৭ রুটিন PDF',
      slug: 'ssc-routine-2027',
      date: '০৫ অক্টোবর ২০২৬',
      badge: 'রুটিন ২০২৭',
    },
    {
      title: 'HSC Routine 2027 | এইচএসসি ও আলিম পরীক্ষা ২০২৭ সময়সূচি PDF',
      slug: 'hsc-routine-2027',
      date: '০২ অক্টোবর ২০২৬',
      badge: 'রুটিন ২০২৭',
    },
    {
      title: 'SSC 2027 Syllabus PDF Download — এসএসসি ২০২৭ বিষয়ভিত্তিক পূর্ণাঙ্গ সিলেবাস',
      slug: 'ssc-2027-syllabus-pdf-download',
      date: '০৫ অক্টোবর ২০২৬',
      badge: 'সিলেবাস',
    },
    {
      title: 'SSC 2026 Short Syllabus PDF — এসএসসি ২০২৬ সংক্ষিপ্ত সিলেবাস ও নম্বর বণ্টন',
      slug: 'ssc-2026-short-syllabus',
      date: '০৫ অক্টোবর ২০২৬',
      badge: 'শর্ট সিলেবাস',
    },
    {
      title: '২০২৭ সাল থেকে পাঠ্যবই পরিবর্তন — মাধ্যমিকে ৯৯টি ও প্রাথমিকে ৩৬টি বই পরিমার্জন',
      slug: 'nctb-book-changes-2027',
      date: '০৪ অক্টোবর ২০২৬',
      badge: 'কারিকুলাম',
    },
  ];

  return (
    <section id="notices" className="max-w-6xl mx-auto px-3.5 sm:px-6 py-6 sm:py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Left Column: নোটিশ ও সিলেবাস (6 cols) */}
        <div className="lg:col-span-6">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              নোটিশ ও সিলেবাস
            </h2>
            <Link
              href="/notices/"
              className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
            >
              সব দেখুন →
            </Link>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {NOTICES_DATA.slice(0, 6).map((item) => (
              <div key={item.id} className="py-2.5 flex items-start justify-between gap-2.5 group">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <span className="text-emerald-700 dark:text-emerald-400 mt-1 text-xs shrink-0">▪</span>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/notices/${item.slug}/`}
                      className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium group-hover:underline leading-snug block line-clamp-2"
                    >
                      {item.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-semibold">
                        {item.categoryBn}
                      </span>
                      <span className="text-[11px] text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/notices/${item.slug}/`}
                  className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline shrink-0 font-medium self-center ml-1"
                >
                  পড়ুন →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Column: সাম্প্রতিক পোস্ট ও রুটিন (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                সাম্প্রতিক রুটিন ও সিলেবাস আপডেট
              </h2>
              <Link
                href="/syllabus/"
                className="text-xs text-blue-700 dark:text-blue-400 hover:underline font-semibold"
              >
                সিলেবাস হাব →
              </Link>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {recentPosts.map((post, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between gap-2.5 group">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold">
                        {post.badge}
                      </span>
                      <span className="text-[11px] text-gray-400">{post.date}</span>
                    </div>
                    <Link
                      href={`/notices/${post.slug}/`}
                      className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium group-hover:underline line-clamp-2 block"
                    >
                      {post.title}
                    </Link>
                  </div>

                  <Link
                    href={`/notices/${post.slug}/`}
                    className="text-xs text-emerald-700 dark:text-emerald-400 shrink-0 font-medium hover:underline ml-1"
                  >
                    PDF দেখুন
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Purano bochorer boi */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
              পুরানো ও পরবর্তী শিক্ষাবর্ষের বই
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              আগের ও আসন্ন শিক্ষাবর্ষের সকল শ্রেণির পাঠ্যবই ক্যাটাগরি ফিল্টার থেকে দেখুন।
            </p>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs">
              <Link
                href="/books/2027/"
                className="px-2.5 sm:px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 rounded transition font-semibold"
              >
                ২০২৭ ট্র্যাকার →
              </Link>
              {PREVIOUS_YEARS.filter((y) => !y.isCurrent && y.year <= 2025).map((yr) => (
                <button
                  key={yr.year}
                  onClick={() => {
                    onSelectYear(yr.year);
                    const elem = document.querySelector('#books-section');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-2.5 sm:px-3 py-1.5 bg-gray-100 hover:bg-emerald-50 dark:bg-gray-800 dark:hover:bg-emerald-950/40 text-gray-800 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-emerald-400 border border-gray-300 dark:border-gray-700 rounded transition font-medium"
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
