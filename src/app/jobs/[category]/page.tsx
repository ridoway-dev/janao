import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Briefcase, ChevronRight, ExternalLink, ShieldAlert, ArrowRight } from 'lucide-react';

interface JobsCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const JOBS_MAP: Record<string, { titleBn: string; titleEn: string; desc: string; officialUrl: string; officialName: string; highlights: string[] }> = {
  government: {
    titleBn: 'সরকারি চাকরি সার্কুলার ২০২৬–২০২৭',
    titleEn: 'Government Job Circular Bangladesh',
    desc: 'বিভিন্ন মন্ত্রণালয়, অধিদপ্তর, স্বায়ত্তশাসিত প্রতিষ্ঠান ও রাজস্ব খাতভুক্ত ১১তম থেকে ২০তম গ্রেডের শূন্য পদের অফিসিয়াল নিয়োগ বিজ্ঞপ্তি এবং অনলাইন আবেদন নির্দেশিকা।',
    officialUrl: 'http://alljobs.teletalk.com.bd/',
    officialName: 'alljobs.teletalk.com.bd',
    highlights: ['মন্ত্রণালয় ও সচিবালয় নিয়োগ', 'অধিদপ্তর ও পরিদপ্তর সার্কুলার', 'প্রাথমিক শিক্ষক নিয়োগ', 'রেলওয়ে ও পুলিশ নিয়োগ'],
  },
  bcs: {
    titleBn: 'বিসিএস ও পিএসসি সার্কুলার প্রস্তুতি',
    titleEn: 'BCS & BPSC Exam Preparation',
    desc: 'বাংলাদেশ সরকারি কর্ম কমিশন (BPSC) কর্তৃক পরিচালিত ৪৬তম, ৪৭তম বিসিএস পরীক্ষার প্রিলিমিনারি সিলেবাস, ক্যাডার পছন্দক্রম ও ভাইভা নির্দেশিকা।',
    officialUrl: 'http://bpsc.teletalk.com.bd/',
    officialName: 'bpsc.teletalk.com.bd',
    highlights: ['সাধারণ ক্যাডার পদসমূহ', 'টেকনিক্যাল/প্রফেশনাল ক্যাডার', 'বিসিএস প্রিলি মানবণ্টন', 'লিখিত পরীক্ষার সিলেবাস'],
  },
  bank: {
    titleBn: 'ব্যাংক জব সার্কুলার ও প্রস্তুতি ২০২৬',
    titleEn: 'Bank Job Circular BD (BB & Combined 9 Banks)',
    desc: 'বাংলাদেশ ব্যাংক ব্যাংকার্স সিলেকশন কমিটি (BBSC) এবং সমন্বিত ৯ ব্যাংক ও আর্থিক প্রতিষ্ঠানের অফিসার (জেনারেল), ক্যাশ ও আইটি পদের নিয়োগ তথ্য।',
    officialUrl: 'https://erecruitment.bb.org.bd/',
    officialName: 'erecruitment.bb.org.bd',
    highlights: ['সোনালী, জনতা, অগ্রণী ব্যাংক', 'অফিসার জেনারেল নিয়োগ', 'সিনিয়র অফিসার পরীক্ষা', 'কম্বাইন্ড ব্যাংক ফলাফল'],
  },
  private: {
    titleBn: 'বেসরকারি ও করপোরেট ক্যারিয়ার সার্কুলার',
    titleEn: 'Private Sector & Corporate Jobs',
    desc: 'শীর্ষস্থানীয় বহুজাতিক কোম্পানি, টেলিকম, ফার্মাসিউটিক্যালস এবং বেসরকারি উন্নয়ন সংস্থা (NGO)-এর সর্বশেষ ক্যারিয়ার সুযোগ ও সিভি জমা নির্দেশিকা।',
    officialUrl: 'https://janao.online/jobs/',
    officialName: 'janao.online/jobs',
    highlights: ['টেলিকম ও আইটি চাকরি', 'ফার্মাসিউটিক্যালস ক্যারিয়ার', 'ব্র্যাক ও এনজিও সেক্টর', 'ম্যানেজমেন্ট ট্রেইনি পদ'],
  },
};

export async function generateStaticParams() {
  return [
    { category: 'government' },
    { category: 'bcs' },
    { category: 'bank' },
    { category: 'private' },
  ];
}

export async function generateMetadata({ params }: JobsCategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const data = JOBS_MAP[category];

  if (!data) {
    return { title: 'চাকরি সার্কুলার | Janao.online' };
  }

  return {
    title: `${data.titleBn} — নিয়োগ বিজ্ঞপ্তি ও আবেদন | Janao.online`,
    description: data.desc,
    keywords: [data.titleBn, data.titleEn, 'Govt job circular BD', 'চাকরি সার্কুলার ২০২৬'],
    alternates: {
      canonical: `https://janao.online/jobs/${category}/`,
    },
  };
}

export default async function JobsCategoryPage({ params }: JobsCategoryPageProps) {
  const { category } = await params;
  const data = JOBS_MAP[category];

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">হোম</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/jobs/" className="hover:text-emerald-700 dark:hover:text-emerald-400">চাকরি হাব</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white font-medium">{data.titleBn}</span>
        </div>
      </div>

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-16 w-full">
        {/* Hero Section */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Briefcase className="w-4 h-4" />
            <span>{data.titleEn}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {data.titleBn}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-3xl leading-relaxed">
            {data.desc}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <a
              href={data.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded transition"
            >
              <span>অফিসিয়াল পোর্টাল: {data.officialName}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Highlights */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            গুরুত্বপূর্ণ বিভাগ ও সার্কুলার সূচি
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.highlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-lg p-4 flex items-center justify-between"
              >
                <span className="font-semibold text-sm text-gray-900 dark:text-white">{item}</span>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">বিস্তারিত →</span>
              </div>
            ))}
          </div>
        </section>

        {/* Other Job Categories */}
        <section className="pt-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
            অন্যান্য চাকরি ও ক্যারিয়ার বিভাগ:
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {Object.entries(JOBS_MAP).map(([key, item]) => {
              if (key === category) return null;
              return (
                <Link
                  key={key}
                  href={`/jobs/${key}/`}
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
