---
id: wdio-nuxt-service
title: Nuxt Service Service
custom_edit_url: https://github.com/webdriverio-community/wdio-nuxt-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-nuxt-service є пакетом від сторонніх розробників, для отримання додаткової інформації перегляньте [GitHub](https://github.com/webdriverio-community/wdio-nuxt-service) | [npm](https://www.npmjs.com/package/wdio-nuxt-service)

Цей сервіс допомагає запустити вашу програму при використанні [Nuxt](https://nuxt.com/) як інструменту збірки. Він автоматично запускає сервер Nuxt, використовуючи ваш `nuxt.conf.js` перед запуском тесту.

## Встановлення

Якщо ви тільки починаєте роботу з WebdriverIO, ви можете використовувати майстер конфігурації для налаштування всього:

```sh
npm init wdio@latest .
```

Він визначить ваш проект як проект Nuxt і встановить всі необхідні плагіни для вас. Якщо ви додаєте цей сервіс до існуючого налаштування, ви завжди можете встановити його через:

```bash
npm install wdio-nuxt-service --save-dev
```

## Конфігурація

Щоб увімкнути сервіс, просто додайте його до списку `services` у вашому файлі `wdio.conf.js`, наприклад:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['nuxt'],
    // ...
};
```

Ви можете застосувати параметри сервісу, передавши масив з об'єктом конфігурації, наприклад:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['nuxt', {
            rootDir: './packages/nuxt'
        }]
    ],
    // ...
};
```

## Використання

Якщо ваша конфігурація налаштована відповідним чином, сервіс встановить опцію [`baseUrl`](https://webdriver.io/docs/configuration#baseurl), щоб вказати на вашу програму. Ви можете перейти до неї за допомогою команди [`url`](https://webdriver.io/docs/api/browser/url), наприклад:

```ts
await browser.url('/')
await expect(browser).toHaveTitle('Welcome to Nuxt!')
await expect($('aria/Welcome to Nuxt!')).toBePresent()
```

## Опції

### `rootDir`

Кореневий каталог проекту.

Тип: `string`<br />
За замовчуванням: `process.cwd()`

### `dotenv`

Файл середовища, який буде завантажено перед запуском сервера.

Тип: `string`<br />
За замовчуванням: `.env`

### `hostname`

Ім'я хоста, на якому буде запущено сервер.

Тип: `string`<br />
За замовчуванням: `localhost`

### `port`

Порт, на якому буде запущено сервер.

Тип: `number`<br />
За замовчуванням: `process.env.NUXT_PORT || config.devServer.port`

### `https`

Встановіть значення true, якщо тестовий сервер повинен бути запущений по https (сертифікати потрібно налаштувати в конфігурації Nuxt).

Тип: `boolean`<br />
За замовчуванням: `false`

### `sslCert`

SSL-сертифікат, який буде використовуватися для запуску сервера по https.

Тип: `string`

### `sslKey`

SSL-ключ, який буде використовуватися для запуску сервера по https.

Тип: `string`

----

Для отримання додаткової інформації про WebdriverIO перегляньте [домашню сторінку](https://webdriver.io).