---
id: testingbot-service
title: Сервіс Testingbot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-testingbot-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Сервіс WebdriverIO, який забезпечує кращу інтеграцію з TestingBot. Він оновлює метадані завдання ('name', 'passed', 'tags', 'public', 'build', 'extra') та запускає TestingBot Tunnel за потреби.

## Встановлення

Найпростіший спосіб — зберегти `@wdio/testingbot-service` як devDependency у вашому файлі `package.json`, через:

```sh
npm install @wdio/testingbot-service --save-dev
```

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут.](https://webdriver.io/docs/gettingstarted)

## Конфігурація

Щоб використовувати сервіс, вам потрібно встановити `user` та `key` у вашому файлі `wdio.conf.js` та встановити опцію `hostname` на `hub.testingbot.com`. Якщо ви хочете використовувати [TestingBot Tunnel](https://testingbot.com/support/other/tunnel),
вам потрібно встановити `tbTunnel: true`.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.TB_KEY,
    key: process.env.TB_SECRET,
    services: [
        ['testingbot', {
            tbTunnel: true
        }]
    ],
    // ...
};
```

## Опції

Для авторизації сервісу TestingBot ваша конфігурація повинна містити опції [`user`](https://webdriver.io/docs/options#user) та [`key`](https://webdriver.io/docs/options#key).

### tbTunnel
Якщо встановлено значення true, запускає TestingBot Tunnel і відкриває безпечне з'єднання між віртуальною машиною TestingBot, яка запускає ваші тести браузера.

Тип: `Boolean`<br />
За замовчуванням: `false`

### tbTunnelOpts
Застосовує опції TestingBot Tunnel (наприклад, для зміни номера порту або налаштувань logFile). Дивіться [цей список](https://github.com/testingbot/testingbot-tunnel-launcher) для отримання додаткової інформації.

Тип: `Object`<br />
За замовчуванням: `{}`