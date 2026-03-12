import { marked } from 'marked';

/**
 * Configure marked options
 */
marked.setOptions({
	breaks: true, // Convert \n to <br>
	gfm: true, // GitHub Flavored Markdown
});

/**
 * Parse markdown to HTML (synchronous)
 */
export function parseMarkdown(markdown: string): string {
	return marked.parse(markdown) as string;
}
