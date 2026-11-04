# Idioma na URL

## Contexto

Sem servidor, não dá para escolher o idioma pelo cabeçalho da requisição.

## Decisão

Cada idioma tem sua pasta: `/en/` e `/pt-br/`. A raiz (`public/index.html`) manda para o idioma do navegador. O seletor de idioma mantém a página atual.

## Consequência

Cada página tem uma URL por idioma, com `hreflang` e `canonical` absolutos. A 404 descobre o idioma pelo endereço.

## Commit

`4c679e1`, `9f4a6b4`, `f50a978`
