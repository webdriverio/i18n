---
id: cloudservices
title: Використання Хмарних Сервісів
---

Використання сервісів на вимогу, таких як Sauce Labs, Browserstack, TestingBot, LambdaTest або Perfecto з WebdriverIO, досить просте. Все, що вам потрібно зробити, це встановити `user` та `key` вашого сервісу в налаштуваннях.

Додатково ви також можете параметризувати свій тест, встановивши специфічні для хмари можливості, такі як `build`. Якщо ви хочете запускати хмарні сервіси тільки в Travis, ви можете використовувати змінну середовища `CI`, щоб перевірити, чи ви знаходитесь в Travis, і відповідно змінити конфігурацію.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

Ви можете налаштувати свої тести для віддаленого запуску в [Sauce Labs](https://saucelabs.com).

Єдиною вимогою є встановлення `user` і `key` у вашій конфігурації (експортованій з `wdio.conf.js` або переданій в `webdriverio.remote(...)`) як вашого імені користувача Sauce Labs та ключа доступу.

Ви також можете передати будь-які додаткові [опції конфігурації тесту](https://docs.saucelabs.com/dev/test-configuration-options/) як ключ/значення в можливостях для будь-якого браузера.

### Sauce Connect

Якщо ви хочете запустити тести проти сервера, який недоступний в Інтернеті (наприклад, на `localhost`), тоді вам потрібно використовувати [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy).

Підтримка цього виходить за рамки WebdriverIO, тому вам потрібно запустити його самостійно.

Якщо ви використовуєте тестовий запускач WDIO, завантажте та налаштуйте [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) у вашому `wdio.conf.js`. Це допомагає запустити Sauce Connect і має додаткові функції, які краще інтегрують ваші тести в сервіс Sauce.

### З Travis CI

Travis CI, однак, [має підтримку](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) для запуску Sauce Connect перед кожним тестом, тому дотримання їхніх інструкцій для цього є варіантом.

Якщо ви це зробите, ви повинні встановити опцію конфігурації тесту `tunnel-identifier` в можливостях кожного браузера. Travis за замовчуванням встановлює це значення в змінну середовища `TRAVIS_JOB_NUMBER`.

Крім того, якщо ви хочете, щоб Sauce Labs групував ваші тести за номером збірки, ви можете встановити `build` на `TRAVIS_BUILD_NUMBER`.

Нарешті, якщо ви встановите `name`, це змінить назву цього тесту в Sauce Labs для цієї збірки. Якщо ви використовуєте тестовий запускач WDIO у поєднанні з [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service), WebdriverIO автоматично встановлює правильну назву для тесту.

Приклад `capabilities`:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### Тайм-аути

Оскільки ви запускаєте свої тести віддалено, може бути необхідно збільшити деякі тайм-аути.

Ви можете змінити [тайм-аут простою](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout), передавши `idle-timeout` як опцію конфігурації тесту. Це контролює, як довго Sauce буде чекати між командами перед закриттям з'єднання.

## BrowserStack

WebdriverIO також має вбудовану інтеграцію з [Browserstack](https://www.browserstack.com).

Єдиною вимогою є встановлення `user` і `key` у вашій конфігурації (експортованій з `wdio.conf.js` або переданій в `webdriverio.remote(...)`) як вашого імені користувача Browserstack automate та ключа доступу.

Ви також можете передати будь-які додаткові [підтримувані можливості](https://www.browserstack.com/automate/capabilities) як ключ/значення в можливостях для будь-якого браузера. Якщо ви встановите `browserstack.debug` на `true`, буде записано відео сесії, що може бути корисним.

### Локальне тестування

Якщо ви хочете запустити тести проти сервера, який недоступний в Інтернеті (наприклад, на `localhost`), тоді вам потрібно використовувати [Локальне тестування](https://www.browserstack.com/local-testing#command-line).

Підтримка цього виходить за рамки WebdriverIO, тому ви повинні запустити його самостійно.

Якщо ви використовуєте локальне тестування, вам слід встановити `browserstack.local` на `true` у ваших можливостях.

Якщо ви використовуєте тестовий запускач WDIO, завантажте та налаштуйте [`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service) у вашому `wdio.conf.js`. Це допомагає запустити BrowserStack і має додаткові функції, які краще інтегрують ваші тести в сервіс BrowserStack.

### З Travis CI

Якщо ви хочете додати Локальне тестування в Travis, ви повинні запустити його самостійно.

Наступний скрипт завантажить і запустить його у фоновому режимі. Вам слід запустити це в Travis перед початком тестів.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

Також, ви можете встановити `build` на номер збірки Travis.

Приклад `capabilities`:

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

Єдиною вимогою є встановлення `user` і `key` у вашій конфігурації (експортованій з `wdio.conf.js` або переданій в `webdriverio.remote(...)`) як вашого імені користувача [TestingBot](https://testingbot.com) та секретного ключа.

Ви також можете передати будь-які додаткові [підтримувані можливості](https://testingbot.com/support/other/test-options) як ключ/значення в можливостях для будь-якого браузера.

### Локальне тестування

Якщо ви хочете запустити тести проти сервера, який недоступний в Інтернеті (наприклад, на `localhost`), тоді вам потрібно використовувати [Локальне тестування](https://testingbot.com/support/other/tunnel). TestingBot надає Java-тунель, що дозволяє тестувати веб-сайти, недоступні з Інтернету.

Їхня сторінка підтримки тунелю містить інформацію, необхідну для запуску та роботи.

Якщо ви використовуєте тестовий запускач WDIO, завантажте та налаштуйте [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) у вашому `wdio.conf.js`. Це допомагає запустити TestingBot і має додаткові функції, які краще інтегрують ваші тести в сервіс TestingBot.

## LambdaTest

Інтеграція з [LambdaTest](https://www.lambdatest.com) також вбудована.

Єдиною вимогою є встановлення `user` і `key` у вашій конфігурації (експортованій з `wdio.conf.js` або переданій в `webdriverio.remote(...)`) як вашого імені користувача облікового запису LambdaTest та ключа доступу.

Ви також можете передати будь-які додаткові [підтримувані можливості](https://www.lambdatest.com/capabilities-generator/) як ключ/значення в можливостях для будь-якого браузера. Якщо ви встановите `visual` на `true`, буде записано відео сесії, що може бути корисним.

### Тунель для локального тестування

Якщо ви хочете запустити тести проти сервера, який недоступний в Інтернеті (наприклад, на `localhost`), тоді вам потрібно використовувати [Локальне тестування](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/).

Підтримка цього виходить за рамки WebdriverIO, тому ви повинні запустити його самостійно.

Якщо ви використовуєте локальне тестування, вам слід встановити `tunnel` на `true` у ваших можливостях.

Якщо ви використовуєте тестовий запускач WDIO, завантажте та налаштуйте [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) у вашому `wdio.conf.js`. Це допомагає запустити LambdaTest і має додаткові функції, які краще інтегрують ваші тести в сервіс LambdaTest.

### З Travis CI

Якщо ви хочете додати Локальне тестування в Travis, ви повинні запустити його самостійно.

Наступний скрипт завантажить і запустить його у фоновому режимі. Вам слід запустити це в Travis перед початком тестів.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

Також, ви можете встановити `build` на номер збірки Travis.

Приклад `capabilities`:

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

При використанні wdio з [`Perfecto`](https://www.perfecto.io) вам потрібно створити токен безпеки для кожного користувача і додати його в структуру можливостей (на додаток до інших можливостей), як показано нижче:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

Крім того, вам потрібно додати конфігурацію хмари, як показано нижче:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```