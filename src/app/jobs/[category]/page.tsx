import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdSlot from '@/components/ads/AdSlot';
import { Briefcase, ChevronRight, ExternalLink, ShieldAlert, ArrowRight } from 'lucide-react';

interface JobsCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const JOBS_MAP: Record<string, { titleBn: string; titleEn: string; desc: string; officialUrl: string; officialName: string; highlights: string[]; guideTitle?: string; guide?: string[] }> = {
  government: {
    titleBn: 'সরকারি চাকরি সার্কুলার ২০২৬–২০২৭',
    titleEn: 'Government Job Circular Bangladesh',
    desc: 'বিভিন্ন মন্ত্রণালয়, অধিদপ্তর, স্বায়ত্তশাসিত প্রতিষ্ঠান ও রাজস্ব খাতভুক্ত ১১তম থেকে ২০তম গ্রেডের শূন্য পদের অফিসিয়াল নিয়োগ বিজ্ঞপ্তি এবং অনলাইন আবেদন নির্দেশিকা।',
    officialUrl: 'http://alljobs.teletalk.com.bd/',
    officialName: 'alljobs.teletalk.com.bd',
    highlights: ['মন্ত্রণালয় ও সচিবালয় নিয়োগ', 'অধিদপ্তর ও পরিদপ্তর সার্কুলার', 'প্রাথমিক শিক্ষক নিয়োগ', 'রেলওয়ে ও পুলিশ নিয়োগ'],
    guideTitle: 'সরকারি চাকরির সার্কুলার: যা জানা দরকার',
    guide: [
      'মন্ত্রণালয়, অধিদপ্তর, পরিদপ্তর ও স্বায়ত্তশাসিত প্রতিষ্ঠানের ১১তম থেকে ২০তম গ্রেডের পদের নিয়োগ বিজ্ঞপ্তি এই বিভাগে পাবেন। প্রাথমিক সহকারী শিক্ষক নিয়োগ, রেলওয়ে ও পুলিশ নিয়োগসহ বিভিন্ন দপ্তরের সার্কুলার ও অনলাইন আবেদনের নির্দেশিকা এখানে তুলে ধরা হয়েছে।',
      'বেশিরভাগ সরকারি নিয়োগের আবেদন করতে হয় টেলিটকের অলজবস পোর্টালের মাধ্যমে। আবেদনের পর ফি জমা দিতে হয় টেলিটক প্রি-পেইড সংযোগ থেকে এসএমএসের মাধ্যমে। প্রতিটি সার্কুলারে পদের সংখ্যা, শিক্ষাগত যোগ্যতা, বয়সসীমা ও আবেদনের শেষ তারিখ আলাদা হয়, তাই আবেদনের আগে অফিশিয়াল বিজ্ঞপ্তিটি ভালোভাবে পড়ে নিন। সার্কুলারে দেওয়া শিক্ষাগত যোগ্যতা ও অভিজ্ঞতার শর্ত পূরণ না হলে আবেদন বাতিল হতে পারে, তাই আবেদনের আগে শর্তগুলো মিলিয়ে নিন। প্রবেশপত্র ডাউনলোডের তারিখ ও পরীক্ষার কেন্দ্রের তথ্য প্রকাশিত হলে সংশ্লিষ্ট পোর্টাল থেকেই জানা যাবে। কোনো নিয়োগের নামে কেউ টাকা চাইলে তা প্রতারণা বলে ধরে নিন—সরকারি চাকরির আবেদনে নির্ধারিত ফি ছাড়া আর কোনো টাকা লাগে না।',
    ],
  },
  bcs: {
    titleBn: 'বিসিএস ও পিএসসি সার্কুলার প্রস্তুতি',
    titleEn: 'BCS & BPSC Exam Preparation',
    desc: 'বাংলাদেশ সরকারি কর্ম কমিশন (BPSC) কর্তৃক পরিচালিত ৪৬তম, ৪৭তম বিসিএস পরীক্ষার প্রিলিমিনারি সিলেবাস, ক্যাডার পছন্দক্রম ও ভাইভা নির্দেশিকা।',
    officialUrl: 'http://bpsc.teletalk.com.bd/',
    officialName: 'bpsc.teletalk.com.bd',
    highlights: ['সাধারণ ক্যাডার পদসমূহ', 'টেকনিক্যাল/প্রফেশনাল ক্যাডার', 'বিসিএস প্রিলি মানবণ্টন', 'লিখিত পরীক্ষার সিলেবাস'],
    guideTitle: 'বিসিএস পরীক্ষা: যা জানা দরকার',
    guide: [
      'বিসিএস বাংলাদেশের সবচেয়ে প্রতিযোগিতামূলক সরকারি চাকরির পরীক্ষা। বাংলাদেশ সরকারি কর্ম কমিশন (বিপিএসসি) এই পরীক্ষা পরিচালনা করে। এই পাতায় ৪৬তম ও ৪৭তম বিসিএসের প্রিলিমিনারি সিলেবাস, মানবণ্টন, ক্যাডার পছন্দক্রম সাজানোর নির্দেশিকা ও ভাইভা প্রস্তুতির তথ্য পাবেন। সাধারণ ক্যাডার ও টেকনিক্যাল বা প্রফেশনাল ক্যাডার—দুই ধারার পদের তথ্যই এখানে তুলে ধরা হয়েছে।',
      'প্রিলিমিনারি পরীক্ষায় উত্তীর্ণ হলে লিখিত পরীক্ষা দিতে হয়, আর লিখিত পরীক্ষায় উত্তীর্ণ হলে ভাইভা। আবেদন করতে হয় বিপিএসসির টেলিটক পোর্টালের মাধ্যমে। ক্যাডার পছন্দক্রম সাজানোর আগে প্রতিটি ক্যাডারের কাজের ধরন ও সুযোগ-সুবিধা সম্পর্কে জেনে নিন। প্রতিটি সার্কুলারে বয়সসীমা, শিক্ষাগত যোগ্যতা ও আবেদনের ফি আলাদা হতে পারে, তাই আবেদনের আগে অফিশিয়াল সার্কুলারটি ভালোভাবে পড়ে নিন। প্রিলিমিনারি পরীক্ষার প্রস্তুতিতে সিলেবাস ধরে বিষয়ভিত্তিক পড়াশোনা সাজান এবং নিয়মিত মডেল টেস্ট দিয়ে নিজের অগ্রগতি যাচাই করুন। ভাইভার আগে নিজের শিক্ষাগত পটভূমি, ক্যাডার পছন্দের কারণ ও সাম্প্রতিক ঘটনাবলি সম্পর্কে প্রস্তুতি নিয়ে রাখুন।',
    ],
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
    guideTitle: 'বেসরকারি চাকরি: যা জানা দরকার',
    guide: [
      'বেসরকারি খাতে ক্যারিয়ার গড়তে চাইলে এই বিভাগে দেশের শীর্ষস্থানীয় বহুজাতিক কোম্পানি, টেলিকম, ফার্মাসিউটিক্যালস ও বেসরকারি উন্নয়ন সংস্থার (এনজিও) নিয়োগ তথ্য পাবেন। ব্র্যাকসহ বিভিন্ন এনজিও, আইটি প্রতিষ্ঠান ও করপোরেট অফিসের ম্যানেজমেন্ট ট্রেইনি পদের সার্কুলার এখানে তুলে ধরা হয়েছে।',
      'বেসরকারি চাকরিতে সাধারণত প্রতিষ্ঠানের নিজস্ব ক্যারিয়ার পোর্টালের মাধ্যমে সিভি জমা দিতে হয়। আবেদনের আগে প্রতিষ্ঠানটি সম্পর্কে জেনে নিন, সিভিতে আপনার দক্ষতা ও অভিজ্ঞতা স্পষ্টভাবে তুলে ধরুন এবং সাক্ষাৎকারের প্রস্তুতি নিন। চাকরির বিজ্ঞপ্তি দেখার সময় প্রতিষ্ঠানের নাম, পদের বিবরণ ও আবেদনের শেষ তারিখ মিলিয়ে নিন। কিছু প্রতিষ্ঠান ওয়াক-ইন ইন্টারভিউও নেয়—সেক্ষেত্রে হালনাগাদ সিভি ও প্রয়োজনীয় কাগজপত্র সঙ্গে নিয়ে যেতে হয়। সার্কুলার যাচাই না করে কোনো অজানা নম্বরে টাকা পাঠাবেন না—প্রকৃত নিয়োগদাতা কখনো চাকরির বিনিময়ে টাকা চায় না।',
    ],
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
    alternates: {
      canonical: `https://janao.online/jobs/${category}/`,
      languages: {
        'bn-BD': `https://janao.online/jobs/${category}/`,
        'x-default': `https://janao.online/jobs/${category}/`,
      },
    },
  };
}

export default async function JobsCategoryPage({ params }: JobsCategoryPageProps) {
  const { category } = await params;
  const data = JOBS_MAP[category];

  if (!data) {
    notFound();
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'হোম', item: 'https://janao.online/' },
      { '@type': 'ListItem', position: 2, name: 'চাকরি হাব', item: 'https://janao.online/jobs/' },
      { '@type': 'ListItem', position: 3, name: data.titleBn, item: `https://janao.online/jobs/${category}/` },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

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

        {/* Guide */}
        {data.guide && (
          <section className="mb-10 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              {data.guideTitle}
            </h2>
            {data.guide.map((para, idx) => (
              <p key={idx} className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3 last:mb-0">
                {para}
              </p>
            ))}
          </section>
        )}

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

        {/* Sponsored slot: after all job information, before the footer */}
        <AdSlot format="banner" />
      </main>

      <Footer />
    </div>
  );
}
