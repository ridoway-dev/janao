'use client';

import React, { useState } from 'react';
import { 
  Server, 
  ExternalLink, 
  Copy, 
  Check, 
  Smartphone, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  School,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface BoardInfo {
  code: string;
  nameBn: string;
  nameEn: string;
  type?: 'general' | 'madrasah' | 'technical';
  officialUrl: string;
}

const BOARDS: BoardInfo[] = [
  { code: 'DHA', nameBn: 'ঢাকা বোর্ড', nameEn: 'Dhaka', officialUrl: 'http://www.dhakaeducationboard.gov.bd/' },
  { code: 'RAJ', nameBn: 'রাজশাহী বোর্ড', nameEn: 'Rajshahi', officialUrl: 'http://www.rajshahieducationboard.gov.bd/' },
  { code: 'COM', nameBn: 'কুমিল্লা বোর্ড', nameEn: 'Comilla', officialUrl: 'http://www.comillaboard.gov.bd/' },
  { code: 'JES', nameBn: 'যশোর বোর্ড', nameEn: 'Jessore', officialUrl: 'http://www.jessoreboard.gov.bd/' },
  { code: 'CHI', nameBn: 'চট্টগ্রাম বোর্ড', nameEn: 'Chittagong', officialUrl: 'http://web.bise-ctg.gov.bd/' },
  { code: 'BAR', nameBn: 'বরিশাল বোর্ড', nameEn: 'Barisal', officialUrl: 'http://www.barisalboard.gov.bd/' },
  { code: 'SYL', nameBn: 'সিলেট বোর্ড', nameEn: 'Sylhet', officialUrl: 'http://sylhetboard.gov.bd/' },
  { code: 'DIN', nameBn: 'দিনাজপুর বোর্ড', nameEn: 'Dinajpur', officialUrl: 'http://dinajpureduboard.gov.bd/' },
  { code: 'MYM', nameBn: 'ময়মনসিংহ বোর্ড', nameEn: 'Mymensingh', officialUrl: 'https://mymensingheducationboard.gov.bd/' },
  { code: 'MAD', nameBn: 'মাদ্রাসা বোর্ড (আলিম)', nameEn: 'Madrasah', type: 'madrasah', officialUrl: 'http://www.bmeb.gov.bd/' },
  { code: 'TEC', nameBn: 'কারিগরি বোর্ড (ভোকেশনাল/BM)', nameEn: 'Technical', type: 'technical', officialUrl: 'http://www.bteb.gov.bd/' },
];

export default function HscResultChecker() {
  const [selectedBoard, setSelectedBoard] = useState('DHA');
  const [roll, setRoll] = useState('');
  const [year, setYear] = useState('2026');
  const [copied, setCopied] = useState(false);

  const currentBoard = BOARDS.find((b) => b.code === selectedBoard) || BOARDS[0];
  const examPrefix = currentBoard.type === 'madrasah' ? 'ALIM' : (currentBoard.type === 'technical' ? 'HSC' : 'HSC');
  const displayRoll = roll.trim() || 'XXXXXX';
  const generatedSms = `${examPrefix} ${currentBoard.code} ${displayRoll} ${year}`;

  const handleCopySms = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(generatedSms);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Fast Direct Server Switcher Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Server 1 */}
        <div className="bg-emerald-600 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between group">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 text-[11px] font-extrabold bg-emerald-950/70 text-emerald-200 rounded-lg">
                রেকমেন্ডেড • দ্রুততম
              </span>
              <Server className="w-5 h-5 text-emerald-100" />
            </div>
            <h3 className="font-extrabold text-lg text-white">সার্ভার ১ (eBoardResults)</h3>
            <p className="text-xs text-emerald-100 mt-1 leading-relaxed">
              বিষয়ভিত্তিক পূর্ণাঙ্গ নম্বর ও গ্রেডশিট সহ ফলাফল দেখতে এই সার্ভার ব্যবহার করুন। ব্যক্তি ও প্রতিষ্ঠান রেজাল্ট দেখা যায়।
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-emerald-500/50">
            <a
              href="https://eboardresults.com/v2/home"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-xs rounded-xl transition-all shadow-sm group-hover:scale-[1.02]"
            >
              <span>সার্ভার ১ খুলুন (মার্কশিট সহ)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Server 2 */}
        <div className="bg-white dark:bg-[#0f172a] border border-blue-200 dark:border-blue-900/60 rounded-2xl p-5 shadow-sm flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-200 dark:border-blue-800">
                অফিশিয়াল গভ. পোর্টাল
              </span>
              <Server className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-extrabold text-lg text-gray-900 dark:text-white">সার্ভার ২ (EducationBoard Gov)</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
              শিক্ষা মন্ত্রণালয়ের মূল ডেটাবেজ। রোল ও রেজিস্ট্রেশন নম্বর দিয়ে দ্রুত জিপিএ যাচাই করুন।
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800">
            <a
              href="http://www.educationboardresults.gov.bd/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm group-hover:scale-[1.02]"
            >
              <span>সার্ভার ২ খুলুন (Gov BD)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Server 3 */}
        <div className="bg-white dark:bg-[#0f172a] border border-amber-200 dark:border-amber-900/60 rounded-2xl p-5 shadow-sm flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 rounded-lg border border-amber-200 dark:border-amber-800">
                টেলিটক অল্টারনেটিভ
              </span>
              <Server className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="font-extrabold text-lg text-gray-900 dark:text-white">সার্ভার ৩ (Teletalk Gateway)</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
              অন্য দুটি সার্ভারে ট্রাফিক বেশি থাকলে বা জ্যাম লাগলে টেলিটকের ব্যাকআপ গেটওয়ে ব্যবহার করুন।
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800">
            <a
              href="http://www.educationboardresults.gov.bd/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl transition-all shadow-sm group-hover:scale-[1.02]"
            >
              <span>সার্ভার ৩ খুলুন (ব্যাকআপ)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Interactive SMS Builder & One-Click Copy */}
      <div className="bg-gradient-to-br from-emerald-50/70 via-white to-blue-50/70 dark:from-[#0b1220] dark:via-[#0f172a] dark:to-[#091522] border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3">
            <Smartphone className="w-3.5 h-3.5" />
            <span>ইন্টারনেট ছাড়া রেজাল্ট দেখার উপায়</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
            SMS এর মাধ্যমে HSC রেজাল্ট ২০২৬ জেনারেটর
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1.5 leading-relaxed">
            সার্ভার ডাউন থাকলেও এসএমএস এর মাধ্যমে কয়েক মিনিটের মধ্যেই ফিরতি মেসেজে রেজাল্ট চলে আসে। আপনার বোর্ড ও রোল দিলে নিচে স্বয়ংক্রিয়ভাবে মেসেজ কোড তৈরি হবে:
          </p>
        </div>

        {/* Builder Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              ১. শিক্ষা বোর্ড নির্বাচন করুন:
            </label>
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              aria-label="শিক্ষা বোর্ড নির্বাচন করুন"
              className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              {BOARDS.map((b) => (
                <option key={b.code} value={b.code}>
                  {b.nameBn} ({b.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              ২. আপনার রোল নম্বর (Roll No):
            </label>
            <input
              type="text"
              placeholder="যেমন: 123456"
              value={roll}
              onChange={(e) => setRoll(e.target.value.replace(/\D/g, '').slice(0, 8))}
              className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              ৩. পরীক্ষার সাল (Year):
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              aria-label="পরীক্ষার সাল নির্বাচন করুন"
              className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>

        {/* SMS Live Code Display Card */}
        <div className="mt-5 p-4 rounded-2xl bg-white dark:bg-gray-900/90 border border-emerald-300 dark:border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
              তৈরি হওয়া SMS ফরম্যাট (পাঠাতে হবে 16222 নম্বরে):
            </span>
            <div className="mt-1 font-mono text-base sm:text-lg font-black text-gray-900 dark:text-white tracking-wider flex items-center gap-2">
              <span className="text-emerald-600 dark:text-emerald-400">💬</span>
              <span>{generatedSms}</span>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
              যে কোনো মোবাইল অপারেটর (গ্রামীণফোন, রবি, এয়ারটেল, বাংলালিংক, টেলিটক) থেকে পাঠানো যাবে। চার্জ: ২.৫৫ টাকা।
            </p>
          </div>

          <button
            onClick={handleCopySms}
            className={`shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm hover:scale-[1.02]'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>মেসেজ কপি হয়েছে!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>কপি করুন (Copy SMS)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. Board-Wise Direct Result Portals Table */}
      <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h3 className="font-black text-lg text-gray-900 dark:text-white flex items-center gap-2">
              <School className="w-5 h-5 text-emerald-600" />
              <span>বোর্ডভিত্তিক অফিসিয়াল রেজাল্ট লিংক ও পোর্টাল</span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              নিজ নিজ শিক্ষা বোর্ডের ওয়েবসাইট থেকেও সরাসরি ফলাফল ডাউনলোড করা যায়
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {BOARDS.map((b) => (
            <div
              key={b.code}
              className="p-3.5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40 flex items-center justify-between gap-2 hover:border-emerald-400 transition-colors"
            >
              <div>
                <span className="font-bold text-xs text-gray-900 dark:text-white block">
                  {b.nameBn}
                </span>
                <span className="text-[11px] text-gray-500 dark:text-gray-400">
                  SMS Code: <strong>{b.code}</strong>
                </span>
              </div>

              <a
                href={b.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 shrink-0 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800"
              >
                <span>পোর্টাল</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
