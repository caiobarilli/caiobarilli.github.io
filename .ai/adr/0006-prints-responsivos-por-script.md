# Prints em tamanhos menores, gerados por script

## Contexto

O Lighthouse no celular apontou cerca de 178 KB a mais: prints de 1600px mostrados com 370px. O export estático não redimensiona imagem.

## Decisão

`scripts/sizes.mjs` grava cópias de 480, 720, 960 e 1280px em `public/images/projects/w/`. O `Shot` usa `<img>` com `srcset` e `sizes`, e o navegador escolhe a menor que serve.

## Consequência

Print novo precisa do script; o `Shot.test.ts` cobra. O lightbox continua com o original de 1600px.

## Commit

`7a81f48`
