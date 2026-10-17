'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'janao.online থেকে পাঠ্যবই ডাউনলোড করা কি সম্পূর্ণ বিনামূল্যে?',
      a: 'হ্যাঁ, janao.online এর সকল ক্লাসের (১ম থেকে ১২শ শ্রেণি) এবং মাদ্রাসা ইবতেদায়ি ও দাখিলের সকল বই শতভাগ বিনামূল্যে ও কোনো নিবন্ধন ছাড়া সরাসরি ডাউনলোড করা যায়।',
    },
    {
      q: 'এখানে কি ২০২৬ সালের নতুন শিক্ষাক্রমের বই পাওয়া যাবে?',
      a: 'হ্যাঁ, জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) কর্তৃক প্রণীত ২০২৬ শিক্ষাবর্ষের সকল পরিমার্জিত ও হালনাগাদ পাঠ্যবই এবং শিক্ষক সহায়িকা এখানে পিডিএফ আকারে সংযুক্ত রয়েছে।',
    },
    {
      q: 'ডাউনলোডকৃত পিডিএফ বইগুলো মোবাইলে কীভাবে পড়ব?',
      a: 'আপনার অ্যান্ড্রয়েড বা আইফোনে গুগল ড্রাইভ, অ্যাডোবি অ্যাক্রোব্যাট রিডার (Adobe Acrobat Reader) অথবা যেকোনো ডিফল্ট পিডিএফ ভিউয়ার দিয়ে খুব সহজে অফলাইনে বইগুলো পড়তে পারবেন।',
    },
    {
      q: 'পূর্ববর্তী শিক্ষাবর্ষের (২০২৫ ও ২০২৪) বই কীভাবে খুঁজে পাব?',
      a: 'আমাদের ওয়েবসাইটের হিরো সেকশনের বছর নির্বাচক (Year Selector) অথবা নোটিশ বোর্ডের পাশে "পুরানো শিক্ষাবর্ষের বই" আর্কাইভ থেকে সংশ্লিষ্ট বছরের উপর ক্লিক করলে বিগত বছরের বইগুলো পাওয়া যাবে।',
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-slate-900/50 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>সচরাচর জিজ্ঞাসা (FAQ)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            পাঠ্যবই ও ডাউনলোড সম্পর্কিত সাধারণ প্রশ্নাবলি
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-sm sm:text-base hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
