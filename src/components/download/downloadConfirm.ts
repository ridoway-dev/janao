export interface DownloadRequest {
  url: string;
  filename: string;
  bookTitle: string;
  fileSize?: string;
}

export const DOWNLOAD_REQUEST_EVENT = 'janao:download-request';

/**
 * Opens the site-wide download confirmation modal.
 * Kept as a tiny event helper so both client components and server-rendered
 * pages (through <DownloadLink>) can use the same flow.
 */
export function requestDownload(detail: DownloadRequest) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<DownloadRequest>(DOWNLOAD_REQUEST_EVENT, { detail })
  );
}
