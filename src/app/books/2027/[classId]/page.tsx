import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BookOpen, ChevronRight, Clock, AlertCircle, FileText, ArrowLeft, ExternalLink, Calendar } from 'lucide-react';
import { getBooksByClass, CLASS_SHORTCUTS, truncateMetaDescription } from '@/data/nctbData';

interface Class2027PageProps {
  params: Promise<{
    classId: string;
  }>;
}

// Display name for any of the 21 classes (school + madrasa). School classes
// keep the existing "১ম"/"একাদশ" wording; madrasa classes use their
// CLASS_SHORTCUTS label (e.g. "দাখিল ৬ষ্ঠ", "ইবতেদায়ি ৩য়").
function getClassNameBn(classId: string): string {
  if (/^class-\d+$/.test(classId)) {
    const classNum = classId.replace('class-', '');
    return classNum === '11' ? 'একাদশ' : classNum === '12' ? 'দ্বাদশ' : `${classNum}ম`;
  }
  const cls = CLASS_SHORTCUTS.flatMap((g) => g.classes).find((c) => c.id === classId);
  return cls?.label ?? classId;
}

function isKnownClass(classId: string): boolean {
  return CLASS_SHORTCUTS.some((g) => g.classes.some((c) => c.id === classId));
}

export async function generateStaticParams() {
  const classIds = new Set<string>();
  CLASS_SHORTCUTS.forEach((group) => {
    group.classes.forEach((c) => classIds.add(c.id));
  });
  return Array.from(classIds).map((id) => ({ classId: id }));
}

export async function generateMetadata({ params }: Class2027PageProps): Promise<Metadata> {
  const { classId } = await params;
  const classNameBn = getClassNameBn(classId);
  const isSchoolClass = /^class-\d+$/.test(classId);
  const classNum = isSchoolClass ? classId.replace('class-', '') : '';

  return {
    title: `${classNameBn} শ্রেণির বই ২০২৭ PDF Download — NCTB Book 2027 Download | Janao.online`,
    description: truncateMetaDescription(`জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) ২০২৭ শিক্ষাবর্ষের ${classNameBn} শ্রেণির বই PDF ডাউনলোড। অফিশিয়াল ২০২৭ পিডিএফ প্রকাশের সাথে সাথে ডাউনলোড লিংক দেওয়া হবে; আপাতত ২০২৬ সংস্করণ ডাউনলোড করুন।`),
    alternates: {
      canonical: `https://janao.online/books/2027/${classId}/`,
      languages: {
        'bn-BD': `https://janao.online/books/2027/${classId}/`,
        'x-default': `https://janao.online/books/2027/${classId}/`,
      },
    },
  };
}

