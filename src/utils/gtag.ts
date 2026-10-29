export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XS014SZRQ7';

// Track pageviews
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track specific custom events (downloads, clicks, searches, etc.)
export const trackEvent = (
  action: string,
  params: Record<string, string | number | boolean | undefined> = {}
) => {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', action, params);
  }
};
