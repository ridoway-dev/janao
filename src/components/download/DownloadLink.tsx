'use client';

import React from 'react';
import { getDirectDownloadUrl } from '@/utils/downloadPdf';
import { requestDownload } from './downloadConfirm';

interface DownloadLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'download'> {
  downloadUrl: string;
  filename: string;
  bookTitle: string;
  fileSize?: string;
}

/**
 * Drop-in replacement for the old direct-download anchors. It keeps the real
 * href for no-JS visitors, but intercepts normal clicks to show the
 * confirmation modal first.
 */
export default function DownloadLink({
  downloadUrl,
  filename,
  bookTitle,
  fileSize,
  onClick,
  children,
  ...props
}: DownloadLinkProps) {
  const href = getDirectDownloadUrl(downloadUrl, filename);

  return (
    <a
      {...props}
      href={href}
      download={filename}
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);

        if (!downloadUrl || !downloadUrl.startsWith('http')) {
          alert(
            'এই বইটির পিডিএফ ফাইল এখনও প্রকাশিত হয়নি বা লিংকটি প্রস্তুত নয়।'
          );
          return;
        }

        requestDownload({ url: downloadUrl, filename, bookTitle, fileSize });
      }}
    >
      {children}
    </a>
  );
}
