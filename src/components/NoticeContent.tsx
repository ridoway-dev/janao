// Renders notice/result body text with real headings.
//
// Notice content is stored as plain text with `### Heading` markers
// (see src/data/nctbData.ts). It used to render as one plain-text block,
// so the markers showed up as literal "### ..." text and Google saw no
// content structure. This splits the text into blocks: `### ...` lines
// become <h2>, everything else stays a paragraph (whitespace preserved).
//
// Plain http(s) URLs in the text are turned into clickable links, so
// source and download links written in the content actually work.
function renderWithLinks(text: string) {
  const parts = text.split(/(https?:\/\/[^\s<>"')]+)/g);
  return parts.map((part, i) => {
    if (!/^https?:\/\//.test(part)) return <span key={i}>{part}</span>;
    // Strip trailing punctuation (Bengali danda, period, comma...) that
    // is not part of the URL.
    const m = part.match(/^(.*?)([।.,;:!?)\]]+)$/);
    const url = m ? m[1] : part;
    const trail = m ? m[2] : '';
    return (
      <span key={i}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-700 dark:text-emerald-400 hover:underline break-all"
        >
          {url}
        </a>
        {trail}
      </span>
    );
  });
}
export default function NoticeContent({ content }: { content?: string }) {
  if (!content) return null;

  const blocks = content.split(/\n\s*\n/);

  return (
    <>
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;
        if (trimmed.startsWith('### ')) {
          return (
            <h2
              key={i}
              className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2"
            >
              {trimmed.replace(/^###\s+/, '')}
            </h2>
          );
        }
        return (
          <p key={i} className="whitespace-pre-line">
            {renderWithLinks(block)}
          </p>
        );
      })}
    </>
  );
}
