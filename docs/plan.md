# Plan: Markdown Preview - Desktop App

## TL;DR

**Desktop App** สำหรับ Markdown Preview ด้วย **Svelte + Vite + Tailwind CSS + Tauri** เริ่มจากศูนย์ สร้าง 3-panel layout (Editor, Preview, Help) แล้วเพิ่ม features แบบ incremental

---

## Tech Stack

### Core Technologies

| Technology | Purpose | Why? |
|------------|---------|------|
| **Svelte** (vanilla) | UI Framework | Reactive, simple syntax, great performance |
| **Vite** | Build Tool | Fast dev server, optimized builds |
| **Tailwind CSS** | Styling | Utility-first, rapid UI development |
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

- [x] Install dependencies
- [x] Create project structure
- [x] Configure Vite + Tailwind
- [x] Create basic 3-panel layout

### Phase 2: Editor Functionality

1. Bind textarea to state
2. Add markdown syntax highlight (เริ่มจาก plain textarea ก่อน)
3. Add word/character count
4. Verify: Can type, state updates correctly

### Phase 3: Preview Rendering

1. Install markdown parser (`marked`)
2. Parse markdown to HTML
3. Render in preview panel
4. Add basic CSS styling for HTML elements
5. Verify: Markdown renders correctly

### Phase 4: KaTeX + Mermaid Support

1. Install KaTeX and Mermaid
2. Add math block rendering
3. Add diagram rendering
4. Verify: Math and diagrams display correctly

### Phase 5: Templates System

1. Create template definitions (7 templates from legacy)
2. Add template selector UI
3. Apply template to editor
4. Verify: Templates load and work

### Phase 6: Export Features

1. HTML export (copy/download)
2. PDF export
3. PNG export (html2canvas)
4. Verify: All exports work

### Phase 7: Theme Toggle

1. Create theme store/state
2. Add light/dark mode toggle
3. Apply theme to all panels
4. Persist to localStorage
5. Verify: Theme switches correctly

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
│   ├── main.ts              ← Entry point
│   ├── App.svelte           ← Root component (3-panel layout)
│   ├── app.css              ← Tailwind CSS
│   └── lib/
│       ├── components/      ← Reusable components
│       │   ├── Editor.svelte
│       │   ├── Preview.svelte
│       │   └── Help.svelte
│       └── utils/           ← Helper functions
│           ├── markdown.ts  ← Markdown parsing
│           └── templates.ts ← Template definitions
├── index.html               ← HTML entry
├── vite.config.ts           ← Vite config
├── tsconfig.json            ← TypeScript config
├── package.json             ← Dependencies & scripts
├── docs/                    ← Documentation
├── legacy/                  ← Old code (reference)
└── src-tauri/               ← Tauri config (Phase 8)
```

---

## Development Scripts

```bash
pnpm dev       # Start dev server (http://localhost:5173)
pnpm build     # Build for production
pnpm preview   # Preview production build
pnpm check     # TypeScript check
```

---

## Notes

- **Start simple**: Plain textarea ก่อน, ค่อย upgrade เป็น CodeMirror/EasyMDE ภายหลัง
- **Test manually**: ทดสอบแต่ละ phase ก่อนไปต่อ
- **Reference legacy**: ดูโค้ดเก่าได้ แต่ไม่ต้อง copy ทุกอย่าง
- **Incremental**: เพิ่ม feature ทีละอย่าง, อย่าทำพร้อมกัน
