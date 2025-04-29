---
id: wdio-cucumberjs-json-reporter
title: Репортер CucumberJS JSON
custom_edit_url: https://github.com/wswebcreation/wdio-cucumberjs-json-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cucumberjs-json-reporter є стороннім пакетом, для отримання додаткової інформації перегляньте [GitHub](https://github.com/wswebcreation/wdio-cucumberjs-json-reporter) | [npm](https://nodei.co/npm/wdio-cucumberjs-json-reporter)

WDIO репортер, який створює CucumberJS JSON файли для WebdriverIO v8 і вище.

[![NPM](https://nodei.co/npm/wdio-cucumberjs-json-reporter.png)](https://nodei.co/npm/wdio-cucumberjs-json-reporter/)

## Що він робить
Цей репортер генерує **Cucumber JSON файл** для кожної фічі, яка тестується. JSON файл можна використовувати з будь-яким звітом, який ви хочете використовувати, наприклад [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter).

Він також додає метадані про запущений екземпляр до файлу з фічами, і, не менш важливо, дає вам можливість додавати вкладення до JSON виводу.

## Встановлення
Найпростіший спосіб - тримати `wdio-cucumberjs-json-reporter` як devDependency у вашому `package.json`.

```json
{
  "devDependencies": {
    "wdio-cucumberjs-json-reporter": "^5.0.0"
  }
}
```

Ви можете просто зробити це за допомогою:

```bash
npm install wdio-cucumberjs-json-reporter --save-dev
```

таким чином він автоматично буде додано до вашого `package.json`

Інструкції з встановлення `WebdriverIO` можна знайти [тут](https://webdriver.io/docs/gettingstarted).

## Конфігурація
Налаштуйте каталог виводу та мову у вашому файлі wdio.conf.js:

```js
export const config = {
    // ...
    reporters: [
        // Так, з параметрами за замовчуванням, див. параметри нижче
        'cucumberjs-json',

        // АБО так, якщо ви хочете встановити папку та мову
        [ 'cucumberjs-json', {
                jsonFolder: '.tmp/new/',
                language: 'en',
            },
        ],
    ],
  // ...
}
```

> НЕ ВИКОРИСТОВУЙТЕ ОБИДВА СПОСОБИ ДОДАВАННЯ РЕПОРТЕРА, ЦЕ ЛИШЕ ПРИКЛАД!

## Опції
### `jsonFolder`
- **Тип:** `String`
- **Обов'язково:** Ні
- **За замовчуванням:** `.tmp/json/`

Каталог, де будуть зберігатися JSON файли, згенеровані цим звітом, відносно місця, звідки запускається скрипт.

**Примітка:** Якщо ви використовуєте npm-скрипт з командного рядка, наприклад `npm run test`, `jsonFolder` буде відносним від шляху,
звідки виконується скрипт. Виконання його з кореня вашого проекту також створить `jsonFolder` в корені вашого проекту.

### `language`
- **Тип:** `String`
- **Обов'язково:** Ні
- **За замовчуванням:** `en`

Мова, якою написані Gherkin сценарії (за замовчуванням англійська). Список мовних кодів та їхніх ключових слів можна знайти [тут](https://cucumber.io/docs/gherkin/reference/#overview).

### `disableHooks`
- **Тип:** `boolean`
- **Обов'язково:** Ні
- **За замовчуванням:** `false`

Деталі хуків не будуть частиною генерації, якщо ця властивість встановлена на `true`.

### `reportFilePerRetry`
- **Тип:** `boolean`
- **Обов'язково:** Ні
- **За замовчуванням:** `true`

Коли специфікація повторюється, звіт буде додано до існуючого файлу звіту з попередніх спроб, якщо ця властивість встановлена на `false`.

**Приклад**:
`['cucumberjs-json', { jsonFolder: '.tmp/new/', language: 'en', disableHooks:true}]`

## Метадані

> **Примітка:**\
> Це наразі не підтримується, якщо ви використовуєте WebdriverIO V6, WebdriverIO V5 все ще підтримує це, а WebdriverIO V7 знову підтримує це

Як було сказано, цей звіт може автоматично зберігати метадані поточної машини/пристрою, на якому виконувалась функція.

Щоб налаштувати це, ви можете додати його, додавши наступний об'єкт до ваших `capabilities`

```js
// Приклад wdio.conf.js
export const config = {
    //..
    capabilities: [
        {
            browserName: 'chrome',
            // Додайте це
            'cjson:metadata': {
                // Для браузера
                browser: {
                    name: 'chrome',
                    version: '58',
                },
                // для додатку
                app: {
                  name: 'name.of.app.ipa',
                  version: '1.2.3',
                },
                device: 'MacBook Pro 15',
                platform: {
                    name: 'OSX',
                    version: '10.12.6'
                }
            },
        },
    ],
};
```

> Об'єкт метаданих повинен мати префікс `cjson`, інакше він не працюватиме!

### Значення метаданих
#### `metadata.app.name`
- **Тип:** `string`

**наприклад:** Назва додатку.

#### `metadata.app.version`
- **Тип:** `string`

**наприклад:** Версія додатку.

#### `metadata.browser.name`
- **Тип:** `string`
- **Можливі значення:** `internet explorer | edge | chrome | firefox | safari`

#### `metadata.browser.version`
- **Тип:** `string`

**наприклад:** Версія браузера, це можна додати вручну або отримати під час виконання тестів, щоб отримати точний номер версії.

#### `metadata.device`
- **Тип:** `string`

**наприклад:** Назва, яка представляє тип пристрою. Наприклад, якщо ви запускаєте на віртуальній машині, ви можете вказати `Virtual Machine`,
або назву мобільного телефону, наприклад `iPhone 7 Plus`.

#### `metadata.platform.name`
- **Тип:** `string`
- **Можливі значення:** `windows | osx | linux | ubuntu | android | ios`

#### `metadata.platform.version`
- **Тип:** `string`

**наприклад:** Версія платформи

> Якщо ви не надасте об'єкт `browser` у метаданих, цей модуль автоматично визначить його для вас. **Він завжди перезапише його найновішим значенням, яке він може визначити.**

> Якщо ви не надасте об'єкт `device` та/або `platform`, за замовчуванням він буде встановлений на `not known`

> Якщо ви не надасте `browser.name` або `browser.version`, модуль спробує визначити це автоматично.

## Вкладення
У вас є можливість прикріпити дані до JSON-файлу у всіх цих хуках / кроках:

- Before(All)
- After(All)
- Given
- When
- Then
- And

Вам потрібно лише додати наступний код у ваші файли кроків.

Для ES модулів (ESM)
```js
import cucumberJson from 'wdio-cucumberjs-json-reporter';

// Прикріпити рядок (якщо тип не вказано, він автоматично буде за замовчуванням `text/plain`)
cucumberJson.attach('просто рядок');
cucumberJson.attach('просто другий рядок', 'text/plain');

// Прикріпити JSON
cucumberJson.attach({"json-string": true}, 'application/json');

// Прикріпити скріншот у хуку before
cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
```
Для CommonJS (CJS)
```js
const { attach } = require("wdio-cucumberjs-json-reporter");

// Прикріпити рядок (якщо тип не вказано, він автоматично буде за замовчуванням `text/plain`)
attach('просто рядок');
attach('просто другий рядок', 'text/plain');

// Прикріпити JSON
attach({"json-string": true}, 'application/json');

// Прикріпити скріншот у хуку before
attach(await browser.takeScreenshot(), 'image/png');
```

## Використання з multiple-cucumber-html-reporter
Попередній модуль для WebdriverIO V4, [wdio-multiple-cucumber-html-reporter](https://github.com/webdriverio-community/wdio-multiple-cucumber-html-reporter),
мав вбудований зв'язок з модулем [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter). **Це не стосується цього
репортера**, оскільки нова конфігурація WebdriverIO V5 базується на екземплярі, який не дозволяє мені використовувати хуки `onPrepare` та `onComplete`.

Якщо ви все ще хочете використовувати модуль [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter), ви можете додати наступне до вашого конфігураційного файлу.

- Встановіть модуль за допомогою

    ```bash
    npm install multiple-cucumber-html-reporter --save-dev
    ```

- Додайте це до вашого конфігураційного файлу

    ```js
    import fs from 'node:fs/promises'
    // Імпортуйте модуль
    import { generate } from 'multiple-cucumber-html-reporter'

    // Приклад wdio.conf.js
    export const config = {
      //..

      // =====
      // Хуки
      // =====
      /**
       * Виконується один раз перед запуском всіх воркерів.
       */
      onPrepare: () => {
        // Видаліть папку `.tmp/`, яка містить json та файли звітів
        return fs.rm('.tmp/', { recursive: true });
      },
      /**
       * Виконується після того, як всі воркери завершили роботу і процес готовий до виходу.
       */
      onComplete: () => {
        // Згенерувати звіт, коли всі тести закінчаться
        generate({
          // Обов'язково
          // Ця частина повинна бути тим самим шляхом, де ви зберігаєте JSON-файли
          // за замовчуванням = '.tmp/json/'
          jsonDir: '.tmp/json/',
          reportPath: '.tmp/report/',
          // для отримання додаткових параметрів див. https://github.com/wswebcreation/multiple-cucumber-html-reporter#options
        });
      }
    }
    ```

## Старіші версії WebdriverIO

> **ЦЕЙ МОДУЛЬ МОЖЕ ПРАЦЮВАТИ ТІЛЬКИ З WebdriverIO V8+!**\
> **Для V6 перевірте документацію [тут](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v6) і використовуйте версію 2.0.4**\
> **Для V5 перевірте документацію [тут](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v5) і використовуйте версію 1.3.0**

> **ЦЕЙ МОДУЛЬ НЕ Є ЗАМІНОЮ [wdio-multiple-cucumber-html-reporter](https://github.com/wswebcreation/wdio-multiple-cucumber-html-reporter). ЦЕЙ МОДУЛЬ ПІДТРИМУЄ ТІЛЬКИ WEBDRIVERIO V4 І ТАКОЖ СТВОРЮЄ ЗВІТ. ЦЕЙ МОДУЛЬ ТІЛЬКИ СТВОРЮЄ JSON, А НЕ ЗВІТ!!**