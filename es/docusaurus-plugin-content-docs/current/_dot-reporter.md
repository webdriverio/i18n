---
id: dot-reporter
title: Reportero Dot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-dot-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Un plugin de WebdriverIO para reportar en estilo dot.

![Dot Reporter](/img/dot.png "Dot Reporter")

## Instalación

La forma más fácil es mantener `@wdio/dot-reporter` como una devDependency en tu `package.json`, mediante:

```sh
npm install @wdio/dot-reporter --save-dev
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí](/docs/gettingstarted).

## Configuración

El siguiente código muestra la configuración predeterminada del ejecutor de pruebas wdio. Solo agrega `'dot'` como reportero
al array.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot'],
  // ...
};
```

----

Para más información sobre WebdriverIO, consulta la [página principal](https://webdriver.io).