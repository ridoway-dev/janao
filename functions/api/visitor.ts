// Cloudflare Pages Function for Telegram Visitor Tracking
interface Env {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
}

function parseUserAgent(ua: string) {
  let device = 'Desktop 💻';
  if (/mobile|android|iphone|ipad|ipod|blackberry|opera mini|iemobile/i.test(ua)) {
    device = /ipad|tablet/i.test(ua) ? 'Tablet 📱' : 'Mobile 📱';
  }

  let os = 'Unknown OS';
  if (/windows/i.test(ua)) os = 'Windows';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/macintosh|mac os x/i.test(ua)) os = 'macOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  let browser = 'Unknown Browser';
  if (/edg/i.test(ua)) browser = 'Edge';
  else if (/samsungbrowser/i.test(ua)) browser = 'Samsung Internet';
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua)) browser = 'Safari';
  else if (/opera|opr/i.test(ua)) browser = 'Opera';

  return { device, os, browser };
}

function getCountryFlag(countryCode?: string) {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    const { request, env } = context;
    const body: any = await request.json().catch(() => ({}));
    const {
      page = '/',
      title = '',
      referrer = '',
      screen = '',
      type = 'visit',
      bookTitle = '',
    } = body;

    const botToken = env.TELEGRAM_BOT_TOKEN || '8563138483:AAFL4tdXdyPPGdRoLRA5DwCbzESIN82cTxY';
    const chatId = env.TELEGRAM_CHAT_ID || '8040452117';

    // Cloudflare Edge Geolocation
    const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || 'Unknown IP';
    const cf = (request as any).cf || {};
    const country = cf.country || request.headers.get('cf-ipcountry') || 'BD';
    const city = cf.city || '';
    const region = cf.region || '';

    const flag = getCountryFlag(country);
    const locationStr = [city, region, country].filter(Boolean).join(', ') || 'Bangladesh';

    const userAgent = request.headers.get('user-agent') || '';
    const { device, os, browser } = parseUserAgent(userAgent);

    const now = new Date();
    const bdTimeStr = now.toLocaleString('en-US', {
      timeZone: 'Asia/Dhaka',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    let sourceText = 'Direct Entry (সরাসরি)';
    if (referrer) {
      try {
        const refUrl = new URL(referrer);
        if (refUrl.hostname.includes('google')) {
          sourceText = 'Google Search 🔍';
        } else if (refUrl.hostname.includes('facebook') || refUrl.hostname.includes('fb.com')) {
          sourceText = 'Facebook 📱';
        } else if (refUrl.hostname.includes('youtube')) {
          sourceText = 'YouTube ▶️';
        } else {
          sourceText = refUrl.hostname;
        }
      } catch {
        sourceText = referrer.slice(0, 50);
      }
    }

    let message = '';
    if (type === 'download') {
      message =
        `📥 <b>পিডিএফ ডাউনলোড শুরু হয়েছে!</b>\n\n` +
        `📖 <b>বই:</b> ${bookTitle || title || page}\n` +
        `📍 <b>লোকেশন:</b> ${flag} ${locationStr}\n` +
        `📱 <b>ডিভাইস:</b> ${device} (${os} / ${browser})\n` +
        `🕒 <b>সময়:</b> ${bdTimeStr} (BD)\n` +
        `🌐 <b>আইপি:</b> <code>${ip}</code>`;
    } else if (type === 'reader') {
      message =
        `👀 <b>অনলাইনে বই পড়া শুরু করেছে!</b>\n\n` +
        `📖 <b>বই:</b> ${bookTitle || title || page}\n` +
        `📍 <b>লোকেশন:</b> ${flag} ${locationStr}\n` +
        `📱 <b>ডিভাইস:</b> ${device} (${os} / ${browser})\n` +
        `🕒 <b>সময়:</b> ${bdTimeStr} (BD)`;
    } else {
      message =
        `🌐 <b>নতুন ভিজিটর প্রবেশ করেছে!</b>\n\n` +
        `📍 <b>লোকেশন:</b> ${flag} ${locationStr}\n` +
        `📱 <b>ডিভাইস:</b> ${device} (${os} / ${browser})\n` +
        (screen ? `🖥️ <b>স্ক্রিন:</b> ${screen}\n` : '') +
        `🔗 <b>পেজ:</b> <code>${page}</code>\n` +
        (title ? `📄 <b>শিরোনাম:</b> ${title.slice(0, 60)}\n` : '') +
        `🔍 <b>উৎস:</b> ${sourceText}\n` +
        `🕒 <b>সময়:</b> ${bdTimeStr} (BD)\n` +
        `🌐 <b>আইপি:</b> <code>${ip}</code>`;
    }

    const telegramEndpoint = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const tgRes = await fetch(telegramEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const tgData: any = await tgRes.json().catch(() => ({}));

    return new Response(JSON.stringify({ success: true, tgOk: tgData.ok }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
