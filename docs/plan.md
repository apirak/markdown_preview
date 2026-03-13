# Plan: Markdown Preview - Desktop App

## TL;DR

**Desktop App** สำหรับ Markdown Preview ด้วย **Svelte + Vite + Tailwind CSS + Tauri** เริ่มจากศูนย์ สร้าง 3-panel layout (Editor, Preview, Help) แล้วเพิ่ม features แบบ incremental

---

## Tech Stack

### Core Technologies

| Technology | Purpose | Why? |
|------------|---------|------|
| **Svelte 5** (vanilla) | UI Framework | Reactive, simple syntax, great performance, runes mode |
| **Vite** | Build Tool | Fast dev server, optimized builds |
| **Tailwind CSS v4** | Styling | Utility-first, rapid UI development |
| **TypeScript** | Type Safety | Catch errors early, better DX |
| **Tauri** | Desktop Framework | Cross-platform (macOS, Windows, Linux), small bundle size |

### Why Svelte (Not SvelteKit)?

SvelteKit ออกแบบมาสำหรับ SSR Web Apps พร้อม Routing System ซึ่งเป็น over-engineering สำหรับ Desktop App:

| Aspect | SvelteKit | Svelte + Vite |
|--------|-----------|---------------|
| Use Case | SSR Web Apps | Single-page Apps |
| Complexity | High (adapters, routing, SSR) | Low (straightforward) |
| Build Output | Static/SSR/Node server | Static HTML/JS/CSS |
| Tauri Compatible | Need static adapter | ✅ Native fit |
| Desktop App | Over-engineering | ✅ Perfect fit |

---

## App Features

### Core Features (MVP)

- **Editor Panel** - แก้ไข Markdown พร้อม syntax highlighting
- **Preview Panel** - แสดงผล Markdown แบบ real-time
- **Help Panel** - คำแนะนำการใช้งาน

### Advanced Features (From Legacy)

- **Templates** - 7 เทมเพลตสำเร็ด (Simple, Blog, Documentation, etc.)
- **Export** - HTML, PDF, PNG download
- **KaTeX** - สูตรคณิตศาสตร์
- **Mermaid** - Diagrams (flowchart, sequence, etc.)
- **Theme** - Light/Dark mode toggle
- **Copy Button** - Copy markdown/HTML to clipboard

---

## Incremental Build Phases

### Phase 0: Reset & Legacy Move ✅

- [x] Move existing code to `legacy/` folder
- [x] Clean slate for new project

### Phase 1: Svelte + Vite + Tailwind Setup ✅

- [x] Install dependencies (Svelte 5, Vite, Tailwind v4, TypeScript)
- [x] Create project structure
- [x] Configure Vite + Tailwind CSS
- [x] Create basic 3-panel layout

### Phase 2: Component Refactoring ✅

- [x] Extract Header component (logo, title, action buttons)
- [x] Extract HelpPanel component (markdown guide)
- [x] Extract EditorPanel component (textarea, Template/Copy buttons)
- [x] Extract PreviewPanel component (rendered HTML, export buttons)
- [x] Use Svelte 5 runes mode (`$state`, `$derived`, `$props()`)
- [x] Reduce App.svelte from 365 → 55 lines (~85% reduction)

### Phase 3: Editor & Preview Basic Functionality ✅

- [x] Bind textarea to reactive state
- [x] Markdown parsing with `marked` library
- [x] Real-time preview rendering
- [x] Panel toggle system (Help/Editor/Preview)
- [x] Copy button functionality

### Phase 4: Theme System ✅

- [x] Create theme store with `writable` from Svelte stores
- [x] Load/save theme from localStorage
- [x] Add dark mode CSS classes to all components
- [x] Fix theme toggle button reactivity with `$effect`
- [x] Add Tailwind v4 dark mode with `@variant` directive
- [x] Verify theme switches correctly across all panels
- [x] Add GitHub-like markdown preview styles

### Phase 5: Templates System ✅

- [x] Create Template type in types.ts
- [x] Create src/lib/templates/ folder with 7 templates:
  - Simple Template (blank)
  - Thai Practice (ฝึกภาษาไทย)
  - English Practice
  - Markdown Example
  - Mermaid Example
  - SVG Example
  - LaTeX Examples
