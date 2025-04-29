---
id: dot-reporter
title: Dot-rapportör
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-dot-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> En WebdriverIO-plugin för att rapportera i punktstil.

![Dot Reporter](/img/dot.png "Dot Reporter")

## Installation

Det enklaste sättet är att behålla `@wdio/dot-reporter` som en devDependency i din `package.json`, via:

```sh
npm install @wdio/dot-reporter --save-dev
```

Instruktioner om hur man installerar `WebdriverIO` finns [här](/docs/gettingstarted).

## Konfiguration

Följande kod visar standardkonfigurationen för wdio-testrunnern. Lägg bara till `'dot'` som rapportör
i arrayen.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot'],
  // ...
};
```

----

För mer information om WebdriverIO, se [hemsidan](https://webdriver.io).