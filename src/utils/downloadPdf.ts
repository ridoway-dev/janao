import { notifyDownload } from '@/utils/notifier';

/**
 * Get direct download URL with attachment header from Cloudflare Pages Function
 */
export function getDirectDownloadUrl(url: string, filename?: string): string {
  if (!url || !url.startsWith('http')) return '#';
  let cleanName = filename?.trim() || 'nctb-book.pdf';
  if (!cleanName.toLowerCase().endsWith('.pdf')) {
    cleanName += '.pdf';
  }
  return `/api/pdf?url=${encodeURIComponent(url)}&download=true&filename=${encodeURIComponent(cleanName)}`;
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

  // Trigger instant browser download
  const downloadUrl = getDirectDownloadUrl(url, cleanFilename);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', cleanFilename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
