---
id: dot-reporter
title: Dot Reporter
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-dot-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Wtyczka WebdriverIO do raportowania w stylu kropkowym.

![Dot Reporter](/img/dot.png "Dot Reporter")

## Instalacja

Najłatwiejszym sposobem jest utrzymanie `@wdio/dot-reporter` jako devDependency w pliku `package.json`, poprzez:

```sh
npm install @wdio/dot-reporter --save-dev
```

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj](/docs/gettingstarted).

## Konfiguracja

Poniższy kod pokazuje domyślną konfigurację test runnera wdio. Wystarczy dodać `'dot'` jako reporter
do tablicy.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot'],
  // ...
};
```

----

Aby uzyskać więcej informacji na temat WebdriverIO, odwiedź [stronę główną](https://webdriver.io).