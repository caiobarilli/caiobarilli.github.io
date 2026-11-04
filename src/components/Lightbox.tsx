"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

export type LightboxItem = { src: string; alt: string; caption: string };

type Labels = { close: string; prev: string; next: string };

const OpenContext = createContext<((index: number) => void) | null>(null);

/**
 * Full-screen viewer for a project's screenshots, built on the native <dialog>
 * (focus trap and Esc come from the browser). Arrow keys move between images.
 */
export function LightboxProvider({ items, labels, children }: { items: LightboxItem[]; labels: Labels; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState(0);

  const open = useCallback((i: number) => {
    trigger.current = document.activeElement as HTMLElement | null;
    setIndex(i);
    dialog.current?.showModal();
  }, []);

  const step = useCallback((delta: number) => setIndex((i) => (i + delta + items.length) % items.length), [items.length]);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => trigger.current?.focus();
    el.addEventListener("keydown", onKey);
    el.addEventListener("close", onClose);
    return () => {
      el.removeEventListener("keydown", onKey);
      el.removeEventListener("close", onClose);
    };
  }, [step]);

  const item = items[index];
  const many = items.length > 1;

  return (
    <OpenContext.Provider value={items.length ? open : null}>
      {children}
      <dialog
        ref={dialog}
        aria-label={item?.caption}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="m-auto max-h-none max-w-none bg-transparent p-[clamp(16px,4vw,48px)] text-[#e8ebe6] backdrop:bg-[rgba(5,6,6,0.92)]"
      >
        {item && (
          <figure className="flex w-[min(1100px,92vw)] flex-col gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element -- full-size static asset, already optimized */}
            <img src={item.src} alt={item.alt} className="max-h-[78vh] w-full rounded-xl border border-[#2c312d] object-contain" />
            <figcaption className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-[17px] font-medium">{item.caption}</span>
              <div className="flex items-center gap-2 font-mono text-[13px] font-medium">
                {many && (
                  <>
                    <span className="mr-1.5 text-[#9aa198]">
                      {index + 1} / {items.length}
                    </span>
                    <button type="button" onClick={() => step(-1)} aria-label={labels.prev} className="size-11 rounded-full border border-[#2c312d]">
                      ←
                    </button>
                    <button type="button" onClick={() => step(1)} aria-label={labels.next} className="size-11 rounded-full border border-[#2c312d]">
                      →
                    </button>
                  </>
                )}
                <button type="button" autoFocus onClick={() => dialog.current?.close()} className="h-11 rounded-full bg-[#e8ebe6] px-4 text-[#0d0f0e]">
                  {labels.close} · Esc
                </button>
              </div>
            </figcaption>
          </figure>
        )}
      </dialog>
    </OpenContext.Provider>
  );
}

/** Makes a screenshot clickable; renders the child as-is when there is nothing to open. */
export function LightboxButton({ index, label, children }: { index: number; label: string; children: ReactNode }) {
  const open = useContext(OpenContext);
  if (!open || index < 0) return <>{children}</>;
  return (
    <button type="button" onClick={() => open(index)} aria-label={label} className="block w-full cursor-zoom-in text-left">
      {children}
    </button>
  );
}
