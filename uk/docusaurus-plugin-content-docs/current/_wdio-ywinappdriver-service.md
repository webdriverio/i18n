---
id: wdio-ywinappdriver-service
title: Сервіс ywinappdriver
custom_edit_url: https://github.com/licanhua/wdio-ywinappdriver-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-ywinappdriver-service є пакетом від сторонніх розробників, для отримання додаткової інформації відвідайте [GitHub](https://github.com/licanhua/wdio-ywinappdriver-service) | [npm](https://www.npmjs.com/package/wdio-ywinappdriver-service)

Цей сервіс допомагає вам безперебійно запускати сервер ywinappdriver під час тестування за допомогою [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html). Він запускає [ywinappdriver](https://github.com/licanhua/YWinAppDriver) як дочірній процес.

## Встановлення

```bash
npm install wdio-ywinappdriver-service --save-dev
```

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут.](https://webdriver.io/docs/gettingstarted.html)

## Конфігурація

Щоб використовувати сервіс, потрібно додати `ywinappdriver` до масиву сервісів:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['ywinappdriver'],
    // ...
};
```

## Опції

Наступні опції можна додати до файлу wdio.conf.js. Щоб визначити опції для сервісу, вам потрібно додати сервіс до списку `services` наступним чином:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            // опції сервісу ywinappdriver тут
            // ...
        }]
    ],
    // ...
};
```

### logPath

Шлях, де мають зберігатися всі журнали сервера ywinappdriver.

Тип: `String`

Приклад:

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

Щоб використовувати власну інсталяцію winappdriver, наприклад глобально встановлену, вкажіть команду, яку слід запустити.

Тип: `String`

Приклад:

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

Список аргументів, переданих безпосередньо в `ywinappdriver`.

Дивіться [документацію](https://github.com/licanhua/ywinappdriver) для можливих аргументів.

Тип: `Array`

За замовчуванням: `[]`

Приклад:

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