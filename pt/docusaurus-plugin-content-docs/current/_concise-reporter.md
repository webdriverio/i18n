---
id: concise-reporter
title: Relator Conciso
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-concise-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Um plugin WebdriverIO para relatar em estilo conciso.

## Instalação

A maneira mais fácil é manter o `@wdio/concise-reporter` como uma devDependency no seu `package.json`, via:

```sh
npm install @wdio/concise-reporter --save-dev
```

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui](https://webdriver.io/docs/gettingstarted).

## Configuração

O código a seguir mostra a configuração padrão do executor de teste wdio. Basta adicionar `'concise'` como um relator
ao array.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'concise'],
  // ...
};
```