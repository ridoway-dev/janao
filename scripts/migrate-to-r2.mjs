import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local manually
function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.R2_BUCKET_NAME;
const PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN;

if (!ACCOUNT_ID || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY || !BUCKET_NAME || !PUBLIC_DOMAIN) {
  console.error('\n❌ ভুল: Cloudflare R2 এর প্রয়োজনীয় ভেরিয়েবলগুলো পাওয়া যায়নি!');
  process.exit(1);
}

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

const cleanDomain = PUBLIC_DOMAIN.replace(/\/$/, '');
const CHECKPOINT_FILE = path.resolve(__dirname, 'migration_progress.json');
const DATA_FILE = path.resolve(__dirname, '../src/data/nctbData.ts');

function loadCheckpoint() {
  if (fs.existsSync(CHECKPOINT_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(CHECKPOINT_FILE, 'utf-8'));
    } catch (e) {
      return {};
    }
  }
  return {};
}

function saveCheckpoint(data) {
  fs.writeFileSync(CHECKPOINT_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

async function checkObjectExists(key) {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: key }));
    return true;
  } catch (err) {
    return false;
  }
}

async function uploadBook(book, checkpoint) {
  if (!book.downloadUrl || !book.downloadUrl.startsWith('http')) {
    return { bookId: book.id, skipped: true, reason: 'no-url' };
  }

  // Already migrated to this domain
  if (book.downloadUrl.startsWith(cleanDomain)) {
    return { bookId: book.id, newUrl: book.downloadUrl, skipped: true };
  }

  const cleanClass = book.classLevel || 'general';
  const cleanSlug = book.slug || `book-${book.id}`;
  const key = `books/${book.year || 2026}/${cleanClass}/${cleanSlug}.pdf`;
  const newPublicUrl = `${cleanDomain}/${key}`;

  if (checkpoint[book.id]) {
    return { bookId: book.id, newUrl: checkpoint[book.id], skipped: true };
  }

  const exists = await checkObjectExists(key);
  if (exists) {
    console.log(`⏩ [ইতিমধ্যে আপলোড আছে] ${book.titleBn} (${book.classNameBn})`);
    checkpoint[book.id] = newPublicUrl;
    saveCheckpoint(checkpoint);
    return { bookId: book.id, newUrl: newPublicUrl, skipped: true };
  }

  console.log(`⬇️ [ডাউনলোড ও আপলোড শুরু] ${book.titleBn} (${book.classNameBn}) ...`);

  let retries = 3;
  while (retries > 0) {
    try {
      const res = await fetch(book.downloadUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: key,
          Body: buffer,
          ContentType: 'application/pdf',
          ContentDisposition: `inline; filename="${cleanSlug}.pdf"`,
        })
      );

      console.log(`✅ [আপলোড সফল (${(buffer.length / (1024 * 1024)).toFixed(1)} MB)] ${book.titleBn} -> ${newPublicUrl}`);
      checkpoint[book.id] = newPublicUrl;
      saveCheckpoint(checkpoint);
      return { bookId: book.id, newUrl: newPublicUrl, skipped: false };
    } catch (err) {
      retries--;
      if (retries === 0) {
        console.error(`❌ [ব্যর্থ] ${book.titleBn}: ${err.message}`);
        return { bookId: book.id, error: err.message };
      }
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
}

// Concurrency helper
async function mapConcurrent(items, concurrency, fn) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const currentIndex = index++;
      const item = items[currentIndex];
      const res = await fn(item, currentIndex, items.length);
      results[currentIndex] = res;
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);
  return results;
}

async function run() {
  console.log('==============================================');
  console.log('🚀 Cloudflare R2 তে বই মাইগ্রেশন শুরু হচ্ছে...');
  console.log(`🌐 Public Domain: ${cleanDomain}`);
  console.log(`📦 R2 Bucket: ${BUCKET_NAME}`);
  console.log('==============================================\n');

  const checkpoint = loadCheckpoint();

  let content = fs.readFileSync(DATA_FILE, 'utf-8');
  const startTag = 'export const BOOKS_DATA: Book[] = ';
  const startIdx = content.indexOf(startTag);
  const endTag = '\n\n// Master Notices Data';
  const endIdx = content.indexOf(endTag, startIdx);

  if (startIdx === -1 || endIdx === -1) {
    console.error('❌ BOOKS_DATA ডাটা খুঁজে পাওয়া যায়নি!');
    return;
  }

  const jsonStr = content.slice(startIdx + startTag.length, endIdx).trim().replace(/;\s*$/, '');
  const books = JSON.parse(jsonStr);

  const pendingBooks = books.filter((b) => b.downloadUrl && b.downloadUrl.startsWith('http') && !b.downloadUrl.startsWith(cleanDomain));
  console.log(`📚 সর্বমোট বই: ${books.length} টি`);
  console.log(`📥 মাইগ্রেট করার মত বই: ${pendingBooks.length} টি`);

  const CONCURRENCY = 4; // 4 parallel streams
  let completedCount = 0;

  await mapConcurrent(books, CONCURRENCY, async (book, idx, total) => {
    if (!book.downloadUrl || !book.downloadUrl.startsWith('http')) {
      return;
    }

    const result = await uploadBook(book, checkpoint);
    if (result && result.newUrl) {
      book.downloadUrl = result.newUrl;
      book.driveUrl = result.newUrl;
    }
    completedCount++;

    if (completedCount % 20 === 0 || completedCount === pendingBooks.length) {
      saveProgressToFile(content, startIdx, startTag, endIdx, books);
    }
  });

  saveProgressToFile(content, startIdx, startTag, endIdx, books);

  console.log('\n==============================================');
  console.log('🎉 আলহামদুলিল্লাহ! সকল বই Cloudflare R2-তে সফলভাবে হোস্ট করা সম্পন্ন হয়েছে!');
  console.log('==============================================');
}

function saveProgressToFile(originalContent, startIdx, startTag, endIdx, books) {
  const updatedJson = JSON.stringify(books, null, 2);
  const newContent = originalContent.slice(0, startIdx + startTag.length) + updatedJson + originalContent.slice(endIdx - 1); // keep semicolon before \n\n
  fs.writeFileSync(DATA_FILE, newContent, 'utf-8');
  console.log(`💾 ডাটাবেজ ফাইল (nctbData.ts) সফলভাবে সেভ করা হয়েছে।`);
}

run().catch((err) => {
  console.error('মারাত্মক ত্রুটি:', err);
});
