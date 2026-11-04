import { Placeholder } from "./Placeholder";

/** Widths written by scripts/sizes.mjs to /images/projects/w/; the original is 1600px wide. */
export const SHOT_WIDTHS = [480, 960, 1280] as const;

/** Card width on a grid: full width on a phone, about a third of the page on a desktop. */
const CARD_SIZES = "(max-width: 700px) 100vw, 400px";

/** srcset for a project screenshot: the smaller copies plus the 1600px original. */
export function shotSrcSet(src: string): string {
  const name = src.replace(/^\/images\/projects\//, "").replace(/\.webp$/, "");
  return [...SHOT_WIDTHS.map((w) => `/images/projects/w/${name}-${w}.webp ${w}w`), `${src} 1600w`].join(", ");
}

type Props = {
  src: string | null;
  alt: string;
  label: string;
  file: string;
  className?: string;
  /** How wide the image shows on screen, so the browser picks the right copy. Defaults to a grid card. */
  sizes?: string;
  /** The page's LCP image: load it eagerly with high fetch priority. */
  priority?: boolean;
};

/** A 16:10 project screenshot, or the striped placeholder when the image does not exist yet. */
export function Shot({ src, alt, label, file, className = "", sizes = CARD_SIZES, priority = false }: Props) {
  if (!src) return <Placeholder label={label} file={file} className={className} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export has no image server; the copies come from scripts/sizes.mjs
    <img
      src={src}
      srcSet={shotSrcSet(src)}
      sizes={sizes}
      alt={alt}
      width={1600}
      height={1000}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={`h-auto w-full object-cover object-top ${className} !p-0`}
    />
  );
}
