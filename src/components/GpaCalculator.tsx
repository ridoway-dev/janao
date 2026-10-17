'use client';

import React, { useState } from 'react';
import { BD_GPA_SCALE } from '@/data/calculatorData';
import { Plus, Trash2, RotateCcw, Award, CheckCircle, AlertCircle } from 'lucide-react';

interface SubjectRow {
  id: string;
  name: string;
  gradePoint: number;
  isOptional: boolean;
}

const DEFAULT_SUBJECTS: SubjectRow[] = [
  { id: '1', name: 'বাংলা (Bangla)', gradePoint: 5.0, isOptional: false },
  { id: '2', name: 'ইংরেজি (English)', gradePoint: 5.0, isOptional: false },
  { id: '3', name: 'গণিত (Mathematics)', gradePoint: 5.0, isOptional: false },
  { id: '4', name: 'বিজ্ঞান / পদার্থ (Science)', gradePoint: 5.0, isOptional: false },
  { id: '5', name: 'বাংলাদেশ ও বিশ্বপরিচয় (BGS)', gradePoint: 5.0, isOptional: false },
  { id: '6', name: 'ধর্ম ও নৈতিক শিক্ষা (Religion)', gradePoint: 5.0, isOptional: false },
  { id: '7', name: 'ঐচ্ছিক বিষয় (Optional 4th Subject)', gradePoint: 5.0, isOptional: true },
];

