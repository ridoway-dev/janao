import { MetadataRoute } from 'next';
import { BOOKS_DATA, NOTICES_DATA } from '@/data/nctbData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://janao.online';
  const currentDate = new Date().toISOString();

  // 1. Core hub pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/books/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/books/2027/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/notices/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/results/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jobs/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/madrasa/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/madrasa/ebtedayi/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/madrasa/dakhil/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission/university/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission/nu/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission/medical/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission/engineering/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission/university/2027/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission/nu/2027/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jobs/government/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jobs/bcs/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jobs/bank/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jobs/private/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/syllabus/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // 2. Class Pillar Pages (Class 1-12) for 2026
  const classPillars: MetadataRoute.Sitemap = Array.from({ length: 12 }, (_, i) => ({
    url: `${baseUrl}/books/class-${i + 1}/`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // 2b. Class Pillar Pages (Class 1-12) for 2027
  const class2027Pillars: MetadataRoute.Sitemap = Array.from({ length: 12 }, (_, i) => ({
    url: `${baseUrl}/books/2027/class-${i + 1}/`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // 3. Individual Book Pages (2026)
  const bookPages: MetadataRoute.Sitemap = BOOKS_DATA.map((book) => ({
    url: `${baseUrl}/books/${book.classLevel}/${book.slug}/`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 3b. Individual 2027 Book Tracker Pages
  const book2027Pages: MetadataRoute.Sitemap = BOOKS_DATA.filter((b) => b.year === 2026).map((book) => ({
    url: `${baseUrl}/books/2027/${book.classLevel}/${book.slug}/`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 4. Individual Notices and Routines
  const noticePages: MetadataRoute.Sitemap = NOTICES_DATA.filter((n) => n.category !== 'result').map((notice) => ({
    url: `${baseUrl}/notices/${notice.slug}/`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 5. Individual Results Articles
  const resultPages: MetadataRoute.Sitemap = NOTICES_DATA.filter((n) => n.category === 'result').map((result) => ({
    url: `${baseUrl}/results/${result.slug}/`,
    lastModified: currentDate,
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
