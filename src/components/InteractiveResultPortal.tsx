'use client';

import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  Server, 
  CheckCircle2, 
  MessageSquare, 
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';

export default function InteractiveResultPortal() {
  const [selectedServer, setSelectedServer] = useState<'1' | '2'>('1');
  const [exam, setExam] = useState('ssc');
  const [year, setYear] = useState('2026');
  const [board, setBoard] = useState('dhaka');
  const [roll, setRoll] = useState('');
  const [reg, setReg] = useState('');
  const [copied, setCopied] = useState(false);

  const boards = [
    { id: 'dhaka', name: 'ঢাকা (Dhaka)' },
    { id: 'rajshahi', name: 'রাজশাহী (Rajshahi)' },
    { id: 'comilla', name: 'কুমিল্লা (Comilla)' },
    { id: 'jessore', name: 'যশোর (Jessore)' },
    { id: 'chittagong', name: 'চট্টগ্রাম (Chittagong)' },
    { id: 'barisal', name: 'বরিশাল (Barisal)' },
    { id: 'sylhet', name: 'সিলেট (Sylhet)' },
    { id: 'dinajpur', name: 'দিনাজপুর (Dinajpur)' },
    { id: 'mymensingh', name: 'ময়মনসিংহ (Mymensingh)' },
    { id: 'madrasah', name: 'মাদ্রাসা (Madrasah)' },
    { id: 'technical', name: 'কারিগরি (Technical)' },
  ];

  const handleOfficialRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServer === '1') {
      window.open('https://eboardresults.com/v2/home', '_blank');
    } else {
      window.open('http://www.educationboardresults.gov.bd/', '_blank');
    }
  };

  const copySms = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 sm:p-8 shadow-sm">
      {/* Top Header */}
      <div className="text-center max-w-xl mx-auto mb-6">
        <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-200 dark:border-emerald-800/80">
          সরাসরি কেন্দ্রীয় রেজাল্ট গেটওয়ে
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-2 tracking-tight">
          SSC / HSC / Dakhil রেজাল্ট চেকার
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1.5">
          রোল ও রেজিস্ট্রেশন নম্বর দিয়ে শিক্ষা মন্ত্রণালয়ের দ্রুততম সার্ভার থেকে রেজাল্ট ও ফুল মার্কশিট দেখুন।
        </p>
      </div>

      {/* Server Selector Bar */}
      <div className="max-w-md mx-auto mb-6 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setSelectedServer('1')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            selectedServer === '1'
              ? 'bg-white dark:bg-[#1e293b] text-emerald-700 dark:text-emerald-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
          }`}
        >
          <Server className="w-3.5 h-3.5" />
          <span>সার্ভার ১ (eBoard - ফুল মার্কশিট)</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedServer('2')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            selectedServer === '2'
              ? 'bg-white dark:bg-[#1e293b] text-emerald-700 dark:text-emerald-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
          }`}
        >
          <Server className="w-3.5 h-3.5" />
          <span>সার্ভার ২ (Teletalk দ্রুততম)</span>
        </button>
      </div>

      {/* Form Card */}
      <form onSubmit={handleOfficialRedirect} className="max-w-xl mx-auto space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Exam Type */}
          <div>
            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
              পরীক্ষার নাম (Exam)
            </label>
            <select
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              className="w-full bg-gray-50 dark:bg-[#141d2e] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="ssc">SSC / দাখিল / সমমান</option>
              <option value="hsc">HSC / আলিম / সমমান</option>
              <option value="jsc">JSC / JDC</option>
              <option value="ssc_voc">SSC (ভোকেশনাল)</option>
              <option value="hsc_voc">HSC (ভোকেশনাল / BM)</option>
            </select>
          </div>

          {/* Exam Year */}
          <div>
            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
              পাশের বছর (Year)
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full bg-gray-50 dark:bg-[#141d2e] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>
        </div>

        {/* Board Selection */}
        <div>
          <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
            শিক্ষা বোর্ড (Education Board)
          </label>
          <select
            value={board}
            onChange={(e) => setBoard(e.target.value)}
            className="w-full bg-gray-50 dark:bg-[#141d2e] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500"
          >
            {boards.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {/* Roll & Registration inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
              রোল নম্বর (Roll No.)
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="যেমন: 123456"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              className="w-full bg-gray-50 dark:bg-[#141d2e] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
              রেজিস্ট্রেশন নম্বর (Reg No.)
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="যেমন: 2112345678"
              value={reg}
              onChange={(e) => setReg(e.target.value)}
              className="w-full bg-gray-50 dark:bg-[#141d2e] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Server Notice & Button */}
        <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/60 rounded-xl flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              {selectedServer === '1'
                ? 'সার্ভার ১ সক্রিয়: রেজিস্ট্রেশন ছাড়া শুধু রোল দিয়েও চেক করা যায়।'
                : 'সার্ভার ২ সক্রিয়: সরকারি মূল কেন্দ্রীয় ডাটাবেজ।'}
            </span>
          </span>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold rounded-2xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 active:scale-98"
        >
          <Search className="w-4 h-4" />
          <span>অফিসিয়াল সার্ভারে রেজাল্ট দেখুন</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </form>

      {/* SMS Fast Copier Box */}
      <div className="max-w-xl mx-auto mt-6 pt-5 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>মোবাইল SMS ফরম্যাট (ইন্টারনেট না থাকলে)</span>
          </span>
          <span className="text-[11px] text-gray-500">নম্বর: 16222</span>
        </div>

        <div className="p-3 bg-gray-50 dark:bg-[#141d2e] border border-gray-200 dark:border-gray-800 rounded-xl flex items-center justify-between text-xs font-mono">
          <span className="text-gray-800 dark:text-gray-200">
            {exam.toUpperCase()} {board.slice(0, 3).toUpperCase()} {roll || '123456'} {year}
          </span>

          <button
            onClick={() => copySms(`${exam.toUpperCase()} ${board.slice(0, 3).toUpperCase()} ${roll || '123456'} ${year}`)}
            className="flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-lg text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="font-sans font-semibold text-[11px]">{copied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
