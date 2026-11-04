import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { EmailButton } from "@/components/EmailButton";
import { Breakable } from "@/components/Breakable";
import { PageIntro, PageShell } from "@/components/PageIntro";
import { getContent, isLocale, str } from "@/content";
import { sectionMetadata } from "../../page-meta";

export const generateMetadata = sectionMetadata("contactTitle", "contactSub", "contact/");

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <>
      <span className={labelClass}>{label}</span>
      {children}
    </>
  );
}

/* Under sm the label sits on top and the address gets the full width, with the arrow at its right. */
const labelClass = "col-span-2 min-w-[120px] font-mono text-[13px] font-medium text-muted sm:col-auto";
const rowClass = "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 py-5 sm:flex sm:flex-wrap sm:justify-between sm:gap-x-6 sm:gap-y-3 sm:py-6";
const valueClass = "min-w-0 text-[clamp(17px,5.1vw,22px)] font-semibold tracking-[-0.02em] sm:flex-1 sm:text-[clamp(22px,3.2vw,36px)]";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const s = (key: string) => str(locale, key);
  const pendingTag = (
    <span className="rounded-full border border-dashed border-line-strong px-2.5 py-[5px] font-mono text-xs text-faint">
      {s("placeholder")}
    </span>
  );

  const cv = (
    <a
      href={`/cv/caio-barilli-cv-${locale}.pdf`}
      target="_blank"
      rel="noopener"
      className="flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-btn px-7 py-3 text-[17px] font-semibold text-btn-ink md:w-auto"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none">
        <path d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5M4 17v3h16v-3" />
      </svg>
      <span>{s("cvLink")}</span>
      <span className="rounded-md border border-btn-ink/50 px-1.5 py-0.5 font-mono text-xs leading-none font-medium">{s("cvLinkTag")}</span>
    </a>
  );

  return (
    <PageShell>
      <PageIntro title={s("contactTitle")} lead={s("contactSub")} aside={cv} />
      <ul className="mt-12 border-t border-line-strong">
        {getContent().contacts.map((c) => (
          <li key={c.label} className="border-b border-line">
            {c.pending ? (
              <div className={rowClass}>
                <Row label={c.label}>
                  <span className={`${valueClass} text-muted`}><Breakable text={c.handle} /></span>
                  {pendingTag}
                </Row>
              </div>
            ) : c.url.startsWith("mailto:") ? (
              <EmailButton
                variant="row"
                address={c.handle}
                label={c.label}
                copiedLabel={s("emailCopied")}
                className={`${rowClass} hover:text-accent-text`}
                labelClassName={labelClass}
                valueClassName={valueClass}
              />
            ) : (
              <a href={c.url} className={`${rowClass} hover:text-accent-text`}>
                <Row label={c.label}>
                  <span className={valueClass}><Breakable text={c.handle} /></span>
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
