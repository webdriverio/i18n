---
id: static-server-service
title: Сервис статического сервера
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-static-server-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Некоторые проекты состоят только из фронтенд-ресурсов и не требуют ничего, кроме статического сервера. Этот сервис помогает запустить сервер статических файлов во время тестирования.

## Установка

Самый простой способ — добавить `@wdio/static-server-service` как `devDependency` в ваш `package.json` через:

```sh
npm install @wdio/static-server-service --save-dev
```

Инструкции по установке `WebdriverIO` можно найти [здесь](https://webdriver.io/docs/gettingstarted).

## Конфигурация

Чтобы использовать сервис статического сервера, добавьте `static-server` в массив сервисов:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['static-server'],
    // ...
};
```

## Опции

### `folders` (обязательно)

Массив путей к папкам и точек монтирования.

Тип: `Array<Object>`
Свойства:
 - mount `{String}` - URL-эндпоинт, где будет смонтирована папка.
 - path `{String}` - Путь к папке для монтирования.

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

Порт для привязки сервера.

Тип: `Number`

По умолчанию: `4567`

### `middleware`

Массив объектов промежуточного ПО. Загрузите и инициализируйте их в конфигурации, затем передайте для использования статическим сервером.

Тип: `Array<Object>`
Свойства:
 - mount `{String}` - URL-эндпоинт, где будет смонтировано промежуточное ПО.
 - middleware `<Object>` - Функция обратного вызова промежуточного ПО.

По умолчанию: `[]`

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

Для получения дополнительной информации о WebdriverIO, см. [домашнюю страницу](http://webdriver.io).