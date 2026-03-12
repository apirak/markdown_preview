import { writable } from 'svelte/store';
import type { Theme } from '../types';

// Load from localStorage
const stored = typeof localStorage !== 'undefined'
	? localStorage.getItem('theme') as Theme | null
	: null;

export const theme = writable<Theme>(stored || 'light');
