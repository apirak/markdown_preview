import { writable } from 'svelte/store';
import type { Theme } from '../types';

// Load from localStorage
const stored = typeof localStorage !== 'undefined'
	? localStorage.getItem('theme') as Theme | null
	: null;

export const theme = writable<Theme>(stored || 'light');

// Subscribe to update DOM class and localStorage when theme changes
if (typeof document !== 'undefined') {
	theme.subscribe((value) => {
		localStorage.setItem('theme', value);
		document.documentElement.classList.toggle('dark', value === 'dark');
	});
}
