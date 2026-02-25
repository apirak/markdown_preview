import "./style.css";
import "easymde/dist/easymde.min.css";
import EasyMDE from "easymde";
import { marked, Renderer } from "marked";
import mermaid from "mermaid";
import { createIcons, icons } from "lucide";
import { defaultMarkdown } from "./default-content.js";
import { initHelpPanel } from "./help-panel.js";
import { initSiteLink } from "./components/site-link.js";

// --- DOM Elements ---
const textarea = document.getElementById("editor");
const preview = document.getElementById("preview");
const copyBtn = document.getElementById("copyBtn");
const toolbarToggleBtn = document.querySelector(
  "[data-action='toggle-toolbar']",
);

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

// --- EasyMDE Setup ---
const easymde = new EasyMDE({
  element: textarea,
  initialValue: defaultMarkdown,
  placeholder: "Type here...",
  spellChecker: false,
  status: false,
  toolbar: [
    "bold",
    "italic",
    "heading",
    "|",
    "quote",
    "unordered-list",
    "ordered-list",
    "|",
    "link",
    "image",
    "|",
    "guide",
  ],
});

// --- Toolbar Toggle ---
let toolbarVisible = false;

function setToolbarVisibility(visible) {
  toolbarVisible = visible;
  const editorWrapper = easymde.codemirror
    .getWrapperElement()
    .closest(".EasyMDEContainer");
  if (visible) {
    editorWrapper.classList.remove("toolbar-hidden");
    toolbarToggleBtn.classList.add("bg-blue-100", "text-blue-700");
    toolbarToggleBtn.classList.remove("bg-slate-100", "text-slate-600");
  } else {
    editorWrapper.classList.add("toolbar-hidden");
    toolbarToggleBtn.classList.remove("bg-blue-100", "text-blue-700");
    toolbarToggleBtn.classList.add("bg-slate-100", "text-slate-600");
  }
}

function toggleToolbar() {
  setToolbarVisibility(!toolbarVisible);
}

// --- ตัวนับสำหรับสร้าง ID ไม่ซ้ำให้ Mermaid ---
let mermaidCounter = 0;

// --- ฟังก์ชันอัปเดต Preview สดๆ ---
async function updatePreview() {
  const markdownText = easymde.value();
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
  easymde.value(defaultMarkdown);
  updatePreview();
}

// --- ฟังก์ชันคัดลอก Markdown (ใช้ Clipboard API แทน execCommand ที่ deprecated) ---
async function copyMarkdown() {
  try {
    await navigator.clipboard.writeText(easymde.value());
  } catch {
    // Fallback สำหรับ browser เก่า
    const textArea = document.createElement("textarea");
    textArea.value = easymde.value();
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

// --- Panel Toggle ---
const panelState = { help: false, editor: true, preview: true };

const panelElements = {
  help: document.getElementById("help-panel"),
  editor: document.getElementById("editor-panel"),
  preview: document.getElementById("preview-panel"),
};

function getToggleBtn(panelName) {
  return document.querySelector(
    `[data-action="toggle-panel"][data-panel="${panelName}"]`,
  );
}

function updatePanelVisibility() {
  const openCount = Object.values(panelState).filter(Boolean).length;
  const canClose = openCount > 1;

  for (const [name, el] of Object.entries(panelElements)) {
    const btn = getToggleBtn(name);
    const closeBtn = document.querySelector(
      `[data-action="close-panel"][data-panel="${name}"]`,
    );

    if (panelState[name]) {
      el.classList.remove("hidden");
      el.classList.add("flex");
      btn.classList.add("bg-blue-100", "text-blue-700");
      btn.classList.remove("bg-slate-100", "text-slate-600");

      // Disable close button if only 1 panel is open
      if (!canClose) {
        closeBtn.classList.add("opacity-30", "cursor-not-allowed", "pointer-events-none");
      } else {
        closeBtn.classList.remove("opacity-30", "cursor-not-allowed", "pointer-events-none");
      }
    } else {
      el.classList.add("hidden");
      el.classList.remove("flex");
      btn.classList.remove("bg-blue-100", "text-blue-700");
      btn.classList.add("bg-slate-100", "text-slate-600");
    }
  }
  // Refresh CodeMirror layout when panels change
  setTimeout(() => easymde.codemirror.refresh(), 50);
}

function togglePanel(panelName) {
  // ถ้าจะปิด ตรวจสอบว่าเหลืออย่างน้อย 1 panel
  if (panelState[panelName]) {
    const openCount = Object.values(panelState).filter(Boolean).length;
    if (openCount <= 1) return; // ไม่ให้ปิด panel สุดท้าย
  }
  panelState[panelName] = !panelState[panelName];

  // ถ้าเปิด Help panel ครั้งแรก ให้ init เนื้อหา
  if (panelName === "help" && panelState.help) {
    initHelpPanel();
  }

  updatePanelVisibility();
}

// --- Initialize ---
createIcons({ icons });
initSiteLink();

// ซ่อน toolbar เป็นค่าเริ่มต้น
setToolbarVisibility(false);

// ตั้งค่า panel visibility เริ่มต้น
updatePanelVisibility();

// Render preview ครั้งแรก
updatePreview();

// ดักจับเวลาพิมพ์ผ่าน CodeMirror
easymde.codemirror.on("change", updatePreview);

// ผูก Event กับปุ่มต่างๆ
toolbarToggleBtn.addEventListener("click", toggleToolbar);

// Panel toggle buttons
document.querySelectorAll("[data-action='toggle-panel']").forEach((btn) => {
  btn.addEventListener("click", () => togglePanel(btn.dataset.panel));
});

// Panel close (x) buttons
document.querySelectorAll("[data-action='close-panel']").forEach((btn) => {
  btn.addEventListener("click", () => togglePanel(btn.dataset.panel));
});

document
  .querySelector("[data-action='reset']")
  .addEventListener("click", resetToDefault);
document
  .querySelector("[data-action='copy']")
  .addEventListener("click", copyMarkdown);
