# Export estático no GitHub Pages

## Contexto

O portfólio é conteúdo fixo que muda pouco. Não precisa de servidor.

## Decisão

Next.js com `output: "export"`, `trailingSlash` e `images.unoptimized`. O build gera HTML puro em `out/` e o GitHub Actions publica no Pages.

## Consequência

Sem custo e sem servidor para manter. Em troca: nada roda no servidor (sem API, sem otimização de imagem, sem cabeçalho HTTP próprio) e o cache é o do Pages.

## Commit

`4c679e1`, `6099481`, `6a68207`
