# แผนการปรับ Layout เป็น 3 คอลัมน์: Help | Edit | Preview

## สถานะปัจจุบัน

ตอนนี้หน้าเว็บมี 2 คอลัมน์:

- **ซ้าย**: Editor (EasyMDE) — ครึ่งจอ
- **ขวา**: Live Preview — ครึ่งจอ
- **Modal**: คู่มือ Markdown (cheatsheet) แสดงเป็น popup overlay

## เป้าหมาย

เปลี่ยนเป็น 3 คอลัมน์ที่สามารถเปิด/ปิดได้:

```
┌──────────────────────────────────────────────────┐
│  Header:  [Logo + Title]     [Help] [Edit] [Preview] [Toolbar]  │
├──────────┬──────────────┬────────────────────────┤
│  Help    │  Editor      │  Preview               │
│  (คู่มือ) │  (EasyMDE)   │  (Live Preview)        │
│          │              │                        │
│  [x]     │    [x]       │    [x]                 │
└──────────┴──────────────┴────────────────────────┘
```

### ฟีเจอร์หลัก

1. **3 คอลัมน์**: Help, Edit, Preview แสดงเคียงข้างกัน
2. **Toggle ที่ Header**: ปุ่มเปิด/ปิดแต่ละ panel (Edit, Preview, Help)
3. **ปุ่ม × ที่แต่ละ panel**: ปิด panel ได้จากหัว panel เอง
4. **Responsive**: เมื่อเปิด/ปิด panel พื้นที่จะปรับขยายอัตโนมัติ
5. **ลบ Cheatsheet Modal**: ย้ายเนื้อหาคู่มือมาอยู่ใน Help panel แทน (เขียนใหม่)

---

## แผนการทำงาน

### ขั้นที่ 1: ปรับ HTML Layout (`index.html`)

- เปลี่ยน `<main>` จาก 2 section เป็น 3 section:
  - **Help Panel** (`#help-panel`): คอลัมน์ซ้ายสุด แสดงคู่มือ Markdown
  - **Editor Panel** (`#editor-panel`): คอลัมน์กลาง (EasyMDE)
  - **Preview Panel** (`#preview-panel`): คอลัมน์ขวา (Live Preview)
- แต่ละ section มี header bar พร้อมปุ่ม **×** ปิด panel
- เพิ่มปุ่ม toggle ที่ header bar ด้านบน: `Help`, `Edit`, `Preview`
- ลบ `#cheatSheetModal` ออก (ไม่ใช้ modal อีกต่อไป)
- ค่าเริ่มต้น: Help ปิด, Edit เปิด, Preview เปิด

### ขั้นที่ 2: เขียน Help Panel ใหม่ (`src/help-panel.js`)

- สร้างไฟล์ใหม่ `src/help-panel.js`
- เขียนเนื้อหาคู่มือใหม่ โดยอ้างอิงจาก `cheatsheet.js` เดิม
- ออกแบบเป็น scrollable content ภายใน panel (ไม่ใช่ modal)
- ใช้ Tailwind CSS จัด style เหมือนเดิม
- เก็บ `cheatsheet.js` ไว้เป็น reference (ไม่ลบ)

### ขั้นที่ 3: เพิ่ม CSS สำหรับ 3-column layout (`src/style.css`)

- ใช้ CSS Flexbox: แต่ละ panel เป็น `flex: 1` เมื่อเปิด
- Panel ที่ถูกปิดจะมี class `.hidden` → `display: none`
- Transition animation สำหรับเปิด/ปิด (optional)
- Help panel ความกว้างเริ่มต้นประมาณ 320px (fixed width), ส่วน Editor/Preview แบ่งครึ่งพื้นที่ที่เหลือ

### ขั้นที่ 4: เพิ่ม Panel Toggle Logic (`src/main.js`)

- สร้าง state object เก็บสถานะเปิด/ปิดของแต่ละ panel:
  ```js
  const panelState = { help: false, editor: true, preview: true };
  ```
- ฟังก์ชัน `togglePanel(panelName)`:
  - เปิด/ปิด panel ด้วย class toggle
  - อัปเดตสี active/inactive ของปุ่ม toggle ที่ header
  - ป้องกันไม่ให้ปิดทุก panel พร้อมกัน (ต้องเหลืออย่างน้อย 1 panel)
- ผูก event กับปุ่ม toggle ที่ header และปุ่ม × ที่แต่ละ panel
- ลบ import/code ที่เกี่ยวกับ cheatsheet modal เดิม

### ขั้นที่ 5: ลบ Cheatsheet Modal

- ลบ `<div id="cheatSheetModal">` จาก `index.html`
- ลบ import `initCheatSheet`, `toggleCheatSheet` จาก `main.js`
- เก็บไฟล์ `cheatsheet.js` ไว้เป็น reference

---

## รายละเอียดปุ่ม Toggle ที่ Header

| ปุ่ม    | Icon         | ฟังก์ชัน               | สถานะเริ่มต้น  |
| ------- | ------------ | ---------------------- | -------------- |
| Help    | `book-open`  | Toggle Help panel      | ปิด (inactive) |
| Edit    | `square-pen` | Toggle Editor panel    | เปิด (active)  |
| Preview | `eye`        | Toggle Preview panel   | เปิด (active)  |
| Toolbar | `panel-top`  | Toggle EasyMDE toolbar | ปิด (inactive) |

### สไตล์ปุ่ม

- **Active**: `bg-blue-100 text-blue-700`
- **Inactive**: `bg-slate-100 text-slate-600`

---

## สถานะ Panel เมื่อเปิด/ปิด

| สถานะ                   | Help | Editor | Preview | ความกว้าง               |
| ----------------------- | ---- | ------ | ------- | ----------------------- |
| เริ่มต้น                | ✗    | ✓      | ✓       | - / 50% / 50%           |
| เปิด Help               | ✓    | ✓      | ✓       | 320px / flex-1 / flex-1 |
| ปิด Preview             | ✗    | ✓      | ✗       | - / 100% / -            |
| เปิด Help + ปิด Preview | ✓    | ✓      | ✗       | 320px / flex-1 / -      |

---

## ไฟล์ที่ต้องแก้ไข

| ไฟล์                | การเปลี่ยนแปลง                                     |
| ------------------- | -------------------------------------------------- |
| `index.html`        | เพิ่ม Help panel, ปุ่ม toggle, ลบ modal            |
| `src/main.js`       | เพิ่ม panel toggle logic, ลบ cheatsheet modal code |
| `src/style.css`     | เพิ่ม styles สำหรับ panel layout                   |
| `src/help-panel.js` | ไฟล์ใหม่ — เนื้อหาคู่มือ Markdown                  |
| `src/cheatsheet.js` | เก็บไว้เป็น reference (ไม่แก้ไข)                   |
