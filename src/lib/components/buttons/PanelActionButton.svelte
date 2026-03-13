<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		icon: any;
		children?: Snippet;
		onclick?: () => void;
		title?: string;
		disabled?: boolean;
		loading?: boolean;
		success?: boolean;
	}

	let { icon: Icon, children, onclick, title, disabled = false, loading = false, success = false }: Props = $props();

	const baseClasses =
		'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-all duration-200 cursor-pointer hover:cursor-pointer active:scale-95';

	const colorClasses = success
		? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
		: loading
			? 'text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 opacity-75'
			: 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 active:bg-slate-300 dark:active:bg-slate-600';

	const disabledClasses = 'opacity-30 cursor-not-allowed active:scale-100';
</script>

<button
	class="{baseClasses} {colorClasses}"
	class:disabled={disabled}
	onclick={onclick}
	{title}
	{disabled}
>
	{#if loading}
		<svg class="w-3.5 h-3.5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
		</svg>
	{:else if success}
		<svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
		</svg>
	{:else}
		<Icon strokeWidth={2} class="w-3.5 h-3.5" />
	{/if}
	{#if children}
		{@render children()}
	{/if}
</button>
