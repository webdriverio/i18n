---
id: dot-reporter
title: Dot Reporter
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-dot-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Un plugin WebdriverIO per il reporting in stile dot.

![Dot Reporter](/img/dot.png "Dot Reporter")

## Installazione

Il modo più semplice è mantenere `@wdio/dot-reporter` come devDependency nel tuo `package.json`, tramite:

```sh
npm install @wdio/dot-reporter --save-dev
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui](/docs/gettingstarted).

## Configurazione

Il codice seguente mostra la configurazione predefinita del test runner wdio. Basta aggiungere `'dot'` come reporter all'array.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot'],
  // ...
};
```

----

Per ulteriori informazioni su WebdriverIO, consulta la [homepage](https://webdriver.io).