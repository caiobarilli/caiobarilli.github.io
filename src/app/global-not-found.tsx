import type { Metadata } from "next";
import Link from "next/link";
import { ThemeScript } from "@/components/ThemeScript";
import { str } from "@/content";
import { geist, geistMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 · Caio Barilli",
  robots: { index: false },
};

/** Static 404 for GitHub Pages. English by default, with a link to the Portuguese site. */
export default function GlobalNotFound() {
  const s = (key: string) => str("en", key);
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen">
        <main className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,48px)] py-[clamp(64px,11vw,120px)]">
          <p className="mb-6 font-mono text-[15px] text-muted">
            <span className="text-accent-text">caio@wsl</span>:~$ cd /this-page
          </p>
          <p className="text-[clamp(96px,18vw,200px)] leading-[0.9] font-bold tracking-[-0.05em] text-accent-text">404</p>
          <h1 className="mt-6 text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.03em]">{s("nfTitle")}</h1>
          <p className="mt-4 max-w-[560px] text-lg leading-[1.55] text-ink-2">{s("nfBody")}</p>
          <div className="mt-10 flex flex-wrap gap-2.5">
            <Link href="/en/" className="flex min-h-12 items-center rounded-full bg-btn px-[22px] text-[15px] font-semibold text-btn-ink">
              {s("nfHome")}
            </Link>
            <Link href="/en/projects/" className="flex min-h-12 items-center rounded-full border border-line-strong px-[22px] text-[15px] font-medium hover:border-ink">
              {s("nfProjects")}
            </Link>
            <Link href="/pt-br/" lang="pt-BR" className="flex min-h-12 items-center px-3 font-mono text-sm text-muted hover:text-ink">
              Português →
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
