---
id: globals
title: Globais
---

Nos seus arquivos de teste, o WebdriverIO coloca cada um desses métodos e objetos no ambiente global. Você não precisa importar nada para usá-los. No entanto, se preferir importações explícitas, você pode fazer `import { browser, $, $$, expect } from '@wdio/globals'` e definir `injectGlobals: false` na sua configuração do WDIO.

Os seguintes objetos globais são definidos, a menos que configurado de outra forma:

- `browser`: [objeto Browser](https://webdriver.io/docs/api/browser) do WebdriverIO
- `driver`: alias para `browser` (usado ao executar testes mobile)
- `multiRemoteBrowser`: alias para `browser` ou `driver`, mas definido apenas para sessões [multi-remote](/docs/multiremote)
- `$`: comando para buscar um elemento (veja mais na [documentação da API](/docs/api/browser/$))
- `$$`: comando para buscar elementos (veja mais na [documentação da API](/docs/api/browser/$$))
- `expect`: framework de asserções para o WebdriverIO (veja a [documentação da API](/docs/api/expect-webdriverio))

__Nota:__ O WebdriverIO não tem controle sobre os frameworks utilizados (por exemplo, Mocha ou Jasmine) que definem variáveis globais ao inicializar seu ambiente.