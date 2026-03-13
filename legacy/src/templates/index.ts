import type { Template } from "../types.js";
import { template as thaiPractice } from "./thai-practice.js";
import { template as englishPractice } from "./english-practice.js";
import { template as markdownExample } from "./markdown-example.js";
import { template as mermaidExample } from "./mermaid-example.js";
import { template as svgExample } from "./svg-example.js";
import { template as latexExample } from "./latex-example.js";
import { template as simpleTemplate } from "./simple-template.js";

// Template list with full template objects
export const templates: Template[] = [
  simpleTemplate,
  thaiPractice,
  englishPractice,
  markdownExample,
  mermaidExample,
  svgExample,
  latexExample,
];

// Get template by ID
export async function getTemplate(id: string): Promise<Template | null> {
  return templates.find((t) => t.id === id) || null;
}
