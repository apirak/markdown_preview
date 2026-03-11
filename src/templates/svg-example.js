// Template: SVG Examples
export const template = {
  name: "SVG Examples",
  description: "ตัวอย่างการใช้ SVG วาดรูปต่างๆ ใน Markdown",
  content: `# 🎨 SVG Examples

เอกสารนี้รวบรวมตัวอย่างการใช้ SVG ใน Markdown

---

## 🔵 รูปทรงเรขิค

### สี่เหลี่ยมผืนผ้า
<svg width="150" height="100">
  <rect x="10" y="10" width="130" height="80" fill="#3b82f6" rx="4" />
</svg>

### สี่เหลี่ยมมุมฉาก
<svg width="150" height="100">
  <rect x="10" y="10" width="80" height="80" fill="#10b981" />
</svg>

### สี่เหลี่ยมคางหมู
<svg width="150" height="100">
  <polygon points="10,90 75,10 140,90" fill="#f59e0b" />
</svg>

---

## 🔴 วงกลมและรูปวงกลม

### วงกลม
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="#ef4444" />
</svg>

### วงรี
<svg width="150" height="100">
  <ellipse cx="75" cy="50" rx="60" ry="35" fill="#8b5cf6" />
</svg>

---

## 📐 เส้นและรูปทรงอื่นๆ

### เส้นตรง
<svg width="200" height="50">
  <line x1="10" y1="25" x2="190" y2="25" stroke="#3b82f6" stroke-width="3" />
</svg>

### เส้นโค้ง
<svg width="200" height="50">
  <path d="M 10 40 Q 100 10 190 40" stroke="#10b981" stroke-width="3" fill="none" />
</svg>

### ดาว
<svg width="100" height="100">
  <polygon points="50,5 61,40 98,40 68,62 79,97 50,75 21,97 32,62 2,40 39,40" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
</svg>

---

## 🎨 การใช้ Gradient

### Linear Gradient
<svg width="150" height="100">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect x="10" y="10" width="130" height="80" fill="url(#grad1)" rx="4" />
</svg>

### Radial Gradient
<svg width="100" height="100">
  <defs>
    <radialGradient id="grad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" style="stop-color:#fbbf24;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:1" />
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="40" fill="url(#grad2)" />
</svg>

---

## 🔄 Icons ง่ายๆ

### หัวใจ
<svg width="50" height="50">
  <path d="M25 45 L10 28 Q5 20 15 15 Q25 10 25 25 Q25 10 35 15 Q45 20 40 28 Z" fill="#ef4444" stroke="#dc2626" stroke-width="2" />
</svg>

### รูปสามเหลี่ยม (Play)
<svg width="50" height="50">
  <polygon points="15,10 15,40 40,25" fill="#3b82f6" stroke="#2563eb" stroke-width="2" />
</svg>

### เครื่องหมายถูก (Check)
<svg width="50" height="50">
  <polyline points="10,25 20,35 40,15" fill="none" stroke="#10b981" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
</svg>

---

## 🌈 SVG พร้อม Animation

### หมุนวงกลม
<svg width="80" height="80">
  <circle cx="40" cy="40" r="30" fill="#3b82f6">
    <animate attributeName="r" values="25;35;25" dur="2s" repeatCount="indefinite" />
    <animate attributeName="fill" values="#3b82f6;#8b5cf6;#3b82f6" dur="2s" repeatCount="indefinite" />
  </circle>
</svg>

### เคลื่อนที่
<svg width="100" height="50">
  <circle cx="10" cy="25" r="10" fill="#ef4444">
    <animate attributeName="cx" values="10;90;10" dur="3s" repeatCount="indefinite" />
  </circle>
</svg>

---

## 💡 Tips

SVG ใน Markdown สามารถ:
- ใช้ tag \`<svg>\` โดยตรง
- กำหนดขนาดด้วย \`width\` และ \`height\`
- ใส่ในบรรทัดเดียวกับข้อความได้
- ใช้ร่วมกับ Markdown formatting อื่นๆ

สนุกกับการวาดรูปด้วย SVG! 🎨
`,
};
