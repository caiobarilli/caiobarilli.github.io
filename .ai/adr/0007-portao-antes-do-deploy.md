# Portão antes do deploy

## Contexto

O push na `main` publica direto. Erro passa para o site sem ninguém ver.

## Decisão

O workflow roda lint, tipos, testes unitários, build e E2E (Playwright, desktop e celular, com axe) antes de publicar. As actions são fixadas por hash.

## Consequência

Deploy só com tudo verde. Um teste quebrado segura a publicação.

## Commit

`6099481`, `3444ee3`
