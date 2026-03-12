<script lang="ts">
	import { panels, togglePanel } from '../stores/panels';
	import type { PanelName } from '../types';
	import { SquarePen, LayoutTemplate, Copy } from 'lucide-svelte';
	import PanelActionButton from './buttons/PanelActionButton.svelte';
	import PanelCloseButton from './buttons/PanelCloseButton.svelte';

	const iconAttrs = { strokeWidth: 2, class: 'w-4 h-4' };

	interface Props {
		editorText: string;
		onTextChange: (value: string) => void;
		onCopy: () => void;
		onTemplate: () => void;
	}

	let { editorText, onTextChange, onCopy, onTemplate }: Props = $props();

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
		class="flex flex-col min-h-0 overflow-hidden border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-800 panel flex-1"
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
				<PanelActionButton icon={Copy} onclick={onCopy}>
					Copy
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
			<textarea
				value={editorText}
				oninput={(e) => onTextChange(e.currentTarget.value)}
				class="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none bg-white dark:bg-gray-900 text-slate-800 dark:text-slate-200"
				placeholder="Type your markdown here..."
			></textarea>
		</div>
	</section>
{/if}
