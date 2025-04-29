---
id: concise-reporter
title: Koncis Rapporterare
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-concise-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> En WebdriverIO-plugin för att rapportera i koncis stil.

## Installation

Det enklaste sättet är att behålla `@wdio/concise-reporter` som en devDependency i din `package.json`, via:

```sh
npm install @wdio/concise-reporter --save-dev
```

Instruktioner om hur man installerar `WebdriverIO` finns [här](https://webdriver.io/docs/gettingstarted).

## Konfiguration

Följande kod visar standardkonfigurationen för wdio test runner. Lägg bara till `'concise'` som en reporter
i arrayen.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'concise'],
  // ...
};
```