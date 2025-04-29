---
id: wdio-reportportal-service
title: Сервис Report Portal
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-service это сторонний пакет, для получения дополнительной информации, пожалуйста, смотрите [GitHub](https://github.com/borisosipov/wdio-reportportal-service) | [npm](https://www.npmjs.com/package/wdio-reportportal-service)

## Installation
Самый простой способ - это использовать `wdio-reportportal-service` как devDependency в вашем `package.json`.
```json
{
  "devDependencies": {
    "wdio-reportportal-service": "^7.3.0"
  }
}
```
Вы можете сделать это так:

```bash
npm install wdio-reportportal-reporter --save-dev
```

Инструкции по установке `WebdriverIO` можно найти [здесь](https://webdriver.io/docs/gettingstarted).

## Configuration
Настройте выходной каталог в вашем файле wdio.conf.js:
```js
const RpService = require('wdio-reportportal-service');

exports.config = {
  // ...
  services: [[RpService, {}]],
  // ...
}
```

## License

Этот проект лицензирован по лицензии MIT - подробности смотрите в файле [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-service/blob/master/LICENSE)