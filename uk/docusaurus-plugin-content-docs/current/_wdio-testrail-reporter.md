---
id: wdio-testrail-reporter
title: Testrail Reporter Reporter
custom_edit_url: https://github.com/webdriverio-community/wdio-testrail-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/testrail-reporter є пакетом від сторонніх розробників, для отримання додаткової інформації відвідайте [GitHub](https://github.com/webdriverio-community/wdio-testrail-reporter) | [npm](https://www.npmjs.com/package/@wdio/testrail-reporter)

Цей репортер створює звіти в TestRail. Перш за все, вам потрібно увімкнути API TestRail, щоб звіт міг взаємодіяти з TestRail і надсилати результати тестів. Для цього увійдіть у свій обліковий запис TestRail і перейдіть до Administration > Site Settings > API та переконайтеся, що ви поставили прапорець біля Enable API.

Додайте ID тестового випадку TestRail до опису тесту. Наприклад:
```javascript
it("C123456 Page loads correctly", async () => {
```
Також підтримується кілька ідентифікаторів випадків. Наприклад:
```javascript
it("C123456 C678910 Page loads correctly", async () => {
```

## Встановлення

Щоб скористатися репортером, додайте його до вашого `package.json`:

```sh
npm i --save-dev @wdio/testrail-reporter
```

## Використання

Додайте репортер до вашого WDIO конфігураційного файлу.

Приклад для створення нового тестового запуску:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: 1,
                suiteId: 1,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                runName: 'name for the test run',
                oneReport: true,
                includeAll: false,
                caseIdTagPrefix: '' // used only for multi-platform Cucumber Scenarios
            }
        ]
    ],
    // ...
}
```

Приклад для оновлення існуючого тестового запуску:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: 1,
                suiteId: 1,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                existingRunId: 2345,
                oneReport: true,
                includeAll: false
            }
        ]
    ],
    // ...
}
```

Приклад, коли вам потрібні різні ідентифікатори проекту та/або набору тестів залежно від набору тестів для виконання:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: process.env.TESTRAIL_PROJECT_NAME == 'PROJECT_A' ? 1 : 2,
                suiteId: process.env.TESTRAIL_SUITE_NAME == 'SUITE_A' ? 10 : 20,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                runName: 'name for the test run',
                oneReport: true,
                includeAll: false
            }
        ]
    ],
    // ...
}
```


## Опції

### `projectId`

ID проекту testrail.

Тип: `string`

### `suiteId`

ID набору тестів, suite 1 за замовчуванням.

Тип: `string`

### `domain`

Домен вашого екземпляра testrail, наприклад, `your-domain.testrail.io`.

Тип: `string`

### `username`

Ім'я користувача вашого екземпляра testrail.

Тип: `string`

### `apiToken`

API токен вашого екземпляра testrail.

Тип: `string`

### `runName`

Користувацька назва для тестового запуску.

Тип: `string`

### `existingRunId`

Id існуючого тестового запуску для оновлення.

Тип: `string`

### `oneReport`

Створити єдиний тестовий запуск.

Тип: `boolean`

### `includeAll`

Включити всі тести з набору в тестовий запуск.

Тип: `boolean`

### `caseIdTagPrefix`

Префікс для пошуку ID випадку в тегах Cucumber, корисно для мультиплатформних сценаріїв Cucumber

Тип: `string`

### `useCucumber`

Вказує, чи написані тести з використанням фреймворку Cucumber. За замовчуванням встановлено значення `false`.

Тип: `boolean`

---

Для отримання додаткової інформації про WebdriverIO відвідайте [домашню сторінку](https://webdriver.io).