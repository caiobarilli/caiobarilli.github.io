"use client";

import { useLayoutEffect } from "react";
import { THEME_KEY } from "./ThemeScript";

/**
 * The <html> element lives in the per-locale layout, so switching language replaces it
 * and the inline ThemeScript (which only runs on a full page load) does not run again.
 * This puts the saved choice, else the system preference, back on the new element.
 */
export function ThemeSync() {
  useLayoutEffect(() => {
    let theme: string | null = null;
    try {
      theme = localStorage.getItem(THEME_KEY);
    } catch {
      // Storage can be blocked; fall back to the system preference.
    }
    if (theme !== "light" && theme !== "dark") {
      theme = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    const root = document.documentElement;
    if (root.dataset.theme !== theme) root.dataset.theme = theme;
  });
  return null;
}
