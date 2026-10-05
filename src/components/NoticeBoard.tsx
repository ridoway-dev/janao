'use client';

import React, { useState } from 'react';
import { NOTICES_DATA, PREVIOUS_YEARS, NoticeItem } from '@/data/nctbData';
import { 
  Bell, 
  Calendar, 
  Award, 
  FileText, 
  ChevronRight, 
  Download, 
  ExternalLink, 
  Sparkles,
  Archive,
  ArrowRight
} from 'lucide-react';

interface NoticeBoardProps {
  onSelectYear: (year: number) => void;
}

export default function NoticeBoard({ onSelectYear }: NoticeBoardProps) {
  const [selectedTab, setSelectedTab] = useState<'all' | 'routine' | 'result' | 'notice'>('all');
  const [activeNotice, setActiveNotice] = useState<NoticeItem | null>(null);

  const filteredNotices = NOTICES_DATA.filter((n) => {
    if (selectedTab === 'all') return true;
    return n.category === selectedTab;
  });

  return (
    <section id="notices" className="py-12 bg-slate-50/80 dark:bg-slate-950/60 border-t border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              <Bell className="w-3.5 h-3.5" />
              <span>বোর্ড বিজ্ঞপ্তি ও শিক্ষা তথ্য</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              নোটিশ, পরীক্ষার রুটিন ও ফলাফল
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              শিক্ষা মন্ত্রণালয় ও এনসিটিবি কর্তৃক প্রকাশিত অফিসিয়াল রুটিন, সিলেবাস এবং খাতা চ্যালেঞ্জের নিয়ম।
            </p>
          </div>

          {/* Tab Filter */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start sm:self-auto shadow-xs">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedTab === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
              }`}
            >
              সব নোটিশ
            </button>
            <button
              onClick={() => setSelectedTab('routine')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedTab === 'routine'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
              }`}
            >
              পরীক্ষার রুটিন
            </button>
            <button
              onClick={() => setSelectedTab('result')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedTab === 'result'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
              }`}
            >
              রেজাল্ট ও স্কলারশিপ
            </button>
          </div>
        </div>

        {/* Notices & Previous Years Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Notice Feed (8 cols) */}
          <div className="lg:col-span-8 space-y-3.5">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="group p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-400/80 dark:hover:border-emerald-500/60 hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {notice.categoryBn}
                    </span>
                    {notice.isNew && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border border-rose-300/60 animate-pulse">
                        নতুন
                      </span>
                    )}
                    <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {notice.date}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                    {notice.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {notice.summary}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={() => setActiveNotice(notice)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white dark:bg-emerald-950/50 dark:text-emerald-400 dark:hover:bg-emerald-600 dark:hover:text-white font-bold text-xs transition flex items-center gap-1.5 border border-emerald-200 dark:border-emerald-800/80"
                  >
                    <span>{notice.linkText}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar: Archive & Useful Portals (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Previous Years Archive Box (like competitor) */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base mb-3">
                <Archive className="w-4 h-4 text-emerald-600" />
                <span>পুরানো শিক্ষাবর্ষের বই (Archive)</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                পূর্ববর্তী শিক্ষাবর্ষের সকল শ্রেণির মূল পাঠ্যবই ও শিক্ষক নির্দেশিকা দেখতে বছর নির্বাচন করুন:
              </p>

              <div className="space-y-2">
                {PREVIOUS_YEARS.map((yr) => (
                  <button
                    key={yr.year}
                    onClick={() => {
                      onSelectYear(yr.year);
                      const elem = document.querySelector('#books-section');
                      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 dark:bg-slate-800/70 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>{yr.label}</span>
                    </div>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      সব শ্রেণি →
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Official Board Direct Links */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-700/20">
              <h3 className="font-bold text-base mb-1">অফিসিয়াল শিক্ষা বোর্ড লিংক</h3>
              <p className="text-xs text-white/80 mb-3.5">
                শিক্ষা বিষয়ক সকল সরকারি রেজাল্ট ও নোটিফিকেশনের নির্ভরযোগ্য সংযোগ:
              </p>
              <div className="space-y-2 text-xs">
                <a
                  href="http://www.educationboardresults.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-white/10 hover:bg-white/20 transition backdrop-blur-xs"
                >
                  <span>Education Board Results</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://nctb.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-white/10 hover:bg-white/20 transition backdrop-blur-xs"
                >
                  <span>NCTB National Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://dshe.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-white/10 hover:bg-white/20 transition backdrop-blur-xs"
                >
                  <span>মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর (DSHE)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Notice Detail Modal */}
      {activeNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                {activeNotice.categoryBn}
              </span>
              <span className="text-xs text-slate-400">{activeNotice.date}</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {activeNotice.title}
            </h3>

            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeNotice.summary}
            </p>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <button
                onClick={() => {
                  alert('পিডিএফ ফাইলটি ডাউনলোড তালিকায় যোগ করা হয়েছে।');
                  setActiveNotice(null);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>পিডিএফ ফাইল ডাউনলোড</span>
              </button>

              <button
                onClick={() => setActiveNotice(null)}
                className="py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
