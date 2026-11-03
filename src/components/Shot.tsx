import Image from "next/image";
import { Placeholder } from "./Placeholder";

type Props = {
  src: string | null;
  alt: string;
  label: string;
  file: string;
  className?: string;
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
      priority={priority}
      className={`h-auto w-full object-cover object-top ${className} !p-0`}
    />
  );
}
