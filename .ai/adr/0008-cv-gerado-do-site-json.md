# CV em PDF gerado do site.json

## Contexto

O currículo em PDF repete texto que já está no site. Um arquivo feito à mão sai de sincronia a cada mudança de cargo, projeto ou experiência.

## Decisão

`scripts/cv.mjs` monta um HTML simples a partir de `src/content/site.json` e imprime em PDF com o Playwright, um por idioma, no máximo 2 páginas: `public/cv/caio-barilli-cv-pt-br.pdf` e `public/cv/caio-barilli-cv-en.pdf`. O script não tem texto novo, só layout, a ordem dos 5 projetos e as seções. Os PDFs vão commitados, porque o deploy não roda o script. O link fica só na página de Contato, cada idioma com o seu PDF.

## Consequência

Mudou o `site.json`: rodar `node scripts/cv.mjs` e commitar os PDFs. O `cv.test.ts` cobra que os dois existam, com no máximo 2 páginas e sem caminho local.

## Commit

O commit que adiciona este arquivo (`git log -- .ai/adr/0008-cv-gerado-do-site-json.md`).
