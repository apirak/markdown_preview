import "./style.css";
import { marked, Renderer } from "marked";
import mermaid from "mermaid";
import { createIcons, icons } from "lucide";
import { defaultMarkdown } from "./default-content.js";
import { initCheatSheet, toggleCheatSheet } from "./cheatsheet.js";

// --- DOM Elements ---
const editor = document.getElementById("editor");
const preview = document.getElementById("preview");
const copyBtn = document.getElementById("copyBtn");

// --- Mermaid Setup ---
mermaid.initialize({
  startOnLoad: false,
  theme: "default",
});

// --- Marked.js Setup ---
// สร้าง Custom Renderer สำหรับ Marked.js เพื่อดักจับ code block ที่เป็น mermaid
const renderer = new Renderer();
const originalCodeRenderer = renderer.code.bind(renderer);
renderer.code = function ({ text, lang }) {
  if (lang === "mermaid") {
    return `<div class="mermaid">${text}</div>`;
  }
  return originalCodeRenderer({ text, lang });
};

// ตั้งค่า Marked.js ให้รองรับการขึ้นบรรทัดใหม่แบบปกติ
marked.setOptions({
  breaks: true,
  gfm: true,
  renderer: renderer,
});

// --- ตัวนับสำหรับสร้าง ID ไม่ซ้ำให้ Mermaid ---
let mermaidCounter = 0;

// --- ฟังก์ชันอัปเดต Preview สดๆ ---
async function updatePreview() {
  const markdownText = editor.value;
  const html = marked.parse(markdownText);
  preview.innerHTML = html;

  // Render Mermaid diagrams ถ้ามี
  const mermaidDivs = preview.querySelectorAll(".mermaid");
  if (mermaidDivs.length > 0) {
    for (const div of mermaidDivs) {
      const id = `mermaid-${mermaidCounter++}`;
      const graphDefinition = div.textContent;
      try {
        const { svg } = await mermaid.render(id, graphDefinition);
        div.innerHTML = svg;
      } catch (e) {
        div.innerHTML = `<pre class="text-red-500 text-sm">Mermaid Error: ${e.message}</pre>`;
      }
    }
  }
}

// --- ฟังก์ชันรีเซ็ตกลับไปค่าเริ่มต้น ---
function resetToDefault() {
  editor.value = defaultMarkdown;
  updatePreview();
}

// --- ฟังก์ชันคัดลอก Markdown (ใช้ Clipboard API แทน execCommand ที่ deprecated) ---
async function copyMarkdown() {
  try {
    await navigator.clipboard.writeText(editor.value);
  } catch {
    // Fallback สำหรับ browser เก่า
    const textArea = document.createElement("textarea");
    textArea.value = editor.value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
  }

  // เปลี่ยนหน้าตาปุ่มชั่วคราว
  const originalHTML = copyBtn.innerHTML;
  copyBtn.innerHTML =
    '<i data-lucide="check-circle-2" class="w-4 h-4 text-green-600"></i> <span class="text-green-600">คัดลอกแล้ว!</span>';
  createIcons({ icons });

  setTimeout(() => {
    copyBtn.innerHTML = originalHTML;
    createIcons({ icons });
  }, 2000);
}

// --- Initialize ---
createIcons({ icons });
initCheatSheet();

// ตั้งค่าเริ่มต้นและ Render ทันที
editor.value = defaultMarkdown;
updatePreview();

// ดักจับเวลาพิมพ์
editor.addEventListener("input", updatePreview);

// ผูก Event กับปุ่มต่างๆ ผ่าน data attributes
document
  .querySelector("[data-action='cheatsheet']")
  .addEventListener("click", toggleCheatSheet);
document
  .querySelector("[data-action='reset']")
  .addEventListener("click", resetToDefault);
document
  .querySelector("[data-action='copy']")
  .addEventListener("click", copyMarkdown);
