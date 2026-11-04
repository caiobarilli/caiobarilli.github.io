"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/content/types";
import { THEME_KEY } from "./ThemeScript";

export type NavItem = { key: string; label: string; href: string };

type Props = {
  locale: Locale;
  nav: NavItem[];
  labels: { theme: string; menu: string; lang: string };
};

const otherLocale = (locale: Locale): Locale => (locale === "en" ? "pt-br" : "en");

function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    // Storage can be blocked; the theme still applies for this page view.
  }
}

/** The one theme control. Rendered twice (header, and inside the mobile menu under 375px); CSS shows one. */
function ThemeButton({ label, className = "" }: { label: string; className?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={toggleTheme}
      className={`flex size-11 items-center justify-center rounded-full border border-line-strong ${className}`}
    >
      <span className="size-3.5 rounded-full border-[1.5px] border-ink bg-[linear-gradient(90deg,var(--ink)_50%,transparent_50%)]" />
    </button>
  );
}

export function Header({ locale, nav, labels }: Props) {
  const pathname = usePathname() ?? `/${locale}/`;
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === `/${locale}/` ? pathname === href : pathname.startsWith(href);

  // Same page in the other language. Outside a locale (the static 404 before hydration), the other language's home.
  const switchHref = (target: Locale) =>
    pathname.startsWith(`/${locale}/`) ? pathname.replace(`/${locale}/`, `/${target}/`) : `/${target}/`;
  const langs: { code: Locale; label: string; htmlLang: string }[] = [
    { code: "en", label: "EN", htmlLang: "en" },
    { code: "pt-br", label: "PT", htmlLang: "pt-BR" },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg-blur backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-[clamp(20px,4vw,48px)] py-2.5">
        <Link href={`/${locale}/`} className="flex min-h-11 items-center font-mono text-[15px] font-medium">
          <span className="text-accent-text">~/</span>caio.barilli
        </Link>

        <nav aria-label="Main" className="hidden gap-0.5 rounded-full border border-line bg-surface p-1 min-[860px]:flex">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "rounded-full bg-chip px-4 py-2 text-sm font-medium text-ink"
                    : "rounded-full px-4 py-2 text-sm font-medium text-muted hover:text-ink"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div role="group" aria-label={labels.lang} className="flex rounded-full border border-line-strong font-mono text-xs font-medium">
            {langs.map((l) =>
              l.code === locale ? (
                <span key={l.code} lang={l.htmlLang} aria-current="true" className="flex min-h-11 min-w-11 items-center justify-center rounded-full bg-ink px-3 text-bg">
                  {l.label}
                </span>
              ) : (
                <Link key={l.code} lang={l.htmlLang} hrefLang={l.htmlLang} href={switchHref(otherLocale(locale))} className="flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 text-muted hover:text-ink">
                  {l.label}
                </Link>
              ),
            )}
          </div>

          {/* Under 360px there is no room for it here: it moves into the mobile menu. */}
          <ThemeButton label={labels.theme} className="max-[374px]:hidden" />

          <button
            type="button"
            aria-label={labels.menu}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex size-11 flex-col items-center justify-center gap-[5px] rounded-full bg-ink min-[860px]:hidden"
          >
            <span className="h-[1.5px] w-4 bg-bg" />
            <span className="h-[1.5px] w-4 bg-bg" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Main" className="flex flex-col border-t border-line px-[clamp(20px,4vw,48px)] pt-2 pb-5 min-[860px]:hidden">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-13 items-center justify-between border-b border-line text-xl font-semibold tracking-tight"
              >
                {item.label}
                <span className="font-mono text-[13px] font-medium text-accent-text">{active ? "●" : ""}</span>
              </Link>
            );
          })}
          <div className="pt-4 min-[375px]:hidden">
            <ThemeButton label={labels.theme} />
          </div>
        </nav>
      )}
    </header>
  );
}
