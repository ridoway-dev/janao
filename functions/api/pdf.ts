// Cloudflare Pages Function: PDF streamer with attachment header for instant browser downloads
export const onRequestGet = async (context: { request: Request }) => {
  const url = new URL(context.request.url);
  const pdfUrl = url.searchParams.get('url');
  const filename = url.searchParams.get('filename') || 'nctb-book.pdf';
  const isDownload = url.searchParams.get('download') === 'true';

  if (!pdfUrl) {
    return new Response('PDF URL is required', { status: 400 });
  }

  try {
    const upstream = await fetch(pdfUrl);
    if (!upstream.ok) {
      return Response.redirect(pdfUrl, 302);
    }

    const safeAsciiFilename = filename.replace(/[^\x20-\x7E]/g, '_');
    const encodedFilename = encodeURIComponent(filename);

    const disposition = isDownload
      ? `attachment; filename="${safeAsciiFilename}"; filename*=UTF-8''${encodedFilename}`
      : `inline; filename="${safeAsciiFilename}"; filename*=UTF-8''${encodedFilename}`;

    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', disposition);
    headers.set('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
    headers.set('Access-Control-Allow-Origin', '*');

    const contentLength = upstream.headers.get('content-length');
    if (contentLength) {
      headers.set('Content-Length', contentLength);
    }

    return new Response(upstream.body, {
      status: 200,
      headers,
    });
  } catch (err: any) {
    return Response.redirect(pdfUrl, 302);
  }
};
