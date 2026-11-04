import Image from "next/image";
import Link from "next/link";
import { Shot } from "@/components/Shot";
import { shotSrc } from "@/content/images";
import { getContent, isLocale, localize, mainProjects, otherProjects, str } from "@/content";
import type { Locale, Project } from "@/content/types";
import { notFound } from "next/navigation";

const GITHUB = "https://github.com/caiobarilli";
const LINKEDIN = "https://www.linkedin.com/in/caio-barilli";

const stackLine = (p: Project) => p.stack.join(" · ");
const projectHref = (locale: Locale, p: Project) => `/${locale}/projects/${p.slug}/`;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const s = (key: string) => str(locale, key);
  const { stack, articles, contacts } = getContent();
  const email = contacts.find((c) => c.url.startsWith("mailto:"));
  const medium = contacts.find((c) => c.label === "Medium" && !c.pending);
  const [hero, ...rest] = mainProjects();
  const others = otherProjects();
  if (!hero) notFound();

  return (
    <>
      <div className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,48px)]">
        <section className="pt-[clamp(64px,11vw,120px)] pb-[clamp(56px,8vw,96px)]">
          <div className="mb-7 flex items-center gap-3.5 font-mono text-[clamp(13px,1.4vw,15px)] text-muted">
            <Image
              src="/images/caio-96.webp"
              alt={s("photoAlt")}
              width={44}
              height={44}
              loading="eager"
              className="size-11 flex-none rounded-full border border-line-strong object-cover"
            />
            <span>
              <span className="text-accent-text">caio@wsl</span>:~$ whoami
            </span>
          </div>
          <h1 className="text-[clamp(56px,10.5vw,128px)] leading-[0.92] font-bold tracking-[-0.045em]">Caio Barilli</h1>
          <p className="mt-5 text-[clamp(22px,3.4vw,40px)] leading-[1.15] font-medium tracking-[-0.02em] text-balance text-muted">
            {s("role")}
          </p>
          <div className="mt-[clamp(32px,5vw,56px)] flex flex-wrap items-end justify-between gap-8">
            <p className="max-w-[600px] text-[clamp(17px,1.7vw,20px)] leading-[1.55] text-pretty text-ink-2">{s("heroLine")}</p>
            <div className="flex flex-wrap gap-2.5">
              <Link href={`/${locale}/projects/`} className="flex min-h-12 items-center rounded-full bg-btn px-[22px] text-[15px] font-semibold text-btn-ink">
                {s("seeWork")}
              </Link>
              <a href={GITHUB} className="flex min-h-12 items-center rounded-full border border-line-strong px-[22px] text-[15px] font-medium hover:border-ink">
                GitHub ↗
              </a>
            </div>
          </div>
        </section>

        <section aria-labelledby="h-featured" className="pb-[clamp(64px,9vw,104px)]">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="h-featured" className="text-[28px] font-semibold tracking-[-0.02em]">{s("featured")}</h2>
            <Link href={`/${locale}/projects/`} className="flex min-h-11 items-center font-mono text-sm font-medium text-muted hover:text-ink">
              {s("allProjects")}
            </Link>
          </div>

          <article className="mb-5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] overflow-hidden rounded-2xl border border-line bg-surface">
            <Link href={projectHref(locale, hero)} tabIndex={-1} aria-hidden="true" className="block h-full"><Shot src={shotSrc(hero.shot)} alt="" label={s("placeholder")} file={`${s("screenshot")} · ${hero.shot}`} priority className="min-h-[clamp(220px,32vw,420px)] p-4 text-xs !h-full !object-left-top" /></Link>
            <div className="flex flex-col justify-center gap-4 p-[clamp(24px,4vw,40px)]">
              <span className="self-start rounded-full border border-accent-line px-2.5 py-1 font-mono text-xs font-medium text-accent-text">
                {localize(hero.tag, locale)}
              </span>
              <h3 className="text-[clamp(34px,4vw,48px)] font-bold tracking-[-0.03em]"><Link href={projectHref(locale, hero)} className="hover:text-accent-text">{hero.name}</Link></h3>
              <p className="text-lg leading-[1.55] text-pretty text-ink-2">{localize(hero.desc, locale)}</p>
              <div className="font-mono text-[13px] leading-[1.6] text-muted">{stackLine(hero)}</div>
              <Link href={projectHref(locale, hero)} className="mt-1.5 flex min-h-11 items-center self-start text-[15px] font-semibold hover:text-accent-text">
                {s("caseStudy")}
              </Link>
            </div>
          </article>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
            {rest.map((p) => (
              <article key={p.slug} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface">
                <Link href={projectHref(locale, p)} tabIndex={-1} aria-hidden="true" className="block"><Shot src={shotSrc(p.shot)} alt="" label={s("placeholder")} file={`${s("screenshot")} · ${p.shot}`} className="aspect-[16/10]" /></Link>
                <div className="flex flex-1 flex-col gap-2.5 p-6">
                  <span className="font-mono text-xs font-medium text-accent-text">{localize(p.tag, locale)}</span>
                  <h3 className="text-2xl leading-[1.15] font-semibold tracking-[-0.02em]"><Link href={projectHref(locale, p)} className="hover:text-accent-text">{p.name}</Link></h3>
                  <p className="flex-1 text-[15px] leading-[1.55] text-pretty text-ink-2">{localize(p.desc, locale)}</p>
                  <div className="font-mono text-xs leading-[1.6] text-muted">{stackLine(p)}</div>
                  <Link href={projectHref(locale, p)} className="flex min-h-11 items-center self-start text-sm font-semibold hover:text-accent-text">
                    {s("caseStudy")}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <h3 className="text-xl font-semibold tracking-[-0.01em]">{s("alsoTs")}</h3>
            <span className="text-[15px] text-muted">{s("alsoTsSub")}</span>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-3">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={projectHref(locale, p)}
                className="flex flex-col gap-2 rounded-xl border border-line px-5 py-[18px] hover:border-line-strong hover:bg-surface"
              >
                <span className="flex w-full justify-between text-[17px] font-semibold">
                  {p.name}
                  <span aria-hidden className="text-muted">→</span>
                </span>
                <span className="text-sm leading-normal text-ink-2">{localize(p.desc, locale)}</span>
                <span className="font-mono text-xs text-muted">{stackLine(p)}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section aria-labelledby="h-stack" className="border-y border-line">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-10 gap-y-4 px-[clamp(20px,4vw,48px)] py-8">
          <h2 id="h-stack" className="flex-none font-mono text-[13px] font-medium text-muted">{s("stack")}</h2>
          <ul className="flex min-w-0 flex-1 flex-wrap gap-2">
            {stack.map((item) => (
              <li key={item} className="rounded-full border border-line-strong px-[13px] py-[7px] font-mono text-[13px] font-medium">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,48px)]">
        <section aria-labelledby="h-medium" className="py-[clamp(64px,9vw,104px)]">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="h-medium" className="text-[28px] font-semibold tracking-[-0.02em]">{s("latest")}</h2>
            {medium && (
              <a href={medium.url} className="flex min-h-11 items-center font-mono text-sm font-medium text-muted hover:text-ink">
                {s("allArticles")}
              </a>
            )}
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
            {articles.map((a) => (
              <article key={a.url} className="flex flex-col gap-3 rounded-2xl border border-line p-7 hover:border-line-strong">
                <span className="font-mono text-[13px] text-muted">{localize(a.date, locale)}</span>
                <h3 className="text-[21px] leading-[1.3] font-semibold tracking-[-0.01em] text-pretty">
                  <a href={a.url} className="hover:text-accent-text">{localize(a.title, locale)}</a>
                </h3>
                <p className="flex-1 text-[15px] leading-[1.55] text-ink-2">{localize(a.summary, locale)}</p>
                <a href={a.url} className="flex min-h-11 items-center self-start text-sm font-semibold text-accent-text">
                  {s("readMedium")}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 flex flex-wrap items-end justify-between gap-8 rounded-3xl bg-accent p-[clamp(32px,6vw,64px)] text-on-accent">
          <div>
            <h2 className="mb-3.5 max-w-[640px] text-[clamp(36px,5.5vw,64px)] leading-none font-bold tracking-[-0.04em]">{s("ctaTitle")}</h2>
            <p className="max-w-[480px] text-[17px] leading-normal">{s("ctaSub")}</p>
          </div>
          <div className="flex flex-col items-start gap-3 font-mono text-[15px] font-medium">
            {email && (
              <a href={email.url} className="rounded-full border-[1.5px] border-on-accent px-3.5 py-2 hover:bg-on-accent hover:text-accent">
                {email.handle}
              </a>
            )}
            <div className="flex flex-wrap gap-x-[18px] gap-y-1">
              <a href={GITHUB} className="flex min-h-11 items-center underline underline-offset-4">GitHub ↗</a>
              <a href={LINKEDIN} className="flex min-h-11 items-center underline underline-offset-4">LinkedIn ↗</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
