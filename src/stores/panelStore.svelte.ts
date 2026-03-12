import type { PanelName, PanelState } from '../types.js';

// Svelte 5 reactive state for panel visibility
export const panelState = $state<PanelState>({
  help: false,
  editor: true,
  preview: true,
});

export function togglePanel(name: PanelName): void {
  const openCount = (Object.values(panelState) as boolean[]).filter(Boolean).length;
  if (panelState[name] && openCount <= 1) return; // keep at least one panel open
  panelState[name] = !panelState[name];
}

export function closePanel(name: PanelName): void {
  const openCount = (Object.values(panelState) as boolean[]).filter(Boolean).length;
  if (openCount <= 1) return;
  panelState[name] = false;
}
