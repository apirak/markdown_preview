/**
 * Markdown formatting utilities for toolbar actions
 * Handles text manipulation with cursor position management
 */

export interface TextRange {
	start: number;
	end: number;
}

export interface FormatResult {
	text: string;
	cursorPosition: number;
}

/**
 * Get the line start position for a given cursor position
 */
function getLineStart(text: string, position: number): number {
	let pos = position;
	while (pos > 0 && text[pos - 1] !== '\n') {
		pos--;
	}
	return pos;
}

/**
 * Get the line end position for a given cursor position
 */
function getLineEnd(text: string, position: number): number {
	let pos = position;
	while (pos < text.length && text[pos] !== '\n') {
		pos++;
	}
	return pos;
}

/**
 * Wrap selected text with markdown delimiters (bold, italic, etc.)
 * If no selection, place cursor between delimiters
 */
export function wrapSelection(
	text: string,
	selection: TextRange,
	before: string,
	after: string
): FormatResult {
	const { start, end } = selection;
	const selectedText = text.substring(start, end);

	if (selectedText) {
		// Wrap the selection
		const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);
		return {
			text: newText,
			cursorPosition: end + before.length + after.length
		};
	} else {
		// Insert delimiters and place cursor between them
		const newText = text.substring(0, start) + before + after + text.substring(end);
		return {
			text: newText,
			cursorPosition: start + before.length
		};
	}
}

/**
 * Insert a block element at the beginning of the current line
 */
export function insertBlockElement(
	text: string,
	cursorPosition: number,
	prefix: string
): FormatResult {
	const lineStart = getLineStart(text, cursorPosition);
	const lineEnd = getLineEnd(text, cursorPosition);
	const currentLine = text.substring(lineStart, lineEnd);

	// Check if line already starts with the prefix
	const trimmedLine = currentLine.trimStart();
	if (trimmedLine.startsWith(prefix)) {
		// Remove the prefix
		const afterPrefix = trimmedLine.substring(prefix.length);
		const newText = text.substring(0, lineStart) + afterPrefix + text.substring(lineEnd);
		return {
			text: newText,
			cursorPosition: lineStart + afterPrefix.length
		};
	}

	// Add the prefix
	const newText = text.substring(0, lineStart) + prefix + ' ' + currentLine + text.substring(lineEnd);
	return {
		text: newText,
		cursorPosition: cursorPosition + prefix.length + 1
	};
}

/**
 * Insert a code block with optional language
 */
export function insertCodeBlock(
	text: string,
	cursorPosition: number,
	language: string = ''
): FormatResult {
	const codeBlock = '```' + language + '\n\n```';
	const newText = text.substring(0, cursorPosition) + codeBlock + text.substring(cursorPosition);
	return {
		text: newText,
		cursorPosition: cursorPosition + codeBlock.length - 4 // Position before closing ```
	};
}

/**
 * Insert a list item at the current position
 */
export function insertListItem(
	text: string,
	cursorPosition: number,
	type: 'unordered' | 'ordered' | 'task'
): FormatResult {
	const lineStart = getLineStart(text, cursorPosition);
	const lineEnd = getLineEnd(text, cursorPosition);
	const currentLine = text.substring(lineStart, lineEnd);

	// Determine the marker to use
	let marker = '';
	if (type === 'unordered') {
		marker = '- ';
	} else if (type === 'ordered') {
		// Check previous lines for numbered list
		let prevLineStart = lineStart - 1;
		let num = 1;
		while (prevLineStart > 0) {
			const prevLineEnd = getLineEnd(text, prevLineStart);
			const prevLine = text.substring(prevLineStart, prevLineEnd).trim();
			const orderedMatch = prevLine.match(/^(\d+)\.\s/);
			if (orderedMatch) {
				num = parseInt(orderedMatch[1]) + 1;
				break;
			}
			if (prevLine.trim()) break;
			prevLineStart = getLineStart(text, prevLineStart - 1);
		}
		marker = `${num}. `;
	} else if (type === 'task') {
		marker = '- [ ] ';
	}

	const newText = text.substring(0, lineStart) + marker + currentLine + text.substring(lineEnd);
	return {
		text: newText,
		cursorPosition: cursorPosition + marker.length
	};
}

