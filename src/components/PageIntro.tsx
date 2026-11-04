import type { ReactNode } from "react";

/** Big page title with an optional lead paragraph, shared by the inner pages. */
export function PageIntro({ title, lead, aside, children }: { title: string; lead?: string; aside?: ReactNode; children?: ReactNode }) {
  return (
    <>
      <h1 className="text-[clamp(44px,7vw,88px)] leading-[0.95] font-bold tracking-[-0.04em]">{title}</h1>
      {(lead || aside) && (
        <div className={aside ? "mt-5 grid items-start gap-6 md:grid-cols-[minmax(0,620px)_auto] md:justify-between md:gap-12" : "mt-5"}>
          {lead && <p className="max-w-[620px] text-[clamp(17px,1.7vw,20px)] leading-[1.55] text-pretty text-ink-2">{lead}</p>}
          {aside}
        </div>
      )}
      {children}
    </>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,48px)]">
      <section className="pt-[clamp(56px,9vw,104px)] pb-[clamp(64px,9vw,104px)]">{children}</section>
    </div>
  );
}
