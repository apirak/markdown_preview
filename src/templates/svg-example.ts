import type { Template } from "../types.js";

// Template: Color Mixing Quiz for Kids
export const template: Template = {
  id: "svg-example",
  icon: "🎨",
  category: "example",
  name: "Color Mixing Quiz",
  description: "ตัวอย่างเอกสารที่มี SVG ภาพประกอบ",
  content: `# 🎨 แบบฝึกหัดผสมสีสำหรับเด็กๆ

สวัสดีน้องๆ มาเรียนรู้การผสมสีกันเถอะ!

### แดง + เหลือง = สีอะไร?

<svg width="280" height="100">
  <circle cx="40" cy="50" r="35" fill="#ef4444" stroke="#dc2626" stroke-width="3" />
  <text x="40" y="55" text-anchor="middle" fill="white" font-size="14">แดง</text>
  <text x="100" y="55" text-anchor="middle" fill="#333" font-size="28">+</text>
  <circle cx="160" cy="50" r="35" fill="#fbbf24" stroke="#f59e0b" stroke-width="3" />
  <text x="160" y="55" text-anchor="middle" fill="white" font-size="14">เหลือง</text>
  <text x="220" y="55" text-anchor="middle" fill="#333" font-size="28">= ?</text>
</svg>

**ตัวเลือก:** ⬜ 1. เขียว | ⬜ 2. ส้ม | ⬜ 3. ม่วง`,
};
