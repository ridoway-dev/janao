import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { 
  BOOKS_DATA, 
  getBookByClassAndSlug, 
  getBooksByClass,
  CLASS_SHORTCUTS 
} from '@/data/nctbData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  BookOpen, 
  Download, 
  Calendar, 
  FileText, 
  HardDrive, 
  Layers, 
  ExternalLink, 
  ShieldCheck, 
  ArrowLeft,
  ChevronRight,
  Bookmark
} from 'lucide-react';

interface BookPageProps {
  params: Promise<{
    classId: string;
    bookSlug: string;
  }>;
}

export async function generateStaticParams() {
  // Generate routes for 2026 books
  return BOOKS_DATA.filter((b) => b.year === 2026).map((b) => ({
    classId: b.classLevel,
    bookSlug: b.slug,
  }));
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { classId, bookSlug } = await params;
  const book = getBookByClassAndSlug(classId, bookSlug);

  if (!book) {
    return { title: 'বই পাওয়া যায়নি | janao.online' };
  }

  const title = `${book.classNameBn} ${book.titleBn} ${book.year} PDF ডাউনলোড | ${book.titleEn} - janao.online`;
  const description = `জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) প্রকাশিত ${book.classNameBn}-এর ${book.titleBn} (${book.year} শিক্ষাবর্ষ) মূল পাঠ্যবই সম্পূর্ণ বিনামূল্যে ডাউনলোড ও অনলাইনে সরাসরি পড়ুন।`;

  return {
    title,
    description,
    keywords: [
      `${book.classNameBn} ${book.titleBn}`,
      `${book.titleEn} Class ${book.classLevel} PDF`,
      `NCTB ${book.year} Book Download`,
      `${book.titleBn} PDF`,
      `Class ${book.classLevel} Book 2026`,
    ],
    openGraph: {
      title,
      description,
      url: `https://janao.online/books/${classId}/${bookSlug}/`,
      siteName: 'janao.online',
      locale: 'bn_BD',
      type: 'article',
    },
    alternates: {
      canonical: `https://janao.online/books/${classId}/${bookSlug}/`,
    },
  };
}

