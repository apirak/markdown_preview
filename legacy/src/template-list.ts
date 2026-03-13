// Template List Component (inline in editor panel)
import { templates } from "./templates/index.js";
import { createIcons, icons } from "lucide";

const templateList = document.getElementById("template-list") as HTMLElement;
const templateListItems = document.getElementById(
  "template-list-items",
) as HTMLElement;

let isOpen = false;
let onSelectCallback: ((content: string) => void) | null = null;

function renderItems(): void {
  templateListItems.innerHTML = "";
  for (const t of templates) {
    const item = document.createElement("button");
    item.className = "template-list-item";
    item.innerHTML = `<span class="template-list-item-icon">${t.icon}</span><div class="template-list-item-body"><span class="template-list-item-name">${t.name}</span><span class="template-list-item-desc">${t.description}</span></div>`;
    item.addEventListener("click", () => {
      onSelectCallback?.(t.content);
      close();
    });
    templateListItems.appendChild(item);
  }
  createIcons({ icons });
}

export function open(onSelect: (content: string) => void): void {
  onSelectCallback = onSelect;
  isOpen = true;
  renderItems();
  templateList.classList.remove("hidden");
}

export function close(): void {
  isOpen = false;
  onSelectCallback = null;
  templateList.classList.add("hidden");
}

export function toggle(onSelect: (content: string) => void): void {
  if (isOpen) close();
  else open(onSelect);
}

export function initTemplateList(): void {
  document
    .querySelector("[data-action='close-templates']")
    ?.addEventListener("click", close);
}
