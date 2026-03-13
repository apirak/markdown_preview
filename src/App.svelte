<script lang="ts">
	import { parseMarkdown } from './lib/utils/markdown';
	import { exportAsHTML, exportAsPDF, exportAsPNG } from './lib/utils/export';
	import { theme } from './lib/stores/theme';
	import Header from './lib/components/Header.svelte';
	import HelpPanel from './lib/components/HelpPanel.svelte';
	import EditorPanel from './lib/components/EditorPanel.svelte';
	import PreviewPanel from './lib/components/PreviewPanel.svelte';
	import TemplateList from './lib/components/TemplateList.svelte';
	import type { DownloadFormat, Template } from './lib/types';

	// Editor state
	let editorText = $state('# Markdown Preview\n\nStart typing to see the preview...\n\n## Features\n\n- **Bold** and *italic* text\n- Lists like this\n- `code` snippets\n\n## Try it out!\n\nType in the editor and see the preview update in real-time!');

	// Template list state
	let showTemplateList = $state(false);

	// Derived state for preview HTML
	const previewHtml = $derived(parseMarkdown(editorText));

	// Theme initialization - sync with DOM class
	$effect(() => {
		const unsub = theme.subscribe((value) => {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('theme', value);
			}
			if (typeof document !== 'undefined') {
				document.documentElement.classList.toggle('dark', value === 'dark');
			}
		});
		return unsub;
	});

	// Callback for editor text changes
	function handleTextChange(value: string) {
		editorText = value;
	}

	// Callback functions for panels
	function handleCopy() {
		navigator.clipboard.writeText(editorText);
		// TODO: Show toast notification
	}

	async function handleDownload(format: DownloadFormat) {
		try {
			const title = editorText.split('\n')[0].replace(/^#+\s*/, '').trim() || 'document';

			switch (format) {
				case 'html':
					await exportAsHTML(previewHtml, title);
					break;
				case 'pdf':
					await exportAsPDF('preview', `${title}.pdf`);
					break;
				case 'png':
					await exportAsPNG('preview', `${title}.png`);
					break;
			}
		} catch (error) {
			console.error('Export failed:', error);
			// TODO: Show error notification
		}
	}

	function handleTemplate() {
		showTemplateList = !showTemplateList;
		console.log('[App] Template list toggled:', showTemplateList);
	}

	function handleTemplateSelect(template: Template) {
		editorText = template.content;
		showTemplateList = false;
	}

	function closeTemplateList() {
		showTemplateList = false;
	}
</script>

<div class="h-screen flex flex-col bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-slate-100 overflow-hidden">
	<!-- Header -->
	<Header />

	<!-- Main Content -->
	<main class="flex-1 flex flex-row overflow-hidden">
		<!-- Help Panel -->
		<HelpPanel />

		<!-- Editor Panel -->
		<EditorPanel
			editorText={editorText}
			onTextChange={handleTextChange}
			onCopy={handleCopy}
			onTemplate={handleTemplate}
			showTemplateList={showTemplateList}
			onTemplateSelect={handleTemplateSelect}
			onCloseTemplateList={closeTemplateList}
		/>

		<!-- Preview Panel -->
		<PreviewPanel
			previewHtml={previewHtml}
			onDownload={handleDownload}
		/>
	</main>
</div>
