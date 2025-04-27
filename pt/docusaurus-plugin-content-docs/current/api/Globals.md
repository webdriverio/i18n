---
id: globals
title: Globais
---

Em seus arquivos de teste, o WebdriverIO coloca cada um desses métodos e objetos no ambiente global. Você não precisa importar nada para usá-los. No entanto, se você preferir importações explícitas, pode fazer `import { browser, $, $$, expect } from '@wdio/globals'` e definir `injectGlobals: false` na sua configuração WDIO.

Os seguintes objetos globais são definidos, se não configurados de outra forma:

- `browser`: [Objeto Browser](https://webdriver.io/docs/api/browser) do WebdriverIO
- `driver`: alias para `browser` (usado ao executar testes móveis)
- `multiremotebrowser`: alias para `browser` ou `driver`, mas definido apenas para sessões [Multiremote](/docs/multiremote)
- `$`: comando para buscar um elemento (veja mais em [API docs](/docs/api/browser/$))
- `$$`: comando para buscar elementos (veja mais em [API docs](/docs/api/browser/$$))
- `expect`: framework de asserção para WebdriverIO (veja [API docs](/docs/api/expect-webdriverio))

__Nota:__ O WebdriverIO não tem controle sobre frameworks utilizados (por exemplo, Mocha ou Jasmine) que definem variáveis globais ao inicializar seu ambiente.