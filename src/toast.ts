import { createIcons, icons } from "lucide";
import type { ToastOptions } from './types.js';

// Toast container element
let toastContainer: HTMLElement | null = null;

// Track active toasts by category for replacement
// Categories: 'mermaid-error', or message-based for others
const activeToasts = new Map<string, HTMLElement>();

// Ensure container exists
function ensureContainer(): HTMLElement {
  if (!toastContainer) {
    toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.id = "toast-container";
      toastContainer.className = "toast-container";
      document.body.appendChild(toastContainer);
    }
  }
  return toastContainer;
}

// Get icon name based on toast type
function getIconForType(type: string): string {
  const iconMap: Record<string, string> = {
    error: "alert-circle",
    warning: "alert-triangle",
    success: "check-circle",
    info: "info",
  };
  return iconMap[type] || "info";
}

// Create a toast element
function createToast(message: string, options: ToastOptions = {}): HTMLElement {
  const {
    type = "info",
    dismissible = true,
  } = options;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.dataset.message = message;

  // Icon
  const iconName = getIconForType(type);
  const iconHtml = `<i data-lucide="${iconName}" class="toast-icon"></i>`;

  // Message
  const messageHtml = `<span class="toast-message">${message}</span>`;

  // Close button (if dismissible)
  let closeHtml = "";
  if (dismissible) {
    closeHtml = `<button class="toast-close" aria-label="Close"><i data-lucide="x" class="w-3 h-3"></i></button>`;
  }

  toast.innerHTML = `${iconHtml}${messageHtml}${closeHtml}`;

  // Initialize icons for this toast
  createIcons({ icons, root: toast });

  // Add dismiss handler
  if (dismissible) {
    const closeBtn = toast.querySelector(".toast-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        removeToast(toast);
      });
    }
  }

  return toast;
}

// Add toast to container with animation
function addToast(toast: HTMLElement): void {
  const container = ensureContainer();
  container.appendChild(toast);

  // Trigger reflow for animation
  toast.offsetHeight;

  // Add show class for slide-in animation
  requestAnimationFrame(() => {
    toast.classList.add("toast-show");
  });
}

// Remove toast with animation
function removeToast(toast: HTMLElement): void {
  const category = toast.dataset.category;
  if (category) {
    activeToasts.delete(category);
  }

  toast.classList.remove("toast-show");
  toast.classList.add("toast-hide");

  toast.addEventListener("transitionend", () => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  });
}

// Main API: Show a toast notification
export function showToast(message: string, options: ToastOptions = {}): HTMLElement {
  const {
    type = "info",
    duration = 5000,
    dismissible = true,
  } = options;

  // Determine category for tracking
  // Mermaid errors use single category so new ones replace old ones
  const isMermaidError = message.startsWith("Mermaid Error:");
  const category = isMermaidError ? "mermaid-error" : message;

  // Check if there's an existing toast in the same category
  const existingToast = activeToasts.get(category);
  if (existingToast) {
    // Remove existing toast immediately (no animation)
    if (existingToast.parentNode) {
      existingToast.parentNode.removeChild(existingToast);
    }
    activeToasts.delete(category);
  }

  const toast = createToast(message, { type, dismissible });
  toast.dataset.category = category;
  addToast(toast);

  // Track this toast by category
  activeToasts.set(category, toast);

  // Auto-dismiss after duration (if duration is not null)
  if (duration !== null) {
    setTimeout(() => {
      removeToast(toast);
    }, duration);
  }

  return toast;
}
