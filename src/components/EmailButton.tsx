"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  address: string;
  label: string;
  copiedLabel: string;
  className?: string;
  /** "button" is the pill on the home page; "row" is the whole e-mail line of the contact page. */
  variant?: "button" | "row";
  /** Row variant only: classes for the label column and for the big address. */
  labelClassName?: string;
  valueClassName?: string;
};

/**
 * The e-mail control, which behaves per device, chosen by CSS alone (no JS detection, so the markup is the same
 * on server and client and nothing shifts): a mailto: link on touch screens, where a mail app is usually set up,
 * and a copy button elsewhere, where mailto: often does nothing (webmail users). If the clipboard is blocked,
 * the address is selected (or, in the button variant, shown on the button) so it can be copied by hand.
 */
export function EmailButton({ address, label, copiedLabel, className = "", variant = "button", labelClassName = "", valueClassName = "" }: Props) {
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

  const live = <span aria-live="polite" className="sr-only">{state === "copied" ? copiedLabel : ""}</span>;
  /* Both labels share one grid cell, so the control keeps the width of the longer one and nothing shifts. */
  const swap = (className: string) => (
    <span className={`grid ${className}`}>
      <span className={`col-start-1 row-start-1 ${state === "copied" ? "invisible" : ""}`}>{label}</span>
      <span className={`col-start-1 row-start-1 ${state === "copied" ? "" : "invisible"}`} aria-hidden={state !== "copied"}>{copiedLabel}</span>
    </span>
  );

  if (variant === "row") {
    return (
      <>
        <a href={`mailto:${address}`} className={`hidden touch:flex ${className}`}>
          <span className={labelClassName}>{label}</span>
          <span className={valueClassName}>{address}</span>
          <span aria-hidden className="text-2xl">↗</span>
        </a>
        <button type="button" onClick={copy} className={`flex w-full cursor-pointer touch:hidden text-left ${className}`}>
          {swap(labelClassName)}
          <span ref={manual} className={`${valueClassName} ${state === "failed" ? "select-all" : ""}`}>{address}</span>
          <span aria-hidden className="text-2xl">↗</span>
        </button>
        {live}
      </>
    );
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
          swap("justify-items-center")
        )}
      </button>
      {live}
    </>
  );
}
