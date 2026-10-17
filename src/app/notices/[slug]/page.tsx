import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { 
  NOTICES_DATA, 
  getNoticeBySlug 
} from '@/data/nctbData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Calendar, 
  Clock, 
  Download, 
  ExternalLink, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  FileText
} from 'lucide-react';

interface NoticePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return NOTICES_DATA.map((n) => ({
    slug: n.slug,
  }));
}

export async function generateMetadata({ params }: NoticePageProps): Promise<Metadata> {
  const { slug } = await params;
  const notice = getNoticeBySlug(slug);

  if (!notice) {
    return { title: 'নোটিশ পাওয়া যায়নি | janao.online' };
  }

  const title = `${notice.title} - janao.online`;
  const description = `${notice.summary} অফিসিয়াল নির্দেশনা, রুটিন ডাউনলোড ও পূর্ণাঙ্গ তথ্য।`;

  return {
    title,
    description,
    keywords: [
      notice.title,
      'শিক্ষা বোর্ড নোটিশ',
      'SSC Routine 2027',
      'HSC Routine 2027',
      'খাতা চ্যালেঞ্জ',
    ],
    openGraph: {
      title,
      description,
      url: `https://janao.online/notices/${slug}/`,
      siteName: 'janao.online',
      locale: 'bn_BD',
      type: 'article',
    },
    alternates: {
      canonical: `https://janao.online/notices/${slug}/`,
    },
  };
}

export default async function NoticeDetailPage({ params }: NoticePageProps) {
  const { slug } = await params;
  const notice = getNoticeBySlug(slug);

  if (!notice) {
    notFound();
  }

  const relatedNotices = NOTICES_DATA.filter((n) => n.slug !== notice.slug);

  // Schema.org Article & FAQ Schemas
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: notice.title,
    datePublished: '2026-10-01',
    dateModified: '2026-10-05',
    description: notice.summary,
    publisher: {
      '@type': 'Organization',
      name: 'janao.online',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'হোম',
        item: 'https://janao.online/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'নোটিশ ও রুটিন',
        item: 'https://janao.online/notices/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: notice.title,
        item: `https://janao.online/notices/${slug}/`,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/notices/" className="hover:text-emerald-700 dark:hover:text-emerald-400">
            নোটিশ
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-gray-900 dark:text-white truncate">
            {notice.title}
          </span>
        </nav>

        {/* Article Container */}
        <article className="space-y-6">
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                {notice.categoryBn}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                প্রকাশ: {notice.date}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {notice.title}
            </h1>
          </div>

          {/* Quick Summary Card */}
          <div className="p-4 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
              সংক্ষিপ্ত তথ্য (Summary)
            </span>
            <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
              {notice.summary}
            </p>
          </div>

          {/* Official Source & Verification Box */}
          {notice.officialSource && (
            <div className="p-3.5 rounded bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>অফিশিয়াল সোর্স:</strong> {notice.officialSourceName || 'শিক্ষা বোর্ড অফিশিয়াল ওয়েবসাইট'}
                </span>
              </div>
              <a
                href={notice.officialSource}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>বোর্ডের মূল বিজ্ঞপ্তিতে যান</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Detailed Content Body */}
          <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-line py-2 border-t border-b border-gray-100 dark:border-gray-800">
            {notice.content}
          </div>

          {/* Download CTA if applicable */}
          <div className="p-5 rounded-xl border border-emerald-300 dark:border-emerald-700/60 bg-emerald-50/40 dark:bg-emerald-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-bold text-sm sm:text-base text-gray-900 dark:text-white block">
                অফিসিয়াল ডকুমেন্ট / রুটিন / সিলেবাস সংরক্ষণ করুন
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-300">
                শিক্ষা বোর্ড ও এনসিটিবি কর্তৃক প্রকাশিত মূল ফাইল সরাসরি PDF আকারে ডাউনলোড করুন।
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <a
                href={notice.pdfUrl || notice.officialSource || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition shadow-xs text-center"
              >
                <Download className="w-4 h-4" />
                <span>📥 PDF ডাউনলোড করুন</span>
              </a>

              {notice.officialSource && (
                <a
                  href={notice.officialSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition"
                  title="অফিসিয়াল পোর্টাল"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>মূল সাইট</span>
                </a>
              )}
            </div>
          </div>

          {/* Embedded Google Drive PDF Preview if available */}
          {notice.pdfUrl && notice.pdfUrl.includes('drive.google.com/file/d/') && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-gray-50 dark:bg-[#0f172a]">
              <div className="px-4 py-3 bg-gray-100 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  সরাসরি ডকুমেন্ট প্রিভিউ (PDF Reader)
                </span>
                <a
                  href={notice.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>ফুলস্ক্রিনে খুলুন</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="w-full h-[550px] sm:h-[650px] bg-white">
                <iframe
                  src={notice.pdfUrl.replace('/view', '/preview')}
                  className="w-full h-full border-0"
                  title={notice.title}
                  allow="autoplay"
                />
              </div>
            </div>
          )}

          {/* Frequently Asked Questions (FAQ) */}
          {notice.faq && notice.faq.length > 0 && (
            <div className="pt-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>সাধারণ প্রশ্নাবলি (FAQ)</span>
              </h2>

              <div className="space-y-2.5">
                {notice.faq.map((item, i) => (
                  <div key={i} className="p-3.5 rounded border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40">
                    <h3 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white mb-1">
                      {item.q}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Notices */}
          {relatedNotices.length > 0 && (
            <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3">
                সম্পর্কিত অন্যান্য নোটিশ ও রুটিন
              </h2>
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {relatedNotices.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/notices/${rel.slug}/`}
                    className="py-2.5 flex items-center justify-between gap-2 group block"
                  >
                    <span className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 group-hover:underline">
                      {rel.title}
                    </span>
                    <span className="text-xs text-emerald-700 dark:text-emerald-400 shrink-0 font-medium">
                      দেখুন →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </article>

      </main>

      <Footer />
    </div>
  );
}