export default function GpaCalculator() {
  const [examType, setExamType] = useState<'ssc' | 'hsc'>('ssc');
  const [subjects, setSubjects] = useState<SubjectRow[]>(DEFAULT_SUBJECTS);

  const addSubject = () => {
    const newId = Date.now().toString();
    setSubjects([
      ...subjects,
      { id: newId, name: `বিষয় ${subjects.length + 1}`, gradePoint: 5.0, isOptional: false },
    ]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length <= 2) return;
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const updateSubject = (id: string, field: 'name' | 'gradePoint' | 'isOptional', value: any) => {
    setSubjects(
      subjects.map((s) => {
        if (s.id === id) {
          return { ...s, [field]: value };
        }
        // If toggling optional, ensure only one optional exists
        if (field === 'isOptional' && value === true) {
          return { ...s, isOptional: s.id === id };
        }
        return s;
      })
    );
  };

  const resetAll = () => {
    setSubjects(DEFAULT_SUBJECTS);
  };

  // Calculation Logic (BD Board Standard: Optional subject bonus = GP - 2.0, if GP > 2)
  const regularSubjects = subjects.filter((s) => !s.isOptional);
  const optionalSubject = subjects.find((s) => s.isOptional);

  const hasFailed = regularSubjects.some((s) => s.gradePoint === 0);

  let finalGpa = 0;
  let totalPoints = 0;
  let optionalBonus = 0;

  if (!hasFailed && regularSubjects.length > 0) {
    totalPoints = regularSubjects.reduce((acc, curr) => acc + curr.gradePoint, 0);

    if (optionalSubject && optionalSubject.gradePoint > 2.0) {
      optionalBonus = optionalSubject.gradePoint - 2.0;
    }

    const calculated = (totalPoints + optionalBonus) / regularSubjects.length;
    finalGpa = Math.min(5.0, Math.round(calculated * 100) / 100);
  }

  const getGradeLetter = (gpa: number) => {
    if (hasFailed) return 'F (অকৃতকার্য)';
    if (gpa >= 5.0) return 'A+ (গোল্ডেন/জিপিএ ৫)';
    if (gpa >= 4.0) return 'A (ফার্স্ট ডিভিশন)';
    if (gpa >= 3.5) return 'A-';
    if (gpa >= 3.0) return 'B';
    if (gpa >= 2.0) return 'C';
    if (gpa >= 1.0) return 'D';
    return 'F';
  };

  return (
    <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-7 shadow-sm">
      {/* Top Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100 dark:border-gray-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md">
            শিক্ষা বোর্ড স্ট্যান্ডার্ড
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1.5">
            {examType === 'ssc' ? 'এসএসসি ও দাখিল' : 'এইচএসসি ও আলিম'} GPA ক্যালকুলেটর
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            ৪র্থ ঐচ্ছিক বিষয়ের বোনাস পয়েন্ট সহ নির্ভুল জিপিএ হিসাব।
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setExamType('ssc')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              examType === 'ssc'
                ? 'bg-white dark:bg-[#1e293b] text-emerald-700 dark:text-emerald-400 shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            SSC / দাখিল
          </button>
          <button
            onClick={() => setExamType('hsc')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              examType === 'hsc'
                ? 'bg-white dark:bg-[#1e293b] text-emerald-700 dark:text-emerald-400 shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            HSC / আলিম
          </button>
        </div>
      </div>

      {/* Main Grid: Inputs on Left/Center, Result Card on Right/Top */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
        
        {/* Left: Subject Rows */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 px-2 pb-1">
            <span>বিষয়ের নাম</span>
            <div className="flex items-center gap-6">
              <span>প্রাপ্ত গ্রেড / পয়েন্ট</span>
              <span>৪র্থ বিষয়?</span>
              <span className="w-6"></span>
            </div>
          </div>

          {subjects.map((s, idx) => (
            <div
              key={s.id}
              className={`flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl border transition ${
                s.isOptional
                  ? 'border-amber-300 dark:border-amber-800/80 bg-amber-50/40 dark:bg-amber-950/20'
                  : 'border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#141d2e]'
              }`}
            >
              <input
                type="text"
                value={s.name}
                onChange={(e) => updateSubject(s.id, 'name', e.target.value)}
                className="flex-1 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500"
                placeholder="বিষয়ের নাম"
              />

              {/* Grade Point Select */}
              <select
                value={s.gradePoint}
                onChange={(e) => updateSubject(s.id, 'gradePoint', parseFloat(e.target.value))}
                className="w-28 sm:w-32 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 text-xs sm:text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                {BD_GPA_SCALE.map((g) => (
                  <option key={g.grade} value={g.point}>
                    {g.grade} ({g.point.toFixed(2)})
                  </option>
                ))}
              </select>

              {/* Optional Subject Radio/Checkbox */}
              <label className="flex items-center gap-1 cursor-pointer shrink-0 px-1" title="৪র্থ ঐচ্ছিক বিষয় হিসেবে নির্বাচন করুন">
                <input
                  type="checkbox"
                  checked={s.isOptional}
                  onChange={(e) => updateSubject(s.id, 'isOptional', e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="text-[11px] font-medium hidden sm:inline text-gray-600 dark:text-gray-400">
                  ৪র্থ
                </span>
              </label>

              {/* Delete Button */}
              <button
                onClick={() => removeSubject(s.id)}
                disabled={subjects.length <= 2}
                className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition shrink-0"
                title="বিষয় মুছুন"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={addSubject}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 rounded-xl transition border border-emerald-200 dark:border-emerald-800"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>আরও বিষয় যোগ করুন</span>
            </button>

            <button
              onClick={resetAll}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>রিসেট</span>
            </button>
          </div>
        </div>

        {/* Right: Live Calculation Result Card */}
        <div className="flex flex-col gap-4">
          <div className={`p-6 rounded-2xl border text-center transition-all ${
            hasFailed
              ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900'
              : finalGpa >= 5.0
              ? 'bg-gradient-to-br from-emerald-500 to-teal-700 text-white border-transparent shadow-lg shadow-emerald-500/20'
              : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
          }`}>
            <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${
              finalGpa >= 5.0 && !hasFailed ? 'text-emerald-100' : 'text-gray-500 dark:text-gray-400'
            }`}>
              আপনার চূড়ান্ত ফলাফল (GPA)
            </span>

            <div className={`text-5xl font-black my-2 tracking-tight ${
              finalGpa >= 5.0 && !hasFailed
                ? 'text-white'
                : hasFailed
                ? 'text-red-600 dark:text-red-400'
                : 'text-emerald-700 dark:text-emerald-400'
            }`}>
              {hasFailed ? '0.00' : finalGpa.toFixed(2)}
            </div>

            <div className={`text-sm font-bold flex items-center justify-center gap-1.5 ${
              finalGpa >= 5.0 && !hasFailed ? 'text-amber-200' : 'text-gray-800 dark:text-gray-200'
            }`}>
              {finalGpa >= 5.0 && !hasFailed && <Award className="w-4 h-4 text-amber-300" />}
              <span>{getGradeLetter(finalGpa)}</span>
            </div>

            {/* Breakdown summary */}
            <div className={`mt-4 pt-4 border-t text-xs text-left space-y-1.5 ${
              finalGpa >= 5.0 && !hasFailed
                ? 'border-emerald-400/40 text-emerald-50'
                : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300'
            }`}>
              <div className="flex justify-between">
                <span>আবশ্যিক বিষয় সংখ্যা:</span>
                <span className="font-bold">{regularSubjects.length} টি</span>
              </div>
              <div className="flex justify-between">
                <span>৪র্থ বিষয়ের বোনাস পয়েন্ট:</span>
                <span className="font-bold">+{optionalBonus.toFixed(2)}</span>
              </div>
              {hasFailed && (
                <div className="flex items-center gap-1 text-red-600 dark:text-red-400 font-bold pt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>কোনো একটি বিষয়ে ফেল করলে মোট জিপিএ ০.০০ হয়।</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Grading Scale Table */}
          <div className="bg-gray-50 dark:bg-[#141d2e] border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-xs">
            <span className="font-bold text-gray-900 dark:text-white block mb-2">
              শিক্ষা বোর্ড গ্রেডিং স্কেল:
            </span>
            <div className="grid grid-cols-3 gap-1.5 text-[11px] text-gray-600 dark:text-gray-400">
              <div>৮০-১০০ = A+ (৫.০)</div>
              <div>৭০-৭৯ = A (৪.০)</div>
              <div>৬০-৬৯ = A- (৩.৫)</div>
              <div>৫০-৫৯ = B (৩.০)</div>
              <div>৪০-৪৯ = C (২.০)</div>
              <div>৩৩-৩৯ = D (১.০)</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
