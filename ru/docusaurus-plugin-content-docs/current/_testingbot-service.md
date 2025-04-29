---
id: testingbot-service
title: Сервис Testingbot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-testingbot-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Сервис WebdriverIO, который обеспечивает лучшую интеграцию с TestingBot. Он обновляет метаданные задания ('name', 'passed', 'tags', 'public', 'build', 'extra') и запускает TestingBot Tunnel при необходимости.

## Установка

Самый простой способ - это хранить `@wdio/testingbot-service` как devDependency в вашем файле `package.json`, через:

```sh
npm install @wdio/testingbot-service --save-dev
```

Инструкции по установке `WebdriverIO` можно найти [здесь.](https://webdriver.io/docs/gettingstarted)

## Конфигурация

Чтобы использовать сервис, вам нужно установить `user` и `key` в вашем файле `wdio.conf.js` и установить опцию `hostname` на `hub.testingbot.com`. Если вы хотите использовать [TestingBot Tunnel](https://testingbot.com/support/other/tunnel), вам нужно установить `tbTunnel: true`.

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

## Опции

Для авторизации сервиса TestingBot ваша конфигурация должна содержать опции [`user`](https://webdriver.io/docs/options#user) и [`key`](https://webdriver.io/docs/options#key).

### tbTunnel
Если значение true, запускает TestingBot Tunnel и открывает безопасное соединение между виртуальной машиной TestingBot, на которой выполняются ваши браузерные тесты.

Тип: `Boolean`<br />
По умолчанию: `false`

### tbTunnelOpts
Применяет опции TestingBot Tunnel (например, для изменения номера порта или настроек файла журнала). Подробнее смотрите [этот список](https://github.com/testingbot/testingbot-tunnel-launcher).

Тип: `Object`<br />
По умолчанию: `{}`