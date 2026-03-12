# Plan: Markdown Preview Reset - Fresh SvelteKit Start

## TL;DR

**RESET PROJECT** - Move old code to `legacy/` for reference, start fresh with **SvelteKit** + **Tailwind CSS**. Build incrementally: blank page → basic setup → edit/preview/help pages → full features. Test manually at each step before adding more.

---

## New Approach - Incremental Build

**Key Principles:**

- Start as simple as possible - empty page with just Tailwind + TypeScript working
- Build ONE feature at a time, test manually before continuing
- Reference legacy code but don't try to port everything at once
- Keep decisions minimal initially, evolve as needed

## Decisions (So Far)

- **Framework**: SvelteKit (fresh init, not migration)
- **CSS**: Tailwind CSS (via Vite plugin - simpler)
- **TypeScript**: Yes
- **Legacy**: Move to `legacy/` folder for reference only

---

## Incremental Phases

### Phase 0: Reset & Legacy Move

1. Move existing code to `legacy/` folder
2. Clean slate for new project

### Phase 1: Fresh SvelteKit Init

1. Run `npm create svelte@latest .` (or similar)
2. Choose options: Skeleton, TypeScript, etc.
3. Verify: `npm run dev` shows default Svelte page

### Phase 2: Tailwind CSS Basic Setup

1. Install Tailwind CSS Vite plugin
2. Configure minimal `app.css`
3. Create test page with Tailwind classes
4. Verify: Styles work, dev server runs clean

### Phase 3: Basic Layout Skeleton

1. Create simple 3-panel layout (static, no functionality yet)
2. Basic header
3. Static content panels for: Editor, Preview, Help
4. Verify: Layout looks roughly right

### Phase 4: Editor Page (Manual Test)

1. Add basic textarea or simple editor
2. Show typed text in preview panel (simple markdown render)
3. Verify: Can type, see preview update

### Phase 5: Preview Page (Manual Test)

1. Better markdown rendering (marked.js or similar)
2. Basic styling for preview
3. Verify: Markdown renders properly

### Phase 6: Help Page (Manual Test)

1. Static help content
2. Basic styling
3. Verify: Help shows up

### Phase 7: Add Features Incrementally

Add features one by one from legacy:

- Templates
- Copy button
- Export (HTML/PDF/PNG)
- Theme toggle
- Toast notifications
- Better editor (EasyMDE or CodeMirror)

### Phase 8: Polish & Cleanup

1. Compare with legacy feature list
2. Fill in missing pieces
3. Delete `legacy/` folder when confident

---

## SvelteKit Init Options (To Decide)

When running `npm create svelte@latest`, need to choose:

```bash
? Which Svelte app template?
  - Skeleton project (minimal - good for custom styling)

? Add type checking?
  - Yes, TypeScript

? Select additional options:
  - ESLint? (Yes/No)
  - Prettier? (Yes/No)
  - Playwright? (Yes/No)
  - Vitest? (Yes/No)
```

---

## Target Features (From Legacy)

Reference these files when building incrementally:

- **Editor**: Basic textarea → EasyMDE/CodeMirror
- **Preview**: marked.js + KaTeX + Mermaid
- **Templates**: 7 template definitions
- **Export**: HTML, PDF, PNG download
- **UI**: 3-panel layout, toggle panels
- **Theme**: Light/Dark/System toggle
- **Notifications**: Toast system

---

## Notes

- Keep it simple at each step
- Test manually after each phase
- Don't build everything at once
- Reference `legacy/` code as needed, not as a blueprint to follow exactly
