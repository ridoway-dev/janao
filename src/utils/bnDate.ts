// Parse Bengali display dates used across the site's data, e.g.
// "০৪ নভেম্বর ২০২৬" -> "2026-11-04".
// Dates are stored as display strings, but sitemaps and JSON-LD need ISO dates.

const BN_DIGITS: Record<string, string> = {
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
};

const BN_MONTHS: Record<string, string> = {
  'জানুয়ারি': '01',
  'ফেব্রুয়ারি': '02',
  'মার্চ': '03',
  'এপ্রিল': '04',
  'মে': '05',
  'জুন': '06',
  'জুলাই': '07',
  'আগস্ট': '08',
  'সেপ্টেম্বর': '09',
  'অক্টোবর': '10',
  'নভেম্বর': '11',
  'ডিসেম্বর': '12',
};

export function bnDateToIso(dateBn: string | undefined | null): string | undefined {
  if (!dateBn) return undefined;
  const normalized = dateBn.replace(/[০-৯]/g, (d) => BN_DIGITS[d]);
  const match = normalized.trim().match(/^(\d{1,2})\s+(\S+)\s+(\d{4})$/);
  if (!match) return undefined;
  const month = BN_MONTHS[match[2]];
  if (!month) return undefined;
  return `${match[3]}-${month}-${match[1].padStart(2, '0')}`;
}
