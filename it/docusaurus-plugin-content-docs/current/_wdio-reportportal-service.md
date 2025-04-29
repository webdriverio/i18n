---
id: wdio-reportportal-service
title: Servizio Report Portal
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-service è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/borisosipov/wdio-reportportal-service) | [npm](https://www.npmjs.com/package/wdio-reportportal-service)

## Installation
Il modo più semplice è mantenere `wdio-reportportal-service` come devDependency nel tuo `package.json`.
```json
{
  "devDependencies": {
    "wdio-reportportal-service": "^7.3.0"
  }
}
```
Puoi farlo con:

```bash
npm install wdio-reportportal-reporter --save-dev
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui](https://webdriver.io/docs/gettingstarted).

## Configuration
Configura la directory di output nel tuo file wdio.conf.js:
```js
const RpService = require('wdio-reportportal-service');

exports.config = {
  // ...
  services: [[RpService, {}]],
  // ...
}
```

## License

Questo progetto è concesso in licenza secondo la Licenza MIT - vedere il file [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-service/blob/master/LICENSE) per i dettagli