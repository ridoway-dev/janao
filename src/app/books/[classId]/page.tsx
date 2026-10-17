import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { 
  getBooksByClass, 
  CLASS_SHORTCUTS,
  Book 
} from '@/data/nctbData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  BookOpen, 
  Download, 
  ChevronRight, 
  FileText, 
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ClassPageProps {
  params: Promise<{
    classId: string;
  }>;
}

export async function generateStaticParams() {
  const classIds = new Set<string>();
  CLASS_SHORTCUTS.forEach((group) => {
    group.classes.forEach((c) => classIds.add(c.id));
  });
  return Array.from(classIds).map((id) => ({ classId: id }));
}

export async function generateMetadata({ params }: ClassPageProps): Promise<Metadata> {
  const { classId } = await params;
  const books = getBooksByClass(classId, 2026);
  const className = books[0]?.classNameBn || classId;

  const title = `${className}-এর সকল NCTB বই ২০২৬ PDF ডাউনলোড | Class Books - janao.online`;
  const description = `${className}-এর সকল বিষয়ের (বাংলা, গণিত, বিজ্ঞান, ইংরেজি সহ) নতুন শিক্ষাক্রম ২০২৬ সালের মূল বোর্ড পাঠ্যবই সম্পূর্ণ বিনামূল্যে ডাউনলোড ও পড়ার তালিকা।`;

  return {
    title,
    description,
    keywords: [
      `${className} বই ২০২৬`,
      `${classId} all books pdf`,
      `NCTB ${className} পাঠ্যবই`,
      `Class ${classId} books 2026 bangladesh`,
    ],
    openGraph: {
      title,
      description,
      url: `https://janao.online/books/${classId}/`,
      siteName: 'janao.online',
      locale: 'bn_BD',
      type: 'website',
    },
    alternates: {
      canonical: `https://janao.online/books/${classId}/`,
    },
  };
}

