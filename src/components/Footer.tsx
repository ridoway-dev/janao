'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <footer className="bg-gray-50 dark:bg-[#0b0f19] border-t border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 text-xs py-8 pb-24 lg:pb-8 mt-12">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 text-center space-y-3">
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white text-sm">
            Janao.online — শিক্ষা, চাকরি, ভর্তি ও প্রয়োজনীয় তথ্য
          </h4>
          <p className="text-gray-500 dark:text-gray-400 mt-0.5">
            বাংলাদেশি শিক্ষার্থীদের জন্য নির্ভরযোগ্য উন্মুক্ত তথ্য ও শিক্ষা নির্দেশিকা
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs font-medium">
          <button
            onClick={() => setActiveModal('about')}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 hover:underline"
          >
            আমাদের সম্পর্কে
          </button>
          <span>·</span>
          <button
            onClick={() => setActiveModal('privacy')}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 hover:underline"
          >
            গোপনীয়তা নীতি
          </button>
          <span>·</span>
          <button
            onClick={() => setActiveModal('disclaimer')}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 hover:underline"
          >
            Disclaimer
          </button>
          <span>·</span>
          <button
            onClick={() => setActiveModal('contact')}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 hover:underline"
          >
            যোগাযোগ
          </button>
        </div>

        <p className="text-gray-500 dark:text-gray-400 pt-2">
          © {new Date().getFullYear()} janao.online · শিক্ষা ও চাকরি নির্দেশিকা পোর্টাল
        </p>

        <p className="text-[11px] text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          <strong>দায়মুক্তি (Disclaimer):</strong> Janao.online একটি স্বাধীন শিক্ষামূলক তথ্যভিত্তিক ওয়েবসাইট। এটি জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) বা বাংলাদেশ সরকারের কোনো সরকারি ওয়েবসাইট নয় এবং তাদের দ্বারা অনুমোদিত বা পরিচালিত নয়। সকল পাঠ্যবই ও তথ্যের মূল কপিরাইট ও স্বত্ব তাদের নিজস্ব কর্তৃপক্ষের।
        </p>
      </div>

      {/* Clean Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50" onClick={() => setActiveModal(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-lg p-5 max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-800 text-left" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
              {activeModal === 'about' && 'আমাদের সম্পর্কে'}
              {activeModal === 'privacy' && 'গোপনীয়তা নীতি'}
              {activeModal === 'disclaimer' && 'Disclaimer (দায়মুক্তি)'}
              {activeModal === 'contact' && 'যোগাযোগ'}
            </h3>

            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed my-3">
              {activeModal === 'about' &&
                'janao.online হলো বাংলাদেশের শিক্ষার্থীদের জন্য একটি ওপেন এডুকেশনাল পোর্টাল, যেখান থেকে ১ম থেকে ১২শ শ্রেণির পাঠ্যবই, রুটিন ও নোটিশ সহজে খুঁজে পাওয়া যায়।'}
              {activeModal === 'privacy' &&
                'আমরা কোনো ব্যবহারকারীর ব্যক্তিগত তথ্য সংগ্রহ বা সংরক্ষণ করি না। আপনি নিরাপদে বই পড়তে ও ডাউনলোড করতে পারবেন।'}
              {activeModal === 'disclaimer' &&
                'সকল বই ও সিলেবাসের মূল কপিরাইট বাংলাদেশ সরকারের জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) এর নিজস্ব।'}
              {activeModal === 'contact' &&
                'যেকোনো প্রশ্ন বা পরামর্শের জন্য যোগাযোগ করুন: info@janao.online'}
            </p>

            <button
              onClick={() => setActiveModal(null)}
              className="mt-2 w-full py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold rounded"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
