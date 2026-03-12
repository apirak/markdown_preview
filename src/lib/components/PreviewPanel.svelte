<script lang="ts">
	import { panels, togglePanel } from '../stores/panels';
	import type { PanelName, DownloadFormat } from '../types';
	import { Eye, FileCode, FileText, Image } from 'lucide-svelte';
	import PanelActionButton from './buttons/PanelActionButton.svelte';
	import PanelCloseButton from './buttons/PanelCloseButton.svelte';
	import { onMount, tick } from 'svelte';
	import mermaid from 'mermaid';

	const iconAttrs = { strokeWidth: 2, class: 'w-4 h-4' };

	// Initialize Mermaid
	onMount(() => {
		mermaid.initialize({
			startOnLoad: false,
			theme: 'default',
			securityLevel: 'loose',
		});
	});

	interface Props {
		previewHtml: string;
		onDownload: (format: DownloadFormat) => void;
	}

	let { previewHtml, onDownload }: Props = $props();

	// Initialize Mermaid diagrams after preview updates
	$effect(() => {
		(async () => {
			try {
				await tick();
				const previewElement = document.getElementById('preview');
				if (previewElement) {
					const mermaidDivs = previewElement.querySelectorAll('.mermaid');
					if (mermaidDivs.length > 0) {
						try {
							await mermaid.run({
								querySelector: '.mermaid'
							});
						} catch (error) {
							// Don't let mermaid errors break the app
							console.warn('Mermaid rendering error:', error);
						}
					}
				}
			} catch (error) {
				// Don't let any errors break the app
				console.warn('Preview update error:', error);
			}
		})();
	});

	function handlePanelToggle(name: PanelName) {
		panels.set(togglePanel(name, $panels));
	}

	function canClosePanel(name: PanelName): boolean {
		const openCount = Object.values($panels).filter(Boolean).length;
		return !$panels[name] || openCount > 1;
	}
</script>

{#if $panels.preview}
	<section
		class="flex flex-col min-h-0 overflow-hidden bg-white dark:bg-gray-800 panel flex-1"
	>
		<!-- Panel Header -->
		<div
			class="bg-slate-50 dark:bg-slate-900/50 px-4 h-10 flex items-center justify-between border-b border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 shrink-0"
		>
			<div class="flex items-center gap-2">
				<Eye {...iconAttrs} />
				Live Preview
			</div>
			<div class="flex items-center gap-2">
				<!-- HTML Button -->
				<PanelActionButton
					icon={FileCode}
					onclick={() => onDownload('html')}
					title="ดาวน์โหลดเป็น HTML"
				>
					HTML
				</PanelActionButton>

				<!-- PDF Button -->
				<PanelActionButton
					icon={FileText}
					onclick={() => onDownload('pdf')}
					title="ดาวน์โหลดเป็น PDF"
				>
					PDF
				</PanelActionButton>

				<!-- PNG Button -->
				<PanelActionButton
					icon={Image}
					onclick={() => onDownload('png')}
					title="ดาวน์โหลดเป็น PNG"
				>
					PNG
				</PanelActionButton>

				<!-- Divider -->
				<div class="w-px h-4 bg-slate-200 dark:bg-slate-700"></div>

				<!-- Close Button -->
				<PanelCloseButton
					onclick={() => handlePanelToggle('preview')}
					disabled={!canClosePanel('preview')}
				/>
			</div>
		</div>

		<!-- Panel Content -->
		<div
			id="preview"
			class="markdown-preview flex-1 w-full p-8 overflow-y-auto"
			style="overscroll-behavior-y: none"
		>
			{@html previewHtml}
		</div>
	</section>
{/if}
