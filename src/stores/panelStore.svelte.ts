import type { PanelName, PanelState } from '../types.js';

const MIN_OPEN_PANELS = 1;

// Svelte 5 reactive state for panel visibility
export const panelState = $state<PanelState>({
  help: false,
  editor: true,
  preview: true,
});

export function togglePanel(name: PanelName): void {
  const openCount = (Object.values(panelState) as boolean[]).filter(Boolean).length;
  if (panelState[name] && openCount <= MIN_OPEN_PANELS) return;
  panelState[name] = !panelState[name];
}

export function closePanel(name: PanelName): void {
  const openCount = (Object.values(panelState) as boolean[]).filter(Boolean).length;
  if (openCount <= MIN_OPEN_PANELS) return;
  panelState[name] = false;
}
