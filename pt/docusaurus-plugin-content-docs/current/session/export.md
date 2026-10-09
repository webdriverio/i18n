---
id: export
title: Exportar uma sessão como teste
description: Transforme os passos que você executou no wdio session em uma spec, page objects e comandos personalizados.
---

`export` gera uma spec a partir dos passos gravados. As refs são substituídas por seletores estáveis. Para uma página web, é usado o primeiro dos seguintes que corresponder a exatamente um elemento: um test id (`data-testid`, `data-test`, `data-qa`), um [seletor de role](/docs/selectors#role-selector) como `role/button[name="Add to cart"]`, um nome acessível (`aria/Add to cart`), um id, o texto de um botão ou link, o nome de um campo de formulário e, por fim, um caminho CSS.

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

`history` exibe os passos antes de você exportar. `history clear` os descarta.

## Page objects

`--page-objects` gera um page object ao lado da spec. Os seletores são agrupados pelo caminho em que foram executados. Um `$('…')` literal em um passo gravado se torna um getter. `$$`, strings que por acaso contenham `$('…')` e um `$(selector)` dinâmico permanecem como estão.

```sh
npx wdio session export --page-objects --out test/specs/cart.e2e.ts
```

O comando se recusa a sobrescrever um page object que já esteja no diretório de saída. Altere o `--out` ou remova esse arquivo primeiro. O arquivo da spec em si é gerado novamente.

Um `import` no início de um passo `exec` é movido para o topo da spec, fora da função de teste.

## Helpers

Adicione um arquivo em `.wdio/helpers/` quando um passo for longo demais para o `exec`. Cada arquivo exporta por padrão uma função que recebe o browser e registra comandos com `addCommand`. Imports relativos permanecem relativos a esse arquivo. Imports de pacotes simples são resolvidos a partir do projeto.

```js title=".wdio/helpers/login.js"
import { mark } from './util.js'

export default function login (browser) {
    browser.addCommand('fillLogin', async (email) => {
        await browser.$('#email').setValue(email + mark)
    })
}
```

Os helpers são carregados quando a sessão é aberta e novamente com `npx wdio session helpers --reload`. Se `.wdio/helpers` ainda não existir, a sessão fica observando até que ele seja criado. Os helpers se tornam comandos personalizados no teste exportado.

## Próximos passos

- [Executar código](/docs/session/exec) — os passos que o `export` grava
- [Comandos](/docs/session-commands) — flags de `export`, `history` e `helpers`