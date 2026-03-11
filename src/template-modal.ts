// Template Modal Component
import { templates, getTemplate } from "./templates/index.js";
import type { Template } from './types.js';
import { createIcons, icons } from "lucide";

let isOpen = false;
let onSelectCallback: ((content: string) => void) | null = null;

// DOM Elements
let modalElement: HTMLElement | null = null;

function createModalElement(): HTMLElement {
  if (modalElement) return modalElement;

  const modal = document.createElement("div");
  modal.id = "template-modal";
  modal.className = "template-modal hidden"; // Start hidden
  modal.innerHTML = `
    <div class="template-modal-backdrop" data-action="close-modal"></div>
    <div class="template-modal-content">
      <div class="template-modal-header">
        <h2 class="template-modal-title">
          <i data-lucide="file-text" class="w-5 h-5"></i>
          เลือกเทมเพลต
        </h2>
        <button class="template-modal-close" data-action="close-modal" aria-label="ปิด">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>
      <div class="template-modal-body">
        <p class="template-modal-subtitle">เลือกเทมเพลตที่ต้องการเริ่มต้น</p>
        <div class="template-grid" id="template-grid">
          <!-- Templates will be rendered here -->
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  modalElement = modal;

  // Add event listeners
  const backdrop = modal.querySelector("[data-action='close-modal']") as HTMLElement;
  backdrop.addEventListener("click", closeModal);
  const closeButton = backdrop.nextElementSibling?.querySelector("[data-action='close-modal']") as HTMLElement | null;
  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }
  modal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  return modalElement;
}

async function renderTemplates(): Promise<void> {
  const grid = document.getElementById("template-grid");
  if (!grid) return;

  grid.innerHTML = "";

  for (const templateMeta of templates) {
    const template = await getTemplate(templateMeta.id);
    if (!template) continue;

    const card = document.createElement("div");
    card.className = "template-card";
    card.dataset.templateId = templateMeta.id;
    card.innerHTML = `
      <div class="template-card-icon">${templateMeta.icon}</div>
      <div class="template-card-content">
        <h3 class="template-card-name">${template.name}</h3>
        <p class="template-card-description">${template.description}</p>
      </div>
      <div class="template-card-action">
        <i data-lucide="chevron-right" class="w-4 h-4"></i>
      </div>
    `;

    card.addEventListener("click", () => selectTemplate(templateMeta.id));
    grid.appendChild(card);
  }

  // Re-initialize Lucide icons
  createIcons({ icons });
}

function selectTemplate(templateId: string): void {
  if (onSelectCallback) {
    getTemplate(templateId).then((template) => {
      if (template) {
        onSelectCallback!(template.content);
      }
      closeModal();
    }).catch((error) => {
      console.error("Error loading template:", error);
      closeModal();
    });
  } else {
    closeModal();
  }
}

export function openModal(onSelect: (content: string) => void): void {
  onSelectCallback = onSelect;
  isOpen = true;

  const modal = createModalElement();
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  renderTemplates();

  // Focus trap
  const focusableElements = modal.querySelectorAll(
    "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
  ) as NodeListOf<HTMLElement>;
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }
}

function closeModal(): void {
  if (!isOpen) return;
  isOpen = false;

  if (modalElement) {
    modalElement.classList.add("hidden");
  }
  document.body.style.overflow = "";

  onSelectCallback = null;
}

export function toggleModal(onSelect: (content: string) => void): void {
  if (isOpen) {
    closeModal();
  } else {
    openModal(onSelect);
  }
}

// Initialize modal on page load (hidden)
export function initTemplateModal(): void {
  createModalElement();
}
