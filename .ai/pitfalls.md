# Pitfalls

Só o que o git ou o código desta árvore mostram.

## `openGraph` de uma página apaga o do layout

O Next troca o objeto `openGraph` inteiro, não junta. Uma página que só mudava o título perdia imagem e URL da prévia. Toda página monta o conjunto completo com `pageMetadata()` (`src/app/page-meta.ts`).

Evidência: `ca450eb`.

## `priority` do `next/image` está descontinuado no Next 16

Usar `loading="eager"` com `fetchPriority="high"` na imagem principal da página.

O React cria um `<link rel=preload>` para todo `<img>` eager, e o prefetch do `<Link>` aplica essa dica nas páginas vizinhas, onde o print não aparece (aviso "preloaded but not used"). Por isso o `Shot` com `priority` fica dentro de `<picture>`, onde o React não cria o preload.

Evidência: `ddc980d`.

## Export estático não gera `srcset`

Com `images.unoptimized` não há servidor para redimensionar: o celular baixava o print de 1600px. As cópias menores saem de `scripts/sizes.mjs` e o `Shot` monta o `srcset`. Celular de tela densa (ex.: 412px a 2,6x) pede a cópia de 1280. Os `sizes` vêm da largura medida no navegador (cards: 100vw - 40px até 670px, depois 450px).

Evidência: `7a81f48`.

## 404 estática apontava para `/_not-found`

O link de idioma da 404 gerada caía na rota interna. O E2E agora lê o `404.html` e cobra.

Evidência: `023ed09`.

## Varredura de acessibilidade estoura 30s

O axe em todas as páginas e nos dois projetos do Playwright passa do tempo padrão. `e2e/a11y.spec.ts` usa `test.setTimeout(120_000)`.

Evidência: `02886b7`.

## Pasta `[locale]` no PowerShell

Colchete é curinga no PowerShell. Usar `-LiteralPath` para ler ou mexer em `src/app/[locale]/...`.

## CSS fora de `@layer` vence as utilities do Tailwind

CSS sem camada vence todas as camadas, inclusive as utilities. O `:focus-visible` com `border-radius: 6px` fora de camada tirava o formato de pílula dos botões `rounded-full` quando recebiam foco por teclado (48px de altura, raio de 6px). Regras próprias ficam em `@layer base`, utilitários próprios em `@utility`. Só o bloco de `prefers-reduced-motion` fica fora de camada, de propósito. Efeito esperado: o `<main id="main">` (`outline-none`) não mostra mais anel ao receber o foco do link de pular.

Evidência: `5b1c4cf`.
