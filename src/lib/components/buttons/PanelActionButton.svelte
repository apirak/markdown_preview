<script lang="ts">
	import type { Component, Snippet } from 'svelte';

	interface Props {
		icon: Component;
		children?: Snippet;
		onclick?: () => void;
		title?: string;
		disabled?: boolean;
	}

	let { icon: Icon, children, onclick, title, disabled = false }: Props = $props();

	const baseClasses =
		'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors duration-200';
	const colorClasses =
		'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700';
	const disabledClasses = 'opacity-30 cursor-not-allowed';
</script>

<button
	class="{baseClasses} {colorClasses}"
	class:disabled={disabled}
	onclick={onclick}
	{title}
	{disabled}
>
	<Icon strokeWidth={2} class="w-3.5 h-3.5" />
	{#if children}
		{@render children()}
	{/if}
</button>
