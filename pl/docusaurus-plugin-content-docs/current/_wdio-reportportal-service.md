---
id: wdio-reportportal-service
title: Usługa Report Portal
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-service is a 3rd party package, for more information please see [GitHub](https://github.com/borisosipov/wdio-reportportal-service) | [npm](https://www.npmjs.com/package/wdio-reportportal-service)

## Instalacja
Najprostszym sposobem jest zachowanie `wdio-reportportal-service` jako devDependency w pliku `package.json`.
```json
{
  "devDependencies": {
    "wdio-reportportal-service": "^7.3.0"
  }
}
```
Możesz to zrobić poprzez:

```bash
npm install wdio-reportportal-reporter --save-dev
```

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj](https://webdriver.io/docs/gettingstarted).

## Konfiguracja
Skonfiguruj katalog wyjściowy w pliku wdio.conf.js:
```js
const RpService = require('wdio-reportportal-service');

exports.config = {
  // ...
  services: [[RpService, {}]],
  // ...
}
```

## Licencja

Ten projekt jest licencjonowany na podstawie licencji MIT - szczegóły znajdują się w pliku [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-service/blob/master/LICENSE)