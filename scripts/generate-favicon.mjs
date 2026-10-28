import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#065f46" />
      <stop offset="50%" stop-color="#047857" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>
    <filter id="bookShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#022c22" flood-opacity="0.4"/>
    </filter>
  </defs>

  <!-- Modern Squircle Base -->
  <rect width="64" height="64" rx="15" fill="url(#bgGrad)" />
  <rect x="1" y="1" width="62" height="62" rx="14" fill="none" stroke="#6ee7b7" stroke-width="1.2" stroke-opacity="0.4" />

  <!-- Book & Knowledge Symbol -->
  <g transform="translate(11, 15)" filter="url(#bookShadow)">
    <!-- Left Open Page -->
    <path d="M 21 24.5 C 15 22 7 22 2 24 L 2 6.5 C 7 4.5 15 4.5 21 7 Z" fill="#ffffff" fill-opacity="0.95" />
    <!-- Right Open Page -->
    <path d="M 21 24.5 C 27 22 35 22 40 24 L 40 6.5 C 35 4.5 27 4.5 21 7 Z" fill="#ffffff" />
    <!-- Center Ribbon / Spine -->
    <path d="M 20 6.5 L 22 6.5 L 22 26 L 21 25 L 20 26 Z" fill="url(#goldGrad)" />
    <!-- Star Sparkle of Education -->
    <path d="M 21 -1.5 L 22.4 2 L 26 3.5 L 22.4 5 L 21 8.5 L 19.6 5 L 16 3.5 L 19.6 2 Z" fill="#fde047" />
  </g>
</svg>`;

// Standard ICO format helper for PNG frames
function createIco(pngBuffers) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO image type (1 = ICO)
  header.writeUInt16LE(pngBuffers.length, 4); // count of images

  let offset = 6 + (16 * pngBuffers.length);
  const directoryEntries = [];

  for (const { buffer, size } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0); // width
    entry.writeUInt8(size === 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // image size in bytes
    entry.writeUInt32LE(offset, 12); // image offset in file
    directoryEntries.push(entry);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...directoryEntries, ...pngBuffers.map(b => b.buffer)]);
}

async function run() {
  console.log('Generating crisp favicon assets...');
  const svgBuffer = Buffer.from(svgContent);

  // 1. Write SVGs
  fs.writeFileSync(path.join(rootDir, 'src/app/icon.svg'), svgBuffer);
  fs.writeFileSync(path.join(rootDir, 'public/icon.svg'), svgBuffer);
  fs.writeFileSync(path.join(rootDir, 'public/favicon.svg'), svgBuffer);

  // 2. Render PNG resolutions
  const sizes = [16, 32, 48];
  const pngBuffers = [];

  for (const size of sizes) {
    const png = await sharp(svgBuffer).resize(size, size).png().toBuffer();
    pngBuffers.push({ buffer: png, size });
  }

  // Apple touch icon (180x180)
  const appleIcon180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(rootDir, 'src/app/apple-icon.png'), appleIcon180);
  fs.writeFileSync(path.join(rootDir, 'public/apple-touch-icon.png'), appleIcon180);

  // Standard 32x32 PNG icon
  const icon32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(rootDir, 'public/favicon-32x32.png'), icon32);
  fs.writeFileSync(path.join(rootDir, 'public/favicon-16x16.png'), pngBuffers[0].buffer);

  // 3. Build multi-resolution ICO (16, 32, 48)
  const icoBuffer = createIco(pngBuffers);
  fs.writeFileSync(path.join(rootDir, 'src/app/favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(rootDir, 'public/favicon.ico'), icoBuffer);

  console.log('✅ Favicon generated successfully:');
  console.log(' - src/app/icon.svg');
  console.log(' - src/app/favicon.ico');
  console.log(' - src/app/apple-icon.png');
  console.log(' - public/favicon.ico');
  console.log(' - public/icon.svg');
  console.log(' - public/apple-touch-icon.png');
}

run().catch(console.error);
