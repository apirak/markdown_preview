import { writable } from "svelte/store";
import type { PanelState, PanelName } from "../types";

const isMobileViewport =
  typeof window !== "undefined"
    ? window.matchMedia("(max-width: 767px)").matches
    : false;

const initial: PanelState = {
  help: false,
  editor: true,
  preview: !isMobileViewport,
};

export const panels = writable<PanelState>(initial);

export function togglePanel(name: PanelName, state: PanelState): PanelState {
  // Can't close last panel
  const openCount = Object.values(state).filter(Boolean).length;
  if (state[name] && openCount <= 1) return state;

  return {
    ...state,
    [name]: !state[name],
  };
}
