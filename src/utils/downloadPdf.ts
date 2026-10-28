import { notifyDownload } from '@/utils/notifier';

/**
 * Utility to download PDF directly using JavaScript Blob or fallback to proxy attachment
 */
export function getDirectDownloadUrl(url: string, filename?: string): string {
  if (!url || !url.startsWith('http')) return '#';
  return url;
}

export function downloadPdfFile(url: string, filename?: string): void {
  if (!url || !url.startsWith('http')) {
    alert('এই বইটির পিডিএফ ফাইল এখনও প্রকাশিত হয়নি বা লিংকটি প্রস্তুত নয়।');
    return;
  }

  // Derive a clean filename if not passed
  let cleanFilename = filename?.trim();
  if (!cleanFilename) {
    try {
      const parsed = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
      const segment = parsed.pathname.split('/').filter(Boolean).pop();
      cleanFilename = segment && segment.endsWith('.pdf') ? segment : 'nctb-book.pdf';
    } catch {
      cleanFilename = 'nctb-book.pdf';
    }
  }

  if (!cleanFilename.toLowerCase().endsWith('.pdf')) {
    cleanFilename += '.pdf';
  }

  // Notify visitor tracker and show on-screen toast notification
  notifyDownload(cleanFilename);

  // Trigger direct browser download from Cloudflare R2
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', cleanFilename);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
