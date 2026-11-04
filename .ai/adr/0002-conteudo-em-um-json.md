# Conteúdo num JSON só, nos dois idiomas

## Contexto

O site tem inglês e português. Texto espalhado em componente esquece um idioma.

## Decisão

Todo texto mora em `src/content/site.json`, com `{ en, pt }` por campo. Os componentes leem por `getContent()`, `str()` e `localize()`.

## Consequência

Mudar texto não mexe em componente. O `content.test.ts` cobra as mesmas chaves e os dois idiomas preenchidos.

## Commit

`4c679e1`, `4f48a4f`
