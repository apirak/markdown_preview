<script lang="ts">
  import { createIcons, icons } from 'lucide';
  import { templates } from '../templates/index.js';

  interface Props {
    onSelect: (content: string) => void;
    onClose: () => void;
  }

  const { onSelect, onClose }: Props = $props();

  function handleSelect(content: string): void {
    onSelect(content);
    onClose();
  }

  function handleKeydown(e: KeyboardEvent, content: string): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(content);
    }
  }

  $effect(() => {
    createIcons({ icons });
  });
</script>

<div class="template-list" role="dialog" aria-label="Choose a template">
  <div class="template-list-header">
    <span class="template-list-title">Choose a template</span>
    <button class="template-list-close" onclick={onClose} aria-label="Close">
      <i data-lucide="x" class="w-4 h-4"></i>
    </button>
  </div>
  <div class="template-list-items">
    {#each templates as t (t.id)}
      <button
        class="template-list-item"
        onclick={() => handleSelect(t.content)}
        onkeydown={(e) => handleKeydown(e, t.content)}
      >
        <span class="template-list-item-icon">{t.icon}</span>
        <div class="template-list-item-body">
          <span class="template-list-item-name">{t.name}</span>
          <span class="template-list-item-desc">{t.description}</span>
        </div>
      </button>
    {/each}
  </div>
</div>
