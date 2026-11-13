import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BOOKS_DATA } from '@/data/nctbData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BookOpen, Download, ChevronRight } from 'lucide-react';
import DownloadLink from '@/components/download/DownloadLink';

export const metadata: Metadata = {
  title: 'মাদ্রাসা দাখিল পাঠ্যবই ২০২৬ PDF | Dakhil Class 6-10 Books - janao.online',
  description: 'বাংলাদেশ মাদ্রাসা শিক্ষা বোর্ড অনুমোদিত দাখিল ৬ষ্ঠ থেকে ১০ম শ্রেণির সকল বিষয়ের পাঠ্যবই (কুরআন মাজীদ, হাদিস শরীফ, ফিকহ, আরবি ও সাধারণ বিজ্ঞান) ডাউনলোড ও পড়ার তালিকা।',
  alternates: {
    canonical: 'https://janao.online/madrasa/dakhil/',
    languages: {
      'bn-BD': 'https://janao.online/madrasa/dakhil/',
      'x-default': 'https://janao.online/madrasa/dakhil/',
    },
  },
};

export default function DakhilHubPage() {
  const dakhilBooks = BOOKS_DATA.filter((b) => b.category === 'dakhil' && b.year === 2026);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'হোম', item: 'https://janao.online/' },
      { '@type': 'ListItem', position: 2, name: 'পাঠ্যবই', item: 'https://janao.online/books/' },
      { '@type': 'ListItem', position: 3, name: 'মাদ্রাসা দাখিল (৬ষ্ঠ–১০ম)', item: 'https://janao.online/madrasa/dakhil/' },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/books/" className="hover:text-emerald-700 dark:hover:text-emerald-400">
            পাঠ্যবই
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-gray-900 dark:text-white">
            মাদ্রাসা দাখিল (৬ষ্ঠ–১০ম)
          </span>
        </nav>

        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-2">
            <span>দাখিল ও সমমান পরীক্ষা কারিকুলাম</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            দাখিল ৬ষ্ঠ থেকে ১০ম শ্রেণির পাঠ্যবই ২০২৬ PDF
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-3xl leading-relaxed">
            দাখিল পরীক্ষার হাদিস শরীফ, ফিকহ ও উসূলে ফিকহ, কাওয়াইদুল লুগাহ সহ সাধারণ বিষয়ের সকল বই নিচে দেওয়া রয়েছে।
          </p>
        </div>

        {/* About this level */}
        <section className="mb-8 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            দাখিল স্তরে কী কী বিষয় পড়ানো হয়
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            দাখিল স্তর মাধ্যমিক পর্যায়ের মাদ্রাসা শিক্ষা—৬ষ্ঠ থেকে ১০ম শ্রেণি পর্যন্ত। এখানে কুরআন মাজিদ ও তাজবীদ, হাদিস শরিফ, ফিকহ, আরবি ১ম ও ২য় পত্রের মতো ধর্মীয় বিষয়ের পাশাপাশি গণিত, বিজ্ঞান, বাংলা ও ইংরেজির মতো সাধারণ বিষয়ও পড়ানো হয়। দাখিল ৯ম ও ১০ম শ্রেণির বই একসঙ্গে তালিকাভুক্ত করা হয়েছে, কারণ এই দুই শ্রেণির পাঠ্যক্রম দাখিল পরীক্ষার প্রস্তুতির সঙ্গে যুক্ত। নিচের তালিকা থেকে শ্রেণি অনুযায়ী বই বেছে নিয়ে সরাসরি পড়ুন বা PDF ডাউনলোড করুন।
          </p>
        </section>

        {/* Quick Class filter pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['dakhil-6', 'dakhil-7', 'dakhil-8', 'dakhil-9'].map((cid, i) => (
            <Link
              key={cid}
              href={`/books/${cid}/`}
              className="px-3.5 py-1.5 rounded bg-gray-100 dark:bg-gray-800 hover:bg-emerald-700 hover:text-white text-xs font-semibold transition"
            >
              দাখিল {i === 3 ? '৯ম-১০ম' : `${i + 6}ষ্ঠ`} শ্রেণি →
            </Link>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {dakhilBooks.map((b) => (
            <div 
              key={b.id}
              className="p-3.5 rounded border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a] flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">{b.classNameBn}</span>
                <Link
                  href={`/books/${b.classLevel}/${b.slug}/`}
                  className="font-bold text-sm text-gray-900 dark:text-white hover:text-emerald-700 block mt-1"
                >
                  {b.titleBn}
                </Link>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{b.descriptionBn}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                <Link
                  href={`/books/${b.classLevel}/${b.slug}/`}
                  className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
                >
                  বিস্তারিত পড়ুন
                </Link>
                <DownloadLink
                  downloadUrl={b.downloadUrl}
                  filename={`${b.slug || b.id}.pdf`}
                  bookTitle={b.titleBn}
                  fileSize={b.fileSizeBytes}
                  className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[11px] font-medium"
                >
                  ডাউনলোড
                </DownloadLink>
              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
