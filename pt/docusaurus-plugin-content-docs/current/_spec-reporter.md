---
id: spec-reporter
title: Relator de Especificação
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-spec-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Um plugin WebdriverIO para relatar no estilo de especificação.

![Spec Reporter](/img/spec.png "Spec Reporter")

## Instalação

A maneira mais fácil é manter o `@wdio/spec-reporter` como uma devDependency no seu `package.json`, via:

```sh
npm install @wdio/spec-reporter --save-dev
```

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui](https://webdriver.io/docs/gettingstarted).

## Configuração

O código a seguir mostra a configuração padrão do executor de teste wdio. Basta adicionar `'spec'` como um relator
na matriz.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'spec'],
  // ...
};
```

## Opções do Spec Reporter
### symbols
Forneça símbolos personalizados para testes `passed`, `failed` e/ou `skipped`

Tipo: `object`
Padrão: `{passed: '✓', skipped: '-', failed: '✖'}`

#### Exemplo
```js
[
  "spec",
  {
    symbols: {
      passed: '[PASS]',
      failed: '[FAIL]',
    },
  },
]
```

### sauceLabsSharableLinks
Por padrão, os resultados dos testes no Sauce Labs só podem ser visualizados por um membro da equipe da mesma equipe, não por um membro da equipe
de uma equipe diferente. Esta opção habilitará [links compartilháveis](https://docs.saucelabs.com/test-results/sharing-test-results/#building-sharable-links)
por padrão, o que significa que todos os testes executados no Sauce Labs podem ser visualizados por qualquer pessoa.
Basta adicionar `sauceLabsSharableLinks: false`, como mostrado abaixo, nas opções do relator para desativar este recurso.

Tipo: `boolean`
Padrão: `true`

#### Exemplo
```js
[
  "spec",
  {
    sauceLabsSharableLinks: false,
  },
]
```

### onlyFailures
Imprimir apenas resultados de especificações com falha.

Tipo: `boolean`
Padrão: `false`

#### Exemplo
```js
[
  "spec",
  {
    onlyFailures: true,
  },
]
```

### addConsoleLogs
Defina como `true` para mostrar logs do console das etapas no relatório final

Tipo: `boolean`
Padrão: `false`

```js
[
  "spec",
  {
    addConsoleLogs: true,
  },
]
```

### realtimeReporting
Defina como `true` para exibir o status do teste em tempo real em vez de apenas no final da execução

Tipo: `boolean`
Padrão: `false`

```js
[
  "spec",
  {
    realtimeReporting: true,
  },
]
```

### showPreface
Defina como `false` para desativar o prefácio `[ MutliRemoteBrowser ... ]` nos relatórios.

Tipo: `boolean`
Padrão: `true`

```js
[
  "spec",
  {
    showPreface: false,
  },
]
```

Com ele definido como `false`, você verá a saída como:
```
Running: loremipsum (v50) on Windows 10
Session ID: foobar

» /foo/bar/loo.e2e.js
Foo test
   green ✓ foo
   green ✓ bar

» /bar/foo/loo.e2e.js
Bar test
   green ✓ some test
   red ✖ a failed test
   red ✖ a failed test with no stack
```

e com `true` (padrão) cada linha será prefixada com o prefácio:
```
[loremipsum 50 Windows 10 #0-0] Running: loremipsum (v50) on Windows 10
[loremipsum 50 Windows 10 #0-0] Session ID: foobar
[loremipsum 50 Windows 10 #0-0]
[loremipsum 50 Windows 10 #0-0] » /foo/bar/loo.e2e.js
[loremipsum 50 Windows 10 #0-0] Foo test
[loremipsum 50 Windows 10 #0-0]    green ✓ foo
[loremipsum 50 Windows 10 #0-0]    green ✓ bar
[loremipsum 50 Windows 10 #0-0]
[loremipsum 50 Windows 10 #0-0] » /bar/foo/loo.e2e.js
[loremipsum 50 Windows 10 #0-0] Bar test
[loremipsum 50 Windows 10 #0-0]    green ✓ some test
[loremipsum 50 Windows 10 #0-0]    red ✖ a failed test
[loremipsum 50 Windows 10 #0-0]    red ✖ a failed test with no stack
[loremipsum 50 Windows 10 #0-0]
```

### color
Defina como `true` para exibir saída colorida no terminal

Tipo: `boolean`
Padrão: `true`

```js
[
  "spec",
  {
    color: true,
  },
]
```

## Opções de Ambiente

Existem certas opções que você pode definir através de variáveis de ambiente:

### `FORCE_COLOR`

Se definido como verdadeiro, por exemplo, via `FORCE_COLOR=0 npx wdio run wdio.conf.js`, toda a coloração do terminal será desativada.