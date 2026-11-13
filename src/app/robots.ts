import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

// Paths that should never be crawled: API routes and arbitrary query-string
// URLs (which create duplicate content). /search is NOT disallowed here:
// it carries a page-level noindex, which is the single mechanism for it
// (audit L1 — disallow + noindex together are contradictory signals).
const DISALLOWED_PATHS = ['/api/', '/*?*'];

// Explicitly welcome AI/LLM crawlers so the site can be quoted by AI search
// engines. They inherit the same sensible crawl rules as other bots.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'cohere-ai',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOWED_PATHS,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: DISALLOWED_PATHS,
      },
      {
        userAgent: AI_CRAWLERS,
        allow: '/',
        disallow: DISALLOWED_PATHS,
      },
    ],
    sitemap: 'https://janao.online/sitemap.xml',
    host: 'https://janao.online',
  };
}
