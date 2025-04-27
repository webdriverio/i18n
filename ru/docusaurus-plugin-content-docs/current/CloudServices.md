---
id: cloudservices
title: Использование облачных сервисов
---

Использование сервисов по требованию, таких как Sauce Labs, Browserstack, TestingBot, LambdaTest или Perfecto с WebdriverIO, довольно просто. Все, что вам нужно сделать, это установить в своих опциях `user` и `key` вашего сервиса.

При желании вы также можете параметризировать свой тест, установив специфичные для облака возможности, такие как `build`. Если вы хотите запускать облачные сервисы только в Travis, вы можете использовать переменную окружения `CI`, чтобы проверить, находитесь ли вы в Travis, и соответствующим образом изменить конфигурацию.

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

Единственное требование - установить `user` и `key` в вашей конфигурации (экспортируемой `wdio.conf.js` или передаваемой в `webdriverio.remote(...)`) для вашего имени пользователя и ключа доступа Sauce Labs.

Вы также можете передать любые дополнительные [опции конфигурации теста](https://docs.saucelabs.com/dev/test-configuration-options/) в виде ключа/значения в возможностях для любого браузера.

### Sauce Connect

Если вы хотите запускать тесты на сервере, который недоступен из Интернета (например, на `localhost`), вам нужно использовать [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy).

Это выходит за рамки WebdriverIO, поэтому вам придется запускать его самостоятельно.

Если вы используете тестовый запускатель WDIO, загрузите и настройте [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) в вашем `wdio.conf.js`. Он помогает запустить Sauce Connect и поставляется с дополнительными функциями, которые лучше интегрируют ваши тесты в сервис Sauce.

### С Travis CI

Travis CI, однако, [имеет поддержку](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) для запуска Sauce Connect перед каждым тестом, поэтому следование их указаниям является вариантом.

Если вы это сделаете, вы должны установить опцию конфигурации теста `tunnel-identifier` в `capabilities` каждого браузера. Travis по умолчанию устанавливает это в переменную окружения `TRAVIS_JOB_NUMBER`.

Кроме того, если вы хотите, чтобы Sauce Labs группировал ваши тесты по номеру сборки, вы можете установить `build` в `TRAVIS_BUILD_NUMBER`.

Наконец, если вы установите `name`, это изменит имя этого теста в Sauce Labs для этой сборки. Если вы используете тестовый запускатель WDIO в сочетании с [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service), WebdriverIO автоматически устанавливает правильное имя для теста.

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

Поскольку вы запускаете тесты удаленно, может потребоваться увеличить некоторые тайм-ауты.

Вы можете изменить [idle timeout](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout), передав `idle-timeout` в качестве опции конфигурации теста. Это контролирует, как долго Sauce будет ждать между командами перед закрытием соединения.

## BrowserStack

WebdriverIO также имеет встроенную интеграцию с [Browserstack](https://www.browserstack.com).

Единственное требование - установить `user` и `key` в вашей конфигурации (экспортируемой `wdio.conf.js` или передаваемой в `webdriverio.remote(...)`) для вашего имени пользователя автоматизации Browserstack и ключа доступа.

Вы также можете передать любые дополнительные [поддерживаемые возможности](https://www.browserstack.com/automate/capabilities) в виде ключа/значения в возможностях для любого браузера. Если вы установите `browserstack.debug` в `true`, будет записана запись экрана сеанса, что может быть полезно.

### Локальное тестирование

Если вы хотите запускать тесты на сервере, который недоступен из Интернета (например, на `localhost`), вам нужно использовать [Local Testing](https://www.browserstack.com/local-testing#command-line).

Это выходит за рамки WebdriverIO, поэтому вы должны запустить его самостоятельно.

Если вы используете локальное тестирование, вы должны установить `browserstack.local` в `true` в ваших возможностях.

Если вы используете тестовый запускатель WDIO, загрузите и настройте [`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service) в вашем `wdio.conf.js`. Он помогает запустить BrowserStack и поставляется с дополнительными функциями, которые лучше интегрируют ваши тесты в сервис BrowserStack.

### С Travis CI

Если вы хотите добавить локальное тестирование в Travis, вы должны запустить его самостоятельно.

Следующий скрипт загрузит и запустит его в фоновом режиме. Вы должны запустить это в Travis перед началом тестов.

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

Единственное требование - установить `user` и `key` в вашей конфигурации (экспортируемой `wdio.conf.js` или передаваемой в `webdriverio.remote(...)`) для вашего имени пользователя и секретного ключа [TestingBot](https://testingbot.com).

Вы также можете передать любые дополнительные [поддерживаемые возможности](https://testingbot.com/support/other/test-options) в виде ключа/значения в возможностях для любого браузера.

### Локальное тестирование

Если вы хотите запускать тесты на сервере, который недоступен из Интернета (например, на `localhost`), вам нужно использовать [Local Testing](https://testingbot.com/support/other/tunnel). TestingBot предоставляет туннель на основе Java, который позволяет тестировать веб-сайты, недоступные из Интернета.

Их страница поддержки туннелей содержит информацию, необходимую для его запуска.

Если вы используете тестовый запускатель WDIO, загрузите и настройте [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) в вашем `wdio.conf.js`. Он помогает запустить TestingBot и поставляется с дополнительными функциями, которые лучше интегрируют ваши тесты в сервис TestingBot.

## LambdaTest

Интеграция с [LambdaTest](https://www.lambdatest.com) также встроена.

Единственное требование - установить `user` и `key` в вашей конфигурации (экспортируемой `wdio.conf.js` или передаваемой в `webdriverio.remote(...)`) для вашего имени пользователя и ключа доступа учетной записи LambdaTest.

Вы также можете передать любые дополнительные [поддерживаемые возможности](https://www.lambdatest.com/capabilities-generator/) в виде ключа/значения в возможностях для любого браузера. Если вы установите `visual` в `true`, будет записана запись экрана сеанса, что может быть полезно.

### Туннель для локального тестирования

Если вы хотите запускать тесты на сервере, который недоступен из Интернета (например, на `localhost`), вам нужно использовать [Local Testing](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/).

Это выходит за рамки WebdriverIO, поэтому вы должны запустить его самостоятельно.

Если вы используете локальное тестирование, вы должны установить `tunnel` в `true` в ваших возможностях.

Если вы используете тестовый запускатель WDIO, загрузите и настройте [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) в вашем `wdio.conf.js`. Он помогает запустить LambdaTest и поставляется с дополнительными функциями, которые лучше интегрируют ваши тесты в сервис LambdaTest.

### С Travis CI

Если вы хотите добавить локальное тестирование в Travis, вы должны запустить его самостоятельно.

Следующий скрипт загрузит и запустит его в фоновом режиме. Вы должны запустить это в Travis перед началом тестов.

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

При использовании wdio с [`Perfecto`](https://www.perfecto.io) вам необходимо создать токен безопасности для каждого пользователя и добавить его в структуру capabilities (в дополнение к другим возможностям), как показано ниже:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

Кроме того, вам нужно добавить конфигурацию облака следующим образом:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```