---
id: wdio-reportportal-service
title: Servizio Report Portal
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-service/edit/master/README.md
---


> wdio-reportportal-service è un pacchetto di terze parti, per ulteriori informazioni consultare [GitHub](https://github.com/borisosipov/wdio-reportportal-service) | [npm](https://www.npmjs.com/package/wdio-reportportal-service)

## Installazione
Il modo più semplice è mantenere `wdio-reportportal-service` come devDependency nel tuo `package.json`.
```json
{
  "devDependencies": {
    "wdio-reportportal-service": "^7.3.0"
  }
}
```
Puoi farlo tramite:

```bash
npm install wdio-reportportal-reporter --save-dev
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui](https://webdriver.io/docs/gettingstarted).

## Configurazione
Configura la directory di output nel tuo file wdio.conf.js:
```js
const RpService = require('wdio-reportportal-service');

exports.config = {
  // ...
  services: [[RpService, {}]],
  // ...
}
```

## Licenza

Questo progetto è concesso in licenza con la Licenza MIT - vedi il file [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-service/blob/master/LICENSE) per i dettagli