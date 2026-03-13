import type { Template } from '../types.js';

// Template: Markdown Example
export const template: Template = {
	id: 'markdown-example',
	icon: '📝',
	category: 'example',
	name: 'Markdown Example',
	description: 'Prompt-style document showcasing Markdown features',
	content: `# 📝 Prompt: Build a Landing Page

## 🎯 Goal

Create a **responsive landing page** for a SaaS product that converts visitors into trial users, with a clean and modern design.

## 🧑‍💼 Role

You are a senior frontend developer with expertise in *UI/UX best practices* and ~~jQuery~~ modern frameworks like React, Vue, or Svelte.

## 📖 Context

Our startup is launching a new **project management tool** called *TaskFlow*. We need a landing page before the product launch on **April 15, 2025**. The page must load fast, look great on mobile, and clearly communicate our value proposition.

> **Key insight:** 70% of our target users browse on mobile devices, so mobile-first design is critical.

### Target Audience

| Segment | Age Range | Pain Point | Priority |
|---------|-----------|------------|----------|
| Freelancers | 25–35 | Juggling multiple clients | 🔴 High |
| Small teams | 28–40 | No centralized task board | 🔴 High |
| Managers | 35–50 | Lack of progress visibility | 🟡 Medium |
| Students | 18–25 | Staying organized | 🟢 Low |

## 📋 Requirements

### Must-Have Sections

- [x] Hero section with headline and CTA button
- [x] Feature highlights (3 cards)
- [x] Pricing table
- [ ] Customer testimonials
- [ ] FAQ accordion
- [ ] Footer with social links

### Technical Requirements

1. Use **semantic HTML5** elements
2. Style with *CSS Grid* and *Flexbox*
3. Ensure \`lighthouse score >= 90\` for performance
4. Support dark mode via \`prefers-color-scheme\`

## 🔧 Instructions

Follow these steps in order:

1. Set up the project structure
2. Build the hero section first
3. Add responsive breakpoints at \`768px\` and \`1024px\`
4. Implement lazy loading for images
5. Test on real devices before deployment

### Code Snippet

Here's the recommended HTML structure:

\`\`\`html
<section class="hero">
  <h1>Manage tasks, not chaos.</h1>
  <p>TaskFlow keeps your team aligned and productive.</p>
  <a href="/signup" class="cta-button">Start Free Trial</a>
</section>
\`\`\`

### Color Palette

> Use these brand colors consistently:
> - **Primary:** \`#6366f1\` (Indigo)
> - **Secondary:** \`#f59e0b\` (Amber)
> - **Background:** \`#f8fafc\` (Slate 50)

## 📌 Constraints

- Page must load in under **2 seconds** on 3G
- Total bundle size ≤ **150KB** gzipped
- No external font loading — use system fonts
- Must pass **WCAG 2.1 AA** accessibility standards

## ✅ Output Format

Deliver:

1. A single \`index.html\` file
2. A \`styles.css\` file (no Tailwind — plain CSS only)
3. A brief \`README.md\` with setup instructions`
};
