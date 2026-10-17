import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8563138483:AAFL4tdXdyPPGdRoLRA5DwCbzESIN82cTxY';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '8040452117';

// Parse device & browser details from User-Agent string
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

// Convert country code to emoji flag
function getCountryFlag(countryCode?: string) {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { 
      page = '/', 
      title = '', 
      referrer = '', 
      screen = '', 
      type = 'visit', 
      bookTitle = '' 
    } = body;

    // Extract IP
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const rawIp = forwarded ? forwarded.split(',')[0].trim() : (realIp || 'Unknown IP');
    const ip = rawIp.replace('::ffff:', '');

    // Vercel Geolocation headers
    let city = req.headers.get('x-vercel-ip-city');
    let country = req.headers.get('x-vercel-ip-country') || 'BD';
    let region = req.headers.get('x-vercel-ip-country-region');

    // Decode city name if URI encoded by Vercel
    if (city) {
      try {
        city = decodeURIComponent(city);
      } catch {
        // ignore
      }
    }

    // Fallback geolocation if local or headers missing
    if (!city && ip && ip !== 'Unknown IP' && ip !== '127.0.0.1' && ip !== '::1') {
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,regionName,city`, {
          signal: AbortSignal.timeout(1500),
        });
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData.status === 'success') {
            city = geoData.city;
            country = geoData.countryCode || country;
            region = geoData.regionName;
          }
        }
      } catch {
        // Ignore timeout or network errors
      }
    }

    const flag = getCountryFlag(country);
    const locationStr = [city, region, country].filter(Boolean).join(', ') || 'Bangladesh';

    // Parse UA
    const userAgent = req.headers.get('user-agent') || '';
    const { device, os, browser } = parseUserAgent(userAgent);

    // Format Bangladesh Time (BST: UTC+6)
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

    // Clean Referrer
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

    // Build Telegram Notification Message
    let message = '';
    if (type === 'download') {
      message = `📥 <b>পিডিএফ ডাউনলোড শুরু হয়েছে!</b>\n\n` +
        `📖 <b>বই:</b> ${bookTitle || title || page}\n` +
        `📍 <b>লোকেশন:</b> ${flag} ${locationStr}\n` +
        `📱 <b>ডিভাইস:</b> ${device} (${os} / ${browser})\n` +
        `🕒 <b>সময়:</b> ${bdTimeStr} (BD)\n` +
        `🌐 <b>আইপি:</b> <code>${ip}</code>`;
    } else if (type === 'reader') {
      message = `👀 <b>অনলাইনে বই পড়া শুরু করেছে!</b>\n\n` +
        `📖 <b>বই:</b> ${bookTitle || title || page}\n` +
        `📍 <b>লোকেশন:</b> ${flag} ${locationStr}\n` +
        `📱 <b>ডিভাইস:</b> ${device} (${os} / ${browser})\n` +
        `🕒 <b>সময়:</b> ${bdTimeStr} (BD)`;
    } else {
      // New visitor entry
      message = `🌐 <b>নতুন ভিজিটর প্রবেশ করেছে!</b>\n\n` +
        `📍 <b>লোকেশন:</b> ${flag} ${locationStr}\n` +
        `📱 <b>ডিভাইস:</b> ${device} (${os} / ${browser})\n` +
        (screen ? `🖥️ <b>স্ক্রিন:</b> ${screen}\n` : '') +
        `🔗 <b>পেজ:</b> <code>${page}</code>\n` +
        (title ? `📄 <b>শিরোনাম:</b> ${title.slice(0, 60)}\n` : '') +
        `🔍 <b>উৎস:</b> ${sourceText}\n` +
        `🕒 <b>সময়:</b> ${bdTimeStr} (BD)\n` +
        `🌐 <b>আইপি:</b> <code>${ip}</code>`;
    }

    // Send to Telegram
    const telegramEndpoint = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const tgRes = await fetch(telegramEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const tgData = await tgRes.json().catch(() => ({}));
    if (!tgData.ok) {
      console.warn('Telegram Notification status:', tgData);
    }

    return NextResponse.json({ success: true, tgOk: tgData.ok });
  } catch (error) {
    console.error('Visitor tracking error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