export default async function BookDetailPage({ params }: BookPageProps) {
  const { classId, bookSlug } = await params;
  const book = getBookByClassAndSlug(classId, bookSlug);

  if (!book) {
    notFound();
  }

  // Related books from the same class
  const relatedBooks = getBooksByClass(classId, book.year).filter((b) => b.slug !== book.slug);

  // Schema.org structured data
  const bookSchema = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: `${book.classNameBn} ${book.titleBn}`,
    alternateName: book.titleEn,
    inLanguage: book.medium === 'bangla' ? 'bn' : 'en',
    bookFormat: 'https://schema.org/EBook',
    numberOfPages: book.pageCount,
    publisher: {
      '@type': 'Organization',
      name: book.publisher,
    },
    datePublished: `${book.year}-01-01`,
    description: book.descriptionBn,
    url: `https://janao.online/books/${classId}/${bookSlug}/`,
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
        name: 'পাঠ্যবই',
        item: 'https://janao.online/books/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: book.classNameBn,
        item: `https://janao.online/books/${classId}/`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: book.titleBn,
        item: `https://janao.online/books/${classId}/${bookSlug}/`,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <Header />

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6 overflow-x-auto whitespace-nowrap no-scrollbar">
          <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link href="/books/" className="hover:text-emerald-700 dark:hover:text-emerald-400">
            পাঠ্যবই
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link href={`/books/${classId}/`} className="hover:text-emerald-700 dark:hover:text-emerald-400">
            {book.classNameBn}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="font-semibold text-gray-900 dark:text-white truncate">
            {book.titleBn}
          </span>
        </nav>

        {/* Main Book Card */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-lg p-4 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Book Visual Box */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="w-48 h-64 bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-600 rounded-lg p-5 flex flex-col justify-between text-center shadow-md">
                <div className="flex justify-between items-center text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
                  <span>NCTB {book.year}</span>
                  <span>{book.mediumBn}</span>
                </div>
                <div className="my-auto">
                  <BookOpen className="w-10 h-10 mx-auto text-emerald-700 dark:text-emerald-400 mb-2" />
                  <h3 className="font-bold text-base text-gray-900 dark:text-white leading-snug">
                    {book.titleBn}
                  </h3>
                  <p className="text-xs text-gray-500 italic mt-0.5">{book.titleEn}</p>
                </div>
                <div className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 border-t border-emerald-200 dark:border-emerald-800 pt-1">
                  {book.classNameBn}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>বোর্ড প্রকাশিত মূল সংস্করণ</span>
              </div>
            </div>

            {/* Book Info & Download Section */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {book.classNameBn} · {book.year} শিক্ষাবর্ষ
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-2 leading-tight">
                  {book.titleBn}
                </h1>
                <p className="text-sm text-gray-500 font-mono mt-0.5">
                  Class {book.classLevel.replace('class-', '')} {book.titleEn} Book {book.year} PDF
                </p>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {book.descriptionBn}
              </p>

              {/* Specs Table */}
              <div className="border border-gray-200 dark:border-gray-800 rounded bg-gray-50/60 dark:bg-gray-800/40 divide-y divide-gray-200 dark:divide-gray-800 text-xs sm:text-sm">
                <div className="grid grid-cols-2 p-2.5">
                  <span className="text-gray-500">শ্রেণি:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{book.classNameBn}</span>
                </div>
                <div className="grid grid-cols-2 p-2.5">
                  <span className="text-gray-500">মাধ্যম / কারিকুলাম:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{book.mediumBn}</span>
                </div>
                <div className="grid grid-cols-2 p-2.5">
                  <span className="text-gray-500">শিক্ষাবর্ষ:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{book.year}</span>
                </div>
                <div className="grid grid-cols-2 p-2.5">
                  <span className="text-gray-500">প্রকাশক:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{book.publisher}</span>
                </div>
                <div className="grid grid-cols-2 p-2.5">
                  <span className="text-gray-500">পৃষ্ঠা সংখ্যা:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">প্রায় {book.pageCount} পৃষ্ঠা</span>
                </div>
                <div className="grid grid-cols-2 p-2.5">
                  <span className="text-gray-500">ফাইলের আকার:</span>
                  <span className="font-semibold text-gray-900 dark:text-white font-mono">{book.fileSizeBytes}</span>
                </div>
                <div className="grid grid-cols-2 p-2.5">
                  <span className="text-gray-500">অফিসিয়াল সোর্স:</span>
                  <span className="font-semibold text-gray-900 dark:text-white truncate">{book.source_name}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={book.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-5 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold text-sm text-center flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <Download className="w-4 h-4" />
                  <span>সরাসরি PDF ডাউনলোড করুন ({book.fileSizeBytes})</span>
                </a>

                <a
                  href={book.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded font-semibold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>ক্লাউড সোর্স</span>
                </a>
              </div>

              {/* Independent Platform Disclaimer */}
              <div className="pt-3 text-[11px] text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
                <strong>নিরাপত্তা ও কপিরাইট তথ্য:</strong> জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) প্রকাশিত এই পাঠ্যবইটির সকল স্বত্ব সংরক্ষিত। janao.online শিক্ষার্থীদের পড়াশোনার সুবিধার্থে উন্মুক্ত সোর্স থেকে ফাইল সরবরাহ করে।
              </div>

            </div>

          </div>
        </div>

        {/* Pillar Internal Linking: Other books of this class */}
        {relatedBooks.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center justify-between pb-2 mb-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {book.classNameBn}-এর অন্যান্য পাঠ্যবই
              </h2>
              <Link
                href={`/books/${classId}/`}
                className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
              >
                {book.classNameBn}-এর সব বই দেখুন →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
              {relatedBooks.slice(0, 8).map((rel) => (
                <Link
                  key={rel.id}
                  href={`/books/${classId}/${rel.slug}/`}
                  className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded p-3 hover:border-emerald-600 transition flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[10px] text-gray-400 block">{rel.mediumBn}</span>
                    <h3 className="font-bold text-xs text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition truncate mt-0.5">
                      {rel.titleBn}
                    </h3>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-[10px] text-gray-500">
                    <span>{rel.year}</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold group-hover:underline">দেখুন →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
