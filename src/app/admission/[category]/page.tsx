import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GraduationCap, ChevronRight, ArrowRight, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';

interface AdmissionCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const CATEGORY_MAP: Record<string, { titleBn: string; titleEn: string; desc: string; officialUrl: string; officialName: string; units: string[] }> = {
  university: {
    titleBn: 'বিশ্ববিদ্যালয় ভর্তি তথ্য ২০২৬–২০২৭',
    titleEn: 'Public University Admission',
    desc: 'ঢাকা বিশ্ববিদ্যালয় (DU), জাহাঙ্গীরনগর বিশ্ববিদ্যালয় (JU), রাজশাহী বিশ্ববিদ্যালয় (RU), চট্টগ্রাম বিশ্ববিদ্যালয় (CU) এবং জিএসটি (GST) সমন্বিত গুচ্ছ ভর্তি সার্কুলার ও আবেদন নির্দেশিকা।',
    officialUrl: 'https://gstadmission.ac.bd/',
    officialName: 'GST Admission Portal',
    units: ['ক ইউনিট (বিজ্ঞান)', 'খ ইউনিট (মানবিক)', 'গ ইউনিট (ব্যবসায় শিক্ষা)', 'চারুকলা ইউনিট'],
  },
  nu: {
    titleBn: 'জাতীয় বিশ্ববিদ্যালয় ভর্তি ২০২৬–২০২৭',
    titleEn: 'National University (NU) Honours Admission',
    desc: 'জাতীয় বিশ্ববিদ্যালয় অধিভুক্ত সরকারি ও বেসরকারি কলেজসমূহে অনার্স ১ম বর্ষ, পাস কোর্স এবং প্রফেশনাল কোর্সে অনলাইন ভর্তি আবেদন ও মেধা তালিকা দেখার নিয়মাবলী।',
    officialUrl: 'http://app1.nu.edu.bd/',
    officialName: 'app1.nu.edu.bd',
    units: ['বিজ্ঞান শাখা', 'মানবিক শাখা', 'ব্যবসায় শিক্ষা শাখা', 'প্রফেশনাল কোর্স'],
  },
  medical: {
    titleBn: 'মেডিকেল ও ডেন্টাল ভর্তি পরীক্ষা ২০২৬–২০২৭',
    titleEn: 'MBBS & BDS Medical Admission',
    desc: 'সরকারি ও বেসরকারি মেডিকেল কলেজ সমূহে এমবিবিএস ও বিডিএস কোর্সে ভর্তি পরীক্ষার যোগ্যতা, নম্বর বণ্টন, কাট-মার্কস এবং প্রবেশপত্র ডাউনলোড তথ্য।',
    officialUrl: 'http://dgme.teletalk.com.bd/',
    officialName: 'dgme.teletalk.com.bd',
    units: ['এমবিবিএস (MBBS)', 'বিডিএস (BDS ডেন্টাল)', 'আর্মি মেডিকেল কলেজ'],
  },
  engineering: {
    titleBn: 'প্রকৌশল বিশ্ববিদ্যালয় গুচ্ছ ভর্তি ২০২৬–২০২৭',
    titleEn: 'Engineering Admission (BUET, CKET)',
    desc: 'বাংলাদেশ প্রকৌশল বিশ্ববিদ্যালয় (BUET) এবং চুয়েট-কুয়েট-রুয়েট সমন্বিত প্রকৌশল গুচ্ছ ভর্তি পরীক্ষার যোগ্যতা, বিষয়ভিত্তিক মানবণ্টন ও সার্কুলার।',
    officialUrl: 'https://admission.buet.ac.bd/',
    officialName: 'BUET Admission Portal',
    units: ['ইঞ্জিনিয়ারিং ও ইউআরপি বিভাগ', 'স্থাপত্য (Architecture) বিভাগ'],
  },
};

export async function generateStaticParams() {
  return [
    { category: 'university' },
    { category: 'nu' },
    { category: 'medical' },
    { category: 'engineering' },
  ];
}

export async function generateMetadata({ params }: AdmissionCategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const data = CATEGORY_MAP[category];

  if (!data) {
    return { title: 'ভর্তি তথ্য | Janao.online' };
  }

  return {
    title: `${data.titleBn} — আবেদন ও সার্কুলার গাইড | Janao.online`,
    description: data.desc,
    keywords: [data.titleBn, data.titleEn, 'ভর্তি পরীক্ষা ২০২৬', 'ভর্তি সার্কুলার ২০২৭', 'Admission circular BD'],
    alternates: {
      canonical: `https://janao.online/admission/${category}/`,
    },
  };
}

export default async function AdmissionCategoryPage({ params }: AdmissionCategoryPageProps) {
  const { category } = await params;
  const data = CATEGORY_MAP[category];

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <Header />

      {/* Breadcrumb Header */}
      <div className="bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">হোম</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/admission/" className="hover:text-emerald-700 dark:hover:text-emerald-400">ভর্তি হাব</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white font-medium">{data.titleBn}</span>
        </div>
      </div>

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-16 w-full">
        {/* Hero Section */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>{data.titleEn}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {data.titleBn}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-3xl leading-relaxed">
            {data.desc}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
            <a
              href={data.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded transition"
            >
              <span>অফিসিয়াল আবেদন পোর্টাল</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <Link
              href={`/admission/${category}/2027/`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded transition"
            >
              <span>২০২৭ ভর্তি প্রস্তুতি ও ট্র্যাকার →</span>
            </Link>
          </div>
        </div>

        {/* Units / Faculties Grid */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            ভর্তি ইউনিট ও আবেদন কাঠামো
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.units.map((unit, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                    {idx + 1}
                  </div>
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">{unit}</span>
                </div>
                <span className="text-xs text-gray-400">যোগ্যতা যাচাই</span>
              </div>
            ))}
          </div>
        </section>

        {/* Other Admission Categories */}
        <section className="pt-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
            অন্যান্য ভর্তি সংক্রান্ত বিভাগ:
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {Object.entries(CATEGORY_MAP).map(([key, item]) => {
              if (key === category) return null;
              return (
                <Link
                  key={key}
                  href={`/admission/${key}/`}
                  className="px-3 py-1.5 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-emerald-600 transition"
                >
                  {item.titleBn} →
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
