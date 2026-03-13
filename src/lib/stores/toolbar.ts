import { writable } from 'svelte/store';

// Load from localStorage (default: false/hidden)
const stored = typeof localStorage !== 'undefined'
	? localStorage.getItem('toolbar') === 'true'
	: false;

export const toolbar = writable<boolean>(stored);

// Persist to localStorage on changes
if (typeof localStorage !== 'undefined') {
	toolbar.subscribe((value) => {
		localStorage.setItem('toolbar', String(value));
	});
}
