import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  CLASS_SHORTCUTS, 
  getBooksByYear 
} from '@/data/nctbData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Clock, 
  AlertCircle, 
  Calendar, 
  ChevronRight, 
  BookOpen, 
  CheckCircle2, 
  Bell 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'NCTB Books 2027 PDF Download | ২০২৭ শিক্ষাবর্ষের পাঠ্যবই - Janao.online',
  description: 'NCTB 2027 book download — জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) ২০২৭ শিক্ষাবর্ষের ১ম থেকে ১২শ শ্রেণির পাঠ্যবই PDF ডাউনলোড। অফিশিয়াল ২০২৭ পিডিএফ প্রকাশের সাথে সাথে এখানে ডাউনলোড লিংক দেওয়া হবে; আপাতত ২০২৬ সংস্করণ ডাউনলোড করুন।',
  keywords: [
    'NCTB 2027 book download',
    'NCTB books 2027 PDF download',
    'nctb book download 2027',
    'NCTB Books 2027',
    '২০২৭ সালের বই ডাউনলোড',
    'Class 1-12 Books 2027 PDF',
    '২০২৭ নতুন শিক্ষাক্রম পাঠ্যবই',
    'NCTB 2027 syllabus',
  ],
  openGraph: {
    title: 'NCTB Books 2027 PDF Download | ২০২৭ শিক্ষাবর্ষের পাঠ্যবই - Janao.online',
    description: 'NCTB 2027 book download — ১ম থেকে ১২শ শ্রেণির ২০২৭ শিক্ষাবর্ষের পাঠ্যবই PDF ডাউনলোড। অফিশিয়াল পিডিএফ প্রকাশের সাথে সাথে লিংক আপডেট করা হবে।',
    url: 'https://janao.online/books/2027/',
    siteName: 'janao.online',
    locale: 'bn_BD',
    type: 'website',
    images: [
      {
        url: 'https://janao.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NCTB Books 2027 PDF Download',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NCTB Books 2027 PDF Download | ২০২৭ শিক্ষাবর্ষের পাঠ্যবই - Janao.online',
    description: 'NCTB 2027 book download — ১ম থেকে ১২শ শ্রেণির ২০২৭ শিক্ষাবর্ষের পাঠ্যবই PDF ডাউনলোড।',
    images: ['https://janao.online/og-image.png'],
  },
  alternates: {
    canonical: 'https://janao.online/books/2027/',
    languages: {
      'bn-BD': 'https://janao.online/books/2027/',
      'x-default': 'https://janao.online/books/2027/',
    },
  },
};

const FAQS = [
  {
    q: '২০২৭ শিক্ষাবর্ষের NCTB বই কি এখন ডাউনলোড করা যাবে?',
    a: 'এখনো নয়। NCTB এখনো ২০২৭ শিক্ষাবর্ষের অফিশিয়াল পিডিএফ প্রকাশ করেনি — বইগুলো সম্পাদনা ও মুদ্রণ প্রক্রিয়ায় আছে। অফিশিয়াল পিডিএফ প্রকাশের সাথে সাথে এই পেজেই সরাসরি ডাউনলোড লিংক দেওয়া হবে।',
  },
  {
    q: 'NCTB 2027 book download কবে পাওয়া যাবে?',
    a: 'NCTB সাধারণত নতুন শিক্ষাবর্ষ শুরুর আগে বই প্রকাশ করে। অফিশিয়াল প্রকাশের তারিখ ঘোষণা হলে এই পেজে আপডেট করা হবে। আপাতত ২০২৬ শিক্ষাবর্ষের বইগুলো ডাউনলোড করে পড়া যাবে।',
  },
  {
    q: '২০২৭ সালের বই না পেলে কী করব?',
    a: 'উপরের তালিকা থেকে আপনার শ্রেণির ২০২৬ সংস্করণের বই ডাউনলোড করুন। বেশিরভাগ বিষয়ের মূল পাঠ্যবই অপরিবর্তিত থাকে, তাই ২০২৬ সংস্করণ দিয়েই পড়া শুরু করা যায়।',
  },
  {
    q: 'NCTB বই ডাউনলোড কি ফ্রি?',
    a: 'হ্যাঁ। NCTB পাঠ্যবই সরকার কর্তৃক বিনামূল্যে বিতরণ করা হয় এবং অফিশিয়াল পিডিএফ বিনামূল্যে ডাউনলোড করা যায়। janao.online-এ কোনো বইয়ের জন্য টাকা লাগে না।',
  },
  {
    q: 'কোন কোন শ্রেণির ২০২৭ বই এখানে পাওয়া যাবে?',
    a: '১ম থেকে ১২শ শ্রেণি পর্যন্ত সব শ্রেণির ২০২৭ শিক্ষাবর্ষের বই এই পেজে তালিকাভুক্ত করা হয়েছে। শ্রেণি অনুযায়ী বইয়ের তালিকা ও ডাউনলোড তথ্য দেখতে উপরের তালিকা থেকে আপনার শ্রেণি নির্বাচন করুন।',
  },
];

export default function Books2027HubPage() {
  const books2027 = getBooksByYear(2027);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
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
        name: 'পাঠ্যবই',
        item: 'https://janao.online/books/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'NCTB Books 2027 PDF Download',
        item: 'https://janao.online/books/2027/',
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
            ২০২৭ শিক্ষাবর্ষ
          </span>
        </nav>

        {/* 2027 Official Notice Banner */}
        <div className="p-5 rounded-lg border-2 border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 mb-8">
          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                NCTB Books 2027 PDF Download — ২০২৭ শিক্ষাবর্ষের বই ডাউনলোড
              </h1>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-1.5 leading-relaxed">
                NCTB 2027 book download — ২০২৭ শিক্ষাবর্ষের ১ম থেকে ১২শ শ্রেণির সকল পাঠ্যবই এক জায়গায়। জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (এনসিটিবি) এখনো ২০২৭ শিক্ষাবর্ষের অফিশিয়াল পিডিএফ প্রকাশ করেনি; বইগুলো সম্পাদনা ও মুদ্রণ প্রক্রিয়ায় আছে। janao.online কোনো ভুয়া বা অননুমোদিত লিংক প্রকাশ করে না — বোর্ড কর্তৃক অফিশিয়াল পিডিএফ উন্মুক্ত হওয়ার সাথে সাথে এখানে সরাসরি ডাউনলোড লিংক দেওয়া হবে। আপাতত নিচের তালিকা থেকে ২০২৬ সংস্করণের বই ডাউনলোড করতে পারবেন।
              </p>
            </div>
          </div>
        </div>

        {/* Class Selection Hub */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            শ্রেণি অনুযায়ী ২০২৭ বই ডাউনলোড
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            আপনার শ্রেণি নির্বাচন করুন — ২০২৭ শিক্ষাবর্ষের বইয়ের তালিকা, প্রকাশনা স্ট্যাটাস ও ডাউনলোড তথ্য দেখুন। ২০২৭ পিডিএফ এখনো প্রকাশিত না হওয়ায় প্রতিটি শ্রেণির ২০২৬ সংস্করণের বইও এখান থেকে ডাউনলোড করা যাবে:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CLASS_SHORTCUTS.map((group) => (
              <div 
                key={group.groupTitleBn}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a]"
              >
                <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-3">
                  {group.groupTitleBn}
                </h3>
                <div className="space-y-2 text-xs">
                  {group.classes.map((cls) => {
                    const isSchoolClass = /^class-\d+$/.test(cls.id);
                    const bookCount = books2027.filter((b) => b.classLevel === cls.id).length;
                    return (
                      <div
                        key={cls.id}
                        className="p-2 rounded bg-gray-50 dark:bg-gray-800/60 flex items-center justify-between gap-2 border border-gray-100 dark:border-gray-800"
                      >
                        {isSchoolClass ? (
                          <Link
                            href={`/books/2027/${cls.id}/`}
                            className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                          >
                            {cls.label} ২০২৭
                            {bookCount > 0 && (
                              <span className="text-gray-500 dark:text-gray-400 font-normal"> · {bookCount}টি বই</span>
                            )}
                          </Link>
                        ) : (
                          <span className="font-semibold text-gray-800 dark:text-gray-200">{cls.label}</span>
                        )}
                        <span className="flex items-center gap-2 shrink-0">
                          {isSchoolClass && (
                            <Link
                              href={`/books/${cls.id}/`}
                              className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                            >
                              ২০২৬ PDF ↓
                            </Link>
                          )}
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-medium">
                            ২০২৭ আসন্ন
                          </span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ: NCTB 2027 Book Download */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            NCTB 2027 বই ডাউনলোড — সাধারণ জিজ্ঞাসা
          </h2>
          <div className="space-y-3">
            {FAQS.map((item) => (
              <div key={item.q} className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a]">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1.5">{item.q}</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Current Working Edition Link: 2026 */}
        <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <div>
            <span className="font-bold text-gray-900 dark:text-white block">
              বর্তমানে ক্লাসে পাঠ্য ২০২৬ সালের সকল বই খুঁজছেন?
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-xs">
              চলতি শিক্ষাবর্ষের সকল শ্রেণির ৪৪৪টি মূল পাঠ্যবই এখনই ডাউনলোডযোগ্য।
            </span>
          </div>

          <Link
            href="/books/"
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold text-xs shrink-0 transition"
          >
            ২০২৬ সালের সব বই দেখুন →
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
