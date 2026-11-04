"use client";

import { useEffect, useRef, useState } from "react";

type Props = { address: string; label: string; copiedLabel: string; className?: string };

/**
 * One "E-mail" button that behaves per device, chosen by CSS alone (no JS detection, so the markup is the same
 * on server and client and nothing shifts): a mailto: link on touch screens, where a mail app is usually set up,
 * and a copy button elsewhere, where mailto: often does nothing (webmail users). If the clipboard is blocked,
 * the button shows the address itself so it can be copied by hand.
 */
export function EmailButton({ address, label, copiedLabel, className = "" }: Props) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const manual = useRef<HTMLSpanElement>(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (state !== "failed" || !manual.current) return;
    const range = document.createRange();
    range.selectNodeContents(manual.current);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }, [state]);

  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(address);
      setState("copied");
      timer.current = setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("failed");
    }
  }

  return (
    <>
      <a href={`mailto:${address}`} className={`hidden touch:flex ${className}`}>
        {label}
      </a>
      <button type="button" onClick={copy} className={`flex touch:hidden ${className}`}>
        {state === "failed" ? (
          <span ref={manual} className="font-mono select-all [overflow-wrap:anywhere]">{address}</span>
        ) : (
          /* Both labels share one grid cell, so the button keeps the width of the longer one and nothing shifts. */
          <span className="grid justify-items-center">
            <span className={`col-start-1 row-start-1 ${state === "copied" ? "invisible" : ""}`}>{label}</span>
            <span className={`col-start-1 row-start-1 ${state === "copied" ? "" : "invisible"}`} aria-hidden={state !== "copied"}>{copiedLabel}</span>
          </span>
        )}
      </button>
      <span aria-live="polite" className="sr-only">{state === "copied" ? copiedLabel : ""}</span>
    </>
  );
}
