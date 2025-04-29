---
id: dot-reporter
title: Reportador de Pontos
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-dot-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Um plugin WebdriverIO para reportar no estilo de pontos.

![Dot Reporter](/img/dot.png "Dot Reporter")

## Instalação

A maneira mais fácil é manter o `@wdio/dot-reporter` como uma devDependency no seu `package.json`, via:

```sh
npm install @wdio/dot-reporter --save-dev
```

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui](/docs/gettingstarted).

## Configuração

O código a seguir mostra a configuração padrão do executor de testes wdio. Basta adicionar `'dot'` como reporter
ao array.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot'],
  // ...
};
```

----

Para mais informações sobre o WebdriverIO, visite a [página inicial](https://webdriver.io).