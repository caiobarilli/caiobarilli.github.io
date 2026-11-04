import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header, type NavItem } from "@/components/Header";
import { ThemeScript } from "@/components/ThemeScript";
import { ThemeSync } from "@/components/ThemeSync";
import { isLocale, navLabel, str } from "@/content";
import { locales } from "@/content/types";
import { geist, geistMono } from "../fonts";
import { pageMetadata, SITE_URL } from "../page-meta";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    metadataBase: new URL(SITE_URL),
    ...pageMetadata(locale, "Caio Barilli", str(locale, "heroLine"), ""),
  };
}

const NAV_KEYS = [
  ["home", ""],
  ["projects", "projects/"],
  ["experience", "experience/"],
  ["about", "about/"],
  ["contact", "contact/"],
] as const;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const nav: NavItem[] = NAV_KEYS.map(([key, path]) => ({
    key,
    label: navLabel(locale, key),
    href: `/${locale}/${path}`,
  }));

  return (
    <html lang={locale === "en" ? "en" : "pt-BR"} className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen">
        <ThemeSync />
        <a
          href="#main"
          className="absolute top-2 -left-[9999px] z-50 rounded-lg bg-btn px-4 py-3 font-semibold text-btn-ink focus:left-4"
        >
          {str(locale, "skip")}
        </a>
        <Header
          locale={locale}
          nav={nav}
          labels={{ theme: str(locale, "theme"), menu: str(locale, "menu"), lang: str(locale, "lang") }}
        />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer text={str(locale, "footer")} />
      </body>
    </html>
  );
}