export default async function Class2027Page({ params }: Class2027PageProps) {
  const { classId } = await params;
  if (!isKnownClass(classId)) {
    notFound();
  }

  const classNameBn = getClassNameBn(classId);
  const books2026 = getBooksByClass(classId, 2026);

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
        name: '২০২৭ পাঠ্যবই ডাউনলোড',
        item: 'https://janao.online/books/2027/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${classNameBn} শ্রেণি ২০২৭`,
        item: `https://janao.online/books/2027/${classId}/`,
      },
    ],
  };

  // ItemList of the 2027 books on this class page
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${classNameBn} শ্রেণির পাঠ্যবই ২০২৭`,
    itemListElement: books2026.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://janao.online/books/2027/${classId}/${b.slug}/`,
      name: `${b.titleBn} ২০২৭`,
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">হোম</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/books/2027/" className="hover:text-emerald-700 dark:hover:text-emerald-400">২০২৭ পাঠ্যবই</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white font-medium">{classNameBn} শ্রেণি ২০২৭</span>
        </nav>

        {/* Header Hero */}
        <div className="border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Clock className="w-4 h-4" />
            <span>NCTB শিক্ষাবর্ষ ২০২৭ প্রকাশনা ট্র্যাকার</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {classNameBn} শ্রেণির পাঠ্যবই ২০২৭ PDF Download
          </h1>

          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-2 max-w-3xl leading-relaxed">জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) কর্তৃক {classNameBn} শ্রেণির ২০২৭ শিক্ষাবর্ষের নতুন ও পরিমার্জিত পাঠ্যবইয়ের বিষয়ভিত্তিক তালিকা ও ডাউনলোড তথ্য। বোর্ড থেকে চূড়ান্ত পিডিএফ ফাইল উন্মুক্ত হওয়া মাত্রই এখানে সরাসরি ডাউনলোড লিংক দেওয়া হবে — আপাতত নিচের তালিকা থেকে ২০২৬ সংস্করণের বই ডাউনলোড করুন।</p>

          <div className="mt-4 pt-4 border-t border-amber-200/80 dark:border-amber-900/40 flex flex-wrap items-center gap-3 text-xs">
            <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-semibold rounded">
              ● স্থিতি: মুদ্রণ ও প্রকাশনা পর্যায়ে
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              সর্বশেষ যাচাই: ০৬ অক্টোবর ২০২৬
            </span>
            <Link
              href={`/books/${classId}/`}
              className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline ml-auto"
            >
              ২০২৬ সালের বই পড়ুন ও ডাউনলোড করুন →
            </Link>
          </div>
        </div>

        {/* Subjects & Books Table for 2027 */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {classNameBn} শ্রেণির সম্ভাব্য বিষয়ভিত্তিক বইয়ের তালিকা (২০২৭)
            </h2>
            <span className="text-xs text-gray-500">মোট {books2026.length} টি বিষয়</span>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[440px] sm:min-w-0">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">
                  <th className="p-2.5 sm:p-3.5 font-bold">নং</th>
                  <th className="p-2.5 sm:p-3.5 font-bold">বইয়ের নাম</th>
                  <th className="p-2.5 sm:p-3.5 font-bold hidden sm:table-cell">মাধ্যম</th>
                  <th className="p-2.5 sm:p-3.5 font-bold">২০২৭ স্ট্যাটাস</th>
                  <th className="p-2.5 sm:p-3.5 font-bold text-right">লিংক</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {books2026.map((book, idx) => (
                  <tr key={book.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition">
                    <td className="p-3 sm:p-3.5 text-gray-500 font-mono">{idx + 1}</td>
                    <td className="p-3 sm:p-3.5 font-semibold text-gray-900 dark:text-white">
                      <Link
                        href={`/books/2027/${classId}/${book.slug}/`}
                        className="hover:text-emerald-700 dark:hover:text-emerald-400 transition"
                      >
                        {book.titleBn}
                      </Link>
                      <span className="block text-[11px] text-gray-400 font-normal sm:hidden">
                        {book.mediumBn}
                      </span>
                    </td>
                    <td className="p-3 sm:p-3.5 text-gray-600 dark:text-gray-400 hidden sm:table-cell">
                      {book.mediumBn}
                    </td>
                    <td className="p-3 sm:p-3.5">
                      <span className="px-2 py-0.5 text-[11px] font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded">
                        প্রকাশের অপেক্ষায়
                      </span>
                    </td>
                    <td className="p-3 sm:p-3.5 text-right">
                      <div className="flex flex-col items-end gap-1">
                        <Link
                          href={`/books/2027/${classId}/${book.slug}/`}
                          className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
                        >
                          ২০২৭ ট্র্যাকার →
                        </Link>
                        <Link
                          href={`/books/${classId}/${book.slug}/`}
                          className="text-xs text-gray-600 dark:text-gray-400 font-semibold hover:underline"
                        >
                          ২০২৬ PDF ↓
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Cross-Class Navigation (Point 11: SEO Topic Graph) */}
        <section className="pt-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
            অন্যান্য শ্রেণির ২০২৭ বই ডাউনলোড:
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {CLASS_SHORTCUTS.flatMap((g) => g.classes).map((cls) => {
              const isCurrent = cls.id === classId;
              return (
                <Link
                  key={cls.id}
                  href={`/books/2027/${cls.id}/`}
                  className={`px-3 py-1.5 rounded border transition ${
                    isCurrent
                      ? 'bg-amber-500 text-white font-bold border-amber-500'
                      : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-emerald-600'
                  }`}
                >
                  {getClassNameBn(cls.id)} শ্রেণি ২০২৭
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
