---
id: cloudservices
title: Использование облачных сервисов
description: "Запуск тестов WebdriverIO в Sauce Labs, BrowserStack, TestingBot, TestMu AI (ранее LambdaTest), Perfecto и у других облачных провайдеров."
---

Использовать сервисы по запросу, такие как Sauce Labs, Browserstack, TestingBot, TestMu AI (ранее LambdaTest) или Perfecto, вместе с WebdriverIO довольно просто. Всё, что нужно сделать, — указать `user` и `key` вашего сервиса в настройках.

При желании вы также можете параметризовать тест, задав специфичные для облака capabilities, например `build`. Если вы хотите запускать облачные сервисы только в Travis, можно использовать переменную окружения `CI`, чтобы проверить, выполняется ли код в Travis, и соответствующим образом изменить конфигурацию.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

Вы можете настроить удалённый запуск тестов в [Sauce Labs](https://saucelabs.com).

Единственное требование — указать в конфигурации (экспортируемой из `wdio.conf.js` или передаваемой в `webdriverio.remote(...)`) в качестве `user` и `key` ваше имя пользователя и ключ доступа Sauce Labs.

Вы также можете передать любую необязательную [опцию конфигурации теста](https://docs.saucelabs.com/dev/test-configuration-options/) в виде пары ключ/значение в capabilities для любого браузера.

### Sauce Connect

Если вы хотите запускать тесты на сервере, недоступном из интернета (например, на `localhost`), вам необходимо использовать [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy).

Поддержка этого выходит за рамки WebdriverIO, поэтому запускать его придётся самостоятельно.

Если вы используете тестраннер WDIO, загрузите и настройте [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) в вашем `wdio.conf.js`. Он помогает запустить Sauce Connect и предоставляет дополнительные возможности для лучшей интеграции ваших тестов с сервисом Sauce.

### С Travis CI

Однако Travis CI [поддерживает](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) запуск Sauce Connect перед каждым тестом, поэтому можно следовать их инструкциям.

В этом случае необходимо задать опцию конфигурации теста `tunnel-identifier` в `capabilities` каждого браузера. По умолчанию Travis устанавливает её равной значению переменной окружения `TRAVIS_JOB_NUMBER`.

Кроме того, если вы хотите, чтобы Sauce Labs группировал ваши тесты по номеру сборки, можно установить `build` равным `TRAVIS_BUILD_NUMBER`.

Наконец, если вы зададите `name`, это изменит название данного теста в Sauce Labs для этой сборки. Если вы используете тестраннер WDIO вместе с [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service), WebdriverIO автоматически задаёт подходящее имя для теста.

Пример `capabilities`:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### Тайм-ауты

Поскольку тесты запускаются удалённо, может потребоваться увеличить некоторые тайм-ауты.

Вы можете изменить [тайм-аут простоя](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout), передав `idle-timeout` в качестве опции конфигурации теста. Она определяет, как долго Sauce будет ждать между командами, прежде чем закрыть соединение.

## BrowserStack

WebdriverIO также имеет встроенную интеграцию с [Browserstack](https://www.browserstack.com).

Единственное требование — указать в конфигурации (экспортируемой из `wdio.conf.js` или передаваемой в `webdriverio.remote(...)`) в качестве `user` и `key` ваше имя пользователя и ключ доступа Browserstack Automate.

Вы также можете передать любые необязательные [поддерживаемые capabilities](https://www.browserstack.com/automate/capabilities) в виде пар ключ/значение в capabilities для любого браузера. Если установить `browserstack.debug` в `true`, будет записан скринкаст сессии, что может быть полезно.

### Локальное тестирование

Если вы хотите запускать тесты на сервере, недоступном из интернета (например, на `localhost`), вам необходимо использовать [Local Testing](https://www.browserstack.com/local-testing#command-line).

Поддержка этого выходит за рамки WebdriverIO, поэтому запускать его необходимо самостоятельно.

Если вы используете локальное тестирование, следует установить `browserstack.local` в `true` в ваших capabilities.

Если вы используете тестраннер WDIO, загрузите и настройте [`@wdio/browserstack-service`](https://github.com/browserstack/wdio-browserstack-service) в вашем `wdio.conf.js`. Он помогает запустить BrowserStack и предоставляет дополнительные возможности для лучшей интеграции ваших тестов с сервисом BrowserStack.

### С Travis CI

Если вы хотите добавить локальное тестирование в Travis, запускать его придётся самостоятельно.

Следующий скрипт загрузит его и запустит в фоновом режиме. Его следует выполнить в Travis перед запуском тестов.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

Также вы можете установить `build` равным номеру сборки Travis.

Пример `capabilities`:

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

Единственное требование — указать в конфигурации (экспортируемой из `wdio.conf.js` или передаваемой в `webdriverio.remote(...)`) в качестве `user` и `key` ваше имя пользователя и секретный ключ [TestingBot](https://testingbot.com).

Вы также можете передать любые необязательные [поддерживаемые capabilities](https://testingbot.com/support/other/test-options) в виде пар ключ/значение в capabilities для любого браузера.

### Локальное тестирование

Если вы хотите запускать тесты на сервере, недоступном из интернета (например, на `localhost`), вам необходимо использовать [Local Testing](https://testingbot.com/support/other/tunnel). TestingBot предоставляет туннель на основе Java, позволяющий тестировать веб-сайты, недоступные из интернета.

На их странице поддержки туннеля содержится вся информация, необходимая для его настройки и запуска.

Если вы используете тестраннер WDIO, загрузите и настройте [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) в вашем `wdio.conf.js`. Он помогает запустить TestingBot и предоставляет дополнительные возможности для лучшей интеграции ваших тестов с сервисом TestingBot.

## TestMu AI (ранее LambdaTest)

Интеграция с [TestMu AI](https://www.testmuai.com/) также встроена.

Единственное требование — указать в конфигурации (экспортируемой из `wdio.conf.js` или передаваемой в `webdriverio.remote(...)`) в качестве `user` и `key` имя пользователя и ключ доступа вашей учётной записи TestMu AI.

Вы также можете передать любые необязательные [поддерживаемые capabilities](https://www.testmuai.com/capabilities-generator/) в виде пар ключ/значение в capabilities для любого браузера. Если установить `visual` в `true`, будет записан скринкаст сессии, что может быть полезно.

### Туннель для локального тестирования

Если вы хотите запускать тесты на сервере, недоступном из интернета (например, на `localhost`), вам необходимо использовать [Local Testing](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/).

Поддержка этого выходит за рамки WebdriverIO, поэтому запускать его необходимо самостоятельно.

Если вы используете локальное тестирование, следует установить `tunnel` в `true` в ваших capabilities.

Если вы используете тестраннер WDIO, загрузите и настройте [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) в вашем `wdio.conf.js`. Он помогает запустить TestMu AI и предоставляет дополнительные возможности для лучшей интеграции ваших тестов с сервисом TestMu AI.

### С Travis CI

Если вы хотите добавить локальное тестирование в Travis, запускать его придётся самостоятельно.

Следующий скрипт загрузит его и запустит в фоновом режиме. Его следует выполнить в Travis перед запуском тестов.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

Также вы можете установить `build` равным номеру сборки Travis.

Пример `capabilities`:

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

При использовании wdio с [`Perfecto`](https://www.perfecto.io) необходимо создать токен безопасности для каждого пользователя и добавить его в структуру capabilities (в дополнение к другим capabilities) следующим образом:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

Кроме того, необходимо добавить конфигурацию облака следующим образом:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```

## RobotActions

[RobotActions](https://robotactions.com) предоставляет реальные устройства Android и iOS наряду с браузерными узлами за единой точкой доступа. Аутентификация выполняется с помощью API-токена, а не пары `user` и `key`. Передавайте токен в заголовке bearer:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: '/',
  headers: {
    Authorization: `Bearer ${process.env.RA_API_TOKEN}`
  },
  capabilities: [{
    browserName: 'chrome'
  }]
}
```

В качестве альтернативы можно передать токен как префикс пути, который грид удаляет перед перенаправлением запроса:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: `/t/${process.env.RA_API_TOKEN}/`,
  capabilities: [{
    browserName: 'chrome'
  }]
}
```

Грид также принимает учётные данные, встроенные в URL (`https://user:token@host`), для других клиентов WebDriver, однако эту форму нельзя использовать в WebdriverIO: он основан на fetch, а Node.js отклоняет URL со встроенными учётными данными.

Чтобы запустить тесты на реальном устройстве, передайте браузер как capability Appium вместе с любым из описанных выше способов подключения:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: '/',
  headers: {
    Authorization: `Bearer ${process.env.RA_API_TOKEN}`
  },
  capabilities: [{
    platformName: 'Android',
    'appium:browserName': 'chrome',
    'appium:automationName': 'UiAutomator2'
  }]
}
```