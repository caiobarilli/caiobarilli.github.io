"use client";

import Link from "next/link";
import { useState } from "react";
import type { CategoryId } from "@/content/types";
import { Placeholder } from "./Placeholder";

export type ProjectCard = {
  slug: string;
  name: string;
  main: boolean;
  cats: CategoryId[];
  tag: string;
  year: string;
  desc: string;
  stackLine: string;
  shot: string;
  href: string;
};

type Props = {
  projects: ProjectCard[];
  filters: { id: CategoryId; label: string }[];
  labels: { filter: string; word: string; caseStudy: string; placeholder: string; screenshot: string };
};

export function ProjectGrid({ projects, filters, labels }: Props) {
  const [filter, setFilter] = useState<CategoryId>("all");
  const visible = projects.filter((p) => filter === "all" || p.cats.includes(filter));
  const main = visible.filter((p) => p.main);
  const others = visible.filter((p) => !p.main);

  return (
    <>
      <div role="group" aria-label={labels.filter} className="mt-10 mb-3 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={
              filter === f.id
                ? "min-h-11 rounded-full bg-ink px-[18px] text-sm font-medium text-bg"
                : "min-h-11 rounded-full border border-line-strong px-[18px] text-sm font-medium hover:border-ink"
            }
          >
            {f.label}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="mb-7 font-mono text-[13px] text-muted">
        {visible.length} {labels.word}
      </p>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-5">
        {main.map((p) => (
          <article key={p.slug} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface">
            <Placeholder label={labels.placeholder} file={`${labels.screenshot} · ${p.shot}`} className="aspect-[16/10]" />
            <div className="flex flex-1 flex-col gap-2.5 p-6">
              <div className="flex justify-between gap-3 font-mono text-xs font-medium">
                <span className="text-accent-text">{p.tag}</span>
                <span className="text-muted">{p.year}</span>
              </div>
              <h2 className="text-2xl leading-[1.15] font-semibold tracking-[-0.02em]">{p.name}</h2>
              <p className="flex-1 text-[15px] leading-[1.55] text-pretty text-ink-2">{p.desc}</p>
              <div className="font-mono text-xs leading-[1.6] text-muted">{p.stackLine}</div>
              <Link href={p.href} className="flex min-h-11 items-center self-start text-sm font-semibold hover:text-accent-text">
                {labels.caseStudy}
              </Link>
            </div>
          </article>
        ))}
        {others.map((p) => (
          <Link
            key={p.slug}
            href={p.href}
            className="flex flex-col gap-2.5 self-start rounded-2xl border border-line p-6 hover:border-line-strong hover:bg-surface"
          >
            <span className="flex w-full justify-between font-mono text-xs font-medium">
              <span className="text-accent-text">{p.tag}</span>
              <span className="text-muted">{p.year}</span>
            </span>
            <span className="text-[22px] font-semibold tracking-[-0.02em]">{p.name}</span>
            <span className="text-[15px] leading-[1.55] text-ink-2">{p.desc}</span>
            <span className="font-mono text-xs text-muted">{p.stackLine}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
