"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";

type Copy = { title: string; body: string; home: string; projects: string };

type Props = { en: Copy; pt: Copy };

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
      <h1 className="mt-6 text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.03em]">{copy.title}</h1>
      <p className="mt-4 max-w-[560px] text-lg leading-[1.55] text-ink-2">{copy.body}</p>
      <div className="mt-10 flex flex-wrap gap-2.5">
        <Link href={isPt ? "/pt-br/" : "/en/"} className="flex min-h-12 items-center rounded-full bg-btn px-[22px] text-[15px] font-semibold text-btn-ink">
          {copy.home}
        </Link>
        <Link href={isPt ? "/pt-br/projects/" : "/en/projects/"} className="flex min-h-12 items-center rounded-full border border-line-strong px-[22px] text-[15px] font-medium hover:border-ink">
          {copy.projects}
        </Link>
        {isPt ? (
          <Link href="/en/" lang="en" className="flex min-h-12 items-center px-3 font-mono text-sm text-muted hover:text-ink">
            English →
          </Link>
        ) : (
          <Link href="/pt-br/" lang="pt-BR" className="flex min-h-12 items-center px-3 font-mono text-sm text-muted hover:text-ink">
            Português →
          </Link>
        )}
      </div>
    </>
  );
}
