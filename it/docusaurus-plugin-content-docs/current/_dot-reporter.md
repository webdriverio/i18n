---
id: dot-reporter
title: Reporter Dot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-dot-reporter/README.md
---


> Un plugin WebdriverIO per generare report in stile dot.

![Dot Reporter](/img/dot.png "Dot Reporter")

## Installazione

Il modo più semplice è mantenere `@wdio/dot-reporter` come devDependency nel tuo `package.json`, tramite:

```sh
npm install @wdio/dot-reporter --save-dev
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui](/docs/gettingstarted).

## Configurazione

Il seguente codice mostra la configurazione predefinita del test runner wdio. Basta aggiungere `'dot'` come reporter
all'array.

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