---
id: concise-reporter
title: Kompakter Reporter
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-concise-reporter/README.md
---


> Ein WebdriverIO-Plugin zur Berichterstattung im kompakten Stil.

## Installation

Der einfachste Weg ist, `@wdio/concise-reporter` als devDependency in Ihrer `package.json` zu behalten, über:

```sh
npm install @wdio/concise-reporter --save-dev
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier](https://webdriver.io/docs/gettingstarted).

## Konfiguration

Der folgende Code zeigt die Standardkonfiguration des wdio-Test-Runners. Fügen Sie einfach `'concise'` als Reporter zum Array hinzu.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'concise'],
  // ...
};
```