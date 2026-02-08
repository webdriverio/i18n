---
id: cloudservices
title: Використання хмарних сервісів
---

Використання сервісів на вимогу, таких як Sauce Labs, Browserstack, TestingBot, TestMu AI (раніше LambdaTest) або Perfecto з WebdriverIO дуже просто. Все, що вам потрібно зробити, це встановити `user` та `key` вашого сервісу в параметрах.

За бажанням ви також можете параметризувати свій тест, встановлюючи специфічні для хмари можливості, такі як `build`. Якщо ви хочете запускати хмарні сервіси лише в Travis, ви можете використовувати змінну середовища `CI`, щоб перевірити, чи ви в Travis, і змінити конфігурацію відповідно.

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

Єдиною вимогою є встановлення `user` та `key` у вашій конфігурації (експортованій з `wdio.conf.js` або переданій в `webdriverio.remote(...)`) на ваше ім'я користувача Sauce Labs та ключ доступу.

Ви також можете передати будь-які опціональні [параметри конфігурації тесту](https://docs.saucelabs.com/dev/test-configuration-options/) як ключ/значення в capabilities для будь-якого браузера.

### Sauce Connect

Якщо ви хочете запускати тести на сервері, який не доступний з Інтернету (наприклад, на `localhost`), вам потрібно використовувати [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy).

WebdriverIO не підтримує це безпосередньо, тому вам доведеться запустити його самостійно.

Якщо ви використовуєте WDIO testrunner, завантажте та налаштуйте [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) у вашому `wdio.conf.js`. Це допоможе запустити Sauce Connect і має додаткові функції, які краще інтегрують ваші тести у сервіс Sauce.

### З Travis CI

Travis CI, однак, [має підтримку](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) для запуску Sauce Connect перед кожним тестом, тому можна дотримуватися їхніх вказівок.

Якщо ви це зробите, ви повинні встановити опцію конфігурації тесту `tunnel-identifier` у `capabilities` кожного браузера. Travis встановлює це за замовчуванням у змінну середовища `TRAVIS_JOB_NUMBER`.

Крім того, якщо ви хочете, щоб Sauce Labs групував ваші тести за номером збірки, ви можете встановити `build` на `TRAVIS_BUILD_NUMBER`.

Нарешті, якщо ви встановите `name`, це змінить назву цього тесту в Sauce Labs для цієї збірки. Якщо ви використовуєте WDIO testrunner у поєднанні з [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service), WebdriverIO автоматично встановлює правильну назву для тесту.

Приклад `capabilities`:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### Таймаути

Оскільки ви запускаєте тести віддалено, може бути необхідно збільшити деякі таймаути.

Ви можете змінити [таймаут бездіяльності](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout), передавши `idle-timeout` як опцію конфігурації тесту. Це визначає, як довго Sauce чекатиме між командами перед закриттям з'єднання.

## BrowserStack

WebdriverIO також має вбудовану інтеграцію з [Browserstack](https://www.browserstack.com).

Єдиною вимогою є встановлення `user` та `key` у вашій конфігурації (експортованій з `wdio.conf.js` або переданій в `webdriverio.remote(...)`) на ваше ім'я користувача та ключ доступу Browserstack automate.

Ви також можете передати будь-які опціональні [підтримувані можливості](https://www.browserstack.com/automate/capabilities) як ключ/значення в capabilities для будь-якого браузера. Якщо ви встановите `browserstack.debug` на `true`, буде записано screencast сесії, що може бути корисним.

### Локальне тестування

Якщо ви хочете запускати тести на сервері, який не доступний з Інтернету (наприклад, на `localhost`), вам потрібно використовувати [Local Testing](https://www.browserstack.com/local-testing#command-line).

WebdriverIO не підтримує це безпосередньо, тому ви повинні запустити його самостійно.

Якщо ви використовуєте локальне тестування, вам слід встановити `browserstack.local` на `true` у ваших capabilities.

Якщо ви використовуєте WDIO testrunner, завантажте та налаштуйте [`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service) у вашому `wdio.conf.js`. Це допоможе запустити BrowserStack і має додаткові функції, які краще інтегрують ваші тести у сервіс BrowserStack.

### З Travis CI

Якщо ви хочете додати локальне тестування в Travis, вам доведеться запустити його самостійно.

Наступний скрипт завантажить і запустить його у фоновому режимі. Ви повинні запустити це в Travis перед початком тестів.

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

Єдиною вимогою є встановлення `user` та `key` у вашій конфігурації (експортованій з `wdio.conf.js` або переданій в `webdriverio.remote(...)`) на ваше ім'я користувача та секретний ключ [TestingBot](https://testingbot.com).

Ви також можете передати будь-які опціональні [підтримувані можливості](https://testingbot.com/support/other/test-options) як ключ/значення в capabilities для будь-якого браузера.

### Локальне тестування

Якщо ви хочете запускати тести на сервері, який не доступний з Інтернету (наприклад, на `localhost`), вам потрібно використовувати [Local Testing](https://testingbot.com/support/other/tunnel). TestingBot надає Java-тунель, що дозволяє тестувати веб-сайти, які недоступні з Інтернету.

Їхня сторінка підтримки тунелів містить необхідну інформацію для його запуску.

Якщо ви використовуєте WDIO testrunner, завантажте та налаштуйте [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) у вашому `wdio.conf.js`. Це допоможе запустити TestingBot і має додаткові функції, які краще інтегрують ваші тести у сервіс TestingBot.

## TestMu AI (раніше LambdaTest)

Інтеграція з [TestMu AI](https://www.testmuai.com/) також вбудована.

Єдиною вимогою є встановлення `user` та `key` у вашій конфігурації (експортованій з `wdio.conf.js` або переданій в `webdriverio.remote(...)`) на ім'я користувача вашого облікового запису TestMu AI та ключ доступу.

Ви також можете передати будь-які опціональні [підтримувані можливості](https://www.testmuai.com/capabilities-generator/) як ключ/значення в capabilities для будь-якого браузера. Якщо ви встановите `visual` на `true`, буде записано screencast сесії, що може бути корисним.

### Тунель для локального тестування

Якщо ви хочете запускати тести на сервері, який не доступний з Інтернету (наприклад, на `localhost`), вам потрібно використовувати [Local Testing](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/).

WebdriverIO не підтримує це безпосередньо, тому ви повинні запустити його самостійно.

Якщо ви використовуєте локальне тестування, вам слід встановити `tunnel` на `true` у ваших capabilities.

Якщо ви використовуєте WDIO testrunner, завантажте та налаштуйте [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) у вашому `wdio.conf.js`. Це допоможе запустити TestMu AI і має додаткові функції, які краще інтегрують ваші тести у сервіс TestMu AI.

### З Travis CI

Якщо ви хочете додати локальне тестування в Travis, вам доведеться запустити його самостійно.

Наступний скрипт завантажить і запустить його у фоновому режимі. Ви повинні запустити це в Travis перед початком тестів.

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

При використанні wdio з [`Perfecto`](https://www.perfecto.io) вам потрібно створити токен безпеки для кожного користувача та додати його в структуру capabilities (на додаток до інших можливостей), таким чином:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

Крім того, вам потрібно додати конфігурацію хмари, таким чином:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```