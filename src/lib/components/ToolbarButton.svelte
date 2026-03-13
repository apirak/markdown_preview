<script lang="ts">
	interface Props {
		icon: any; // lucide-svelte icon component
		onclick?: () => void;
		title?: string;
		active?: boolean;
		disabled?: boolean;
	}

	let { icon: Icon, onclick, title, active = false, disabled = false }: Props = $props();

	const baseClasses =
		'p-2 rounded transition-all duration-200 flex items-center justify-center shrink-0';

	const stateClasses = $derived(
		disabled
			? 'opacity-30 cursor-not-allowed text-slate-400 dark:text-slate-600'
			: active
				? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 cursor-pointer hover:cursor-pointer active:scale-95'
				: 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 active:bg-slate-300 dark:active:bg-slate-600 cursor-pointer hover:cursor-pointer active:scale-95'
	);
</script>

<button
	class="{baseClasses} {stateClasses}"
	onclick={onclick}
	{title}
	{disabled}
>
	<Icon strokeWidth={2} class="w-4 h-4" />
</button>
