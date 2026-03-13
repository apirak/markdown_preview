import { writable } from 'svelte/store';
import type { PanelState, PanelName } from '../types';

const initial: PanelState = {
	help: false,
	editor: true,
	preview: true
};

export const panels = writable<PanelState>(initial);

export function togglePanel(name: PanelName, state: PanelState): PanelState {
	// Can't close last panel
	const openCount = Object.values(state).filter(Boolean).length;
	if (state[name] && openCount <= 1) return state;

	return {
		...state,
		[name]: !state[name]
	};
}
