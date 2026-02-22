import { parseMathText } from '../../utils/katex';

export default function MathText({ content, className = '' }) {
  if (!content) return null;

  // Convert markdown-like formatting
  let html = content
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Newlines to <br> (but not double newlines which become paragraphs)
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>');

  // Wrap in paragraph
  html = '<p>' + html + '</p>';

  // Process math
  html = parseMathText(html);

  return (
    <div
      className={`math-text leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
