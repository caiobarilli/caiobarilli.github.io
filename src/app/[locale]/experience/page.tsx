import { notFound } from "next/navigation";
import { PageIntro, PageShell } from "@/components/PageIntro";
import { getContent, isLocale, localize, str } from "@/content";

export default async function ExperiencePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const s = (key: string) => str(locale, key);
  const { experience, education } = getContent();

  return (
    <PageShell>
      <PageIntro title={s("expTitle")} lead={s("expSub")} />

      <ol className="mt-14 border-l border-line-strong">
        {experience.map((e) => (
          <li
            key={localize(e.period, locale)}
            className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-10 gap-y-3 pb-12 pl-[clamp(24px,4vw,40px)]"
          >
            <span aria-hidden className="absolute top-1.5 -left-1.5 size-[11px] rounded-full border-2 border-accent-text bg-bg" />
            <div className="pt-0.5 font-mono text-sm font-medium text-accent-text">{localize(e.period, locale)}</div>
            <div className="col-span-2 flex min-w-0 flex-col gap-2.5 max-[560px]:col-span-1">
              <h2 className="text-[clamp(22px,2.6vw,28px)] leading-[1.2] font-semibold tracking-[-0.02em]">{localize(e.role, locale)}</h2>
              <span className="font-mono text-[13px] text-muted">
                <a href={e.company.url} className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-accent-text">
                  {e.company.name} ↗
                </a>
                {" · "}
                {localize(e.kind, locale)}
              </span>
              <p className="mt-1 max-w-[640px] text-base leading-[1.6] text-pretty text-ink-2">{localize(e.summary, locale)}</p>
              <ul className="mt-1.5 flex flex-wrap gap-1.5">
                {e.keys.map((k) => (
                  <li key={k} className="rounded-full border border-line-strong px-[11px] py-[5px] font-mono text-xs font-medium">
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-[clamp(24px,4vw,40px)] border-t border-line pt-8">
        <h2 className="mb-5 text-[28px] font-semibold tracking-[-0.02em]">{s("eduTitle")}</h2>
        <ul>
          {education.map((ed) => (
            <li
              key={ed.school}
              className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-10 gap-y-1.5 border-b border-line py-[18px]"
            >
              <span className="font-mono text-sm font-medium text-accent-text">{ed.period}</span>
              <div className="col-span-2 flex min-w-0 flex-wrap justify-between gap-x-6 gap-y-1 max-[560px]:col-span-1">
                <span className="text-lg font-semibold">{localize(ed.title, locale)}</span>
                <span className="font-mono text-sm text-muted">{ed.school}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
