# Regras

## Papéis

- **Maintainer:** decide, aprova texto público, dá push. O deploy sai do push na `main`.
- **Agente:** mede, escreve, roda o portão, mostra o diff e commita quando aprovado. Não dá push.

## Commit

- Em nome do Maintainer, só a linha de assunto, sem rodapé de coautoria de IA.
- Só com portão verde: `npm run gate` e `npm run test:e2e`.

## Texto público

- Rascunho primeiro; aplica só depois do ok.
- Sem atacar outra tecnologia, sem nota ou elogio a si mesmo, sem frase de efeito.
- Não dizer onde trabalha hoje nem dar a entender que está sem emprego.
- Sem segredo, `.env`, token, nome de cliente ou dado de terceiro. Não ler `.env`.

## Código

- Todo texto do site mora em `src/content/site.json`, nos dois idiomas. Componente não tem texto fixo.
- Alvo de toque de no mínimo 44px (`min-h-11`).
- Print novo em `public/images/projects/`: rodar `node scripts/sizes.mjs` (o teste `Shot.test.ts` cobra).
- Mudou o `site.json`: rodar `node scripts/cv.mjs` e commitar os PDFs de `public/cv/`.
- Next 16 tem mudanças de API: ler `node_modules/next/dist/docs/` antes de usar algo novo.
