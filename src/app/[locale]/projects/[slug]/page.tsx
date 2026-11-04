import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { LightboxButton, LightboxProvider, type LightboxItem } from "@/components/Lightbox";
import { Shot } from "@/components/Shot";
import { shotSrc } from "@/content/images";
import { getContent, isLocale, localize, repoUrl, str } from "@/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getContent().projects.map((p) => ({ slug: p.slug }));
}

type Params = Promise<{ locale: string; slug: string }>;

function findProject(slug: string) {
  const all = getContent().projects;
  const index = all.findIndex((p) => p.slug === slug);
  const project = all[index];
  const next = all[(index + 1) % all.length];
  return project && next ? { project, next } : null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const found = findProject(slug);
  if (!isLocale(locale) || !found) return {};
  return { title: `${found.project.name} · Caio Barilli`, description: localize(found.project.desc, locale) };
}

function Block({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={`mt-[clamp(48px,7vw,80px)] border-t border-line pt-8 ${className}`}>
      <h2 className="mb-5 font-mono text-[13px] font-medium text-accent-text">{title}</h2>
      {children}
    </section>
  );
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const found = findProject(slug);
  if (!isLocale(locale) || !found) notFound();
  const { project: p, next } = found;
  const s = (key: string) => str(locale, key);
  const repo = repoUrl(p);
  const hasShots = p.shots.length > 0;
  let n = 0;
  const num = () => String(++n).padStart(2, "0");

  // Only screenshots that exist on disk go into the lightbox.
  const boxItems: (LightboxItem & { file: string })[] = p.shots.flatMap((shot) => {
    const src = shotSrc(shot.file);
    return src ? [{ file: shot.file, src, alt: localize(shot.alt, locale), caption: localize(shot.caption, locale) }] : [];
  });
  const boxIndex = (file: string) => boxItems.findIndex((item) => item.file === file);
  const heroAlt = p.shots[0] ? localize(p.shots[0].alt, locale) : p.name;

  return (
    <div className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,48px)]">
      <LightboxProvider items={boxItems} labels={{ close: s("close"), prev: s("prev"), next: s("next") }}>
      <article className="pt-[clamp(40px,6vw,64px)] pb-[clamp(64px,9vw,104px)]">
        <Link href={`/${locale}/projects/`} className="flex min-h-11 items-center font-mono text-sm font-medium text-muted hover:text-ink">
          {s("back")}
        </Link>

        <header className="mt-8 mb-12">
          <span className="inline-flex rounded-full border border-accent-line px-2.5 py-1 font-mono text-xs font-medium text-accent-text">
            {localize(p.tag, locale)}
          </span>
          <h1 className="mt-5 text-[clamp(44px,8vw,104px)] leading-[0.95] font-bold tracking-[-0.045em] text-balance">{p.name}</h1>
          <p className="mt-6 max-w-[760px] text-[clamp(18px,2vw,24px)] leading-[1.45] text-pretty text-ink-2">{localize(p.desc, locale)}</p>
          {(repo || p.site) && (
            <div className="mt-8 flex flex-wrap gap-2.5">
              {repo && (
                <a href={repo} className="flex min-h-12 items-center rounded-full bg-btn px-[22px] text-[15px] font-semibold text-btn-ink">
                  {s("viewCode")}
                </a>
              )}
              {p.site && (
                <a href={p.site} className="flex min-h-12 items-center rounded-full border border-line-strong px-[22px] text-[15px] font-medium hover:border-ink">
                  {s("siteLink")}
                </a>
              )}
            </div>
          )}
          <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4 text-[15px]">
            {[
              [s("year"), p.year],
              [s("type"), localize(p.type, locale)],
              [s("status"), localize(p.status, locale)],
            ].map(([term, value]) => (
              <div key={term}>
                <dt className="mb-1.5 font-mono text-xs text-muted">{term}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </header>

        {p.highlights && (
          <dl className="mb-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {p.highlights.map((h) => (
              <div key={h.value + h.label.en} className="flex flex-col gap-1 bg-surface p-5">
                <dt className="order-2 text-sm leading-snug text-muted">{localize(h.label, locale)}</dt>
                <dd className="order-1 text-[clamp(28px,3.4vw,40px)] leading-none font-bold tracking-[-0.03em] text-accent-text">{h.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {hasShots && (
          <div className="mb-[clamp(48px,7vw,80px)]">
            <LightboxButton index={boxIndex(p.shot)} label={`${s("expand")}: ${heroAlt}`}>
              <Shot
                src={shotSrc(p.shot)}
                alt={heroAlt}
                priority
                label={s("placeholder")}
                file={`${s("screenshot")} · ${p.shot}`}
                className="aspect-[16/8] rounded-2xl border border-line p-[18px] text-xs"
              />
            </LightboxButton>
          </div>
        )}

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-x-16 gap-y-10">
          <section>
            <h2 className="mb-3.5 font-mono text-[13px] font-medium text-accent-text">{num()} · {s("problem")}</h2>
            <p className="text-[19px] leading-[1.6] text-pretty text-ink-2">{localize(p.problem, locale)}</p>
          </section>
          <section>
            <h2 className="mb-3.5 font-mono text-[13px] font-medium text-accent-text">{num()} · {s("solution")}</h2>
            <p className="text-[19px] leading-[1.6] text-pretty text-ink-2">{localize(p.solution, locale)}</p>
          </section>
        </div>

        {p.features && (
          <Block title={`${num()} · ${s("features")}`}>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-4">
              {p.features.map((group) => (
                <section key={group.title.en} className="rounded-2xl border border-line bg-surface p-6">
                  <h3 className="mb-3 text-[19px] leading-[1.3] font-semibold tracking-[-0.01em]">{localize(group.title, locale)}</h3>
                  <ul className="flex flex-col gap-2 text-[15px] leading-[1.55] text-ink-2">
                    {group.items.map((item) => (
                      <li key={item.en} className="flex gap-2.5">
                        <span aria-hidden className="mt-[9px] size-1.5 flex-none rounded-full bg-accent-text" />
                        <span>{localize(item, locale)}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </Block>
        )}

        <Block title={`${num()} · ${s("stack")}`}>
          <ul className="flex flex-wrap gap-2">
            {p.stack.map((item) => (
              <li key={item} className="rounded-full border border-line-strong px-3.5 py-2 font-mono text-sm font-medium">
                {item}
              </li>
            ))}
          </ul>
        </Block>

        <section className="mt-[clamp(48px,7vw,80px)] border-t border-line pt-8">
          <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <h2 className="font-mono text-[13px] font-medium text-accent-text">{num()} · {s("decisions")}</h2>
            <span className="text-[15px] text-muted">{s("decisionsSub")}</span>
          </div>
          <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
            {p.adrs.map((d, i) => (
              <li key={i} className="flex flex-col gap-2.5 rounded-2xl border border-line bg-surface p-6">
                <span className="font-mono text-xs font-medium text-muted">{d.id}</span>
                <h3 className="text-[19px] leading-[1.3] font-semibold tracking-[-0.01em]">{localize(d.title, locale)}</h3>
                <p className="text-[15px] leading-[1.55] text-ink-2">{localize(d.body, locale)}</p>
              </li>
            ))}
          </ol>
        </section>

        {hasShots && (
          <Block title={`${num()} · ${s("gallery")}`}>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-5">
              {p.shots.map((shot) => (
                <figure key={shot.file} className="flex flex-col gap-3">
                  <LightboxButton index={boxIndex(shot.file)} label={`${s("expand")}: ${localize(shot.alt, locale)}`}>
                    <Shot src={shotSrc(shot.file)} alt={localize(shot.alt, locale)} label={s("placeholder")} file={shot.file} className="aspect-[16/10] rounded-xl border border-line p-3" />
                  </LightboxButton>
                  <figcaption className="text-sm leading-normal text-ink-2">{localize(shot.caption, locale)}</figcaption>
                </figure>
              ))}
            </div>
          </Block>
        )}

        <Block title={`${num()} · ${s("links")}`}>
          <div className="flex flex-wrap gap-2.5">
            {repo ? (
              <a href={repo} className="flex min-h-12 items-center rounded-full bg-btn px-[22px] text-[15px] font-semibold text-btn-ink">
                {s("viewCode")}
              </a>
            ) : (
              <span className="flex min-h-12 items-center rounded-full border border-dashed border-line-strong px-[22px] text-[15px] text-muted">
                {s("privateCode")}
              </span>
            )}
            {p.links?.map((link) => (
              <a key={link.url} href={link.url} className="flex min-h-12 items-center rounded-full border border-line-strong px-[22px] text-[15px] font-medium hover:border-ink">
                {localize(link.label, locale)}
              </a>
            ))}
            {p.course && (
              <a href={p.course.url} title={p.course.name} className="flex min-h-12 items-center rounded-full border border-line-strong px-[22px] text-[15px] font-medium hover:border-ink">
                {s("courseLink")}
              </a>
            )}
            {p.site ? (
              <a href={p.site} className="flex min-h-12 items-center rounded-full border border-line-strong px-[22px] text-[15px] font-medium hover:border-ink">
                {s("siteLink")}
              </a>
            ) : (
              <span className="flex min-h-12 items-center rounded-full border border-dashed border-line-strong px-[22px] text-[15px] text-muted">
                {s("noDemo")}
              </span>
            )}
          </div>
        </Block>

        <Link
          href={`/${locale}/projects/${next.slug}/`}
          className="mt-[clamp(56px,8vw,96px)] flex w-full flex-wrap items-baseline justify-between gap-4 border-t border-line pt-6 hover:text-accent-text"
        >
          <span className="font-mono text-[13px] font-medium text-muted">{s("nextProject")}</span>
          <span className="text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.03em]">{next.name} →</span>
        </Link>
      </article>
      </LightboxProvider>
    </div>
  );
}