/**
 * Insert a link or image markdown
 */
export function insertLink(
	text: string,
	selection: TextRange,
	isImage: boolean
): FormatResult {
	const { start, end } = selection;
	const selectedText = text.substring(start, end) || (isImage ? 'alt text' : 'link text');

	const before = isImage ? '!' : '';
	const link = `${before}[${selectedText}]()`;
	const newText = text.substring(0, start) + link + text.substring(end);

	// Position cursor inside the parentheses
	return {
		text: newText,
		cursorPosition: start + link.length - 1
	};
}

/**
 * Insert a table template
 */
export function insertTable(text: string, cursorPosition: number): FormatResult {
	const table =
		'| Header 1 | Header 2 | Header 3 |\n' +
		'|----------|----------|----------|\n' +
		'| Cell 1   | Cell 2   | Cell 3   |\n' +
		'| Cell 4   | Cell 5   | Cell 6   |\n';

	const newText = text.substring(0, cursorPosition) + table + text.substring(cursorPosition);
	return {
		text: newText,
		cursorPosition: cursorPosition + table.length
	};
}

/**
 * Cycle through heading levels (none -> H1 -> H2 -> ... -> H6 -> none)
 */
export function cycleHeading(text: string, cursorPosition: number): FormatResult {
	const lineStart = getLineStart(text, cursorPosition);
	const lineEnd = getLineEnd(text, cursorPosition);
	const currentLine = text.substring(lineStart, lineEnd);
	const trimmedLine = currentLine.trimStart();

	// Check current heading level
	let currentLevel = 0;
	const headingMatch = trimmedLine.match(/^(#{1,6})\s/);
	if (headingMatch) {
		currentLevel = headingMatch[1].length;
	}

	// Calculate next level (H6 -> none)
	const nextLevel = currentLevel === 6 ? 0 : currentLevel + 1;

	// Remove old heading if exists
	let withoutHeading = trimmedLine;
	if (currentLevel > 0) {
		withoutHeading = trimmedLine.substring(currentLevel + 1); // +1 for space
	}

	// Add new heading if needed
	let newLine = withoutHeading;
	if (nextLevel > 0) {
		newLine = '#'.repeat(nextLevel) + ' ' + withoutHeading;
	}

	// Preserve leading whitespace
	const leadingWhitespace = currentLine.match(/^\s*/)?.[0] || '';
	const finalLine = leadingWhitespace + newLine;

	const newText = text.substring(0, lineStart) + finalLine + text.substring(lineEnd);
	return {
		text: newText,
		cursorPosition: cursorPosition + (finalLine.length - currentLine.length)
	};
}

/**
 * Insert horizontal rule
 */
export function insertHorizontalRule(text: string, cursorPosition: number): FormatResult {
	const lineStart = getLineStart(text, cursorPosition);
	const lineEnd = getLineEnd(text, cursorPosition);
	const currentLine = text.substring(lineStart, lineEnd);

	// Add HR on new line if current line is not empty
	const hr = '\n---\n';
	let insertPos = cursorPosition;
	let newCursor = cursorPosition;

	if (currentLine.trim()) {
		// Current line has content, insert after it
		const newText = text.substring(0, lineEnd) + hr + text.substring(lineEnd);
		return {
			text: newText,
			cursorPosition: lineEnd + hr.length
		};
	}

	// Current line is empty, replace it with HR
	const newText = text.substring(0, lineStart) + hr + text.substring(lineEnd);
	return {
		text: newText,
		cursorPosition: lineStart + hr.length
	};
}
