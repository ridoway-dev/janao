import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BookOpen, ChevronRight, Clock, AlertCircle, FileText, ArrowLeft, ExternalLink, Calendar, CheckCircle2, HelpCircle } from 'lucide-react';
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

  // The matching year-2027 record (slug = 2026 slug + '-2027') carries
  // the 2027-specific description; fall back to the generic text for
  // the few 2026 books that have no 2027 record.
  const book2027 = getBookByClassAndSlug(classId, `${bookSlug}-2027`);
  const title = `${book.classNameBn} ${book.titleBn} ২০২৭ PDF Download | Janao.online`;
  const description =
    book2027?.descriptionBn ??
    `জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) ২০২৭ শিক্ষাবর্ষের ${book.classNameBn}-এর ${book.titleBn} পাঠ্যবই PDF ডাউনলোড তথ্য। চূড়ান্ত প্রকাশের সাথে সাথে আপডেট।`;

  return {
    title,
    description,
    keywords: [
      `${book.classNameBn} ${book.titleBn} 2027`,
      `${book.titleEn} 2027 PDF`,
      `${book.titleEn} 2027 PDF download`,
      `${book.titleBn} ২০২৭ ডাউনলোড`,
      `Class ${book.classLevel.replace('class-', '')} ${book.titleEn} 2027`,
      `NCTB Book 2027 ${book.titleBn}`,
    ],
    openGraph: {
      title,
      description,
      url: `https://janao.online/books/2027/${classId}/${bookSlug}/`,
      siteName: 'janao.online',
      locale: 'bn_BD',
      type: 'article',
      images: [
        {
          url: 'https://janao.online/og-image.png',
          width: 1200,
          height: 630,
          alt: `${book.classNameBn} ${book.titleBn} ২০২৭`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://janao.online/og-image.png'],
    },
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

  // The matching year-2027 record (slug = 2026 slug + '-2027') — its own
  // description/status/pageCount make this page different from the 2026
  // edition instead of a relabelled copy. Undefined for the few 2026
  // books with no 2027 record (English-version books, classes 1-2).
  const book2027 = getBookByClassAndSlug(classId, `${bookSlug}-2027`);

  // Small per-class FAQ — every answer comes from the 2027 record or
  // from copy already on this page; nothing is invented.
  const faqItems: { q: string; a: string }[] = [
    {
      q: `২০২৭ শিক্ষাবর্ষের ${book.classNameBn}-এর ${book.titleBn} বইটি কি প্রকাশিত হয়েছে?`,
      a: book2027
        ? `না — বইটি বর্তমানে ${book2027.statusText ?? 'প্রকাশনা প্রক্রিয়াধীন'}। বোর্ড কর্তৃক চূড়ান্ত পিডিএফ প্রকাশিত হওয়া মাত্রই এখানে সরাসরি ডাউনলোড লিংক আপডেট করা হবে।`
        : `এই বইটির ২০২৭ সংস্করণের প্রকাশনা তথ্য এখনো NCTB থেকে পাওয়া যায়নি। চূড়ান্ত পিডিএফ প্রকাশিত হওয়া মাত্রই এখানে আপডেট করা হবে।`,
    },
    {
      q: `২০২৭-এর বই না পাওয়া পর্যন্ত কী পড়ব?`,
      a: `আপাতত ২০২৬ শিক্ষাবর্ষের সংস্করণটি ডাউনলোড করে পড়তে পারেন — উপরের ‘${book.titleBn} ২০২৬ সংস্করণ পড়ুন ও ডাউনলোড করুন’ বোতাম থেকে।`,
    },
    ...(book2027?.pageCount
      ? [
          {
            q: `২০২৭ সংস্করণের ${book.titleBn} বইয়ে কত পৃষ্ঠা থাকবে?`,
            a: `২০২৭ সংস্করণের রেকর্ড অনুযায়ী বইটিতে প্রায় ${book2027.pageCount} পৃষ্ঠা রয়েছে।`,
          },
        ]
      : []),
  ];

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
    url: `https://janao.online/books/2027/${classId}/${bookSlug}/`,
    description: book2027?.descriptionBn ?? book.descriptionBn,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
            {book.classNameBn} {book.titleBn} ২০২৭ PDF Download
          </h1>
          <p className="text-sm font-medium text-amber-900 dark:text-amber-300 mt-1">
            Class {book.classLevel.replace('class-', '')} {book.titleEn} 2027 PDF Download
          </p>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
            {book2027?.descriptionBn ??
              `জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) কর্তৃক প্রণীত ২০২৭ শিক্ষাবর্ষের ${book.classNameBn}-এর ‘${book.titleBn}’ পাঠ্যবইয়ের অফিশিয়াল স্ট্যাটাস।`}
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
            {book2027?.statusText && (
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-500">২০২৭ সংস্করণের স্ট্যাটাস:</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">{book2027.statusText}</span>
              </div>
            )}
            {book2027?.pageCount ? (
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-500">২০২৭ সংস্করণের পৃষ্ঠা:</span>
                <span className="font-semibold text-gray-900 dark:text-white">প্রায় {book2027.pageCount} পৃষ্ঠা</span>
              </div>
            ) : null}
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
              <span className="text-gray-500">সর্বশেষ যাচাই:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{book2027?.last_verified ?? book.last_verified}</span>
            </div>
          </div>
        </section>

        {/* Per-class FAQ — answered from the 2027 record itself */}
        <section className="mb-10 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-6">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>{book.classNameBn} {book.titleBn} ২০২৭ — সাধারণ জিজ্ঞাসা</span>
          </h2>
          <div className="space-y-4 text-xs sm:text-sm">
            {faqItems.map((item, i) => (
              <div key={i} className="p-3 bg-white dark:bg-gray-900/60 rounded border border-gray-200 dark:border-gray-800">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  {item.q}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-xs">
                  {item.a}
                </p>
              </div>
            ))}
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
