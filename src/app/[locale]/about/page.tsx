import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageIntro";
import { isLocale, str } from "@/content";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const s = (key: string) => str(locale, key);

  return (
    <PageShell>
      <div className="flex flex-wrap items-center gap-x-14 gap-y-8">
        <Image
          src="/images/caio-480.webp"
          alt={s("photoAlt")}
          width={240}
          height={240}
          priority
          className="aspect-square w-[clamp(160px,22vw,240px)] flex-none rounded-full border border-line-strong object-cover"
        />
        <div className="min-w-[min(100%,360px)] flex-1">
          <h1 className="mb-7 text-[clamp(44px,7vw,88px)] leading-[0.95] font-bold tracking-[-0.04em]">{s("aboutTitle")}</h1>
          <p className="max-w-[720px] text-[clamp(18px,1.9vw,22px)] leading-[1.55] text-pretty">{s("aboutP1")}</p>
        </div>
      </div>

      <section className="mt-[clamp(64px,9vw,104px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-16 gap-y-6 border-t border-line pt-8">
        <h2 className="text-[28px] font-semibold tracking-[-0.02em]">{s("storyTitle")}</h2>
        <div className="col-span-2 flex max-w-[720px] flex-col gap-5 max-[700px]:col-span-1">
          {s("story")
            .split("\n\n")
            .map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-[17px] leading-[1.7] text-pretty text-ink-2">
                {paragraph}
              </p>
            ))}
        </div>
      </section>

      <Link
        href={`/${locale}/contact/`}
        className="mt-14 inline-flex min-h-12 items-center rounded-full bg-btn px-[22px] text-[15px] font-semibold text-btn-ink"
      >
        {s("aboutCta")}
      </Link>
    </PageShell>
  );
}
