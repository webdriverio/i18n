---
id: concise-reporter
title: Zwięzły Reporter
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-concise-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Wtyczka WebdriverIO do raportowania w zwięzłym stylu.

## Instalacja

Najłatwiejszym sposobem jest zachowanie `@wdio/concise-reporter` jako devDependency w pliku `package.json`, poprzez:

```sh
npm install @wdio/concise-reporter --save-dev
```

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj](https://webdriver.io/docs/gettingstarted).

## Konfiguracja

Poniższy kod pokazuje domyślną konfigurację test runnera wdio. Wystarczy dodać `'concise'` jako reporter do tablicy.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'concise'],
  // ...
};
```