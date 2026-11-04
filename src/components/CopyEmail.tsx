"use client";

import { useEffect, useRef, useState } from "react";

type Props = { address: string; label: string; copiedLabel: string; className?: string };

/**
 * Copies the e-mail address. The mailto: link next to it needs a mail program configured on the system,
 * so this works where the link does nothing. If the clipboard is blocked, the address is shown as selectable text.
 */
export function CopyEmail({ address, label, copiedLabel, className = "" }: Props) {
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
      <button type="button" onClick={copy} className={className}>
        {/* Both labels share one grid cell, so the button keeps the width of the longer one and nothing shifts. */}
        <span className="grid justify-items-center">
          <span className={`col-start-1 row-start-1 ${state === "copied" ? "invisible" : ""}`}>{label}</span>
          <span className={`col-start-1 row-start-1 ${state === "copied" ? "" : "invisible"}`}>{copiedLabel}</span>
        </span>
      </button>
      <span aria-live="polite" className="sr-only">{state === "copied" ? copiedLabel : ""}</span>
      {state === "failed" && (
        <span ref={manual} className="flex min-h-11 items-center font-mono text-sm select-all [overflow-wrap:anywhere]">
          {address}
        </span>
      )}
    </>
  );
}
