---
id: wdio-reportportal-reporter
title: Репортер Report Portal
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-reporter это сторонний пакет, для получения дополнительной информации, пожалуйста, посетите [GitHub](https://github.com/borisosipov/wdio-reportportal-reporter) | [npm](https://www.npmjs.com/package/wdio-reportportal-reporter)


![npm](https://img.shields.io/npm/v/wdio-reportportal-reporter)
![npm](https://img.shields.io/npm/dm/wdio-reportportal-reporter)
> Плагин-репортер WebdriverIO для отправки результатов в Report Portal([http://reportportal.io/](http://reportportal.io/)).

## Установка

Самый простой способ — это хранить `wdio-reportportal-reporter` и `wdio-reportportal-service` в качестве devDependency в вашем `package.json`.

```json
{
  "devDependencies": {
    "wdio-reportportal-reporter": "^7.0.0",
    "wdio-reportportal-service": "^7.0.0"
  }
}
```

Инструкции по установке `WebdriverIO` можно найти [здесь](https://webdriver.io/docs/gettingstarted.html).

## Конфигурация

Настройте выходной каталог в вашем файле wdio.conf.js:

```js
const reportportal = require('wdio-reportportal-reporter');
const RpService = require("wdio-reportportal-service");

const conf = {
  reportPortalClientConfig: { // настройки report portal
    token: '00000000-0000-0000-0000-00000000000',
    endpoint: 'https://reportportal-url/api/v1',
    launch: 'launch_name',
    project: 'project_name',
    mode: 'DEFAULT',
    debug: false,
    description: "Launch description text",
    attributes: [{key:"tag", value: "foo"}],
    headers: {"foo": "bar"}, // опциональные заголовки для внутреннего http клиента
    restClientConfig: { // конфигурация http клиента в стиле axios - https://github.com/axios/axios#request-config
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
  reportSeleniumCommands: false, // добавлять команды selenium в лог
  seleniumCommandsLogLevel: 'debug', // уровень логирования для команд selenium
  autoAttachScreenshots: false, // автоматически добавлять скриншоты
  screenshotsLogLevel: 'info', // уровень логирования для скриншотов
  parseTagsFromTestTitle: false, // анализировать строки типа `@foo` из заголовков и добавлять в Report Portal
  cucumberNestedSteps: false, // отправлять шаги cucumber как шаги Report Portal
  autoAttachCucumberFeatureToScenario: false, // требуется cucumberNestedSteps true для использования
  sanitizeErrorMessages: true, // удалять цветовые ASCII символы из стектрейса ошибок
  sauceLabOptions : {
    enabled: true, // автоматически добавлять SauseLab ID к тегам rp
    sldc: "US" // автоматически добавлять регион SauseLab к тегам rp
  }
};

exports.config = {
  // ...
  services: [[RpService, {}]],
  reporters: [[reportportal, conf]],
  // ...
};
```

# Дополнительное API

Доступ к методам API можно получить с помощью:

```js
const reporter = require('wdio-reportportal-reporter')
```

### Описание методов

* `reporter.addAttribute({key, value})` – добавить атрибут к текущему тесту.
  * `key` (*string*, опционально) - ключ атрибута. Должен быть непустой строкой.
  * `value` (*string*, обязательно) - значение атрибута. Должно быть непустой строкой.
* `reporter.addAttributeToCurrentSuite({key, value})` - добавить атрибут к текущему набору тестов.
  * `key` (*string*, опционально) - ключ атрибута. Должен быть непустой строкой.
  * `value` (*string*, обязательно) - значение атрибута. Должно быть непустой строкой.
* `reporter.addDescriptionToCurrentSuite(description)` - добавить строку описания к текущему набору тестов.
  * `description` (*string*) - содержимое описания. Текст может быть отформатирован с использованием markdown.
* `reporter.addDescriptionToAllSuites(description)` - добавить строку описания ко всем следующим наборам тестов. (Используйте в хуке before all, чтобы каждый набор получил одинаковое описание)
  * `description` (*string*) - содержимое описания. Текст может быть отформатирован с использованием markdown.
* `reporter.sendLog(level, message)` – отправить лог в текущий элемент suite\test.
  * `level` (*string*) - уровень лога. Значения ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*) – содержимое сообщения лога.
* `reporter.sendFile(level, name, content, [type])` – отправить файл в текущий элемент suite\test.
  * `level` (*string*) - уровень лога. Значения ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*) – имя файла.
  * `content` (*string*) – содержимое вложения
  * `type` (*string*, опционально) – MIME-тип вложения, по умолчанию `image/png`
  * `message` (*string*) – содержимое сообщения лога.
* `reporter.sendLogToTest(test, level, message)` - отправить лог к конкретному тесту.
  * `test` (*object*) - объект теста из хука wdio `afterTest\afterStep`
  * `level` (*string*) - уровень лога. Значения ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*) – содержимое сообщения лога.
* `reporter.sendFileToTest(test, level, name, content, [type])` – отправить файл к конкретному тесту.
  * `test` (*object*) - объект теста из хука wdio `afterTest\afterStep`
  * `level` (*string*) - уровень лога. Значения ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*) – имя файла.
  * `content` (*string*) – содержимое вложения
  * `type` (*string*, опционально) – MIME-тип вложения, по умолчанию `image/png`
  * `message` (*string*) – содержимое сообщения лога.

Обратите внимание: `sendLog`\\`sendFile` отправляет лог к **текущему запущенному элементу теста**. Это означает, что если вы отправляете лог без активного теста (например, из хуков или на уровне suite), он не будет отображаться в UI Report Portal.

Методы `sendLogToTest`\\`sendFileToTest` полезны, когда вам нужно отправить скриншоты или логи к упавшему тесту из хука wdio afterTest.

Пример Mocha:

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

Пример Jasmine:

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

Пример WDIO Cucumber "5.14.3+":

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

## Получение ссылки на страницу запуска в UI Report Portal

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const link = await RpService.getLaunchUrl(config);
        console.log(`Report portal link ${link}`)
    }
...
```

или более сложный способ

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const protocol = 'http:';
        const hostname = 'example.com';
        const port = ':8080'; // или пустая строка для портов по умолчанию 80/443
        const link = await RpService.getLaunchUrlByParams(protocol, hostname, port, config);
        console.log(`Report portal link ${link}`)
    }
...
```

## Отправка тестов в существующий запуск

Если вы хотите отправить тест в существующий активный запуск, вы можете передать его репортеру с помощью переменной окружения `REPORT_PORTAL_LAUNCH_ID`
Вы несете ответственность как за завершение запуска, так и за запуск такого запуска.

```sh
export REPORT_PORTAL_LAUNCH_ID=SomeLaunchId
npm run wdio
```

## Лицензия

Этот проект лицензирован под лицензией MIT - см. файл [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-reporter/blob/master/LICENSE) для получения подробной информации