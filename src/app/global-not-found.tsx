import type { Metadata } from "next";
import { NotFoundContent } from "@/components/NotFoundContent";
import { ThemeScript } from "@/components/ThemeScript";
import { str } from "@/content";
import { geist, geistMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 · Caio Barilli",
  robots: { index: false },
};

/** Static 404 for GitHub Pages. English by default; the client swaps to Portuguese for /pt-br/ addresses. */
export default function GlobalNotFound() {
  const copy = (locale: "en" | "pt-br") => ({
    title: str(locale, "nfTitle"),
    body: str(locale, "nfBody"),
    home: str(locale, "nfHome"),
    projects: str(locale, "nfProjects"),
  });
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
          <NotFoundContent en={copy("en")} pt={copy("pt-br")} />
        </main>
      </body>
    </html>
  );
}
