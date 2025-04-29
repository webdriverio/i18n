---
id: wdio-winappdriver-service
title: winappdriver Сервис
custom_edit_url: https://github.com/licanhua/wdio-winappdriver-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-winappdriver-service - это сторонний пакет, для получения дополнительной информации смотрите [GitHub](https://github.com/licanhua/wdio-winappdriver-service) | [npm](https://www.npmjs.com/package/wdio-winappdriver-service)

Этот сервис помогает вам беспрепятственно запускать сервер WinAppDriver при выполнении тестов с [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html). Он запускает [WinAppDriver](https://github.com/Microsoft/WinAppDriver) в дочернем процессе.

## Установка

```bash
npm install wdio-winappdriver-service --save-dev
```

Инструкции по установке `WebdriverIO` можно найти [здесь.](https://webdriver.io/docs/gettingstarted.html)

## Конфигурация

Чтобы использовать сервис, вам нужно добавить `winappdriver` в массив сервисов:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['winappdriver'],
    // ...
};
```

## Опции

Следующие опции можно добавить в файл wdio.conf.js. Чтобы определить опции для сервиса, вам нужно добавить сервис в список `services` следующим образом:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            // Опции сервиса WinAppDriver здесь
            // ...
        }]
    ],
    // ...
};
```

### logPath

Путь, где должны храниться все логи сервера winappdriver.

Тип: `String`

Пример:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command

Чтобы использовать собственную установку WinAppDriver, например, установленную глобально, укажите команду, которая должна быть запущена.

Тип: `String`

Пример:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            command : 'c:\\Program Files (x86)\\Windows Application Driver\\WinAppDriver.exe'
        }]
    ],
    // ...
}
```

### args

Список аргументов, передаваемых непосредственно в `WinAppDriver`.

См. [документацию](https://github.com/Microsoft/WinAppDriver) для возможных аргументов.

Тип: `Array`

По умолчанию: `[]`

Пример:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            args: ['10.0.0.10', '4723/wd/hub']
        }]
    ],
    // ...
}
```