# Tema salvo no navegador

## Contexto

Claro e escuro, com padrão do sistema. Trocar de idioma voltava ao tema do sistema.

## Decisão

A escolha fica no `localStorage` (`cb-theme`). Um script no `<head>` aplica antes da pintura e o `ThemeSync` reaplica a cada navegação.

## Consequência

Sem piscar o tema errado. Sem escolha salva, segue o sistema.

## Commit

`d5ef9d5`
