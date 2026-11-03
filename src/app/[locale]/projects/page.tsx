import { notFound } from "next/navigation";
import { PageIntro, PageShell } from "@/components/PageIntro";
import { ProjectGrid, type ProjectCard } from "@/components/ProjectGrid";
import { contentKey, getContent, isLocale, localize, str } from "@/content";

export default async function Projects({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const s = (key: string) => str(locale, key);
  const { projects, cats } = getContent();

  const cards: ProjectCard[] = projects.map((p) => ({
    slug: p.slug,
    name: p.name,
    main: p.main,
    cats: p.cats,
    tag: localize(p.tag, locale),
    year: p.year,
    desc: localize(p.desc, locale),
    stackLine: p.stack.join(" · "),
    shot: p.shot,
    href: `/${locale}/projects/${p.slug}/`,
  }));

  return (
    <PageShell>
      <PageIntro title={s("projectsTitle")} lead={s("projectsSub")} />
      <ProjectGrid
        projects={cards}
        filters={cats.map((c) => ({ id: c.id, label: c[contentKey(locale)] }))}
        labels={{
          filter: s("filterLabel"),
          word: s("projectsWord"),
          caseStudy: s("caseStudy"),
          placeholder: s("placeholder"),
          screenshot: s("screenshot"),
        }}
      />
    </PageShell>
  );
}
