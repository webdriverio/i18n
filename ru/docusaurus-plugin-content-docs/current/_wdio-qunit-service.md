---
id: wdio-qunit-service
title: Сервис QUnit
custom_edit_url: https://github.com/mauriciolauffer/wdio-qunit-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-qunit-service — это сторонний пакет, для получения дополнительной информации см. [GitHub](https://github.com/mauriciolauffer/wdio-qunit-service) | [npm](https://www.npmjs.com/package/wdio-qunit-service)

[![npm](https://img.shields.io/npm/v/wdio-qunit-service)](https://www.npmjs.com/package/wdio-qunit-service) [![test](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml/badge.svg)](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml)

[WebdriverIO](https://webdriver.io/) (wdio) сервис для запуска браузерных тестов [QUnit](https://qunitjs.com/) и их динамического преобразования в тестовые наборы `wdio`.

## Замена Karma

`QUnit Service` — это прямая замена для тех, кто использует [Karma JS](https://karma-runner.github.io/latest/index.html) для запуска тестов `QUnit` ([karma-qunit](https://github.com/karma-runner/karma-qunit/), [karma-ui5](https://github.com/SAP/karma-ui5) или любую другую комбинацию Karma и QUnit). Karma [устарела](https://github.com/karma-runner/karma), и людям следует переходить на современные альтернативы!

Если вы хотите оставить ваши тесты QUnit как есть, без переписывания и рефакторинга, `QUnit Service` — это всё, что вам нужно. Он запускает ваши QUnit HTML-файлы в браузере и фиксирует все результаты в формате `wdio`.

Благодаря этому разработчики могут использовать `QUnit Service` вместе со всем остальным, что доступно в экосистеме `wdio`.

Хотите записать запуск теста на [видео](https://webdriver.io/docs/wdio-video-reporter/)? Возможно, сделать [скриншот](https://webdriver.io/docs/api/browser/saveScreenshot/) или сохранить его в формате [PDF](https://webdriver.io/docs/api/browser/savePDF/)? Проверить [покрытие кода](https://www.npmjs.com/package/wdio-monocart-service)? Сохранить результаты тестов в формате [JUnit](https://webdriver.io/docs/junit-reporter)? Вперед, `QUnit Service` не помешает вам.

## Установка

После настройки `WebdriverIO` установите `wdio-qunit-service` как devDependency в ваш файл `package.json`.

```shell
npm install wdio-qunit-service --save-dev
```

Если вы еще не настроили `WebdriverIO`, ознакомьтесь с официальной [документацией](https://webdriver.io/docs/gettingstarted).

## Конфигурация

Чтобы использовать `QUnit Service`, вам просто нужно добавить его в список `services` в вашем файле `wdio.conf.js`. Документация wdio содержит всю информацию, связанную с [файлом конфигурации](https://webdriver.io/docs/configurationfile):

```js
// wdio.conf.js
export const config = {
  // ...
  services: ["qunit"],
  // ...
};
```

## Использование

Убедитесь, что веб-сервер запущен и работает перед выполнением тестов. `wdio` не будет запускать веб-сервер.

### С файлами .spec или .test

В вашем тесте WebdriverIO вам нужно перейти на HTML-страницу с тестами QUnit, затем вызвать `browser.getQUnitResults()`.

```js
describe("QUnit test page", () => {
  it("should pass QUnit tests", async () => {
    await browser.url("http://localhost:8080/test/unit/unitTests.qunit.html");
    await browser.getQUnitResults();
  });
});
```

Рекомендуется иметь один файл тестов WebdriverIO на каждую HTML-страницу тестов QUnit. Это гарантирует, что тесты будут выполняться параллельно и полностью изолированно.

### Только конфигурация, без файлов .spec или .test

Если вы не хотите создавать файлы spec/test, вы можете передать список HTML-файлов QUnit в конфигурацию, и тесты будут сгенерированы автоматически.

```js
// wdio.conf.js
export const config = {
  // ...
  baseUrl: 'http://localhost:8080',
  services: [
    ['qunit', {
      paths: [
        'unit-tests.html',
        'integration-tests.html',
        'test/qunit.html'
      ]
    }],
  // ...
};
```

### Результаты тестов

Результаты тестов могут выглядеть так:
![QUnit Service test results](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./wdio-qunit-service-results.png?raw=true)

## Примеры

Ознакомьтесь с папкой [examples](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/) для образцов с использованием `javascript`, `typescript` и др.

### Использование в приложениях SAP Fiori / UI5

Простой [пример](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/) с использованием известного [openui5-sample-app](https://github.com/SAP/openui5-sample-app):

- Создайте файл конфигурации: [wdio.conf.js](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/wdio.conf.js)

- Укажите `wdio`, где найти файлы тестов QUnit:

- - Включите файлы QUnit в [конфигурацию сервиса](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app-no-specs/webapp/test/wdio.conf.js)
- - или
- - Создайте файл тестов WebdriverIO для [модульных тестов](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/unit/unit.test.js) и еще один для [тестов OPA5](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/integration/opa.test.js)

- Веб-сервер должен быть запущен перед выполнением тестов

- Запустите $ `wdio run webapp/test/wdio.conf.js`

## Автор

Mauricio Lauffer

- LinkedIn: [https://www.linkedin.com/in/mauriciolauffer](https://www.linkedin.com/in/mauriciolauffer)

## Лицензия

Этот проект лицензирован по лицензии MIT — подробности см. в файле [LICENSE](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/LICENSE).