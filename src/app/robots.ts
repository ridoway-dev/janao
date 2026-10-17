import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/search',
          '/*?*', // Prevent thin/duplicate query strings from being indexed
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/search', '/*?*'],
      },
    ],
    sitemap: 'https://janao.online/sitemap.xml',
    host: 'https://janao.online',
  };
}
