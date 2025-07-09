---
id: proxy
title: Налаштування проксі
---

Ви можете перенаправляти два різні типи запитів через проксі:

- з'єднання між вашим тестовим скриптом і драйвером браузера (або кінцевою точкою WebDriver)
- з'єднання між браузером та інтернетом

## Проксі між драйвером і тестом

Якщо у вашій компанії є корпоративний проксі (наприклад, на `http://my.corp.proxy.com:9090`) для всіх вихідних запитів, у вас є два варіанти налаштування WebdriverIO для використання проксі:

### Варіант 1: Використання змінних середовища (Рекомендовано)

Починаючи з WebdriverIO v9.12.0, ви можете просто встановити стандартні змінні середовища для проксі:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# Опціонально: обхід проксі для певних хостів
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

Потім запустіть тести як зазвичай. WebdriverIO автоматично використовуватиме ці змінні середовища для налаштування проксі.

### Варіант 2: Використання setGlobalDispatcher з undici

Для більш складних налаштувань проксі або якщо вам потрібен програмний контроль, ви можете використовувати метод `setGlobalDispatcher` з undici:

#### Встановіть undici

```bash npm2yarn
npm install undici --save-dev
```

#### Додайте undici setGlobalDispatcher до вашого файлу конфігурації

Додайте наступний require statement на початку вашого файлу конфігурації.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Додаткову інформацію про налаштування проксі можна знайти [тут](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

### Який метод слід використовувати?

- **Використовуйте змінні середовища**, якщо вам потрібен простий, стандартний підхід, який працює з різними інструментами і не вимагає змін у коді.
- **Використовуйте setGlobalDispatcher**, якщо вам потрібні розширені функції проксі, такі як користувацька аутентифікація, різні налаштування проксі для різних середовищ, або якщо ви хочете програмно керувати поведінкою проксі.

Обидва методи повністю підтримуються, і WebdriverIO спочатку перевірить наявність глобального диспетчера перед тим, як використовувати змінні середовища.

### Sauce Connect Proxy

Якщо ви використовуєте [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), запустіть його через:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Проксі між браузером та інтернетом

Щоб тунелювати з'єднання між браузером та інтернетом, ви можете налаштувати проксі, що може бути корисним (наприклад) для захоплення мережевої інформації та інших даних за допомогою інструментів, таких як [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

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

Для отримання додаткової інформації дивіться [специфікацію WebDriver](https://w3c.github.io/webdriver/#proxy).