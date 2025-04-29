---
id: wdio-reportportal-service
title: Report Portal Service
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-service är ett tredjepartspaket, för mer information se [GitHub](https://github.com/borisosipov/wdio-reportportal-service) | [npm](https://www.npmjs.com/package/wdio-reportportal-service)

## Installation
Det enklaste sättet är att behålla `wdio-reportportal-service` som en devDependency i din `package.json`.
```json
{
  "devDependencies": {
    "wdio-reportportal-service": "^7.3.0"
  }
}
```
Du kan göra det genom:

```bash
npm install wdio-reportportal-reporter --save-dev
```

Instruktioner om hur man installerar `WebdriverIO` finns [här](https://webdriver.io/docs/gettingstarted).

## Konfiguration
Konfigurera utdatakatalogen i din wdio.conf.js-fil:
```js
const RpService = require('wdio-reportportal-service');

exports.config = {
  // ...
  services: [[RpService, {}]],
  // ...
}
```

## License

Detta projekt är licensierat under MIT-licensen - se [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-service/blob/master/LICENSE) filen för detaljer