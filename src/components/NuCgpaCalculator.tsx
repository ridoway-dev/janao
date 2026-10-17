'use client';

import React, { useState } from 'react';
import { NU_GRADING_SYSTEM } from '@/data/calculatorData';
import { Plus, Trash2, RotateCcw, GraduationCap, Calculator } from 'lucide-react';

interface NuCourse {
  id: string;
  name: string;
  credits: number;
  gradePoint: number;
}

const DEFAULT_COURSES: NuCourse[] = [
  { id: '1', name: 'কোর্স ১ (Course 101)', credits: 4, gradePoint: 3.75 },
  { id: '2', name: 'কোর্স ২ (Course 102)', credits: 4, gradePoint: 3.50 },
  { id: '3', name: 'কোর্স ৩ (Course 103)', credits: 4, gradePoint: 3.25 },
  { id: '4', name: 'কোর্স ৪ (Course 104)', credits: 4, gradePoint: 3.00 },
  { id: '5', name: 'কোর্স ৫ (Course 105)', credits: 4, gradePoint: 3.50 },
  { id: '6', name: 'কোর্স ৬ (Course 106)', credits: 2, gradePoint: 3.75 },
];

export default function NuCgpaCalculator() {
  const [degreeType, setDegreeType] = useState<'honours' | 'degree' | 'masters'>('honours');
  const [courses, setCourses] = useState<NuCourse[]>(DEFAULT_COURSES);

  const addCourse = () => {
    const newId = Date.now().toString();
    setCourses([
      ...courses,
      { id: newId, name: `কোর্স ${courses.length + 1}`, credits: 4, gradePoint: 3.50 },
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length <= 2) return;
    setCourses(courses.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, field: 'name' | 'credits' | 'gradePoint', value: any) => {
    setCourses(
      courses.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const resetAll = () => {
    setCourses(DEFAULT_COURSES);
  };

  // NU CGPA Formula: Sum(Credits * GradePoint) / Sum(Credits)
  const totalCredits = courses.reduce((sum, c) => sum + (Number(c.credits) || 0), 0);
  const totalQualityPoints = courses.reduce(
    (sum, c) => sum + (Number(c.credits) || 0) * (Number(c.gradePoint) || 0),
    0
  );

  const calculatedCgpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;
  const roundedCgpa = Math.round(calculatedCgpa * 100) / 100;

  const getClassDivision = (cgpa: number) => {
    if (cgpa >= 3.0) return 'First Class / ১ম বিভাগ (Honours Equivalent)';
    if (cgpa >= 2.25) return 'Second Class / ২য় বিভাগ';
    if (cgpa >= 2.0) return 'Third Class / ৩য় বিভাগ';
    return 'Failed / অকৃতকার্য';
  };

  return (
    <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100 dark:border-gray-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-1 rounded-md">
            জাতীয় বিশ্ববিদ্যালয় (NU)
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1.5 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-teal-600" />
            <span>NU অনার্স ও ডিগ্রি CGPA ক্যালকুলেটর</span>
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            ক্রেডিট আওয়ার ও লেটার গ্রেড অনুযায়ী জাতীয় বিশ্ববিদ্যালয়ের অফিসিয়াল ফর্মুলায় CGPA হিসাব।
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setDegreeType('honours')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              degreeType === 'honours'
                ? 'bg-white dark:bg-[#1e293b] text-teal-700 dark:text-teal-400 shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            অনার্স (Honours)
          </button>
          <button
            onClick={() => setDegreeType('degree')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              degreeType === 'degree'
                ? 'bg-white dark:bg-[#1e293b] text-teal-700 dark:text-teal-400 shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            ডিগ্রি (Degree)
          </button>
          <button
            onClick={() => setDegreeType('masters')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              degreeType === 'masters'
                ? 'bg-white dark:bg-[#1e293b] text-teal-700 dark:text-teal-400 shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            মাস্টার্স (Masters)
          </button>
        </div>
      </div>

      {/* Grid: Courses on Left, CGPA Result on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
        
        {/* Left: Course Rows */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 px-2 pb-1">
            <span>কোর্সের নাম</span>
            <div className="flex items-center gap-6 sm:gap-8">
              <span>ক্রেডিট (Credits)</span>
              <span>গ্রেড (Grade)</span>
              <span className="w-6"></span>
            </div>
          </div>

          {courses.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#141d2e] transition"
            >
              <input
                type="text"
                value={c.name}
                onChange={(e) => updateCourse(c.id, 'name', e.target.value)}
                className="flex-1 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:border-teal-500"
                placeholder="কোর্সের নাম / কোড"
              />

              {/* Credits Select */}
              <select
                value={c.credits}
                onChange={(e) => updateCourse(c.id, 'credits', parseInt(e.target.value))}
                className="w-16 sm:w-20 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 text-xs sm:text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 text-center"
              >
                <option value={4}>৪</option>
                <option value={3}>৩</option>
                <option value={2}>২</option>
                <option value={6}>৬</option>
              </select>

              {/* NU Grade Point Select */}
              <select
                value={c.gradePoint}
                onChange={(e) => updateCourse(c.id, 'gradePoint', parseFloat(e.target.value))}
                className="w-28 sm:w-32 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 text-xs sm:text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-teal-500"
              >
                {NU_GRADING_SYSTEM.map((g) => (
                  <option key={g.grade} value={g.point}>
                    {g.grade} ({g.point.toFixed(2)})
                  </option>
                ))}
              </select>

              {/* Delete Button */}
              <button
                onClick={() => removeCourse(c.id)}
                disabled={courses.length <= 2}
                className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition shrink-0"
                title="কোর্স মুছুন"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={addCourse}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 hover:bg-teal-100 rounded-xl transition border border-teal-200 dark:border-teal-800"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>আরও কোর্স যোগ করুন</span>
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

        {/* Right: CGPA Result Card */}
        <div className="flex flex-col gap-4">
          <div className="p-6 rounded-2xl border text-center transition-all bg-gradient-to-br from-teal-600 to-emerald-800 text-white border-transparent shadow-lg shadow-teal-600/20">
            <span className="text-xs font-bold uppercase tracking-wider block mb-1 text-teal-100">
              আপনার অর্জিত CGPA
            </span>

            <div className="text-5xl font-black my-2 tracking-tight text-white">
              {roundedCgpa.toFixed(2)}
            </div>

            <div className="text-sm font-bold text-teal-100 flex items-center justify-center gap-1.5">
              <span>{getClassDivision(roundedCgpa)}</span>
            </div>

            {/* Breakdown summary */}
            <div className="mt-4 pt-4 border-t border-teal-500/40 text-xs text-teal-50 space-y-1.5 text-left">
              <div className="flex justify-between">
                <span>মোট ক্রেডিট আওয়ার:</span>
                <span className="font-bold">{totalCredits} Credits</span>
              </div>
              <div className="flex justify-between">
                <span>মোট কোয়ালিটি পয়েন্ট:</span>
                <span className="font-bold">{totalQualityPoints.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>স্কেল:</span>
                <span className="font-bold">4.00 স্কেলে</span>
              </div>
            </div>
          </div>

          {/* NU Official Grading Scale */}
          <div className="bg-gray-50 dark:bg-[#141d2e] border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-xs">
            <span className="font-bold text-gray-900 dark:text-white block mb-2">
              NU লেটার গ্রেড ও গ্রেড পয়েন্ট:
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] text-gray-600 dark:text-gray-400">
              <div>A+ = 4.00 (৮০%+)</div>
              <div>A  = 3.75 (৭৫%+)</div>
              <div>A- = 3.50 (৭০%+)</div>
              <div>B+ = 3.25 (৬৫%+)</div>
              <div>B  = 3.00 (৬০%+)</div>
              <div>B- = 2.75 (৫৫%+)</div>
              <div>C+ = 2.50 (৫০%+)</div>
              <div>C  = 2.25 (৪৫%+)</div>
              <div>D  = 2.00 (৪০%+)</div>
              <div>F  = 0.00 (ফেল)</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
