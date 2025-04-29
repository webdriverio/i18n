---
id: browserstack-service
title: Browserstack Сервіс
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-browserstack-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Сервіс WebdriverIO, який керує локальним тунелем та метаданими завдань для користувачів BrowserStack.

## Встановлення


Найпростіший спосіб — зберегти `@wdio/browserstack-service` як devDependency у вашому `package.json` через:

```sh
npm install @wdio/browserstack-service --save-dev
```

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут.](https://webdriver.io/docs/gettingstarted)


## Конфігурація

WebdriverIO має вбудовану підтримку BrowserStack. Ви повинні встановити `user` та `key` у вашому файлі `wdio.conf.js`. Цей плагін сервісу надає підтримку для [BrowserStack Tunnel](https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/local-testing). Встановіть також `browserstackLocal: true`, щоб активувати цю функцію.
Звітування про статус сесії в BrowserStack буде відповідати налаштуванню `strict` в опціях Cucumber.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            },
            browserstackLocal: true
        }]
    ],
    // ...
};
```

## Опції

Для авторизації в сервісі BrowserStack ваша конфігурація повинна містити опції [`user`](https://webdriver.io/docs/options#user) та [`key`](https://webdriver.io/docs/options#key).

### testObservability

Test Observability — це розширений інструмент звітування про тести, який надає інформацію для покращення ваших автоматизованих тестів і допомагає швидше відлагоджувати. Він увімкнений за замовчуванням шляхом встановлення прапорця `testObservability` як `true` для всіх користувачів browserstack-service. Ви можете вимкнути це, встановивши прапорець `testObservability` як `false`.

Після завершення тестів ви можете відвідати [Test Observability](https://observability.browserstack.com/) для відлагодження своїх збірок з додатковими даними, такими як аналіз унікальних помилок, автоматичне виявлення нестабільних тестів тощо.

Ви можете використовувати Test Observability, навіть якщо не запускаєте тести на інфраструктурі BrowserStack. Навіть якщо ви запускаєте тести в CI, на локальній машині або навіть на інших хмарних провайдерах, Test Observability все одно може генерувати інтелектуальні звіти та розширену аналітику ваших тестів.

Якщо ви хочете використовувати Test Observability без запуску тестів на інфраструктурі BrowserStack, ви можете налаштувати конфігурацію наступним чином:


```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                user: process.env.BROWSERSTACK_USERNAME,
                key: process.env.BROWSERSTACK_ACCESS_KEY,
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            }
        }]
    ],
    // ...
};
```

Ви можете вивчити всі функції Test Observability в [цій пісочниці](https://observability-demo.browserstack.com/) або прочитати більше про це [тут](https://www.browserstack.com/docs/test-observability/overview/what-is-test-observability).

### browserstackLocal
Встановіть це значення як true, щоб увімкнути маршрутизацію з'єднань з хмари BrowserStack через ваш комп'ютер.

Тип: `Boolean`<br />
За замовчуванням: `false`

### forcedStop
Встановіть це значення як true, щоб примусово завершити процес BrowserStack Local при завершенні без очікування виклику зворотного виклику для зупинки BrowserStack Local. Це експериментальна функція і не повинна використовуватися всіма. В основному необхідно як обхідне рішення для [цієї проблеми](https://github.com/browserstack/browserstack-local-nodejs/issues/41).

Тип: `Boolean`<br />
За замовчуванням: `false`

### app

[Appium](https://appium.io/) встановіть це зі шляхом до файлу додатка, доступного локально на вашій машині, щоб використовувати додаток як [додаток для тестування](https://www.browserstack.com/docs/app-automate/appium/set-up-tests/specify-app) для сесій Appium.

Тип: `String` або `JsonObject`<br />
За замовчуванням: `undefined`

Список доступних значень app:

#### path
Використовуйте локально доступний шлях до файлу додатка як додаток для тестування для Appium.

```js
services: [
  ['browserstack', {
    app: '/path/to/local/app.apk'
    // OR
    app: {
      path: '/path/to/local/app.apk'
    }
  }]
]
```

Передайте custom_id під час завантаження додатка.

```js
services: [
  ['browserstack', {
    app: {
      path: '/path/to/local/app.apk',
      custom_id: 'custom_id'
    }
  }]
]
```

#### id
Використовуйте URL додатка, повернений після завантаження додатка до BrowserStack.

```js
services: [
  ['browserstack', {
    app: 'bs://<app-id>'
    // OR
    app: {
      id: 'bs://<app-id>'
    }
  }]
]
```

#### custom_id

використовуйте custom_id вже завантажених додатків

```js
services: [
  ['browserstack', {
    app: 'custom_id'
    // OR
    app: {
      custom_id: 'custom_id'
    }
  }]
]
```

#### shareable_id

використовуйте shareable_id вже завантажених додатків

```js
services: [
  ['browserstack', {
    app: 'username/custom_id'
    // OR
    app: {
      shareable_id: 'username/custom_id'
    }
  }]
]
```

### preferScenarioName

Тільки для Cucumber. Встановіть ім'я сесії BrowserStack Automate на ім'я сценарію, якщо виконується лише один сценарій.
Корисно при паралельному запуску з [wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution).

Тип: `Boolean`<br />
За замовчуванням: `false`

### sessionNameFormat

Налаштуйте формат імені сесії BrowserStack Automate.

Тип: `Function`<br />
За замовчуванням (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
За замовчуванням (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle

Тільки для Mocha. Не додавати назву тесту до імені сесії BrowserStack Automate.

Тип: `Boolean`<br />
За замовчуванням: `false`

### sessionNamePrependTopLevelSuiteTitle

Тільки для Mocha. Додати назву верхньорівневого набору тестів до імені сесії BrowserStack Automate.

Тип: `Boolean`<br />
За замовчуванням: `false`

### setSessionName

Автоматично встановлювати ім'я сесії BrowserStack Automate.

Тип: `Boolean`<br />
За замовчуванням: `true`

### setSessionStatus

Автоматично встановлювати статус сесії BrowserStack Automate (пройдено/не пройдено).

Тип: `Boolean`<br />
За замовчуванням: `true`

### buildIdentifier

**buildIdentifier** — це унікальний ідентифікатор для розрізнення кожного виконання, який додається до buildName. Виберіть формат вашого buildIdentifier з доступних виразів:
* `BUILD_NUMBER`: Генерує інкрементний лічильник з кожним виконанням
* `DATE_TIME`: Генерує часову мітку з кожним виконанням. Напр. 05-Nov-19:30

```js
services: [
  ['browserstack', {
    buildIdentifier: '#${BUILD_NUMBER}'
  }]
]
```
Build Identifier підтримує використання одного або обох виразів разом з будь-якими іншими символами, що дозволяє налаштовувати параметри форматування.

### opts

Опції BrowserStack Local.

Тип: `Object`<br />
За замовчуванням: `{}`

Список доступних модифікаторів локального тестування, які передаються як opts:

#### Local Identifier

Якщо виконуєте одночасно кілька локальних тестових з'єднань, встановіть це унікально для різних процесів -

```js
opts = { localIdentifier: "randomstring" };
```

#### Verbose Logging

Щоб увімкнути детальне логування -

```js
opts = { verbose: "true" };
```

Примітка - Можливі значення для модифікатора 'verbose' — '1', '2', '3' та 'true'

#### Force Local

Щоб маршрутизувати весь трафік через локальну (вашу) машину -

```js
opts = { forceLocal: "true" };
```

#### Folder Testing

Щоб тестувати локальну папку, а не внутрішній сервер, вкажіть шлях до папки як значення цієї опції -

```js
opts = { f: "/my/awesome/folder" };
```

#### Force Start

Щоб завершити інші запущені екземпляри BrowserStack Local -

```js
opts = { force: "true" };
```

#### Only Automate

Щоб вимкнути локальне тестування для Live та Screenshots і увімкнути лише Automate -

```js
opts = { onlyAutomate: "true" };
```

#### Proxy

Щоб використовувати проксі для локального тестування -

- proxyHost: Ім'я хоста/IP проксі, інші опції проксі ігноруються, якщо ця опція відсутня
- proxyPort: Порт для проксі, за замовчуванням 3128, коли використовується -proxyHost
- proxyUser: Ім'я користувача для підключення до проксі (тільки базова аутентифікація)
- proxyPass: Пароль для USERNAME, буде проігноровано, якщо USERNAME порожній або не вказано

```js
opts = {
  proxyHost: "127.0.0.1",
  proxyPort: "8000",
  proxyUser: "user",
  proxyPass: "password",
};
```

#### Local Proxy

Щоб використовувати локальний проксі в локальному тестуванні -

- localProxyHost: Ім'я хоста/IP проксі, інші опції проксі ігноруються, якщо ця опція відсутня
- localProxyPort: Порт для проксі, за замовчуванням 8081, коли використовується -localProxyHost
- localProxyUser: Ім'я користувача для підключення до проксі (тільки базова аутентифікація)
- localProxyPass: Пароль для USERNAME, буде проігноровано, якщо USERNAME порожній або не вказано

```js
opts = {
  localProxyHost: "127.0.0.1",
  localProxyPort: "8000",
  localProxyUser: "user",
  localProxyPass: "password",
};
```

#### PAC (Proxy Auto-Configuration)

Щоб використовувати PAC (Автоматична конфігурація проксі) в локальному тестуванні -

- pac-file: Абсолютний шлях до файлу PAC (Автоматична конфігурація проксі)

```js
opts = { "pac-file": "<pac_file_abs_path>" };
```

#### Binary Path

За замовчуванням, обгортки BrowserStack local намагаються завантажити та виконати останню версію двійкового файлу BrowserStack у ~/.browserstack, поточному робочому каталозі або тимчасовій папці за порядком. Але ви можете перевизначити це, передавши аргумент -binarypath.
Шлях для вказівки локального двійкового шляху -

```js
opts = { binarypath: "/path/to/binary" };
```

#### Logfile

Щоб зберегти журнали у файл під час запуску з аргументом '-v', ви можете вказати шлях до файлу. За замовчуванням журнали зберігаються у файлі local.log у поточному робочому каталозі.
Щоб вказати шлях до файлу, де будуть збережені журнали -

```js
opts = { verbose: "true", logFile: "./local.log" };
```

----

Для отримання додаткової інформації про WebdriverIO відвідайте [домашню сторінку](https://webdriver.io).