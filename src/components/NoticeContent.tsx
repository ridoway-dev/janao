// Renders notice/result body text with real headings.
//
// Notice content is stored as plain text with `### Heading` markers
// (see src/data/nctbData.ts). It used to render as one plain-text block,
// so the markers showed up as literal "### ..." text and Google saw no
// content structure. This splits the text into blocks: `### ...` lines
// become <h2>, everything else stays a paragraph (whitespace preserved).
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
            {block}
          </p>
        );
      })}
    </>
  );
}
