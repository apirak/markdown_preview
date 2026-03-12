<script lang="ts">
  import { onMount, type Snippet } from 'svelte';
  import EasyMDE from 'easymde';
  import { createIcons, icons } from 'lucide';
  import { showToast } from '../toast.js';
  import TemplateList from './TemplateList.svelte';

  interface Props {
    value: string;
    onchange: (value: string) => void;
    closeBtn?: Snippet;
  }

  const { value, onchange, closeBtn }: Props = $props();

  let editorEl: HTMLTextAreaElement;
  let easymde: EasyMDE;
  let showTemplates = $state(false);
  let toolbarVisible = $state(false);
  let copyBtn: HTMLButtonElement;

  export function setToolbarVisible(visible: boolean): void {
    toolbarVisible = visible;
    if (!easymde) return;
    const wrapper = easymde.codemirror
      .getWrapperElement()
      .closest('.EasyMDEContainer') as HTMLElement;
    if (wrapper) {
      wrapper.classList.toggle('toolbar-hidden', !visible);
    }
  }

  export function getValue(): string {
    return easymde?.value() ?? value;
  }

  export function setValue(content: string): void {
    easymde?.value(content);
  }

  export function refreshEditor(): void {
    setTimeout(() => easymde?.codemirror.refresh(), 50);
  }

  onMount(() => {
    easymde = new EasyMDE({
      element: editorEl,
      initialValue: value,
      placeholder: 'Type here...',
      spellChecker: false,
      status: false,
      toolbar: [
        'bold', 'italic', 'heading', '|',
        'quote', 'unordered-list', 'ordered-list', '|',
        'link', 'image', '|',
        'guide',
      ],
    });

    // Hide toolbar by default
    setToolbarVisible(false);

    easymde.codemirror.on('change', () => {
      onchange(easymde.value());
    });

    createIcons({ icons });
  });

  async function copyMarkdown(): Promise<void> {
    const text = easymde?.value() ?? '';
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }

    const original = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i data-lucide="check-circle-2" class="w-4 h-4 text-green-600"></i> <span class="text-green-600">คัดลอกแล้ว!</span>';
    createIcons({ icons });
    setTimeout(() => {
      copyBtn.innerHTML = original;
      createIcons({ icons });
    }, 2000);
  }

  function handleTemplateSelect(content: string): void {
    setValue(content);
    onchange(content);
    showToast('โหลด Template สำเร็จ', { type: 'success' });
  }
</script>

<section
  id="editor-panel"
  class="flex flex-col min-h-0 overflow-hidden border-r border-slate-200 bg-white panel flex-1"
>
  <!-- Panel header -->
  <div class="bg-slate-50 px-4 h-10 flex items-center justify-between border-b border-slate-200 text-sm font-semibold text-slate-600 shrink-0">
    <div class="flex items-center gap-2">
      <i data-lucide="square-pen" class="w-4 h-4"></i>Editor
    </div>
    <div class="flex items-center gap-2">
      <button
        onclick={() => (showTemplates = !showTemplates)}
        class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded transition-colors duration-200"
      >
        <i data-lucide="layout-template" class="w-3.5 h-3.5"></i> Template
      </button>
      <button
        bind:this={copyBtn}
        onclick={copyMarkdown}
        class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded transition-colors duration-200"
      >
        <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy
      </button>
      <div class="w-px h-4 bg-slate-200"></div>
      {@render closeBtn?.()}
    </div>
  </div>

  <!-- Editor area -->
  <div class="flex-1 min-h-0 overflow-auto relative" style="overscroll-behavior-y: none">
    <textarea bind:this={editorEl}></textarea>

    {#if showTemplates}
      <TemplateList
        onSelect={handleTemplateSelect}
        onClose={() => (showTemplates = false)}
      />
    {/if}
  </div>
</section>
