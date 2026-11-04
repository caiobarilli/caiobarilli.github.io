import Image from "next/image";
import { Placeholder } from "./Placeholder";

type Props = {
  src: string | null;
  alt: string;
  label: string;
  file: string;
  className?: string;
  /** The page's LCP image: load it eagerly with high fetch priority (Next 16 deprecated next/image's own `priority`). */
  priority?: boolean;
};

/** A 16:10 project screenshot, or the striped placeholder when the image does not exist yet. */
export function Shot({ src, alt, label, file, className = "", priority = false }: Props) {
  if (!src) return <Placeholder label={label} file={file} className={className} />;
  return (
    <Image
      src={src}
      alt={alt}
      width={1600}
      height={1000}
      loading={priority ? "eager" : undefined}
      fetchPriority={priority ? "high" : undefined}
      className={`h-auto w-full object-cover object-top ${className} !p-0`}
    />
  );
}
