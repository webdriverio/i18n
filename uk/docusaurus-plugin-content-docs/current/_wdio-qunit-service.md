---
id: wdio-qunit-service
title: QUnit сервіс
custom_edit_url: https://github.com/mauriciolauffer/wdio-qunit-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-qunit-service - це пакет від третьої сторони, для отримання додаткової інформації перегляньте [GitHub](https://github.com/mauriciolauffer/wdio-qunit-service) | [npm](https://www.npmjs.com/package/wdio-qunit-service)

[![npm](https://img.shields.io/npm/v/wdio-qunit-service)](https://www.npmjs.com/package/wdio-qunit-service) [![test](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml/badge.svg)](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml)

[WebdriverIO](https://webdriver.io/) (wdio) сервіс для запуску [QUnit](https://qunitjs.com/) браузерних тестів та динамічного перетворення їх у тестові набори `wdio`.

## Заміна Karma

`QUnit Service` - це пряма заміна для тих, хто використовує [Karma JS](https://karma-runner.github.io/latest/index.html) для запуску своїх тестів `QUnit` ([karma-qunit](https://github.com/karma-runner/karma-qunit/), [karma-ui5](https://github.com/SAP/karma-ui5) або будь-яку іншу комбінацію Karma та QUnit). Karma є [застарілою](https://github.com/karma-runner/karma) і люди повинні переходити на сучасні альтернативи!

Якщо ви хочете зберегти свої QUnit тести такими, як вони є, без переписування та рефакторингу, `QUnit Service` - це все, що вам потрібно. Він запускає ваші QUnit HTML файли в браузері та фіксує всі результати у форматі `wdio`.

Завдяки цьому розробники можуть використовувати `QUnit Service` разом з усім іншим, що доступне в екосистемі `wdio`.

Хочете записати запуск тесту у [відео](https://webdriver.io/docs/wdio-video-reporter/)? Можливо, зробити [скріншот](https://webdriver.io/docs/api/browser/saveScreenshot/) або зберегти його в [PDF](https://webdriver.io/docs/api/browser/savePDF/)? Перевірити [покриття коду](https://www.npmjs.com/package/wdio-monocart-service)? Зберегти результати тестів у форматі [JUnit](https://webdriver.io/docs/junit-reporter)? Дерзайте, `QUnit Service` не стоїть на вашому шляху.

## Встановлення

Після налаштування `WebdriverIO`, встановіть `wdio-qunit-service` як devDependency у вашому файлі `package.json`.

```shell
npm install wdio-qunit-service --save-dev
```

Якщо ви ще не налаштували `WebdriverIO`, перегляньте офіційну [документацію](https://webdriver.io/docs/gettingstarted).

## Конфігурація

Щоб використовувати `QUnit Service`, вам просто потрібно додати його до списку `services` у вашому файлі `wdio.conf.js`. Документація wdio має всю інформацію, пов'язану з [файлом конфігурації](https://webdriver.io/docs/configurationfile):

```js
// wdio.conf.js
export const config = {
  // ...
  services: ["qunit"],
  // ...
};
```

## Використання

Переконайтеся, що веб-сервер запущений та працює перед виконанням тестів. `wdio` не запустить веб-сервер.

### З файлами .spec або .test

У вашому тесті WebdriverIO вам потрібно перейти на сторінку тесту QUnit HTML, а потім викликати `browser.getQUnitResults()`.

```js
describe("QUnit test page", () => {
  it("should pass QUnit tests", async () => {
    await browser.url("http://localhost:8080/test/unit/unitTests.qunit.html");
    await browser.getQUnitResults();
  });
});
```

Рекомендується мати один файл тесту WebdriverIO для кожної сторінки тесту QUnit HTML. Це забезпечує запуск тестів паралельно та повністю ізольовано.

### Тільки конфігурація, без файлів .spec або .test

Якщо ви не хочете створювати файли spec/test, ви можете передати список HTML-файлів QUnit до конфігурації, і тести будуть автоматично згенеровані.

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

### Результати тестів

Результати тестів можуть виглядати так:
![QUnit Service test results](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./wdio-qunit-service-results.png?raw=true)

## Приклади

Перегляньте папку [examples](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/) для зразків, що використовують `javascript`, `typescript` та інше.

### Використання в додатках SAP Fiori / UI5

Простий [приклад](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/) з використанням відомого [openui5-sample-app](https://github.com/SAP/openui5-sample-app):

- Створіть файл конфігурації: [wdio.conf.js](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/wdio.conf.js)

- Повідомте `wdio`, де знайти файли тестів QUnit:

- - Включіть файли QUnit до [конфігурації сервісу](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app-no-specs/webapp/test/wdio.conf.js)
- - або
- - Створіть файл тесту WebdriverIO для [модульних тестів](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/unit/unit.test.js) та інший для [тестів OPA5](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/integration/opa.test.js)

- Веб-сервер повинен працювати перед виконанням тестів

- Запустіть $ `wdio run webapp/test/wdio.conf.js`

## Автор

Mauricio Lauffer

- LinkedIn: [https://www.linkedin.com/in/mauriciolauffer](https://www.linkedin.com/in/mauriciolauffer)

## Ліцензія

Цей проект ліцензований за ліцензією MIT - перегляньте файл [LICENSE](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/LICENSE) для отримання детальної інформації.