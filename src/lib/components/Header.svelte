<script lang="ts">
	import { theme } from '../stores/theme';
	import { panels, togglePanel } from '../stores/panels';
	import { toolbar } from '../stores/toolbar';
	import type { Theme, PanelName } from '../types';
	import { PanelTop, BookOpen, SquarePen, Eye, Moon, Sun } from 'lucide-svelte';
	import HeaderButton from './buttons/HeaderButton.svelte';
	import SiteLink from './SiteLink.svelte';

	function handlePanelToggle(name: PanelName) {
		panels.set(togglePanel(name, $panels));
	}

	function handleThemeToggle() {
		theme.update((t: Theme) => (t === 'light' ? 'dark' : 'light'));
	}
</script>

<header
	class="bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-slate-700 px-4 py-4 flex justify-between items-center shadow-sm z-10 shrink-0"
>
	<!-- Left: Logo + Title -->
	<div class="flex items-center gap-3">
		<div class="p-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
			<svg
				class="w-5 h-5"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path
					d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"
				></path>
				<path d="M14 3v4a2 2 0 0 0 2 2h4"></path>
			</svg>
		</div>
		<h1 class="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
			Markdown Preview
			<span class="text-slate-400 dark:text-slate-500 font-normal ml-1">| </span>
			<SiteLink className="text-slate-400 dark:text-slate-500 font-normal hover:text-slate-600 dark:hover:text-slate-300">
				apirak.com
			</SiteLink>
		</h1>
	</div>

	<!-- Right: Actions -->
	<div class="flex items-center gap-2">
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
			onclick={() => toolbar.update((v) => !v)}
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
</header>
