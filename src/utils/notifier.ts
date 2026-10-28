export type NotificationType = 'download' | 'success' | 'info' | 'error';

export interface ToastMessage {
  id?: string;
  type?: NotificationType;
  title: string;
  description?: string;
  duration?: number;
}

export function notify(toast: ToastMessage) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('show_toast_notification', { detail: toast })
    );
  }
}

export function notifyDownload(bookTitle: string) {
  notify({
    type: 'download',
    title: 'ডাউনলোড শুরু হয়েছে!',
    description: `"${bookTitle}" ব্রাউজারে সরাসরি সেভ হচ্ছে।`,
    duration: 4500,
  });

  // Also trigger Telegram visitor tracking
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('track_visitor_action', {
        detail: { type: 'download', bookTitle },
      })
    );
  }
}
