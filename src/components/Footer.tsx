'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <footer className="bg-gray-50 dark:bg-[#0b0f19] border-t border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 text-xs py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-3">
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white text-sm">
            NCTB Books 2026
          </h4>
          <p className="text-gray-500 dark:text-gray-400 mt-0.5">
            Download Class 1-12 PDF Books
          </p>
        </div>

        {/* Competitor's exact links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
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
          janao.click · সব বই বিনামূল্যে ডাউনলোডযোগ্য
        </p>

        <p className="text-[11px] text-gray-400 dark:text-gray-500 max-w-2xl mx-auto">
          ডিসক্লেইমার: এই ওয়েবসাইটের সকল পাঠ্যবই জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) বাংলাদেশ সরকারের উন্মুক্ত ওয়েবসাইট থেকে সংগ্রহ করা হয়েছে।
        </p>
      </div>

      {/* Clean Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-5 max-w-md w-full border border-gray-200 dark:border-gray-800 text-left">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
              {activeModal === 'about' && 'আমাদের সম্পর্কে'}
              {activeModal === 'privacy' && 'গোপনীয়তা নীতি'}
              {activeModal === 'disclaimer' && 'Disclaimer (দায়মুক্তি)'}
              {activeModal === 'contact' && 'যোগাযোগ'}
            </h3>

            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed my-3">
              {activeModal === 'about' &&
                'janao.click হলো বাংলাদেশের শিক্ষার্থীদের জন্য একটি ওপেন এডুকেশনাল পোর্টাল, যেখান থেকে ১ম থেকে ১২শ শ্রেণির পাঠ্যবই, রুটিন ও নোটিশ সহজে খুঁজে পাওয়া যায়।'}
              {activeModal === 'privacy' &&
                'আমরা কোনো ব্যবহারকারীর ব্যক্তিগত তথ্য সংগ্রহ বা সংরক্ষণ করি না। আপনি নিরাপদে বই পড়তে ও ডাউনলোড করতে পারবেন।'}
              {activeModal === 'disclaimer' &&
                'সকল বই ও সিলেবাসের মূল কপিরাইট বাংলাদেশ সরকারের জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) এর নিজস্ব।'}
              {activeModal === 'contact' &&
                'যেকোনো প্রশ্ন বা পরামর্শের জন্য যোগাযোগ করুন: info@janao.click'}
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
