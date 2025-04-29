---
id: concise-reporter
title: Reporter Conciso
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-concise-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Un plugin WebdriverIO per generare report in stile conciso.

## Installazione

Il modo più semplice è mantenere `@wdio/concise-reporter` come devDependency nel tuo `package.json`, tramite:

```sh
npm install @wdio/concise-reporter --save-dev
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui](https://webdriver.io/docs/gettingstarted).

## Configurazione

Il seguente codice mostra la configurazione predefinita del test runner wdio. Basta aggiungere `'concise'` come reporter
all'array.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'concise'],
  // ...
};
```