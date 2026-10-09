---
id: exec
title: Executar código em uma sessão
description: Execute código e asserções do WebdriverIO em uma sessão wdio ativa com exec.
---

`exec` executa código WebdriverIO na sessão aberta. Use-o quando uma etapa for mais do que um simples `click` ou `fill`, e para todas as asserções.

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

Sempre use `await` nos comandos. `$` retorna um elemento e lança um erro quando ele não existe. `$$` retorna uma lista. Não há modo síncrono nem `browser.element`.

Os nomes que você declara continuam disponíveis no próximo `exec`. Um `import` de nível superior é carregado a partir do diretório do projeto.

## Asserções

Coloque as asserções no `exec` com `expect-webdriverio`. Instale-o no seu projeto. Sem ele, `expect(...)` falha com uma dica de instalação.

```sh
npx wdio session exec -e "await expect($('h1')).toHaveText('Cart')"
```

Use `visual check <tag>` quando a questão for a aparência da tela. Esse comando precisa de `@wdio/visual-service`:

```sh
npx wdio session visual check cart
```

`visual accept cart` copia a imagem real mais recente dessa tag sobre a baseline. Ele não copia imagens mais antigas que compartilham o prefixo da tag.

## Quando usar um atalho em vez disso

`click`, `fill`, `type`, `press` e `tap` são mais curtos que `exec` para uma única interação, e exibem a linha WebdriverIO que executaram. Prefira-os com uma ref do [snapshot](/docs/session/snapshots) mais recente. Use `exec` para esperas, asserções e qualquer coisa que precise de mais de um comando.

## Próximos passos

- [Exportar um teste](/docs/session/export) — salve as etapas, incluindo `exec`
- [Comandos](/docs/session-commands) — flags de `exec` e `visual`