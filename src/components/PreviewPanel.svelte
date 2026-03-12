<script lang="ts">
  import { onMount, type Snippet } from 'svelte';
  import { createIcons, icons } from 'lucide';
  import { renderMarkdown } from '../lib/markdown.js';
  import { downloadHTML, downloadPDF, downloadPNG } from '../lib/download.js';
  import type { DownloadFormat } from '../types.js';

  interface Props {
    markdownText: string;
    closeBtn?: Snippet;
  }

  const { markdownText, closeBtn }: Props = $props();

  let previewEl: HTMLDivElement;

  async function update(text: string): Promise<void> {
    if (!previewEl) return;
    await renderMarkdown(text, previewEl);
  }

  $effect(() => {
    update(markdownText);
  });

  onMount(() => {
    createIcons({ icons });
  });

  function handleDownload(format: DownloadFormat): void {
    if (!previewEl) return;
    switch (format) {
      case 'html': downloadHTML(previewEl, markdownText); break;
      case 'pdf':  downloadPDF(previewEl, markdownText); break;
      case 'png':  downloadPNG(previewEl, markdownText); break;
    }
  }
</script>

<section id="preview-panel" class="flex flex-col bg-white panel flex-1">
  <!-- Panel header -->
  <div class="bg-slate-50 px-4 h-10 flex items-center justify-between border-b border-slate-200 text-sm font-semibold text-slate-600 shrink-0">
    <div class="flex items-center gap-2">
      <i data-lucide="eye" class="w-4 h-4"></i> Live Preview
    </div>
    <div class="flex items-center gap-2">
      <button
        onclick={() => handleDownload('html')}
        class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded transition-colors duration-200"
        title="ดาวน์โหลดเป็น HTML"
      >
        <i data-lucide="file-code" class="w-3.5 h-3.5"></i> HTML
      </button>
      <button
        onclick={() => handleDownload('pdf')}
        class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded transition-colors duration-200"
        title="ดาวน์โหลดเป็น PDF"
      >
        <i data-lucide="file-text" class="w-3.5 h-3.5"></i> PDF
      </button>
      <button
        onclick={() => handleDownload('png')}
        class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded transition-colors duration-200"
        title="ดาวน์โหลดเป็น PNG"
      >
        <i data-lucide="image" class="w-3.5 h-3.5"></i> PNG
      </button>
      <div class="w-px h-4 bg-slate-200"></div>
      {@render closeBtn?.()}
    </div>
  </div>

  <!-- Preview content -->
  <div
    bind:this={previewEl}
    id="preview"
    class="flex-1 w-full p-8 overflow-y-auto prose prose-slate prose-blue max-w-none"
  ></div>
</section>
