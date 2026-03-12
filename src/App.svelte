<script lang="ts">
  import { onMount } from 'svelte';
  import { createIcons, icons } from 'lucide';
  import Header from './components/Header.svelte';
  import EditorPanel from './components/EditorPanel.svelte';
  import PreviewPanel from './components/PreviewPanel.svelte';
  import HelpPanel from './components/HelpPanel.svelte';
  import { panelState, togglePanel, closePanel } from './stores/panelStore.svelte.js';
  import { initSiteLink } from './components/site-link.js';
  import { template as simpleTemplate } from './templates/simple-template.js';
  import type { PanelName } from './types.js';

  // Editor state
  let markdownText = $state(simpleTemplate.content);
  let toolbarVisible = $state(false);

  // Reference to EditorPanel for toolbar/refresh control
  let editorPanel: ReturnType<typeof EditorPanel> = $state(undefined as unknown as ReturnType<typeof EditorPanel>);

  function handleToggleToolbar(): void {
    toolbarVisible = !toolbarVisible;
    editorPanel?.setToolbarVisible(toolbarVisible);
  }

  function handleTogglePanel(name: PanelName): void {
    togglePanel(name);
    editorPanel?.refreshEditor();
  }

  function handleClosePanel(name: PanelName): void {
    closePanel(name);
    editorPanel?.refreshEditor();
  }

  function handleMarkdownChange(value: string): void {
    markdownText = value;
  }

  onMount(() => {
    createIcons({ icons });
    initSiteLink();
  });
</script>

<div class="bg-slate-50 h-screen flex flex-col text-slate-800 overflow-hidden font-sans">
  <!-- Header -->
  <Header
    panelHelp={panelState.help}
    panelEditor={panelState.editor}
    panelPreview={panelState.preview}
    {toolbarVisible}
    onTogglePanel={handleTogglePanel}
    onToggleToolbar={handleToggleToolbar}
  />

  <!-- Main content: Help | Editor | Preview -->
  <main class="flex-1 flex flex-row overflow-hidden">

    <!-- Help Panel -->
    {#if panelState.help}
      <section
        id="help-panel"
        class="flex flex-col min-h-0 overflow-hidden border-r border-slate-200 bg-white panel flex-1"
      >
        <div class="bg-slate-50 px-4 h-10 flex items-center justify-between border-b border-slate-200 text-sm font-semibold text-slate-600 shrink-0">
          <div class="flex items-center gap-2">
            <i data-lucide="book-open" class="w-4 h-4"></i> คู่มือ Markdown
          </div>
          <button
            onclick={() => handleClosePanel('help')}
            class="p-1 hover:bg-slate-200 rounded transition-colors"
            aria-label="Close help panel"
          >
            <i data-lucide="x" class="w-4 h-4 text-slate-400"></i>
          </button>
        </div>
        <div id="help-content" class="flex-1 min-h-0 overflow-y-auto" style="overscroll-behavior-y: none">
          <HelpPanel />
        </div>
      </section>
    {/if}

    <!-- Editor Panel -->
    {#if panelState.editor}
      <EditorPanel
        bind:this={editorPanel}
        value={markdownText}
        onchange={handleMarkdownChange}
      >
        {#snippet closeBtn()}
          <button
            onclick={() => handleClosePanel('editor')}
            class="p-1 hover:bg-slate-200 rounded transition-colors"
            aria-label="Close editor panel"
          >
            <i data-lucide="x" class="w-4 h-4 text-slate-400"></i>
          </button>
        {/snippet}
      </EditorPanel>
    {/if}

    <!-- Preview Panel -->
    {#if panelState.preview}
      <PreviewPanel {markdownText}>
        {#snippet closeBtn()}
          <button
            onclick={() => handleClosePanel('preview')}
            class="p-1 hover:bg-slate-200 rounded transition-colors"
            aria-label="Close preview panel"
          >
            <i data-lucide="x" class="w-4 h-4 text-slate-400"></i>
          </button>
        {/snippet}
      </PreviewPanel>
    {/if}

  </main>

  <!-- Toast Container -->
  <div id="toast-container" class="toast-container"></div>
</div>
