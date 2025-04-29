---
id: wdio-nuxt-service
title: Nuxt Service Сервис
custom_edit_url: https://github.com/webdriverio-community/wdio-nuxt-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-nuxt-service является сторонним пакетом, для получения дополнительной информации посетите [GitHub](https://github.com/webdriverio-community/wdio-nuxt-service) | [npm](https://www.npmjs.com/package/wdio-nuxt-service)

Этот сервис помогает вам запустить ваше приложение при использовании [Nuxt](https://nuxt.com/) в качестве инструмента сборки. Он автоматически запускает сервер Nuxt с использованием вашего `nuxt.conf.js` перед запуском тестов.

## Установка

Если вы только начинаете работать с WebdriverIO, вы можете использовать мастер конфигурации для настройки всего:

```sh
npm init wdio@latest .
```

Он обнаружит ваш проект как проект Nuxt и установит все необходимые плагины за вас. Если вы добавляете этот сервис к существующей настройке, вы всегда можете установить его через:

```bash
npm install wdio-nuxt-service --save-dev
```

## Конфигурация

Чтобы включить сервис, просто добавьте его в список `services` в вашем файле `wdio.conf.js`, например:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['nuxt'],
    // ...
};
```

Вы можете применить параметры сервиса, передав массив с объектом конфигурации, например:

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

## Использование

Если ваша конфигурация настроена соответствующим образом, сервис установит опцию [`baseUrl`](https://webdriver.io/docs/configuration#baseurl), указывающую на ваше приложение. Вы можете перейти к нему с помощью команды [`url`](https://webdriver.io/docs/api/browser/url), например:

```ts
await browser.url('/')
await expect(browser).toHaveTitle('Welcome to Nuxt!')
await expect($('aria/Welcome to Nuxt!')).toBePresent()
```

## Опции

### `rootDir`

Корневой каталог проекта.

Тип: `string`<br />
По умолчанию: `process.cwd()`

### `dotenv`

Файл окружения, который должен быть загружен перед запуском сервера.

Тип: `string`<br />
По умолчанию: `.env`

### `hostname`

Имя хоста, на котором будет запущен сервер.

Тип: `string`<br />
По умолчанию: `localhost`

### `port`

Порт, на котором будет запущен сервер.

Тип: `number`<br />
По умолчанию: `process.env.NUXT_PORT || config.devServer.port`

### `https`

Установите значение true, если тестовый сервер должен быть запущен по https (сертификаты должны быть настроены в конфигурации Nuxt).

Тип: `boolean`<br />
По умолчанию: `false`

### `sslCert`

SSL-сертификат, который будет использоваться для запуска сервера по https.

Тип: `string`

### `sslKey`

SSL-ключ, который будет использоваться для запуска сервера по https.

Тип: `string`

----

Для получения дополнительной информации о WebdriverIO посетите [домашнюю страницу](https://webdriver.io).