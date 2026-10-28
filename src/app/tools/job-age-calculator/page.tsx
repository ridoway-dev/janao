import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JobAgeCalculator from '@/components/JobAgeCalculator';
import { 
  Briefcase, 
  ChevronRight, 
  Calculator, 
  HelpCircle, 
  CheckCircle2, 
  Calendar, 
  Award,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'সরকারি চাকরির বয়স ক্যালকুলেটর — Job Age Calculator Bangladesh | Janao.online',
  description: 'সরকারি চাকরি ও বিসিএস সার্কুলারের নির্দিষ্ট তারিখে আপনার বয়স কত বছর, মাস ও দিন হয়েছে এবং সাধারণ (১৮–৩০ বছর) বা মুক্তিযোদ্ধা/প্রতিবন্ধী কোটায় (৩২ বছর) আবেদনের যোগ্যতা আছে কিনা তা নির্ভুলভাবে হিসাব করুন।',
  keywords: [
    'সরকারি চাকরির বয়স ক্যালকুলেটর',
    'job age calculator bangladesh',
    'চাকরির বয়স হিসাব করার নিয়ম',
    'বিসিএস বয়স হিসাব',
    'সরকারি চাকরির বয়সসীমা',
    'বয়স ক্যালকুলেটর অনলাইন',
    'age calculator for govt job bd',
    'সরকারি চাকরি ৩০ বছর হিসাব',
    'মুক্তিযোদ্ধা কোটায় বয়সসীমা'
  ],
  alternates: {
    canonical: 'https://janao.online/tools/job-age-calculator/',
  },
  openGraph: {
    title: 'সরকারি চাকরির বয়স ক্যালকুলেটর — Job Age Calculator Bangladesh',
    description: 'সার্কুলারের নির্দিষ্ট তারিখে আপনার বয়স কত বছর, মাস ও দিন হয়েছে তাৎক্ষণিক যাচাই করুন। সাধারণ ও কোটা ভিত্তিক চাকরির বয়সসীমা যাচাই।',
    url: 'https://janao.online/tools/job-age-calculator/',
    siteName: 'Janao.online',
    locale: 'bn_BD',
    type: 'website',
    images: [
      {
        url: 'https://janao.online/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'সরকারি চাকরির বয়স ক্যালকুলেটর — Janao.online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'সরকারি চাকরির বয়স ক্যালকুলেটর — Job Age Calculator Bangladesh',
    description: 'সরকারি চাকরি ও বিসিএস সার্কুলারের নির্দিষ্ট তারিখে আপনার বয়স ও আবেদনের যোগ্যতা হিসাব করুন।',
    images: ['https://janao.online/opengraph-image.png'],
  },
};

export default function JobAgeCalculatorPage() {
  // Schema.org WebApplication & FAQPage Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'বাংলাদেশ সরকারি চাকরির বয়স ক্যালকুলেটর (Job Age Calculator)',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All',
        url: 'https://janao.online/tools/job-age-calculator/',
        description: 'অনলাইনে বাংলাদেশ সরকারি চাকরি ও বিসিএস সার্কুলার অনুযায়ী জন্মতারিখ ও কাট-অফ ডেট দিয়ে নিখুঁত বয়স হিসাব করার ক্যালকুলেটর।',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'BDT',
        },
      },
      {
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
            name: 'ক্যালকুলেটর ও টুলস',
            item: 'https://janao.online/tools/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'চাকরির বয়স ক্যালকুলেটর',
            item: 'https://janao.online/tools/job-age-calculator/',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'সরকারি চাকরিতে আবেদনের সাধারণ বয়সসীমা কত?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'বাংলাদেশ সরকারি কর্ম কমিশন (BPSC) ও জনপ্রশাসন মন্ত্রণালয়ের প্রচলিত বিধি অনুযায়ী সাধারণ প্রার্থীদের ক্ষেত্রে সর্বনিম্ন বয়স ১৮ বছর এবং সর্বোচ্চ বয়সসীমা ৩০ বছর।',
            },
          },
          {
            '@type': 'Question',
            name: 'মুক্তিযোদ্ধা ও প্রতিবন্ধী কোটায় বয়সসীমা কত বছর?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'মুক্তিযোদ্ধা বা শহীদ মুক্তিযোদ্ধার সন্তান এবং শারীরিক প্রতিবন্ধী প্রার্থীদের জন্য সরকারি চাকরির সর্বোচ্চ বয়সসীমা ৩২ বছর পর্যন্ত শিথিলযোগ্য।',
            },
          },
          {
            '@type': 'Question',
            name: 'চাকরির সার্কুলারে বয়স গণনার তারিখ কীভাবে ধরতে হয়?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'প্রতিটি সরকারি চাকরির নিয়োগ বিজ্ঞপ্তিতে নির্দিষ্ট একটি তারিখ উল্লেখ থাকে (যেমন: মাসের ১ তারিখ বা আবেদনের শেষ তারিখ)। সেই নির্দিষ্ট তারিখে আপনার জন্মতারিখ অনুযায়ী বয়স হিসাব করতে হয়। আমাদের এই ক্যালকুলেটরে আপনি সার্কুলারের সেই তারিখ বসিয়ে এক ক্লিকেই নির্ভুল বয়স পেতে পারেন।',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {/* Breadcrumb Bar */}
      <div className="bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">হোম</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/tools/" className="hover:text-emerald-700 dark:hover:text-emerald-400">টুলস</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white font-medium">চাকরির বয়স ক্যালকুলেটর</span>
        </div>
      </div>

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full space-y-10">
        
        {/* Main Interactive Tool Component */}
        <JobAgeCalculator />

        {/* SEO In-Depth Guide & FAQs */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-emerald-600 shrink-0" />
            <span>সরকারি চাকরির বয়স হিসাব সংক্রান্ত সাধারণ জিজ্ঞাসা (FAQ)</span>
          </h2>

          <div className="divide-y divide-gray-200 dark:divide-gray-800 text-sm">
            
            <div className="py-4 space-y-1.5">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">
                ১. সরকারি চাকরির নিয়োগ বিজ্ঞপ্তিতে বয়স কীভাবে নির্ধারণ করা হয়?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-xs sm:text-sm">
                বাংলাদেশ সরকারি নিয়োগের ক্ষেত্রে সাধারণত সার্কুলার প্রকাশের মাসের প্রথম দিনকে কাট-অফ ডেট হিসেবে ধরা হয় (যেমন: ১ জানুয়ারি, ১ জুলাই বা ১ অক্টোবর)। প্রার্থীকে অবশ্যই সার্কুলারে উল্লিখিত তারিখে ১৮ বছর পূর্ণ হতে হবে এবং ৩০ বছর (অথবা কোটাভুক্ত হলে ৩২ বছর) অতিক্রম করা যাবে না।
              </p>
            </div>

            <div className="py-4 space-y-1.5">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">
                ২. আমার বয়স কি ৩০ বছর পার হয়ে একদিন হলেও আবেদন করা যাবে?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-xs sm:text-sm">
                না। সরকারি বিধিমালার শর্ত অনুযায়ী সার্কুলারের কাট-অফ তারিখে প্রার্থীর বয়স ৩০ বছর ০ মাস ০ দিন পর্যন্ত গ্রহণযোগ্য। বয়স ১ দিনও বেশি হলে সাধারণ কোটায় আবেদন বাতিল বলে গণ্য হয় (যদি বিশেষ সরকারি বয়স ছাড়ের কোনো প্রজ্ঞাপন না থাকে)।
              </p>
            </div>

            <div className="py-4 space-y-1.5">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">
                ৩. কোন কোন পদে আবেদনের ক্ষেত্রে বিশেষ বয়স ছাড় পাওয়া যায়?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-xs sm:text-sm">
                মুক্তিযোদ্ধার সন্তান এবং শারীরিক প্রতিবন্ধী প্রার্থীদের জন্য ৩২ বছর পর্যন্ত ছাড় রয়েছে। এছাড়া বিসিএস স্বাস্থ্য ক্যাডারে সহকারী সার্জন পদের জন্য ৩২ বছর এবং বিভিন্ন মন্ত্রণালয় ও অধিদপ্তরের অভ্যন্তরীণ বিভাগীয় প্রার্থীদের (Departmental Candidate) ক্ষেত্রে চাকরির বিধিমালা সাপেক্ষে সর্বোচ্চ ৩৫ বা ৪০ বছর পর্যন্ত আবেদনের সুযোগ থাকে।
              </p>
            </div>

            <div className="py-4 space-y-1.5">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">
                ৪. অনলাইনে বয়স হিসাবের জন্য এই ক্যালকুলেটর কতটা নির্ভরযোগ্য?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-xs sm:text-sm">
                আমাদের এই ক্যালকুলেটরটি অধিবর্ষ (Leap Year) এবং প্রতিটি মাসের প্রকৃত দিন সংখ্যা (২৮, ২৯, ৩০ বা ৩১ দিন) যথাযথভাবে সমন্বয় করে তৈরি করা হয়েছে। এটি বিপিএসসি (BPSC) ও টেলিটকের অনলাইন অ্যাপ্লিকেশন সিস্টেমের সাথে ১০০% সামঞ্জস্যপূর্ণ।
              </p>
            </div>

          </div>

          {/* Quick links to other tools */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-gray-500">অন্যান্য প্রয়োজনীয় একাডেমিক ক্যালকুলেটর:</span>
            <div className="flex items-center gap-2">
              <Link 
                href="/tools/#gpa-calculator" 
                className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:text-emerald-600 transition font-semibold"
              >
                GPA ক্যালকুলেটর →
              </Link>
              <Link 
                href="/tools/#nu-cgpa-calculator" 
                className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:text-emerald-600 transition font-semibold"
              >
                NU CGPA ক্যালকুলেটর →
              </Link>
              <Link 
                href="/jobs/" 
                className="px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold transition flex items-center gap-1"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>সরকারি চাকরি সার্কুলার</span>
              </Link>
            </div>
          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
}