export default async function ClassPillarPage({ params }: ClassPageProps) {
  const { classId } = await params;
  const books = getBooksByClass(classId, 2026);

  if (!books || books.length === 0) {
    notFound();
  }

  const className = books[0].classNameBn;

  // Breadcrumbs Schema
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
        name: 'পাঠ্যবই',
        item: 'https://janao.online/books/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: className,
        item: `https://janao.online/books/${classId}/`,
      },
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
        
        {/* Breadcrumb Navigation */}
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
            {className}
          </span>
        </nav>

        {/* Pillar Header with 100-300 words unique editorial content */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span className="px-2.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
              এনসিটিবি শিক্ষাক্রম
            </span>
            <span className="text-xs text-gray-400">
              সর্বশেষ সংস্করণ ২০২৬ · ২০২৭ প্রকাশনা ট্র্যাকার সক্রিয়
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {className}-এর সকল পাঠ্যবই ২০২৬ ও ২০২৭ PDF ডাউনলোড
          </h1>

          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-3 leading-relaxed space-y-2">
            <p>
              জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) কর্তৃক প্রকাশিত {className}-এর সকল বিষয়ের মূল পাঠ্যবই এই পেজে একত্রিত করা হয়েছে। আপনি বাংলা মাধ্যম ও ইংরেজি সংস্করণ—উভয় মাধ্যমের প্রতিটি বিষয়ের বই আলাদাভাবে সরাসরি অনলাইনে পড়তে এবং অফলাইনে পড়ার জন্য উচ্চমানের PDF ফাইল বিনামূল্যে ডাউনলোড করতে পারবেন।
            </p>
            <p>
              আমাদের সার্ভার থেকে সরকারি ক্লাউড স্টোরেজের সাথে সরাসরি ইন্টিগ্রেশন থাকায় কোনো প্রকার বিলম্ব ছাড়াই দ্রুততম সময়ে বই সংগ্রহ করা সম্ভব। এছাড়া ২০২৭ শিক্ষাবর্ষের নতুন ও পরিমার্জিত শিক্ষাক্রমের বই মুদ্রণ হওয়ার সাথে সাথে তা এই পেজে স্বয়ংক্রিয়ভাবে আপডেট করা হবে।
            </p>
          </div>

          {/* 2027 Tracker Banner */}
          <div className="mt-5 p-4 rounded-xl border border-amber-300 dark:border-amber-800/80 bg-amber-50/60 dark:bg-amber-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
              <span className="font-bold text-amber-900 dark:text-amber-200">
                {className} ২০২৭ প্রকাশনা ট্র্যাকার:
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                মুদ্রণ ও বোর্ডের অনুমোদন সাপেক্ষে ২০২৭-এর লিংক যুক্ত হচ্ছে
              </span>
            </div>
            <Link
              href={`/books/2027/${classId}/`}
              className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-600 text-white font-semibold transition shrink-0 inline-flex items-center gap-1"
            >
              <span>২০২৭ ট্র্যাকার পেজ দেখুন →</span>
            </Link>
          </div>
        </div>

        {/* Book List Table / Grid */}
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-[#0f172a] shadow-xs">
          <div className="p-4 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <span className="font-bold text-sm text-gray-900 dark:text-white">
              {className}-এর বিষয়ভিত্তিক বইয়ের তালিকা (মোট {books.length} টি)
            </span>
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
              বিনামূল্যে ডাউনলোডযোগ্য
            </span>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {books.map((b) => (
              <div 
                key={b.id} 
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-12 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-col items-center justify-center text-emerald-800 dark:text-emerald-300 shrink-0 mt-0.5">
                    <FileText className="w-4 h-4" />
                    <span className="text-[9px] font-bold mt-0.5">PDF</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/books/${classId}/${b.slug}/`}
                        className="font-bold text-base text-gray-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 hover:underline"
                      >
                        {b.titleBn}
                      </Link>
                      <span className="text-[11px] px-1.5 py-0.2 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                        {b.mediumBn}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 italic">
                      {b.titleEn} · {b.fileSizeBytes} · {b.pageCount} পৃষ্ঠা
                    </p>
                  </div>
                </div>

                <div className="w-full sm:w-auto flex items-center justify-end gap-2 mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-0 border-gray-100 dark:border-gray-800/60 shrink-0">
                  <Link
                    href={`/books/${classId}/${b.slug}/`}
                    className="flex-1 sm:flex-initial text-center px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold transition"
                  >
                    বইয়ের পেজ
                  </Link>

                  <a
                    href={b.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial text-center px-3.5 py-1.5 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF ডাউনলোড</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Useful FAQs Section for Pillar Page */}
        <section className="mt-12 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-6">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4">
            {className}-এর পাঠ্যবই সম্পর্কিত সাধারণ জিজ্ঞাসাবলী (FAQ)
          </h2>
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-3 bg-white dark:bg-gray-900/60 rounded border border-gray-200 dark:border-gray-800">
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                ১. {className}-এর বইগুলো কি সম্পূর্ণ বিনামূল্যে ডাউনলোড করা যাবে?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-xs">
                হ্যাঁ, জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) কর্তৃক অনুমোদিত সকল বই আমাদের ওয়েবসাইট থেকে শিক্ষার্থীদের জন্য সম্পূর্ণ বিনামূল্যে সরাসরি ক্লাউড লিংক থেকে ডাউনলোড করা যায়।
              </p>
            </div>
            <div className="p-3 bg-white dark:bg-gray-900/60 rounded border border-gray-200 dark:border-gray-800">
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                ২. ২০২৭ সালের নতুন শিক্ষাক্রমের বই কবে পাওয়া যাবে?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-xs">
                এনসিটিবি বোর্ড কর্তৃক চূড়ান্ত পাঠ্যপুস্তক মুদ্রিত ও ডিজিটাল ফরম্যাটে প্রকাশ হওয়ার সাথে সাথেই ২০২৭ ট্র্যাকার পেজে সরাসরি মূল পিডিএফ ডাউনলোড লিংক উন্মুক্ত করা হবে।
              </p>
            </div>
          </div>
        </section>

        {/* Cross-Class Navigation (Point 11: SEO Topic Graph) */}
        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3">
            অন্যান্য শ্রেণির পাঠ্যবইসমূহ (Class Pillar Pages)
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-xs">
            {CLASS_SHORTCUTS.flatMap((g) => g.classes).map((cls) => (
              <Link
                key={cls.id}
                href={`/books/${cls.id}/`}
                className={`p-2.5 rounded border text-center font-medium transition ${
                  cls.id === classId
                    ? 'bg-emerald-700 text-white border-emerald-700 font-bold'
                    : 'bg-white dark:bg-[#0f172a] border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-emerald-600'
                }`}
              >
                {cls.label}
              </Link>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
