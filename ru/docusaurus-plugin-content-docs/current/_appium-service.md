---
id: appium-service
title: Сервис Appium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-appium-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Управление сервером Appium выходит за рамки проекта WebdriverIO. Этот сервис помогает вам запускать сервер Appium без проблем при запуске тестов с помощью [WDIO testrunner](https://webdriver.io/docs/clioptions). Он запускает [сервер Appium](https://appium.github.io/appium.io/docs/en/about-appium/getting-started/index.html#starting-appium) в дочернем процессе.

## Установка

Самый простой способ - оставить `@wdio/appium-service` как devDependency в вашем `package.json`, через:

```sh
npm install @wdio/appium-service --save-dev
```

Инструкции по установке `WebdriverIO` можно найти [здесь.](https://webdriver.io/docs/gettingstarted)

## Конфигурация

Чтобы использовать сервис, вам нужно добавить `appium` в массив сервисов:

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // стандартный порт appium
    services: ['appium'],
    // ...
};
```

## Опции

Следующие опции можно добавить в файл wdio.conf.js. Чтобы определить опции для сервиса, вам нужно добавить сервис в список `services` следующим образом:

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // стандартный порт appium
    services: [
        ['appium', {
            // Опции сервиса Appium здесь
            // ...
        }]
    ],
    // ...
};
```

### logPath
Путь, где должны храниться все логи с сервера Appium.

Тип: `String`

Пример:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command
Чтобы использовать вашу установку Appium, например, глобально установленную, укажите команду, которая должна быть запущена.

Тип: `String`

Пример:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            command : 'appium'
        }]
    ],
    // ...
}
```

### args
Карта аргументов для сервера Appium, передаваемых непосредственно в `appium`.

См. [документацию](https://github.com/appium/appium/blob/master/packages/appium/docs/en/cli/args.md) для возможных аргументов.
Аргументы указываются в нижнем верблюжьем регистре. Например, `debugLogSpacing: true` преобразуется в `--debug-log-spacing`, или они могут быть указаны как описано в документации Appium.

Тип: `Object`

По умолчанию: `{}`

Пример:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            args: {
                // ...
                debugLogSpacing: true,
                platformName: 'iOS'
                // ...
            }
        }]
    ],
    // ...
}
```
**Примечание:** Использование псевдонимов не рекомендуется и не поддерживается. Вместо этого, пожалуйста, используйте полное имя свойства в нижнем верблюжьем регистре.

----

Для получения дополнительной информации о WebdriverIO см. [домашнюю страницу](https://webdriver.io).