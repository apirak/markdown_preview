<script lang="ts">
  import { onMount } from 'svelte';
  import { createIcons, icons } from 'lucide';
  import type { PanelName } from '../types.js';

  interface Props {
    panelHelp: boolean;
    panelEditor: boolean;
    panelPreview: boolean;
    toolbarVisible: boolean;
    onTogglePanel: (name: PanelName) => void;
    onToggleToolbar: () => void;
  }

  const {
    panelHelp,
    panelEditor,
    panelPreview,
    toolbarVisible,
    onTogglePanel,
    onToggleToolbar,
  }: Props = $props();

  onMount(() => {
    createIcons({ icons });
  });

  $effect(() => {
    createIcons({ icons });
  });

  function panelBtnClass(active: boolean): string {
    return active
      ? 'flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-md transition-colors duration-200'
      : 'flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors duration-200';
  }
</script>

<header class="bg-white border-b border-slate-200 pr-4 pl-4 py-4 flex justify-between items-center shadow-sm z-10 shrink-0">
  <!-- Title -->
  <div class="flex items-center gap-3">
    <div class="p-1 bg-blue-50 text-blue-600 rounded-lg">
      <img src="./favicon/favicon.svg" class="w-5 h-5" alt="" />
    </div>
    <h1 class="text-lg font-bold text-slate-900 tracking-tight">
      Markdown Preview
      <span class="text-slate-400 font-normal ml-1">| </span>
      <a
        href="https://apirak.com"
        target="_blank"
        rel="noopener noreferrer"
        data-component="site-link"
        class="text-slate-400 font-normal"
      >apirak.com</a>
    </h1>
  </div>

  <!-- Action buttons -->
  <div class="flex items-center gap-2">
    <!-- Toolbar toggle -->
    <button
      onclick={onToggleToolbar}
      class={panelBtnClass(toolbarVisible)}
    >
      <i data-lucide="panel-top" class="w-4 h-4"></i> Toolbar
    </button>

    <div class="w-px h-6 bg-slate-200 mx-1"></div>

    <!-- Panel toggles -->
    <button onclick={() => onTogglePanel('help')} class={panelBtnClass(panelHelp)}>
      <i data-lucide="book-open" class="w-4 h-4"></i> Help
    </button>
    <button onclick={() => onTogglePanel('editor')} class={panelBtnClass(panelEditor)}>
      <i data-lucide="square-pen" class="w-4 h-4"></i> Edit
    </button>
    <button onclick={() => onTogglePanel('preview')} class={panelBtnClass(panelPreview)}>
      <i data-lucide="eye" class="w-4 h-4"></i> Preview
    </button>
  </div>
</header>
