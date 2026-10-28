// Cloudflare Pages Function: 302 redirect for legacy /api/pdf requests
export const onRequestGet = async (context: { request: Request }) => {
  const url = new URL(context.request.url);
  const pdfUrl = url.searchParams.get('url');

  if (!pdfUrl) {
    return new Response('PDF URL is required', { status: 400 });
  }

  try {
    return Response.redirect(pdfUrl, 302);
  } catch {
    return new Response('Invalid PDF URL', { status: 400 });
  }
};
