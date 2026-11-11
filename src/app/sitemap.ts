import { MetadataRoute } from 'next';
import { BOOKS_DATA, NOTICES_DATA } from '@/data/nctbData';
import { bnDateToIso } from '@/utils/bnDate';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://janao.online';
  // Hub pages last changed when the newest content changed — stamping
  // every URL with the build time on every deploy tells Google that
  // 900+ pages changed when they did not.
  const contentDates = [
    ...NOTICES_DATA.flatMap((n) => [bnDateToIso(n.date), bnDateToIso(n.lastUpdated)]),
    ...BOOKS_DATA.map((b) => bnDateToIso(b.last_verified)),
  ].filter((d): d is string => Boolean(d));
  const latestContentDate = contentDates.sort().at(-1) ?? new Date().toISOString().slice(0, 10);

  // 1. Core hub pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: latestContentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/books/`,
      lastModified: latestContentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/books/2027/`,
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/notices/`,
      lastModified: latestContentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/results/`,
      lastModified: latestContentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/results/hsc/`,
      lastModified: latestContentDate,
      changeFrequency: 'hourly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/admission/`,
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jobs/`,
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/madrasa/`,
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/madrasa/ebtedayi/`,
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/madrasa/dakhil/`,
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission/university/`,
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission/nu/`,
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission/medical/`,
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission/engineering/`,
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission/university/2027/`,
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission/nu/2027/`,
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jobs/government/`,
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jobs/bcs/`,
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jobs/bank/`,
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jobs/private/`,
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/syllabus/`,
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/`,
      lastModified: latestContentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/job-age-calculator/`,
      lastModified: latestContentDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
  ];

  // 2. Class Pillar Pages (Class 1-12) for 2026
  const classPillars: MetadataRoute.Sitemap = Array.from({ length: 12 }, (_, i) => ({
    url: `${baseUrl}/books/class-${i + 1}/`,
    lastModified: latestContentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // 2b. Class Pillar Pages (Class 1-12) for 2027
  const class2027Pillars: MetadataRoute.Sitemap = Array.from({ length: 12 }, (_, i) => ({
    url: `${baseUrl}/books/2027/class-${i + 1}/`,
    lastModified: latestContentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // 3. Individual Book Pages (2026)
  const bookPages: MetadataRoute.Sitemap = BOOKS_DATA.map((book) => ({
    url: `${baseUrl}/books/${book.classLevel}/${book.slug}/`,
    lastModified: bnDateToIso(book.last_verified) ?? latestContentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 3b. Individual 2027 Book Tracker Pages
  const book2027Pages: MetadataRoute.Sitemap = BOOKS_DATA.filter((b) => b.year === 2026).map((book) => ({
    url: `${baseUrl}/books/2027/${book.classLevel}/${book.slug}/`,
    lastModified: bnDateToIso(book.last_verified) ?? latestContentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 4. Individual Notices and Routines
  const noticePages: MetadataRoute.Sitemap = NOTICES_DATA.filter((n) => n.category !== 'result').map((notice) => ({
    url: `${baseUrl}/notices/${notice.slug}/`,
    lastModified: bnDateToIso(notice.lastUpdated) ?? bnDateToIso(notice.date) ?? latestContentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 5. Individual Results Articles
  const resultPages: MetadataRoute.Sitemap = NOTICES_DATA.filter((n) => n.category === 'result').map((result) => ({
    url: `${baseUrl}/results/${result.slug}/`,
    lastModified: bnDateToIso(result.lastUpdated) ?? bnDateToIso(result.date) ?? latestContentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    ...corePages,
    ...classPillars,
    ...class2027Pillars,
    ...bookPages,
    ...book2027Pages,
    ...noticePages,
    ...resultPages,
  ];
}
