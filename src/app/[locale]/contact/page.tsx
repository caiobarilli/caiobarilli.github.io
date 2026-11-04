import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { PageIntro, PageShell } from "@/components/PageIntro";
import { getContent, isLocale, str } from "@/content";
import { sectionMetadata } from "../../page-meta";

export const generateMetadata = sectionMetadata("contactTitle", "contactSub");

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <>
      <span className="min-w-[120px] font-mono text-[13px] font-medium text-muted">{label}</span>
      {children}
    </>
  );
}

const rowClass = "flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-6";
const valueClass = "flex-1 text-[clamp(22px,3.2vw,36px)] font-semibold tracking-[-0.02em] [overflow-wrap:anywhere]";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const s = (key: string) => str(locale, key);
  const pendingTag = (
    <span className="rounded-full border border-dashed border-line-strong px-2.5 py-[5px] font-mono text-xs text-faint">
      {s("placeholder")}
    </span>
  );

  return (
    <PageShell>
      <PageIntro title={s("contactTitle")} lead={s("contactSub")} />
      <ul className="mt-12 border-t border-line-strong">
        {getContent().contacts.map((c) => (
          <li key={c.label} className="border-b border-line">
            {c.pending ? (
              <div className={rowClass}>
                <Row label={c.label}>
                  <span className={`${valueClass} text-muted`}>{c.handle}</span>
                  {pendingTag}
                </Row>
              </div>
            ) : (
              <a href={c.url} className={`${rowClass} hover:text-accent-text`}>
                <Row label={c.label}>
                  <span className={valueClass}>{c.handle}</span>
                  <span aria-hidden className="text-2xl">↗</span>
                </Row>
              </a>
            )}
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
