// Templates Index - Export all templates and build template list
import { template as thaiPractice } from "./thai-practice.js";
import { template as englishPractice } from "./english-practice.js";
import { template as markdownExample } from "./markdown-example.js";
import { template as mermaidExample } from "./mermaid-example.js";
import { template as svgExample } from "./svg-example.js";
import { template as latexExample } from "./latex-example.js";

// Template list with metadata - built from imported templates
export const templates = [
  { id: thaiPractice.id, icon: thaiPractice.icon, category: thaiPractice.category },
  { id: englishPractice.id, icon: englishPractice.icon, category: englishPractice.category },
  { id: markdownExample.id, icon: markdownExample.icon, category: markdownExample.category },
  { id: mermaidExample.id, icon: mermaidExample.icon, category: mermaidExample.category },
  { id: svgExample.id, icon: svgExample.icon, category: svgExample.category },
  { id: latexExample.id, icon: latexExample.icon, category: latexExample.category },
];

// Template lookup map
const templateMap = {
  "thai-practice": thaiPractice,
  "english-practice": englishPractice,
  "markdown-example": markdownExample,
  "mermaid-example": mermaidExample,
  "svg-example": svgExample,
  "latex-example": latexExample,
};

// Get template by ID
export async function getTemplate(id) {
  return templateMap[id] || null;
}
