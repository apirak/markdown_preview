// Download utilities extracted from main.ts
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { showToast } from '../toast.js';

function getTitle(markdownText: string): string {
  return (
    markdownText.split('\n')[0].replace(/^#+\s*/, '') || 'markdown-export'
  );
}

export async function downloadHTML(previewEl: HTMLElement, markdownText: string): Promise<void> {
  try {
    const title = getTitle(markdownText);
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
    .katex-display {
      margin: 1em 0;
      padding: 0.5em 0;
      overflow-x: auto;
      overflow-y: hidden;
    }
    .katex-inline { padding: 0 0.2em; }
    li:has(input[type="checkbox"]) {
      list-style-type: none;
      padding-left: 0;
    }
  </style>
</head>
<body class="bg-slate-50">
  <div class="prose prose-slate prose-blue max-w-none">
    ${previewEl.innerHTML}
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    triggerDownload(URL.createObjectURL(blob), `${title}.html`);
    showToast('ดาวน์โหลด HTML สำเร็จ', { type: 'success' });
  } catch (error) {
    const err = error as Error;
    showToast('ดาวน์โหลด HTML ไม่สำเร็จ: ' + err.message, { type: 'error' });
  }
}

export async function downloadPDF(previewEl: HTMLElement, markdownText: string): Promise<void> {
  try {
    showToast('กำลังสร้าง PDF กรุณารอสักครู่...', { type: 'info', duration: 5000 });
    await document.fonts.ready;

    const cloned = previewEl.cloneNode(true) as HTMLElement;
    const container = buildOffscreenContainer(cloned, previewEl.offsetWidth);

    try {
      const canvas = await html2canvas(cloned, canvasOptions(previewEl.offsetWidth, cloned.scrollHeight));
      const title = getTitle(markdownText);
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdfWidth = 595.28;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const pdf = new jsPDF({
        orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
        unit: 'pt',
        format: [pdfWidth, pdfHeight],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${title}.pdf`);
      showToast('ดาวน์โหลด PDF สำเร็จ', { type: 'success' });
    } finally {
      document.body.removeChild(container);
    }
  } catch (error) {
    console.error('PDF Error:', error);
    const err = error as Error;
    showToast('ดาวน์โหลด PDF ไม่สำเร็จ: ' + err.message, { type: 'error' });
  }
}

export async function downloadPNG(previewEl: HTMLElement, markdownText: string): Promise<void> {
  try {
    showToast('กำลังสร้างรูปภาพ กรุณารอสักครู่...', { type: 'info', duration: 5000 });
    await document.fonts.ready;

    const cloned = previewEl.cloneNode(true) as HTMLElement;
    const container = buildOffscreenContainer(cloned, previewEl.offsetWidth);

    try {
      const canvas = await html2canvas(cloned, canvasOptions(previewEl.offsetWidth, cloned.scrollHeight));
      const title = getTitle(markdownText);

      canvas.toBlob((blob) => {
        if (blob) {
          triggerDownload(URL.createObjectURL(blob), `${title}.png`);
          showToast('ดาวน์โหลด PNG สำเร็จ', { type: 'success' });
        }
      }, 'image/png', 1.0);
    } finally {
      document.body.removeChild(container);
    }
  } catch (error) {
    console.error('PNG Error:', error);
    const err = error as Error;
    showToast('ดาวน์โหลด PNG ไม่สำเร็จ: ' + err.message, { type: 'error' });
  }
}

// --- Helpers ---

function triggerDownload(url: string, filename: string): void {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function buildOffscreenContainer(cloned: HTMLElement, width: number): HTMLDivElement {
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = width + 'px';
  container.style.padding = '2rem';
  container.style.background = '#ffffff';
  container.appendChild(cloned);
  document.body.appendChild(container);
  return container;
}

function canvasOptions(width: number, height: number): Parameters<typeof html2canvas>[1] {
  return {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    allowTaint: true,
    windowWidth: width,
    windowHeight: height,
  };
}
