---
id: static-server-service
title: Служба Статичного Сервера
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-static-server-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Деякі проекти складаються лише з фронтенд-ресурсів та не потребують нічого більше, ніж статичний сервер. Ця служба допомагає запустити сервер статичних файлів під час тестування.

## Встановлення

Найпростіший спосіб - додати `@wdio/static-server-service` як `devDependency` у вашому `package.json`, через:

```sh
npm install @wdio/static-server-service --save-dev
```

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут](https://webdriver.io/docs/gettingstarted).

## Конфігурація

Щоб використовувати службу статичного сервера, додайте `static-server` до масиву служб:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['static-server'],
    // ...
};
```

## Параметри

### `folders` (обов'язковий)

Масив шляхів до папок та точок монтування.

Тип: `Array<Object>`
Властивості:
 - mount `{String}` - URL-кінцева точка, де буде змонтована папка.
 - path `{String}` - Шлях до папки для монтування.

``` javascript
 // wdio.conf.js
 export const config = {
    // ...
    services: [
        ['static-server', {
            folders: [
                { mount: '/fixtures', path: './tests/fixtures' },
                { mount: '/dist', path: './dist' },
            ]
        }]
    ],
    // ...
 };
```

### `port`

Порт для прив'язки сервера.

Тип: `Number`

За замовчуванням: `4567`

### `middleware`

Масив об'єктів проміжного програмного забезпечення. Завантажте та ініціалізуйте їх у конфігурації та передайте для використання статичним сервером.

Тип: `Array<Object>`
Властивості:
 - mount `{String}` - URL-кінцева точка, де буде змонтовано проміжне програмне забезпечення.
 - middleware `<Object>` - Функція зворотного виклику проміжного програмного забезпечення.

За замовчуванням: `[]`

``` javascript
// wdio.conf.js
import middleware from 'middleware-package'

export const config = {
    // ...
    services: [
        ['static-server', {
            middleware: [{
                mount: '/',
                middleware: middleware(/* middleware options */),
            }],
        }]
    ],
    // ...
};
```

----

Для отримання додаткової інформації про WebdriverIO відвідайте [домашню сторінку](http://webdriver.io).