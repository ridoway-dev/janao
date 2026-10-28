import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b0f19" />
      <stop offset="50%" stop-color="#06131c" />
      <stop offset="100%" stop-color="#051b14" />
    </linearGradient>

    <!-- Radial Emerald Glows -->
    <radialGradient id="glow1" cx="20%" cy="20%" r="50%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#10b981" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glow2" cx="80%" cy="80%" r="50%">
      <stop offset="0%" stop-color="#059669" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#059669" stop-opacity="0" />
    </radialGradient>

    <!-- Brand Green Gradient -->
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#34d399" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>

    <!-- Border Glow -->
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.05" />
    </linearGradient>
  </defs>

  <!-- Background Base -->
  <rect width="1200" height="630" fill="url(#bg)" />
  <rect width="1200" height="630" fill="url(#glow1)" />
  <rect width="1200" height="630" fill="url(#glow2)" />

  <!-- Subtle Grid Accent -->
  <g opacity="0.06">
    <line x1="0" y1="100" x2="1200" y2="100" stroke="#ffffff" stroke-width="1" />
    <line x1="0" y1="200" x2="1200" y2="200" stroke="#ffffff" stroke-width="1" />
    <line x1="0" y1="300" x2="1200" y2="300" stroke="#ffffff" stroke-width="1" />
    <line x1="0" y1="400" x2="1200" y2="400" stroke="#ffffff" stroke-width="1" />
    <line x1="0" y1="500" x2="1200" y2="500" stroke="#ffffff" stroke-width="1" />
    <line x1="200" y1="0" x2="200" y2="630" stroke="#ffffff" stroke-width="1" />
    <line x1="400" y1="0" x2="400" y2="630" stroke="#ffffff" stroke-width="1" />
    <line x1="600" y1="0" x2="600" y2="630" stroke="#ffffff" stroke-width="1" />
    <line x1="800" y1="0" x2="800" y2="630" stroke="#ffffff" stroke-width="1" />
    <line x1="1000" y1="0" x2="1000" y2="630" stroke="#ffffff" stroke-width="1" />
  </g>

  <!-- Outer Card Frame -->
  <rect x="30" y="30" width="1140" height="570" rx="24" fill="none" stroke="url(#borderGrad)" stroke-width="2" />

  <!-- TOP HEADER -->
  <g transform="translate(70, 70)">
    <!-- Logo Icon -->
    <rect x="0" y="0" width="56" height="56" rx="16" fill="#10b981" />
    <!-- Book symbol in icon -->
    <path d="M16 18h10c2 0 4 1.5 4 3.5v16c0-1.5-1.5-3-3.5-3H16V18zm24 0H30c-2 0-4 1.5-4 3.5v16c0-1.5 1.5-3 3.5-3h10.5V18z" fill="#ffffff" />
    
    <!-- Brand Title -->
    <text x="72" y="36" font-family="'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="900" fill="#ffffff">
      Janao<tspan fill="#34d399">.online</tspan>
    </text>
    <text x="74" y="55" font-family="'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="500" fill="#94a3b8">
      শিক্ষা, চাকরি ও ক্যারিয়ার তথ্য পোর্টাল
    </text>

    <!-- Right Badge -->
    <g transform="translate(830, 8)">
      <rect x="0" y="0" width="230" height="40" rx="20" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="1.5" />
      <text x="115" y="25" font-family="'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#6ee7b7" text-anchor="middle">
        ফ্রি পাঠ্যবই ও রুটিন পোর্টাল
      </text>
    </g>
  </g>

  <!-- CENTER HERO CONTENT -->
  <g transform="translate(600, 250)" text-anchor="middle">
    <!-- Big English Headline -->
    <text y="0" font-family="'Segoe UI', Roboto, sans-serif" font-size="54" font-weight="900" fill="#ffffff" letter-spacing="-1">
      NCTB Books 2026 &amp; 2027 PDF
    </text>
    
    <!-- Bengali Subtitle -->
    <text y="50" font-family="'Segoe UI', 'Noto Sans Bengali', sans-serif" font-size="24" font-weight="600" fill="#a7f3d0">
      ১ম থেকে ১২শ শ্রেণির সকল বিষয়ের নতুন শিক্ষাক্রমের পাঠ্যবই
    </text>

    <!-- Description -->
    <text y="88" font-family="'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="400" fill="#94a3b8">
      বোর্ড অনুমোদিত মূল বই সম্পূর্ণ বিনামূল্যে সরাসরি অনলাইনে পড়ুন ও ডাউনলোড করুন
    </text>
  </g>

  <!-- FEATURE CHIPS -->
  <g transform="translate(140, 400)">
    <!-- Chip 1 -->
    <g transform="translate(0, 0)">
      <rect width="210" height="44" rx="12" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1" />
      <circle cx="24" cy="22" r="5" fill="#10b981" />
      <text x="38" y="27" font-family="'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">
        প্রাথমিক ও মাধ্যমিক (১–১০)
      </text>
    </g>

    <!-- Chip 2 -->
    <g transform="translate(230, 0)">
      <rect width="210" height="44" rx="12" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1" />
      <circle cx="24" cy="22" r="5" fill="#10b981" />
      <text x="38" y="27" font-family="'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">
        দাখিল ও ইবতেদায়ি
      </text>
    </g>

    <!-- Chip 3 -->
    <g transform="translate(460, 0)">
      <rect width="220" height="44" rx="12" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1" />
      <circle cx="24" cy="22" r="5" fill="#10b981" />
      <text x="38" y="27" font-family="'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">
        SSC ও HSC রুটিন ২০২৭
      </text>
    </g>

    <!-- Chip 4 -->
    <g transform="translate(700, 0)">
      <rect width="220" height="44" rx="12" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1" />
      <circle cx="24" cy="22" r="5" fill="#10b981" />
      <text x="38" y="27" font-family="'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">
        ফ্রি ডাউনলোড ও প্রিভিউ
      </text>
    </g>
  </g>

  <!-- BOTTOM FOOTER BAR -->
  <g transform="translate(70, 545)">
    <line x1="0" y1="0" x2="1060" y2="0" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1" />
    
    <!-- Left text -->
    <circle cx="8" cy="22" r="4" fill="#10b981" />
    <text x="20" y="26" font-family="'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#94a3b8">
      জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুমোদিত সংস্করণ
    </text>

    <!-- Right Domain Link -->
    <text x="1060" y="26" font-family="'Consolas', 'Courier New', monospace" font-size="17" font-weight="700" fill="#34d399" text-anchor="end">
      https://janao.online
    </text>
  </g>
</svg>
`;

async function generate() {
  const buffer = Buffer.from(svg);
  const pngBuffer = await sharp(buffer)
    .png({ quality: 95, compressionLevel: 8 })
    .toBuffer();

  const publicPath = path.resolve(__dirname, '../public/og-image.png');
  const appOgPath = path.resolve(__dirname, '../src/app/opengraph-image.png');
  const appTwitterPath = path.resolve(__dirname, '../src/app/twitter-image.png');

  fs.writeFileSync(publicPath, pngBuffer);
  fs.writeFileSync(appOgPath, pngBuffer);
  fs.writeFileSync(appTwitterPath, pngBuffer);

  console.log('✅ Generated 1200x630 OpenGraph images successfully!');
  console.log('   - ' + publicPath);
  console.log('   - ' + appOgPath);
  console.log('   - ' + appTwitterPath);
}

generate().catch(console.error);
