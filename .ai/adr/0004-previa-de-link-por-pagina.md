# Prévia de link completa em toda página

## Contexto

O link do portfólio é colado no LinkedIn e em mensagens. Sem imagem e título certos, a prévia sai vazia.

## Decisão

`pageMetadata()` monta título, descrição, `canonical`, `hreflang`, Open Graph e Twitter em toda página, com `metadataBase` no layout. A imagem da prévia (`og-en.png`, `og-pt-br.png`) sai de `scripts/og.mjs`. Sitemap e robots são gerados no build.

## Consequência

Cada página tem título próprio e prévia com imagem. Mudou o cargo no `site.json`: rodar `scripts/og.mjs` de novo.

## Commit

`f50a978`, `ca450eb`, `023ed09`
