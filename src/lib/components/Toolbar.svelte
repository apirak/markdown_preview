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
		Table,
		ChevronsUpDown,
		ChevronsDownUp
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

	let expanded = $state(false);
	let hasOverflow = $state(false);
	let contentDiv: HTMLDivElement;
	let containerDiv: HTMLDivElement;

	// Detect overflow using ResizeObserver
	function checkOverflow() {
		if (!contentDiv || !containerDiv) return;
		// Check if content width exceeds container width
		hasOverflow = contentDiv.scrollWidth > containerDiv.clientWidth;
	}

	// Use ResizeObserver to watch for size changes
	$effect(() => {
		if (!contentDiv || !containerDiv) return;

		const observer = new ResizeObserver(() => {
			checkOverflow();
		});

		observer.observe(contentDiv);
		observer.observe(containerDiv);

		return () => observer.disconnect();
	});

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
	bind:this={containerDiv}
	class="flex items-center gap-1 px-2 py-1.5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50"
>
	<div bind:this={contentDiv} class="flex {expanded ? 'flex-wrap' : 'flex-nowrap overflow-x-auto'} items-center gap-1 flex-1">
		<!-- Text Formatting -->
		<div class="flex items-center gap-0.5 pr-2 border-r border-slate-200 dark:border-slate-700 shrink-0">
			<ToolbarButton icon={Bold} onclick={bold} title="Bold (Ctrl+B)" />
			<ToolbarButton icon={Italic} onclick={italic} title="Italic (Ctrl+I)" />
			<ToolbarButton icon={Strikethrough} onclick={strikethrough} title="Strikethrough" />
			<ToolbarButton icon={Code} onclick={code} title="Inline Code" />
		</div>

		<!-- Structure -->
		<div class="flex items-center gap-0.5 px-2 shrink-0">
			<ToolbarButton icon={Heading} onclick={heading} title="Heading" />
			<ToolbarButton icon={Table} onclick={table} title="Table" />
		</div>

		<!-- Blocks -->
		<div class="flex items-center gap-0.5 px-2 border-l border-slate-200 dark:border-slate-700 shrink-0">
			<ToolbarButton icon={Quote} onclick={quote} title="Blockquote" />
			<ToolbarButton icon={FileCode} onclick={codeBlock} title="Code Block" />
			<ToolbarButton icon={Minus} onclick={horizontalRule} title="Horizontal Rule" />
		</div>

		<!-- Lists -->
		<div class="flex items-center gap-0.5 px-2 border-l border-slate-200 dark:border-slate-700 shrink-0">
			<ToolbarButton icon={List} onclick={unorderedList} title="Unordered List" />
			<ToolbarButton icon={ListOrdered} onclick={orderedList} title="Ordered List" />
			<ToolbarButton icon={Check} onclick={taskList} title="Task List" />
		</div>

		<!-- Links/Media -->
		<div class="flex items-center gap-0.5 pl-2 border-l border-slate-200 dark:border-slate-700 shrink-0">
			<ToolbarButton icon={Link} onclick={link} title="Link" />
			<ToolbarButton icon={Image} onclick={image} title="Image" />
		</div>
	</div>

	<!-- Expand/Collapse Toggle -->
	{#if hasOverflow || expanded}
		<button
			onclick={() => expanded = !expanded}
			class="flex items-center justify-center w-8 h-8 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors shrink-0"
			title={expanded ? "Collapse toolbar" : "Expand toolbar"}
		>
			{#if expanded}
				<span class="text-sm font-bold leading-none">
					<ChevronsDownUp class="w-3 h-3" />
				</span>
			{:else}
				<span class="text-xs font-bold leading-none">
					<ChevronsUpDown class="w-3 h-3" />
				</span>
			{/if}
		</button>
	{/if}
</div>
