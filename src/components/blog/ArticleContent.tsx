import { Fragment } from "react";
import Link from "next/link";

export interface ArticleHeading {
  id: string;
  level: 2 | 3;
  text: string;
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function renderInlineMarkdown(text: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      tokens.push(
        <strong key={`${match.index}-b`} className="font-semibold text-[#141210]">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      tokens.push(
        <code
          key={`${match.index}-c`}
          className="rounded-md bg-[#FFF4F0] px-1.5 py-0.5 font-mono text-[0.88em] text-[#C83B12] border border-[#FBE0D4]"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        if (href.startsWith("/")) {
          tokens.push(
            <Link
              key={`${match.index}-l`}
              href={href}
              className="font-medium text-[#FF5422] underline underline-offset-4 hover:text-[#e8460e]"
            >
              {label}
            </Link>,
          );
        } else {
          tokens.push(
            <a
              key={`${match.index}-a`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#FF5422] underline underline-offset-4 hover:text-[#e8460e]"
            >
              {label}
            </a>,
          );
        }
      }
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    tokens.push(text.slice(lastIndex));
  }

  return tokens.map((t, i) => <Fragment key={i}>{t}</Fragment>);
}

export function extractArticleHeadings(markdown: string, articleTitle?: string): ArticleHeading[] {
  const lines = markdown.split("\n");
  const seen = new Map<string, number>();
  const headings: ArticleHeading[] = [];
  const cleanTitle = (articleTitle || "").trim().toLowerCase();

  for (const raw of lines) {
    const line = raw.trim();
    const h2 = line.match(/^##\s+(.+)$/);
    const h3 = line.match(/^###\s+(.+)$/);
    const match = h2 || h3;
    if (!match) continue;
    const text = match[1].trim();
    if (cleanTitle && text.toLowerCase() === cleanTitle) continue;
    const base = slugifyHeading(text) || "section";
    const count = seen.get(base) || 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count}`;
    headings.push({
      id,
      level: h2 ? 2 : 3,
      text,
    });
  }

  return headings;
}

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

export function ArticleContent({
  content,
  articleTitle,
}: {
  content: string;
  articleTitle?: string;
}) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  const seenIds = new Map<string, number>();
  const cleanTitle = (articleTitle || "").trim().toLowerCase();

  let listItems: string[] = [];
  let orderedItems: string[] = [];
  let quoteLines: string[] = [];
  let tableRows: string[] = [];

  const flushUnordered = (keyPrefix: string) => {
    if (listItems.length === 0) return;
    blocks.push(
      <ul key={`${keyPrefix}-ul`} className="my-4 list-disc space-y-2 pl-6 text-stone-700">
        {listItems.map((item, idx) => (
          <li key={idx} className="leading-relaxed">
            {renderInlineMarkdown(item)}
          </li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  const flushOrdered = (keyPrefix: string) => {
    if (orderedItems.length === 0) return;
    blocks.push(
      <ol key={`${keyPrefix}-ol`} className="my-4 list-decimal space-y-2 pl-6 text-stone-700">
        {orderedItems.map((item, idx) => (
          <li key={idx} className="leading-relaxed">
            {renderInlineMarkdown(item)}
          </li>
        ))}
      </ol>,
    );
    orderedItems = [];
  };

  const flushQuote = (keyPrefix: string) => {
    if (quoteLines.length === 0) return;
    blocks.push(
      <blockquote
        key={`${keyPrefix}-bq`}
        className="my-6 rounded-r-2xl border-l-4 border-[#FF5422] bg-[#FFF8F5] px-5 py-4 text-sm sm:text-[15px] leading-relaxed text-[#141210]"
      >
        {quoteLines.map((q, idx) => (
          <p key={idx} className={idx > 0 ? "mt-2" : ""}>
            {renderInlineMarkdown(q)}
          </p>
        ))}
      </blockquote>,
    );
    quoteLines = [];
  };

  const flushTable = (keyPrefix: string) => {
    if (tableRows.length === 0) return;
    const parsed = tableRows.map(parseTableRow);
    const hasSeparator =
      parsed.length >= 2 && parsed[1].every((cell) => /^:?-{2,}:?$/.test(cell));
    const header = parsed[0] || [];
    const bodyRows = hasSeparator ? parsed.slice(2) : parsed.slice(1);

    blocks.push(
      <div
        key={`${keyPrefix}-tbl`}
        className="my-6 overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-xs"
      >
        <table className="w-full min-w-[520px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-[#FFF8F5]">
              {header.map((cell, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#141210]"
                >
                  {renderInlineMarkdown(cell)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {bodyRows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-stone-50/70">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="px-4 py-3 align-top leading-relaxed text-stone-700">
                    {renderInlineMarkdown(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>,
    );
    tableRows = [];
  };

  const flushAll = (keyPrefix: string) => {
    flushUnordered(keyPrefix);
    flushOrdered(keyPrefix);
    flushQuote(keyPrefix);
    flushTable(keyPrefix);
  };

  const makeHeadingId = (text: string) => {
    const base = slugifyHeading(text) || "section";
    const count = seenIds.get(base) || 0;
    seenIds.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  };

  lines.forEach((raw, idx) => {
    const line = raw.trim();
    if (!line) {
      flushAll(`empty-${idx}`);
      return;
    }

    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      flushAll(`h2-${idx}`);
      const text = h2[1].trim();
      if (cleanTitle && text.toLowerCase() === cleanTitle) return;
      const id = makeHeadingId(text);
      blocks.push(
        <h2
          key={`h2-${idx}`}
          id={id}
          className="scroll-mt-28 mt-9 mb-3 text-2xl font-bold tracking-tight text-[#141210]"
        >
          {text}
        </h2>,
      );
      return;
    }

    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      flushAll(`h3-${idx}`);
      const text = h3[1].trim();
      const id = makeHeadingId(text);
      blocks.push(
        <h3
          key={`h3-${idx}`}
          id={id}
          className="scroll-mt-28 mt-6 mb-2.5 text-lg sm:text-xl font-bold text-[#141210]"
        >
          {text}
        </h3>,
      );
      return;
    }

    if (line.startsWith("|") && line.endsWith("|")) {
      flushUnordered(`tbl-${idx}`);
      flushOrdered(`tbl-${idx}`);
      flushQuote(`tbl-${idx}`);
      tableRows.push(line);
      return;
    }

    const quoteMatch = line.match(/^>\s*(.+)$/);
    if (quoteMatch) {
      flushUnordered(`bq-${idx}`);
      flushOrdered(`bq-${idx}`);
      flushTable(`bq-${idx}`);
      quoteLines.push(quoteMatch[1].trim());
      return;
    }

    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      flushOrdered(`ul-${idx}`);
      flushQuote(`ul-${idx}`);
      flushTable(`ul-${idx}`);
      listItems.push(bullet[1].trim());
      return;
    }

    const ordered = line.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      flushUnordered(`ol-${idx}`);
      flushQuote(`ol-${idx}`);
      flushTable(`ol-${idx}`);
      orderedItems.push(ordered[1].trim());
      return;
    }

    flushAll(`p-${idx}`);
    blocks.push(
      <p key={`p-${idx}`} className="my-3.5 text-base leading-relaxed text-stone-700">
        {renderInlineMarkdown(line)}
      </p>,
    );
  });

  flushAll("end");

  return <div className="space-y-1">{blocks}</div>;
}
