import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdSlot from '@/components/ads/AdSlot';
import { Compass, Clock, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ভর্তি তথ্য ও বিশ্ববিদ্যালয়ের সার্কুলার ২০২৬-২০২৭ | Admission - janao.online',
  description: 'বিশ্ববিদ্যালয়, মেডিকেল, ইঞ্জিনিয়ারিং, জাতীয় বিশ্ববিদ্যালয় ও কলেজ ভর্তি পরীক্ষার তথ্য ও যোগ্যতা।',
  alternates: {
    canonical: 'https://janao.online/admission/',
    languages: {
      'bn-BD': 'https://janao.online/admission/',
      'x-default': 'https://janao.online/admission/',
    },
  },
};

export default function AdmissionHubPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'হোম', item: 'https://janao.online/' },
          { '@type': 'ListItem', position: 2, name: 'ভর্তি তথ্য', item: 'https://janao.online/admission/' },
        ],
      },
      {
        '@type': 'CollectionPage',
        name: 'বিশ্ববিদ্যালয় ও কলেজ ভর্তি পরীক্ষা',
        description:
          'পাবলিক বিশ্ববিদ্যালয়, মেডিকেল কলেজ, ইঞ্জিনিয়ারিং ও জাতীয় বিশ্ববিদ্যালয়ের ভর্তি তথ্য ও গাইডলাইন।',
        url: 'https://janao.online/admission/',
        inLanguage: 'bn-BD',
      },
    ],
  };

  const categories = [
    { name: 'জিএসটি গুচ্ছ বিশ্ববিদ্যালয়', count: '২৪টি বিশ্ববিদ্যালয়', status: 'আসন্ন', href: '/admission/university/2027/' },
    { name: 'মেডিকেল ও ডেন্টাল ভর্তি', count: 'এমবিবিএস ও বিডিএস', status: 'আসন্ন', href: '/admission/medical/2027/' },
    { name: 'বুয়েট ও ইঞ্জিনিয়ারিং গুচ্ছ', count: 'প্রকৌশল ভর্তি', status: 'আসন্ন', href: '/admission/engineering/2027/' },
    { name: 'ঢাকা বিশ্ববিদ্যালয় (DU)', count: 'ক, খ, গ, চ ইউনিট', status: 'আসন্ন', href: '/admission/university/2027/' },
    { name: 'জাতীয় বিশ্ববিদ্যালয় (NU)', count: 'ডিগ্রি ও অনার্স ভর্তি', status: 'চলমান', href: '/admission/nu/2027/' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full">
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-gray-900 dark:text-white">
            ভর্তি তথ্য (Admission)
          </span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          বিশ্ববিদ্যালয় ও কলেজ ভর্তি পরীক্ষা
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-8">
          পাবলিক বিশ্ববিদ্যালয়, মেডিকেল কলেজ, ইঞ্জিনিয়ারিং ও জাতীয় বিশ্ববিদ্যালয়ের ভর্তি তথ্য ও গাইডলাইন।
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat, i) => (
            <Link key={i} href={cat.href} className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a] flex items-center justify-between hover:border-emerald-600 dark:hover:border-emerald-500 transition group">
              <div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">{cat.name}</h3>
                <span className="text-xs text-gray-500">{cat.count}</span>
                <span className="block text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
                  ২০২৭ ভর্তি ট্র্যাকার →
                </span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium shrink-0">
                {cat.status}
              </span>
            </Link>
          ))}
        </div>

        {/* 2026-27 admission updates */}
        <section className="mt-8 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            ২০২৬–২৭ শিক্ষাবর্ষের ভর্তি আপডেট
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            ২০২৬–২৭ শিক্ষাবর্ষের ভর্তি মৌসুম এখন পুরোদমে চলছে। ঢাকা বিশ্ববিদ্যালয়ের আবেদন ১১ নভেম্বর থেকে শুরু হয়ে ২৫ নভেম্বর রাত ১১টা ৫৯ মিনিটে শেষ হবে, আর ভর্তি পরীক্ষা হবে ডিসেম্বরে—আইবিএ ৫ ডিসেম্বর, বিজ্ঞান ১২ ডিসেম্বর, কলা, আইন ও সামাজিক বিজ্ঞান ১৯ ডিসেম্বর, চারুকলা ২২ ডিসেম্বর এবং ব্যবসায় শিক্ষা ২৬ ডিসেম্বর। মেডিকেল ভর্তি পরীক্ষা (এমবিবিএস ও বিডিএস) হবে ১৮ ডিসেম্বর ২০২৬।
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            প্রকৌশল ভর্তিতে বুয়েটের পরীক্ষা ১৬ জানুয়ারি ২০২৭, আবেদন শুরু ২১ নভেম্বর থেকে। জাহাঙ্গীরনগর বিশ্ববিদ্যালয়ের পরীক্ষা ১০ থেকে ২১ জানুয়ারি, রাজশাহী বিশ্ববিদ্যালয়ের পরীক্ষা ফেব্রুয়ারিতে—বি ইউনিট ১২ ফেব্রুয়ারি, সি ইউনিট ১৩ ফেব্রুয়ারি ও এ ইউনিট ২০ ফেব্রুয়ারি। গুচ্ছ ভর্তি পরীক্ষা হবে ২০২৭ সালের মার্চে। জাতীয় বিশ্ববিদ্যালয়ের অনার্স ভর্তির বিজ্ঞপ্তি এখনো প্রকাশিত হয়নি—প্রকাশিত হলেই এই পাতায় যুক্ত হবে। প্রতিটি বিভাগের পাতায় আবেদনের যোগ্যতা, ফি ও অফিশিয়াল পোর্টালের লিংক দেওয়া আছে; আবেদনের আগে অবশ্যই অফিশিয়াল বিজ্ঞপ্তিটি মিলিয়ে নিন।
          </p>
        </section>

        {/* Sponsored slot: after the admission categories, before the footer */}
        <AdSlot format="banner" />

      </main>

      <Footer />
    </div>
  );
}
