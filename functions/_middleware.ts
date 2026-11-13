// Cloudflare Pages Function: redirect www.janao.online to the apex domain.
// The absolute-URL www rules in public/_redirects do not fire live, so this
// middleware enforces the canonical non-www host with a 301 instead.
// All other hosts pass through untouched.
export const onRequest = async (context: {
  request: Request;
  next: () => Promise<Response>;
}) => {
  const url = new URL(context.request.url);

  if (url.hostname === 'www.janao.online') {
    return Response.redirect(
      `https://janao.online${url.pathname}${url.search}`,
      301
    );
  }

  return context.next();
};
