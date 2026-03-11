// Templates Index - Export all templates
export { template as thaiPractice } from "./thai-practice.js";
export { template as englishPractice } from "./english-practice.js";
export { template as markdownExample } from "./markdown-example.js";
export { template as mermaidExample } from "./mermaid-example.js";

// Template list with metadata
export const templates = [
  {
    id: "thai-practice",
    icon: "🇹🇭",
    category: "language",
  },
  {
    id: "english-practice",
    icon: "🇬🇧",
    category: "language",
  },
  {
    id: "markdown-example",
    icon: "📝",
    category: "example",
  },
  {
    id: "mermaid-example",
    icon: "📊",
    category: "example",
  },
];

// Get template by ID
export async function getTemplate(id) {
  switch (id) {
    case "thai-practice":
      const { template: thaiPractice } = await import("./thai-practice.js");
      return thaiPractice;
    case "english-practice":
      const { template: englishPractice } = await import("./english-practice.js");
      return englishPractice;
    case "markdown-example":
      const { template: markdownExample } = await import("./markdown-example.js");
      return markdownExample;
    case "mermaid-example":
      const { template: mermaidExample } = await import("./mermaid-example.js");
      return mermaidExample;
    default:
      return null;
  }
}
