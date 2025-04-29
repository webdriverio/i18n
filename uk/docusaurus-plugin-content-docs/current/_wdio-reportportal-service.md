---
id: wdio-reportportal-service
title: Сервіс Report Portal
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-service є пакетом від сторонніх розробників, для отримання додаткової інформації відвідайте [GitHub](https://github.com/borisosipov/wdio-reportportal-service) | [npm](https://www.npmjs.com/package/wdio-reportportal-service)

## Installation
Найпростіший спосіб — зберігати `wdio-reportportal-service` як devDependency у вашому `package.json`.
```json
{
  "devDependencies": {
    "wdio-reportportal-service": "^7.3.0"
  }
}
```
Ви можете зробити це за допомогою:

```bash
npm install wdio-reportportal-reporter --save-dev
```

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут](https://webdriver.io/docs/gettingstarted).

## Configuration
Налаштуйте вихідний каталог у вашому файлі wdio.conf.js:
```js
const RpService = require('wdio-reportportal-service');

exports.config = {
  // ...
  services: [[RpService, {}]],
  // ...
}
```

## License

Цей проект ліцензовано за ліцензією MIT — перегляньте файл [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-service/blob/master/LICENSE) для отримання детальної інформації