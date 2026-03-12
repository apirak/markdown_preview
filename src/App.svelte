<script lang="ts">
	import { parseMarkdown } from './lib/utils/markdown';
	import { theme } from './lib/stores/theme';
	import Header from './lib/components/Header.svelte';
	import HelpPanel from './lib/components/HelpPanel.svelte';
	import EditorPanel from './lib/components/EditorPanel.svelte';
	import PreviewPanel from './lib/components/PreviewPanel.svelte';
	import type { DownloadFormat } from './lib/types';

	// Editor state
	let editorText = $state('# Markdown Preview\n\nStart typing to see the preview...\n\n## Features\n\n- **Bold** and *italic* text\n- Lists like this\n- `code` snippets\n\n## Try it out!\n\nType in the editor and see the preview update in real-time!');

	// Derived state for preview HTML
	const previewHtml = $derived(parseMarkdown(editorText));

	// Theme initialization - sync with DOM class
	$effect(() => {
		console.log('[App] Setting up theme subscription...');
		const unsub = theme.subscribe((value) => {
			console.log('[App] Theme changed to:', value);
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('theme', value);
			}
			if (typeof document !== 'undefined') {
				document.documentElement.classList.toggle('dark', value === 'dark');
				console.log('[App] DOM dark class:', document.documentElement.classList.contains('dark'));
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

	function handleDownload(format: DownloadFormat) {
		// TODO: Implement download
		console.log('Download', format);
	}

	function handleTemplate() {
		// TODO: Open template modal
		console.log('Open template modal');
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
		/>

		<!-- Preview Panel -->
		<PreviewPanel
			previewHtml={previewHtml}
			onDownload={handleDownload}
		/>
	</main>
</div>
