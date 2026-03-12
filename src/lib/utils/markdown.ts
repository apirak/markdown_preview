import { marked, type RendererObject, type Code } from 'marked';
import katex from 'katex';

/**
 * Custom renderer for Mermaid code blocks
 */
const customRenderer: RendererObject = {
	code(code: Code): string {
		// Handle Mermaid diagrams
		if (code.lang === 'mermaid') {
			return `<div class="mermaid">${escapeHtml(code.text)}</div>`;
		}
		// Default code block rendering
		const escapedCode = code.escaped ? code.text : escapeHtml(code.text);
		return `<pre><code class="language-${code.lang || ''}">${escapedCode}</code></pre>`;
	},
};

function escapeHtml(html: string): string {
	return html
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

// Configure marked with custom renderer
marked.use({
	renderer: customRenderer,
	breaks: true,
	gfm: true,
});

/**
 * Process inline LaTeX in text
 * Supports $...$ for inline math and $$...$$ for display math
 */
function processInlineMath(text: string): string {
	try {
		// First, replace display math $$...$$ with placeholders
		const displayMathBlocks: string[] = [];
		text = text.replace(/\$\$([\s\S]*?)\$\$/g, (_match, math) => {
			try {
				const rendered = katex.renderToString(math.trim(), {
					displayMode: true,
					throwOnError: false,
					strict: false,
				});
				displayMathBlocks.push(rendered);
				return `__DISPLAY_MATH_${displayMathBlocks.length - 1}__`;
			} catch (e) {
				console.warn('KaTeX display math error:', e);
				return _match;
			}
		});

		// Then, replace inline math $...$ with placeholders
		const inlineMathBlocks: string[] = [];
		text = text.replace(/(?<=\s|^)\$([^\$\n]+?)\$(?=\s|$)/g, (_match, math) => {
			try {
				const rendered = katex.renderToString(math.trim(), {
					displayMode: false,
					throwOnError: false,
					strict: false,
				});
				inlineMathBlocks.push(rendered);
				return `__INLINE_MATH_${inlineMathBlocks.length - 1}__`;
			} catch (e) {
				console.warn('KaTeX inline math error:', e);
				return _match;
			}
		});

		// Replace placeholders with actual rendered math
		text = text.replace(/__DISPLAY_MATH_(\d+)__/g, (_match, index) => {
			return displayMathBlocks[parseInt(index)];
		});

		text = text.replace(/__INLINE_MATH_(\d+)__/g, (_match, index) => {
			return inlineMathBlocks[parseInt(index)];
		});

		return text;
	} catch (error) {
		console.warn('processInlineMath error:', error);
		return text;
	}
}

/**
 * Parse markdown to HTML with KaTeX and Mermaid support
 */
export function parseMarkdown(markdown: string): string {
	try {
		const processedMarkdown = processInlineMath(markdown);
		const result = marked.parse(processedMarkdown);
		// Handle both sync and async results
		if (result instanceof Promise) {
			console.warn('parseMarkdown returned a Promise, this should not happen');
			return '<p>Loading...</p>';
		}
		return result as string;
	} catch (error) {
		console.warn('parseMarkdown error:', error);
		try {
			const fallbackResult = marked.parse(markdown);
			if (fallbackResult instanceof Promise) {
				return '<p>Loading...</p>';
			}
			return fallbackResult as string;
		} catch (e) {
			console.error('Critical parseMarkdown error:', e);
			return `<p>Error parsing markdown</p>`;
		}
	}
}

/**
 * Initialize Mermaid diagrams after DOM update
 */
export async function initMermaid(mermaidInstance: any): Promise<void> {
	try {
		await mermaidInstance.run();
	} catch (error) {
		console.warn('Mermaid initialization error:', error);
	}
}
