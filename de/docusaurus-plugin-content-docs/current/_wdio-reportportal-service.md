---
id: wdio-reportportal-service
title: Report Portal Service
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-service ist ein Paket von Drittanbietern. Weitere Informationen finden Sie auf [GitHub](https://github.com/borisosipov/wdio-reportportal-service) | [npm](https://www.npmjs.com/package/wdio-reportportal-service)

## Installation
Der einfachste Weg ist, `wdio-reportportal-service` als devDependency in Ihrer `package.json` zu behalten.
```json
{
  "devDependencies": {
    "wdio-reportportal-service": "^7.3.0"
  }
}
```
Sie können dies tun durch:

```bash
npm install wdio-reportportal-reporter --save-dev
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier](https://webdriver.io/docs/gettingstarted).

## Konfiguration
Konfigurieren Sie das Ausgabeverzeichnis in Ihrer wdio.conf.js-Datei:
```js
const RpService = require('wdio-reportportal-service');

exports.config = {
  // ...
  services: [[RpService, {}]],
  // ...
}
```

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe die [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-service/blob/master/LICENSE) Datei für Details