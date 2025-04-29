---
id: dot-reporter
title: Dot Reporter
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-dot-reporter/README.md
---


> Ein WebdriverIO-Plugin für Berichte im Dot-Stil.

![Dot Reporter](/img/dot.png "Dot Reporter")

## Installation

Der einfachste Weg ist, `@wdio/dot-reporter` als devDependency in Ihrer `package.json` zu behalten, über:

```sh
npm install @wdio/dot-reporter --save-dev
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier](/docs/gettingstarted).

## Konfiguration

Der folgende Code zeigt die Standard-Konfiguration des wdio-Testrunners. Fügen Sie einfach `'dot'` als Reporter zum Array hinzu.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot'],
  // ...
};
```

----

Weitere Informationen zu WebdriverIO finden Sie auf der [Homepage](https://webdriver.io).