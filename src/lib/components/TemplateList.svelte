<script lang="ts">
	import { templates } from '../templates';
	import type { Template } from '../types';
	import { X } from 'lucide-svelte';
	import { onMount } from 'svelte';

	interface Props {
		onSelect: (template: Template) => void;
		onClose?: () => void;
	}

	let { onSelect, onClose }: Props = $props();

	let templateListEl: HTMLDivElement;

	// Debug log
	console.log('[TemplateList] Rendering, templates:', templates.length);

	onMount(() => {
		console.log('[TemplateList] Mounted');
		console.log('[TemplateList] Element:', templateListEl);
		console.log('[TemplateList] Computed style:', window.getComputedStyle(templateListEl));
	});

	// Group templates by category
	const groupedTemplates = $derived(() => {
		const groups: Record<string, Template[]> = {};
		for (const tmpl of templates) {
			if (!groups[tmpl.category]) {
				groups[tmpl.category] = [];
			}
			groups[tmpl.category].push(tmpl);
		}
		console.log('[TemplateList] Grouped templates:', groups);
		return groups;
	});

	// Category display names
	const categoryNames: Record<string, string> = {
		blank: 'Blank Templates',
		language: 'Language Practice',
		example: 'Examples'
	};

	function handleClose() {
		console.log('[TemplateList] Closing');
		onClose?.();
	}
</script>

<div class="template-list" bind:this={templateListEl}>
	<!-- Header -->
	<div class="template-list-header">
		<span class="template-list-title">Choose a template</span>
		<button
			onclick={handleClose}
			class="template-list-close"
			aria-label="Close"
		>
			<X strokeWidth={2} class="w-4 h-4" />
		</button>
	</div>

	<!-- Content -->
	<div class="template-list-items">
		{#each Object.entries(groupedTemplates()) as [category, categoryTemplates]}
			<div class="mb-3 last:mb-0">
				<h3 class="category-title">{categoryNames[category] || category}</h3>
				{#each categoryTemplates as tmpl}
					<button
						onclick={() => onSelect(tmpl)}
						class="template-list-item"
					>
						<span class="template-list-item-icon">{tmpl.icon}</span>
						<div class="template-list-item-body">
							<span class="template-list-item-name">{tmpl.name}</span>
							<span class="template-list-item-desc">{tmpl.description}</span>
						</div>
					</button>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.template-list {
		padding: 5rem;
		position: absolute;
		inset: 0;
		z-index: 20;
		background: #f8fafc;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background-color: rgba(248, 250, 252, 0.98);
	}

	:global(.dark) .template-list {
		background: rgba(15, 23, 42, 0.98);
		background-color: rgb(15 23 42 / 0.98);
	}

	.template-list-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.625rem 1rem;
		border: 1px solid #e2e8f0;
		background: #f8fafc;
		flex-shrink: 0;
	}

	:global(.dark) .template-list-header {
		background: rgb(30 41 59);
		border-color: #334155;
	}

	.template-list-title {
		font-size: 0.8125rem;
		font-weight: 600;
		color: #64748b;
	}

	:global(.dark) .template-list-title {
		color: #94a3b8;
	}

	.template-list-close {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.25rem;
		border: none;
		background: transparent;
		border-radius: 0.25rem;
		cursor: pointer;
		color: #94a3b8;
		transition: all 0.15s ease;
	}

	.template-list-close:hover {
		background: #e2e8f0;
		color: #475569;
	}

	:global(.dark) .template-list-close:hover {
		background: #334155;
		color: #cbd5e1;
	}

	.template-list-items {
		flex: 1;
		overflow-y: auto;
		padding: 0.5rem;
		background: white;
		border: 1px solid #e2e8f0;
		border-top: none;
	}

	:global(.dark) .template-list-items {
		background: rgb(15 23 42);
		border-color: #334155;
	}

	.category-title {
		font-size: 0.75rem;
		font-weight: 600;
		color: #64748b;
		margin-bottom: 0.375rem;
		padding: 0 0.25rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	:global(.dark) .category-title {
		color: #64748b;
	}

	.template-list-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
		padding: 0.625rem 0.75rem;
		border: none;
		background: transparent;
		border-radius: 0.375rem;
		cursor: pointer;
		text-align: left;
		transition: background 0.12s ease;
		margin-bottom: 0.125rem;
	}

	.template-list-item:hover {
		background: #e2e8f0;
	}

	:global(.dark) .template-list-item:hover {
		background: #334155;
	}

	.template-list-item:active {
		background: #cbd5e1;
	}

	:global(.dark) .template-list-item:active {
		background: #475569;
	}

	.template-list-item-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		font-size: 1.125rem;
		background: white;
		border: 1px solid #e2e8f0;
		border-radius: 0.375rem;
		flex-shrink: 0;
	}

	:global(.dark) .template-list-item-icon {
		background: #1e293b;
		border-color: #334155;
	}

	.template-list-item-body {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.template-list-item-name {
		font-size: 0.8125rem;
		font-weight: 600;
		color: #1e293b;
		line-height: 1.3;
	}

	:global(.dark) .template-list-item-name {
		color: #f1f5f9;
	}

	.template-list-item-desc {
		font-size: 0.6875rem;
		color: #94a3b8;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		line-height: 1.4;
	}

	:global(.dark) .template-list-item-desc {
		color: #64748b;
	}

	.mb-3 {
		margin-bottom: 0.75rem;
	}

	.last\:mb-0:last-child {
		margin-bottom: 0;
	}
</style>
