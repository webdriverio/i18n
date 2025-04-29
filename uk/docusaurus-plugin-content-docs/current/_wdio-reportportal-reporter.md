---
id: wdio-reportportal-reporter
title: Репортер Report Portal
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-reporter є пакетом сторонніх розробників, для отримання додаткової інформації, будь ласка, перегляньте [GitHub](https://github.com/borisosipov/wdio-reportportal-reporter) | [npm](https://www.npmjs.com/package/wdio-reportportal-reporter)


![npm](https://img.shields.io/npm/v/wdio-reportportal-reporter)
![npm](https://img.shields.io/npm/dm/wdio-reportportal-reporter)
> Плагін репортера WebdriverIO для звітування результатів у Report Portal([http://reportportal.io/](http://reportportal.io/)).

## Installation

Найпростіший спосіб - тримати `wdio-reportportal-reporter` та `wdio-reportportal-service` як devDependency у вашому `package.json`.

```json
{
  "devDependencies": {
    "wdio-reportportal-reporter": "^7.0.0",
    "wdio-reportportal-service": "^7.0.0"
  }
}
```

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут](https://webdriver.io/docs/gettingstarted.html).

## Configuration

Налаштуйте вихідний каталог у файлі wdio.conf.js:

```js
const reportportal = require('wdio-reportportal-reporter');
const RpService = require("wdio-reportportal-service");

const conf = {
  reportPortalClientConfig: { // report portal settings
    token: '00000000-0000-0000-0000-00000000000',
    endpoint: 'https://reportportal-url/api/v1',
    launch: 'launch_name',
    project: 'project_name',
    mode: 'DEFAULT',
    debug: false,
    description: "Launch description text",
    attributes: [{key:"tag", value: "foo"}],
    headers: {"foo": "bar"}, // optional headers for internal http client
    restClientConfig: { // axios like http client config - https://github.com/axios/axios#request-config
      proxy: {
        protocol: 'https',
        host: '127.0.0.1',
        port: 9000,
        auth: {
          username: 'mikeymike',
          password: 'rapunz3l'
        }
      },
      timeout: 60000
    }
  },
  reportSeleniumCommands: false, // add selenium commands to log
  seleniumCommandsLogLevel: 'debug', // log level for selenium commands
  autoAttachScreenshots: false, // automatically add screenshots
  screenshotsLogLevel: 'info', // log level for screenshots
  parseTagsFromTestTitle: false, // parse strings like `@foo` from titles and add to Report Portal
  cucumberNestedSteps: false, // report cucumber steps as Report Portal steps
  autoAttachCucumberFeatureToScenario: false, // requires cucumberNestedSteps to be true for use
  sanitizeErrorMessages: true, // strip color ascii characters from error stacktrace
  sauceLabOptions : {
    enabled: true, // automatically add SauseLab ID to rp tags.
    sldc: "US" // automatically add SauseLab region to rp tags.
  }
};

exports.config = {
  // ...
  services: [[RpService, {}]],
  reporters: [[reportportal, conf]],
  // ...
};
```

# Additional API

Методи API можна отримати за допомогою:

```js
const reporter = require('wdio-reportportal-reporter')
```

### Methods description

* `reporter.addAttribute({key, value})` – додати атрибут до поточного тесту.
  * `key` (*string*, optional) - ключ атрибута. Повинен бути непорожнім рядком.
  * `value` (*string*, required) - значення атрибута. Повинно бути непорожнім рядком.
* `reporter.addAttributeToCurrentSuite({key, value})` - додати атрибут до поточного набору тестів.
  * `key` (*string*, optional) - ключ атрибута. Повинен бути непорожнім рядком.
  * `value` (*string*, required) - значення атрибута. Повинно бути непорожнім рядком.
* `reporter.addDescriptionToCurrentSuite(description)` - додати опис до поточного набору тестів.
  * `description` (*string*) - зміст опису. Текст може бути відформатований за допомогою markdown.
* `reporter.addDescriptionToAllSuites(description)` - додати опис до всіх майбутніх наборів тестів. (Використовуйте у хуці before all, щоб кожен набір отримав однаковий опис)
  * `description` (*string*) - зміст опису. Текст може бути відформатований за допомогою markdown.
* `reporter.sendLog(level, message)` – надіслати лог до поточного набору/елемента тесту.
  * `level` (*string*) - рівень логу. Значення ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*)– зміст повідомлення логу.
* `reporter.sendFile(level, name, content, [type])` – надіслати файл до поточного набору/елемента тесту.
  * `level` (*string*) - рівень логу. Значення ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*)– ім'я файлу.
  * `content` (*string*) – вміст вкладення
  * `type` (*string*, optional) – MIME-тип вкладення, за замовчуванням `image/png`
  * `message` (*string*)– зміст повідомлення логу.
* `reporter.sendLogToTest(test, level, message)` - надіслати лог до конкретного тесту.
  * `test` (*object*) - об'єкт тесту з хука wdio `afterTest\afterStep`
  * `level` (*string*) - рівень логу. Значення ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*)– зміст повідомлення логу.
* `reporter.sendFileToTest(test, level, name, content, [type])` – надіслати файл до конкретного тесту.
  * `test` (*object*) - об'єкт тесту з хука wdio `afterTest\afterStep`
  * `level` (*string*) - рівень логу. Значення ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*)– ім'я файлу.
  * `content` (*string*) – вміст вкладення
  * `type` (*string*, optional) – MIME-тип вкладення, за замовчуванням `image/png`
  * `message` (*string*)– зміст повідомлення логу.

Зверніть увагу: `sendLog`\\`sendFile` надсилає лог до **поточного елемента тесту**. Це означає, що якщо ви надсилаєте лог без активного тесту (наприклад, з хуків або на рівні набору), він не відображатиметься в інтерфейсі Report Portal.

Методи `sendLogToTest`\\`sendFileToTest` корисні, коли вам потрібно надіслати скріншоти або логи до елемента тесту, що не пройшов, з хука wdio afterTest.

Приклад Mocha:

```js
const reportportal = require('wdio-reportportal-reporter');
const path = require('path');
const fs = require('fs');

exports.config = {
...
  async afterTest(test) {
    if (test.passed === false) {
      const filename = "screnshot.png";
      const outputFile = path.join(__dirname, filename);
      await browser.saveScreenshot(outputFile);
      reportportal.sendFileToTest(test, 'info', filename, fs.readFileSync(outputFile));
    }
  }
...
```

Приклад Jasmine:

```js
const reportportal = require('wdio-reportportal-reporter');
const path = require('path');
const fs = require('fs');

exports.config = {
...
  async afterTest(test) {
    if (test.passed === false) {
      const filename = "screnshot.png";
      const outputFile = path.join(__dirname, filename);
      await browser.saveScreenshot(outputFile);
      //!!
      Object.assign(test, {title: test.description}}
      reportportal.sendFileToTest(test, 'info', filename, fs.readFileSync(outputFile));
    }
  }
...
```

WDIO Cucumber "5.14.3+" приклад:

```js
const reportportal = require('wdio-reportportal-reporter');

exports.config = {
...
   afterStep: async function (uri, feature, { error, result, duration, passed }, stepData, context) {
     if (!passed) {
        let failureObject = {};
        failureObject.type = 'afterStep';
        failureObject.error = error;
        failureObject.title = `${stepData.step.keyword}${stepData.step.text}`;
        const screenShot = await global.browser.takeScreenshot();
        let attachment = Buffer.from(screenShot, 'base64');
        reportportal.sendFileToTest(failureObject, 'error', "screnshot.png", attachment);
    }
  }
...
}
```

## Getting link to Report Portal UI launch page

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const link = await RpService.getLaunchUrl(config);
        console.log(`Report portal link ${link}`)
    }
...
```

або більш складний спосіб

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const protocol = 'http:';
        const hostname = 'example.com';
        const port = ':8080'; // or empty string for default 80/443 ports
        const link = await RpService.getLaunchUrlByParams(protocol, hostname, port, config);
        console.log(`Report portal link ${link}`)
    }
...
```

## Reporting test to existing launch

Якщо ви хочете звітувати тест до існуючого активного запуску, ви можете передати його до репортера через змінну середовища `REPORT_PORTAL_LAUNCH_ID`
Ви відповідаєте за завершення запуску, а також за запуск такого запуску.

```sh
export REPORT_PORTAL_LAUNCH_ID=SomeLaunchId
npm run wdio
```

## License

Цей проект ліцензований під ліцензією MIT - див. файл [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-reporter/blob/master/LICENSE) для деталей