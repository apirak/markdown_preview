<script lang="ts">
	import {
		Bold,
		Italic,
		Strikethrough,
		Code,
		Quote,
		FileCode,
		Minus,
		List,
		ListOrdered,
		Check,
		Link,
		Image,
		Heading,
		Table
	} from 'lucide-svelte';
	import ToolbarButton from './ToolbarButton.svelte';
	import type { TextRange } from '../utils/markdown-format';
	import {
		wrapSelection,
		insertBlockElement,
		insertCodeBlock,
		insertListItem,
		insertLink,
		insertTable,
		cycleHeading,
		insertHorizontalRule
	} from '../utils/markdown-format';

	interface Props {
		editorText: string;
		onTextChange: (value: string) => void;
		textareaElement?: HTMLTextAreaElement;
	}

	let { editorText, onTextChange, textareaElement }: Props = $props();

	function getSelectionRange(): TextRange {
		if (!textareaElement) return { start: 0, end: 0 };
		return {
			start: textareaElement.selectionStart,
			end: textareaElement.selectionEnd
		};
	}

	function setCursorPosition(position: number) {
		if (!textareaElement) return;
		textareaElement.focus();
		textareaElement.setSelectionRange(position, position);
	}

	function applyFormat(formatFn: (text: string, selection: TextRange) => { text: string; cursorPosition: number }) {
		const selection = getSelectionRange();
		const result = formatFn(editorText, selection);
		onTextChange(result.text);

		// Set cursor position after a short delay to ensure the text update is processed
		setTimeout(() => {
			setCursorPosition(result.cursorPosition);
		}, 0);
	}

	function applyBlockFormat(formatFn: (text: string, pos: number) => { text: string; cursorPosition: number }) {
		const selection = getSelectionRange();
		const result = formatFn(editorText, selection.start);
		onTextChange(result.text);

		setTimeout(() => {
			setCursorPosition(result.cursorPosition);
		}, 0);
	}

	// Text Formatting
	function bold() {
		applyFormat((text, sel) => wrapSelection(text, sel, '**', '**'));
	}

	function italic() {
		applyFormat((text, sel) => wrapSelection(text, sel, '*', '*'));
	}

	function strikethrough() {
		applyFormat((text, sel) => wrapSelection(text, sel, '~~', '~~'));
	}

	function code() {
		applyFormat((text, sel) => wrapSelection(text, sel, '`', '`'));
	}

	// Blocks
	function quote() {
		applyBlockFormat((text, pos) => insertBlockElement(text, pos, '>'));
	}

	function codeBlock() {
		applyBlockFormat((text, pos) => insertCodeBlock(text, pos, ''));
	}

	function horizontalRule() {
		applyBlockFormat((text, pos) => insertHorizontalRule(text, pos));
	}

	// Lists
	function unorderedList() {
		applyBlockFormat((text, pos) => insertListItem(text, pos, 'unordered'));
	}

	function orderedList() {
		applyBlockFormat((text, pos) => insertListItem(text, pos, 'ordered'));
	}

	function taskList() {
		applyBlockFormat((text, pos) => insertListItem(text, pos, 'task'));
	}

	// Links/Media
	function link() {
		applyFormat((text, sel) => insertLink(text, sel, false));
	}

	function image() {
		applyFormat((text, sel) => insertLink(text, sel, true));
	}

	// Structure
	function heading() {
		applyBlockFormat((text, pos) => cycleHeading(text, pos));
	}

	function table() {
		applyBlockFormat((text, pos) => insertTable(text, pos));
	}
</script>

<div
	class="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50"
>
	<!-- Text Formatting -->
	<div class="flex items-center gap-0.5 pr-2 border-r border-slate-200 dark:border-slate-700">
		<ToolbarButton icon={Bold} onclick={bold} title="Bold (Ctrl+B)" />
		<ToolbarButton icon={Italic} onclick={italic} title="Italic (Ctrl+I)" />
		<ToolbarButton icon={Strikethrough} onclick={strikethrough} title="Strikethrough" />
		<ToolbarButton icon={Code} onclick={code} title="Inline Code" />
	</div>

	<!-- Structure -->
	<div class="flex items-center gap-0.5 px-2">
		<ToolbarButton icon={Heading} onclick={heading} title="Heading" />
		<ToolbarButton icon={Table} onclick={table} title="Table" />
	</div>

	<!-- Blocks -->
	<div class="flex items-center gap-0.5 px-2 border-l border-slate-200 dark:border-slate-700">
		<ToolbarButton icon={Quote} onclick={quote} title="Blockquote" />
		<ToolbarButton icon={FileCode} onclick={codeBlock} title="Code Block" />
		<ToolbarButton icon={Minus} onclick={horizontalRule} title="Horizontal Rule" />
	</div>

	<!-- Lists -->
	<div class="flex items-center gap-0.5 px-2 border-l border-slate-200 dark:border-slate-700">
		<ToolbarButton icon={List} onclick={unorderedList} title="Unordered List" />
		<ToolbarButton icon={ListOrdered} onclick={orderedList} title="Ordered List" />
		<ToolbarButton icon={Check} onclick={taskList} title="Task List" />
	</div>

	<!-- Links/Media -->
	<div class="flex items-center gap-0.5 pl-2 border-l border-slate-200 dark:border-slate-700">
		<ToolbarButton icon={Link} onclick={link} title="Link" />
		<ToolbarButton icon={Image} onclick={image} title="Image" />
	</div>
</div>
