import katex from 'katex';

export function renderMath(latex, displayMode = false) {
  try {
    return katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      trust: true,
    });
  } catch {
    return `<span class="text-red-500">[Math Error: ${latex}]</span>`;
  }
}

// Parse text with inline $...$ and display $$...$$ math
export function parseMathText(text) {
  if (!text) return '';

  // First handle display math $$...$$
  let result = text.replace(/\$\$([\s\S]*?)\$\$/g, (_, latex) => {
    return `<span class="katex-display-inline">${renderMath(latex.trim(), true)}</span>`;
  });

  // Then handle inline math $...$
  result = result.replace(/\$([^\$]+?)\$/g, (_, latex) => {
    return renderMath(latex.trim(), false);
  });

  return result;
}
