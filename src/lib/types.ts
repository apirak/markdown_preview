/**
 * Type definitions for the app
 */

export type PanelName = 'help' | 'editor' | 'preview';

export interface PanelState {
	help: boolean;
	editor: boolean;
	preview: boolean;
}

export type Theme = 'light' | 'dark';

export interface AppState {
	panels: PanelState;
	theme: Theme;
}

export type DownloadFormat = 'html' | 'pdf' | 'png';

export interface Template {
	id: string;
	icon: string;
	category: string;
	name: string;
	description: string;
	content: string;
}
