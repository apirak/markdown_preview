// Shared type definitions

export interface Template {
  id: string;
  icon: string;
  category: string;
  name: string;
  description: string;
  content: string;
}

export interface ToastOptions {
  type?: 'error' | 'warning' | 'success' | 'info';
  duration?: number | null;
  dismissible?: boolean;
}

export type PanelName = 'help' | 'editor' | 'preview';

export interface PanelState {
  help: boolean;
  editor: boolean;
  preview: boolean;
}

export type DownloadFormat = 'html' | 'pdf' | 'png';
