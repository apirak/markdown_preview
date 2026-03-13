<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		icon?: any; // lucide-svelte icon component
		children?: Snippet;
		variant?: 'default' | 'active' | 'toolbar';
		onclick?: () => void;
		title?: string;
	}

	let {
		icon: Icon,
		children,
		variant = 'default',
		onclick,
		title
	}: Props = $props();

	const baseClasses =
		'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer hover:cursor-pointer active:scale-95';

	const variantClasses = {
		default:
			'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 active:bg-slate-300 dark:active:bg-slate-500',
		active:
			'text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 active:bg-blue-300 dark:active:bg-blue-700',
		toolbar:
			'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 active:bg-slate-300 dark:active:bg-slate-500'
	};
</script>

<button
	class="{baseClasses} {variantClasses[variant]}"
	onclick={onclick}
	{title}
>
	{#if Icon}
		<Icon strokeWidth={2} class="w-4 h-4" />
	{/if}
	{#if children}
		{@render children()}
	{/if}
</button>
