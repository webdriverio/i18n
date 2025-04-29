---
id: gmangiapelo-wdio-azure-devops-service
title: Сервис Azure DevOps Test Plans
custom_edit_url: https://github.com/gianlucamangiapelo/wdio-azure-devops-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @gmangiapelo/wdio-azure-devops-service — это сторонний пакет, для получения дополнительной информации см. [GitHub](https://github.com/gianlucamangiapelo/wdio-azure-devops-service) | [npm](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

[![version](https://img.shields.io/npm/v/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)
[![downloads](https://img.shields.io/npm/dt/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

Публикует результаты [WebdriverIO](https://webdriver.io/) в Azure DevOps Test Plans.

Основные функции:

* Поддержка фреймворков Jasmine/Jest/Mocha и Cucumber
* Результаты тестов агрегируются в одном тестовом прогоне, если вы выполняете несколько файлов спецификаций (тестов), относящихся к одному набору
* Результаты сообщаются сразу после выполнения отдельного теста (отчетность в реальном времени)
* Тестовый прогон закрывается после завершения последнего файла спецификации (теста)
* Поддержка нескольких наборов тестов


## Установка

Установите этот модуль локально с помощью следующей команды, чтобы использовать его как (dev-)зависимость:

```shell
npm install --save @gmangiapelo/wdio-azure-devops-service
npm install --save-dev @gmangiapelo/wdio-azure-devops-service
```

Инструкции по установке `WebdriverIO` можно найти [здесь.](https://webdriver.io/docs/gettingstarted)

## Использование

> _wdio-azure-devops-service_ поддерживает **NodeJS 8 или выше**

> _wdio-azure-devops-service_ поддерживает **commonjs** и **esm**

### Конфигурация

Поскольку `@gmangiapelo/wdio-azure-devops-service` является сервисом, вы можете настроить его в файле `wdio.conf.js` следующим образом

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

### Настройка тестового примера

Ваши тесты WDIO должны включать ID вашего тестового примера Azure. Убедитесь, что ID ваших тестовых примеров отличаются от заголовков тестов:

**Стиль Mocha:**
```Javascript
// Хорошо:
it("C123 Can authenticate a valid user", ...

// Плохо:
it("C123Can authenticate a valid user", ...
it("Can authenticate a valid user C123", ...
```

**Стиль Cucumber:**
```Gherkin
## Хорошо:
@C123
Scenario Can authenticate a valid user
@c123
Scenario Can authenticate a valid user,

## Плохо:
@c123stringTest
Scenario Can authenticate a valid user
```

### Пример отчета Azure DevOps

Это пример результатов, отправленных в AZ Test Plans, во время тестового запуска
![Пример AzureDevops Test Plans](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/./img/AZ-DevOps-example.png)

<br />

## Опции сервиса

### pat

Персональный токен доступа, сгенерированный в Azure DevOps с установленными разрешениями API.

Пример: `"3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn"`

Тип: `string`

Обязательно: `true`

### organizationUrl

Базовый URL вашего экземпляра Azure DevOps.

Пример: `"https://dev.azure.com/gianlucamangiapelo"`

Тип: `string`

Обязательно: `true`

### projectId

ID проекта в Azure DevOps.

Чтобы найти projectId, используйте `GET {organizationUrl}/_apis/projects?api-version=6.0` и скопируйте соответствующий `id`.

Пример: `"3cf7dbc9-cb1e-4240-93f2-9a5960ab3945"`

Тип: `string`

Обязательно: `true`

### planId

ID тестового плана, который вы можете получить в разделе Azure DevOps Test Plan.

Пример: `124`

Тип: `integer`

Обязательно: `true`

### suiteId

ID набора тестов, который вы можете получить в разделе Azure DevOps Test Plan. В случае вложенных наборов получите корневой suiteId, сервис будет перебирать все дочерние наборы. 

Пример: `21`

Тип: `integer`

Обязательно: `true`

### runName

Описательное имя для тестового запуска.

Пример: `"FE regression tests run"`

Тип: `string`

Обязательно: `true`

### caseIdRegex

Пользовательское регулярное выражение для сопоставления testCaseId из тега или заголовка тестового примера.

Тип: `string`

По умолчанию: `"@?[cC](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\d+)"`

Обязательно: `false`

## Автор
Gianluca Mangiapelo - [github](https://github.com/gianlucamangiapelo)