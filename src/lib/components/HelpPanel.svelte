<script lang="ts">
	import { panels, togglePanel } from '../stores/panels';
	import type { PanelName } from '../types';
	import { BookOpen } from 'lucide-svelte';
	import PanelCloseButton from './buttons/PanelCloseButton.svelte';

	const iconAttrs = { strokeWidth: 2, class: 'w-4 h-4' };

	function handlePanelToggle(name: PanelName) {
		panels.set(togglePanel(name, $panels));
	}
</script>

{#if $panels.help}
	<section
		class="flex flex-col min-h-0 overflow-hidden border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-800 panel flex-1"
	>
		<!-- Panel Header -->
		<div
			class="bg-slate-50 dark:bg-slate-900/50 px-4 h-10 flex items-center justify-between border-b border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 shrink-0"
		>
			<div class="flex items-center gap-2">
				<BookOpen {...iconAttrs} />
				คู่มือ Markdown
			</div>
			<PanelCloseButton onclick={() => handlePanelToggle('help')} />
		</div>

		<!-- Panel Content -->
		<div
			class="flex-1 min-h-0 overflow-y-auto p-4 text-sm text-slate-600 dark:text-slate-400"
			style="overscroll-behavior-y: none"
		>
			<div class="space-y-4">
				<div>
					<p class="font-semibold text-slate-700 dark:text-slate-300 mb-2">Text Formatting</p>
					<p class="mb-1"><strong>Bold:</strong> **text**</p>
					<p class="mb-1"><strong>Italic:</strong> *text*</p>
					<p><strong>Strike:</strong> ~~text~~</p>
				</div>
				<div>
					<p class="font-semibold text-slate-700 dark:text-slate-300 mb-2">Headings</p>
					<p class="mb-1 text-xs text-slate-500 dark:text-slate-400"># H1 - ขนาดใหญ่ที่สุด</p>
					<p class="mb-1 text-xs text-slate-500 dark:text-slate-400">## H2 - ขนาดใหญ่</p>
					<p class="text-xs text-slate-500 dark:text-slate-400">### H3 - ขนาดกลาง</p>
				</div>
				<div>
					<p class="font-semibold text-slate-700 dark:text-slate-300 mb-2">Links & Images</p>
					<p class="mb-1"><strong>Link:</strong> [text](url)</p>
					<p><strong>Image:</strong> ![alt](url)</p>
				</div>
				<div>
					<p class="font-semibold text-slate-700 dark:text-slate-300 mb-2">Code</p>
					<p class="mb-1"><strong>Inline:</strong> `code`</p>
					<p><strong>Block:</strong> ```language...```</p>
				</div>
				<div>
					<p class="font-semibold text-slate-700 dark:text-slate-300 mb-2">Lists</p>
					<p class="mb-1"><strong>Unordered:</strong> - item</p>
					<p><strong>Ordered:</strong> 1. item</p>
				</div>
				<div>
					<p class="font-semibold text-slate-700 dark:text-slate-300 mb-2">Tables</p>
					<p class="text-xs text-slate-500 dark:text-slate-400">
						| Header | Header |<br />
						| --- | --- |<br />
						| Cell | Cell |
					</p>
				</div>
				<div>
					<p class="font-semibold text-slate-700 dark:text-slate-300 mb-2">Math (KaTeX)</p>
					<p class="mb-1"><strong>Inline:</strong> $E=mc^2$</p>
					<p><strong>Display:</strong> $a^2 + b^2 = c^2$</p>
				</div>
				<div>
					<p class="font-semibold text-slate-700 dark:text-slate-300 mb-2">Diagrams (Mermaid)</p>
					<p class="text-xs text-slate-500 dark:text-slate-400">
						```mermaid<br />
						graph TD;<br />
						A-->B;<br />
						```
					</p>
				</div>
			</div>
		</div>
	</section>
{/if}
