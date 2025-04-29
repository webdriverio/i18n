---
id: wdio-reportportal-service
title: Service Report Portal
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-service/edit/master/README.md
---


> wdio-reportportal-service est un package tiers, pour plus d'informations, veuillez consulter [GitHub](https://github.com/borisosipov/wdio-reportportal-service) | [npm](https://www.npmjs.com/package/wdio-reportportal-service)

## Installation
La façon la plus simple est de garder `wdio-reportportal-service` comme devDependency dans votre `package.json`.
```json
{
  "devDependencies": {
    "wdio-reportportal-service": "^7.3.0"
  }
}
```
Vous pouvez le faire par:

```bash
npm install wdio-reportportal-reporter --save-dev
```

Les instructions sur comment installer `WebdriverIO` peuvent être trouvées [ici](https://webdriver.io/docs/gettingstarted).

## Configuration
Configurez le répertoire de sortie dans votre fichier wdio.conf.js:
```js
const RpService = require('wdio-reportportal-service');

exports.config = {
  // ...
  services: [[RpService, {}]],
  // ...
}
```

## License

Ce projet est sous licence MIT - voir le fichier [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-service/blob/master/LICENSE) pour plus de détails