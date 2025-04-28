---
id: concise-reporter
title: Reportero Conciso
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-concise-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Un plugin de WebdriverIO para informar en estilo conciso.

## Instalación

La forma más sencilla es mantener `@wdio/concise-reporter` como una devDependency en tu `package.json`, vía:

```sh
npm install @wdio/concise-reporter --save-dev
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí](https://webdriver.io/docs/gettingstarted).

## Configuración

El siguiente código muestra la configuración predeterminada del ejecutor de pruebas wdio. Solo añade `'concise'` como reportero
al array.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'concise'],
  // ...
};
```