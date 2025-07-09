---
id: proxy
title: Настройка прокси
---

Вы можете направить два различных типа запросов через прокси:

- соединение между вашим тестовым скриптом и драйвером браузера (или конечной точкой WebDriver)
- соединение между браузером и интернетом

## Прокси между драйвером и тестом

Если в вашей компании есть корпоративный прокси (например, на `http://my.corp.proxy.com:9090`) для всех исходящих запросов, у вас есть два варианта настройки WebdriverIO для использования прокси:

### Вариант 1: Использование переменных окружения (Рекомендуется)

Начиная с WebdriverIO v9.12.0, вы можете просто установить стандартные переменные окружения для прокси:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# Опционально: обход прокси для определенных хостов
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

Затем запустите ваши тесты как обычно. WebdriverIO автоматически использует эти переменные окружения для настройки прокси.

### Вариант 2: Использование setGlobalDispatcher из undici

Для более продвинутых конфигураций прокси или если вам нужен программный контроль, вы можете использовать метод `setGlobalDispatcher` из undici:

#### Установка undici

```bash npm2yarn
npm install undici --save-dev
```

#### Добавьте undici setGlobalDispatcher в ваш конфигурационный файл

Добавьте следующий оператор require в начало вашего конфигурационного файла.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Дополнительную информацию о настройке прокси можно найти [здесь](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

### Какой метод следует использовать?

- **Используйте переменные окружения**, если вы хотите простой, стандартный подход, который работает с различными инструментами и не требует изменений в коде.
- **Используйте setGlobalDispatcher**, если вам нужны расширенные функции прокси, такие как пользовательская аутентификация, различные конфигурации прокси для разных сред или программный контроль поведения прокси.

Оба метода полностью поддерживаются, и WebdriverIO сначала проверит наличие глобального диспетчера, прежде чем возвращаться к переменным окружения.

### Прокси Sauce Connect

Если вы используете [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), запустите его через:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Прокси между браузером и интернетом

Для перенаправления соединения между браузером и интернетом вы можете настроить прокси, что может быть полезно (например) для перехвата сетевой информации и других данных с помощью инструментов, таких как [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

Параметры `proxy` можно применить через стандартные возможности следующим образом:

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