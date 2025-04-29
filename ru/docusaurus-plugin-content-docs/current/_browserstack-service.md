---
id: browserstack-service
title: Сервис Browserstack
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-browserstack-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Сервис WebdriverIO, который управляет локальным туннелем и метаданными задач для пользователей BrowserStack.

## Установка


Самый простой способ — сохранить `@wdio/browserstack-service` как devDependency в вашем файле `package.json`, используя:

```sh
npm install @wdio/browserstack-service --save-dev
```

Инструкции по установке `WebdriverIO` можно найти [здесь.](https://webdriver.io/docs/gettingstarted)


## Конфигурация

WebdriverIO имеет встроенную поддержку BrowserStack. Вам следует установить `user` и `key` в вашем файле `wdio.conf.js`. Этот плагин сервиса обеспечивает поддержку [BrowserStack Tunnel](https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/local-testing). Также установите `browserstackLocal: true` для активации этой функции.
Отчетность о статусе сессии в BrowserStack будет соответствовать настройке `strict` в опциях Cucumber.

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

## Опции

Для авторизации в сервисе BrowserStack ваша конфигурация должна содержать опции [`user`](https://webdriver.io/docs/options#user) и [`key`](https://webdriver.io/docs/options#key).

### testObservability

Test Observability — это продвинутый инструмент отчетности тестов, который дает представление о том, как улучшить ваши автоматизированные тесты и помогает быстрее отлаживать их. Он включен по умолчанию путем установки флага `testObservability` как `true` для всех пользователей browserstack-service. Вы можете отключить это, установив флаг `testObservability` в `false`.

После завершения выполнения тестов вы можете посетить [Test Observability](https://observability.browserstack.com/) для отладки ваших сборок с дополнительными данными, такими как анализ уникальных ошибок, автоматическое обнаружение нестабильных тестов и многое другое.

Вы можете использовать Test Observability, даже если не запускаете тесты на инфраструктуре BrowserStack. Даже если вы запускаете тесты на CI, локальной машине или даже на других облачных провайдерах, Test Observability все равно может генерировать интеллектуальные отчеты о тестах и продвинутую аналитику ваших тестов.

Если вы хотите использовать Test Observability без запуска тестов на инфраструктуре BrowserStack, вы можете настроить конфигурацию следующим образом:


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

Вы можете изучить все функции Test Observability в [этой песочнице](https://observability-demo.browserstack.com/) или прочитать о них подробнее [здесь](https://www.browserstack.com/docs/test-observability/overview/what-is-test-observability).

### browserstackLocal
Установите это значение в true, чтобы включить маршрутизацию соединений из облака BrowserStack через ваш компьютер.

Тип: `Boolean`<br />
По умолчанию: `false`

### forcedStop
Установите это значение в true, чтобы убить процесс BrowserStack Local по завершении, не ожидая вызова обратного вызова остановки BrowserStack Local. Это экспериментально и не должно использоваться всеми. В основном необходимо как обходное решение для [этой проблемы](https://github.com/browserstack/browserstack-local-nodejs/issues/41).

Тип: `Boolean`<br />
По умолчанию: `false`

### app

[Appium](https://appium.io/) установите это значение с путем к файлу приложения, доступным локально на вашем компьютере, чтобы использовать приложение как [тестируемое приложение](https://www.browserstack.com/docs/app-automate/appium/set-up-tests/specify-app) для сессий Appium.

Тип: `String` или `JsonObject`<br />
По умолчанию: `undefined`

Список доступных значений app:

#### path
Используйте локально доступный путь к файлу приложения в качестве тестируемого приложения для Appium.

```js
services: [
  ['browserstack', {
    app: '/path/to/local/app.apk'
    // ИЛИ
    app: {
      path: '/path/to/local/app.apk'
    }
  }]
]
```

Передача custom_id при загрузке приложения.

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
Используйте URL приложения, полученный после загрузки приложения в BrowserStack.

```js
services: [
  ['browserstack', {
    app: 'bs://<app-id>'
    // ИЛИ
    app: {
      id: 'bs://<app-id>'
    }
  }]
]
```

#### custom_id

используйте custom_id уже загруженных приложений

```js
services: [
  ['browserstack', {
    app: 'custom_id'
    // ИЛИ
    app: {
      custom_id: 'custom_id'
    }
  }]
]
```

#### shareable_id

используйте shareable_id уже загруженных приложений

```js
services: [
  ['browserstack', {
    app: 'username/custom_id'
    // ИЛИ
    app: {
      shareable_id: 'username/custom_id'
    }
  }]
]
```

### preferScenarioName

Только для Cucumber. Установите имя сессии BrowserStack Automate в имя сценария, если запущен только один сценарий.
Полезно при параллельном запуске с [wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution).

Тип: `Boolean`<br />
По умолчанию: `false`

### sessionNameFormat

Настройте формат имени сессии BrowserStack Automate.

Тип: `Function`<br />
По умолчанию (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
По умолчанию (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle

Только для Mocha. Не добавлять заголовок теста к имени сессии BrowserStack Automate.

Тип: `Boolean`<br />
По умолчанию: `false`

### sessionNamePrependTopLevelSuiteTitle

Только для Mocha. Добавить заголовок верхнего уровня набора к имени сессии BrowserStack Automate.

Тип: `Boolean`<br />
По умолчанию: `false`

### setSessionName

Автоматически устанавливает имя сессии BrowserStack Automate.

Тип: `Boolean`<br />
По умолчанию: `true`

### setSessionStatus

Автоматически устанавливает статус сессии BrowserStack Automate (passed/failed).

Тип: `Boolean`<br />
По умолчанию: `true`

### buildIdentifier

**buildIdentifier** — это уникальный идентификатор для различения каждого выполнения, который добавляется к buildName. Выберите формат buildIdentifier из доступных выражений:
* `BUILD_NUMBER`: Генерирует инкрементный счетчик с каждым выполнением
* `DATE_TIME`: Генерирует временную метку с каждым выполнением. Например, 05-Nov-19:30

```js
services: [
  ['browserstack', {
    buildIdentifier: '#${BUILD_NUMBER}'
  }]
]
```
Build Identifier поддерживает использование одного или обоих выражений вместе с любыми другими символами, что позволяет настраивать параметры форматирования.

### opts

Опции BrowserStack Local.

Тип: `Object`<br />
По умолчанию: `{}`

Список доступных модификаторов локального тестирования для передачи в качестве opts:

#### Local Identifier

Если выполняются одновременные множественные соединения локального тестирования, установите этот параметр уникально для разных процессов -

```js
opts = { localIdentifier: "randomstring" };
```

#### Verbose Logging

Для включения подробного логирования -

```js
opts = { verbose: "true" };
```

Примечание - Возможные значения для модификатора 'verbose' это '1', '2', '3' и 'true'

#### Force Local

Для маршрутизации всего трафика через локальную (вашу) машину -

```js
opts = { forceLocal: "true" };
```

#### Folder Testing

Для тестирования локальной папки вместо внутреннего сервера, укажите путь к папке в качестве значения этой опции -

```js
opts = { f: "/my/awesome/folder" };
```

#### Force Start

Для убийства других запущенных экземпляров BrowserStack Local -

```js
opts = { force: "true" };
```

#### Only Automate

Для отключения локального тестирования для Live и Screenshots и включения только Automate -

```js
opts = { onlyAutomate: "true" };
```

#### Proxy

Для использования прокси для локального тестирования -

- proxyHost: Hostname/IP прокси, остальные опции прокси игнорируются, если эта опция отсутствует
- proxyPort: Порт для прокси, по умолчанию 3128, когда используется -proxyHost
- proxyUser: Имя пользователя для подключения к прокси (только Basic Auth)
- proxyPass: Пароль для USERNAME, будет проигнорирован, если USERNAME пуст или не указан

```js
opts = {
  proxyHost: "127.0.0.1",
  proxyPort: "8000",
  proxyUser: "user",
  proxyPass: "password",
};
```

#### Local Proxy

Для использования локального прокси в локальном тестировании -

- localProxyHost: Hostname/IP прокси, остальные опции прокси игнорируются, если эта опция отсутствует
- localProxyPort: Порт для прокси, по умолчанию 8081, когда используется -localProxyHost
- localProxyUser: Имя пользователя для подключения к прокси (только Basic Auth)
- localProxyPass: Пароль для USERNAME, будет проигнорирован, если USERNAME пуст или не указан

```js
opts = {
  localProxyHost: "127.0.0.1",
  localProxyPort: "8000",
  localProxyUser: "user",
  localProxyPass: "password",
};
```

#### PAC (Proxy Auto-Configuration)

Для использования PAC (Proxy Auto-Configuration) в локальном тестировании -

- pac-file: Абсолютный путь к файлу PAC (Proxy Auto-Configuration)

```js
opts = { "pac-file": "<pac_file_abs_path>" };
```

#### Binary Path

По умолчанию обертки BrowserStack local пытаются загрузить и выполнить последнюю версию двоичного файла BrowserStack в ~/.browserstack или текущей рабочей директории или временной папке по порядку. Но вы можете переопределить это, передав аргумент -binarypath.
Путь для указания локального пути к бинарному файлу -

```js
opts = { binarypath: "/path/to/binary" };
```

#### Logfile

Чтобы сохранить логи в файл при запуске с аргументом '-v', вы можете указать путь к файлу. По умолчанию логи сохраняются в файл local.log в текущей рабочей директории.
Чтобы указать путь к файлу, куда будут сохранены логи -

```js
opts = { verbose: "true", logFile: "./local.log" };
```

----

Для получения дополнительной информации о WebdriverIO см. [домашнюю страницу](https://webdriver.io).