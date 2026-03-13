import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

/**
 * Export content as HTML file
 */
export async function exportAsHTML(html: string, title: string = 'document'): Promise<void> {
	const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            line-height: 1.6;
            color: #1e293b;
        }
        pre {
            background: #f1f5f9;
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
        }
        code {
            background: #f1f5f9;
            padding: 0.125rem 0.375rem;
            border-radius: 0.25rem;
            font-size: 0.875em;
        }
        pre code {
            background: transparent;
            padding: 0;
        }
        blockquote {
            border-left: 4px solid #cbd5e1;
            padding-left: 1rem;
            color: #64748b;
            font-style: italic;
        }
        table {
            border-collapse: collapse;
            width: 100%;
        }
        th, td {
            border: 1px solid #e2e8f0;
            padding: 0.5rem;
        }
        th {
            background: #f8fafc;
        }
        img {
            max-width: 100%;
            height: auto;
        }
        .mermaid {
            text-align: center;
            margin: 1rem 0;
        }
    </style>
</head>
<body>
${html}
</body>
</html>`;

	const blob = new Blob([fullHtml], { type: 'text/html' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = `${title}.html`;
	a.click();
	URL.revokeObjectURL(url);
}

/**
 * Copy HTML to clipboard
 */
export async function copyHTML(html: string): Promise<void> {
	try {
		await navigator.clipboard.writeText(html);
	} catch (error) {
		console.error('Failed to copy HTML:', error);
		throw error;
	}
}

/**
 * Export element as PDF
 */
export async function exportAsPDF(elementId: string, filename: string = 'document.pdf'): Promise<void> {
	const originalElement = document.getElementById(elementId);
	if (!originalElement) {
		throw new Error(`Element with id "${elementId}" not found`);
	}

	// Wait for fonts to load
	await document.fonts.ready;

	// Clone the element to avoid affecting the actual page
	const clonedElement = originalElement.cloneNode(true) as HTMLElement;

	// Create temporary container for rendering
	const container = document.createElement('div');
	container.style.position = 'absolute';
	container.style.left = '-9999px';
	container.style.top = '0';
	container.style.width = originalElement.offsetWidth + 'px';
	container.style.padding = '2rem';
	container.style.background = '#ffffff';
	container.appendChild(clonedElement);
	document.body.appendChild(container);

	try {
		const canvas = await html2canvas(clonedElement, {
			scale: 2,
			useCORS: true,
			logging: false,
			backgroundColor: '#ffffff',
			allowTaint: true,
			windowWidth: originalElement.offsetWidth,
			windowHeight: clonedElement.scrollHeight,
		});

		const imgData = canvas.toDataURL('image/png', 1.0);
		const title = filename.replace('.pdf', '') || 'document';

		// Calculate PDF dimensions (A4 format)
		const imgWidth = canvas.width;
		const imgHeight = canvas.height;
		const pdfWidth = 595.28; // A4 width in points
		const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

		// Create PDF
		const pdf = new jsPDF({
			orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
			unit: 'pt',
			format: [pdfWidth, pdfHeight],
		});

		pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
		pdf.save(filename);
	} finally {
		// Remove temporary container
		document.body.removeChild(container);
	}
}

/**
 * Export element as PNG
 */
export async function exportAsPNG(elementId: string, filename: string = 'document.png'): Promise<void> {
	const originalElement = document.getElementById(elementId);
	if (!originalElement) {
		throw new Error(`Element with id "${elementId}" not found`);
	}

	// Wait for fonts to load
	await document.fonts.ready;

	// Clone the element to avoid affecting the actual page
	const clonedElement = originalElement.cloneNode(true) as HTMLElement;

	// Create temporary container for rendering
	const container = document.createElement('div');
	container.style.position = 'absolute';
	container.style.left = '-9999px';
	container.style.top = '0';
	container.style.width = originalElement.offsetWidth + 'px';
	container.style.padding = '2rem';
	container.style.background = '#ffffff';
	container.appendChild(clonedElement);
	document.body.appendChild(container);

	try {
		const canvas = await html2canvas(clonedElement, {
			scale: 2,
			useCORS: true,
			logging: false,
			backgroundColor: '#ffffff',
			allowTaint: true,
			windowWidth: originalElement.offsetWidth,
			windowHeight: clonedElement.scrollHeight,
		});

		const title = filename.replace('.png', '') || 'document';

		canvas.toBlob(
			(blob) => {
				if (blob) {
					const url = URL.createObjectURL(blob);
					const a = document.createElement('a');
					a.href = url;
					a.download = filename;
					document.body.appendChild(a);
					a.click();
					document.body.removeChild(a);
					URL.revokeObjectURL(url);
				}
			},
			'image/png',
			1.0
		);
	} finally {
		// Remove temporary container
		document.body.removeChild(container);
	}
}
