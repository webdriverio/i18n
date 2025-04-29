---
id: gmangiapelo-wdio-azure-devops-service
title: Сервіс Azure DevOps Test Plans
custom_edit_url: https://github.com/gianlucamangiapelo/wdio-azure-devops-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @gmangiapelo/wdio-azure-devops-service є пакетом від сторонніх розробників, для отримання додаткової інформації відвідайте [GitHub](https://github.com/gianlucamangiapelo/wdio-azure-devops-service) | [npm](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

[![version](https://img.shields.io/npm/v/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)
[![downloads](https://img.shields.io/npm/dt/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

Публікує результати [WebdriverIO](https://webdriver.io/) у Azure DevOps Test Plans.

Основні можливості:

* Підтримка фреймворків Jasmine/Jest/Mocha та Cucumber
* Результати тестування групуються в одному тестовому запуску, якщо ви виконуєте кілька spec(test) файлів, що належать до одного набору
* Результати доповідаються одразу після виконання окремого тесту (звітування в реальному часі)
* Тестовий запуск закривається після завершення останнього spec(test) файлу
* Підтримка кількох наборів тестів


## Встановлення

Встановіть цей модуль локально за допомогою наступної команди для використання як (dev-)залежність:

```shell
npm install --save @gmangiapelo/wdio-azure-devops-service
npm install --save-dev @gmangiapelo/wdio-azure-devops-service
```

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут.](https://webdriver.io/docs/gettingstarted)

## Використання

> _wdio-azure-devops-service_ підтримує **NodeJS 8 або вище**

> _wdio-azure-devops-service_ підтримує **commonjs** та **esm**

### Конфігурація

Оскільки `@gmangiapelo/wdio-azure-devops-service` є сервісом, ви можете налаштувати його у вашому файлі `wdio.conf.js` наступним чином

```js
import AzureDevopsService from "@gmangiapelo/wdio-azure-devops-service";
// wdio.conf.js
exports.config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
              AzureDevopsService,
              {
                  pat: '3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn',
                  organizationUrl: 'https://dev.azure.com/gianlucamangiapelo',
                  projectId: '8b3c68ac-f69d-41c6-bbad-921d8bae9819',
                  planId: 263072,
                  suiteId: 263073,
                  caseIdRegex: '@?[ref](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\\d+)',
                  runName: 'FE regression tests for TestPlan',
              },
          ],
    ],
    // ...
};
```

### Налаштування тестового випадку

Ваші тести WDIO повинні включати ID вашого тестового випадку Azure. Переконайтеся, що ID ваших тестових випадків відрізняються від заголовків тестів:

**Стиль Mocha:**
```Javascript
// Добре:
it("C123 Can authenticate a valid user", ...

// Погано:
it("C123Can authenticate a valid user", ...
it("Can authenticate a valid user C123", ...
```

**Стиль Cucumber:**
```Gherkin
## Добре:
@C123
Scenario Can authenticate a valid user
@c123
Scenario Can authenticate a valid user,

## Погано:
@c123stringTest
Scenario Can authenticate a valid user
```

### Приклад звіту Azure DevOps

Це приклад результатів, переданих у AZ Test Plans, під час виконання тесту
![Приклад AzureDevops Test Plans](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/./img/AZ-DevOps-example.png)

<br />

## Параметри сервісу

### pat

Персональний токен доступу, згенерований в Azure DevOps з встановленими дозволами API.

Приклад: `"3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn"`

Тип: `string`

Обов'язковий: `true`

### organizationUrl

Базова URL-адреса вашого екземпляра Azure DevOps.

Приклад: `"https://dev.azure.com/gianlucamangiapelo"`

Тип: `string`

Обов'язковий: `true`

### projectId

ID проекту в Azure DevOps.

Щоб знайти projectId, використайте `GET {organizationUrl}/_apis/projects?api-version=6.0` і скопіюйте відповідний `id`.

Приклад: `"3cf7dbc9-cb1e-4240-93f2-9a5960ab3945"`

Тип: `string`

Обов'язковий: `true`

### planId

ID тестового плану, який можна отримати в розділі Azure DevOps Test Plan.

Приклад: `124`

Тип: `integer`

Обов'язковий: `true`

### suiteId

ID набору тестів, який можна отримати в розділі Azure DevOps Test Plan, у випадку вкладених наборів, отримайте кореневий suiteId, сервіс ітерується по всіх дочірніх наборах.

Приклад: `21`

Тип: `integer`

Обов'язковий: `true`

### runName

Описова назва для тестового запуску.

Приклад: `"FE regression tests run"`

Тип: `string`

Обов'язковий: `true`

### caseIdRegex

Спеціальний регулярний вираз для відповідності testCaseId з тегу або заголовка тестового випадку.

Тип: `string`

За замовчуванням: `"@?[cC](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\d+)"`

Обов'язковий: `false`

## Автор
Gianluca Mangiapelo - [github](https://github.com/gianlucamangiapelo)