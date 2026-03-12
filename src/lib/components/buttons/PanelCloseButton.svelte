<script lang="ts">
	import { X } from 'lucide-svelte';

	interface Props {
		onclick?: () => void;
		disabled?: boolean;
	}

	let { onclick, disabled = false }: Props = $props();

	const baseClasses = 'p-1 rounded transition-colors';
	const colorClasses = 'hover:bg-slate-200 dark:hover:bg-slate-700';
	const disabledClasses = 'opacity-30 cursor-not-allowed';
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
