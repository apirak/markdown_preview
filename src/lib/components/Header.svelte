<script lang="ts">
	import { theme } from '../stores/theme';
	import { panels, togglePanel } from '../stores/panels';
	import { toolbar } from '../stores/toolbar';
	import type { Theme, PanelName } from '../types';
	import { PanelTop, BookOpen, SquarePen, Eye, Moon, Sun, Menu, X } from 'lucide-svelte';
	import HeaderButton from './buttons/HeaderButton.svelte';
	import SiteLink from './SiteLink.svelte';

	const isTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

	let startDragging: (() => Promise<void>) | null = null;
	if (isTauri) {
		import('@tauri-apps/api/window').then((mod) => {
			startDragging = () => mod.getCurrentWindow().startDragging();
		});
	}

	let isMobileMenuOpen = $state(false);

	function handlePanelToggle(name: PanelName) {
		panels.set(togglePanel(name, $panels));
		isMobileMenuOpen = false;
	}

	function handleThemeToggle() {
		theme.update((t: Theme) => (t === 'light' ? 'dark' : 'light'));
		isMobileMenuOpen = false;
	}

	function handleToolbarToggle() {
		toolbar.update((v) => !v);
		isMobileMenuOpen = false;
	}

	function handleDragMouseDown(e: MouseEvent) {
		if (e.button === 0 && startDragging) {
			e.preventDefault();
			startDragging();
		}
	}
</script>

<header class="relative bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-slate-700 z-10 shrink-0">
	<div
		class="px-4 py-2 flex items-center gap-3"
		class:pl-20={isTauri}
	>
		<!-- Left: Logo + Title (hidden in Tauri app) -->
		{#if !isTauri}
		<div class="flex items-center gap-3 min-w-0">
			<div class="p-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg shrink-0">
				<img src="/favicon.svg" alt="Logo" class="w-5 h-5" />
			</div>
			<h1 class="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight truncate">
				Markdown Preview
				<span class="hidden sm:inline text-slate-400 dark:text-slate-500 font-normal ml-1">| </span>
				<span class="hidden sm:inline">
					<SiteLink className="text-slate-400 dark:text-slate-500 font-normal hover:text-slate-600 dark:hover:text-slate-300">
						apirak.com
					</SiteLink>
				</span>
			</h1>
		</div>
		{/if}

		<!-- Drag region spacer (fills empty space, allows window dragging in Tauri) -->
		{#if isTauri}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="flex-1 h-full min-h-8 cursor-grab" onmousedown={handleDragMouseDown}></div>
		{/if}

		<!-- Desktop: Actions -->
		<div class="hidden md:flex items-center gap-2 ml-auto">
			<!-- Theme Toggle -->
			<HeaderButton
				icon={$theme === 'light' ? Moon : Sun}
				onclick={handleThemeToggle}
				title="Toggle theme"
			/>

			<!-- Toolbar Toggle -->
			<HeaderButton
				icon={PanelTop}
				variant={$toolbar ? 'active' : 'default'}
				onclick={handleToolbarToggle}
				title="Toggle toolbar"
			>
				Toolbar
			</HeaderButton>

			<!-- Divider -->
			<div class="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>

			<!-- Help Toggle -->
			<HeaderButton
				icon={BookOpen}
				variant={$panels.help ? 'active' : 'default'}
				onclick={() => handlePanelToggle('help')}
			>
				Help
			</HeaderButton>

			<!-- Editor Toggle -->
			<HeaderButton
				icon={SquarePen}
				variant={$panels.editor ? 'active' : 'default'}
				onclick={() => handlePanelToggle('editor')}
			>
				Edit
			</HeaderButton>

			<!-- Preview Toggle -->
			<HeaderButton
				icon={Eye}
				variant={$panels.preview ? 'active' : 'default'}
				onclick={() => handlePanelToggle('preview')}
			>
				Preview
			</HeaderButton>
		</div>

		<!-- Mobile: Hamburger menu on the right -->
		<button
			type="button"
			onclick={() => isMobileMenuOpen = !isMobileMenuOpen}
			class="md:hidden ml-auto inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 transition-all"
			aria-label="Toggle navigation menu"
			title="Menu"
		>
			{#if isMobileMenuOpen}
				<X strokeWidth={2} class="w-5 h-5" />
			{:else}
				<Menu strokeWidth={2} class="w-5 h-5" />
			{/if}
		</button>
	</div>

	<!-- Mobile: Collapsible menu -->
	{#if isMobileMenuOpen}
		<div class="md:hidden border-t border-slate-200 dark:border-slate-700 px-4 py-3 bg-white dark:bg-gray-800">
			<div class="flex flex-col gap-2">
				<button
					type="button"
					onclick={handleThemeToggle}
					class="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 active:scale-95"
				>
					{#if $theme === 'light'}
						<Moon strokeWidth={2} class="w-4 h-4" />
					{:else}
						<Sun strokeWidth={2} class="w-4 h-4" />
					{/if}
					Theme
				</button>

				<button
					type="button"
					onclick={handleToolbarToggle}
					class="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all active:scale-95 {$toolbar ? 'text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800' : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}"
				>
					<PanelTop strokeWidth={2} class="w-4 h-4" />
					Toolbar
				</button>

				<button
					type="button"
					onclick={() => handlePanelToggle('help')}
					class="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all active:scale-95 {$panels.help ? 'text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800' : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}"
				>
					<BookOpen strokeWidth={2} class="w-4 h-4" />
					Help
				</button>

				<button
					type="button"
					onclick={() => handlePanelToggle('editor')}
					class="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all active:scale-95 {$panels.editor ? 'text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800' : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}"
				>
					<SquarePen strokeWidth={2} class="w-4 h-4" />
					Edit
				</button>

				<button
					type="button"
					onclick={() => handlePanelToggle('preview')}
					class="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all active:scale-95 {$panels.preview ? 'text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800' : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}"
				>
					<Eye strokeWidth={2} class="w-4 h-4" />
					Preview
				</button>
			</div>
		</div>
	{/if}
</header>
