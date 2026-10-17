import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BookOpen, ChevronRight, Clock, AlertCircle, FileText, ArrowLeft, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { BOOKS_DATA, getBookByClassAndSlug, getBooksByClass } from '@/data/nctbData';

interface Book2027PageProps {
  params: Promise<{
    classId: string;
    bookSlug: string;
  }>;
}

export async function generateStaticParams() {
  const books2026 = BOOKS_DATA.filter((b) => b.year === 2026);
  return books2026.map((book) => ({
    classId: book.classLevel,
    bookSlug: book.slug,
  }));
}

export async function generateMetadata({ params }: Book2027PageProps): Promise<Metadata> {
  const { classId, bookSlug } = await params;
  const book = getBookByClassAndSlug(classId, bookSlug);

  if (!book) {
    return {
      title: 'বই পাওয়া যায়নি | Janao.online',
    };
  }

  return {
    title: `${book.classNameBn} ${book.titleBn} ২০২৭ PDF — NCTB Book 2027 Tracker | Janao.online`,
    description: `জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) ২০২৭ শিক্ষাবর্ষের ${book.classNameBn}-এর ${book.titleBn} পাঠ্যবই প্রকাশনা ও মুদ্রণ ট্র্যাকার। চূড়ান্ত প্রকাশের সাথে সাথে আপডেট।`,
    keywords: [
      `${book.classNameBn} ${book.titleBn} 2027`,
      `${book.titleEn} 2027 PDF`,
      `Class ${book.classLevel.replace('class-', '')} ${book.titleEn} 2027`,
      `NCTB Book 2027 ${book.titleBn}`,
    ],
    alternates: {
      canonical: `https://janao.online/books/2027/${classId}/${bookSlug}/`,
    },
  };
}

export default async function Book2027Page({ params }: Book2027PageProps) {
  const { classId, bookSlug } = await params;
  const book = getBookByClassAndSlug(classId, bookSlug);

  if (!book) {
    notFound();
  }

  const peerBooks = getBooksByClass(classId, 2026).filter((b) => b.id !== book.id).slice(0, 6);

  const bookSchema = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: `${book.titleBn} ২০২৭ (${book.titleEn})`,
    inLanguage: book.medium === 'bangla' ? 'bn' : 'en',
    publisher: {
      '@type': 'Organization',
      name: 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB)',
    },
    educationalLevel: book.classNameBn,
    bookFormat: 'https://schema.org/EBook',
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
        name: '২০২৭ পাঠ্যবই',
        item: 'https://janao.online/books/2027/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${book.classNameBn} ২০২৭`,
        item: `https://janao.online/books/2027/${classId}/`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: `${book.titleBn} ২০২৭`,
        item: `https://janao.online/books/2027/${classId}/${bookSlug}/`,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6 flex-wrap">
          <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">হোম</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/books/2027/" className="hover:text-emerald-700 dark:hover:text-emerald-400">২০২৭ পাঠ্যবই</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/books/2027/${classId}/`} className="hover:text-emerald-700 dark:hover:text-emerald-400">
            {book.classNameBn} ২০২৭
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white font-medium">{book.titleBn} ২০২৭</span>
        </nav>

        {/* Hero Card */}
        <div className="border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 rounded-xl p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Clock className="w-4 h-4" />
            <span>NCTB শিক্ষাবর্ষ ২০২৭ প্রকাশনা ট্র্যাকার</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {book.classNameBn} {book.titleBn} ২০২৭ PDF
          </h1>
          <p className="text-sm font-medium text-amber-900 dark:text-amber-300 mt-1">
            Class {book.classLevel.replace('class-', '')} {book.titleEn} 2027 Publication Tracker
          </p>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
            জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) কর্তৃক প্রণীত ২০২৭ শিক্ষাবর্ষের {book.classNameBn}-এর ‘{book.titleBn}’ পাঠ্যবইয়ের অফিশিয়াল স্ট্যাটাস।
          </p>

          {/* Honest Notice - No fake link */}
          <div className="mt-5 p-4 bg-white dark:bg-gray-900 border border-amber-300 dark:border-amber-800 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-900 dark:text-white font-semibold">গুরুত্বপূর্ণ নোটিশ: </strong>
              ২০২৭ শিক্ষাবর্ষের বইটি বর্তমানে NCTB-এর মুদ্রণ ও ছাড়পত্র প্রক্রিয়ায় রয়েছে। বিভ্রান্তি এড়াতে এখানে কোনো অপ্রমাণিত বা নকল পিডিএফ দেওয়া হয়নি। বোর্ড কর্তৃক চূড়ান্ত পিডিএফ প্রকাশিত হওয়া মাত্রই এখানে সরাসরি ডাউনলোড লিংক আপডেট করা হবে।
            </div>
          </div>

          {/* Read 2026 Version CTA */}
          <div className="mt-6 pt-5 border-t border-amber-200 dark:border-amber-900/40 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-gray-600 dark:text-gray-400">
              বর্তমান শিক্ষাবর্ষের বইটি পড়তে চান?
            </span>
            <Link
              href={`/books/${classId}/${book.slug}/`}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-semibold transition"
            >
              <span>{book.titleBn} ২০২৬ সংস্করণ পড়ুন ও ডাউনলোড করুন →</span>
            </Link>
          </div>
        </div>

        {/* Specifications Table */}
        <section className="mb-10 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-6">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">
            বইয়ের প্রাথমিক পরিচিতি ও মেটাডাটা
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
              <span className="text-gray-500">শ্রেণি:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{book.classNameBn}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
              <span className="text-gray-500">বিষয়:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{book.titleBn}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
              <span className="text-gray-500">শিক্ষাবর্ষ:</span>
              <span className="font-semibold text-amber-600 dark:text-amber-400">২০২৭ (আসন্ন)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
              <span className="text-gray-500">মাধ্যম:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{book.mediumBn}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
              <span className="text-gray-500">প্রকাশক:</span>
              <span className="font-semibold text-gray-900 dark:text-white">NCTB (জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
              <span className="text-gray-500">সর্বশেষ যাচাই:</span>
              <span className="font-semibold text-gray-900 dark:text-white">০৬ অক্টোবর ২০২৬</span>
            </div>
          </div>
        </section>

        {/* Peer Books for Same Class */}
        {peerBooks.length > 0 && (
          <section className="mb-8">
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3">
              {book.classNameBn}-এর অন্যান্য বিষয় (২০২৭ ট্র্যাকার):
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {peerBooks.map((peer) => (
                <Link
                  key={peer.id}
                  href={`/books/2027/${classId}/${peer.slug}/`}
                  className="p-3 rounded border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a] hover:border-emerald-600 transition text-xs font-semibold text-gray-800 dark:text-gray-200"
                >
                  {peer.titleBn} ২০২৭ →
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
