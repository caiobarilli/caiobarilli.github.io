"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { Header, type NavItem } from "./Header";

export type NotFoundCopy = {
  title: string;
  body: string;
  home: string;
  projects: string;
  nav: NavItem[];
  labels: { theme: string; menu: string; lang: string };
};

type Props = { en: NotFoundCopy; pt: NotFoundCopy };

const subscribe = () => () => {};

/** The static 404 is one file for the whole site, so the language comes from the address the visitor asked for. */
const currentLocale = () => (/^\/pt-br(\/|$)/.test(window.location.pathname) ? "pt-br" : "en");

export function NotFoundContent({ en, pt }: Props) {
  const locale = useSyncExternalStore(subscribe, currentLocale, () => "en" as const);
  const isPt = locale === "pt-br";
  const copy = isPt ? pt : en;

  useEffect(() => {
    document.documentElement.lang = isPt ? "pt-BR" : "en";
  }, [isPt]);

  return (
    <>
      <Header locale={locale} nav={copy.nav} labels={copy.labels} />
      <main className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,48px)] py-[clamp(64px,11vw,120px)]">
        <p className="mb-6 font-mono text-[15px] text-muted">
          <span className="text-accent-text">caio@wsl</span>:~$ cd /this-page
        </p>
        <p className="text-[clamp(96px,18vw,200px)] leading-[0.9] font-bold tracking-[-0.05em] text-accent-text">404</p>
        <h1 className="mt-6 text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.03em]">{copy.title}</h1>
        <p className="mt-4 max-w-[560px] text-lg leading-[1.55] text-ink-2">{copy.body}</p>
        <div className="mt-10 flex flex-wrap gap-2.5">
          <Link href={isPt ? "/pt-br/" : "/en/"} className="flex min-h-12 items-center rounded-full bg-btn px-[22px] text-[15px] font-semibold text-btn-ink">
            {copy.home}
          </Link>
          <Link href={isPt ? "/pt-br/projects/" : "/en/projects/"} className="flex min-h-12 items-center rounded-full border border-line-strong px-[22px] text-[15px] font-medium hover:border-ink">
            {copy.projects}
          </Link>
        </div>
      </main>
    </>
  );
}
