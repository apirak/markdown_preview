import type { Template } from "../types.js";

// Template: Color Mixing Quiz for Kids
export const template: Template = {
  id: "svg-example",
  icon: "🎨",
  category: "example",
  name: "SVG Example",
  description: "Example document with SVG illustrations",
  content: `# 🎨 Color Mixing Quiz for Kids

Hello kids! Let's learn about color mixing. When we mix two colors together, we get a beautiful new color!

<svg width="320" height="60" viewBox="0 0 320 60">
  <circle cx="30" cy="30" r="25" fill="#ef4444" opacity="0.85"/>
  <circle cx="78" cy="30" r="25" fill="#f97316" opacity="0.85"/>
  <circle cx="126" cy="30" r="25" fill="#fbbf24" opacity="0.85"/>
  <circle cx="174" cy="30" r="25" fill="#22c55e" opacity="0.85"/>
  <circle cx="222" cy="30" r="25" fill="#3b82f6" opacity="0.85"/>
  <circle cx="270" cy="30" r="25" fill="#a855f7" opacity="0.85"/>
</svg>

### Red + Yellow = What color?

<svg width="420" height="130" viewBox="0 0 420 130">
  <rect x="23" y="30" width="64" height="10" rx="4" fill="#dc2626" stroke="#b91c1c" stroke-width="2"/>
  <rect x="27" y="40" width="56" height="65" rx="6" fill="#ef4444" stroke="#dc2626" stroke-width="2"/>
  <rect x="31" y="45" width="7" height="24" rx="3.5" fill="#fff" opacity="0.2"/>
  <text x="140" y="73" text-anchor="middle" fill="#888" font-size="36" font-weight="bold">+</text>
  <rect x="193" y="30" width="64" height="10" rx="4" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
  <rect x="197" y="40" width="56" height="65" rx="6" fill="#fbbf24" stroke="#f59e0b" stroke-width="2"/>
  <rect x="201" y="45" width="7" height="24" rx="3.5" fill="#fff" opacity="0.2"/>
  <text x="310" y="73" text-anchor="middle" fill="#888" font-size="36" font-weight="bold">=</text>
  <rect x="343" y="30" width="64" height="10" rx="4" fill="#ccc" stroke="#999" stroke-width="2"/>
  <rect x="347" y="40" width="56" height="65" rx="6" fill="#eee" stroke="#ccc" stroke-width="2"/>
  <rect x="351" y="45" width="7" height="24" rx="3.5" fill="#fff" opacity="0.3"/>
  <text x="375" y="84" text-anchor="middle" fill="#999" font-size="36" font-weight="bold">?</text>
</svg>

**Choices:** 🟢 A. Green | 🟠 B. Orange | 🟣 C. Purple`,
};
