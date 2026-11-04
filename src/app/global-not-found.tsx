import type { Metadata } from "next";
import type { NavItem } from "@/components/Header";
import { NotFoundContent, type NotFoundCopy } from "@/components/NotFoundContent";
import { ThemeScript } from "@/components/ThemeScript";
import { navLabel, str } from "@/content";
import type { Locale } from "@/content/types";
import { geist, geistMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 · Caio Barilli",
  robots: { index: false },
};

const NAV_KEYS = [
  ["home", ""],
  ["projects", "projects/"],
  ["experience", "experience/"],
  ["about", "about/"],
  ["contact", "contact/"],
] as const;

function copy(locale: Locale): NotFoundCopy {
  const nav: NavItem[] = NAV_KEYS.map(([key, path]) => ({ key, label: navLabel(locale, key), href: `/${locale}/${path}` }));
  return {
    title: str(locale, "nfTitle"),
    body: str(locale, "nfBody"),
    home: str(locale, "nfHome"),
    projects: str(locale, "nfProjects"),
    nav,
    labels: { theme: str(locale, "theme"), menu: str(locale, "menu"), lang: str(locale, "lang") },
  };
}

/** Static 404 for GitHub Pages. English by default; the client swaps to Portuguese for /pt-br/ addresses. */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen">
        <NotFoundContent en={copy("en")} pt={copy("pt-br")} />
      </body>
    </html>
  );
}
