<script lang="ts">
	import { panels, togglePanel } from '../stores/panels';
	import { toolbar } from '../stores/toolbar';
	import type { PanelName, Template } from '../types';
	import { SquarePen, LayoutTemplate, Copy } from 'lucide-svelte';
	import PanelActionButton from './buttons/PanelActionButton.svelte';
	import PanelCloseButton from './buttons/PanelCloseButton.svelte';
	import TemplateList from './TemplateList.svelte';
	import Toolbar from './Toolbar.svelte';
	import { slide } from 'svelte/transition';

	const iconAttrs = { strokeWidth: 2, class: 'w-4 h-4' };

	interface Props {
		editorText: string;
		onTextChange: (value: string) => void;
		onCopy: () => void;
		onTemplate: () => void;
		showTemplateList: boolean;
		onTemplateSelect: (template: Template) => void;
		onCloseTemplateList: () => void;
		copySuccess?: boolean;
	}

	let {
		editorText,
		onTextChange,
		onCopy,
		onTemplate,
		showTemplateList,
		onTemplateSelect,
		onCloseTemplateList,
		copySuccess = false
	}: Props = $props();

	// DOM reference - not reactive state
	// svelte-ignore non_reactive_update
	let textareaElement: HTMLTextAreaElement = undefined!;

	function handlePanelToggle(name: PanelName) {
		panels.set(togglePanel(name, $panels));
	}

	function canClosePanel(name: PanelName): boolean {
		const openCount = Object.values($panels).filter(Boolean).length;
		return !$panels[name] || openCount > 1;
	}
</script>

{#if $panels.editor}
	<section
		class="flex flex-col min-h-0 overflow-hidden border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-800 panel flex-1"
	>
		<!-- Panel Header -->
		<div
			class="bg-slate-50 dark:bg-slate-900/50 px-4 h-10 flex items-center justify-between border-b border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 shrink-0"
		>
			<div class="flex items-center gap-2">
				<SquarePen {...iconAttrs} />
				Editor
			</div>
			<div class="flex items-center gap-2">
				<!-- Template Button -->
				<PanelActionButton icon={LayoutTemplate} onclick={onTemplate}>
					Template
				</PanelActionButton>

				<!-- Copy Button -->
				<PanelActionButton icon={Copy} onclick={onCopy} success={copySuccess}>
					{copySuccess ? 'Copied!' : 'Copy'}
				</PanelActionButton>

				<!-- Divider -->
				<div class="w-px h-4 bg-slate-200 dark:bg-slate-700"></div>

				<!-- Close Button -->
				<PanelCloseButton
					onclick={() => handlePanelToggle('editor')}
					disabled={!canClosePanel('editor')}
				/>
			</div>
		</div>

		<!-- Panel Content -->
		<div
			class="flex-1 min-h-0 overflow-auto relative bg-white dark:bg-gray-800"
			style="overscroll-behavior-y: none"
		>
			{#if $toolbar}
				<div transition:slide={{ duration: 200 }}>
					<Toolbar
						editorText={editorText}
						onTextChange={onTextChange}
						textareaElement={textareaElement}
					/>
				</div>
			{/if}

			<textarea
				// svelte-ignore non_reactive_update
				bind:this={textareaElement}
				value={editorText}
				oninput={(e) => onTextChange(e.currentTarget.value)}
				class="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none bg-white dark:bg-gray-900 text-slate-800 dark:text-slate-200"
				placeholder="Type your markdown here..."
			></textarea>

			<!-- Inline Template List -->
			{#if showTemplateList}
				<TemplateList onSelect={onTemplateSelect} onClose={onCloseTemplateList} />
			{/if}
		</div>
	</section>
{/if}
