import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageIntro";
import { isLocale, steps, str } from "@/content";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const s = (key: string) => str(locale, key);

  return (
    <PageShell>
      <div className="flex flex-wrap items-center gap-x-14 gap-y-8">
        <div
          role="img"
          aria-label={s("photoAlt")}
          className="placeholder-stripes flex aspect-square w-[clamp(160px,22vw,240px)] flex-none items-center justify-center rounded-full border border-dashed border-line-strong bg-surface font-mono text-xs text-faint"
        >
          {s("placeholder")} · {s("photo")}
        </div>
        <div className="min-w-[min(100%,360px)] flex-1">
          <h1 className="mb-7 text-[clamp(44px,7vw,88px)] leading-[0.95] font-bold tracking-[-0.04em]">{s("aboutTitle")}</h1>
          <p className="max-w-[720px] text-[clamp(18px,1.9vw,22px)] leading-[1.55] text-pretty">{s("aboutP1")}</p>
        </div>
      </div>

      <section className="mt-[clamp(64px,9vw,104px)]">
        <h2 className="mb-2.5 text-[28px] font-semibold tracking-[-0.02em]">{s("howTitle")}</h2>
        <p className="mb-8 max-w-[560px] text-base leading-[1.55] text-muted">{s("howSub")}</p>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4">
          {steps(locale).map((step) => (
            <li key={step.n} className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-6">
              <span className="font-mono text-[13px] font-medium text-accent-text">{step.n}</span>
              <h3 className="text-[22px] font-semibold tracking-[-0.02em]">{step.title}</h3>
              <p className="text-[15px] leading-[1.55] text-ink-2">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-[clamp(48px,7vw,80px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-16 gap-y-4 border-t border-line pt-8">
        <h2 className="text-[28px] font-semibold tracking-[-0.02em]">{s("wsTitle")}</h2>
        <div>
          <p className="mb-4 max-w-[620px] text-[17px] leading-[1.6] text-pretty text-ink-2">{s("wsBody")}</p>
          <p className="font-mono text-[13px] text-muted">Windows 11 · WSL2 · Hyper-V · PowerShell · Docker</p>
        </div>
      </section>

      <Link
        href={`/${locale}/contact/`}
        className="mt-14 inline-flex min-h-12 items-center rounded-full bg-btn px-[22px] text-[15px] font-semibold text-btn-ink"
      >
        {s("aboutCta")}
      </Link>
    </PageShell>
  );
}
