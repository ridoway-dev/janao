import { MetadataRoute } from 'next';
import { BOOKS_DATA, NOTICES_DATA, CLASS_SHORTCUTS } from '@/data/nctbData';
import { bnDateToIso } from '@/utils/bnDate';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://janao.online';
  // lastmod must say when *that* page actually changed. The old code stamped
  // every hub, pillar and 2027 book page with the newest date anywhere on the
  // site, so one notice correction re-stamped 514 URLs (audit #4, P2-1) and
  // taught Google to ignore the site's lastmods. Each group below now uses
  // only the dates of the content it actually lists:
  // - notice-aggregating hubs: the newest notice date (they list notices)
  // - book hubs/pillars and 2027 book pages: the last real book change
  //   (2027 pages were retitled on 2026-11-11; 2026 books carry their own
  //   last_verified)
  // - tools pages: no lastModified — their content is not tracked by any
  //   data date, and stamping them with the newest notice date would be a
  //   false claim.
  const noticeDates = [
    ...NOTICES_DATA.flatMap((n) => [bnDateToIso(n.date), bnDateToIso(n.lastUpdated)]),
  ].filter((d): d is string => Boolean(d));
  const latestNoticeDate = noticeDates.sort().at(-1) ?? new Date().toISOString().slice(0, 10);
  const bookVerifiedDates = BOOKS_DATA.map((b) => bnDateToIso(b.last_verified)).filter(
    (d): d is string => Boolean(d),
  );
  const latestBookVerifiedDate = bookVerifiedDates.sort().at(-1) ?? '2026-10-05';
  const book2027RetitleDate = '2026-11-11';

  // 1. Core hub pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: latestNoticeDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/books/`,
      lastModified: book2027RetitleDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/books/2027/`,
      lastModified: book2027RetitleDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/notices/`,
      lastModified: latestNoticeDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/results/`,
      lastModified: latestNoticeDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/results/hsc/`,
      lastModified: latestNoticeDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/admission/`,
      lastModified: latestNoticeDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jobs/`,
      lastModified: latestNoticeDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/madrasa/`,
      lastModified: book2027RetitleDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/madrasa/ebtedayi/`,
      lastModified: book2027RetitleDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/madrasa/dakhil/`,
      lastModified: book2027RetitleDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission/university/`,
      lastModified: latestNoticeDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission/nu/`,
      lastModified: latestNoticeDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission/medical/`,
      lastModified: latestNoticeDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission/engineering/`,
      lastModified: latestNoticeDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission/university/2027/`,
      lastModified: latestNoticeDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission/nu/2027/`,
      lastModified: latestNoticeDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission/medical/2027/`,
      lastModified: latestNoticeDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission/engineering/2027/`,
      lastModified: latestNoticeDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jobs/government/`,
      lastModified: latestNoticeDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jobs/bcs/`,
      lastModified: latestNoticeDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jobs/bank/`,
      lastModified: latestNoticeDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jobs/private/`,
      lastModified: latestNoticeDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/syllabus/`,
      lastModified: latestNoticeDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/job-age-calculator/`,
      changeFrequency: 'daily',
      priority: 0.95,
    },
  ];

  // 2. Class Pillar Pages (2026) — built from CLASS_SHORTCUTS, the same
  // source the class pages use, so madrasa pillars (ibtedai-1..5,
  // dakhil-6..9) are listed too instead of only class-1..12.
  const classPillars: MetadataRoute.Sitemap = CLASS_SHORTCUTS.flatMap((g) =>
    g.classes.map((c) => ({
      url: `${baseUrl}/books/${c.id}/`,
      lastModified: latestBookVerifiedDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    })),
  );

  // 2b. Class Pillar Pages (2027) — built from CLASS_SHORTCUTS, the same
  // source the 2026 pillars and the 2027 pages use, so the 9 madrasa
  // pillars (ibtedai-1..5, dakhil-6..9) are listed too, not only class-1..12.
  const class2027Pillars: MetadataRoute.Sitemap = CLASS_SHORTCUTS.flatMap((g) =>
    g.classes.map((c) => ({
      url: `${baseUrl}/books/2027/${c.id}/`,
      lastModified: book2027RetitleDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    })),
  );

  // 3. Individual Book Pages (2026) — only year-2026 records. The
  // year-2027 records carry `-2027` slugs that have no built page
  // (the 2027 pages live under /books/2027/...), so listing them here
  // put 438 dead URLs in the sitemap.
  const bookPages: MetadataRoute.Sitemap = BOOKS_DATA.filter((b) => b.year === 2026).map((book) => ({
    url: `${baseUrl}/books/${book.classLevel}/${book.slug}/`,
    lastModified: bnDateToIso(book.last_verified) ?? latestBookVerifiedDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 3b. Individual 2027 Book Pages — retitled to "PDF Download" on
  // 2026-11-11; that retitle is their last real change, so they carry
  // that fixed date instead of the newest notice date (which re-stamped
  // all 444 of them on every new notice).
  const book2027Pages: MetadataRoute.Sitemap = BOOKS_DATA.filter((b) => b.year === 2026).map((book) => ({
    url: `${baseUrl}/books/2027/${book.classLevel}/${book.slug}/`,
    lastModified: book2027RetitleDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 4. Individual Notices and Routines
  const noticePages: MetadataRoute.Sitemap = NOTICES_DATA.filter((n) => n.category !== 'result').map((notice) => ({
    url: `${baseUrl}/notices/${notice.slug}/`,
    lastModified: bnDateToIso(notice.lastUpdated) ?? bnDateToIso(notice.date) ?? latestNoticeDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 5. Individual Results Articles
  const resultPages: MetadataRoute.Sitemap = NOTICES_DATA.filter((n) => n.category === 'result').map((result) => ({
    url: `${baseUrl}/results/${result.slug}/`,
    lastModified: bnDateToIso(result.lastUpdated) ?? bnDateToIso(result.date) ?? latestNoticeDate,
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
