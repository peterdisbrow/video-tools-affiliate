import { marked } from 'marked';

// Configure marked for safe, clean HTML output
marked.setOptions({
  breaks: true,
  gfm: true,
});

/**
 * Convert markdown string to HTML string.
 * Use with dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
 */
export function markdownToHtml(content) {
  if (!content) return '';
  // If content already looks like HTML (starts with < or contains <h), return as-is
  const trimmed = content.trim();
  if (trimmed.startsWith('<') || trimmed.includes('<h2>') || trimmed.includes('<p>')) {
    return content;
  }
  return marked(content);
}
