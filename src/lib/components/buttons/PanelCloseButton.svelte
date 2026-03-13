<script lang="ts">
	import { X } from 'lucide-svelte';

	interface Props {
		onclick?: () => void;
		disabled?: boolean;
	}

	let { onclick, disabled = false }: Props = $props();

	const baseClasses = 'p-1 rounded transition-all duration-200 cursor-pointer hover:cursor-pointer active:scale-95';
	const colorClasses = 'hover:bg-slate-200 dark:hover:bg-slate-700 active:bg-slate-300 dark:active:bg-slate-600';
	const disabledClasses = 'opacity-30 cursor-not-allowed active:scale-100';
</script>

<button
	class="{baseClasses} {colorClasses}"
	class:disabled={disabled}
	onclick={onclick}
	{disabled}
	title="Close panel"
>
	<X strokeWidth={2} class="w-4 h-4 text-slate-400" />
</button>
