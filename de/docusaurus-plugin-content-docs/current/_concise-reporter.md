---
id: concise-reporter
title: Kompakter Reporter
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-concise-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Ein WebdriverIO-Plugin für Berichte im kompakten Stil.

## Installation

Der einfachste Weg ist, `@wdio/concise-reporter` als devDependency in Ihrer `package.json` zu behalten, über:

```sh
npm install @wdio/concise-reporter --save-dev
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier](https://webdriver.io/docs/gettingstarted).

## Konfiguration

Der folgende Code zeigt die Standard-Konfiguration des wdio-Testrunners. Fügen Sie einfach `'concise'` als Reporter zum Array hinzu.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'concise'],
  // ...
};
```