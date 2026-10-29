'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { pageview, trackEvent } from '@/utils/gtag';

export default function VisitorTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Avoid double firing in dev strict mode
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    // Track SPA pageview in Google Analytics
    pageview(pathname);

    try {
      const sessionKey = 'janao_visit_tracked';
      const hasTrackedSession = sessionStorage.getItem(sessionKey);

      const payload = {
        page: pathname || window.location.pathname,
        title: document.title || '',
        referrer: document.referrer || '',
        screen: `${window.screen.width}x${window.screen.height}`,
        type: hasTrackedSession ? 'page_view' : 'visit',
      };

      // Only notify Telegram on new visit session OR first entry to keep chat clean and relevant
      if (!hasTrackedSession) {
        sessionStorage.setItem(sessionKey, Date.now().toString());
        
        fetch('/api/visitor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).catch(() => {});
      }
    } catch {
      // Ignore client side storage or network errors
    }
  }, [pathname]);

  useEffect(() => {
    // Listen for custom action tracking (e.g. Download or Reader open)
    const handleAction = (e: Event) => {
      const customEvent = e as CustomEvent<{ type: string; bookTitle?: string; page?: string }>;
      if (!customEvent.detail) return;

      const actionType = customEvent.detail.type || 'file_download';
      const bookTitle = customEvent.detail.bookTitle || '';
      const page = customEvent.detail.page || window.location.pathname;

      // Track to Google Analytics 4
      trackEvent(actionType === 'download' ? 'file_download' : actionType, {
        file_name: bookTitle,
        item_name: bookTitle,
        page_location: window.location.href,
        page_path: page,
      });

      try {
        fetch('/api/visitor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page,
            title: document.title || '',
            type: actionType,
            bookTitle,
          }),
        }).catch(() => {});
      } catch {
        // ignore
      }
    };

    window.addEventListener('track_visitor_action', handleAction);
    return () => {
      window.removeEventListener('track_visitor_action', handleAction);
    };
  }, []);

  return null;
}
