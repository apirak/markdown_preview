import type { Template } from '../types.js';

// Template: Color Mixing Quiz for Kids
export const template: Template = {
	id: 'svg-example',
	icon: '🎨',
	category: 'example',
	name: 'SVG Example',
	description: 'Example document with SVG illustrations',
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
  <path d="M38 32 Q55 8 72 32" fill="none" stroke="#b91c1c" stroke-width="4" stroke-linecap="round"/>
  <rect x="23" y="30" width="64" height="10" rx="4" fill="#dc2626" stroke="#b91c1c" stroke-width="2"/>
  <rect x="27" y="40" width="56" height="65" rx="6" fill="#ef4444" stroke="#dc2626" stroke-width="2"/>
  <rect x="31" y="45" width="7" height="24" rx="3.5" fill="#fff" opacity="0.2"/>
  <circle cx="44" cy="64" r="4.5" fill="#fff"/><circle cx="66" cy="64" r="4.5" fill="#fff"/>
  <circle cx="44" cy="65" r="2.2" fill="#333"/><circle cx="66" cy="65" r="2.2" fill="#333"/>
  <path d="M44 80 Q55 90 66 80" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M77 39 Q80 50 76 56 Q72 50 77 39" fill="#dc2626"/>
  <text x="140" y="73" text-anchor="middle" fill="#888" font-size="36" font-weight="bold">+</text>
  <path d="M208 32 Q225 8 242 32" fill="none" stroke="#d97706" stroke-width="4" stroke-linecap="round"/>
  <rect x="193" y="30" width="64" height="10" rx="4" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
  <rect x="197" y="40" width="56" height="65" rx="6" fill="#fbbf24" stroke="#f59e0b" stroke-width="2"/>
  <rect x="201" y="45" width="7" height="24" rx="3.5" fill="#fff" opacity="0.2"/>
  <circle cx="214" cy="64" r="4.5" fill="#fff"/><circle cx="236" cy="64" r="4.5" fill="#fff"/>
  <circle cx="214" cy="65" r="2.2" fill="#333"/><circle cx="236" cy="65" r="2.2" fill="#333"/>
  <path d="M214 80 Q225 90 236 80" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M247 39 Q250 50 246 56 Q242 50 247 39" fill="#d97706"/>
  <text x="310" y="73" text-anchor="middle" fill="#888" font-size="36" font-weight="bold">=</text>
  <path d="M358 32 Q375 8 392 32" fill="none" stroke="#999" stroke-width="4" stroke-linecap="round"/>
  <rect x="343" y="30" width="64" height="10" rx="4" fill="#ccc" stroke="#999" stroke-width="2"/>
  <rect x="347" y="40" width="56" height="65" rx="6" fill="#eee" stroke="#ccc" stroke-width="2"/>
  <rect x="351" y="45" width="7" height="24" rx="3.5" fill="#fff" opacity="0.3"/>
  <text x="375" y="84" text-anchor="middle" fill="#999" font-size="36" font-weight="bold">?</text>
</svg>

**Choices:** 🟢 A. Green | 🟠 B. Orange | 🟣 C. Purple`
};
