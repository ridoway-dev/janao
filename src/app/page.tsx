import type { Metadata } from 'next';
import HomePageClient from '@/components/HomePageClient';

const HOME_TITLE = 'Janao.online — NCTB পাঠ্যবই ২০২৬ ও ২০২৭, চাকরি ও ভর্তি';
const HOME_DESCRIPTION =
  'বাংলাদেশের শিক্ষা ও চাকরি তথ্য পোর্টাল। NCTB ২০২৬ ও ২০২৭ সালের সব শ্রেণির পাঠ্যবই PDF, এসএসসি-এইচএসসি রুটিন, ফলাফল, ভর্তি ও চাকরি সার্কুলার।';

export const metadata: Metadata = {
  // `absolute` keeps the homepage title exactly as written (no template),
  // staying inside the recommended 50-60 character range.
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: 'https://janao.online/',
    languages: {
      'bn-BD': 'https://janao.online/',
      'x-default': 'https://janao.online/',
    },
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: 'https://janao.online/',
    siteName: 'janao.online',
    locale: 'bn_BD',
    type: 'website',
    images: [
      {
        url: 'https://janao.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Janao.online — NCTB Books 2026 & 2027 PDF Download',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ['https://janao.online/og-image.png'],
  },
};

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://janao.online/#webpage',
  url: 'https://janao.online/',
  name: HOME_TITLE,
  description: HOME_DESCRIPTION,
  inLanguage: 'bn-BD',
  isPartOf: { '@id': 'https://janao.online/#website' },
  about: {
    '@type': 'Thing',
    name: 'NCTB পাঠ্যবই ২০২৬ ও ২০২৭',
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <HomePageClient />
    </>
  );
}
