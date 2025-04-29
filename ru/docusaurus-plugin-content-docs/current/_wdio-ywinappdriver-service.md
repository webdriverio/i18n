---
id: wdio-ywinappdriver-service
title: Сервис ywinappdriver
custom_edit_url: https://github.com/licanhua/wdio-ywinappdriver-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-ywinappdriver-service это сторонний пакет, для получения дополнительной информации см. [GitHub](https://github.com/licanhua/wdio-ywinappdriver-service) | [npm](https://www.npmjs.com/package/wdio-ywinappdriver-service)

Этот сервис помогает вам запускать сервер ywinappdriver без проблем при выполнении тестов с помощью [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html). Он запускает [ywinappdriver](https://github.com/licanhua/YWinAppDriver) в дочернем процессе.

## Установка

```bash
npm install wdio-ywinappdriver-service --save-dev
```

Инструкции по установке `WebdriverIO` можно найти [здесь.](https://webdriver.io/docs/gettingstarted.html)

## Конфигурация

Чтобы использовать сервис, вам нужно добавить `ywinappdriver` в массив сервисов:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['ywinappdriver'],
    // ...
};
```

## Опции

Следующие опции могут быть добавлены в файл wdio.conf.js. Чтобы определить опции для сервиса, вам нужно добавить сервис в список `services` следующим образом:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            // опции сервиса ywinappdriver здесь
            // ...
        }]
    ],
    // ...
};
```

### logPath

Путь, где должны храниться все логи сервера ywinappdriver.

Тип: `String`

Пример:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command

Чтобы использовать собственную установку winappdriver, например, глобально установленную, укажите команду, которая должна быть запущена.

Тип: `String`

Пример:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            command : 'c:\\xx\\ywinappdriver.exe'
        }]
    ],
    // ...
}
```

### args

Список аргументов, передаваемых непосредственно в `ywinappdriver`.

См. [документацию](https://github.com/licanhua/ywinappdriver) для возможных аргументов.

Тип: `Array`

По умолчанию: `[]`

Пример:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            args: ['--urls' 'http://127.0.0.1:4723' '--basepath' '/wd/hub']
        }]
    ],
    // ...
}
```
```