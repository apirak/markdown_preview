// Markdown rendering utilities extracted from main.ts
import { marked, Renderer } from 'marked';
import mermaid from 'mermaid';
import katex from 'katex';
import { showToast } from '../toast.js';

// --- Mermaid Setup ---
mermaid.initialize({
  startOnLoad: false,
  suppressErrorRendering: true,
  securityLevel: 'loose',
  theme: 'base',
});

// --- Marked.js Custom Renderer for Mermaid ---
const renderer = new Renderer();
const originalCodeRenderer = renderer.code.bind(renderer);
renderer.code = function (code: { text: string; lang?: string; type: 'code'; raw: string }): string {
  if (code.lang === 'mermaid') {
    return `<div class="mermaid">${code.text}</div>`;
  }
  return originalCodeRenderer(code);
};

marked.setOptions({ breaks: true, gfm: true, renderer });

let mermaidCounter = 0;

interface MathBlock {
  math: string;
  displayMode: boolean;
}

/**
 * Render markdown text to HTML, processing LaTeX math, Mermaid diagrams,
 * and inserting the result into the given container element.
 */
export async function renderMarkdown(
  markdownText: string,
  container: HTMLElement,
): Promise<void> {
  // --- Process LaTeX math blocks first ---
  const mathBlocks: MathBlock[] = [];
  const mathPlaceholder = (i: number) =>
    `<span data-math-placeholder="${i}"></span>`;

  // Display math $$...$$
  markdownText = markdownText.replace(/\$\$([\s\S]+?)\$\$/g, (_m, math) => {
    mathBlocks.push({ math: math.trim(), displayMode: true });
    return mathPlaceholder(mathBlocks.length - 1);
  });

  // Inline math $...$
  markdownText = markdownText.replace(/\$([^$\n]+?)\$/g, (_m, math) => {
    mathBlocks.push({ math: math.trim(), displayMode: false });
    return mathPlaceholder(mathBlocks.length - 1);
  });

  // --- Render Markdown ---
  container.innerHTML = await marked.parse(markdownText);

  // --- Replace math placeholders with KaTeX ---
  for (let i = 0; i < mathBlocks.length; i++) {
    const { math, displayMode } = mathBlocks[i];
    const placeholder = container.querySelector(`[data-math-placeholder="${i}"]`);
    if (!placeholder) continue;

    try {
      const mathHtml = katex.renderToString(math, { displayMode, throwOnError: false });
      const el = document.createElement(displayMode ? 'div' : 'span');
      el.className = displayMode ? 'katex-display' : 'katex-inline';
      el.innerHTML = mathHtml;
      placeholder.parentNode?.replaceChild(el, placeholder);
    } catch (e) {
      const err = e as Error;
      showToast(`LaTeX Error: ${err.message}`, { type: 'error', duration: 5000 });
      const el = document.createElement(displayMode ? 'div' : 'span');
      el.className = 'text-red-500';
      el.textContent = `${displayMode ? '$$' : '$'}${math}${displayMode ? '$$' : '$'}`;
      placeholder.parentNode?.replaceChild(el, placeholder);
    }
  }

  // --- Render Mermaid diagrams ---
  const mermaidDivs = container.querySelectorAll('.mermaid');
  for (const div of mermaidDivs) {
    const id = `mermaid-${mermaidCounter++}`;
    const definition = div.textContent ?? '';
    try {
      const { svg } = await mermaid.render(id, definition);
      div.innerHTML = svg;
    } catch (e) {
      const err = e as Error;
      showToast(`Mermaid Error: ${err.message}`, { type: 'error', duration: 8000 });
      div.innerHTML = '';
    }
  }
}
