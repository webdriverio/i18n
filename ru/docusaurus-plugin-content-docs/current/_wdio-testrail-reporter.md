---
id: wdio-testrail-reporter
title: Testrail Reporter репортер
custom_edit_url: https://github.com/webdriverio-community/wdio-testrail-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/testrail-reporter является сторонним пакетом, для получения дополнительной информации, пожалуйста, посетите [GitHub](https://github.com/webdriverio-community/wdio-testrail-reporter) | [npm](https://www.npmjs.com/package/@wdio/testrail-reporter)

Этот репортер создает отчеты TestRail. Прежде всего, вам необходимо включить API TestRail, чтобы отчет мог взаимодействовать с TestRail и отправлять результаты тестов. Для этого войдите в свою учетную запись TestRail и перейдите в Администрирование > Настройки сайта > API и убедитесь, что вы установили флажок рядом с Включить API.

Добавьте ID тестового случая TestRail в описание теста. Например:
```javascript
it("C123456 Page loads correctly", async () => {
```
Это также поддерживает несколько ID случаев. Например:
```javascript
it("C123456 C678910 Page loads correctly", async () => {
```

## Install

Чтобы использовать репортер, добавьте его в свой `package.json`:

```sh
npm i --save-dev @wdio/testrail-reporter
```

## Usage

Добавьте репортер в ваш конфигурационный файл WDIO.

Пример для случая, когда вы хотите создать новый тестовый запуск:

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

Пример для случая, когда вы хотите обновить существующий тестовый запуск:

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

Пример для случая, когда вам нужны разные ID проекта и/или набора на основе тестового набора для выполнения:

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


## Options

### `projectId`

ID проекта testrail.

Type: `string`

### `suiteId`

ID набора, набор 1 является стандартным.

Type: `string`

### `domain`

Домен вашего экземпляра testrail, например, `your-domain.testrail.io`.

Type: `string`

### `username`

Имя пользователя вашего экземпляра testrail.

Type: `string`

### `apiToken`

API токен вашего экземпляра testrail.

Type: `string`

### `runName`

Пользовательское имя для тестового запуска.

Type: `string`

### `existingRunId`

ID существующего тестового запуска для обновления.

Type: `string`

### `oneReport`

Создать единый тестовый запуск.

Type: `boolean`

### `includeAll`

Включить все тесты в наборе в тестовый запуск.

Type: `boolean`

### `caseIdTagPrefix`

Префикс, используемый для определения ID случая в тегах Cucumber, полезно для выполнения мультиплатформенных сценариев Cucumber

Type: `string`

### `useCucumber`

Указывает, написаны ли тесты с использованием фреймворка Cucumber. По умолчанию установлено значение `false`.

Type: `boolean`

---

Для получения дополнительной информации о WebdriverIO посетите [домашнюю страницу](https://webdriver.io).