- [x] Create TemplateList modal component
- [x] Integrate template selection in App.svelte
- [x] Templates load and apply to editor correctly

### Phase 6: KaTeX + Mermaid Support ✅

- [x] Install KaTeX and Mermaid
- [x] Add math block rendering
- [x] Add diagram rendering
- [x] Verify: Math and diagrams display correctly

### Phase 7: Export Features

1. HTML export (copy/download)
2. PDF export
3. PNG export (html2canvas)
4. Verify: All exports work

### Phase 8: Tauri Integration

1. Install `@tauri-apps/cli`
2. Run `pnpm tauri init`
3. Configure Tauri (window size, build command)
4. Test desktop app
5. Package for distribution

### Phase 9: Polish & Cleanup

1. Compare with legacy feature list
2. Fill in missing pieces
3. Add keyboard shortcuts
4. Optimize performance
5. Delete `legacy/` folder when confident

---

## Project Structure

```
markdown_preview/
├── src/
│   ├── main.ts              ← Entry point (mount App)
│   ├── App.svelte           ← Root component (~55 lines)
│   ├── app.css              ← Tailwind CSS + dark mode
│   └── lib/
│       ├── components/      ← Reusable components
│       │   ├── Header.svelte      ← Logo, title, theme toggle, panel toggles
│       │   ├── HelpPanel.svelte   ← Markdown guide content
│       │   ├── EditorPanel.svelte ← Textarea + Template/Copy buttons
│       │   └── PreviewPanel.svelte ← Rendered HTML + export buttons
│       ├── stores/          ← State management
│       │   ├── theme.ts           ← Theme store (light/dark)
│       │   └── panels.ts          ← Panel visibility state
│       ├── types.ts         ← TypeScript types
│       └── utils/           ← Helper functions
│           └── markdown.ts  ← Markdown parsing (marked)
├── index.html               ← HTML entry
├── vite.config.ts           ← Vite config (Svelte + Tailwind)
├── tsconfig.json            ← TypeScript config
├── package.json             ← Dependencies & scripts
├── docs/                    ← Documentation
│   └── plan.md              ← This file
├── legacy/                  ← Old code (reference)
└── src-tauri/               ← Tauri config (Phase 8)
```

---

## Component Architecture

### App.svelte (Root)
- Holds main editor state (`editorText`)
- Manages preview HTML derivation
- Handles callbacks (copy, download, template, text change)
- Composes Header, HelpPanel, EditorPanel, PreviewPanel

### Header.svelte
- Logo + title with apirak.com link
- Theme toggle button (🌙/☀️)
- Toolbar toggle button (TODO)
- Panel toggle buttons (Help, Edit, Preview)

### HelpPanel.svelte
- Markdown syntax guide
- Close button (when not the last panel)

### EditorPanel.svelte
- Textarea for markdown input
- Template button (TODO functionality)
- Copy button (copies editor text)
- Close button (when not the last panel)

### PreviewPanel.svelte
- Rendered HTML from markdown
- Export buttons: HTML, PDF, PNG (TODO functionality)
- Close button (when not the last panel)

---

## Development Scripts

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Build for production
npm run preview   # Preview production build
npm run check     # TypeScript + Svelte check
```

---

## Known Issues

### Theme Toggle Reactivity
**Status**: Store created, but toggle button not fully reactive yet

**Current Implementation**:
```typescript
// src/lib/stores/theme.ts
export const theme = writable<Theme>(stored || 'light');
theme.subscribe((value) => {
  localStorage.setItem('theme', value);
  document.documentElement.classList.toggle('dark', value === 'dark');
});
```

**Issue**: Theme icon updates but full reactivity across components needs verification

**Next Steps**:
1. Verify `$theme` store subscription in Header.svelte
2. Ensure dark mode classes apply to all elements
3. Test theme persistence on page reload

---

## Notes

- **Svelte 5 Runes Mode**: Using `$state`, `$derived`, `$props()` instead of old Svelte syntax
- **Component Props**: Using callback pattern for two-way binding (e.g., `onTextChange`)
- **Type Safety**: All components fully typed with TypeScript interfaces
- **Incremental**: เพิ่ม feature ทีละอย่าง, อย่าทำพร้อมกัน
- **Reference legacy**: ดูโค้ดเก่าได้ แต่ไม่ต้อง copy ทุกอย่าง
