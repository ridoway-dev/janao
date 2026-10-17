'use client';

import React, { useState } from 'react';
import { Briefcase, Calendar, CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';

export default function JobAgeCalculator() {
  const todayStr = new Date().toISOString().split('T')[0];

  const [birthDate, setBirthDate] = useState<string>('2000-01-01');
  const [targetDate, setTargetDate] = useState<string>(todayStr);

  const calculateAge = () => {
    if (!birthDate || !targetDate) return null;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (isNaN(birth.getTime()) || isNaN(target.getTime())) return null;
    if (birth > target) {
      return { error: 'জন্মতারিখ লক্ষ্য তারিখের চেয়ে বড় হতে পারে না।' };
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const isGeneralEligible = years >= 18 && (years < 30 || (years === 30 && months === 0 && days === 0));
    const isQuotaEligible = years >= 18 && (years < 32 || (years === 32 && months === 0 && days === 0));

    return {
      years,
      months,
      days,
      isGeneralEligible,
      isQuotaEligible,
      totalDays: Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)),
    };
  };

  const result = calculateAge();

  const resetDates = () => {
    setBirthDate('2000-01-01');
    setTargetDate(todayStr);
  };

  return (
    <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100 dark:border-gray-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-md">
            সরকারি চাকরি ও বিসিএস
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1.5 flex items-center gap-2">
            <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
            <span>সরকারি চাকরির বয়স ক্যালকুলেটর (Job Age Calculator)</span>
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            সার্কুলারের নির্দিষ্ট তারিখে আপনার বয়স কত বছর, কত মাস ও কত দিন হয়েছে তা তাৎক্ষণিক যাচাই করুন।
          </p>
        </div>

        <button
          onClick={resetDates}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>রিসেট</span>
        </button>
      </div>

      {/* Inputs & Result Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
        
        {/* Left: Date Inputs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Birth Date */}
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#141d2e] space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">
                আপনার জন্মতারিখ (Date of Birth):
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-white dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
              <span className="text-[11px] text-gray-500 block">
                এসএসসি সার্টিফিকেট অনুযায়ী জন্মতারিখ লিখুন
              </span>
            </div>

            {/* Target Calculation Date */}
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#141d2e] space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">
                যে তারিখে বয়স হিসাব করবেন (Target Date):
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full bg-white dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
              <span className="text-[11px] text-gray-500 block">
                চাকরির বিজ্ঞপ্তিতে উল্লিখিত নির্দিষ্ট তারিখ
              </span>
            </div>

          </div>

          {/* Quick Circular Presets */}
          <div className="pt-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-2">
              জনপ্রিয় তারিখ শর্টকাট:
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => setTargetDate(todayStr)}
                className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
              >
                আজকের তারিখে ({todayStr})
              </button>
              <button
                onClick={() => setTargetDate('2026-05-01')}
                className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
              >
                ১ মে ২০২৬
              </button>
              <button
                onClick={() => setTargetDate('2026-01-01')}
                className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
              >
                ১ জানুয়ারি ২০২৬
              </button>
            </div>
          </div>

          {/* BD Govt Job Age Limits Info Box */}
          <div className="p-4 rounded-xl border border-indigo-100 dark:border-indigo-950/80 bg-indigo-50/40 dark:bg-indigo-950/20 text-xs space-y-2">
            <span className="font-bold text-indigo-900 dark:text-indigo-300 block">
              বাংলাদেশ সরকারি চাকরির সাধারণ বয়সসীমা নির্দেশিকা:
            </span>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 text-[11px] leading-relaxed">
              <li>সাধারণ প্রার্থী ও অন্যান্য কোটা: <strong>১৮ থেকে ৩০ বছর</strong></li>
              <li>মুক্তিযোদ্ধা ও শহীদ মুক্তিযোদ্ধার সন্তান এবং প্রতিবন্ধী প্রার্থী: <strong>১৮ থেকে ৩২ বছর</strong></li>
              <li>বিসিএস স্বাস্থ্য ক্যাডার: <strong>সর্বোচ্চ ৩২ বছর</strong></li>
            </ul>
          </div>
        </div>

        {/* Right: Calculated Result Card */}
        <div className="flex flex-col gap-4">
          {result && 'error' in result ? (
            <div className="p-6 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 text-center">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-xs text-red-600 dark:text-red-400 font-bold">{result.error}</p>
            </div>
          ) : result ? (
            <div className="p-6 rounded-2xl border text-center transition-all bg-gradient-to-br from-indigo-600 to-indigo-900 text-white border-transparent shadow-lg shadow-indigo-600/20">
              <span className="text-xs font-bold uppercase tracking-wider block mb-1 text-indigo-100">
                নির্দিষ্ট তারিখে আপনার বয়স
              </span>

              {/* Years / Months / Days Big Counters */}
              <div className="grid grid-cols-3 gap-2 my-4">
                <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5">
                  <div className="text-3xl font-black">{result.years}</div>
                  <div className="text-[11px] text-indigo-200 font-semibold">বছর</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5">
                  <div className="text-3xl font-black">{result.months}</div>
                  <div className="text-[11px] text-indigo-200 font-semibold">মাস</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5">
                  <div className="text-3xl font-black">{result.days}</div>
                  <div className="text-[11px] text-indigo-200 font-semibold">দিন</div>
                </div>
              </div>

              {/* Eligibility Badges */}
              <div className="mt-4 pt-4 border-t border-indigo-400/30 text-xs space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <span>সাধারণ কোটা (১৮-৩০ বছর):</span>
                  {result.isGeneralEligible ? (
                    <span className="px-2 py-0.5 bg-emerald-400/20 text-emerald-300 font-bold rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> যোগ্য
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-red-400/20 text-red-300 font-bold rounded flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> অযোগ্য
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span>মুক্তিযোদ্ধা কোটা (১৮-৩২ বছর):</span>
                  {result.isQuotaEligible ? (
                    <span className="px-2 py-0.5 bg-emerald-400/20 text-emerald-300 font-bold rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> যোগ্য
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-red-400/20 text-red-300 font-bold rounded flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> অযোগ্য
                    </span>
                  )}
                </div>

                <div className="pt-2 text-[11px] text-indigo-200 text-center">
                  মোট দিন সংখ্যা: {result.totalDays.toLocaleString()} দিন
                </div>
              </div>
            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
}
