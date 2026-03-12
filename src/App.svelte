<script lang="ts">
	// Root component with 3-panel layout
	let editorText = $state('# Markdown Preview\n\nStart typing to see the preview...');
</script>

<div class="h-screen flex flex-col bg-gray-50">
	<header class="bg-white border-b border-gray-200 px-6 py-4">
		<h1 class="text-xl font-bold text-gray-800">Markdown Preview</h1>
		<p class="text-sm text-gray-500">Desktop App with Svelte + Vite + Tauri</p>
	</header>

	<main class="flex-1 flex overflow-hidden">
		<!-- Editor Panel -->
		<section class="flex-1 border-r border-gray-200 p-4">
			<h2 class="text-lg font-semibold text-gray-700 mb-2">Editor</h2>
			<textarea
				bind:value={editorText}
				class="w-full h-full p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
				placeholder="Type your markdown here..."
			></textarea>
		</section>

		<!-- Preview Panel -->
		<section class="flex-1 border-r border-gray-200 p-4 overflow-auto">
			<h2 class="text-lg font-semibold text-gray-700 mb-2">Preview</h2>
			<div class="prose prose-sm max-w-none">
				<p class="text-gray-500 italic">Preview will appear here...</p>
			</div>
		</section>

		<!-- Help Panel -->
		<section class="w-64 p-4 bg-white overflow-auto">
			<h2 class="text-lg font-semibold text-gray-700 mb-2">Help</h2>
			<div class="text-sm text-gray-600 space-y-2">
				<p><strong>Bold:</strong> **text**</p>
				<p><strong>Italic:</strong> *text*</p>
				<p><strong>Heading:</strong> # Heading</p>
				<p><strong>Link:</strong> [text](url)</p>
				<p><strong>Code:</strong> `code`</p>
			</div>
		</section>
	</main>
</div>
