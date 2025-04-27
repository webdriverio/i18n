---
id: proxy
title: Настройка прокси
---

Вы можете пропускать два разных типа запросов через прокси:

- соединение между вашим тестовым скриптом и драйвером браузера (или конечной точкой WebDriver)
- соединение между браузером и интернетом

## Прокси между драйвером и тестом

Если в вашей компании есть корпоративный прокси (например, на `http://my.corp.proxy.com:9090`) для всех исходящих запросов, выполните следующие шаги для установки и настройки [undici](https://github.com/nodejs/undici).

### Установка undici

```bash npm2yarn
npm install undici --save-dev
```

### Добавьте undici setGlobalDispatcher в ваш конфигурационный файл

Добавьте следующий оператор require в начало вашего конфигурационного файла.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy).toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Дополнительную информацию о настройке прокси можно найти [здесь](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

Если вы используете [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), запустите его с помощью:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Прокси между браузером и интернетом

Чтобы туннелировать соединение между браузером и интернетом, вы можете настроить прокси, который может быть полезен (например) для захвата сетевой информации и других данных с помощью инструментов, таких как [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

Параметры `proxy` можно применить через стандартные capabilities следующим образом:

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

Для получения дополнительной информации см. [спецификацию WebDriver](https://w3c.github.io/webdriver/#proxy).