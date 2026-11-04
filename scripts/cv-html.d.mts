export type CvLang = { locale: string; key: "pt" | "en"; file: string; html: string };
export const LANGS: CvLang[];
export function build(lang: CvLang): string;
