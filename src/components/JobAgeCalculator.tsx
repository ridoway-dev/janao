'use client';

import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  XCircle,
  AlertCircle, 
  RotateCcw, 
  Copy, 
  Check, 
  Share2, 
  Clock, 
  Award, 
  Sparkles,
  Info,
  ChevronDown
} from 'lucide-react';

export default function JobAgeCalculator() {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const [birthDate, setBirthDate] = useState<string>('2000-01-01');
  const [targetDate, setTargetDate] = useState<string>(todayStr);
  const [copied, setCopied] = useState<boolean>(false);

  // Quick Circular Cutoff Presets
  const setQuickTarget = (type: 'today' | 'first_jan' | 'first_jul' | 'first_oct') => {
    const curYear = today.getFullYear();
    if (type === 'today') {
      setTargetDate(todayStr);
    } else if (type === 'first_jan') {
      setTargetDate(`${curYear}-01-01`);
    } else if (type === 'first_jul') {
      setTargetDate(`${curYear}-07-01`);
    } else if (type === 'first_oct') {
      setTargetDate(`${curYear}-10-01`);
    }
  };

  const toBn = (num: number | string): string => {
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
  };

  const daysOfWeekBn = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  const monthsBn = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];

  // Accurate Age Calculation
  const calculation = useMemo(() => {
    if (!birthDate || !targetDate) return null;

    const [bY, bM, bD] = birthDate.split('-').map(Number);
    const [tY, tM, tD] = targetDate.split('-').map(Number);

    const bDate = new Date(bY, bM - 1, bD);
    const tDate = new Date(tY, tM - 1, tD);

    if (isNaN(bDate.getTime()) || isNaN(tDate.getTime())) return null;

    if (bDate > tDate) {
      return { error: 'জন্মতারিখ লক্ষ্য তারিখের (সার্কুলারের তারিখ) চেয়ে বড় হতে পারে না।' };
    }

    let years = tY - bY;
    let months = tM - bM;
    let days = tD - bD;

    if (days < 0) {
      months -= 1;
      // Days in previous month of target date
      const daysInPrevMonth = new Date(tY, tM - 1, 0).getDate();
      days += daysInPrevMonth;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Total counts
    const diffTime = tDate.getTime() - bDate.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;

    // Next Birthday calculation
    const thisYearBday = new Date(tY, bM - 1, bD);
    let nextBday = thisYearBday;
    if (thisYearBday < tDate) {
      nextBday = new Date(tY + 1, bM - 1, bD);
    }
    const daysToNextBday = Math.ceil((nextBday.getTime() - tDate.getTime()) / (1000 * 60 * 60 * 24));
    const nextBdayDayName = daysOfWeekBn[nextBday.getDay()];

    // BD Govt Job Eligibility rules
    // 1. General: 18 - 30 years
    const isMinAgeEligible = years >= 18;
    const isGeneralEligible = years >= 18 && (years < 30 || (years === 30 && months === 0 && days === 0));
    
    // Remaining time for 30 years limit
    let remainingGeneral = null;
    let overageGeneral = null;
    if (years < 30) {
      let rYears = 29 - years;
      let rMonths = 11 - months;
      let daysInTargetMonth = new Date(tY, tM, 0).getDate();
      let rDays = daysInTargetMonth - days;
      if (rDays >= daysInTargetMonth) {
        rDays = 0;
        rMonths += 1;
      }
      if (rMonths >= 12) {
        rMonths = 0;
        rYears += 1;
      }
      remainingGeneral = { years: rYears, months: rMonths, days: rDays };
    } else {
      overageGeneral = {
        years: years - 30,
        months,
        days
      };
    }

    // 2. Freedom Fighter & Disabled Quota: 18 - 32 years
    const isQuotaEligible = years >= 18 && (years < 32 || (years === 32 && months === 0 && days === 0));
    let remainingQuota = null;
    if (years < 32) {
      let rYears = 31 - years;
      let rMonths = 11 - months;
      let daysInTargetMonth = new Date(tY, tM, 0).getDate();
      let rDays = daysInTargetMonth - days;
      if (rDays >= daysInTargetMonth) {
        rDays = 0;
        rMonths += 1;
      }
      if (rMonths >= 12) {
        rMonths = 0;
        rYears += 1;
      }
      remainingQuota = { years: rYears, months: rMonths, days: rDays };
    }

    // Day of birth name
    const birthDayName = daysOfWeekBn[bDate.getDay()];

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      daysToNextBday,
      nextBdayDayName,
      birthDayName,
      isMinAgeEligible,
      isGeneralEligible,
      isQuotaEligible,
      remainingGeneral,
      overageGeneral,
      remainingQuota,
      bDateStr: `${bD} ${monthsBn[bM - 1]} ${bY}`,
      tDateStr: `${tD} ${monthsBn[tM - 1]} ${tY}`,
    };
  }, [birthDate, targetDate]);

  const copyResult = () => {
    if (!calculation || 'error' in calculation) return;
    const text = `📋 সরকারি চাকরির বয়স হিসাব (Janao.online):\n` +
      `📅 জন্মতারিখ: ${calculation.bDateStr} (${calculation.birthDayName})\n` +
      `🎯 হিসেবের তারিখ: ${calculation.tDateStr}\n` +
      `--------------------------------\n` +
      `✨ বয়স: ${calculation.years} বছর, ${calculation.months} মাস, ${calculation.days} দিন\n` +
      `📊 সাধারণ কোটা (১৮-৩০): ${calculation.isGeneralEligible ? 'আবেদনের যোগ্য ✅' : 'বয়স উত্তীর্ণ ❌'}\n` +
      `🎖️ মুক্তিযোদ্ধা/প্রতিবন্ধী কোটা (১৮-৩২): ${calculation.isQuotaEligible ? 'আবেদনের যোগ্য ✅' : 'বয়স উত্তীর্ণ ❌'}\n` +
      (calculation.remainingGeneral 
        ? `⏳ সাধারণ চাকরিতে বয়স বাকি: ${calculation.remainingGeneral.years} বছর ${calculation.remainingGeneral.months} মাস ${calculation.remainingGeneral.days} দিন\n`
        : '') +
      `🔗 নিজের বয়স হিসাব করুন: https://janao.online/tools/job-age-calculator/`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareWhatsApp = () => {
    if (!calculation || 'error' in calculation) return;
    const text = encodeURIComponent(
      `সরকারি চাকরির বয়স হিসাব করলাম!\nআমার বয়স: ${toBn(calculation.years)} বছর ${toBn(calculation.months)} মাস ${toBn(calculation.days)} দিন।\nতুমিও হিসাব করে নাও: https://janao.online/tools/job-age-calculator/`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const resetAll = () => {
    setBirthDate('2000-01-01');
    setTargetDate(todayStr);
  };

  return (
    <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-4 sm:p-8 shadow-sm">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
              BPSC ও সরকারি চাকরি স্পেশাল
            </span>
            <span className="text-xs text-gray-400 font-medium hidden sm:inline">
              ১০০% নির্ভুল হিসাব
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mt-1.5 flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600 shrink-0" />
            <span>সরকারি চাকরির বয়স ক্যালকুলেটর</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-2xl leading-relaxed">
            সরকারি চাকরির সার্কুলারের কাট-অফ ডেট অনুযায়ী আপনার বয়স কত বছর, মাস ও দিন হয়েছে এবং সাধারণ বা কোটায় আবেদনের যোগ্যতা রয়েছে কিনা যাচাই করুন।
          </p>
        </div>

        <button
          onClick={resetAll}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition self-start md:self-auto active:scale-95"
          title="রিসেট করুন"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>রিসেট</span>
        </button>
      </div>

      {/* Date Pickers Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6">
        
        {/* 1. Date of Birth */}
        <div className="p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-[#131b2e] space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>আপনার জন্মতারিখ (Date of Birth):</span>
            </label>
          </div>

          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full bg-white dark:bg-[#0b0f19] border border-gray-300 dark:border-gray-700 rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
          />

          <p className="text-[11px] text-gray-500 dark:text-gray-400">
            এসএসসি সার্টিফিকেট বা জাতীয় পরিচয়পত্র (NID) অনুযায়ী জন্মতারিখ নির্বাচন করুন।
          </p>
        </div>

        {/* 2. Target / Cutoff Date */}
        <div className="p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-[#131b2e] space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>বয়স গণনার তারিখ (সার্কুলারের তারিখ):</span>
            </label>
          </div>

          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full bg-white dark:bg-[#0b0f19] border border-gray-300 dark:border-gray-700 rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
          />

          {/* Quick Cutoff Preset Shortcuts */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] text-gray-500 mr-1">দ্রুত সিলেক্ট:</span>
            <button
              onClick={() => setQuickTarget('today')}
              className="text-[11px] font-medium px-2 py-0.5 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-emerald-500 text-gray-700 dark:text-gray-300 transition"
            >
              আজকের দিন
            </button>
            <button
              onClick={() => setQuickTarget('first_jan')}
              className="text-[11px] font-medium px-2 py-0.5 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-emerald-500 text-gray-700 dark:text-gray-300 transition"
            >
              ১ জানুয়ারি
            </button>
            <button
              onClick={() => setQuickTarget('first_jul')}
              className="text-[11px] font-medium px-2 py-0.5 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-emerald-500 text-gray-700 dark:text-gray-300 transition"
            >
              ১ জুলাই
            </button>
            <button
              onClick={() => setQuickTarget('first_oct')}
              className="text-[11px] font-medium px-2 py-0.5 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-emerald-500 text-gray-700 dark:text-gray-300 transition"
            >
              ১ অক্টোবর
            </button>
          </div>
        </div>

      </div>

      {/* RESULT SECTION */}
      {calculation && 'error' in calculation ? (
        <div className="mt-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{calculation.error}</span>
        </div>
      ) : calculation ? (
        <div className="mt-6 space-y-6 animate-fadeIn">
          
          {/* Main Age Big Card */}
          <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white shadow-lg border border-emerald-500/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-300 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  সার্কুলারের নির্দিষ্ট তারিখে আপনার বয়স
                </span>
                <p className="text-xs text-slate-300 mt-1">
                  জন্ম: <strong className="text-white">{calculation.bDateStr}</strong> ({calculation.birthDayName}) · গণনার তারিখ: <strong className="text-white">{calculation.tDateStr}</strong>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={copyResult}
                  className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5 active:scale-95"
                  title="ফলাফল কপি করুন"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'কপি হয়েছে!' : 'কপি করুন'}</span>
                </button>
                <button
                  onClick={shareWhatsApp}
                  className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5 active:scale-95"
                  title="WhatsApp এ শেয়ার করুন"
                >
                  <Share2 className="w-4 h-4" />
                  <span>শেয়ার</span>
                </button>
              </div>
            </div>

            {/* Big Digits Display */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 py-6 text-center">
              <div className="bg-white/5 backdrop-blur-xs rounded-2xl p-3 sm:p-5 border border-white/10">
                <span className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-emerald-400 font-mono block">
                  {toBn(calculation.years)}
                </span>
                <span className="text-xs sm:text-base font-semibold text-slate-200 mt-1 block">
                  বছর (Years)
                </span>
              </div>
              <div className="bg-white/5 backdrop-blur-xs rounded-2xl p-3 sm:p-5 border border-white/10">
                <span className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-emerald-400 font-mono block">
                  {toBn(calculation.months)}
                </span>
                <span className="text-xs sm:text-base font-semibold text-slate-200 mt-1 block">
                  মাস (Months)
                </span>
              </div>
              <div className="bg-white/5 backdrop-blur-xs rounded-2xl p-3 sm:p-5 border border-white/10">
                <span className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-emerald-400 font-mono block">
                  {toBn(calculation.days)}
                </span>
                <span className="text-xs sm:text-base font-semibold text-slate-200 mt-1 block">
                  দিন (Days)
                </span>
              </div>
            </div>

            {/* Next Birthday Notice */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                🎂 পরবর্তী জন্মদিন আসতে বাকি: <strong className="text-emerald-300">{toBn(calculation.daysToNextBday)} দিন</strong> ({calculation.nextBdayDayName})
              </span>
              <span className="font-mono text-slate-400">
                মোট জীবনকাল: {toBn(calculation.totalDays.toLocaleString())} দিন
              </span>
            </div>
          </div>

          {/* Job Eligibility Verdict Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* General Quota Card (18 - 30) */}
            <div className={`p-5 rounded-2xl border transition ${
              calculation.isGeneralEligible 
                ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800' 
                : 'bg-red-50/60 dark:bg-red-950/20 border-red-300 dark:border-red-800'
            }`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    সাধারণ কোটা (১৮ থেকে ৩০ বছর)
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mt-0.5">
                    সাধারণ সরকারি চাকরির আবেদন
                  </h4>
                </div>
                {calculation.isGeneralEligible ? (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>যোগ্য</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-red-600 text-white text-xs font-bold flex items-center gap-1 shrink-0">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>অনুপযুক্ত</span>
                  </span>
                )}
              </div>

              <div className="mt-3 text-xs sm:text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {calculation.isGeneralEligible && calculation.remainingGeneral ? (
                  <p>
                    🎉 আপনার সাধারণ সরকারি চাকরিতে আবেদনের সময় বাকি আছে:{' '}
                    <strong className="text-emerald-700 dark:text-emerald-400 font-bold">
                      {toBn(calculation.remainingGeneral.years)} বছর {toBn(calculation.remainingGeneral.months)} মাস {toBn(calculation.remainingGeneral.days)} দিন।
                    </strong>
                  </p>
                ) : !calculation.isMinAgeEligible ? (
                  <p className="text-amber-700 dark:text-amber-400">
                    ⚠️ প্রার্থীর বয়স এখনো ১৮ বছর পূর্ণ হয়নি (সরকারি চাকরির ন্যূনতম বয়স ১৮ বছর)।
                  </p>
                ) : calculation.overageGeneral ? (
                  <p className="text-red-700 dark:text-red-400">
                    সাধারণ কোটায় ৩০ বছরের বয়সসীমা অতিক্রম হয়েছে ({toBn(calculation.overageGeneral.years)} বছর {toBn(calculation.overageGeneral.months)} মাস {toBn(calculation.overageGeneral.days)} দিন বেশি)।
                  </p>
                ) : null}
              </div>
            </div>

            {/* Freedom Fighter & Disabled Quota Card (18 - 32) */}
            <div className={`p-5 rounded-2xl border transition ${
              calculation.isQuotaEligible 
                ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800' 
                : 'bg-red-50/60 dark:bg-red-950/20 border-red-300 dark:border-red-800'
            }`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    মুক্তিযোদ্ধা ও প্রতিবন্ধী কোটা (১৮ থেকে ৩২ বছর)
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mt-0.5">
                    কোটাভুক্ত প্রার্থীদের আবেদন
                  </h4>
                </div>
                {calculation.isQuotaEligible ? (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>যোগ্য</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-red-600 text-white text-xs font-bold flex items-center gap-1 shrink-0">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>অনুপযুক্ত</span>
                  </span>
                )}
              </div>

              <div className="mt-3 text-xs sm:text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {calculation.isQuotaEligible && calculation.remainingQuota ? (
                  <p>
                    🎖️ কোটায় আপনার চাকরির আবেদনের সময় বাকি আছে:{' '}
                    <strong className="text-emerald-700 dark:text-emerald-400 font-bold">
                      {toBn(calculation.remainingQuota.years)} বছর {toBn(calculation.remainingQuota.months)} মাস {toBn(calculation.remainingQuota.days)} দিন।
                    </strong>
                  </p>
                ) : (
                  <p className="text-red-700 dark:text-red-400">
                    কোটাভুক্ত বয়সসীমা (৩২ বছর) অতিক্রম হয়েছে।
                  </p>
                )}
              </div>
            </div>

          </div>

          {/* Breakdown Stats Grid */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-3">
              বয়সের বিস্তারিত পরিসংখ্যান (Life Breakdown)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                <span className="text-lg font-bold text-gray-900 dark:text-white font-mono block">
                  {toBn(calculation.totalMonths)}
                </span>
                <span className="text-xs text-gray-500">মোট মাস</span>
              </div>
              <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                <span className="text-lg font-bold text-gray-900 dark:text-white font-mono block">
                  {toBn(calculation.totalWeeks)}
                </span>
                <span className="text-xs text-gray-500">মোট সপ্তাহ</span>
              </div>
              <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                <span className="text-lg font-bold text-gray-900 dark:text-white font-mono block">
                  {toBn(calculation.totalDays.toLocaleString())}
                </span>
                <span className="text-xs text-gray-500">মোট দিন</span>
              </div>
              <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                <span className="text-lg font-bold text-gray-900 dark:text-white font-mono block">
                  {toBn(calculation.totalHours.toLocaleString())}
                </span>
                <span className="text-xs text-gray-500">মোট ঘণ্টা</span>
              </div>
            </div>
          </div>

        </div>
      ) : null}

      {/* Official Guidelines & Quota Age Limit Table */}
      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Info className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>বাংলাদেশ সরকারি চাকরির বয়সসীমার অফিসিয়াল নিয়মাবলী</span>
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          বাংলাদেশ সরকারি কর্ম কমিশন (BPSC) এবং জনপ্রশাসন মন্ত্রণালয়ের বিধিমালা অনুযায়ী বিভিন্ন ক্যাটাগরিতে সরকারি চাকরির আবেদনের বয়সসীমা নিম্নরূপ:
        </p>

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="p-3">প্রার্থীর ক্যাটাগরি / কোটা</th>
                <th className="p-3">সর্বনিম্ন বয়স</th>
                <th className="p-3">সর্বোচ্চ বয়সসীমা</th>
                <th className="p-3">প্রযোজ্য ক্ষেত্র</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-gray-800 dark:text-gray-200">
              <tr>
                <td className="p-3 font-semibold">সাধারণ প্রার্থী (General)</td>
                <td className="p-3">১৮ বছর</td>
                <td className="p-3 font-bold text-emerald-700 dark:text-emerald-400">৩০ বছর</td>
                <td className="p-3 text-gray-500">সকল সাধারণ নন-ক্যাডার ও ক্যাডার পদ</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">মুক্তিযোদ্ধা / শহীদ মুক্তিযোদ্ধার সন্তান</td>
                <td className="p-3">১৮ বছর</td>
                <td className="p-3 font-bold text-emerald-700 dark:text-emerald-400">৩২ বছর</td>
                <td className="p-3 text-gray-500">বিসিএস ও সকল সরকারি চাকরি</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">শারীরিক প্রতিবন্ধী প্রার্থী</td>
                <td className="p-3">১৮ বছর</td>
                <td className="p-3 font-bold text-emerald-700 dark:text-emerald-400">৩২ বছর</td>
                <td className="p-3 text-gray-500">কোটা সুবিধার আওতাধীন সকল পদ</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">বিসিএস স্বাস্থ্য ক্যাডার (সহকারী সার্জন)</td>
                <td className="p-3">২১ বছর</td>
                <td className="p-3 font-bold text-emerald-700 dark:text-emerald-400">৩২ বছর</td>
                <td className="p-3 text-gray-500">মেডিকেল ও ডেন্টাল সার্জন</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">বিভাগীয় প্রার্থী (Departmental Candidate)</td>
                <td className="p-3">১৮ বছর</td>
                <td className="p-3 font-bold text-emerald-700 dark:text-emerald-400">৩৫ বছর (বিধি মোতাবেক)</td>
                <td className="p-3 text-gray-500">নির্দিষ্ট মন্ত্রণালয় ও অধিদপ্তর</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
