# Markdown Preview – Implementation Plan

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Svelte 5 |
| Styling | Tailwind CSS v4 + Typography plugin |
| Build | Vite 6 |
| Language | TypeScript |
| Editor | EasyMDE (CodeMirror-backed) |
| Markdown | marked.js |
| Diagrams | Mermaid |
| Math | KaTeX |
| Icons | Lucide |
| Export | html2canvas + jsPDF |

---

## Pages

This is a single-page application (SPA) with no routing.

| Page | Description |
|------|-------------|
| `/` | Main editor + live preview |

---

## Layout

```
┌──────────────────────────────────────────────┐
│ Header (title, toolbar toggle, panel toggles) │
├──────────┬───────────────────┬───────────────┤
│ Help     │ Editor            │ Preview       │
│ Panel    │ Panel             │ Panel         │
│ (hidden) │ (EasyMDE)         │ (rendered MD) │
└──────────┴───────────────────┴───────────────┘
│ Toast Container (fixed bottom-right)          │
└──────────────────────────────────────────────┘
```

---

## Components

| Component | File | Description |
|-----------|------|-------------|
| App | `src/App.svelte` | Root, layout, global state |
| Header | `src/components/Header.svelte` | Top bar with buttons |
| EditorPanel | `src/components/EditorPanel.svelte` | EasyMDE wrapper |
| PreviewPanel | `src/components/PreviewPanel.svelte` | Live rendered markdown |
| HelpPanel | `src/components/HelpPanel.svelte` | Markdown cheat-sheet |
| TemplateList | `src/components/TemplateList.svelte` | Inline template picker |
| ToastContainer | `src/components/ToastContainer.svelte` | Notification toasts |
| SiteLink | `src/components/SiteLink.svelte` | Animated author link |

---

## Stores (Svelte Runes)

| Store | Description |
|-------|-------------|
| `panelStore.svelte.ts` | Visibility of each panel (help, editor, preview) |
| `editorStore.svelte.ts` | Markdown content |
| `toastStore.svelte.ts` | Active toast notifications |

---

## Interactions

| Interaction | Component | Mechanism |
|-------------|-----------|-----------|
| Toggle panel | Header | click → update `panelStore` |
| Close panel (×) | Panel header | click → update `panelStore` |
| Show/hide toolbar | Header | click → EasyMDE CSS class toggle |
| Live preview | EditorPanel | EasyMDE `change` event → updatePreview |
| Template picker | EditorPanel | click → show TemplateList overlay |
| Copy markdown | EditorPanel | click → Clipboard API |
| Download HTML | PreviewPanel | click → blob download |
| Download PDF | PreviewPanel | click → html2canvas + jsPDF |
| Download PNG | PreviewPanel | click → html2canvas |
| Toast notification | ToastContainer | `showToast()` utility |
| Animal emoji hover | SiteLink | mouseenter/leave animation |

---

## Theming

Tailwind CSS v4 uses CSS-based configuration in `src/app.css`:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --font-sans: "Sarabun", sans-serif;
  /* heading size custom properties */
}
```

Dark mode is available via `dark:` variant (class-based).

---

## Development Order

1. **[x] Set up tooling** – Svelte 5 + Tailwind CSS v4 + vite-plugin-svelte
2. **[x] Root entry** – `src/main.ts` mounts `App.svelte`; `index.html` references entry only
3. **[x] App layout** – `App.svelte` with Header + three-panel flex row
4. **[x] Header** – `Header.svelte` with all toolbar/panel buttons
5. **[x] Editor Panel** – `EditorPanel.svelte` wrapping EasyMDE
6. **[x] Preview Panel** – `PreviewPanel.svelte` with markdown/mermaid/katex rendering
7. **[x] Help Panel** – `HelpPanel.svelte` with the cheat-sheet content
8. **[x] Template List** – `TemplateList.svelte` inline overlay
9. **[ ] Toast System** – `ToastContainer.svelte` + reactive store
10. **[ ] Download utilities** – extract into `src/lib/download.ts`
11. **[ ] Dark mode** – add `dark:` classes and a theme toggle button

---

## Migration Notes

- Old vanilla-TS files under `src/` remain intact and serve as reference.
- Templates, types, toast utility, and download logic are reused as-is.
- EasyMDE is initialized inside Svelte `onMount` to access the DOM.
