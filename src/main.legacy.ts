import "./style.css";
import "easymde/dist/easymde.min.css";
import EasyMDE from "easymde";
import { marked, Renderer } from "marked";
import mermaid from "mermaid";
import { createIcons, icons } from "lucide";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import katex from "katex";
import { initHelpPanel } from "./help-panel.js";
import { initSiteLink } from "./components/site-link.js";
import { showToast } from "./toast.js";
import {
  initTemplateList,
  toggle as toggleTemplateList,
} from "./template-list.js";
import { template as simpleTemplate } from "./templates/simple-template.js";
import type { PanelState, PanelName, DownloadFormat } from "./types.js";

// --- DOM Elements ---
const textarea = document.getElementById("editor") as HTMLTextAreaElement;
const preview = document.getElementById("preview") as HTMLDivElement;
const copyBtn = document.getElementById("copyBtn") as HTMLButtonElement;
const toolbarToggleBtn = document.querySelector(
  "[data-action='toggle-toolbar']",
) as HTMLButtonElement;

// --- Mermaid Setup ---
mermaid.initialize({
  startOnLoad: false,
  suppressErrorRendering: true, // ซ่อน error message ใน DOM
  securityLevel: "loose",
  theme: "base",
});

// --- Marked.js Setup ---
// สร้าง Custom Renderer สำหรับ Marked.js เพื่อดักจับ code block ที่เป็น mermaid
const renderer = new Renderer();
const originalCodeRenderer = renderer.code.bind(renderer);
renderer.code = function (code: {
  text: string;
  lang?: string;
  type: "code";
  raw: string;
}): string {
  if (code.lang === "mermaid") {
    return `<div class="mermaid">${code.text}</div>`;
  }
  return originalCodeRenderer(code);
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
  initialValue: simpleTemplate.content,
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

function setToolbarVisibility(visible: boolean): void {
  toolbarVisible = visible;
  const editorWrapper = easymde.codemirror
    .getWrapperElement()
    .closest(".EasyMDEContainer") as HTMLElement;
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

function toggleToolbar(): void {
  setToolbarVisibility(!toolbarVisible);
}

// --- ตัวนับสำหรับสร้าง ID ไม่ซ้ำให้ Mermaid ---
let mermaidCounter = 0;

// --- ฟังก์ชันอัปเดต Preview สดๆ ---
async function updatePreview(): Promise<void> {
  let markdownText = easymde.value();

  // --- ประมวลผล LaTeX Math ก่อน (เพื่อป้องกันการ render ผิด) ---
  interface MathBlock {
    math: string;
    displayMode: boolean;
  }
  const mathBlocks: MathBlock[] = [];
  const mathBlockPlaceholder = (index: number) =>
    `<span data-math-placeholder="${index}"></span>`;

  // แทนที่ display math ($$...$$) ด้วย placeholder
  markdownText = markdownText.replace(/\$\$([\s\S]+?)\$\$/g, (_match, math) => {
    mathBlocks.push({ math: math.trim(), displayMode: true });
    return mathBlockPlaceholder(mathBlocks.length - 1);
  });

  // แทนที่ inline math ($...$) ด้วย placeholder
  markdownText = markdownText.replace(/\$([^$\n]+?)\$/g, (_match, math) => {
    mathBlocks.push({ math: math.trim(), displayMode: false });
    return mathBlockPlaceholder(mathBlocks.length - 1);
  });

  // --- Render Markdown ด้วย Marked.js ---
  const html = await marked.parse(markdownText);
  preview.innerHTML = html;

  // --- แทนที่ placeholder ด้วย KaTeX rendered math ---
  for (let i = 0; i < mathBlocks.length; i++) {
    const { math, displayMode } = mathBlocks[i];
    const placeholderEl = preview.querySelector(
      `[data-math-placeholder="${i}"]`,
    );
    if (!placeholderEl) continue;

    try {
      const mathHtml = katex.renderToString(math, {
        displayMode,
        throwOnError: false,
      });
      const span = document.createElement(displayMode ? "div" : "span");
      span.className = displayMode ? "katex-display" : "katex-inline";
      span.innerHTML = mathHtml;
      placeholderEl.parentNode?.replaceChild(span, placeholderEl);
    } catch (e) {
      const error = e as Error;
      showToast(`LaTeX Error: ${error.message}`, {
        type: "error",
        duration: 5000,
      });
      // แสดง raw math แทน
      const span = document.createElement(displayMode ? "div" : "span");
      span.className = "text-red-500";
      span.textContent = `${displayMode ? "$$" : "$"}${math}${displayMode ? "$$" : "$"}`;
      placeholderEl.parentNode?.replaceChild(span, placeholderEl);
    }
  }

  // --- Render Mermaid diagrams ถ้ามี ---
  const mermaidDivs = preview.querySelectorAll(".mermaid");
  if (mermaidDivs.length > 0) {
    for (const div of mermaidDivs) {
      const id = `mermaid-${mermaidCounter++}`;
      const graphDefinition = div.textContent || "";
      try {
        const { svg } = await mermaid.render(id, graphDefinition);
        div.innerHTML = svg;
      } catch (e) {
        // Mermaid error - แสดง toast และเว้นว่างใน preview
        const error = e as Error;
        showToast(`Mermaid Error: ${error.message}`, {
          type: "error",
          duration: 8000,
        });
        div.innerHTML = "";
      }
    }
  }
}

// --- ฟังก์ชันคัดลอก Markdown (ใช้ Clipboard API แทน execCommand ที่ deprecated) ---
async function copyMarkdown(): Promise<void> {
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
const panelState: PanelState = { help: false, editor: true, preview: true };

const panelElements: Record<PanelName, HTMLElement> = {
  help: document.getElementById("help-panel") as HTMLElement,
  editor: document.getElementById("editor-panel") as HTMLElement,
  preview: document.getElementById("preview-panel") as HTMLElement,
};

function getToggleBtn(panelName: PanelName): HTMLButtonElement {
  return document.querySelector(
    `[data-action="toggle-panel"][data-panel="${panelName}"]`,
  ) as HTMLButtonElement;
}

function updatePanelVisibility(): void {
  const openCount = Object.values(panelState).filter(Boolean).length;
  const canClose = openCount > 1;

  for (const [name, el] of Object.entries(panelElements) as [
    PanelName,
    HTMLElement,
  ][]) {
    const btn = getToggleBtn(name);
    const closeBtn = document.querySelector(
      `[data-action="close-panel"][data-panel="${name}"]`,
    ) as HTMLElement;

    if (panelState[name]) {
      el.classList.remove("hidden");
      el.classList.add("flex");
      btn.classList.add("bg-blue-100", "text-blue-700");
      btn.classList.remove("bg-slate-100", "text-slate-600");

      // Disable close button if only 1 panel is open
      if (!canClose) {
        closeBtn.classList.add(
          "opacity-30",
          "cursor-not-allowed",
          "pointer-events-none",
        );
      } else {
        closeBtn.classList.remove(
          "opacity-30",
          "cursor-not-allowed",
          "pointer-events-none",
        );
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

function togglePanel(panelName: PanelName): void {
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

// --- Download/Export Functions ---

// ฟังก์ชันดาวน์โหลดเป็น HTML
async function downloadHTML(): Promise<void> {
  try {
    const previewContent = document.getElementById("preview")?.innerHTML || "";
    const title =
      easymde
        .value()
        .split("\n")[0]
        .replace(/^#+\s*/, "") || "markdown-export";

    // สร้างไฟล์ HTML เต็มรูปแบบพร้อม Tailwind CDN, KaTeX, Font และ custom styles
    const htmlContent = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <script src="https://cdn.tailwindcss.com?plugins=typography"><\/script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" crossorigin="anonymous">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: "Sarabun", sans-serif;
      padding: 2rem;
      max-width: 900px;
      margin: 0 auto;
    }
    /* Heading sizes */
    :root {
      --heading-h1: 1.5em;
      --heading-h2: 1.3em;
      --heading-h3: 1.15em;
      --heading-h4: 1.05em;
      --heading-h5: 0.95em;
      --heading-h6: 0.9em;
    }
    h1 { font-size: var(--heading-h1); }
    h2 { font-size: var(--heading-h2); }
    h3 { font-size: var(--heading-h3); }
    h4 { font-size: var(--heading-h4); }
    h5 { font-size: var(--heading-h5); }
    h6 { font-size: var(--heading-h6); }
    /* KaTeX Display */
    .katex-display {
      margin: 1em 0;
      padding: 0.5em 0;
      overflow-x: auto;
      overflow-y: hidden;
    }
    .katex-inline {
      padding: 0 0.2em;
    }
    /* Task list: hide bullet */
    li:has(input[type="checkbox"]) {
      list-style-type: none;
      padding-left: 0;
    }
  </style>
</head>
<body class="bg-slate-50">
  <div class="prose prose-slate prose-blue max-w-none">
    ${previewContent}
  </div>
</body>
</html>`;

    // สร้าง Blob และดาวน์โหลด
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast("ดาวน์โหลด HTML สำเร็จ", { type: "success" });
  } catch (error) {
    const err = error as Error;
    showToast("ดาวน์โหลด HTML ไม่สำเร็จ: " + err.message, { type: "error" });
  }
}

// ฟังก์ชันดาวน์โหลดเป็น PDF
async function downloadPDF(): Promise<void> {
  try {
    showToast("กำลังสร้าง PDF กรุณารอสักครู่...", {
      type: "info",
      duration: 5000,
    });

    // รอให้ fonts โหลดเสร็จก่อน
    await document.fonts.ready;

    // คัดลอก preview element เพื่อใช้ในการ render โดยไม่กระทบกับหน้าจอจริง
    const originalElement = document.getElementById("preview") as HTMLElement;
    const clonedElement = originalElement.cloneNode(true) as HTMLElement;

    // สร้าง temporary container เพื่อ render
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.top = "0";
    container.style.width = originalElement.offsetWidth + "px";
    container.style.padding = "2rem";
    container.style.background = "#ffffff";
    container.appendChild(clonedElement);
    document.body.appendChild(container);

    try {
      const canvas = await html2canvas(clonedElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: true,
        windowWidth: originalElement.offsetWidth,
        windowHeight: clonedElement.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png", 1.0);
      const title =
        easymde
          .value()
          .split("\n")[0]
          .replace(/^#+\s*/, "") || "markdown-export";

      // คำนวณขนาด PDF (ให้พอดี A4 โดยรักษาสัดส่วน)
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const pdfWidth = 595.28; // A4 width in points
      const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

      // สร้าง PDF
      const pdf = new jsPDF({
        orientation: pdfHeight > pdfWidth ? "portrait" : "landscape",
        unit: "pt",
        format: [pdfWidth, pdfHeight],
      });

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${title}.pdf`);

      showToast("ดาวน์โหลด PDF สำเร็จ", { type: "success" });
    } finally {
      // ลบ temporary container
      document.body.removeChild(container);
    }
  } catch (error) {
    console.error("PDF Error:", error);
    const err = error as Error;
    showToast("ดาวน์โหลด PDF ไม่สำเร็จ: " + err.message, { type: "error" });
  }
}

// ฟังก์ชันดาวน์โหลดเป็น PNG
async function downloadPNG(): Promise<void> {
  try {
    showToast("กำลังสร้างรูปภาพ กรุณารอสักครู่...", {
      type: "info",
      duration: 5000,
    });

    // รอให้ fonts โหลดเสร็จก่อน
    await document.fonts.ready;

    // คัดลอก preview element เพื่อใช้ในการ render โดยไม่กระทบกับหน้าจอจริง
    const originalElement = document.getElementById("preview") as HTMLElement;
    const clonedElement = originalElement.cloneNode(true) as HTMLElement;

    // สร้าง temporary container เพื่อ render
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.top = "0";
    container.style.width = originalElement.offsetWidth + "px";
    container.style.padding = "2rem";
    container.style.background = "#ffffff";
    container.appendChild(clonedElement);
    document.body.appendChild(container);

    try {
      const canvas = await html2canvas(clonedElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: true,
        windowWidth: originalElement.offsetWidth,
        windowHeight: clonedElement.scrollHeight,
      });

      const title =
        easymde
          .value()
          .split("\n")[0]
          .replace(/^#+\s*/, "") || "markdown-export";

      // ดาวน์โหลดเป็น PNG
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${title}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            showToast("ดาวน์โหลด PNG สำเร็จ", { type: "success" });
          }
        },
        "image/png",
        1.0,
      );
    } finally {
      // ลบ temporary container
      document.body.removeChild(container);
    }
  } catch (error) {
    console.error("PNG Error:", error);
    const err = error as Error;
    showToast("ดาวน์โหลด PNG ไม่สำเร็จ: " + err.message, { type: "error" });
  }
}

// ฟังก์ชันจัดการดาวน์โหลดตาม format
function handleDownload(format: DownloadFormat): void {
  switch (format) {
    case "html":
      downloadHTML();
      break;
    case "pdf":
      downloadPDF();
      break;
    case "png":
      downloadPNG();
      break;
    default:
      showToast("รูปแบบที่เลือกไม่ถูกต้อง", { type: "error" });
  }
}

// --- Initialize ---
createIcons({ icons });
initSiteLink();
initTemplateList();

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
  const panelName = (btn as HTMLElement).dataset.panel as PanelName;
  btn.addEventListener("click", () => togglePanel(panelName));
});

// Panel close (x) buttons
document.querySelectorAll("[data-action='close-panel']").forEach((btn) => {
  const panelName = (btn as HTMLElement).dataset.panel as PanelName;
  btn.addEventListener("click", () => togglePanel(panelName));
});

document
  .querySelector("[data-action='reset']")
  ?.addEventListener("click", () => {
    toggleTemplateList((content) => {
      easymde.value(content);
      updatePreview();
    });
  });
document
  .querySelector("[data-action='copy']")
  ?.addEventListener("click", copyMarkdown);

// Download buttons
document.querySelectorAll("[data-action='download']").forEach((btn) => {
  const format = (btn as HTMLElement).dataset.format as DownloadFormat;
  btn.addEventListener("click", () => handleDownload(format));
});
