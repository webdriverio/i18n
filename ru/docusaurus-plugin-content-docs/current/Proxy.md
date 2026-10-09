---
id: proxy
title: Настройка прокси
description: "Направляйте запросы через прокси — либо между вашими тестами и драйвером, либо между браузером и интернетом."
---

Через прокси можно туннелировать два разных типа запросов:

- соединение между вашим тестовым скриптом и драйвером браузера (или эндпоинтом WebDriver)
- соединение между браузером и интернетом

## Прокси между драйвером и тестом

Если в вашей компании используется корпоративный прокси (например, `http://my.corp.proxy.com:9090`) для всех исходящих запросов, у вас есть два способа настроить WebdriverIO для работы с прокси:

### Вариант 1: Использование переменных окружения (рекомендуется)

Начиная с WebdriverIO v9.12.0, вы можете просто задать стандартные переменные окружения для прокси:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# Optional: bypass proxy for certain hosts
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

Затем запускайте тесты как обычно. WebdriverIO автоматически использует эти переменные окружения для настройки прокси.

### Вариант 2: Использование setGlobalDispatcher из undici

Для более сложных конфигураций прокси или если вам нужно программное управление, вы можете использовать метод `setGlobalDispatcher` из undici:

#### Установите undici

```bash npm2yarn
npm install undici --save-dev
```

#### Добавьте setGlobalDispatcher из undici в файл конфигурации

Добавьте следующую инструкцию импорта в начало вашего файла конфигурации.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Дополнительную информацию о настройке прокси можно найти [здесь](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

### Какой способ выбрать?

- **Используйте переменные окружения**, если вам нужен простой стандартный подход, который работает с разными инструментами и не требует изменений в коде.
- **Используйте setGlobalDispatcher**, если вам нужны расширенные возможности прокси, такие как пользовательская аутентификация, разные конфигурации прокси для разных окружений, или если вы хотите программно управлять поведением прокси.

Оба способа полностью поддерживаются, при этом WebdriverIO сначала проверяет наличие глобального диспетчера, а затем использует переменные окружения.

### Sauce Connect Proxy

Если вы используете [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), запустите его следующим образом:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Прокси между браузером и интернетом

Чтобы туннелировать соединение между браузером и интернетом, вы можете настроить прокси. Это может быть полезно, например, для сбора сетевой информации и других данных с помощью таких инструментов, как [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

Параметры `proxy` можно задать через стандартные capabilities следующим образом:

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

Дополнительную информацию см. в [спецификации WebDriver](https://w3c.github.io/webdriver/#proxy).