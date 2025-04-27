---
id: proxy
title: Налаштування проксі
---

Ви можете проксувати два різні типи запитів:

- з'єднання між вашим тестовим скриптом і браузерним драйвером (або кінцевою точкою WebDriver)
- з'єднання між браузером та інтернетом

## Проксі між драйвером і тестом

Якщо у вашій компанії є корпоративний проксі (наприклад, на `http://my.corp.proxy.com:9090`) для всіх вихідних запитів, виконайте наступні кроки для встановлення та налаштування [undici](https://github.com/nodejs/undici).

### Встановлення undici

```bash npm2yarn
npm install undici --save-dev
```

### Додайте undici setGlobalDispatcher до вашого конфігураційного файлу

Додайте наступну інструкцію require на початку вашого конфігураційного файлу.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy).toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Додаткову інформацію про налаштування проксі можна знайти [тут](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

Якщо ви використовуєте [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), запустіть його через:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Проксі між браузером та інтернетом

Щоб проксувати з'єднання між браузером та інтернетом, ви можете налаштувати проксі, що може бути корисним (наприклад) для захоплення мережевої інформації та інших даних за допомогою таких інструментів, як [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

Параметри `proxy` можна застосувати через стандартні можливості наступним чином:

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        // ...
        proxy: {
            proxyType: "manual",
            httpProxy: "corporate.proxy:8080",
            socksUsername: "codeceptjs",
            socksPassword: "secret",
            noProxy: "127.0.0.1,localhost"
        },
        // ...
    }],
    // ...
}
```

Для отримання додаткової інформації, дивіться [специфікацію WebDriver](https://w3c.github.io/webdriver/#proxy).