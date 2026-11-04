'use client';

import React, { useEffect, useId, useRef, useState } from 'react';

type AdFormat = 'banner' | 'native';

interface AdSlotProps {
  format?: AdFormat;
  className?: string;
  showDismiss?: boolean;
  compact?: boolean;
}

const ADSTERRA_KEY = '09a6cea867b302c63fa868d05b3c82a1';
const ADSTERRA_SCRIPT = `https://www.highrevenueformat.com/${ADSTERRA_KEY}/invoke.js`;

const NATIVE_CONTAINER_ID = 'container-8148d69aafa6ade6df9861a3a8499ae1';
const NATIVE_SCRIPT =
  'https://pl32191900.profitableratecpmnetwork.com/8148d69aafa6ade6df9861a3a8499ae1/invoke.js';

/**
 * Only loads the ad document when the slot is close to the viewport.
 * Ads therefore never compete with the initial render or with LCP.
 */
function useNearViewport<T extends HTMLElement>(rootMargin = '400px') {
  const ref = useRef<T>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, isNear };
}

function AdHeader({
  onDismiss,
  showDismiss,
}: {
  onDismiss: () => void;
  showDismiss: boolean;
}) {
  return (
    <div className="mb-1 flex w-full items-center justify-between gap-2">
      <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
        বিজ্ঞাপন
      </span>
      {showDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="বিজ্ঞাপন বন্ধ করুন"
          title="বিজ্ঞাপন বন্ধ করুন"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        >
          <span aria-hidden="true" className="text-sm leading-none">
            ×
          </span>
        </button>
      ) : null}
    </div>
  );
}

/**
 * Adsterra 160x300 banner.
 *
 * The network's loader uses document.write(), which cannot run safely inside a
 * React tree. It is therefore placed in its own iframe document. allow-same-origin
 * is required because the loader reads document.cookie; the iframe still keeps
 * document.write() and the ad markup out of the React tree.
 */
function BannerAd({
  slotId,
  onDismiss,
  showDismiss,
}: {
  slotId: string;
  onDismiss: () => void;
  showDismiss: boolean;
}) {
  const { ref, isNear } = useNearViewport<HTMLDivElement>();
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || data.source !== 'janao-ad' || data.slot !== slotId) return;
      if (data.status === 'empty') setIsEmpty(true);
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [slotId]);

  if (isEmpty) return null;

  const srcDoc = `<!doctype html>
<html lang="bn">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=160, initial-scale=1">
<style>
  html,body{margin:0;padding:0;width:160px;height:300px;overflow:hidden;background:transparent}
  body{display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif}
</style>
</head>
<body>
<script type="text/javascript">
  atOptions = {
    'key': '${ADSTERRA_KEY}',
    'format': 'iframe',
    'height': 300,
    'width': 160,
    'params': {}
  };
</script>
<script type="text/javascript" src="${ADSTERRA_SCRIPT}"></script>
<script type="text/javascript">
  (function () {
    var reported = false;
    function report(status) {
      if (reported) return;
      reported = true;
      try {
        parent.postMessage({ source: 'janao-ad', slot: ${JSON.stringify(slotId)}, status: status }, '*');
      } catch (e) {}
    }
    var attempts = 0;
    var timer = setInterval(function () {
      attempts += 1;
      var nodes = document.body.querySelectorAll('iframe, img, ins, a[href]');
      for (var i = 0; i < nodes.length; i += 1) {
        var node = nodes[i];
        var width = node.offsetWidth || node.width || 0;
        var height = node.offsetHeight || node.height || 0;
        if (width > 10 && height > 10) {
          report('loaded');
          clearInterval(timer);
          return;
        }
      }
      if (attempts > 20) {
        report('empty');
        clearInterval(timer);
      }
    }, 500);
  })();
</script>
</body>
</html>`;

  return (
    <div
      ref={ref}
      className="flex w-[160px] flex-col items-center"
      style={{ minHeight: 320 }}
    >
      <AdHeader onDismiss={onDismiss} showDismiss={showDismiss} />
      <div className="h-[300px] w-[160px] overflow-hidden rounded border border-gray-200 bg-gray-50/60 dark:border-gray-800 dark:bg-gray-900/40">
        {isNear ? (
          <iframe
            title="বিজ্ঞাপন"
            srcDoc={srcDoc}
            width={160}
            height={300}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ display: 'block', border: 0, width: 160, height: 300 }}
          />
        ) : null}
      </div>
    </div>
  );
}

/**
 * Monetag native banner. The network requires a real container in the page,
 * so the script is injected only when the slot approaches the viewport.
 * If no ad fills the container, the slot collapses instead of leaving a gap.
 */
function NativeAd({
  onDismiss,
  showDismiss,
}: {
  onDismiss: () => void;
  showDismiss: boolean;
}) {
  const { ref, isNear } = useNearViewport<HTMLDivElement>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (!isNear) return;

    const script = document.createElement('script');
    script.src = NATIVE_SCRIPT;
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.setAttribute('data-janao-ad', 'native');
    document.body.appendChild(script);

    const timer = window.setTimeout(() => {
      const container = containerRef.current;
      if (!container || container.childElementCount === 0) {
        setIsEmpty(true);
      }
    }, 10000);

    return () => {
      window.clearTimeout(timer);
      script.remove();
    };
  }, [isNear]);

  if (isEmpty) return null;

  return (
    <div ref={ref} className="mx-auto w-full max-w-3xl" style={{ minHeight: 270 }}>
      <AdHeader onDismiss={onDismiss} showDismiss={showDismiss} />
      <div
        id={NATIVE_CONTAINER_ID}
        ref={containerRef}
        className="min-h-[250px] w-full overflow-hidden rounded border border-gray-200 bg-gray-50/60 dark:border-gray-800 dark:bg-gray-900/40"
      />
    </div>
  );
}

const DISMISS_KEY = 'janao_ads_dismissed';

export default function AdSlot({
  format = 'banner',
  className = '',
  showDismiss = true,
  compact = false,
}: AdSlotProps) {
  const slotId = useId();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === '1') {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDismissed(true);
      }
    } catch {
      // Storage can be unavailable in private modes; the ad still works.
    }
  }, []);

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // Ignore storage failures.
    }
  };

  if (dismissed) return null;

  return (
    <aside
      aria-label="বিজ্ঞাপন"
      className={`${compact ? '' : 'my-6'} flex w-full justify-center ${className}`}
    >
      {format === 'native' ? (
        <NativeAd onDismiss={dismiss} showDismiss={showDismiss} />
      ) : (
        <BannerAd
          slotId={slotId}
          onDismiss={dismiss}
          showDismiss={showDismiss}
        />
      )}
    </aside>
  );
}
