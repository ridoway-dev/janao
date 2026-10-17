import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { NOTICES_DATA, getNoticeBySlug } from '@/data/nctbData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle2, Calendar, ExternalLink, ChevronRight, Download } from 'lucide-react';

interface ResultPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return NOTICES_DATA.filter((n) => n.category === 'result').map((n) => ({
    slug: n.slug,
  }));
}

export async function generateMetadata({ params }: ResultPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getNoticeBySlug(slug);

  if (!item) {
    return { title: 'ফলাফল পাওয়া যায়নি | janao.online' };
  }

  return {
    title: `${item.title} - janao.online`,
    description: item.summary,
    alternates: {
      canonical: `https://janao.online/results/${slug}/`,
    },
  };
}

export default async function ResultArticlePage({ params }: ResultPageProps) {
  const { slug } = await params;
  const item = getNoticeBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full">
        
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/results/" className="hover:text-emerald-700 dark:hover:text-emerald-400">
            ফলাফল
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-gray-900 dark:text-white truncate">
            {item.title}
          </span>
        </nav>

        <article className="space-y-6">
          <div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              শিক্ষা বোর্ড ফলাফল
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-2 leading-tight">
              {item.title}
            </h1>
            <span className="text-xs text-gray-500 block mt-1">
              প্রকাশ: {item.date}
            </span>
          </div>

          <div className="p-4 rounded bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
            {item.summary}
          </div>

          {item.officialSource && (
            <div className="p-3.5 rounded bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs">
              <span><strong>অফিশিয়াল সূত্র:</strong> {item.officialSourceName}</span>
              <a
                href={item.officialSource}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>বোর্ড রেজাল্ট সার্ভার</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          <div className="text-sm leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-line py-2 border-t border-b border-gray-100 dark:border-gray-800">
            {item.content}
          </div>
        </article>

      </main>

      <Footer />
    </div>
  );
}
