---
id: wdio-winappdriver-service
title: winappdriver Service
custom_edit_url: https://github.com/licanhua/wdio-winappdriver-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-winappdriver-service є пакетом сторонніх розробників, для отримання додаткової інформації перегляньте [GitHub](https://github.com/licanhua/wdio-winappdriver-service) | [npm](https://www.npmjs.com/package/wdio-winappdriver-service)

Цей сервіс допомагає вам безперешкодно запускати сервер WinAppDriver при виконанні тестів з [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html). Він запускає [WinAppDriver](https://github.com/Microsoft/WinAppDriver) у дочірньому процесі.

## Встановлення

```bash
npm install wdio-winappdriver-service --save-dev
```

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут.](https://webdriver.io/docs/gettingstarted.html)

## Конфігурація

Щоб використовувати сервіс, вам потрібно додати `winappdriver` до вашого масиву сервісів:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['winappdriver'],
    // ...
};
```

## Опції

Наступні опції можна додати до файлу wdio.conf.js. Щоб визначити опції для сервісу, вам потрібно додати сервіс до списку `services` таким чином:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            // WinAppDriver service options here
            // ...
        }]
    ],
    // ...
};
```

### logPath

Шлях, куди мають зберігатися всі логи з сервера winappdriver.

Тип: `String`

Приклад:

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

Щоб використовувати власну інсталяцію WinAppDriver, наприклад, глобально встановлену, вкажіть команду, яку слід запустити.

Тип: `String`

Приклад:

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

Список аргументів, переданих безпосередньо до `WinAppDriver`.

Дивіться [документацію](https://github.com/Microsoft/WinAppDriver) для можливих аргументів.

Тип: `Array`

За замовчуванням: `[]`

Приклад:

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