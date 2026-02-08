---
id: cloudservices
title: Использование облачных сервисов
---

Использование сервисов по требованию, таких как Sauce Labs, Browserstack, TestingBot, TestMu AI (ранее LambdaTest) или Perfecto с WebdriverIO, довольно просто. Всё, что вам нужно сделать, это указать в настройках `user` и `key` вашего сервиса.

Опционально вы также можете параметризовать ваш тест, установив специфичные для облачного сервиса возможности, такие как `build`. Если вы хотите запускать облачные сервисы только в Travis, вы можете использовать переменную окружения `CI`, чтобы проверить, находитесь ли вы в Travis, и соответствующим образом изменить конфигурацию.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

Вы можете настроить свои тесты для удаленного запуска в [Sauce Labs](https://saucelabs.com).

Единственное требование — установить `user` и `key` в вашей конфигурации (либо экспортированной из `wdio.conf.js`, либо переданной в `webdriverio.remote(...)`) с вашим именем пользователя Sauce Labs и ключом доступа.

Вы также можете передать любые опциональные [параметры конфигурации тестов](https://docs.saucelabs.com/dev/test-configuration-options/) в виде ключ/значение в capabilities для любого браузера.

### Sauce Connect

Если вы хотите запускать тесты против сервера, который недоступен из Интернета (например, на `localhost`), вам нужно использовать [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy).

Поддержка этого выходит за рамки WebdriverIO, поэтому вам придется запустить его самостоятельно.

Если вы используете тест-раннер WDIO, скачайте и настройте [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) в вашем `wdio.conf.js`. Он поможет запустить Sauce Connect и имеет дополнительные функции, которые лучше интегрируют ваши тесты в сервис Sauce.

### С Travis CI

Travis CI имеет [поддержку](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) для запуска Sauce Connect перед каждым тестом, поэтому следование их инструкциям является вариантом.

Если вы делаете это, вы должны установить параметр конфигурации теста `tunnel-identifier` в `capabilities` каждого браузера. Travis устанавливает его по умолчанию в переменную окружения `TRAVIS_JOB_NUMBER`.

Кроме того, если вы хотите, чтобы Sauce Labs группировал ваши тесты по номеру сборки, вы можете установить `build` в `TRAVIS_BUILD_NUMBER`.

Наконец, если вы установите `name`, это изменит имя этого теста в Sauce Labs для этой сборки. Если вы используете тест-раннер WDIO вместе с [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service), WebdriverIO автоматически устанавливает правильное имя для теста.

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

Поскольку вы запускаете тесты удаленно, может потребоваться увеличение некоторых тайм-аутов.

Вы можете изменить [тайм-аут бездействия](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout), передав `idle-timeout` как параметр конфигурации теста. Это контролирует, как долго Sauce будет ждать между командами, прежде чем закрыть соединение.

## BrowserStack

WebdriverIO также имеет встроенную интеграцию с [Browserstack](https://www.browserstack.com).

Единственное требование — установить `user` и `key` в вашей конфигурации (либо экспортированной из `wdio.conf.js`, либо переданной в `webdriverio.remote(...)`) с вашим именем пользователя и ключом доступа Browserstack automate.

Вы также можете передать любые опциональные [поддерживаемые возможности](https://www.browserstack.com/automate/capabilities) в виде ключ/значение в capabilities для любого браузера. Если вы установите `browserstack.debug` в `true`, это запишет скринкаст сессии, что может быть полезно.

### Локальное тестирование

Если вы хотите запускать тесты против сервера, который недоступен из Интернета (например, на `localhost`), вам нужно использовать [Локальное тестирование](https://www.browserstack.com/local-testing#command-line).

Поддержка этого выходит за рамки WebdriverIO, поэтому вы должны запустить его самостоятельно.

Если вы используете локальное тестирование, вам следует установить `browserstack.local` в `true` в ваших capabilities.

Если вы используете тест-раннер WDIO, скачайте и настройте [`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service) в вашем `wdio.conf.js`. Он помогает запустить BrowserStack и имеет дополнительные функции, которые лучше интегрируют ваши тесты в сервис BrowserStack.

### С Travis CI

Если вы хотите добавить Локальное тестирование в Travis, вам придется запустить его самостоятельно.

Следующий скрипт загрузит и запустит его в фоновом режиме. Вы должны запустить его в Travis перед началом тестов.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

Также вы можете установить `build` в номер сборки Travis.

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

Единственное требование — установить `user` и `key` в вашей конфигурации (либо экспортированной из `wdio.conf.js`, либо переданной в `webdriverio.remote(...)`) с вашим именем пользователя и секретным ключом [TestingBot](https://testingbot.com).

Вы также можете передать любые опциональные [поддерживаемые возможности](https://testingbot.com/support/other/test-options) в виде ключ/значение в capabilities для любого браузера.

### Локальное тестирование

Если вы хотите запускать тесты против сервера, который недоступен из Интернета (например, на `localhost`), вам нужно использовать [Локальное тестирование](https://testingbot.com/support/other/tunnel). TestingBot предоставляет туннель на базе Java, позволяющий тестировать веб-сайты, недоступные из Интернета.

Их страница поддержки туннелей содержит информацию, необходимую для его запуска.

Если вы используете тест-раннер WDIO, скачайте и настройте [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) в вашем `wdio.conf.js`. Он помогает запустить TestingBot и имеет дополнительные функции, которые лучше интегрируют ваши тесты в сервис TestingBot.

## TestMu AI (ранее LambdaTest)

Интеграция с [TestMu AI](https://www.testmuai.com/) также встроена.

Единственное требование — установить `user` и `key` в вашей конфигурации (либо экспортированной из `wdio.conf.js`, либо переданной в `webdriverio.remote(...)`) с именем пользователя и ключом доступа вашей учетной записи TestMu AI.

Вы также можете передать любые опциональные [поддерживаемые возможности](https://www.testmuai.com/capabilities-generator/) в виде ключ/значение в capabilities для любого браузера. Если вы установите `visual` в `true`, это запишет скринкаст сессии, что может быть полезно.

### Туннель для локального тестирования

Если вы хотите запускать тесты против сервера, который недоступен из Интернета (например, на `localhost`), вам нужно использовать [Локальное тестирование](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/).

Поддержка этого выходит за рамки WebdriverIO, поэтому вы должны запустить его самостоятельно.

Если вы используете локальное тестирование, вам следует установить `tunnel` в `true` в ваших capabilities.

Если вы используете тест-раннер WDIO, скачайте и настройте [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) в вашем `wdio.conf.js`. Он помогает запустить TestMu AI и имеет дополнительные функции, которые лучше интегрируют ваши тесты в сервис TestMu AI.

### С Travis CI

Если вы хотите добавить Локальное тестирование в Travis, вам придется запустить его самостоятельно.

Следующий скрипт загрузит и запустит его в фоновом режиме. Вы должны запустить его в Travis перед началом тестов.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

Также вы можете установить `build` в номер сборки Travis.

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

При использовании wdio с [`Perfecto`](https://www.perfecto.io) вам нужно создать токен безопасности для каждого пользователя и добавить его в структуру capabilities (в дополнение к другим capabilities), следующим образом:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

Кроме того, вам нужно добавить конфигурацию облака, следующим образом:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```