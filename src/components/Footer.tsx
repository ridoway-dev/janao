'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, ShieldCheck, Heart, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand & Mission (2 cols on LG) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                janao<span className="text-emerald-500">.click</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              janao.click হলো জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুমোদিত ১ম থেকে ১২শ শ্রেণির পাঠ্যবই, রুটিন, মডেল টেস্ট ও বোর্ড নোটিশ বিনামূল্যে ডাউনলোডের বিশ্বস্ত প্ল্যাটফর্ম।
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>১০০% নিরাপদ ও অফিশিয়াল পিডিএফ রিসোর্স</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3">
              শ্রেণিভিত্তিক পাঠ্যবই
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#categories" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  প্রাথমিক শ্রেণি ১–৫ (Primary)
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  মাধ্যমিক শ্রেণি ৬–১০ (Secondary)
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  মাদ্রাসা ইবতেদায়ি ১–৫
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  মাদ্রাসা দাখিল ৬–১০
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  উচ্চ মাধ্যমিক (HSC/আলিম)
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  শিক্ষক সহায়িকা নির্দেশিকা
                </a>
              </li>
            </ul>
          </div>

          {/* Routine & Boards */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3">
              পরীক্ষা ও রুটিন
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#notices" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  এসএসসি রুটিন ২০২৭
                </a>
              </li>
              <li>
                <a href="#notices" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  এইচএসসি রুটিন ২০২৭
                </a>
              </li>
              <li>
                <a href="#notices" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  খাতা চ্যালেঞ্জ ও পুনঃনিরীক্ষণ
                </a>
              </li>
              <li>
                <a href="#notices" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  প্রাথমিক বৃত্তি ফলাফল
                </a>
              </li>
              <li>
                <a 
                  href="http://www.educationboardresults.gov.bd/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition flex items-center gap-1"
                >
                  <span>অনলাইন রেজাল্ট পোর্টাল</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & About */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3">
              তথ্য ও নীতি
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveModal('about')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition text-left"
                >
                  আমাদের সম্পর্কে (About Us)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('privacy')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition text-left"
                >
                  গোপনীয়তা নীতি (Privacy Policy)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('disclaimer')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition text-left"
                >
                  দায়মুক্তি (Disclaimer)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('contact')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition text-left"
                >
                  যোগাযোগ (Contact)
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl">
          <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">
            আইনি বিজ্ঞপ্তি ও ডিসক্লেইমার:
          </p>
          janao.click কোনো সরকারি সংস্থা নয়। এই ওয়েবসাইটে প্রদর্শিত সকল বই, সিলেবাস এবং নোটিশ গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) এবং শিক্ষা মন্ত্রণালয়ের উন্মুক্ত ওয়েব পোর্টাল থেকে শিক্ষার্থীদের সুবিধার জন্য একত্রিত করা হয়েছে। সকল বইয়ের কপিরাইট এবং মেধা স্বত্ব NCTB কর্তৃক সংরক্ষিত।
        </div>

        {/* Bottom Credits */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} janao.click · সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-1">
            <span>Made with precision for students across Bangladesh</span>
          </div>
        </div>
      </div>

      {/* Info Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {activeModal === 'about' && 'আমাদের সম্পর্কে (About janao.click)'}
              {activeModal === 'privacy' && 'গোপনীয়তা নীতি (Privacy Policy)'}
              {activeModal === 'disclaimer' && 'দায়মুক্তি বিজ্ঞপ্তি (Disclaimer)'}
              {activeModal === 'contact' && 'যোগাযোগ (Contact Us)'}
            </h3>

            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2.5 my-4">
              {activeModal === 'about' && (
                <p>
                  janao.click বাংলাদেশের শিক্ষার্থীদের ডিজিটাল শিক্ষা সহায়ক পোর্টাল। আমাদের লক্ষ্য দেশের প্রতিটি প্রত্যন্ত অঞ্চলের ছাত্র-ছাত্রী ও শিক্ষকদের কাছে এনসিটিবি অনুমোদিত বই, পাঠ্যক্রম, রুটিন এবং রেজাল্ট দ্রুত ও সহজ উপায়ে পৌঁছে দেওয়া।
                </p>
              )}
              {activeModal === 'privacy' && (
                <p>
                  janao.click ব্যবহারকারীদের ব্যক্তিগত গোপনীয়তাকে সর্বোচ্চ অগ্রাধিকার দেয়। আমরা কোনো ব্যবহারকারীর ব্যক্তিগত তথ্য সংগ্রহ বা সংরক্ষণ করি না। আপনি নিরাপদে এবং নিশ্চিন্তে বই ডাউনলোড ও ব্রাউজ করতে পারবেন।
                </p>
              )}
              {activeModal === 'disclaimer' && (
                <p>
                  এই ওয়েবসাইটের সকল বই ও কন্টেন্ট জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) বাংলাদেশ-এর পাবলিক ডোমেইন থেকে সংগৃহীত। বইয়ের মূল কপিরাইট এবং মেধাস্বত্ব বাংলাদেশ সরকারের NCTB বোর্ডের।
                </p>
              )}
              {activeModal === 'contact' && (
                <p>
                  যেকোনো প্রশ্ন, পরামর্শ বা ফিডব্যাকের জন্য আমাদের ইমেইল করতে পারেন:
                  <br />
                  <strong className="text-emerald-600 font-mono">support@janao.click</strong>
                </p>
              )}
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
